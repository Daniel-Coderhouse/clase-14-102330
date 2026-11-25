import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import styles from "./styles.module.css";
import { Link } from "react-router";

import CardProduct from "../CardProduct/CardProduct";

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const producstCollection = collection(db, "products");

        const snapshot = await getDocs(producstCollection);

        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productsData);
      } catch (error) {
        console.log(error.code, error.message);
      }
    };

    getProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Lista de Productos</h2>

      <div className={styles.grid}>
        {products.map((product) => (
          <Link
            to={`/detail/${product.id}`}
            style={{ textDecoration: "none" }}
            key={product.id}
          >
            <CardProduct data={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
