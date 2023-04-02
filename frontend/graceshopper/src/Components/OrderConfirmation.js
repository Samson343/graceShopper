import React from 'react';
import styles from '../styles/OrderConfirmation.module.css'
import { Link, useLocation } from 'react-router-dom';

const OrderConfirmation = () => {

  let confirmationNumber =  Math.floor(Math.random() * 1000000);
  const location = useLocation();
  const orderItems = location.state.orderedItems.itemsInCart;

  let totalCartPrice = (orderItems) => {
    let cartPrice = 0;
    for (let i = 0; i < orderItems.length; ++i) {
      let itemPrice = Number(orderItems[i].price);
      let quantity = orderItems[i].quantity
      let individualPrice = (itemPrice * quantity)
      cartPrice += individualPrice
    }
    return cartPrice
  }
     
    return (
        // bootstrap styling 
        <div className='container'>
        <div class={`order-confirmation-container ${styles.ordercontainer}`}>
            
            <h1 class={`h1-order-received ${styles.h1OrderReceived}`}>Your order has been received</h1>
            <img class={`img-checkmark ${styles.imgCheckmark}`} src='https://cdn-icons-png.flaticon.com/512/4436/4436481.png' alt='Green checkmark'/>
            <h1 class={`h1-thank-you ${styles.h1ThankYou}`}>Thank you for your purchase!</h1>
            <p class={`p-confirmation-num ${styles.pConfirmationNum}`}>Your order confirmation number is: {confirmationNumber}</p>
            
            <div className={styles.detailsContainer}>
              {
                orderItems.map(({brand, category, name, quantity, size, price}) => {
                  return (
                    <div className={styles.orderDiv}>
                      <span className={styles.orderItem}>
                          <h6 className={styles.itemHeader}>Item: <p className={styles.itemContent}>{brand} {name} - {size} | <span className={styles.quantityHeader}>Quantity:</span> {quantity}</p></h6>
                            
                          <h6 className={styles.itemHeader}>Price: <p className={styles.itemContent}>${(price * quantity).toFixed(2)}</p></h6>
                            
                      </span>
                      
                    </div>
                  )
                })
              }
              <span className={styles.priceContainer}>
                <h6 className={styles.priceHeader}>Order Total:</h6>
                  <p className={styles.totalPrice}>${totalCartPrice(orderItems).toFixed(2)}</p>
              </span>

            </div>
            
            <Link to={'/products'}>
              <button className={`w-100 btn btn-warning btn-lg ${styles.button}`} type="submit">
                  Continue Shopping</button>
            </Link>

            </div>
        </div>
        
    )
}

export default OrderConfirmation;