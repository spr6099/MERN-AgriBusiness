// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import Header from '../Components/Header';
// import Footer from '../Components/Footer';


// function Payment() {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const totalAmount = searchParams.get('total') || 0;
//   const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('userdata')))
//   const users = auth._id

//   const [carts, setCarts] = useState([]);
//   const [quantities, setQuantities] = useState({});

//   const [shoe] = useState({
//     name: "Harvest Hub ",
//     img: "/img/login/logo.png",
//     price: totalAmount,
//   });

//   const handlePay = async () => {
//     try {
//       const orderResponse = await axios.post('http://localhost:5000/orders', {
//         amount: shoe.price
//       });
  
//       const orderData = orderResponse.data.data;
//       const options = {
//         key: 'rzp_test_4Ex6Tyjkp79GFy', // Replace with your Razorpay public key
//         amount: orderData.amount,
//         currency: orderData.currency,
//         name: shoe.name,
//         description: 'Test',
//         image: shoe.img,
//         order_id: orderData.id,
//         handler: async function (response) {
//           try {
//             await axios.post('http://localhost:5000/verify', {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               cartItems: cartItemsToUpdate // Pass cart items to update
//             });
//             // Redirect or update UI based on success
//           } catch (error) {
//             console.error('Error in payment verification:', error);
//           }
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };
  
//       // Check if Razorpay constructor is available
//       if (window.Razorpay) {
//         const rzp1 = new window.Razorpay(options);
//         rzp1.open();
//       } else {
//         console.error('Razorpay library not loaded');
//       }
//     } catch (error) {
//       console.error('Error in handlePay:', error);
//     }
//   };
  

//   const updateCart = () => {
//     // Extract the IDs and quantities of items to be updated
//     const cartItemsToUpdate = carts.map(cartItem => ({
//       id: cartItem._id,
//       quantity: quantities[cartItem.newdatas._id]
//     }));

//     // Update the status of cart items from 0 to 1 and include the quantities
//     fetch('http://localhost:5000/updateCart', {
//       method: 'post',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ cartItems: cartItemsToUpdate })
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         // Navigate to the payment page with the total amount
//       })
//       .catch((error) => {
//         console.error("Error updating cart:", error);
//       });
//   };

//   return (
//     <>
//       <Header/>
//       <div className="App">
//         <div className="shoe_container" style={{ margin: "100px", padding:"30px" }} >
//           <img src={process.env.PUBLIC_URL + shoe.img} alt={shoe.name} style={{ width: "350px", height: "250px" }} />
//           <p className="shoe_name"><h2>{shoe.name}</h2></p>
//           <p className="shoe_creator">By {auth.email}</p>
//           <h4 className="shoe_price" style={{color:"red"}}>Price: ₹{shoe.price}</h4><br></br>
//           <button onClick={handlePay} className="btn btn-primary">Buy Now</button>
//         </div>
//       </div>
//       <Footer/>
//     </>
//   );
// }

// export default Payment;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Payment() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const totalAmount = searchParams.get('total') || 0;
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('userdata')));
  const users = auth._id;

  const [carts, setCarts] = useState([]);
  const [quantities, setQuantities] = useState({});

  const [shoe] = useState({
    name: "Harvest Hub ",
    img: "/img/login/logo.png",
    price: totalAmount,
  });

  useEffect(() => {
    // Fetch cart items and quantities here
    // Example:
    const fetchCartItems = async () => {
      try {
        const response = await axios.post('http://localhost:5000/viewcart', {
          userid: users
        });
        setCarts(response.data);
        const initialQuantities = response.data.reduce((acc, item) => {
          acc[item.newdatas._id] = 1;
          return acc;
        }, {});
        setQuantities(initialQuantities);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [users]);

  const handlePay = async () => {
    try {
      const orderResponse = await axios.post('http://localhost:5000/orders', {
        amount: shoe.price
      });

      const orderData = orderResponse.data.data;
      const cartItemsToUpdate = carts.map(cartItem => ({
        id: cartItem._id,
        quantity: quantities[cartItem.newdatas._id]
      }));

      const options = {
        key: 'rzp_test_4Ex6Tyjkp79GFy', // Replace with your Razorpay public key
        amount: orderData.amount,
        currency: orderData.currency,
        name: shoe.name,
        description: 'Test',
        image: shoe.img,
        order_id: orderData.id,
        handler: async function (response) {
          try {
            await axios.post('http://localhost:5000/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              cartItems: cartItemsToUpdate
            });
            // Redirect or update UI based on success
          } catch (error) {
            console.error('Error in payment verification:', error);
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Check if Razorpay constructor is available
      if (window.Razorpay) {
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        console.error('Razorpay library not loaded');
      }
    } catch (error) {
      console.error('Error in handlePay:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="App">
        <div className="shoe_container" style={{ margin: "100px", padding: "30px" }}>
          <img src={process.env.PUBLIC_URL + shoe.img} alt={shoe.name} style={{ width: "350px", height: "250px" }} />
          <p className="shoe_name"><h2>{shoe.name}</h2></p>
          <p className="shoe_creator">By {auth.email}</p>
          <h4 className="shoe_price" style={{ color: "red" }}>Price: ₹{shoe.price}</h4><br></br>
          <button onClick={handlePay} className="btn btn-primary">Buy Now</button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Payment;
