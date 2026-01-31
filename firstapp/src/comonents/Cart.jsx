import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      axios.get(`https://ecom-z1sw.onrender.com/api/cart?userId=${userId}`) //
        .then(res => setCartItems(res.data.items || []));
    }
  }, [userId]);

  const totalAmount = cartItems.reduce((acc, item) => acc + (parseFloat(item.product?.price || 0) * item.quantity), 0);

  return (
    <div style={styles.wrapper}>
      <div style={styles.cartBox}>
        <h2 style={{ textAlign: 'center', color: '#333' }}>Your Shopping Cart</h2>
        <hr />
        {cartItems.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Cart is empty.</p>
        ) : (
          <>
            <div style={styles.itemList}>
              {cartItems.map((item, index) => (
                <div key={index} style={styles.itemRow}>
                  <div>
                    <div style={styles.itemName}>{item.product?.name}</div>
                    <div style={styles.qty}>Quantity: {item.quantity}</div>
                  </div>
                  <div style={styles.itemTotal}>₹{(item.product?.price * item.quantity).toLocaleString('en-IN')}</div>
                </div>
              ))}
            </div>
            <div style={styles.footer}>
              <div style={styles.totalLabel}>Total Payable</div>
              <div style={styles.totalValue}>₹{totalAmount.toLocaleString('en-IN')}</div>
            </div>
            <button style={styles.checkoutBtn}>Proceed to Payment</button>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  wrapper: { display: 'flex', justifyContent: 'center', padding: '50px 20px', backgroundColor: '#f4f7f6', minHeight: '90vh' },
  cartBox: { width: '100%', maxWidth: '500px', backgroundColor: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' },
  itemRow: { display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #eee' },
  itemName: { fontWeight: 'bold', fontSize: '16px' },
  qty: { color: '#888', fontSize: '14px' },
  itemTotal: { fontWeight: 'bold', color: '#27ae60' },
  footer: { display: 'flex', justifyContent: 'space-between', marginTop: '20px', padding: '15px 0', borderTop: '2px solid #333' },
  totalLabel: { fontSize: '20px', fontWeight: 'bold' },
  totalValue: { fontSize: '20px', fontWeight: 'bold', color: '#e67e22' },
  checkoutBtn: { width: '100%', marginTop: '20px', padding: '12px', background: '#333', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }
};

export default Cart;