import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";

const Cart = ({ history }) => {
  const dispatch = useDispatch();
  const { cart, user } = useSelector((state) => ({ ...state }));

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    //console.log("cart", JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        console.log("Cart Post res", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save error", err));
  };

  const saveCashOrderToDb = () => {
    //console.log("cart", JSON.stringify(cart, null, 4));
    dispatch({
      type: "COD",
      payload: true,
    });
    
    userCart(cart, user.token)
      .then((res) => {
        console.log("Cart Post res", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save error", err));
  };

  const showCartItems = () => (
    <table className="table">
      <thead className="thead-light">
        <tr>
          <th>Image</th>
          <th className="col-3">Product</th>
          <th className="col-3">Shipping</th>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  return (
    <div className="container-fluid pt-5">
      <div className="row">
        <div className="col-sm-6 col-lg-8 pt-3">
          <h3>
            Cart - {cart.length}
            {cart.length < 2 ? <h3>Product</h3> : <h3>Products</h3>}
          </h3>

          {!cart.length ? (
            <p>
              No products in cart. <Link to="/shop">Continue Shopping.</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-sm-12 col-lg-4 pt-3 mb-3">
          <h3>Order Summary</h3>
          <hr />
          <h4>Products</h4>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          <p>Total: ${getTotal()}</p>
          <hr />
          {user ? (
            <>
              <button
                onClick={saveOrderToDb}
                className="btn-primary mt-2"
                disabled={!cart.length}
              >
                Proceed to Checkout
              </button>
              <br />
              <button
                onClick={saveCashOrderToDb}
                className="btn-primary mt-2"
                disabled={!cart.length}
              >
                Pay Cash On Delivery
              </button>
            </>
          ) : (
            <button className="btn-primary mt-2">
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
              >
                Login to Checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
