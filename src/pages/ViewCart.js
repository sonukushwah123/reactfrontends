import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ViewCart = () => {
  // const [num, setNum] = useState(0);

  // const [nums, setNums] = useState(0);
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState({});
  const [coupons, setCoupons] = useState([]);
  const [couponApplied, setCouponApplied] = useState({});
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [couponText, setCouponText] = useState("");
  const [currentWalletData, setCurrentWalletData] = useState({});

  useEffect(() => {
    viewCart();
    // getCoupons();
  }, []);
  useEffect(() => {
    // add entity - POST
    // e.preventDefault();
    // creates entity
    const tokenID = localStorage.getItem("token");
    console.log("hello", tokenID);
    fetch("http://localhost:5000/viewProfile", {
      method: "GET",
      mode: "cors",

      headers: {
        "Content-type": "application/json",
        Authorization: `${tokenID}`,
      },
    })
      .then((response) => response.json())

      .then((json) => {
        console.log(json.data);
        setCurrentWalletData(json.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const viewCart = async () => {
    const tokenID = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${tokenID}`,
    };
    await axios
      .get("http://localhost:5000/viewCart", {
        headers: headers,
      })
      .then((response) => {
        console.log("cart items ---------------", response.data);
        // this.setState({ ...this.state, cartItems: response.data });
        setCartItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCoupons = async () => {
    await axios
      .get("http://localhost:5000/getCoupon")
      .then((response) => {
        console.log("coupons ++++++++++++++++++", response.data.data);
        setCoupons(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addTocarthandler = async (id) => {
    const tokenID = localStorage.getItem("token");
    console.log(cartItems);
    console.log(id);
    console.log(
      cartItems.message?.filter((item, index) => item.productId._id === id)
    );

    let quantity = 1;
    if (cartItems.message.length > 0) {
      quantity = cartItems.message?.filter(
        (item, index) => item.productId._id === id
      )[0]
        ? cartItems.message?.filter(
            (item, index) => item.productId._id === id
          )[0].quantity + 1
        : 1;
    } else {
      quantity = 1;
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${tokenID}`,
    };
    const data = { quantity: quantity };
    setIsAddLoading(true);
    await axios
      .post(`http://localhost:5000/addCart/${id}`, data, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data.message);
        viewCart();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsAddLoading(false));
  };

  const deleteFromcarthandler = async (id) => {
    const tokenID = localStorage.getItem("token");
    console.log(cartItems);
    console.log(id);
    console.log(
      cartItems.message?.filter((item, index) => item.productId._id === id)
    );

    let quantity = 1;
    if (cartItems.message.length > 0) {
      quantity =
        cartItems.message?.filter((item, index) => item.productId._id === id)[0]
          .quantity > 1
          ? cartItems.message?.filter(
              (item, index) => item.productId._id === id
            )[0].quantity - 1
          : 0;
    } else {
      quantity = 1;
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${tokenID}`,
    };
    const data = { quantity: quantity };
    setIsAddLoading(true);
    await axios
      .post(`http://localhost:5000/addCart/${id}`, data, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data.message);
        viewCart();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsAddLoading(false));
  };

  const deleteCartItem = async (id) => {
    const tokenID = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${tokenID}`,
    };

    setIsAddLoading(true);
    await axios
      .post(
        `http://localhost:5000/deleteCart/${id}`,
        {},
        {
          headers: headers,
        }
      )
      .then((response) => {
        console.log(response.data.message);
        viewCart();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsAddLoading(false));
  };

  const checkCoupon = async () => {
    await axios
      .post("http://localhost:5000/getCoupon", { applyCouponName: couponText })
      .then((response) => {
        console.log("coupons ++++++++++++++++++", response.data);
        setCoupons(response.data);
        setCouponApplied(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const walletUpdateHandler = async (newTotal) => {
    const tokenID = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${tokenID}`,
    };

    await axios
      .post(
        `http://localhost:5000/useWallet/`,
        { value: newTotal },
        {
          headers: headers,
        }
      )
      .then((response) => {
        console.log(response.data);
        navigate('/puchaseSuccess')
      })  
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="Cart">
      <div className="container">
        <div className="out-cart">
          <div className="inner-cart">
            <table className="table bg-transparent table-borderless border-0 mb-3">
              <tbody>
                <tr className="border-0">
                  <th scope="col"></th>
                  <th scope="col">Product</th>
                  <th scope="col" className="text-center p-0">
                    Price
                  </th>
                  <th scope="col" className="text-center p-0">
                    Quantity
                  </th>
                  <th scope="col" className="text-center p-0">
                    Total
                  </th>
                </tr>
              </tbody>
              <tbody>
                {cartItems.message?.map((item, index) => (
                  <tr style={{ position: "relative" }} className="second-tr">
                    {isAddLoading === true && (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: "black",
                          opacity: 0.4,
                          position: "absolute",
                          top: 0,
                          left: 0,
                          zIndex: 999,
                        }}
                      ></div>
                    )}
                    <th scope="col">
                      <i
                        onClick={() => deleteCartItem(item.productId._id)}
                        aria-hidden="true"
                        class="fas fa-times"
                      ></i>
                    </th>
                    <th scope="col">{item.productId.title}</th>
                    <th scope="col" className="p-0 text-center">
                      <span className>
                        <bdi>
                          <span className>₹</span>
                          {item.productId.price}
                        </bdi>
                      </span>
                    </th>
                    <th scope="col" className="p-0 text-center">
                      <div className="quantity d-flex align-items-center justify-content-between w-50 m-auto">
                        <span
                          style={{ cursor: "pointer" }}
                          className="cursor-pointer"
                          data-action-type="minus"
                          onClick={() => {
                            deleteFromcarthandler(item.productId._id);
                          }}
                        >
                          -
                        </span>
                        <h3> {item.quantity}</h3>
                        <span
                          style={{ cursor: "pointer" }}
                          className="cursor-pointer"
                          data-action-type="plus"
                          onClick={() => {
                            addTocarthandler(item.productId._id);
                          }}
                        >
                          +
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="p-0 text-center">
                      <span className="woocommerce-Price-amount amount">
                        <bdi>
                          <span className>₹</span>
                          {item.quantity * item.productId.price}
                        </bdi>
                      </span>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="coupon-wrap">
            <div className="coupon-inner">
              <div className="coupon">
                {/* <input
                  type="text"
                  className="bg-transparent border-0"
                  placeholder="Coupon Code"
                /> */}

                <div style={{ display: "flex" }}>
                  <input
                    type="text"
                    value={couponText}
                    onChange={(e) => setCouponText(e.target.value)}
                  />
                  <button
                    type="button"
                    class="btn Coupons btn-primary"
                    // data-bs-toggle="modal"
                    // data-bs-target="#exampleModal"
                    onClick={() => checkCoupon()}
                  >
                    Apply
                  </button>
                </div>

                {/* <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                          Modal title
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        {coupons?.map((item, index) => (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div>{item.couponName}</div>
                            <div>
                              {item.couponType !== "Flat"
                                ? `${item.offAmount} %`
                                : `Rs. ${item.offAmount}`}
                            </div>
                            <div
                              onClick={() => setCouponApplied(item._id)}
                              data-bs-dismiss="modal"
                            >
                              Apply Coupon
                            </div>
                          </div>
                        ))}
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" class="btn btn-primary">
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div> */}

                {/* 
                <button>Apply Coupon</button> */}
              </div>
              <Link to="/Services">
                <i aria-hidden="true" className="fas fa-chevron-left" />
                Continue Shopping
              </Link>
            </div>
            <div className="cart-collaterals">
              <div className="eael-cart-update-btn">
                <button>Update Cart</button>
              </div>
              <div className="cart_totals ">
                <table className="shop_table shop_table_responsive">
                  <tbody>
                    <tr className="cart-subtotal">
                      <th scope="col">Subtotal</th>
                      <td data-title="Subtotal">
                        <span className="woocommerce-Price-amount amount">
                          <bdi>
                            <span className="woocommerce-Price-currencySymbol">
                              ₹
                            </span>
                            {cartItems.totalPrice}
                          </bdi>
                        </span>
                      </td>
                    </tr>
                    {couponApplied?.message?.offAmount ? (
                      <tr className="cart-subtotal">
                        <th scope="col">Coupon Discount</th>
                        <td data-title="Subtotal">
                          <span className="woocommerce-Price-amount amount">
                            <bdi>
                              <span className="woocommerce-Price-currencySymbol">
                                ₹
                              </span>
                              {couponApplied.message.couponType === "Flat"
                                ? couponApplied.message.offAmount
                                : (cartItems.totalPrice *
                                    couponApplied.message.offAmount) /
                                  100}
                            </bdi>
                          </span>
                        </td>
                      </tr>
                    ) : null}
                    <tr className="order-total">
                      <th scope="col">Total</th>
                      <td data-title="Total">
                        <strong>
                          <span className="woocommerce-Price-amount amount">
                            <bdi>
                              <span className="woocommerce-Price-currencySymbol">
                                ₹
                              </span>
                              {couponApplied?.message?.offAmount
                                ? couponApplied.message.couponType === "Flat"
                                  ? cartItems.totalPrice -
                                    couponApplied.message.offAmount
                                  : cartItems.totalPrice -
                                    (cartItems.totalPrice *
                                      couponApplied.message.offAmount) /
                                      100
                                : cartItems.totalPrice}
                            </bdi>
                          </span>
                        </strong>{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="wc-proceed-to-checkout">
                  <button
                    className="checkout-button button alt wc-forward"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <button>Proceed to Checkout </button>{" "}
                  </button>
                </div>
                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                          Modal title
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <table className="shop_table shop_table_responsive">
                          <tbody>
                            <tr className="cart-subtotal">
                              <th scope="col">Subtotal</th>
                              <td data-title="Subtotal">
                                <span className="woocommerce-Price-amount amount">
                                  <bdi>
                                    <span className="woocommerce-Price-currencySymbol">
                                      ₹
                                    </span>
                                    {cartItems.totalPrice}
                                  </bdi>
                                </span>
                              </td>
                            </tr>
                            {couponApplied?.message?.offAmount ? (
                              <tr className="cart-subtotal">
                                <th scope="col">Coupon Discount</th>
                                <td data-title="Subtotal">
                                  <span className="woocommerce-Price-amount amount">
                                    <bdi>
                                      <span className="woocommerce-Price-currencySymbol">
                                        ₹
                                      </span>
                                      {couponApplied.message.couponType ===
                                      "Flat"
                                        ? couponApplied.message.offAmount
                                        : (cartItems.totalPrice *
                                            couponApplied.message.offAmount) /
                                          100}
                                    </bdi>
                                  </span>
                                </td>
                              </tr>
                            ) : null}
                            <tr className="order-total">
                              <th scope="col">Total</th>
                              <td data-title="Total">
                                <strong>
                                  <span className="woocommerce-Price-amount amount">
                                    <bdi>
                                      <span className="woocommerce-Price-currencySymbol">
                                        ₹
                                      </span>
                                      {couponApplied?.message?.offAmount
                                        ? couponApplied.message.couponType ===
                                          "Flat"
                                          ? cartItems.totalPrice -
                                            couponApplied.message.offAmount
                                          : cartItems.totalPrice -
                                            (cartItems.totalPrice *
                                              couponApplied.message.offAmount) /
                                              100
                                        : cartItems.totalPrice}
                                    </bdi>
                                  </span>
                                </strong>{" "}
                              </td>
                            </tr>
                            <tr className="cart-subtotal">
                              <th scope="col">Available Amount in Wallet</th>
                              <td data-title="Subtotal">
                                <span className="woocommerce-Price-amount amount">
                                  <bdi>
                                    <span className="woocommerce-Price-currencySymbol">
                                      ₹
                                    </span>
                                    {currentWalletData?.wallet}
                                  </bdi>
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          onClick={() =>
                            walletUpdateHandler(
                              couponApplied?.message?.offAmount
                                ? couponApplied.message.couponType === "Flat"
                                  ? cartItems.totalPrice -
                                    couponApplied.message.offAmount
                                  : cartItems.totalPrice -
                                    (cartItems.totalPrice *
                                      couponApplied.message.offAmount) /
                                      100
                                : cartItems.totalPrice
                            )
                          }
                          type="button"
                          class="btn btn-primary"
                        >
                          Checkout with wallet money
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCart;
