import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth"; // auth
import { Routes, Route, Navigate } from "react-router";
import { auth } from "./firebase/firebaseConfig";

//components
import Auth from "./components/Auth/Auth";
import ProductsList from "./components/ProductsList/ProductsList";
import Nav from "./components/Nav/Nav";
//pages
import DetailProduct from "./pages/DetailProduct/DetailProduct";
import CategoryProduct from "./pages/CategoryProduct/CategoryProduct";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("user", user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Cargando sesión...</p>;
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="container">
      <Nav />

      <h1>Mi tienda</h1>

      <button onClick={() => signOut(auth)}>Cerrar sesión</button>

      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/category/:categoryId" element={<CategoryProduct />} />
        <Route path="/detail/:id" element={<DetailProduct />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
