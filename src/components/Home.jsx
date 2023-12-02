import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/functions";
import "firebase/compat/storage";
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import 'bootstrap/dist/css/bootstrap.min.css';


import { auth, fs } from "../configuration/config";
import { Navbar } from './Navbar';
import { useNavigate } from 'react-router-dom';

import './styles.css';
import Productlist from "./Productlist";

export const Home = () => {
  const Navigate=useNavigate();

  function GetUserUid() {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {  
        if (user) {
          setUid(user.uid);  
        }
      });
      return unsubscribe;
    }, []);
    return uid;
  }
  

  const uid = GetUserUid();

  function GetCurrentUser() {
    const [user, setUser] = useState(null);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          fs.collection('users').doc(user.uid).get().then(snapshot => {
            if (snapshot && snapshot.data() && snapshot.data().FullName) {
              setUser(snapshot.data().FullName);
            } else {
              setUser(null);
            }
          }).catch(error => {
            console.error("Erreur lors de la récupération des données utilisateur :", error);
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

  const [products, setProducts] = useState([]);

  const [productsInRows, setProductsInRows] = useState([]);

  const getProducts = async () => {
      const products = await fs.collection('products').get();
      const productsArray = [];
      products.forEach(snap => {
          var data = snap.data();
          data.ID = snap.id;
          productsArray.push({
              ...data
          });
      });
      setProducts(productsArray);
      organizeProductsInRows(productsArray);
  };

  const organizeProductsInRows = (productsArray) => {
      const productsInRows = [];
      for (let i = 0; i < productsArray.length; i += 3) {
          productsInRows.push(productsArray.slice(i, i + 3));
      }
      setProductsInRows(productsInRows);
  };

  useEffect(() => {
      getProducts();
  }, []);

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

let Product;
const AddTocart = (product) => {
  
  if (uid !== null) {
    Product = product;
    Product.qty = 1;
    Product.TotalProductPrice = Product.qty * Product.price;

    fs.collection('Cart'+uid).doc(product.ID).set(Product).then(() => {
      console.log('Item successfully added to the cart');
      
    });
  } else {
    Navigate('/login');
  }
};



return (
  <>
  
    <Navbar user={user} totaProducts={totaProducts} />
    <div className="container-fluid mt-4">
      <h1 className="text-center">Products</h1>
      <Productlist products={products} AddTocart={AddTocart} />
    </div>
    <motion.div animate={{ x: 100 }} />
  </>
);
  }