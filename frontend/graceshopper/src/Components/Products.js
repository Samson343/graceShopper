import React, { useEffect, useState } from 'react';
import styles from '../styles/Products.module.css'
import { getAllItems, getProductById } from '../api/itemRequests';
import { addToCart } from '../api/cartRequests';
import SingleProduct from './SingleProduct';

const Products = ({ token, itemProps, setItemProps, singleProduct, setSingleProduct, category, setCategory }) => {
  const [products, setProducts] = useState([]);
  const [selectValue, setSelectValue] = useState('')
  const [selectCategory, setSelectCategory] = useState('')

  useEffect(() => {
    const getAllProductsAsync = async () => {
      let allProducts = await getAllItems();
      setProducts(allProducts);
    }
    getAllProductsAsync();
  }, [])

  useEffect(() => {
    const getProductsByCategoryAsync = async () => {
      let allProducts = await getAllItems();
      if (category) {
        let categoryItems = allProducts.filter(product => product.category === category)
        setProducts(categoryItems);
        console.log(categoryItems)
      }
      else {
        setProducts(allProducts)
      }

    }
    getProductsByCategoryAsync();
  }, [category])

  return (
    <div className={styles.homeDiv}>

      {
        singleProduct

          ?

          <SingleProduct
            setSingleProduct={setSingleProduct}
            setItemProps={setItemProps}
            itemProps={itemProps}
            token={token}
            addToCart={addToCart}
            getProductById={getProductById}
          />

          :
          <>
            <div className={styles.topWrapper}>

              <span className = {styles.heading}>Gear Up. Get Out.</span>
              <select style={{display: "inline"}} onChange={(e) => {
                setCategory(e.target.value)
              }} className={`form-select form-select-sm ${styles.selector}`} aria-label=".form-select-sm example">
                <option defaultValue value=''>Browse By Category</option>
                <option value="Shoes">Shoes</option>
                <option value="Tents">Tents</option>
                <option value="Clothing">Outdoor Clothing</option>
                <option value="Firepits and Grills">Firepits and Grills</option>
                <option value="Skis">Skis and Gear</option>
                <option value="Snowboards">Snowboards and Gear</option>
                <option value="">All Products</option>
              </select>
            </div>
            <div className={styles.container}>

              {
                products.map(({ brand, category, id, name, price, size, image, inventory }) => {
                  return (
                    <div key={id}>

                      <div
                        className={`card ${styles.productCard}`}
                        style={{
                          width: "19rem",
                        }}
                        onClick={async (e) => {
                          const props = await getProductById(id);
                          setItemProps(props)
                          setSingleProduct(true);
                        }}>

                        <img src={image} className="card-img-top" alt="..." />

                        <div className={`card-body ${styles.cardBody}`}>
                          <span className={styles.brandContainer}>
                            <p className="card-text">{brand}®</p>
                            <p className={`card-text ${styles.Name}`}>{name}</p>
                          </span>
                          <span className={styles.priceContainer}>
                            { 
                              inventory < 1 ? 

                              <>
                              <h5 className={`card-title ${styles.stock}`}>Sold-Out!</h5>
                              </>

                                :

                              <>
                              <h5 className={`card-title ${styles.stock}`}>Ships In 2-3 Business Days</h5>
                              </>
                            }
                            
                            <p className={`card-text ${styles.price}`}>${price}</p>
                          </span>

                        </div>

                      </div>

                    </div>

                  )

                })
              }
            </div>
          </>
      }

    </div>
  )
}

export default Products;