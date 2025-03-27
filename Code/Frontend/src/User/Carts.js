import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import './cart.css';

function Carts() {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('userdata')));
  const [carts, setCarts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userid = auth._id;
    fetch('http://localhost:5000/viewcart', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userid: userid })
    })
    .then((res) => res.json())
    .then((result) => {
      setCarts(result);
      const initialQuantities = result.reduce((acc, cur) => {
        acc[cur.newdatas._id] = 1;
        return acc;
      }, {});
      setQuantities(initialQuantities);
      const total = result.reduce((acc, cur) => {
        const itemTotal = cur.newdatas.price * initialQuantities[cur.newdatas._id];
        return acc + itemTotal;
      }, 0);
      setTotalAmount(total);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, [auth._id]);

  const handleQuantityChange = (productId, quantity) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: quantity
    }));
    const total = carts.reduce((acc, cur) => {
      const itemTotal = cur.newdatas.price * (productId === cur.newdatas._id ? quantity : quantities[cur.newdatas._id]);
      return acc + itemTotal;
    }, 0);
    setTotalAmount(total);
  };

  const deletecart = (id) => {
    let params = { id: id };

    fetch('http://localhost:5000/deleteCart', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    .then((res) => res.json())
    .then((result) => {
      setMessage('Item removed from cart successfully!');
      setTimeout(() => {
        setMessage('');
      }, 2000);
      setCarts(carts.filter(cartItem => cartItem._id !== id));
      const total = carts.reduce((acc, cur) => {
        if (cur._id !== id) {
          const itemTotal = cur.newdatas.price * quantities[cur.newdatas._id];
          return acc + itemTotal;
        }
        return acc;
      }, 0);
      setTotalAmount(total);
    })
    .catch((error) => {
      console.error("Error deleting :", error);
      setMessage('Failed to remove item from cart.');
      setTimeout(() => {
        setMessage('');
      }, 2000);
    });
  };

  const handleProceedToPay = () => {
    const queryParams = new URLSearchParams({
      total: totalAmount
    }).toString();
    navigate(`/payment?${queryParams}`);
  };

  return (
    <>
      <Header />
      <div className="humberger__menu__overlay"></div>
      <h2 style={{ marginLeft: "90px", marginTop: "30px" }}>
        My Cart
        <FontAwesomeIcon icon={faCartShopping} />
      </h2>
      <section className="shoping-cart spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="shoping__cart__table" style={{ borderBottom: "thin solid gray" }}>
                {message && <div className="alert alert-info">{message}</div>}
                <table>
                  <thead>
                    <tr style={{ borderBottom: "thin solid gray" }}>
                      <th className="shoping__product text-dark">Products</th>
                      <th className="text-dark">Price</th>
                      <th className="text-dark">Quantity</th>
                      <th className="text-dark">Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {carts.map((data, index) => (
                      <tr key={index} style={{ borderBottom: "thin solid gray" }}>
                        <td className="shoping__cart__item">
                          <img
                            src={`http://localhost:5000/${data.newdatas.picture}`}
                            alt={data.newdatas.subcategory}
                            style={{ width: '100px', height: '100px' }} />
                          &nbsp; &nbsp; &nbsp; &nbsp;
                          <h5 style={{ textTransform: "capitalize" }}><b>{data.newdatas.subcategory}</b></h5>
                        </td>
                        <td className="shoping__cart__price">
                          ₹{data.newdatas.price}
                        </td>
                        <td className="shoping__cart__quantity">
                          <div className="quantity">
                            <div className="pro-qty">
                              <input
                                type="number"
                                value={quantities[data.newdatas._id]}
                                onChange={(e) => handleQuantityChange(data.newdatas._id, parseInt(e.target.value))}
                                min={1}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="shoping__cart__total text-dark">
                          ₹{data.newdatas.price * quantities[data.newdatas._id]}
                        </td>
                        <td className="shoping__cart__item__close">
                          <FontAwesomeIcon icon={faTrashAlt} onClick={() => deletecart(data._id)} style={{ cursor: "pointer", color: "red" }} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-lg-4" style={{ marginTop: "70px" }}>
              <div className="shoping__checkout">
                <h5>Cart Total</h5>
                <ul>
                  <li>Total <span>₹{totalAmount.toFixed(2)}</span></li>
                </ul>
                <a href="#" onClick={handleProceedToPay} className="primary-btn">PROCEED TO PAY</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Carts;




// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCartShopping, faTrashAlt } from '@fortawesome/free-solid-svg-icons';  // Importing trash icon
// import Header from "../Components/Header";
// import Footer from "../Components/Footer";
// import './cart.css'
// function Carts() {
//   const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('userdata')));
//   const [carts, setCarts] = useState([]);
//   const [quantities, setQuantities] = useState({});
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [message, setMessage] = useState(''); // Add state for message
//   const navigate = useNavigate();

//   useEffect(() => {
//     let userid = auth._id;
//     fetch('http://localhost:5000/viewcart', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ userid: userid })
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         console.log(result);
//         setCarts(result);
//         // Initialize quantities with default values of 1 for each item
//         const initialQuantities = result.reduce((acc, cur) => {
//           acc[cur.newdatas._id] = 1;
//           return acc;
//         }, {});
//         setQuantities(initialQuantities);
//         // Calculate total amount
//         const total = result.reduce((acc, cur) => {
//           const itemTotal = cur.newdatas.price * initialQuantities[cur.newdatas._id];
//           return acc + itemTotal;
//         }, 0);
//         setTotalAmount(total);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, [auth._id]);

//   const handleQuantityChange = (productId, quantity) => {
//     setQuantities(prevQuantities => ({
//       ...prevQuantities,
//       [productId]: quantity
//     }));
//     // Recalculate total amount
//     const total = carts.reduce((acc, cur) => {
//       const itemTotal = cur.newdatas.price * (productId === cur.newdatas._id ? quantity : quantities[cur.newdatas._id]);
//       return acc + itemTotal;
//     }, 0);
//     setTotalAmount(total);
//   };

//   const getTotalPrice = (price, quantity) => {
//     return price * quantity;
//   };

//   const deletecart = (id) => {
//     let params = { id: id };

//     fetch('http://localhost:5000/deleteCart', {
//       method: 'post',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(params)
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         setMessage('Item removed from cart successfully!'); // Set success message
//         setTimeout(() => {
//           setMessage(''); // Clear message after 2 seconds
//         }, 2000);
//         // Remove the deleted item from the cart
//         setCarts(carts.filter(cartItem => cartItem._id !== id));
//         // Recalculate total amount
//         const total = carts.reduce((acc, cur) => {
//           if (cur._id !== id) {
//             const itemTotal = cur.newdatas.price * quantities[cur.newdatas._id];
//             return acc + itemTotal;
//           }
//           return acc;
//         }, 0);
//         setTotalAmount(total);
//       })
//       .catch((error) => {
//         console.error("Error deleting :", error);
//         setMessage('Failed to remove item from cart.'); // Set error message
//         setTimeout(() => {
//           setMessage(''); // Clear message after 2 seconds
//         }, 2000);
//       });
//   };

 

//   return (
//     <>
//       <Header />
//       <div className="humberger__menu__overlay"></div>
//       <h2 style={{ marginLeft: "90px", marginTop: "30px" }}>My Cart
//         <FontAwesomeIcon icon={faCartShopping} />
//       </h2>
//       <section className="shoping-cart spad">
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-8">
//               <div className="shoping__cart__table" style={{borderBottom: "thin solid gray"}} >
//                 {message && <div className="alert alert-info">{message}</div>} {/* Display message */}
//                 <table>
//                   <thead>
//                     <tr style={{borderBottom: "thin solid gray"}}>
//                       <th className="shoping__product text-dark">Products</th>
//                       <th className="text-dark">Price</th>
//                       <th className="text-dark">Quantity</th>
//                       <th className="text-dark">Total</th>
//                       <th></th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {carts.map((data, index) => (
//                       <tr key={index}style={{borderBottom: "thin solid gray"}}>
//                         <td className="shoping__cart__item" >
//                           <img 
//                           src={`http://localhost:5000/${data.newdatas.picture}`}
//                           alt={data.newdatas.subcategory} style={{ width: '100px', height: '100px' }} />
//                           &nbsp; &nbsp; &nbsp; &nbsp; <h5 style={{ textTransform: "capitalize" }}><b>{data.newdatas.subcategory} </b></h5>
//                         </td>
//                         <td className="shoping__cart__price">
//                           ₹{data.newdatas.price}
//                         </td>
//                         <td className="shoping__cart__quantity">
//                           <div className="quantity">
//                             <div className="pro-qty">
//                               <input
//                                 type="number"
//                                 value={quantities[data.newdatas._id]}
//                                 onChange={(e) => handleQuantityChange(data.newdatas._id, parseInt(e.target.value))}
//                                 min={1}
//                               />
//                             </div>
//                           </div>
//                         </td>
//                         <td className="shoping__cart__total text-dark">
//                           ₹{getTotalPrice(data.newdatas.price, quantities[data.newdatas._id])}
//                         </td>
//                         <td className="shoping__cart__item__close">
//                           <FontAwesomeIcon icon={faTrashAlt} onClick={() => deletecart(data._id)} style={{ cursor: "pointer", color: "red" }} />
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//             <div className="col-lg-4" style={{ marginTop: "70px" }}>
//               <div className="shoping__checkout">
//                 <h5>Cart Total</h5>
//                 <ul>
//                   <li>Total <span>₹{totalAmount.toFixed(2)}</span></li>
//                 </ul>
//                 <a href="#"  className="primary-btn">PROCEED TO PAY</a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// }

// export default Carts;


