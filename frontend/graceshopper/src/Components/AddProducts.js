import React, { useState } from "react";
import { BASEURL } from "../constants/constants";
import styles from '../styles/AddProducts.module.css'
import { useNavigate } from 'react-router-dom';

const AddProducts = ({ token, products, setProducts }) => {

  const [addname, setAddName] = useState([]);
  const [addcategory, setAddCategory] = useState([]);
  const [addprice, setAddPrice] = useState([]);
  const [addbrand, setAddBrand] = useState([]);
  const [adddescription, setAddDescription] = useState([]);
  const [addsize, setAddSize] = useState([]);
  const [addinventory, SetAddInventory] = useState([]);
  const [image, setImage] = useState([]);

  const navigate = useNavigate()

  return (
    <div className={styles.mainContainer}>
    
      <h3 className={`${styles.title}`}> Add Product </h3>
      <form
        className={`${styles.addItemForm}`}
        onSubmit={async (e) => {

          e.preventDefault();

          const body = JSON.stringify({

            name: addname,
            category: addcategory,
            brand: addbrand,
            size: addsize,
            price: addprice,
            description: adddescription,
            inventory: addinventory,
            image: image

          });
          

          try {
            const response = await fetch(`${BASEURL}/items/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body

            });

            const json = await response.json();
            
            if (json) {
              alert(`Product ${json.name} successfully created`)
            }

          } catch (error) {
            console.log(error);
          }

          navigate('/admin')

        }}>

        <div className={styles.addItem}>
          <label for="name">Name:</label>
          <input
            placeholder="name"
            value={addname}
            onChange={(e) => setAddName(e.target.value)}
          ></input>
        </div>

        <div className={styles.addItem}>
          <label for="brand">Brand:</label>
          <input
            placeholder="brand"
            value={addbrand}
            onChange={(e) => setAddBrand(e.target.value)}
          ></input>
        </div>

        <div className={styles.addItem}>
          <label for="category">Category:</label>
          <input
            placeholder="category"
            value={addcategory}
            onChange={(e) => setAddCategory(e.target.value)}
          ></input>
        </div>

        <div className={styles.addItem}>
          <label for="size">Size:</label>
          <input
            placeholder="size"
            value={addsize}
            onChange={(e) => setAddSize(e.target.value)}
          ></input>
        </div>

        <div className={styles.addItem}>
          <label for="price">Price:</label>
          <input
            placeholder="price"
            value={addprice}
            onChange={(e) => setAddPrice(e.target.value)}
          ></input>
        </div>

        <div className={styles.addItem}>
          <label for="description">Description:</label>
          <input
            placeholder="description"
            value={adddescription}
            onChange={(e) => setAddDescription(e.target.value)}
          ></input>
        </div>

        <div className={styles.addItem}>
          <label for="inventory">Inventory:</label>
          <input
            placeholder="inventory"
            value={addinventory}
            onChange={(e) => SetAddInventory(e.target.value)}
          ></input>
        </div>

        <div className={styles.addItem}>
          <label for="image">Image:</label>
          <input
            placeholder="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          ></input>
        </div>

        <button className={styles.itemSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default AddProducts;
