import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

const Header = ({ showCart = false, cartCount = 0 }) => {
  const displayStyle = { display: `${showCart ? "block" : "none"}` };

  return (
    <nav>
      <header className="navigation-bar">
        <div className="home-link">
          <Link to="/">
            <h1>gofoodie</h1>
          </Link>
        </div>
        <div className="cart-icon" style={displayStyle}>
          <FiShoppingCart size="30" color="green" className="cart-logo" />
          <span className="cart-count">{cartCount}</span>
        </div>
        <div className="menu-link">
          <Link to="/menu">Available Menus</Link>
        </div>
      </header>
    </nav>
  );
};

export default Header;
