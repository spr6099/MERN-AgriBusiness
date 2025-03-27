import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Products from './Products';
import About from './About';
import Feature from './Feature';
import Team from './Team';
import CountUp from 'react-countup';

export default function Landing() {
  return (
    <>
      <Header />
      <div className="container-fluid p-0">
        <div id="header-carousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="w-100" src="img/carousel-1.jpg" alt="Image" />
              <div className="carousel-caption top-0 bottom-0 start-0 end-0 d-flex flex-column align-items-center justify-content-center">
                <div className="text-start p-5" style={{ maxWidth: '900px' }}>
                  <h3 className="text-white">Organic Vegetables</h3>
                  <h1 className="display-1 text-white mb-md-4">Organic Vegetables For Healthy Life</h1>
                  <a href="#" className="btn btn-success py-md-3 px-md-5">Explore</a>
                  <a href="#" className="btn btn-secondary py-md-3 px-md-5">Contact</a>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img className="w-100" src="img/carousel-2.jpg" alt="Image" />
              <div className="carousel-caption top-0 bottom-0 start-0 end-0 d-flex flex-column align-items-center justify-content-center">
                <div className="text-start p-5" style={{ maxWidth: '900px' }}>
                  <h3 className="text-white">Organic Fruits</h3>
                  <h1 className="display-1 text-white mb-md-4">Organic Fruits For Better Health</h1>
                  <a href="#" className="btn btn-success py-md-3 px-md-5">Explore</a>
                  <a href="#" className="btn btn-secondary py-md-3 px-md-5">Contact</a>
                </div>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#header-carousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#header-carousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
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
              <p className="mb-4">Agriculture in India is a booming industry. With a wide range of sectors to choose from, everyone can reap astounding profits. But choosing the right sector is extremely important as the one chosen must align perfectly with one’s skill level and ambitions. So let’s look at the most profitable farming in India.</p>
              <div className="row gx-5 gy-4">
                <div className="col-sm-6">
                  <i className="fa fa-seedling display-1 text-secondary"></i>
                  <h4>100% Organic</h4>
                  <p className="mb-0">The adoption of the health-centered lifestyle among the middle and high-class citizens of India elevated the demand for healthy, pesticide-free, chemical-free agricultural produce. This led to the re-emergence of organic farming, which was nearly abandoned during the onset of the green revolution, making organic farming the most profitable farming in India.  </p>
                </div>
                <div className="col-sm-6">
                  <i className="fa fa-award display-1 text-secondary"></i>
                  <h4>Award Winning</h4>
                  <p className="mb-0">Organic farming involves the production of crops without using synthetic chemical fertilizers or pesticides and Genetically Modified Organisms (GMOs). The total costs and the total returns earned depend on the type of crops chosen, the area of production, and the certification process.</p>
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
      <Products />
      {/* <Feature/> */}
      <Team/>
      <Footer />
    </>
  );
}
