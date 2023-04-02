import React, { useEffect, useState } from 'react';
import { setTargetValue } from '../constants/constants';
import { createAccount } from '../api/userRequests';
import styles from '../styles/Register.module.css'
import { useNavigate } from 'react-router-dom';

const Register = ({ token }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const navigate = useNavigate();
    
    useEffect(() => {
        if (token) {
            navigate("/home");
        }
    })


    return (

        <div className={`container text-center ${styles.outterContainer}`}>

            <img className={styles.img} alt='gif' src='https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjY0MDJjMWM5YzA2NmI5NjRkZWE3M2Y3YTBhNTUyZTJkMjE1MGNkZCZjdD1n/xUA7b4arnbo3THfzi0/giphy.gif'></img>

            <div className={`container text-center ${styles.innerContainer}`}>

            
            <h1 className={`${styles.pageTitle}`}>Register</h1>

            <form 
                className={`${styles.registerForm}`}
                
                onSubmit={ (event) => {
                    event.preventDefault();
                    
                    createAccount({username, password, email, address});
                    navigate("/home");
                    //^this redirects users to the home page after creating an account. 
                }}>

                <div class="row justify-content-center">
                    <div class="col-md-4">
                        
                        <div class="col-md-1">
                            <label  
                                class="form-label align-self-start">Username
                            </label>
                        </div>

                        <input 
                            type="text" 
                            class="form-control" 
                            id="userInput" 
                            value={username}
                            required
                            onChange={setTargetValue(setUsername)} 
                        />

                        <div class="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                </div>

                <div class="row justify-content-center">
                    <div class="col-md-4">
                        <div class="col-md-1">
                            <label 
                                class="form-label align-self-start">Password
                            </label>
                        </div>
        
                        <input 
                            type="password" 
                            class="form-control" 
                            id="pwInput" 
                            value={password}
                            minLength="9"
                            required
                            onChange={setTargetValue(setPassword)}
                        />
                    </div>
                </div>

                <div class="row justify-content-center">
                    <div class="col-md-4">
                        <div class="col-md-1">
                            <label 
                                class="form-label align-self-start">
                                    Email
                            </label>
                        </div>

                        <input 
                            type="email" 
                            class="form-control" 
                            id="emailInput" 
                            value={email}
                            required
                            onChange={setTargetValue(setEmail)}
                        />

                        <div class="invalid-feedback">
                            Please provide a valid email address.
                        </div>
                    </div>
                </div>

                <div class="row justify-content-center">
                    <div class="col-md-4">
                        <div class="col-md-1">
                            <label 
                                class="form-label align-self-start">
                                    Address
                            </label>
                        </div>

                        <input 
                            type="text" 
                            class="form-control" 
                            id="addressInput"
                            value={address}
                            required
                            onChange={setTargetValue(setAddress)}
                        />

                        <div class="invalid-feedback">
                            Please provide an address.
                        </div>
                    </div>
                </div>
        
                
                <div className={`col-12 ${styles.submit}`}>
                        <button 
                            className={`${styles.submitButton}`}
                            class="w-25 btn btn-warning"
                            type="submit">
                                Submit
                        </button>
                        
                </div>

            </form>
            
            </div>
            
        </div>
    )
}

export default Register;