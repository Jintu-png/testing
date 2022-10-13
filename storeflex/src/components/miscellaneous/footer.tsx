import React from 'react';

const Footer = () => {
    return (
      <>
       {/* <!--====== FOOTER FIVE PART START ======--> */}

       <section className="footer-area footer-five">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="footer-top-content">
                <div className="footer-logo text-center">
                  <a href="javascript:;">
                  <img src="assets/images/white-logo.jpg" alt="Logo" />
                  </a>
                </div>
                {/* <!-- footer logo --> */}
                <p className="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum
                  has been. </p>
                <h5 className="text-center social-title">Follow Us On</h5>
                <ul className="social text-center mt-60">
                  <li>
                    <a href="javascript:void(0)"> <i className="lni lni-facebook-filled"></i> </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)"> <i className="lni lni-twitter-original"></i> </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)"> <i className="lni lni-instagram-filled"></i> </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)"><i className="lni lni-linkedin-original"></i></a>
                  </li>
                </ul>
                {/* <!-- social --> */}
              </div>
            </div>
          </div>
          {/* <!-- row --> */}
        </div>
        {/* <!-- container --> */}
        <div className="footer-copyright">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="copyright text-center">
                  <p className="text">Copyright © 2024 Storeflex. All Rights Reserved</p>
                </div>
                {/* <!--  copyright --> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!--====== FOOTER FIVE PART ENDS ======--> */}
      </>
    );
};
export default Footer;