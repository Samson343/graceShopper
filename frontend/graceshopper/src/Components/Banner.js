import React, { useEffect, useState } from 'react';
import styles from '../styles/Banner.module.css'


function Banner ({ bannerText = '' }) {

    //will hook this up so that we can change the text based on different events if we want to go that route
    const [textChanger, setTextChanger] = useState(bannerText)

    return (
    <div className='mainDiv'>
      <header className={styles.header}></header>
      <div className={styles.banner}>
        <video autoPlay muted loop>
            {/* A few different options for the background video */}
            {/* <source src="mixkit-landscape-of-a-large-lake-during-sunset-from-the-air-4998.mp4" type="video/mp4"/> */}
            {/* <source src="waterfallmp4.mp4" type="video/mp4"/> */}
            <source src="mountainVideo.mp4" type="video/mp4"/>
            
        </video>
        <h2 className = {styles.fadeIn}>{bannerText ? bannerText : 'Adventure awaits'}</h2>
      </div>
      <footer className={styles.footer}></footer>
    </div>
    )
}

export default Banner