import React from 'react';
import './Product.css'
export default function Products() {
  return (
    <>
      <div className="container-fluid py-5">
        <div className="container">
          <div className="mx-auto text-center mb-5" style={{ maxWidth: '500px' }}>
            <h6 className="text-primary text-uppercase">Products</h6>
            <h1 className="display-5">Our Fresh & Organic Products</h1>
          </div>
          <div className="product-carousel px-5" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
            <div className="pb-5" style={{ display: 'inline-block', width: 'calc(100% / 4 - 30px)', marginRight: '30px' }}>
              <div className="product-item position-relative bg-white d-flex flex-column text-center">
                <img className="img-fluid mb-4" src="img/product-1.png" alt=""/>
                <h6 className="mb-3">Organic Vegetable</h6>
                <h5 className="text-primary mb-0">₹ 199.00</h5>
                <div className="btn-action d-flex justify-content-center">
                  <a className="btn bg-primary py-2 px-3" href="#"><i className="bi bi-cart text-white"></i></a>
                  <a className="btn bg-secondary py-2 px-3" href="#"><i className="bi bi-eye text-white"></i></a>
                </div>
              </div>
            </div>
            <div className="pb-5" style={{ display: 'inline-block', width: 'calc(100% / 4 - 30px)', marginRight: '30px' }}>
              <div className="product-item position-relative bg-white d-flex flex-column text-center">
                <img className="img-fluid mb-4" src="img/product-2.png" alt=""/>
                <h6 className="mb-3">Organic Vegetable</h6>
                <h5 className="text-primary mb-0">₹ 1599.00</h5>
                <div className="btn-action d-flex justify-content-center">
                  <a className="btn bg-primary py-2 px-3" href="#"><i className="bi bi-cart text-white"></i></a>
                  <a className="btn bg-secondary py-2 px-3" href="#"><i className="bi bi-eye text-white"></i></a>
                </div>
              </div>
            </div>
            <div className="pb-5" style={{ display: 'inline-block', width: 'calc(100% / 4 - 30px)', marginRight: '30px' }}>
              <div className="product-item position-relative bg-white d-flex flex-column text-center">
                <img className="img-fluid mb-4" src="img/product-1.png" alt=""/>
                <h6 className="mb-3">Organic Vegetable</h6>
                <h5 className="text-primary mb-0">	₹ 59.00</h5>
                <div className="btn-action d-flex justify-content-center">
                  <a className="btn bg-primary py-2 px-3" href="#"><i className="bi bi-cart text-white"></i></a>
                  <a className="btn bg-secondary py-2 px-3" href="#"><i className="bi bi-eye text-white"></i></a>
                </div>
              </div>
            </div>
            <div className="pb-5" style={{ display: 'inline-block', width: 'calc(100% / 4 - 30px)', marginRight: '30px' }}>
              <div className="product-item position-relative bg-white d-flex flex-column text-center">
                <img className="img-fluid mb-4" src="img/product-2.png" alt=""/>
                <h6 className="mb-3">Organic Vegetable</h6>
                <h5 className="text-primary mb-0"> ₹ 195.00</h5>
                <div className="btn-action d-flex justify-content-center">
                  <a className="btn bg-primary py-2 px-3" href="#"><i className="bi bi-cart text-white"></i></a>
                  <a className="btn bg-secondary py-2 px-3" href="#"><i className="bi bi-eye text-white"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
