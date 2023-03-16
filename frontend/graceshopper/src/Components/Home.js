import React from 'react';
import { getAllItems } from '../api/itemRequests';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import $ from 'jquery'
import useMeasure from 'react-use-measure'
import { categories } from '../constants/constants';
import { Link } from 'react-router-dom';
import { IoLogoLinkedin, IoLogoGithub } from "react-icons/io";


const Home = ({ setItemProps, setSingleProduct, setCategory }) => {
  //prevents the first card from rendering before allItems are set
  const [carouselRender, setCarouselRender] = useState(false)
  //measures the width of the first card for the carousel animation to move the proper amount
  const [ref, { width }] = useMeasure()
  //tracks the positions that are visible in the carousels
  const [scrollPosition, setScrollPosition] = useState(0)
  const [scrollPosition2, setScrollPosition2] = useState(0)

  //below will be used to set a smaller, random pool of items for the carousels
  const [carouselItems, setCarouselItems] = useState([])
  // const [randomHelper, setRandomizer] = useState(0)
  const [initiateRender, setInitiateRender] = useState(false)
  // const randomSet = [randomHelper(), randomHelper(), randomHelper(), randomHelper(), randomHelper(), randomHelper(), randomHelper(), randomHelper()]

  //only render if carouselItems is populated, prevents rendering errors
  useEffect(() => {
    if (carouselItems.length) {
      setCarouselRender(true)
    }
  }, [initiateRender])

  //grab all items, then pull out random products by their indexes while preventing duplicates (still occationally produces a single duplicate)
  useEffect(() => {

    async function helper() {
      await getAllItems().then((items) => {
        let numberHistory = []

        for (let i = 0; i < 8; ++i) {
          let curNum = Math.floor(Math.random() * (items.length - 1) + 1)

          if (!numberHistory.includes(curNum)) {
            numberHistory.push(curNum)
            const randomItem = items.filter(item => item.id === curNum)
            carouselItems.push(randomItem[0])
          }
        }
        setInitiateRender(true)
      })
    }
    helper()

  }, [])

  //carousel animation effects called when either end is clicked
  useEffect(() => {
    $('#carousel-inner1').animate({ scrollLeft: scrollPosition }, 600)
  }, [scrollPosition])

  //same effect for second carousel
  useEffect(() => {
    $('#carousel-inner2').animate({ scrollLeft: scrollPosition2 }, 600)
  }, [scrollPosition2])


  return (
    <>
      <div className={styles.homeDiv}>
        <div className={styles.topBar}></div>
        <div className={styles.carouselBackground}>
          <h4 className={`headings ${styles.heading}`}>Top sellers, near you</h4>
          {/* <hr className = {styles.firstLine}></hr>
      <hr className= {styles.secondLine}></hr> */}
          <div id="carouselExampleControlsAutoplay" className={`carousel slide ${styles.carouselOuter}`} data-bs-ride="carousel">
            <div id='carousel-inner1' className={`carousel-inner ${styles.carousel}`}>
              {
                carouselRender && carouselItems.length &&
                <>
                  <div ref={ref} class="carousel-item active" className={`${styles.productCard} ${styles.firstCard}`}>
                    {/* <h4 className={styles.heading}>Top sellers near you</h4> */}
                    <Link onClick={() => {
                      setItemProps(carouselItems[0])
                      setSingleProduct(true)
                    }} to="/products">
                      <div className={styles.description}>
                        <span className={styles.cardValue}>
                          <span className={styles.brand}> {carouselItems[0].brand} </span>
                          <span className={styles.name}>{carouselItems[0].name}</span>
                          <span className={styles.price}>${carouselItems[0].price}</span>
                        </span>

                        {/* <p className={styles.cardValue}>{allItems[0].name}</p> */}
                        {/* <h3 className={styles.header}>Size: <p className={styles.cardValue}>{allItems[0].size}</p></h3> */}
                      </div>
                    </Link>

                    <img src={carouselItems[0].image} alt={'shoes png'} width={"100%"} className={`d-block w-100 ${styles.image}`}></img>

                  </div>
                </>
              }
              {carouselRender &&
                carouselItems.map(({ id, image, name, price, size, category, brand }, index) => {
                  if (index > 1) {
                    return (
                      <div class='carousel-item'
                        className={styles.productCard}
                        key={index}>
                        <Link onClick={() => {
                          setItemProps(carouselItems[index])
                          setSingleProduct(true)
                        }} to="/products">
                          <div className={styles.description}>
                            <span className={styles.cardValue}>
                              <span className={styles.brand}> {brand} </span>
                              <span className={styles.name}>{name}</span>
                              <span className={styles.price}>${price}</span>
                            </span>
                            {/* <p className={styles.cardValue}>{allItems[0].name}</p> */}
                            {/* <h3 className={styles.header}>Size: <p className={styles.cardValue}>{allItems[0].size}</p></h3> */}
                          </div>
                        </Link>
                        <img src={image} alt={'shoes png'} width={"100%"} className={`d-block w-100 ${styles.image}`}></img>
                      </div>
                    )
                  }
                }
                )
              }
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev" onClick={async () => {
              //creates a custom bounceback effect if you hit prev on left side
              if (scrollPosition === 0) {
                setScrollPosition(width)
              }
              else {
                setScrollPosition(scrollPosition - width)
              }

            }}>
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next" onClick={async () => {
              if (scrollPosition === 0) {
                setScrollPosition(width)
              }
              //creates a custom bounceback effect if you hit next on the right side at the end of the carousel
              else if (scrollPosition === (carouselItems.length - 4) * width) {
                setScrollPosition((carouselItems.length - 5) * width)
              }
              else {
                setScrollPosition(scrollPosition + width)
              }
            }}>
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        {/* beginning of second Carousel */}
        <div className={styles.saleBanner}></div>

        <div className={styles.carouselBackground2}>
          <h4 className={`headings ${styles.heading}`}>Explore by category</h4>
          <div id="carouselExampleControlsAutoplay" className={`carousel slide ${styles.carouselOuter}`} data-bs-ride="carousel">
            <div className={`carousel-inner ${styles.carousel2}`} id='carousel-inner2'>
              <div class="carousel-item active" className={`${styles.productCard} ${styles.firstCard}`}>
                <Link onClick={() => {
                  setCategory(categories[0].category)
                  setSingleProduct(false)
                }} to="/products">
                  <div className={styles.description}>
                    <span className={styles.cardValue2}>
                      {categories[0].category}
                    </span>
                  </div>
                </Link>

                <img src={categories[0].image} alt={'shoes png'} width={"100%"} className={`d-block w-100 ${styles.image}`}></img>
              </div>

              {
                categories.map(({ category, image, siteCategory }, index) => {
                  if (index > 0) {
                    return (
                      <div class='carousel-item'
                        className={styles.productCard}
                        key={index}>
                        <Link onClick={() => {
                          setCategory(siteCategory)
                          setSingleProduct(false)
                          console.log(siteCategory)
                        }} to="/products">
                          <div className={styles.description}>
                            <span className={styles.cardValue2}>
                              {category}
                            </span>
                          </div>
                        </Link>
                        <img src={image} alt={'shoes png'} width={"100%"} className={`d-block w-100 ${styles.image}`}></img>
                      </div>
                    )
                  }
                }
                )
              }
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev" onClick={async () => {
              if (scrollPosition2 === 0) {
                setScrollPosition2(width)
              }
              else {
                setScrollPosition2(scrollPosition2 - width)
              }

            }}>
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next" onClick={async () => {
              //creates a custom bounceback effect if you hit prev on left side
              if (scrollPosition2 === 0) {
                setScrollPosition2(width)
              }
              //creates a custom bounceback effect for the right side
              else if (scrollPosition2 === width * 3) {
                setScrollPosition2(width * 2)
              }
              else {
                setScrollPosition2(scrollPosition2 + width)
              }
            }}>
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        {/* transparent divider and mountain background img*/}
        <div className={styles.divider}></div>
        <span className={styles.backgroundImg}></span>

        {/* about me card deck */}
        <div className={`card-deck ${styles.cardDeck}`}>
          <div className={`card ${styles.aboutCards}`}>
            <img className={`card-img-top ${styles.aboutImg}`} src={"Aboutheadshot.jpg"} alt="About Samuel Banister" />
            <div className={`card-body ${styles.aboutBody}`}>
              <h5 className={`card-title ${styles.aboutName}`}>Samuel Banister
                <span className={styles.linkWrapper}>
                  <a href={'https://github.com/Samson343'} target="_blank" rel="noreferrer">
                    <IoLogoGithub size={18} color="azure" />
                  </a>
                  <a href={'https://www.linkedin.com/in/sam-banister/'} target="_blank" rel="noreferrer">
                      <IoLogoLinkedin size={21} color = 'azure' />
                  </a>

                </span>
              </h5>
              <h6 className={styles.aboutTitle}>Fullstack Developer</h6>
              <p className={`card-text ${styles.aboutSummary}`}>Sam brings the passion to fullstack development and aims to build the coolest, craziest things possible. His proudest accomplishments on this project are creating the landing page, helping to spearhead the backend database and api, and building this modern homepage you're browsing now.</p>
            </div>
          </div>
          <div className={`card ${styles.aboutCards}`}>
            <img className={`card-img-top ${styles.aboutImg}`} src={""} alt="Card image cap" />
            <div className={`card-body ${styles.aboutBody}`}>
              <h5 className={`card-title ${styles.aboutName}`}>Card title</h5>
              <p className={`card-text ${styles.aboutSummary}`}>This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
          </div>
          <div className={`card ${styles.aboutCards}`}>
            <img className={`card-img-top ${styles.aboutImg}`} src={""} alt="Card image cap" />
            <div className={`card-body ${styles.aboutBody}`}>
              <h5 className={`card-title ${styles.aboutName}`}>Card title</h5>
              <p className={`card-text ${styles.aboutSummary}`}>This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
          </div>
          <div className={`card ${styles.aboutCards}`}>
            <img className={`card-img-top ${styles.aboutImg}`} src={""} alt="Card image cap" />
            <div className={`card-body ${styles.aboutBody}`}>
              <h5 className={`card-title ${styles.aboutName}`}>Card title</h5>
              <p className={`card-text ${styles.aboutSummary}`}>This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
          </div>
        </div>
      </div>
    </>


  )
}

export default Home;


  // const carouselWidth = $(`.carousel_inner`.scrollWidth)

  // $('.carousel').carousel({
  //   interval: 100,
  //   ride: "false"
  // })

  //setCarousel1( allItems.filter (item => item.id === randomHelper[0] || randomHelper[1] || randomHelper[2]) )