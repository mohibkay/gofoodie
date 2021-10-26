import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import MenuItems from "./MenuItems";

const Home = () => {
  return (
    <div>
      <Carousel />
      <div className="menu-title" id="menu-section">
        <h3 className="menu-title-heading">Food that you will love to taste</h3>
        <p className="menu-title-subheading">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi soluta
          nemo unde deleniti atque provident. Blanditiis sint, veritatis
          necessitatibus consectetur, expedita laboriosam reiciendis aliquid ut
          cum tempore temporibus nam perspiciatis.
        </p>
      </div>
      <MenuItems />
      <Footer />
    </div>
  );
};

export default Home;
