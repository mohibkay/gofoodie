import Carousel from "./Carousel";
import Footer from "./Footer";

function App() {
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
      <Footer />
    </div>
  );
}

export default App;
