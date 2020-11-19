import React from "react";
import { Link } from "react-router-dom";
import Hero from "./Hero";
import Banner from "./Banner";
const LandingPage = () => {
  return (
      <Hero hero="landingPage">
        <Banner title="Free Shipping" subtitle="Shop The New Brands Up to 40% off Now.">
          <Link to="/shop" className="btn-primary mt-3">
            Shop Collections
          </Link>
        </Banner>
      </Hero>
  );
};

export default LandingPage;
