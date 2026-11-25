import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import styles from "./styles.module.css";
import CardProduct from "../../components/CardProduct/CardProduct";
import { useParams } from "react-router"; // Asegúrate de que sea "react-router-dom" si usas v6

const CategoryProduct = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        // 1. Referencia a la colección
        const productsRef = collection(db, "products");

        // 2. Creación de la consulta con query() y usando categoryId dinámico
        const q = query(productsRef, where("category", "==", categoryId));

        // 3. Ejecución de la consulta
        const snapshot = await getDocs(q);

        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productsData);
      } catch (error) {
        console.log(error.code, error.message);
      }
    };

    if (categoryId) {
      getProducts();
    }
  }, [categoryId]); // 4. Se vuelve a ejecutar si cambia la categoría

  return (
    <div className={styles.container}>
      <h2>Lista de Productos</h2>
      <div className={styles.grid}>
        {products.map((product) => (
          <CardProduct key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProduct;
