import React from "react";
import { Link } from "react-router-dom";

import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import Jumbotron from "../components/cards/Jumbotron";
import Hero from "../components/cards/Hero";
import Banner from "../components/cards/Banner";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";

const Home = () => {
  return (
    <div>
      <div className="">
        <Hero>
          <Banner title="Giggle Shop" subtitle="The good life at a great price">
            <Link to="/sneakers" className="btn-primary">
              Start Shopping
            </Link>
          </Banner>
        </Hero>
      </div>
      {/*<div className="jumbotron text-danger text-center h1 font-weight-bold">
        <Jumbotron text={["Best Seller", "New Arrival"]} />
      </div>*/}
      <NewArrivals />
      <BestSellers />
      <CategoryList />
      <SubList />
      <br />
      <br />
    </div>
  );
};

export default Home;
