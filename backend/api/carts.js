const express = require("express");
const cartsRouter = express.Router();
const stripe = require('stripe')('sk_test_51MkrV7LhUbC2qSKjwkRldGXO3SWOaNfdWAE6UlMRnJdexd051wYtfauJIPq8UrhGDwSIlHgp4xGYnzqLBVVdP7bW00bkQL5qn2')

const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env;

const { isUser,isAdministrator } = require("./utils");

const {
    createCart,
    getAllCarts,
    getCartById,
    getCartByUserId,
    getPreviousCartsByUserId,
    destroyCart,
    attachItemsToCart,
    getCartAndItemDetails,
    checkoutCart
} = require("../db/carts");

const {updateInventory} = require("../db/items")

// GET /api/carts get all carts as administrator
cartsRouter.get("/", isAdministrator, async (req, res) => {
  try {
    const carts = await getAllCarts();
    if (carts) {
      res.send(carts);
    }
  } catch (error) {
    throw Error("Failed to get all carts", error);
  }
});

cartsRouter.get('/health', async (req, res, next) => {
  res.status(200).send({
     message: "all is well!"
  })
});


cartsRouter.get("/userCart", isUser, async (req, res) => {

    const userId  = req.user.id

    try {
      
      const cart = await getCartByUserId(userId);
      const withItems = await getCartAndItemDetails(cart)
    
      if (withItems) {
        res.send(withItems);
      } 
      else if (cart) {
        res.send(cart)
      } else if(!cart) {
        res.send({
          message: "Whoops, doesn't look like there's an active cart...yet",
          name: "noCartError",
        })
      }
    } catch (error) {
      throw Error("Failed to get cart by cartId", error);
    }
  });


cartsRouter.get("/userCart/orderHistory", isUser, async (req, res) => {

    const userId  = req.user.id

    try {
      const carts = await getPreviousCartsByUserId(userId)
      let orderHistory = [];
      for (let i = 0; i < carts.length; ++i) {
        let cart = carts[i]
        orderHistory.push(await getCartAndItemDetails(cart))
      }
      
      res.send(orderHistory);
      
       if(!carts) {
        res.send({
          message: "Couldn't locate any orders",
          name: "noOrdersError",
        })
      }
    } catch (error) {
      throw Error(`Failed to get order history by userId ${userId}`, error);
    }
  });


// POST /api/carts create a new cart if you are a user
cartsRouter.post("/", isUser, async (req, res, next) => {
  
    const { userId } = req.body;

  try {

    const cart = await getCartByUserId({ userId });

    if (cart) {
      next({
        error: "duplicateCart",
        message: `An cart with the userId ${userId} already exists in the database`,
        name: "noDuplicateCartError",
      });
    } else {
      const newCart = createCart( userId );
      res.send(newCart);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// PATCH /api/carts/:cartId checkout a cart
cartsRouter.patch('/:cartId', isUser, async (req, res, next) => {
  try {
    const userId = req.user.id
    const testCart = await getCartByUserId(userId);
    const withItems = await getCartAndItemDetails(testCart)
    withItems.itemsInCart.map(async ({inventory, quantity, itemsId}) => {
      let newInventory = (inventory - quantity);
      await updateInventory(newInventory, itemsId)
    })


    const cartId = parseInt(req.params.cartId);
    const cart = await checkoutCart(cartId)

    res.send(cart)
  } catch (error) {
    throw Error('failed to checkout cart with cartId: ', cartId)
  }
})

// DELETE /api/carts/:cartId
cartsRouter.delete('/:cartId', isUser, async (req, res, next) => {

    try {
        const cartId = parseInt(req.params.cartId);
        
        const cart = await getCartById({cartId});

        const deleteCart = await destroyCart({cart});
        res.send(deleteCart)

    }catch (error) {
        throw Error("Failed to delete cart by cartId", error)
    }

});

cartsRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = cartsRouter;
