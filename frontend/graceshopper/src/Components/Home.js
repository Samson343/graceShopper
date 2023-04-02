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

  //waits to gather products, added after deployment
  const [gatherProducts, setGatherProducts] = useState (false)

  //below will be used to set a smaller, random pool of items for the carousels
  const [carouselItems, setCarouselItems] = useState([])
  // const [randomHelper, setRandomizer] = useState(0)
  const [initiateRender, setInitiateRender] = useState(false)
  // const randomSet = [randomHelper(), randomHelper(), randomHelper(), randomHelper(), randomHelper(), randomHelper(), randomHelper(), randomHelper()]

  useEffect (() => {
    setTimeout (() => {
       setGatherProducts(true)
    }, 1000)
  })

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
    

  }, [gatherProducts])

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
        <h4 className= {styles.aboutHeader}>Meet Our Development Team</h4>
        <div className={`card-deck ${styles.cardDeck}`}>
          <div className={`card ${styles.aboutCards}`} style={{
            background: "transparent",
          }}>
            <img className={`card-img-top ${styles.aboutImg}`} src={"Sam-about5.jpg"} alt="About Samuel Banister" />
            <div className={`card-body ${styles.aboutBody}`}>
              <h5 className={`card-title ${styles.aboutName}`}>Samuel Banister
                <span className={styles.linkWrapper}>
                  <a href={'https://github.com/Samson343'} target="_blank" rel="noreferrer">
                    <IoLogoGithub size={'calc(5px + 1.2vmin)'} color="azure" />
                  </a>
                  <a href={'https://www.linkedin.com/in/sam-banister/'} target="_blank" rel="noreferrer">
                    <IoLogoLinkedin size={'calc(5px + 1.25vmin)'} color='azure' />
                  </a>

                </span>
              </h5>
              <h6 className={styles.aboutTitle}>Fullstack Engineer</h6>
              <p className={`card-text ${styles.aboutSummary}`}>Sam brings the passion to fullstack development and aims to build the coolest, craziest things possible. His proudest accomplishments on this project are creating the landing page, helping to spearhead the backend database and api, and building this modern homepage you're browsing now.</p>
            </div>
          </div>

          {/* card 2 */}
          <div className={`card ${styles.aboutCards}`} style={{
            background: "transparent",
          }}>
            <img className={`card-img-top ${styles.aboutImg}`} src={"Fabian-about2.jpg"} alt="About Fabian Hernandez" />
            <div className={`card-body ${styles.aboutBody}`}>
              <h5 className={`card-title ${styles.aboutName}`}>Fabian Hernandez
                <span className={styles.linkWrapper}>
                  <a href={'https://github.com/chunkay1'} target="_blank" rel="noreferrer">
                    <IoLogoGithub size={'calc(5px + 1.2vmin)'} color="azure" />
                  </a>
                  <a href={'https://www.linkedin.com/in/fabian-hernandez-036467264/'} target="_blank" rel="noreferrer">
                    <IoLogoLinkedin size={'calc(5px + 1.25vmin)'} color='azure' />
                  </a>

                </span>
              </h5>
              <h6 className={styles.aboutTitle}>Fullstack Engineer</h6>
              <p className={`card-text ${styles.aboutSummary}`}>Fabian is a budding developer who embraces the fullstack process and aims to hone his skills with each project.
                In this project he contributed to the frontend foundation by integrating bootstrap, setting up a framework to access data from our backend and is most proud of the dynamic cart and inventory system you'll see throughout the product and cart pages.</p>
            </div>
          </div>


          {/* card 3 */}
          <div className={`card ${styles.aboutCards}`} style={{
            background: "transparent",
          }}>
            <img className={`card-img-top ${styles.aboutImg}`} src={"Kendall-about2.jpg"} alt="About Kendall Hudson" />
            <div className={`card-body ${styles.aboutBody}`}>
              <h5 className={`card-title ${styles.aboutName}`}>Kendall Hudson
                <span className={styles.linkWrapper}>
                  <a href={'https://github.com/kendallhudson'} target="_blank" rel="noreferrer">
                    <IoLogoGithub size={'calc(5px + 1.2vmin)'} color="azure" />
                  </a>
                  <a href={'https://www.linkedin.com/in/kendall-b-hudson/'} target="_blank" rel="noreferrer">
                    <IoLogoLinkedin size={'calc(5px + 1.25vmin)'} color='azure' />
                  </a>

                </span>
              </h5>
              <h6 className={styles.aboutTitle}>Fullstack Engineer</h6>
              <p className={`card-text ${styles.aboutSummary}`}>Kendall is a creative developer who eagerly embraces the challenge of a new project and particularly enjoys frontend development. Her favorite parts of this project were helping to set the foundation of the frontend pages, leading the charge on the Profile and Order Confirmation pages, and collaborating on styling across the website. </p>
            </div>
          </div>

          {/* card 4 */}

          <div className={`card ${styles.aboutCards}`} style={{
            background: "transparent",
          }}>
            <img className={`card-img-top ${styles.aboutImg}`} src={"Vivienne-About.jpg"} alt="About Samuel Banister" />
            <div className={`card-body ${styles.aboutBody}`}>
              <h5 className={`card-title ${styles.aboutName}`}>Vivienne Chawande
                <span className={styles.linkWrapper}>
                  <a href={'https://github.com/vivienne9'} target="_blank" rel="noreferrer">
                    <IoLogoGithub size={'calc(5px + 1.2vmin)'} color="azure" />
                  </a>
                  <a href={'https://www.linkedin.com/in/viviennechawande/'} target="_blank" rel="noreferrer">
                    <IoLogoLinkedin size={'calc(5px + 1.25vmin)'} color='azure' />
                  </a>

                </span>
              </h5>
              <h6 className={styles.aboutTitle}>Fullstack Engineer</h6>
              <p className={`card-text ${styles.aboutSummary}`}>Vivienne is a developer with a passion for continuous learning. Her accomplishments in this capstone project are creating the Figma board for the database tables; spearheading the backend development for database and api; creating routes and pages for admin users and adding new products on the frontend side.</p>
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