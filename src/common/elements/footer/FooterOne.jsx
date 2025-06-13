import Image from 'next/image';
import Link from "next/link";

const FooterOne = () => {
  if (typeof window !== "undefined") {
    var colorMode = window.localStorage.getItem('color-mode');
  }

  return (
    <div className="axil-footer-area axil-footer-style-1 footer-variation-2">
      <div className="footer-mainmenu">
        <div className="container">
          <div className="row">
            <div className="col-lg-2 col-md-6 col-sm-6 col-12">
              <div className="footer-widget">
                <h2 className="title">World</h2>
                <div className="inner">
                  <ul className="ft-menu-list">
                    <li>
                      U.N.
                    </li>
                    <li>
                      Conflicts
                    </li>
                    <li>
                      Terrorism
                    </li>
                    <li>
                      Disasters
                    </li>
                    <li>
                      Global Economy
                    </li>
                    <li>
                      Environment
                    </li>
                    <li>
                      Religion
                    </li>
                    <li>
                      Scandals
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6 col-12">
              <div className="footer-widget">
                <h2 className="title">Politics</h2>
                <div className="inner">
                  <ul className="ft-menu-list">
                    <li>
                      Executive
                    </li>
                    <li>
                      Senate
                    </li>
                    <li>
                      House
                    </li>
                    <li>
                      Judiciary
                    </li>
                    <li>
                      Global Economy
                    </li>
                    <li>
                      Foreign policy
                    </li>
                    <li>
                      Polls
                    </li>
                    <li>
                      Elections
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6 col-12">
              <div className="footer-widget">
                <h2 className="title">Entertainment</h2>
                <div className="inner">
                  <ul className="ft-menu-list">
                    <li>
                      Celebrity News
                    </li>
                    <li>
                      Movies
                    </li>
                    <li>
                      TV News
                    </li>
                    <li>
                      Disasters
                    </li>
                    <li>
                      Music News
                    </li>
                    <li>
                      Environment
                    </li>
                    <li>
                      Style News
                    </li>
                    <li>
                      Entertainment Video
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6 col-12">
              <div className="footer-widget">
                <h2 className="title">Business</h2>
                <div className="inner">
                  <ul className="ft-menu-list">
                    <li>
                      Environment
                    </li>
                    <li>
                      Conflicts
                    </li>
                    <li>
                      Terrorism
                    </li>
                    <li>
                      Disasters
                    </li>
                    <li>
                      Global Economy
                    </li>
                    <li>
                      Environment
                    </li>
                    <li>
                      Religion
                    </li>
                    <li>
                      Scandals
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6 col-12">
              <div className="footer-widget">
                <h2 className="title">Health</h2>
                <div className="inner">
                  <ul className="ft-menu-list">
                    <li>
                      Movies
                    </li>
                    <li>
                      Conflicts
                    </li>
                    <li>
                      Terrorism
                    </li>
                    <li>
                      Disasters
                    </li>
                    <li>
                      Global Economy
                    </li>
                    <li>
                      Environment
                    </li>
                    <li>
                      Religion
                    </li>
                    <li>
                      Scandals
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6 col-12">
              <div className="footer-widget">
                <h2 className="title">About</h2>
                <div className="inner">
                  <ul className="ft-menu-list">
                    <li>
                      U.N.
                    </li>
                    <li>
                      Conflicts
                    </li>
                    <li>
                      Terrorism
                    </li>
                    <li>
                      Disasters
                    </li>
                    <li>
                      Global Economy
                    </li>
                    <li>
                      Environment
                    </li>
                    <li>
                      Religion
                    </li>
                    <li>
                      Scandals
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Start Footer Top Area  */}
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4">
              <div className="logo">
              <Link href="/">

                  <Image
                    className="dark-logo"
                    src={colorMode === "Dark" ? "/images/logo/logo-white2.webp" : "/images/logo/logo-black.webp"}
                    alt="Logo Images"
                    height={37}
                    width={141}
                  />

                </Link>
              </div>
            </div>
            <div className="col-lg-8 col-md-8">
              {/* Start Post List  */}
              <div className="d-flex justify-content-start mt_sm--15 justify-content-md-end align-items-center flex-wrap">
                <h5 className="follow-title mb--0 mr--20">Follow Us</h5>

              </div>
              {/* End Post List  */}
            </div>
          </div>
        </div>
      </div>
      {/* End Footer Top Area  */}
      {/* Start Copyright Area  */}
      <div className="copyright-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-9 col-md-8">
              <div className="copyright-left">
                <ul className="mainmenu justify-content-start">
                  <li>
                    <Link href="/about">

                        <span className="hover-flip-item">
                          <span data-text="Contact Us">Contact Us</span>
                        </span>

                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">

                        <span className="hover-flip-item">
                          <span data-text="Privacy Policy">Privacy Policy</span>
                        </span>

                    </Link>
                  </li>
                  <li>
                    <Link href="#">

                        <span className="hover-flip-item">
                          <span data-text="AdChoices">AdChoices</span>
                        </span>

                    </Link>
                  </li>
                  <li>
                    <Link href="#">

                        <span className="hover-flip-item">
                          <span data-text="Advertise with Us">
                            Advertise with Us
                          </span>
                        </span>

                    </Link>
                  </li>
                  <li>
                    <Link href="#">

                        <span className="hover-flip-item">
                          <span data-text="Blogar Store">Blogar Store</span>
                        </span>

                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="copyright-right text-start text-md-end mt_sm--20">
                <p className="b3">
                  All Rights Reserved © {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Copyright Area  */}
    </div>
  );
};

export default FooterOne;
