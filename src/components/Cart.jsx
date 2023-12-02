import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { auth, fs } from '../configuration/config';
import { CartProducts } from './CartProducts';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import EmailRestAPI from './EmailRestAPI';
import EmailForm from './EmailForm';



      export const Cart = () => {
        function GetCurrentUser() {
          const [user, setUser] = useState(null);

          useEffect(() => {
            const unsubscribe = auth.onAuthStateChanged((user) => {
              if (user) {
                fs.collection("users")
                  .doc(user.uid)
                  .get()
                  .then((snapshot) => {
                    if (snapshot && snapshot.data() && snapshot.data().FullName) {
                      setUser(snapshot.data().FullName);
                    } else {
                      setUser(null);
                    }
                  })
                  .catch((error) => {
                    console.error(
                      "Erreur lors de la récupération des données utilisateur :",
                      error
                    );
                  });
              } else {
                setUser(null);
                console.log('No user found.');
              }
            });

            return unsubscribe;
          }, []);
          console.log('Returning user:', user);
          return user;
        }
        

        const user = GetCurrentUser();
        const [cartProducts, setCartProducts] = useState([]);

        useEffect(() => {
          auth.onAuthStateChanged((user) => {
            if (user) {
              const unsubscribe = fs.collection("Cart" + user.uid).onSnapshot(
                (querySnapshot) => {
                  const newCartProduct = querySnapshot.docs.map((doc) => ({
                    ID: doc.id,
                    ...doc.data(),
                  }));
                  setCartProducts(newCartProduct);
                },
                (error) => {
                  console.error("Erreur lors de la récupération du panier :", error);
                }
              );

              return () => unsubscribe(); 
            } else {
              console.log("L'utilisateur n'est pas connecté pour récupérer le panier.");
            }
          });
        }, []);

        const qty =cartProducts.map(cartProduct=>{
          return cartProduct.qty;
        })

        const reducerOfQty=(accumulator,currentValue)=>accumulator+currentValue;

        const totalQty=qty.reduce(reducerOfQty,0)
        
        const price=cartProducts.map((cartProduct)=>{
          return cartProduct.TotalProductPrice;
        })

        const reducerOfPrice=(accumulator,currentValue)=>accumulator+currentValue;
        const totalPrice=price.reduce(reducerOfPrice,0)

      let Product;
      const  cartProductIncrease=(cartProduct)=>{
      Product=cartProduct;
      Product.qty=Product.qty+1;
      Product.TotalProductPrice=Product.qty*Product.price;
      auth.onAuthStateChanged(user=>{
        if(user){
        fs.collection('Cart'+ user.uid).doc(cartProduct.ID).update(Product).then(()=>{
          console.log('increment added');
        })
        }
        else{
          console.log('user is not logged  in to increment');
        }
      })}


      const  cartProductDecrease=(cartProduct)=>{
        Product=cartProduct;
        
      
              if(Product.qty>1){
                Product.qty=Product.qty-1;
                Product.TotalProductPrice=Product.qty*Product.price;
                auth.onAuthStateChanged(user=>{
                  if(user){
                  fs.collection('Cart'+ user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                    console.log('decrement added');
                  })
                  }
                  else{
                    console.log('user is not logged  in to decrement');
                  }
                })

          
          }
          
        }

        const [totaProducts,setTotalProducts]=useState(0);
        useEffect(()=>{
          auth.onAuthStateChanged(user=>{
            if(user){
              fs.collection('Cart' + user.uid).onSnapshot(snapshot=>{
                const qty=snapshot.docs.length;
                setTotalProducts(qty);
                })
              }
            })
          },[])
      
              const navigate=useNavigate();
              const handleToken = async (token) => {
            const cart={name:'ALL PRODUCTS',totalPrice}
            
      
      
       
        
         
        }
        
        
        
        

        return (
          <>
            <ToastContainer />
            <Navbar user={user} totaProducts={totaProducts} />
            <br />
            
            
            {cartProducts.length > 0 && (
              <div className="container-fluid">
                <h1 className="text-center">Cart</h1>
                <div className="row">
                  <div className="col-md-8">
                    <div className="products-box">
                      <CartProducts
                        cartProducts={cartProducts}
                        cartProductIncrease={cartProductIncrease}
                        cartProductDecrease={cartProductDecrease}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="summary-box p-3 border">
                      <h5>Cart Summary</h5>
                      <br />
                      <div>
                        Total Number of Products: <span>{totalQty}</span>
                      </div>
                      <div>
                        Total Price To Pay: <span>DT {totalPrice}</span>
                        <EmailRestAPI totalPrice={totalPrice} userName={user}></EmailRestAPI>
                        <EmailForm totalPrice={totalPrice} userName={user}></EmailForm>
                      </div>
                      <br />
                      
                    </div>
                  </div>
                </div>
              </div>
            )}
      
            {cartProducts.length < 1 && (
              <div className="container-fluid text-center mt-5">
                <h3>No products in the cart</h3>
              </div>
            )}
          </>
        );
      };
