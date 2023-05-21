import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
  const [isOrdered, setIsOrdered] = useState(false)
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const isOrderedClickHandler = () => {
    setIsOrdered((prevOrder) => !isOrdered);
  }

  // send 'POST' data to database 'Firebase' 
  const submitOrdersData = (userData) => { 
    fetch( 'https://react-http-d667c-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
    })
  }


  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        
        <span>Total Amount</span>
        <span>{totalAmount}</span>
        
      </div>
      {isOrdered && <Checkout onConfirm={submitOrdersData} onCancel={props.onClose}/>}
      <div className={classes.actions}>
        {!isOrdered && <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>}
        {hasItems && !isOrdered && <button className={classes.button} onClick={isOrderedClickHandler}>Order</button>}
        
      </div>
    </Modal>
  );
};

export default Cart;
