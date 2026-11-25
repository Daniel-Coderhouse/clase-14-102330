import { Link } from "react-router";
import "./Nav.css";

const Nav = () => {
  return (
    <nav className="navbar">
      <Link to="/">Todos</Link>
      <Link to="/category/buzos">Buzos</Link>
      <Link to="/category/remeras">Remeras</Link>
      <Link to="/category/camperas">Camperas</Link>
    </nav>
  );
};

export default Nav;
