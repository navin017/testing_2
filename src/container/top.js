import React, { Fragment, useRef, useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { updateProduct } from '../redux/action/productAction';
import './products.css';

export const Top = ({ product, isEditing }) => {
  const dispatch = useDispatch();
  const nameInputRef = useRef();
  const [inputValue, setInputValue] = useState('');
  const [inputId, setInputId] = useState('');
  const [inputQuantity, setInputQuantity] = useState('');
  const [inputPrice, setInputPrice] = useState('');
  const [size, setSize] = useState('');
  const [formVisible, setFormVisible] = useState(isEditing);



  const inputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const inputIdChangeHandler = (e) => {
    setInputId(e.target.value);
  };

  const inputSizeChangeHandler = (e) => {
    setSize(e.target.value);
  };

  const inputQuantityChangeHandler = (e) => {
    setInputQuantity(e.target.value);
  };

  const inputPriceChangeHandler = (e) => {
    setInputPrice(e.target.value);
  };

  const inputEditFormHandler = (e) => {
    e.preventDefault();
    // Update the product details with the changes
    const updatedProduct = {
      ...product,
      title: inputValue,
      id: inputId,
      quantity: inputQuantity,
      price: inputPrice,
      size: size,
    };
    dispatch(updateProduct(updatedProduct));

    // Reset form fields
    setInputValue('');
    setInputId('');
    setInputQuantity('');
    setInputPrice('');
    setSize('');

    // Hide the form
    setFormVisible(false);
  };

  useEffect(() => {
    // Set form field values based on product details when isEditing is true
    if (isEditing && product) {
      setInputValue(product.title || '');
      setInputId(product.id || '');
      setInputQuantity(product.quantity || '');
      setInputPrice(product.price || '');
      setSize(product.size || '');
      setFormVisible(true);
    }
  }, [isEditing, product]);


  return (
    <div data-testid='container'>
      {formVisible && (
        <form onSubmit={inputEditFormHandler}>
          <Fragment>
            <div data-testid='form'>
              <table className='cover'>
                <h3>PRODUCT DETAILS</h3>
                <tr>
                  <td>
                    <label htmlFor='pname'>ENTER PRODUCT NAME</label>
                    <input
                      maxLength={10}
                      type='text'
                      ref={nameInputRef}
                      className='pname'
                      name='pname'
                      onChange={inputChangeHandler}
                      value={inputValue}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label htmlFor='id'>ENTER PRODUCT ID</label>
                    <br />
                    <input
                      maxLength={9}
                      type='number'
                      className='id'
                      name='id'
                      onChange={inputIdChangeHandler}
                      value={inputId}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label htmlFor='size'>SIZE</label>
                    <br />
                    <select className='size' name='size' onChange={inputSizeChangeHandler} value={size}>
                      <option value='s'>Small</option>
                      <option value='m'>Medium</option>
                      <option value='l'>Large</option>
                      <option value='xl'>XL</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor='quantity'>QUANTITY</label>
                    <br />
                    <input
                      maxLength={3}
                      type='number'
                      className='quantity'
                      name='quantity'
                      onChange={inputQuantityChangeHandler}
                      value={inputQuantity}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label htmlFor='price'>ENTER PRODUCT PRICE</label> <br />
                    <select className='currency' name='currency'>
                      <option value='rs'>₹</option>
                      <option value='doll'>$</option>
                    </select>
                    <input
                      maxLength={4}
                      type='number'
                      className='priceupdate'
                      name='price'
                      onChange={inputPriceChangeHandler}
                      value={inputPrice}
                    />
                  </td>
                </tr>

                <div className='submission'>
                  <button type='submit' title='sub' data-testid='sub' onSubmit={inputEditFormHandler} className='submit-btn'>Update</button>
                </div>
              </table>
            </div>
          </Fragment>
        </form>
      )}
    </div>
  );
};
export default Top