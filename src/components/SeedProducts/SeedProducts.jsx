import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import products from "../../firebase/products.json";

const SeedProducts = () => {
  const uploadProducts = async () => {
    try {
      const producstCollection = collection(db, "informatic");

      for (const product of products) {
        await addDoc(producstCollection, product);
      }

      alert("Productos agregados a firestore");
    } catch (error) {
      console.log("error al subir productos", error);
    }
  };

  return (
    <div>
      <h4>Cargar Productos</h4>
      <button onClick={uploadProducts}>Cargar </button>
    </div>
  );
};

export default SeedProducts;
