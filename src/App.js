import { Fragment, useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import Notification from "./components/UI/Notification";
import { uiActions } from "./store/ui-slice";

let isInitial = true;
function App() {
  const dispatch = useDispatch();
  const cartToggle = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  const updateCart = async () => {
    dispatch(
      uiActions.showNotification({
        status: "Pending",
        title: "Sending",
        message: "Sending Cart Data",
      })
    );
    const response = await fetch(
      "https://indigo-pod-388318-default-rtdb.firebaseio.com/expenses.json",
      { method: "PUT", body: JSON.stringify(cart) }
    );

    if (!response.ok) {
      uiActions.showNotification({
        status: "Failed",
        title: "Failure!...",
        message: "Sending Cart Data Failed",
      });
      throw new Error("Sending cart data failed");
    }

    uiActions.showNotification({
      status: "Success",
      title: "Success!...",
      message: "Sent Cart Data Successful",
    });
  };
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    updateCart();
  }, [cart]);
  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartToggle && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
