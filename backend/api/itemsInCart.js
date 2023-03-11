const express = require("express");
const itemsInCartRouter = express.Router();

const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env;

const { 
    isUser, 
    isAdministrator 
  } = require("./utils");

const {
    addItemsToCart,
    getItemsInCartById,
    getItemsInCartByItemsId,
    getItemsInCartByCartId,
    updateItemsInCart,
    destroyItemsInCart
} = require("../db/itemsInCart");

const { createCart, 
        getCartById,
        getCartByUserId,
        attachItemsToCart,
    } = require("../db/carts");

    itemsInCartRouter.get('/health', async (req, res, next) => {

      res.status(200).send({
         message: "items in cart is working!"
      })
      next()
    });

// Add items to cart, create new cart if one doesn't exist
// will need to be rewritten later to accommodate guests
itemsInCartRouter.post("/addItem", isUser, async (req, res, next) => {
  
    const { itemId } = req.body
    const userId = req.user.id

    try{
      // if no cart exists this will return null, tested - working on 3/8 Sam
      let cart = await getCartByUserId (userId)

      //if no cart exists, create one
      if (!cart) {
        cart = await createCart( userId )
      }
      
      //create ItemInCart in the ItemsInCart table, then attach the newly created itemsInCart to the cart
      const itemInCart = await addItemsToCart( cart.id, itemId )
      const withItems = await attachItemsToCart(cart)

      res.send(
        withItems
      );

    }catch (error) {
        next(error)
    }
});


itemsInCartRouter.patch("/change-quantity", isUser, async (req, res, next) => {
  
  const { itemInCartId, quantity } = req.body
  const userId = req.user.id

  try{
    // find the cart by userId
    let cart = await getCartByUserId (userId)

    //if no cart exists send an error
    if (!cart) {
      next({
        error: "Cart doesn't exist"
      })
    }
    
    //updating the quantity of the itemInCart
    const updatedItemInCart = await updateItemsInCart( itemInCartId, quantity ) 
    //re-attaching all itemsInCart then send back the whole cart
    const withItems = await attachItemsToCart(cart)

    res.send(
      withItems
    );

  }catch (error) {
      next(error)
  }
});






// delete items to cart
itemsInCartRouter.delete("/", isUser, async (req, res, next) => {

    const { itemInCartId, cartId } = req.body;

    try{
      // const itemInCart = await getItemsInCartByItemsId (itemInCartId);

      // console.log('item in cart is:', itemInCart)
      // console.log('itemID in cart is:', itemInCart.itemsId)
      console.log('cartId is:', cartId)

      const itemsInCart = await getItemsInCartByCartId (cartId);

      console.log('cart items by cartID are:', itemsInCart)

      //in theory this will only allow us to delete a specified item from the itemsInCart table by confirming the cartId before deleting an item by itemId
      const deletedItemInCart = itemsInCart.map(
        ({cartId, itemsId}) => {
          console.log('single itemsId:', itemsId)
          if(itemInCartId === itemsId) {
            console.log(`success! itemInCartId: ${itemInCartId} equals itemsId ${itemsId}`)
            destroyItemsInCart(itemsId, cartId)
          }
        })

      console.log('deletedItemInCart is', deletedItemInCart)

      // const deletedItemInCart = await destroyItemsInCart(itemInCart.itemsId);

      //will also need to grab the cart and remove the associated item on the javascript level, otherwise it will show that it is still in the cart even after it's been removed from the db

      //by grabbing the item by its' itemID inside of the itemsInCart table we are able to 

      if (deletedItemInCart) {
        console.log('item successfully deleted')
        res.send(deletedItemInCart);
      }

    }catch (error) {
        next(error)
    }
});

itemsInCartRouter.use((error, req, res, next) => {
    console.log("error caught in itemsInCart Router")
    res.send(error);
  });

module.exports = itemsInCartRouter;



