import React from 'react'
import Header from './Header';
import Footer from './Footer';

export default function Feature() {
  return (
<>
<Header/>
<div className="container-fluid bg-primary feature py-5 pb-lg-0 my-5">
        <div className="container py-5 pb-lg-0">
          <div className="mx-auto text-center mb-3 pb-2" style={{ maxWidth: '500px' }}>
            <h6 className="text-uppercase text-secondary">Features</h6>
            <h1 className="display-5 text-white">Why Choose Us!!!</h1>
          </div>
          <div className="row g-5">
            <div className="col-lg-3">
              <FeatureCard
                icon="fa-seedling"
                title="100% Organic"
                description="Honey production is a rewarding and environmentally beneficial agricultural venture"
              />
              <FeatureCard
                icon="fa-award"
                title="Award Winning"
                description="Running an agrifarm business and managing production is a multifaceted endeavor"
              />
            </div>
            <div className="col-lg-6">
              <div className="d-block bg-white h-100 text-center p-5 pb-lg-0">
                <p>
                Organic farming is one of the highly profitable agri-business ideas due to the surging demand for organic produce. Consumers are increasingly seeking healthier and environmentally friendly food options, leading to a willingness to pay a premium for organic fruits, vegetables, and herbs. 
                </p>
                <img className="img-fluid" src="/img/feature.png" alt="Feature" />
              </div>
            </div>
            <div className="col-lg-3">
              <FeatureCard
                icon="fa-tractor"
                title="Modern Farming"
                description="Starting a vertical farming business is a forward-thinking venture that combines technology with sustainable agriculture"
              />
              <FeatureCard
                icon="fa-phone-alt"
                title="24/7 Support"
                description="India's abundant food grain production faces a storage challenge."
              />
            </div>
          </div>
        </div>
      </div>
      <Footer/>
</> 
 )
}

function FeatureCard({ icon, title, description }) {
    return (
      <div className="text-white mb-5">
        <div
          className="bg-secondary rounded-pill d-flex align-items-center justify-content-center mb-3"
          style={{ width: '60px', height: '60px' }}
        >
          <i className={`fa ${icon} fs-4 text-white`}></i>
        </div>
        <h4 className="text-white">{title}</h4>
        <p className="mb-0">{description}</p>
      </div>
    );
  }