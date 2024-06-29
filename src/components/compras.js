import React, { useState } from 'react';

const PurchaseCounter = ({ participant }) => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => {
    if (count > 0) setCount(count - 1);
  };

  return (
    <div className="purchase-counter">
      <h3>Compras: {count}</h3>
      <button className="button-info" onClick={increment}>+</button>
      <button className="button-info" onClick={decrement}>-</button>
    </div>
  );
};

export default PurchaseCounter;
