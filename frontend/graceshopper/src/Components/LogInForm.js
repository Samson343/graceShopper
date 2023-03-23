import styles from '../styles/LogInForm.module.css'
import React, { useState } from 'react';
import { setTargetValue } from '../constants/constants';
import { logIn } from '../api/userRequests';
import { myProfile } from '../api/userRequests';
import { useNavigate, Link } from 'react-router-dom'

// const setTargetValue = (callback) => {
//     return (event) => {
//         callback(event.target.value)
//     }
// }

function LogInForm({ loginDropdown, setLoginDropdown, setTokenCheck, tokenCheck }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    return (
        <div className={styles.container}>
            <form
                onSubmit={
                    async (event) => {
                        event.preventDefault();
                        console.log('Submit Form')
                        await logIn({ username, password }).then(async (response) => {
                            alert(response.message)
                            console.log("this is the response", response)
                            console.log(!response.error)

                            if ((!response.error) === false) {
                                setLoginDropdown(false)
                                setTokenCheck(true)
                            }

                            if (tokenCheck === false) {
                                setTokenCheck(true)
                            } else {
                                setTokenCheck(false)
                            }

                            setLoginDropdown(false)


                            await myProfile(response.token).then((data) => {
                                if (data === false && (username === "Administrator")) {
                                    navigate('/admin')
                                }
                            })
                        })
                        //no longer needed to re-render the navbar
                        // window.location.reload();
                    }
                }
            >
                <div className={styles.inputDivs}>
                    <input
                        type="text"
                        name='username'
                        placeholder='Enter Username'
                        id='username'
                        value={username}
                        onChange={setTargetValue(setUsername)}
                        required
                    />
                </div>

                <div className={styles.inputDivs}>
                    <input
                        type="password"
                        name='password'
                        placeholder='Enter Password'
                        id='password'
                        value={password}
                        onChange={setTargetValue(setPassword)}
                        required
                    />
                </div>

                <div className={styles.submit}>
                    <button className={styles.button}>Log In</button>
                </div>

                <p className={styles.secondHeader}>Don't Have an Account?

                    <Link to="/register" className={styles.signUpLink} >
                        Create One Here!
                    </Link>
                </p>
            </form>

        </div>
    )
}

export default LogInForm;