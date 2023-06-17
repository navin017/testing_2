import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import { updateProduct } from '../redux/action/productAction';
import './products.css';
import { Form } from './form';

export const ProductComponent = () => {
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const isEditing = (true);
  const showDetailsHandler = (productId) => {
    setShowDetails((prevState) => ({
      ...prevState,
      [productId]: true,
    }));
  };

  const closeViewHandler = (productId) => {
    setShowDetails((prevState) => ({
      ...prevState,
      [productId]: false,
    }));
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleSaveProduct = (updatedProduct) => {
    dispatch(updateProduct(updatedProduct));
    setSelectedProduct(null);
  };

  return (
    <div className='totControl' data-testid="all" title='alldiv'>
      {products.map((product) => (
        <div className='components' data-testid="component" key={product.id}>
          <img className="imge" data-testid="imageComponent" src={product.image} alt='img' />
          <ul data-testid="listComponent">
            <div className='content'>
              <li className='modify' data-testid="3Components">
                <button data-testid='viewComponent' onClick={() => showDetailsHandler(product.id)} className='view-btn'>view</button>
                <AutoFixHighRoundedIcon onClick={() => handleEditProduct(product)} data-testid="editComponent" title='view-btn' />
                <div className='title' data-testid="proTitle">{product.title}</div>
              </li>
            </div>
          </ul>
          {showDetails[product.id] && (
            <table className='viewForm' data-testid='viewDetails'>
              <tbody>
                <tr>
                  <td className='align'>
                    <img className="images" data-testid='imageDetails' src={product.image} alt='img' />
                  </td>
                </tr>
                <tr>
                  <td className='align'><label htmlFor='id' data-testid='detailsProName'>PRODUCT NAME</label></td>
                  <td data-testid='detailsProTitle'>{product.title}</td>
                </tr>
                <tr>
                  <td className='align'><label htmlFor='id'data-testid='detailsProId'>PRODUCT ID</label></td>
                  <td data-testid='detailsId'>{product.id}</td>
                </tr>
                <tr>
                  <td className='align'><label htmlFor='id' data-testid='detailsProSize'>PRODUCT SIZE</label></td>
                  <td data-testid='detailsSize'>{product.size}</td>
                </tr>
                <tr>
                  <td className='align'><label htmlFor='id' data-testid='detailsProQuantity'>PRODUCT QUANTITY</label></td>
                  <td data-testid='detailsQuantity'>{product.quantity}</td>
                </tr>
                <tr>
                  <td className='align'><label htmlFor='id' data-testid='detailsProPrice'>PRODUCT PRICE</label></td>
                  <td data-testid='detailsPrice'>{product.price}</td>
                </tr>
                <tr>
                  <td>
                    <button onClick={() => closeViewHandler(product.id)} className='closebtn'>Close</button>
                  </td>
                 
                </tr>
              </tbody>
            </table>
          )}
        </div>
      ))}
      {selectedProduct && (
        <Form
          product={selectedProduct}
          handleSave={handleSaveProduct}
          handleClose={() => setSelectedProduct(null)}
          isEditing={isEditing}
        />
      )}
 {/* //<Form  product={product} isEditing={isEditing} /> */}
    </div>
  );
};
