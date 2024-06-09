import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { cartSliceActions } from "../../store/cart-slice";
const CartItem = (props) => {
  const { id, title, quantity, total, price } = props.item;
  const dispatch = useDispatch();
  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button
            onClick={() => {
              dispatch(
                cartSliceActions.removeFromCart({
                  id: id,
                  title: title,
                  quantity: quantity,
                  total: total,
                  price: price,
                })
              );
            }}
          >
            -
          </button>
          <button
            onClick={() => {
              dispatch(
                cartSliceActions.addToCart({
                  id: id,
                  title: title,
                  quantity: quantity,
                  total: total,
                  price: price,
                })
              );
            }}
          >
            +
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
