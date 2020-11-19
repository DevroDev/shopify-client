import React from "react";
import Hero from "../cards/Hero";
import Banner from "../cards/Banner";
import { Link } from "react-router-dom";
const ShopHeader = () => {
  return (
    <>
      <Hero hero="shopHero">
        <Banner title="Products">
          <Link to="/" className="btn-primary">
            return home
          </Link>
        </Banner>
      </Hero>
    </>
  );
};

export default ShopHeader;