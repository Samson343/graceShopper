import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../styles/SingleProduct.module.css'
import { getUserCart, deleteItemFromCart, updateCartQuantity } from '../api/cartRequests';

function SingleProduct({ setSingleProduct, itemProps, setItemProps, token, addToCart, getProductById }) {
  const { image, category, id, name, price, size, brand, description, inventory } = itemProps;
  const [cartState, setCartState] = useState(false);
  const [itemsInCart, setItemsInCart] = useState([]);
  const [cartItemQuantity, setCartItemQuantity] = useState(0);
  const [cartID, setCartID] = useState(0);
  const [cartChange, setCartChange] = useState(false)

  useEffect(() => {
    const getCartItemAsync = async () => {
      
      if (!token) {
        return
      }
      else {
       
        await getUserCart(token).then ((data) =>{
       
          if (data) {
            if (!('itemsInCart' in data)) {
              setItemsInCart([])
              setCartID(null)
            } else {
              
              setItemsInCart(data.itemsInCart)
              setCartID(data.id)
              setCartChange(false)
            }
          }
        })
      }
    }
      getCartItemAsync();

  }, [token, cartChange])

  useEffect(() => {
    if (itemsInCart.length > 0) {
      itemsInCart.map((itemInCart) => {
        // console.log(itemInCart)
        if (itemInCart.itemsId === id) {
          // console.log(`id matched, itemsId ${itemInCart.itemsId} is equal to id ${id}`)
          setCartState(true)
          setCartItemQuantity(itemInCart.quantity)
          // console.log(`cartItemQuantity is ${itemInCart.quantity}`)
        }
        return null
      })
    } 
  }, [itemsInCart, id])

  return (
    <div className={styles.singleDiv}>

      <div className={`container ${styles.productContainer}`}>
        <h5 className={`display-5`}><span className ={styles.topTitle}>{brand} {name}</span></h5>
        <div className={`row ${styles.productDiv}`}>

          {/* this is a parent div */}
          <div className={`col-xl-6 gx-0 ${styles.imageDiv}`}>
            <img src={image} className={`card-img-top ${styles.image}`} alt="..." />
          </div>

          {/* this is the second parent div */}
          <div className={`col-xl-6 justify-content-space-around gx-5 ${styles.detailsDiv}`}>
            <div className={styles.flexRow}>
              <div className={`row ${styles.detailRow}`}>

                <div class="col xl-4 text-center">
                  <h5 className={`card-title ${styles.titles}`}>{brand} {name}</h5>
                </div>


                <div class="col xl-4 text-center">
                  <h5 className={`card-title ${styles.titles}`}>{category} </h5>
                </div>

                <div class="col xl-4">
                  <div class="row g-0">
                    <div class="col align-self-end">
                      <h5 className={`card-title ${styles.titles} ${styles.size}`}>Size:</h5>
                    </div>

                    <div class="col gx-3">
                      <p className={`card-text ${styles.contentText}`}>{size}</p>
                    </div>
                  </div>

                </div>


              </div>
            </div>


            <div className={styles.flexRow}>
              <div className={`row ${styles.detailRow}`}>

                <div className={`col xl-12 ${styles.descDiv}`}>
                  <h5 className={`card-title ${styles.titles}`}>Description: </h5>
                  <p className={`card-text ${styles.descText}`}>{description}</p>
                </div>

              </div>
            </div>

            <div className={styles.flexRow}>

              <div className={`row align-items-center ${styles.detailRow}`}>

                <div class="col xl-4 text-center">
                  <h5 className={`card-title ${styles.titles}`}>${price}</h5>
                </div>

                <div class="col xl-4">
                  <div className={styles.iconDiv}>

                    <i className={`bi bi-arrow-left-circle ${styles.arrowIcon}`}
                      onClick={async (e) => {
                        const props = await getProductById(id);
                        setItemProps(props)
                        
                        setSingleProduct(false);
                      }}>
                    </i>


                    {
                      cartState && cartItemQuantity >= 1

                        ?

                        <div className={styles.cartControl}>

                          <div className={styles.deleteControl}>
                            <i
                              className={`bi bi-trash3 ${styles.deleteIcon}`}
                              onClick={async (e) => {
                                e.preventDefault();
                                // console.log('delete item!')
                                await deleteItemFromCart(id, cartID, token)
                                setCartChange(true)
                                setCartState(false)
                              }}>
                            </i>
                          </div>

                          <div className={styles.quantityControl}>

                            {cartItemQuantity <= 1
                              ?
                              null
                              :
                              <i
                                className={`bi bi-dash ${styles.quantIcons} ${styles.subIcon}`}
                                onClick={async (e) => {

                                  e.preventDefault();
                                  let decrementQuantity = cartItemQuantity - 1;
                                  
                                  let updatedCartItem = await updateCartQuantity(id, cartID, decrementQuantity, token)
                                  setCartChange(true)
                                  
                                }}></i>
                            }

                            <p className={styles.count}>{cartItemQuantity}</p>

                            {cartItemQuantity < inventory ?
                              <i
                                className={`bi bi-plus ${styles.quantIcons} ${styles.addIcon}`}
                                onClick={async (e) => {
                                  e.preventDefault();
                                  let incrementQuantity = cartItemQuantity + 1;
                                  let updatedCartItem = await updateCartQuantity(id, cartID, incrementQuantity, token)
                                  setCartChange(true)
                                  
                                }}></i>

                              :

                              null
                            }

                          </div>

                        </div>



                        : (inventory >= 1) && token ?

                          <>
                            <i
                              className={`bi bi-cart-plus-fill ${styles.cartIcon}`}
                              onClick={async (event) => {
                                event.preventDefault();
                               
                                await addToCart(id, token);
                                // console.log('single product added to cart', test);
                                setCartState(true)
                                setCartChange(true)
                              }}></i>

                          </>


                          :
                           inventory <= 0 &&
                            <p>Sold Out!</p>
                          
                    }

                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}

export default SingleProduct;