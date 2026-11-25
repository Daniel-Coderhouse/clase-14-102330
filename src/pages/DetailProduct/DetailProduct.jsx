import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import styles from "./styles.module.css";

import { db } from "../../firebase/firebaseConfig";
import CardProduct from "../../components/CardProduct/CardProduct";

const DetailProduct = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProductById = async () => {
      setLoading(true);
      setProduct(null);
      setError("");

      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({
            ...docSnap.data(),
            id: docSnap.id,
          });
        }
      } catch (error) {
        setError("No se pudo obtener el producto.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getProductById();
    }
  }, [id]);

  if (loading) {
    return <p>Cargando producto...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>El producto no existe.</p>;
  }

  return (
    <div className={styles.container}>
      <h2>Detalle del producto</h2>

      <CardProduct data={product} />

      <p>{product.description}</p>
    </div>
  );
};

export default DetailProduct;
