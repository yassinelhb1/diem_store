
import { BrowserRouter,Route,Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Singup } from "./components/Singup";
import { Login } from "./components/Login";
import { Addproduct } from "./components/Addproduct";
import { Cart } from "./components/Cart";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/components/styles.css';
import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import EmailRestAPI from "./components/EmailRestAPI";




export const App =()=> {
 

return(
   
        
    
      
    <BrowserRouter>
       <Routes>
       
        <Route exact path="/" Component={Home}/>
        <Route  path="/singup" Component={Singup}/>
        <Route  path="/login" Component={Login}/>
        <Route  path="/addproduct" Component={Addproduct}/>
        <Route  path="/cart" Component={Cart}/>
      <Route  path="/emailrestapi" Component={EmailRestAPI}/>
       </Routes>
       </BrowserRouter>
       
    )
}

export default App

