// ATTEMPT TO UPDATE - WITH MAPS //////////////////////////////////////////////
import React, { useEffect, useState } from 'react';
import { getOrderHistory, } from '../api/cartRequests';
import styles from '../styles/Profile.module.css'
import { Link } from 'react-router-dom';

const Profile = ({ token }) => {
  const [orderHistory, setOrderHistory] = useState([]);
  let cartPrice = 0;
  let roundedCartPrice = 0;

  useEffect(() => {
    getOrderHistory(token).then((answer) => {
      if (answer) {
        setOrderHistory(answer)
      }
    })
  }, [token])

//   function listOrderHistory() {
    // line by line drill down accessing the order history details individually
    // console.log('orderHistory[0]:', orderHistory[0])
    // console.log('orderHistory[0].id:', orderHistory[0].id)
    // console.log('orderHistory[0].itemsInCart:', orderHistory[0].itemsInCart)
    // console.log('orderHistory[0].itemsInCart[0]:', orderHistory[0].itemsInCart[0])
    // console.log('ITEM NAME IS: ', orderHistory[0].itemsInCart[0].name)

    // for loop attempt
    // for(let i = 0; i < orderHistory.length; i++) {
    // console.log('ITEM NAME IS: ', orderHistory[0].itemsInCart[0].name);
    // }

    // hardcode attempt
    // console.log('ITEM 1 NAME IS: ', orderHistory[0].itemsInCart[0].name)
    // console.log('ITEM 2 NAME IS: ', orderHistory[0].itemsInCart[1].name)
    // console.log('ITEM 3 NAME IS: ', orderHistory[2].itemsInCart[2].name)
    // console.log('ITEM 4 NAME IS: ', orderHistory[3].itemsInCart[3].name)
    // console.log('ITEM NAME IS: ', orderHistory[4].itemsInCart[4].name)
    // console.log('ITEM NAME IS: ', orderHistory[5].itemsInCart[5].name)
 
//   }

//   listOrderHistory()

  return (
    <div class={styles.mainContainer}>
      <h1 class={styles.h1Profile}>My Profile</h1>
      <h3 class={styles.h3}>Take a stroll down memory lane to see what awesome stuff you've already purchased</h3>

      { orderHistory.length &&

        orderHistory.map((order) => {
            // listOrderHistory()
            // console.log('this is your order:', order)
            // for(let i = 0; i < orderHistory.length; i++){
            //     console.log('orderHistory[i]:', orderHistory)
            // }
            // console.log('this is your orderHISTORY:', orderHistory[0])
            let orderConfirmationNum = Math.floor(Math.random() * 1000000);
          return (
              
            <ul class={styles.ul} key={order.id}>
                <li class={styles.liOrderNumber}>Order Number: {orderConfirmationNum}</li>

              {
                  
                order.itemsInCart.map((itemInCart) => {
                    // create empty array to house final past ordered items
                        // let pastOrderedItemsArr = [];
                        // let arrOfPastOrderedItemsArr = [];
                        // console.log('items in cart are: ', itemInCart.name)
                    // grab all item in cart names/ assign to variable
                        // let pastOrderedItems = itemInCart.name
                        // console.log('pastOrderedItems: ', pastOrderedItems);
                        // pastOrderedItemsArr.push(pastOrderedItems)
                        // console.log('pastOrderedItems array: ', pastOrderedItemsArr)
                        // arrOfPastOrderedItemsArr.push(pastOrderedItemsArr)
                        // console.log(arrOfPastOrderedItemsArr)
                    // listOrderHistory()
                    // push to array
                    // filter out duplicates from array 
                    // return final array to console
                    // separate items in final array to list items
                    // return list items on screen
                    // let orderConfirmationNum = Math.floor(Math.random() * 1000000);
                    // let totalCartPrice = (itemsInCart) => {
                        // let cartPrice = 0;
                        // console.log(order.itemsInCart)
                        for (let i = 0; i < order.itemsInCart.length; ++i) {
                          let itemPrice = Number(order.itemsInCart[i].price);
                          let quantity = order.itemsInCart[i].quantity
                          let individualPrice = (itemPrice * quantity)
                          cartPrice += individualPrice
                        // rounds totals to 2 decimal places
                        roundedCartPrice = cartPrice.toFixed(2);
                        //   Math.round()
                        }
                    //     return cartPrice
                  return (
                      <div class={styles.orderDivCard} key={itemInCart.id}>
                          {/* <li class={styles.li}>Order Number:{orderConfirmationNum}</li> */}
                          <li class={styles.liName}>{itemInCart.name}</li>
                          <li class={styles.liBrand}>Brand: {itemInCart.brand} | Size: {itemInCart.size}</li>
                          <li class={styles.liPrice}>${itemInCart.price}</li>
                      </div>
                  )
                })
              }
            <li class={styles.liTotal}>Total: ${roundedCartPrice}</li>
            </ul>
          )
        })
      }
      <Link to={'/products'}>
      <button className={`w-40 btn btn-warning btn-lg ${styles.button}`} type="submit">This way to more adventure...</button>
      </Link>
    </div>
  )
}

export default Profile;
