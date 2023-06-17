import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { addProduct } from '../redux/action/productAction';
import { ProductList } from './productList';
import {Form} from './form'
import { ProductComponent } from './productComponent';

export const Header = (props) => {
  const [showForm, setShowForm] = useState(false);
  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };
  const handleCloseForm = () => {
    setShowForm(false);
  };
  
  return (
    <>
    <>
    
   
    
    <div Data-testid='headerAll'>
      <header className="App-header">
        <div className="top">
          <Link to="/login" className="link" >
            <button className="AdminButton" Data-testid='logout'>
              <p className="toptext">LOGOUT</p>
            </button>
          </Link>
          <button className="AdminButton" onClick={openForm} Data-testid='add_product'>
            <p className="toptext">ADD PRODUCT</p>
          </button>
          <div className="topic">
            <h1 className="headtext" Data-testid='heading'>SHOP-CART</h1>
          </div>
        </div>
        
        
      </header>
      {showForm && <Form handleClose={closeForm} />}

      
      
      <ProductList/>

    </div>
    </>
              {showForm && <Form handleClose={closeForm} />}
</>
  );
};
