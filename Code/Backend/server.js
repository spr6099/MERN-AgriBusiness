var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var expressFileupload = require("express-fileupload");
var session = require("express-session");
var database = require("./database");
var path = require("path");
var app = express();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const fs = require("fs");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");
const { log } = require("console");
const cors = require("cors");
app.use(cors());

const razorpay = new Razorpay({
  key_id: "rzp_test_4Ex6Tyjkp79GFy",
  key_secret: "lVGcQB0HSAttEhr7mq4AbM7Z",
});

// Setting up environment variables
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(
  session({
    secret: "cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use(expressFileupload());

// register
app.post("/register", async (req, res) => {
  const { username, category, address, email, password, status } = req.body;

  try {
    console.log(req.body);

    const db = await database;

    // Check if the email already exists
    const existingUser = await db.collection("login").findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email ID already exists" });
    }

    let registerData = {
      name: username,
      category,
      address,
      createdAt: new Date(),
    };

    let loginData = {
      email,
      password,
      userStatus: status,
    };

    // Insert the login data first
    const loginResult = await db.collection("login").insertOne(loginData);
    registerData.userId = loginResult.insertedId;

    // Handle image upload if category is 'farmer' and image is provided
    if (
      (category === "farmer" || category === "dealer" || category === "bank") &&
      req.files &&
      req.files.image
    ) {
      const image = req.files.image;
      const imagePath = path.join(__dirname, "public", "uploads", image.name);
      image.mv(imagePath, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Image upload failed" });
        }
      });
      registerData.image = `/uploads/${image.name}`;
    }

    // Insert the registration data
    await db.collection("register").insertOne(registerData);
    res.json({ message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// login
app.post("/login", async (req, res) => {
  const { username, userPassword } = req.body;

  try {
    const db = await database;

    // Find user in login collection
    const user = await db.collection("login").findOne({ email: username });

    if (user) {
      // Check password
      if (user.password === userPassword) {
        // Fetch additional details from register collection using userId
        const userDetails = await db
          .collection("register")
          .findOne({ userId: user._id });
        console.log(userDetails);
        if (userDetails) {
          // Combine user and userDetails into a single object to send back
          const userData = {
            _id: user._id,
            email: user.email,
            userStatus: user.userStatus,
            name: userDetails.name,
            category: userDetails.category,
            address: userDetails.address,
            image: userDetails.image, // Ensure this field is included
          };

          req.session.user = userData; // Store user data in session

          res.json({ message: "Login successful", userData }); // Send combined user data as response
        } else {
          console.log(
            "User details not found in register collection for userId:",
            user._id
          );
          res.status(404).json({ error: "User details not found" });
        }
      } else {
        console.log("Invalid password for user:", user.email);
        res.status(401).json({ error: "Invalid password" });
      }
    } else {
      console.log("User not found with email:", username);
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// new farmers
app.get("/newfarmer", async (req, res) => {
  try {
    const db = await database;
    const registers = await db
      .collection("register")
      .find({ category: "farmer" })
      .toArray();

    const userIds = registers.map((user) => new mongodb.ObjectId(user.userId));

    // Log the userIds to verify they are correct
    console.log("User IDs:", userIds);

    // Fetch logins based on userIds and userStatus, considering both string and number
    const logins = await db
      .collection("login")
      .find({
        _id: { $in: userIds },
        userStatus: { $in: [2, "2"] },
      })
      .toArray();

    // Log the logins to verify if any records are found
    console.log("Logins:", logins);

    if (logins.length === 0) {
      console.log("No logins found. Checking if userStatus is correct.");

      // Check if there are any logins matching the userIds without filtering by userStatus
      const loginsWithoutStatus = await db
        .collection("login")
        .find({ _id: { $in: userIds } })
        .toArray();
      console.log("Logins without userStatus filter:", loginsWithoutStatus);
    }

    const farmers = logins.map((login) => {
      const register = registers.find((register) =>
        register.userId.equals(login._id)
      );
      return {
        ...login,
        register,
      };
    });

    // Log the farmers to verify the final data structure
    console.log("Farmers:", farmers);

    res.json(farmers);
  } catch (error) {
    console.error("Error during fetching farmers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// new dealers

app.get("/newDealer", async (req, res) => {
  try {
    const db = await database;
    const registers = await db
      .collection("register")
      .find({ category: "dealer" })
      .toArray();

    const userIds = registers.map((user) => new mongodb.ObjectId(user.userId));

    // Log the userIds to verify they are correct
    console.log("User IDs:", userIds);

    // Fetch logins based on userIds and userStatus, considering both string and number
    const logins = await db
      .collection("login")
      .find({
        _id: { $in: userIds },
        userStatus: { $in: [2, "2"] },
      })
      .toArray();

    // Log the logins to verify if any records are found
    console.log("Logins:", logins);

    if (logins.length === 0) {
      console.log("No logins found. Checking if userStatus is correct.");

      // Check if there are any logins matching the userIds without filtering by userStatus
      const loginsWithoutStatus = await db
        .collection("login")
        .find({ _id: { $in: userIds } })
        .toArray();
      console.log("Logins without userStatus filter:", loginsWithoutStatus);
    }

    const dealers = logins.map((login) => {
      const register = registers.find((register) =>
        register.userId.equals(login._id)
      );
      return {
        ...login,
        register,
      };
    });

    // Log the farmers to verify the final data structure
    console.log("Dealers:", dealers);

    res.json(dealers);
  } catch (error) {
    console.error("Error during fetching dealers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// new bankers

app.get("/newbanker", async (req, res) => {
  try {
    const db = await database;
    const registers = await db
      .collection("register")
      .find({ category: "bank" })
      .toArray();

    const userIds = registers.map((user) => new mongodb.ObjectId(user.userId));

    // Log the userIds to verify they are correct
    console.log("User IDs:", userIds);

    // Fetch logins based on userIds and userStatus, considering both string and number
    const logins = await db
      .collection("login")
      .find({
        _id: { $in: userIds },
        userStatus: { $in: [2, "2"] },
      })
      .toArray();

    // Log the logins to verify if any records are found
    console.log("Logins:", logins);

    if (logins.length === 0) {
      console.log("No logins found. Checking if userStatus is correct.");

      // Check if there are any logins matching the userIds without filtering by userStatus
      const loginsWithoutStatus = await db
        .collection("login")
        .find({ _id: { $in: userIds } })
        .toArray();
      console.log("Logins without userStatus filter:", loginsWithoutStatus);
    }

    const bankers = logins.map((login) => {
      const register = registers.find((register) =>
        register.userId.equals(login._id)
      );
      return {
        ...login,
        register,
      };
    });

    // Log the farmers to verify the final data structure
    console.log("Bankers:", bankers);

    res.json(bankers);
  } catch (error) {
    console.error("Error during fetching bankers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/totallist", (req, res) => {
  try {
    database.then(async (db) => {
      // Check if the database connection is initialized
      if (!database) {
        console.error("Database connection not initialized");
        return res
          .status(500)
          .json({ error: "Database connection not initialized" });
      }
      // Fetch farmers from the "register" collection
      const registers = await db.collection("register").find().toArray();
      // Extract user IDs from the farmer registers
      const userIds = registers.map((user) => user.userId);
      // Fetch logins from the "login" collection based on user IDs
      let logins = [];
      if (userIds.length > 0) {
        logins = await db
          .collection("login")
          .find({ _id: { $in: userIds }, userStatus: { $in: ["3", "1", "4"] } })
          .toArray();
      }
      // console.log(logins);
      // Augment farmer data with login information
      const farmers = logins.map((login) => {
        const register = registers.find((register) =>
          register.userId.equals(login._id)
        );
        return {
          ...login,
          register,
        };
      });
      // Return the augmented farmer data
      res.json(farmers);
    });
  } catch (error) {
    console.error("Error during fetching farmers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/farmerlist", (req, res) => {
  try {
    database.then(async (db) => {
      // Check if the database connection is initialized
      if (!database) {
        console.error("Database connection not initialized");
        return res
          .status(500)
          .json({ error: "Database connection not initialized" });
      }
      // Fetch farmers from the "register" collection
      const registers = await db
        .collection("register")
        .find({ category: "farmer" })
        .toArray();
      // Extract user IDs from the farmer registers
      const userIds = registers.map((user) => user.userId);
      // Fetch logins from the "login" collection based on user IDs
      let logins = [];
      if (userIds.length > 0) {
        logins = await db
          .collection("login")
          .find({ _id: { $in: userIds }, userStatus: "1" })
          .toArray();
      }
      // console.log(logins);
      // Augment farmer data with login information
      const farmers = logins.map((login) => {
        const register = registers.find((register) =>
          register.userId.equals(login._id)
        );
        return {
          ...login,
          register,
        };
      });
      // Return the augmented farmer data
      res.json(farmers);
    });
  } catch (error) {
    console.error("Error during fetching farmers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/dealerlist", (req, res) => {
  try {
    database.then(async (db) => {
      // Check if the database connection is initialized
      if (!database) {
        console.error("Database connection not initialized");
        return res
          .status(500)
          .json({ error: "Database connection not initialized" });
      }
      // Fetch farmers from the "register" collection
      const registers = await db
        .collection("register")
        .find({ category: "dealer" })
        .toArray();
      // Extract user IDs from the farmer registers
      const userIds = registers.map((user) => user.userId);
      // Fetch logins from the "login" collection based on user IDs
      let logins = [];
      if (userIds.length > 0) {
        logins = await db
          .collection("login")
          .find({ _id: { $in: userIds }, userStatus: "3" })
          .toArray();
      }
      // console.log(logins);
      // Augment farmer data with login information
      const dealers = logins.map((login) => {
        const register = registers.find((register) =>
          register.userId.equals(login._id)
        );
        return {
          ...login,
          register,
        };
      });
      // Return the augmented farmer data
      res.json(dealers);
    });
  } catch (error) {
    console.error("Error during fetching dealers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/bankerlist", (req, res) => {
  try {
    database.then(async (db) => {
      // Check if the database connection is initialized
      if (!database) {
        console.error("Database connection not initialized");
        return res
          .status(500)
          .json({ error: "Database connection not initialized" });
      }
      // Fetch farmers from the "register" collection
      const registers = await db
        .collection("register")
        .find({ category: "bank" })
        .toArray();
      // Extract user IDs from the farmer registers
      const userIds = registers.map((user) => user.userId);
      // Fetch logins from the "login" collection based on user IDs
      let logins = [];
      if (userIds.length > 0) {
        logins = await db
          .collection("login")
          .find({ _id: { $in: userIds }, userStatus: "4" })
          .toArray();
      }
      // console.log(logins);
      // Augment farmer data with login information
      const bankers = logins.map((login) => {
        const register = registers.find((register) =>
          register.userId.equals(login._id)
        );
        return {
          ...login,
          register,
        };
      });
      // Return the augmented farmer data
      res.json(bankers);
      console.log(bankers);
    });
  } catch (error) {
    console.error("Error during fetching dealers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// delete farmer

app.post("/deleteNewfarmer", async (req, res) => {
  let delid = req.body.id;

  try {
    const db = await database;
    const farmer = await db
      .collection("login")
      .findOne({ _id: new mongodb.ObjectId(delid) });

    if (!farmer) {
      return res.status(404).json({ error: "Farmer not found" });
    }

    await db
      .collection("login")
      .deleteOne({ _id: new mongodb.ObjectId(delid) });
    await db
      .collection("register")
      .deleteOne({ userId: new mongodb.ObjectId(delid) });

    res.json({
      success: true,
      message: "Farmer and associated user deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting farmer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// delete dealer

app.post("/deleteNewdealer", async (req, res) => {
  let delid = req.body.id;

  try {
    const db = await database;
    const dealer = await db
      .collection("login")
      .findOne({ _id: new mongodb.ObjectId(delid) });

    if (!dealer) {
      return res.status(404).json({ error: "Dealer not found" });
    }

    await db
      .collection("login")
      .deleteOne({ _id: new mongodb.ObjectId(delid) });
    await db
      .collection("register")
      .deleteOne({ userId: new mongodb.ObjectId(delid) });

    res.json({
      success: true,
      message: "Dealer and associated user deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Dealer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/deleteNewbanker", async (req, res) => {
  let delid = req.body.id;

  try {
    const db = await database;
    const dealer = await db
      .collection("login")
      .findOne({ _id: new mongodb.ObjectId(delid) });

    if (!dealer) {
      return res.status(404).json({ error: "Banker not found" });
    }

    await db
      .collection("login")
      .deleteOne({ _id: new mongodb.ObjectId(delid) });
    await db
      .collection("register")
      .deleteOne({ userId: new mongodb.ObjectId(delid) });

    res.json({
      success: true,
      message: "Banker and associated user deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Banker:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// editfarmer
app.post("/editfarmer", async (req, res) => {
  try {
    const { id, userStatus } = req.body;
    const db = await database;

    const updateUser = await db.collection("login").findOneAndUpdate(
      { _id: new mongodb.ObjectId(id) },
      { $set: { userStatus } },
      { returnDocument: "after" } // Ensure the updated document is returned
    );

    // if (!updateUser.value) {
    //   return res.status(404).json({ error: "User not found" });
    // }
    console.log(updateUser);

    res.json(updateUser);
  } catch (error) {
    console.error("Error updating:", error);
    res.status(500).json({ error: "Error on update" });
  }
});

//editdealer
app.post("/editdealer", async (req, res) => {
  try {
    const { id, userStatus } = req.body;
    const db = await database;

    const updateUser = await db.collection("login").findOneAndUpdate(
      { _id: new mongodb.ObjectId(id) },
      { $set: { userStatus } },
      { returnDocument: "after" } // Ensure the updated document is returned
    );

    // if (!updateUser.value) {
    //   return res.status(404).json({ error: "User not found" });
    // }
    console.log(updateUser);

    res.json(updateUser);
  } catch (error) {
    console.error("Error updating:", error);
    res.status(500).json({ error: "Error on update" });
  }
});
//editbanker
app.post("/editbanker", async (req, res) => {
  try {
    const { id, userStatus } = req.body;
    const db = await database;

    const updateUser = await db.collection("login").findOneAndUpdate(
      { _id: new mongodb.ObjectId(id) },
      { $set: { userStatus } },
      { returnDocument: "after" } // Ensure the updated document is returned
    );

    // if (!updateUser.value) {
    //   return res.status(404).json({ error: "User not found" });
    // }
    console.log(updateUser);

    res.json(updateUser);
  } catch (error) {
    console.error("Error updating:", error);
    res.status(500).json({ error: "Error on update" });
  }
});

// add category
app.post("/addcategory", async (req, res) => {
  try {
    if (!req.files || !req.files.img) {
      return res.status(400).send("No file uploaded.");
    }

    let category = req.body.category;
    let db = await database; // Make sure `database` is a promise that resolves to the MongoDB client
    const existingCategory = await db
      .collection("category")
      .findOne({ category });

    if (existingCategory) {
      return res.status(400).json({ error: "Category already exists" });
    }

    let img = req.files.img;
    let uploadPath = path.join(__dirname, "public", "category", img.name);

    img.mv(uploadPath, async function (err) {
      if (err) {
        return res.status(500).send(err);
      }

      let categories = {
        category: req.body.category,
        description1: req.body.description1,
        img: `/category/${img.name}`,
      };

      try {
        const result = await db.collection("category").insertOne(categories);
        console.log(result);
        res.json("success");
      } catch (error) {
        console.error("Error adding category:", error);
        res.status(500).send("Error adding category.");
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error.");
  }
});

// app.post('/addcategory', (req, res) => {
//   if (!req.files || !req.files.img) {
//     return res.status(400).send('No file uploaded.');
//   }
//   let category= req.body.category

// let dbs= database
//   const existingCategory =  dbs.collection('category').findOne({ category });
//   if (existingCategory) {
//     return res.status(400).json({ error: 'Category already exists' });
//   }

//   let img = req.files.img;
//   let uploadPath = path.join(__dirname, 'public', 'category', img.name);

//   img.mv(uploadPath, function (err) {
//     if (err) {
//       return res.status(500).send(err);
//     }

//     let categories = {
//       category: req.body.category,
//       description1: req.body.description1,
//       // farmerid: req.body.farmerid,
//       img: `/category/${img.name}`
//     };

//     database.then((db) => {
//       db.collection('category').insertOne(categories).then((result) => {
//         console.log(result);
//         res.json("success");
//       }).catch((error) => {
//         console.error("Error adding category:", error);
//         res.status(500).send("Error adding category.");
//       });
//     });
//   });
// });

// view category

app.post("/viewcategory", (req, res) => {
  // let farmerid = req.body.farmerid
  database.then((db) => {
    db.collection("category")
      .find()
      .toArray()
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        res.status(500).send("Error fetching categories.");
      });
  });
});

// deletecategory

app.post("/deletecategory", (req, res) => {
  let delId = req.body.id;
  database.then((db) => {
    db.collection("category")
      .deleteOne({ _id: new mongodb.ObjectId(delId) })
      .then((result) => {
        res.json(result);
      });
  });
});
// findcategory

app.post("/findcategory", (req, res) => {
  let findId = req.body.id;
  database.then((db) => {
    db.collection("category")
      .findOne({ _id: new mongodb.ObjectId(findId) })
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        console.error("Error finding category:", error);
        res.status(500).send("Error finding category");
      });
  });
});

// updatecategory

app.post("/updatecategory", (req, res) => {
  let findId = req.body.id;
  let categories = {
    category: req.body.category,
    description1: req.body.description1,
  };

  if (req.files && req.files.img) {
    let img = req.files.img;
    const fileTypes = ["image/jpeg", "image/png"];

    if (!fileTypes.includes(img.mimetype)) {
      return res.status(400).send("File type must be JPG or PNG.");
    }

    let uploadPath = path.join(__dirname, "public", "category", img.name);

    img.mv(uploadPath, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
      categories.img = `/category/${img.name}`;

      updateCategoryInDb(findId, categories, res);
    });
  } else {
    updateCategoryInDb(findId, categories, res);
  }
});

function updateCategoryInDb(findId, categories, res) {
  database.then((db) => {
    db.collection("category")
      .updateOne({ _id: new mongodb.ObjectId(findId) }, { $set: categories })
      .then((result) => {
        console.log(result);
        res.json("success");
      })
      .catch((error) => {
        console.error("Error updating category:", error);
        res.status(500).send("Error updating category");
      });
  });
}

// add product
app.post("/addproduct", (req, res) => {
  if (!req.files || !req.files.picture) {
    return res.status(400).send("No file uploaded.");
  }
  let picture = req.files.picture;
  const fileTypes = ["image/jpeg", "image/png"];
  if (!fileTypes.includes(picture.mimetype)) {
    return res.status(400).send("File type must be JPG or PNG.");
  }
  let uploadPath = path.join(__dirname, "public", "product", picture.name);
  picture.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }
    let products = {
      item: req.body.item,
      subcategory: req.body.subcategory,
      weight: req.body.weight,
      price: req.body.price,
      description2: req.body.description2,
      farmerid: req.body.farmerid,
      status: 0,
      picture: `/product/${picture.name}`,
    };
    database.then((db) => {
      db.collection("product")
        .insertOne(products)
        .then((result) => {
          console.log(result);
          res.json("success");
        })
        .catch((error) => {
          console.error("Error adding product:", error);
          res.status(500).send("Error adding product.");
        });
    });
  });
});

// view product
app.post("/viewproduct", async (req, res) => {
  const farmerid = req.body.farmerid;
  try {
    const db = await database;
    const productresult = await db
      .collection("product")
      .aggregate([
        { $match: { farmerid: farmerid } }, // Filter by farmerid
        { $addFields: { categoryId: { $toObjectId: "$item" } } },
        {
          $lookup: {
            from: "category",
            localField: "categoryId",
            foreignField: "_id",
            as: "newdatas",
          },
        },
        { $unwind: "$newdatas" },
      ])
      .toArray();

    res.json(productresult);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products." });
  }
});

// admin viewproduct
app.get("/viewproducts", async (req, res) => {
  try {
    const db = await database;

    const productresult = await db
      .collection("product")
      .aggregate([
        { $addFields: { categoryId: { $toObjectId: "$item" } } },
        {
          $lookup: {
            from: "category",
            localField: "categoryId",
            foreignField: "_id",
            as: "categoryDetails",
          },
        },
        { $unwind: "$categoryDetails" },
      ])
      .toArray();
    // console.log(productresult);
    // Fetch the farmer details for each product
    const farmerIds = productresult.map((product) => product.farmerid);
    console.log(farmerIds);
    const uniqueFarmerIds = [...new Set(farmerIds)]; // Remove duplicates

    const farmers = await db
      .collection("register")
      .find({
        userId: { $in: uniqueFarmerIds.map((id) => new mongodb.ObjectId(id)) },
      })
      .toArray();

    // Map farmers to products
    const farmerMap = farmers.reduce((map, farmer) => {
      map[farmer.userId.toString()] = farmer;
      return map;
    }, {});

    const productWithFarmerDetails = productresult.map((product) => {
      return {
        ...product,
        farmerDetails: farmerMap[product.farmerid],
      };
    });

    res.json(productWithFarmerDetails);
    // console.log(productWithFarmerDetails);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Error fetching products.");
  }
});

// deleteProduct

app.post("/deleteProduct", (req, res) => {
  let delId = req.body.id;
  database.then((db) => {
    db.collection("product")
      .deleteOne({ _id: new mongodb.ObjectId(delId) })
      .then((result) => {
        res.json(result);
      });
  });
});

// findproduct

app.post("/findproduct", (req, res) => {
  let findId = req.body.id;
  database.then(async (db) => {
    var categoryresult = await db.collection("category").find().toArray();
    var productresult = await db
      .collection("product")
      .findOne({ _id: new mongodb.ObjectId(findId) });
    res.json({ categoryresult, productresult });
  });
});

// updateproduct
app.post("/updateproduct", (req, res) => {
  let findId = req.body.id;
  let products = {
    subcategory: req.body.subcategory,
    description2: req.body.description2,
    weight: req.body.weight,
    price: req.body.price,
  };

  if (req.files && req.files.picture) {
    let picture = req.files.picture;
    const fileTypes = ["image/jpeg", "image/png"];

    if (!fileTypes.includes(picture.mimetype)) {
      return res.status(400).send("File type must be JPG or PNG.");
    }

    let uploadPath = path.join(__dirname, "public", "product", picture.name);

    picture.mv(uploadPath, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
      products.picture = `/product/${picture.name}`; // Ensure the correct path is set
      updateProductInDb(findId, products, res);
    });
  } else {
    updateProductInDb(findId, products, res);
  }

  function updateProductInDb(findId, products, res) {
    database.then((db) => {
      db.collection("product")
        .findOne({ _id: new mongodb.ObjectId(findId) })
        .then((existingProduct) => {
          if (!existingProduct) {
            return res.status(404).send("Product not found");
          }

          products.item = existingProduct.item; // Ensure item is included

          db.collection("product")
            .updateOne(
              { _id: new mongodb.ObjectId(findId) },
              { $set: products }
            )
            .then((result) => {
              console.log(result);
              res.json("success");
            })
            .catch((error) => {
              console.error("Error updating product:", error);
              res.status(500).send("Error updating product");
            });
        })
        .catch((error) => {
          console.error("Error finding product:", error);
          res.status(500).send("Error finding product");
        });
    });
  }
});

// addcultivation

app.post("/addcultivation", async (req, res) => {
  const { item, subcategory, cultivation, farmerid } = req.body;
  const db = await database;
  try {
    const result = await db.collection("cultivation").insertOne({
      item: new mongodb.ObjectId(item),
      subcategory: new mongodb.ObjectId(subcategory),
      cultivation,
      farmerid: new mongodb.ObjectId(farmerid),
    });
    res.status(200).json({
      message: "Cultivation details added successfully",
      id: result.insertedId,
    });
  } catch (error) {
    console.error("Error adding cultivation:", error);
    res.status(500).json({ error: "Failed to add cultivation details" });
  }
});

// viewcultivation

app.post("/viewcultivation", async (req, res) => {
  const farmerid = req.body.farmerid;
  console.log("Farmer ID:", farmerid);
  try {
    const db = await database; // Assuming 'database' is properly initialized and connected

    const cultivationDataStep1 = await db
      .collection("cultivation")
      .find({ farmerid: new mongodb.ObjectId(farmerid) })
      .toArray();
    console.log("Step 1: Cultivation Data Match:", cultivationDataStep1);

    const cultivationDataStep2 = await db
      .collection("cultivation")
      .aggregate([
        { $match: { farmerid: new mongodb.ObjectId(farmerid) } },
        { $addFields: { subcategoryId: { $toObjectId: "$subcategory" } } },
      ])
      .toArray();
    console.log(
      "Step 2: Cultivation Data with ObjectId:",
      cultivationDataStep2
    );

    const cultivationData = await db
      .collection("cultivation")
      .aggregate([
        { $match: { farmerid: new mongodb.ObjectId(farmerid) } },
        { $addFields: { subcategoryId: { $toObjectId: "$subcategory" } } },
        {
          $lookup: {
            from: "product",
            localField: "subcategoryId",
            foreignField: "_id",
            as: "productDetails",
          },
        },
        { $unwind: "$productDetails" },
      ])
      .toArray();

    console.log("Final Cultivation Data:", cultivationData);

    if (cultivationData.length === 0) {
      console.log(`No cultivation data found for farmerid: ${farmerid}`);
    }

    res.json(cultivationData);
  } catch (error) {
    console.error("Error fetching cultivation data:", error);
    res.status(500).json({ error: "Failed to fetch cultivation data" });
  }
});

// delete cultivation
app.post("/deleteCultivation", (req, res) => {
  const cultivationId = req.body.id;

  database
    .then((db) => {
      db.collection("cultivation")
        .deleteOne({ _id: new mongodb.ObjectId(cultivationId) })
        .then((result) => {
          if (result.deletedCount === 1) {
            res.json({ status: "success" });
          } else {
            res.json({
              status: "error",
              message: "Cultivation entry not found",
            });
          }
        })
        .catch((err) => {
          console.error("Error deleting cultivation:", err);
          res
            .status(500)
            .json({ status: "error", message: "Internal server error" });
        });
    })
    .catch((err) => {
      console.error("Error connecting to the database:", err);
      res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    });
});

// update cultivation
app.post("/updateCultivation", (req, res) => {
  const cultivationId = req.body.id;
  const newCultivation = req.body.cultivation;

  database
    .then((db) => {
      db.collection("cultivation")
        .updateOne(
          { _id: new mongodb.ObjectId(cultivationId) },
          { $set: { cultivation: newCultivation } }
        )
        .then((result) => {
          if (result.modifiedCount === 1) {
            res.json({ status: "success" });
          } else {
            res.status(404).json({
              status: "error",
              message: "Cultivation entry not found",
            });
          }
        })
        .catch((err) => {
          console.error("Error updating cultivation:", err);
          res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: err.message,
          });
        });
    })
    .catch((err) => {
      console.error("Error connecting to the database:", err);
      res.status(500).json({
        status: "error",
        message: "Internal server error",
        error: err.message,
      });
    });
});

// cultivationdata
app.get("/getCultivation/:id", (req, res) => {
  const cultivationId = req.params.id;

  database
    .then(async (db) => {
      try {
        var productresult = await db.collection("product").find().toArray();
        var cultivationresult = await db
          .collection("cultivation")
          .findOne({ _id: new mongodb.ObjectId(cultivationId) });
        res.json({ cultivationresult, productresult });
      } catch (err) {
        console.error("Error fetching cultivation:", err);
        res.status(500).json({
          status: "error",
          message: "Internal server error",
          error: err.message,
        });
      }
    })
    .catch((err) => {
      console.error("Error connecting to the database:", err);
      res.status(500).json({
        status: "error",
        message: "Internal server error",
        error: err.message,
      });
    });
});

// viewcategory
app.get("/viewcategorys", (req, res) => {
  database.then((db) => {
    db.collection("category")
      .find()
      .toArray()
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        res.status(500).send("Error fetching categories.");
      });
  });
});

//  userview product
app.get("/viewproductsdata", (req, res) => {
  database
    .then(async (dbase) => {
      var productresult = await dbase
        .collection("product")
        .aggregate([
          { $addFields: { categoryId: { $toObjectId: "$item" } } },
          {
            $lookup: {
              from: "category",
              localField: "categoryId",
              foreignField: "_id",
              as: "newdatas",
            },
          },
          { $unwind: "$newdatas" },
          { $match: { status: 1 } }, // Filter products with status == 1
        ])
        .toArray();

      res.json(productresult);
      console.log(productresult);
    })
    .catch((error) => {
      console.error("Error fetching product data:", error);
      res.status(500).send("Error fetching product data.");
    });
});

// single product

app.get("/singleproduct/:id", async (req, res) => {
  const findId = req.params.id;
  try {
    const db = await database;
    const productResult = await db
      .collection("product")
      .findOne({ _id: new mongodb.ObjectId(findId) });
    const cultivationData = await db
      .collection("cultivation")
      .findOne({ subcategory: new mongodb.ObjectId(findId) });
    const farmerid = productResult.farmerid;
    const farmerData = await db
      .collection("register")
      .findOne({ userId: new mongodb.ObjectId(farmerid) });
    const ratings = await db
      .collection("ratings")
      .find({ productId: new mongodb.ObjectId(findId) })
      .toArray();

    console.log(ratings);

    res.json({ productResult, cultivationData, farmerData, ratings });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Error fetching product" });
  }
});

app.post("/addcart", async (req, res) => {
  const { userid, productid, farmerid, status, farmername, customerName } =
    req.body;

  let cartData = {
    userid: new mongodb.ObjectId(userid), // Convert to ObjectId if necessary
    productid: new mongodb.ObjectId(productid), // Convert to ObjectId if necessary
    farmerid: new mongodb.ObjectId(farmerid), // Convert to ObjectId if necessary
    customerName,
    farmername,
    status,
  };

  try {
    const db = await database; // Ensure the database connection is ready
    const result = await db.collection("cart").insertOne(cartData);

    console.log(result);
    res.json({
      message: "Item added to cart successfully",
      _id: result.insertedId,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});

// view cart
app.post("/viewcart", (req, res) => {
  const userids = req.body.userid;
  console.log(userids);

  database
    .then(async (dbase) => {
      var cartresult = await dbase
        .collection("cart")
        .aggregate([
          {
            $match: {
              $and: [{ status: 0 }, { userid: new mongodb.ObjectId(userids) }],
            },
          }, // Convert userids to ObjectId
          { $addFields: { products: { $toObjectId: "$productid" } } },
          {
            $lookup: {
              from: "product",
              localField: "products",
              foreignField: "_id",
              as: "newdatas",
            },
          },
          { $unwind: "$newdatas" },
        ])
        .toArray();
      console.log(cartresult);
      res.json(cartresult);
    })
    .catch((error) => {
      console.error("Error fetching cart data:", error);
      res.status(500).json({ error: "Error fetching cart data" });
    });
});

// delete cart
app.post("/deletecart", (req, res) => {
  let delId = req.body.id;
  database.then((db) => {
    db.collection("cart")
      .deleteOne({ _id: new mongodb.ObjectId(delId) })
      .then((result) => {
        res.json(result);
      });
  });
});

app.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      cartItems,
    } = req.body;
    const secret = "lVGcQB0HSAttEhr7mq4AbM7Z"; // Replace with your Razorpay secret

    const crypto = require("crypto");
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const expectedSignature = hmac.digest("hex");

    if (razorpay_signature === expectedSignature) {
      // Payment verification successful
      // Update the cart status
      const db = await database;
      const bulkUpdateOps = cartItems.map((item) => ({
        updateOne: {
          filter: { _id: new mongodb.ObjectId(item.id) },
          update: {
            $set: {
              status: 1, // Update status to 1
              quantity: item.quantity, // Update quantity
              updatedAt: new Date(),
            },
          },
        },
      }));

      await db.collection("cart").bulkWrite(bulkUpdateOps);
      res
        .status(200)
        .json({ message: "Payment verified and cart updated successfully" });
    } else {
      res.status(400).json({ message: "Invalid signature" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
});

// Function to update the cart after payment verification
const updateCart = async (cartItems) => {
  try {
    const db = await database;
    const cartCollection = db.collection("cart");

    // Map cart items to bulk update operations
    const bulkOps = cartItems.map((item) => ({
      updateOne: {
        filter: { _id: new ObjectId(item.id) },
        update: {
          $set: {
            quantity: item.quantity, // Assuming quantity update is needed
            status: 1, // Mark as purchased or update status as needed
            updatedAt: new Date(),
          },
        },
      },
    }));

    // Perform bulk write operations
    await cartCollection.bulkWrite(bulkOps);
  } catch (error) {
    console.error("Error updating cart:", error);
    throw error; // Rethrow to handle in the verifyPayment function
  }
};

// Create an order with Razorpay
app.post("/orders", async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100, // Amount in paise (100 paise = 1 INR)
      currency: "INR",
      receipt: Date.now().toString(),
    };

    razorpay.orders.create(options, (error, order) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error!" });
  }
});

// app.post('/updateCart', async (req, res) => {
//   const cartItems = req.body.cartItems; // Array of cart items with id and quantity

//   try {
//     const db = await database; // Ensure the database connection is ready
//     const bulkUpdateOps = cartItems.map(item => ({
//       updateOne: {
//         filter: { _id: new mongodb.ObjectId(item.id) },
//         update: {
//           $set: {
//             status: 1, // Assuming status update
//             quantity: item.quantity, // Update quantity field
//             updatedAt: new Date()
//           }
//         }
//       }
//     }));

//     const result = await db.collection('cart').bulkWrite(bulkUpdateOps);

//     console.log(result);
//     res.json({ message: 'Cart updated successfully' });
//   } catch (error) {
//     console.error('Error updating cart:', error);
//     res.status(500).json({ error: 'Failed to update cart' });
//   }
// });

// app.post('/orders', async (req, res) => {
//   try {
//     const { amount } = req.body;
//     const options = {
//       amount: amount * 100, // Amount in paise (100 paise = 1 INR)
//       currency: 'INR',
//       receipt: uuidv4(),
//     };

//     razorpay.orders.create(options, (error, order) => {
//       if (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Something went wrong!" });
//       }
//       res.status(200).json({ data: order });
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error!" });
//   }
// });

// app.post('/verify', (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
//     const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
//     hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
//     const expectedSignature = hmac.digest('hex');

//     if (razorpay_signature === expectedSignature) {
//       return res.status(200).json({ message: "Payment verified successfully" });
//     } else {
//       return res.status(400).json({ message: "Invalid signature" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error!" });
//   }
// });

// addfeedback
app.post("/addfeedback", async (req, res) => {
  let feedbackData = {
    title: req.body.title,
    description: req.body.description,
    userid: req.body.userid,
    farmer: req.body.farmer,
    email: req.body.email,
  };
  await database.then((dbase) => {
    dbase
      .collection("feedback")
      .insertOne(feedbackData)
      .then((results) => {
        console.log(results);
      });
  });
});

// viewfeedback
app.post("/feedback", (req, res) => {
  const farmerid = req.body.farmerid;
  database.then((db) => {
    db.collection("feedback")
      .find({ farmer: farmerid })
      .toArray()
      .then((result) => {
        console.log(result);
        res.json(result);
      })
      .catch((error) => {
        console.error("Error fetching :", error);
        res.status(500).send("Error fetching .");
      });
  });
});

// matchproduct

app.get("/matchproduct/:id", async (req, res) => {
  try {
    const matchId = req.params.id;
    database.then(async (db) => {
      const category = await db
        .collection("category")
        .findOne({ _id: new mongodb.ObjectId(matchId) });

      const products = await db
        .collection("product")
        .aggregate([
          { $match: { item: matchId } },
          { $addFields: { categoryId: { $toObjectId: "$item" } } },
          {
            $lookup: {
              from: "category",
              localField: "categoryId",
              foreignField: "_id",
              as: "newcart",
            },
          },
          { $unwind: "$newcart" },
        ])
        .toArray();

      res.json({ productresult: products, result: category });
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/orderlist", (req, res) => {
  const userids = req.body.userid;
  console.log(userids);

  database
    .then(async (dbase) => {
      var cartresult = await dbase
        .collection("cart")
        .aggregate([
          {
            $match: {
              $and: [{ status: 1 }, { userid: new mongodb.ObjectId(userids) }],
            },
          }, // Convert userids to ObjectId
          { $addFields: { products: { $toObjectId: "$productid" } } },
          {
            $lookup: {
              from: "product",
              localField: "products",
              foreignField: "_id",
              as: "newdatas",
            },
          },
          { $unwind: "$newdatas" },
        ])
        .toArray();
      console.log(cartresult);
      res.json(cartresult);
    })
    .catch((error) => {
      console.error("Error fetching cart data:", error);
      res.status(500).json({ error: "Error fetching cart data" });
    });
});

app.post("/addcomplaints", async (req, res) => {
  const { title, description, contact, userid, username, status } = req.body;

  try {
    const db = await database; // Access the MongoDB client from app locals

    // Insert new complaint into complaints collection
    const result = await db.collection("complaints").insertOne({
      title,
      description,
      contact,
      userid: new mongodb.ObjectId(userid), // Convert userid to ObjectId
      username,
      status: 0, // Initial status (could be updated later)
      createdAt: new Date(),
    });

    res.json({
      message: "Complaint added successfully",
      _id: result.insertedId,
    });
  } catch (error) {
    console.error("Error adding complaint:", error);
    res.status(500).json({ error: "Failed to add complaint" });
  }
});

app.post("/userComplaint", async (req, res) => {
  const { userid } = req.body;

  try {
    const db = await database; // Access the MongoDB client from app locals

    // Find complaints for the specified user
    const complaints = await db
      .collection("complaints")
      .find({ userid: new mongodb.ObjectId(userid) })
      .toArray();

    res.json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
});

app.get("/viewcompliants", async (req, res) => {
  try {
    const db = await database; // Access the MongoDB client from app locals

    // Find complaints for the specified user
    const complaints = await db.collection("complaints").find().toArray();

    res.json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
});

app.post("/rating", async (req, res) => {
  const {
    productId,
    farmerId,
    userId,
    rating,
    farmername,
    subcategory,
    username,
  } = req.body;

  try {
    const db = await database; // Access the MongoDB client from app locals

    const result = await db.collection("ratings").insertOne({
      productId: new mongodb.ObjectId(productId),
      farmerId: new mongodb.ObjectId(farmerId),
      userId: new mongodb.ObjectId(userId),
      rating: rating,
      farmername: farmername,
      subcategory: subcategory,
      username: username,
      createdAt: new Date(),
    });

    console.log("Rating added successfully:");
    res.json({ message: "Rating added successfully" });
  } catch (error) {
    console.error("Error adding rating:", error);
    res.status(500).json({ error: "Failed to add rating" });
  }
});

app.post("/profile", async (req, res) => {
  const userid = req.body.userid;
  try {
    const db = await database;

    const registerData = await db
      .collection("register")
      .findOne({ userId: new mongodb.ObjectId(userid) });
    if (!registerData) {
      return res.status(404).json({ error: "User not found" });
    }

    const loginData = await db
      .collection("login")
      .findOne({ _id: new mongodb.ObjectId(registerData.userId) });
    if (!loginData) {
      return res.status(404).json({ error: "Login data not found" });
    }

    const userProfile = {
      ...registerData,
      email: loginData.email,
      status: loginData.userStatus,
    };

    res.json(userProfile);
  } catch (error) {
    console.error("Error during fetching profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/updateProfile", async (req, res) => {
  const { userId, name, category, address, phone, dob, email } = req.body;
  const profileUpdate = {};

  if (name) profileUpdate.name = name;
  if (category) profileUpdate.category = category;
  if (address) profileUpdate.address = address;
  if (phone) profileUpdate.phone = phone;
  if (dob) profileUpdate.dob = dob;

  try {
    const db = await database;

    if (req.files && req.files.image) {
      const image = req.files.image;
      const imagePath = path.join(__dirname, "public", "uploads", image.name);

      image.mv(imagePath, (err) => {
        if (err) {
          console.error("Error moving image file:", err);
          return res.status(500).json({ error: "Image upload failed" });
        }
      });

      profileUpdate.image = `/uploads/${image.name}`;
    }

    // Update profile data in 'register' collection
    await db
      .collection("register")
      .updateOne(
        { userId: new mongodb.ObjectId(userId) },
        { $set: profileUpdate }
      );

    // Update email in 'login' collection
    if (email) {
      await db
        .collection("login")
        .updateOne({ _id: new mongodb.ObjectId(userId) }, { $set: { email } });
    }

    const updatedProfile = await db
      .collection("register")
      .findOne({ userId: new mongodb.ObjectId(userId) });
    const loginData = await db
      .collection("login")
      .findOne({ _id: new mongodb.ObjectId(userId) });

    const userProfile = {
      ...updatedProfile,
      email: loginData.email,
      status: loginData.userStatus,
    };

    res.json(userProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// admin view sales
// app.get('/salelist', (req, res) => {
//   database.then(async (dbase) => {
//     try {
//       var initialResult = await dbase.collection('cart').aggregate([
//         { $match: { status: 1 } },
//         { "$addFields": { "products": { "$toObjectId": "$productid" } } },
//         {
//           $lookup: {
//             from: 'product',
//             localField: 'products',
//             foreignField: '_id',
//             as: 'newdatas'
//           }
//         },
//         { $unwind: '$newdatas' },
//         { "$addFields": { "farmerObjId": { "$toObjectId": "$farmerid" } } }
//       ]).toArray();

//       console.log("Initial Result:", initialResult);

//       // Check farmer lookup with simplified pipeline
//       var farmerLookupResult = await dbase.collection('cart').aggregate([
//         { $match: { status: 1 } },
//         { "$addFields": { "farmerObjId": { "$toObjectId": "$farmerid" } } },
//         {
//           $lookup: {
//             from: 'register',
//             localField: 'farmerObjId',
//             foreignField: 'userId',
//             as: 'farmerData'
//           }
//         },
//         { $unwind: '$farmerData' }
//       ]).toArray();

//       console.log("Farmer Lookup Result:", farmerLookupResult);

//       res.json({ initialResult, farmerLookupResult });
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       res.status(500).json({ error: "Error fetching data" });
//     }
//   }).catch(error => {
//     console.error("Error connecting to database:", error);
//     res.status(500).json({ error: "Error connecting to database" });
//   });
// });

app.get("/salelist", (req, res) => {
  database
    .then(async (dbase) => {
      try {
        // Fetch initial data with product details
        var initialResult = await dbase
          .collection("cart")
          .aggregate([
            { $match: { status: 1 } },
            { $addFields: { products: { $toObjectId: "$productid" } } },
            {
              $lookup: {
                from: "product",
                localField: "products",
                foreignField: "_id",
                as: "newdatas",
              },
            },
            { $unwind: "$newdatas" },
            { $addFields: { farmerObjId: { $toObjectId: "$farmerid" } } },
          ])
          .toArray();

        // console.log("Initial Result:", initialResult);

        // Fetch farmer data from register collection where userId matches farmerObjId
        var farmerLookupResult = await dbase
          .collection("register")
          .aggregate([
            {
              $match: {
                userId: { $in: initialResult.map((item) => item.farmerObjId) },
              },
            },
          ])
          .toArray();

        // console.log("Farmer Lookup Result:", farmerLookupResult);

        // Merge initialResult with farmerLookupResult
        const mergedResult = initialResult.map((cartItem) => {
          const farmerData = farmerLookupResult.find(
            (farmer) =>
              farmer.userId.toString() === cartItem.farmerObjId.toString()
          );
          return { ...cartItem, farmerData };
        });

        // console.log("Merged Result:", mergedResult);

        res.json(mergedResult);
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Error fetching data" });
      }
    })
    .catch((error) => {
      console.error("Error connecting to database:", error);
      res.status(500).json({ error: "Error connecting to database" });
    });
});

app.post("/salereport", (req, res) => {
  const farmerid = req.body.farmerid;
  // console.log(farmerid);

  database
    .then(async (dbase) => {
      var cartresult = await dbase
        .collection("cart")
        .aggregate([
          {
            $match: {
              $and: [
                { status: 1 },
                { farmerid: new mongodb.ObjectId(farmerid) },
              ],
            },
          }, // Convert userids to ObjectId
          { $addFields: { products: { $toObjectId: "$productid" } } },
          {
            $lookup: {
              from: "product",
              localField: "products",
              foreignField: "_id",
              as: "newdatas",
            },
          },
          { $unwind: "$newdatas" },
        ])
        .toArray();
      // console.log(cartresult);
      res.json(cartresult);
    })
    .catch((error) => {
      console.error("Error fetching cart data:", error);
      res.status(500).json({ error: "Error fetching cart data" });
    });
});

app.post("/updateproductstatus", (req, res) => {
  const { productId, status } = req.body;

  database.then((db) => {
    db.collection("product")
      .updateOne(
        { _id: new mongodb.ObjectId(productId) },
        { $set: { status: status } }
      )
      .then((result) => {
        res.json({ message: "Status updated successfully" });
      })
      .catch((error) => {
        console.error("Error updating product status:", error);
        res.status(500).send("Error updating product status.");
      });
  });
});

// app.post('/viewrating', async (req, res) => {
//   const { farmerId } = req.body;
//   console.log(farmerId);
//   try {
//     const db = await database;
//     const ratings = await db.collection('ratings')
//       .find({ farmerId: new mongodb.ObjectId(farmerId) })
//       .toArray();
//     console.log(ratings);
//     res.json(ratings);
//   } catch (error) {
//     console.error('Error fetching ratings:', error);
//     res.status(500).json({ error: 'Failed to fetch ratings' });
//   }
// });

app.post("/bestfarmer", async (req, res) => {
  const topFarmerId = req.body.topFarmerId;
  if (!mongodb.ObjectId.isValid(topFarmerId)) {
    return res.status(400).json({ error: "Invalid farmer ID format" });
  }
  console.log(topFarmerId);
  try {
    const db = await database; // Assuming `database` is your MongoDB connection
    const farmer = await db
      .collection("register")
      .findOne({ userId: new mongodb.ObjectId(topFarmerId) });
    res.json(farmer);
    console.log(farmer);
  } catch (error) {
    console.error("Error fetching farmer:", error);
    res.status(500).json({ error: "Failed to fetch farmer" });
  }
});

app.post("/viewrating", async (req, res) => {
  const { farmerId } = req.body;
  console.log(farmerId);
  try {
    const db = await database;
    const ratings = await db
      .collection("ratings")
      .aggregate([
        { $match: { farmerId: new mongodb.ObjectId(farmerId) } },
        { $addFields: { users: { $toObjectId: "$userId" } } },

        {
          $lookup: {
            from: "login", // Assuming your users collection is named 'users'
            localField: "users",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        { $unwind: "$userDetails" },
      ])
      .toArray();
    console.log(ratings);
    res.json(ratings);
  } catch (error) {
    console.error("Error fetching ratings:", error);
    res.status(500).json({ error: "Failed to fetch ratings" });
  }
});

app.listen(5000, () => {
  console.log("Server is Running");
});
