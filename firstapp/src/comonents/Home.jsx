import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://ecom-z1sw.onrender.com/api/product");
      if (res.status === 200) setProducts(res.data);
    } catch (err) {
      console.error("Fetch Error", err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return alert("Please login to proceed.");

    setProcessingId(productId);
    try {
      await axios.post("https://ecom-z1sw.onrender.com/api/cart/add", 
        { productId, quantity: 1 }, 
        { params: { userId } }
      );
      Swal.fire({
  title: "Good job!",
  text: "product added successfully to cart",
  icon: "success"
});
      navigate("/cart");
    } catch (err) {
      alert("System could not process request.");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-white">
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  );

  return (
    <div className="bg-white min-vh-100 text-dark">
      {/* Header Section */}
      <div className="container-fluid px-0 border-bottom border-light-blue">
        <div className="container py-5">
          <h1 className="display-5 fw-bold mb-0 text-navy tracking-tight">OFFICE_COLLECTION</h1>
          <p className="small text-uppercase text-primary fw-bold ls-2 mt-2">Premium Hardware & Design</p>
        </div>
      </div>

      {/* Grid Section */}
      <div className="container-fluid px-0">
        <div className="row g-0">
          {products.map((product) => (
            <div key={product._id} className="col-12 col-md-6 col-xl-3 border-end border-bottom border-light-blue product-cell">
              <div className="p-4 p-md-5 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <span className="badge-blue text-uppercase">{product.category}</span>
                    <span className="small text-muted font-monospace">#{product.stock}</span>
                  </div>
                  <h3 className="h5 fw-bold text-navy mb-3">{product.name}</h3>
                  <p className="small text-secondary mb-4 lh-lg">
                    {product.description}
                  </p>
                </div>

                <div className="mt-4">
                  <div className="h4 fw-bold text-primary mb-4">${product.price}</div>
                  {role === "admin" ? (
                    <button className="btn-action btn-outline-danger w-100">DELETE</button>
                  ) : (
                    <button 
                      onClick={() => addToCart(product._id)}
                      disabled={processingId === product._id || product.stock < 1}
                      className="btn-action btn-blue w-100"
                    >
                      {processingId === product._id ? 'SYNCING...' : (product.stock < 1 ? 'UNAVAILABLE' : 'ADD TO ORDER')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* Color Variables */
        :root {
          --navy: #001f3f;
          --bright-blue: #007bff;
          --light-blue-gray: #e9ecef;
        }

        .text-navy { color: var(--navy); }
        .tracking-tight { letter-spacing: -1.5px; }
        .ls-2 { letter-spacing: 2px; }
        .border-light-blue { border-color: var(--light-blue-gray) !important; }

        .product-cell {
          transition: all 0.3s ease;
        }

        .product-cell:hover {
          background-color: #f0f7ff;
          box-shadow: inset 0 0 20px rgba(0, 123, 255, 0.05);
        }

        .badge-blue {
          background: #e7f3ff;
          color: var(--bright-blue);
          padding: 4px 10px;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 1px;
          border-radius: 4px;
        }

        .btn-action {
          border: 1px solid var(--navy);
          padding: 14px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 1px;
          transition: all 0.2s ease;
          text-transform: uppercase;
        }

        .btn-blue {
          background: var(--navy);
          color: #fff;
        }

        .btn-blue:hover:not(:disabled) {
          background: var(--bright-blue);
          border-color: var(--bright-blue);
          transform: translateY(-2px);
        }

        .btn-blue:disabled {
          background: #ccc;
          border-color: #ccc;
          color: #fff;
          cursor: not-allowed;
        }

        .lh-lg { line-height: 1.8; }
      `}</style>
    </div>
  );
}