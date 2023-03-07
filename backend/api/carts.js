const express = require("express");
const cartsRouter = express.Router();

const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env;

const { isUser,isAdministrator } = require("./utils");

const {
    createCart,
    getAllCarts,
    getCartById,
    getCartByUserId,
    destroyCart
} = require("../db/carts");

// GET /api/carts
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

// GET /api/carts/:cartId
cartsRouter.get("/:cartId", isUser, async (req, res) => {

    const { id } = req.body;

    try {
      const cart = await getCartById({id});
      if (cart) {
        res.send(cart);
      }
    } catch (error) {
      throw Error("Failed to get cart by cartId", error);
    }
  });


// POST /api/carts
cartsRouter.post("/", isUser, async (req, res, next) => {
  
    const { userId } = req.body;

  try {

    // check for valid user - logged in for userId

    // if (req.headers.authorization) {
    //     const usertoken = req.headers.authorization;
    //     const token = usertoken.split(' ');
    //     const data = jwt.verify(token[1], JWT_SECRET);
    //     const userId = data.id;
    

    // check for carts with the same userId
    const cart = await getCartByUserId({userId});

    if (cart) {
      next({
        error: "duplicateCart",
        message: `An cart with the userId ${userId} already exists in the database`,
        name: "noDuplicateCartError",
      });
    } else {
      const newCart = createCart({ userId });
      res.send(newCart);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

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
