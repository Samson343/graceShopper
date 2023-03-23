import LogInForm from "./LogInForm"
import styles from '../styles/NavBar1.module.css'
import React from 'react';
import "bootstrap-icons/font/bootstrap-icons.css"
import { logOut } from "../api/userRequests"
import { BASEURL } from "../constants/constants"
import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

function NavBar({ token, setTokenCheck, tokenCheck, setSingleProduct }) {
  const [loginDropdown, setLoginDropdown] = useState(true)

  const navigate = useNavigate()


  return (
    <div>
      <nav class={`navbar navbar-expand-lg bg-success ${styles.mainBar}`}>
        <div class="container-fluid">

          <div className={styles.TitleandIcon}>
            <Link
              className={`navbar-brand text-white ${styles.title}`}
              to = '/home'>Hike & Seek</Link>
            <a
              class="navbar-brand"
              href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
              target="blank"
            >
              <img
                className={`nav-item ${styles.icon}`}
                src="TransparentMountains.png"
                alt="Forest"
                width="100"
                height="50">
              </img>
            </a>
          </div>


          <div className={styles.links}>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
              aria-label="Toggle navigation">

              <span class="navbar-toggler-icon"></span>
            </button>

            <div
              className={`collapse navbar-collapse ${styles.rightNav}`} id="navbarNavDropdown">

              <ul className={`navbar-nav ${styles.navList}`}>

                <li className={`nav-item ${styles.home}`}>
                  <Link to="/home" className={`nav-link active text-white ${styles.home}`} aria-current="page"
                  >Home
                  </Link>
                </li>

                <li class="nav-item">
                  <Link to="/products" class="nav-link text-white" >
                    Products
                  </Link>
                </li>

                {
                  (!token || loginDropdown)

                    ?

                    <li className={`nav-item dropdown`}>
                      <Link
                        class="nav-link dropdown-toggle text-white"
                        // href={`${BASEURL}`}
                        role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Log In
                      </Link>

                      <ul className={`dropdown-menu dropdown-menu-lg-end ${styles.dropdown}`}>
                        <li>
                          <LogInForm
                            loginDropdown={loginDropdown}
                            setLoginDropdown={setLoginDropdown}
                            setTokenCheck={setTokenCheck}
                            tokenCheck = {tokenCheck}
                          />
                        </li>
                      </ul>
                    </li>

                    :

                    <li className={`nav-item ${styles.logOut}`}>
                      <button
                        type="button"
                        className={`btn text-white ${styles.logOut}`}
                        onClick={async (event) => {
                          console.log('logout!');
                          await logOut().then(() => {
          
                            setLoginDropdown(true)
                            setSingleProduct(false)

                            if (tokenCheck === false) {
                              setTokenCheck(true)
                            } else {
                              setTokenCheck(false)
                            }
                            alert("Logout successful - thank you for using our service.")
                            navigate('/');
                          })

                        }}>Logout</button>
                    </li>
                }

                <li className={`nav-item ${styles.profileLi}`}>
                  <Link to="/profile"
                    className={`nav-link text-white ${styles.profileIconLi}`}
                  >

                    <i className={`bi bi-person-square ${styles.profileIcon}`}></i>

                  </Link>
                </li>

                <li class="nav-item">
                  <Link to="/cart"
                    class="nav-link text-white"
                    className={`nav-link text-white ${styles.cartIconLi}`}
                  >

                    <i className={`bi bi-cart text-white ${styles.cartIcon}`}></i>
                  </Link>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </nav>



    </div>
  )
}

export default NavBar

