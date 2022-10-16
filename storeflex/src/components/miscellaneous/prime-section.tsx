import React from 'react';
const imgUrl = "assets/images/header/04.jpg";
const PrimeSection = () => {
  return (
    <>
      <section id="hero-area" className="header-area header-ten">
        <div className="verticle-lines">
          <div className="vlines one"></div>
          <div className="vlines two"></div>
          <div className="vlines three"></div>
          <div className="vlines four"></div>
        </div>
        <div className="header-inner">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 co-12">
                <div className="home-slider">
                  <div className="header-text align-items-center">
                    <h1>
                      We are making world a<br />
                      Better place for you.
                    </h1>
                    <h6>LET’S FIND WAREHOUSE YOU ARE LOOKING FOR</h6>
                    <div className="form-group">
                      <input className="input-search-size form-control" name="name" type="text" placeholder="Enter Pin or City" style={{ height: '8vh' }} />
                    </div>
                    <div className="light-rounded-buttons float-end">
                      <a href="javascript:void(0)" className="btn primary-btn-outline"> Start Search </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-12">
                <div className="header-image" style={{ background: 'url(' + imgUrl + ')', float: 'right', height: '500px', width: '500px', display: 'block' }}>
                  <img className="shape3" src="assets/images/header/shape3.png" alt="#" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default PrimeSection;