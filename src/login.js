import React, { useState } from 'react'
import './app.css'
import { Link, Navigate, useNavigate } from 'react-router-dom';

export const Login = ({ handleLogin }) => {
    const [inputEmail, setInputEmail] = useState('')
    const [enterEmail, setEnterEmail] = useState(true)
    const [inputPassword, setInputPassword] = useState('')
    const [enterPassword, setEnterPassword] = useState(true)
    const [redirectToUser, setRedirectToUser] = useState(false);
    const [validEmail, setValidEmail] = useState(true);

    const isValidEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

    const navigate = useNavigate();

    const mailChangeHandler = (e) => {
        setInputEmail(e.target.value)
        if (e.target?.value && e.target.value.match(!isValidEmail)) {
            setValidEmail(false)
        } 
    }
    const passwordChangeHandler = (e) => {
        setInputPassword(e.target.value)
    }

    const LoginFormHandler = (e) => {
        e.preventDefault();

        if (inputEmail.length == 0) {
            setEnterEmail(false)
            return;

        }

        if (inputPassword.length == 0) {
            setEnterPassword(false)
            return;
        }
       
        setInputEmail('')
        setInputPassword('')
        setEnterEmail(true)
        setEnterPassword(true)
        handleLogin();
        navigate('/user');
    }
    if (redirectToUser) {
        return <Navigate to="/user" replace />;
    }

    return (
        <div data-testid='login-app'>
            <header className="App-header" >
                <div className='logtopic'>
                    <h1 className='text' data-testid='login-header' >LOGIN-PAGE</h1>
                </div>
            </header>
            <form className='LoginCover' data-testid='form' onSubmit={LoginFormHandler}>
                <table className='logTable'>
                    <tr>
                        <td><label for='email' data-testid='login-mail'>USER MAIL ID</label>
                            <br></br>
                            <input
                                title='login-mailID'
                                data-testid='EID'
                                type='email'
                                className='email' name='email'
                                onChange={mailChangeHandler}
                                value={inputEmail}
                                // label="Username"
                                helperText={"User Name is required"}>

                            </input>
                        </td>
                    </tr>
                    {!enterEmail && inputEmail.length <= 0 ? <p className='validity' data-testid='mailValidity' title="mailValidity">please enter something</p> : ''}
                    <br></br>
                    <tr>
                        <td><label for='password' title='login-password'>USER PASSWORD</label>
                            <br></br>
                            <input
                            data-testid='login-pass'
                                title='login-passcode'
                                maxLength={10}
                                type='password'
                                className='password' name='password'
                                onChange={passwordChangeHandler}
                                value={inputPassword}
                                helperText={"User Name is required"}>
                                     
                            </input>
                        </td>
                    </tr>
                    {!enterPassword && inputPassword.length <= 0 ? <p className='validity' data-testid='validation'>please enter something</p> : ''}
                    <div Data-testid='login-btn1'  >
                        {inputEmail.trim() !== '' && inputPassword.trim() !== '' ?
                            <Link to='/user'  className='link' ><button className='login-btn'   type='submit' onClick={handleLogin}>Login</button></Link>
                            :
                            <button className='login-btn'  data-testid='login-btn' type='submit'>Login</button>
                        }
                                                    {/* <Link to='/user' Data-testid='login-btn'  className='link' ><button className='login-btn'  type='submit' onClick={handleLogin}>Login</button></Link> */}

                    </div>
                </table>
            </form>
        </div>
    )
}

export default Login