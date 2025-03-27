import React from 'react';
import CountUp from 'react-countup';
import Header from './Header';
import Footer from './Footer';

export default function About() {
  return (
    <>
    <Header/>
      <div className="container-fluid about pt-5">
        <div className="container">
          <div className="row gx-5">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="d-flex h-100 border border-5 border-primary border-bottom-0 pt-4">
                <img className="img-fluid mt-auto mx-auto" src="img/about.png" alt="About Us" />
              </div>
            </div>
            <div className="col-lg-6 pb-5">
              <div className="mb-3 pb-2">
                <h6 className="text-primary text-uppercase">About Us</h6>
                <h1 className="display-5">We Produce Organic Food For Your Family</h1>
              </div>
              <p className="mb-4">There are more than 100 agriculture businesses that are growing rapidly these days but in this article we will talk about top 20 demanding agri businesses in India.</p>
              <div className="row gx-5 gy-4">
                <div className="col-sm-6">
                  <i className="fa fa-seedling display-1 text-secondary"></i>
                  <h4>100% Organic</h4>
                  <p className="mb-0">Agriculture is one of the most growing and demanding sectors in today’s era. There are more than 100 agriculture businesses that are growing rapidly these days. In this article, we will take you through the top 20 demanding agri businesses in India.</p>
                </div>
                <div className="col-sm-6">
                  <i className="fa fa-award display-1 text-secondary"></i>
                  <h4>Award Winning</h4>
                  <p className="mb-0">Some of these agriculture business can be done in less capital, while some may require huge capital investment. If you are looking for ​​a low cost agricultural business, then this guide is for you.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-primary facts py-5 mb-5">
        <div className="container py-5">
          <div className="row gx-5 gy-4">
            <div className="col-lg-3 col-md-6">
              <div className="d-flex">
                <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <i className="fa fa-star fs-4 text-white"></i>
                </div>
                <div className="ps-4">
                  <h5 className="text-white">Our Experience</h5>
                  <h1 className="display-5 text-white mb-0">
                    <CountUp end={12345} />
                  </h1>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex">
                <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <i className="fa fa-users fs-4 text-white"></i>
                </div>
                <div className="ps-4">
                  <h5 className="text-white">Farm Specialist</h5>
                  <h1 className="display-5 text-white mb-0">
                    <CountUp end={12345} />
                  </h1>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex">
                <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <i className="fa fa-check fs-4 text-white"></i>
                </div>
                <div className="ps-4">
                  <h5 className="text-white">Complete Project</h5>
                  <h1 className="display-5 text-white mb-0">
                    <CountUp end={12345} />
                  </h1>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex">
                <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <i className="fa fa-mug-hot fs-4 text-white"></i>
                </div>
                <div className="ps-4">
                  <h5 className="text-white">Happy Clients</h5>
                  <h1 className="display-5 text-white mb-0">
                    <CountUp end={12345} />
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
