import React, { useState } from 'react';
import styles from '../styles/LandingPage.module.css'
import { Link } from 'react-router-dom';


function LandingPage () {
  const [addClass, setAddClass] = useState(false)

  setTimeout(() =>{
    setAddClass(true)
  }, 7800)

    return (
    <div className={styles.mainDiv}>
      <header className={styles.header}></header>
      <div className={styles.banner}>
        <video autoPlay muted loop playsInline={true}>
            <source src="mixkit-landscape-of-a-large-lake-during-sunset-from-the-air-4998.mp4" type="video/mp4"/>
        </video>
        <h2 className = {styles.fadeIn}>Hike + Seek</h2>
        <img 
          className={ 
            addClass ? 
              `${styles.afterClass} ${styles.mountain}`
              : `${styles.fadeIn2} ${styles.mountain}` 
            } 
          id="mountain" 
          src ="Icy-Mountains-Transparent-Background.png" 
          alt = "moutain png"
        />
        <div className={`${styles.container} ${styles.fadeIn2}`}>

            <Link to = 'home' className={styles.button}>
              <div className={styles.button__line}></div>
              <div className={styles.button__line}></div>
              <span className={styles.button__text}>Explore</span>
              <div className={styles.button__drow1}></div>
              <div className={styles.button__drow2}></div>
            </Link>
          
        </div>
    </div>
    <footer className={styles.footer} ></footer>
 </div>
    )
}

export default LandingPage