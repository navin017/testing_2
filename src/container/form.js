  // import React from 'react'
  import React, { Fragment, useState, useEffect } from 'react';
  import { useDispatch } from "react-redux";
  import { Link } from 'react-router-dom';
  import { addProduct } from '../redux/action/productAction';
  import { ProductList } from './productList';

  export const Form=({handleClose})=> {
      const dispatch = useDispatch();
      // const nameInputRef = useRef();
      const [include, setInclude] = useState(false);
      const [image, setImage] = useState([]);
      const [newInclude, setNewInclude] = useState([]);
      const [inputValue, setInputValue] = useState('');
      const [enterValue, setEnterValue] = useState(true);
      const [inputId, setInputId] = useState('');
      const [enterId, setEnterId] = useState(true);
      const [inputQuantity, setInputQuantity] = useState('');
      const [enterQuantity, setEnterQuantity] = useState(true);
      const [inputPrice, setInputPrice] = useState('');
      const [enterPrice, setEnterPrice] = useState(true);
      const [updateData, setUpdateData] = useState([]);
      const [size, setSize] = useState('');
      const [format, setFormat] = useState(true);
      const [showFormatError, setShowFormatError] = useState(false);
      const [isEditing, setIsEditing] = useState(false);
    
      const allowedFormats = ['.jpeg', '.png', '.jpg'];
    
    
    
      const uploadImage = (e) => {
        const selectedFiles = [...e.target.files];
        const invalidFiles = selectedFiles.filter((file) => {
          const fileName = file.name.toLowerCase();
          const fileExtension = fileName.substring(fileName.lastIndexOf('.'));
          return !allowedFormats.includes(fileExtension);
        });
    
        if (invalidFiles.length > 0) {
          setFormat(false);
          return;
        }
    
        else {
          setFormat(true);
          setImage(selectedFiles);
        }
      };
    
    
    
      const inputChangeHandler = (e) => {
        setInputValue(e.target.value);
        setUpdateData({
          ...updateData,
          [e.target.name]: e.target.value,
        });
      };
    
      const inputIdChangeHandler = (e) => {
        setInputId(e.target.value);
        setUpdateData({
          ...updateData,
          [e.target.name]: e.target.value,
        });
      };
    
      const inputSizeChangeHandler = (e) => {
        setSize(e.target.value);
      };
    
      const inputQuantityChangeHandler = (e) => {
        setInputQuantity(e.target.value);
        setUpdateData({
          ...updateData,
          [e.target.name]: e.target.value,
        });
        console.log(updateData.length);
      };
    
      const inputPriceChangeHandler = (e) => {
        setInputPrice(e.target.value);
        setUpdateData({
          ...updateData,
          [e.target.name]: e.target.value,
        });
      };
    
      const inputFormHandler = (e) => {
        e.preventDefault();
    
        if (inputValue.length === 0) {
          setEnterValue(false);
          return;
        }
        if (inputId.length === 0) {
          setEnterId(false);
          return;
        }
        if (inputQuantity.length === 0) {
          setEnterQuantity(false);
          return;
        }
        if (inputPrice.length === 0) {
          setEnterPrice(false);
          return;
        }
        if (image.length === 0) {
          setFormat(false);
          return;
        }
    
        const reader = new FileReader();
        reader.onload = () => {
          const imageData = reader.result;
    
          const newProduct = {
            id: inputId,
            title: inputValue,
            image: imageData,
            size: size,
            quantity: inputQuantity,
            price: inputPrice,
          };
    
          dispatch(addProduct(newProduct));
          setInputPrice('');
          setInputQuantity('');
          setInputValue('');
          setInputId('');
          setEnterValue(true);
          setEnterId(true);
          setEnterQuantity(true);
          setEnterPrice(true);
          setInclude(false);
        };
        reader.readAsDataURL(image[0]);
        handleClose();
      };
    
      const closeInputFormHandler = (e) => {
        e.preventDefault();
        handleClose();
        // Rest of your code
      };
      // const formHandler = (e) => {
      //   e.preventDefault();
      //   setInclude(true);
      // };
      useEffect(() => {
        setShowFormatError(true);
        setImage([]);
      }, []);
      const closeFormHandler = (e) => {
        e.preventDefault();
        setInclude(false);
        setInputPrice('');
        setInputQuantity('');
        setInputValue('');
        setInputId('');
        setFormat(true);
        handleClose()
    
      };
      const productSize = [
        { name: "Small", Size: "S" },
        { name: "Large", Size: "L" },
        { name: "Medium", Size: "M" },
        { name: "XL", Size: "XL" },
      ]
    const currency = [
      {name:'₹', money:'Rs'},
      {name:'$', money:'Doll'}
    ]
    return (
      <div>
        
          <form onSubmit={inputFormHandler} data-testid='form'>
            <Fragment>
              <div>
                <table className="cover">
                  <h3 data-testid='headDetails'>PRODUCT DETAILS</h3>
                  <tr>
                    <td>
                      <label htmlFor="pname" data-testid='productName'>ENTER PRODUCT NAME</label>
                      <input
                        data-testid="productString"
                        title="proString"
                        maxLength={10}
                        type="text"
                        className="pname"
                        name="pname"
                        onChange={inputChangeHandler}
                        value={inputValue}
                      />
                    </td>
                  </tr>
                  {!enterValue && inputValue.length <= 0 ? (
                    <p className="validity" data-testid='proNameError' title='nameError'>please enter the Product Name</p>
                  ) : (
                    ""
                  )}
                  <tr>
                    <td>
                      <label htmlFor="id" Data-testid='productId'>ENTER PRODUCT ID</label>
                      <br />
                      <input
                        data-testid='idInteger'
                        minLength={1}
                        type="number"
                        className="id"
                        name="id"
                        onChange={inputIdChangeHandler}
                        value={inputId}
                      />
                    </td>
                  </tr>
                  {!enterId && inputId.length <= 0 ? (
                    <p className="validity" data-testid='proIdError'>please enter the Product ID</p>
                  ) : (
                    ""
                  )}
                  <tr>
                    <td>
                      <label htmlFor="size" Data-testid='productSize'>SIZE</label>
                      <br />
                      <select
                        data-testid='proSize'
                        className="size"
                        name="size"
                        onChange={inputSizeChangeHandler}
                        value={size}
                      >
                        {productSize.map(proSize => (
                          <option  data-testid='proSizeSelect' key={proSize.Size} value={proSize.Size}>
                            {proSize.name}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="quantity" Data-testid='productQuantity'>QUANTITY</label>
                      <br />
                      <input
                        Data-testid='proQuantity'
                        maxLength={100}
                        type="number"
                        className="quantity"
                        name="quantity"
                        onChange={inputQuantityChangeHandler}
                        value={inputQuantity}
                      />
                    </td>
                  </tr>
                  {!enterQuantity && inputQuantity.length <= 0 ? (
                    <p className="validity" data-testid='proQuantityError'>please enter the Product Quantity</p>
                  ) : (
                    ""
                  )}
                  <tr>
                    <td>
                      <label htmlFor="price" data-testid='productPrice'>ENTER PRODUCT PRICE</label>
                      <br />
                      <select className="currency" name="currency" data-testid='symbol'>
                      {currency.map(currencyRate => (
                          <option data-testid='proSymbol' key={currencyRate.money} value={currencyRate.money}>
                            {currencyRate.name}
                          </option>
                        ))}
                      </select>
                      <input
                        data-testid='proPrice'
                        maxLength={50}
                        type="text"
                        className="price"
                        name="price"
                        onChange={inputPriceChangeHandler}
                        value={inputPrice}
                      />
                    </td>
                  </tr>
                  {!enterPrice && inputPrice.length <= 0 ? (
                    <p className="validity" data-testid='proPriceError' >please enter the Price of the Product</p>
                  ) : ('')}
                  <label htmlFor="price" Data-testid='productImage'>UPLOAD IMAGE</label>
                  <input
                    data-testid='proImage'
                    type="file"
                    className="img"
                    multiple
                    accept="image/*"
                    onChange={uploadImage}
                  />
                  {newInclude.map((imgSrc) => (
                    <img key={imgSrc} src={imgSrc} alt="product" />
                  ))}
                  {!format && image.length <= 0 ? (
                    <p className="validity" Data-testid='proImageError'>upload a Image with .jpeg,.png,.jpg format</p>) : ('')}
                  {!showFormatError &&
                    (
                      <p className="validity">Invalid file format. Allowed formats: .jpeg, .png, .jpg</p>
                    )
                  }

                  <div className="submission">
                    <button type="submit" className="submit-btn" data-testid='formSubmit' title='submission'>
                      Submit
                    </button>
                    <button onClick={closeFormHandler} className="close-btn" data-testid='formClose'>
                      Close
                    </button>
                  </div>
                </table>
              </div>
            </Fragment>
          </form>
      </div>
    )
  }

  // export {Form}