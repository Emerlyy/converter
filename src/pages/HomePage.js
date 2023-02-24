import Converter from "../features/converter/Converter";

import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page-container">
      <div className="container">
      <div className="home-page-wrapper">
        <Converter />
      </div>
    </div>
    </div>
  );
}

export default HomePage;