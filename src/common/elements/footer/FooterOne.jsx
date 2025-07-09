import Image from 'next/image';
import Link from "next/link";

const FooterOne = () => {
  return (
    <div className="axil-footer-area axil-footer-style-1 footer-variation-2">
      <div className="footer-mainmenu">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="footer-widget">
                <h2 className="title">Guideline</h2>
                <div className="inner">
                  <ul className="ft-menu-list">
                    <li>
                      <Link href="#">
                      Hướng dẫn đăng nhập
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                      Hướng dẫn đăng ký giải đua
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                      Cập nhật kết quả giải đua từ Strava
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                      Hướng dẫn thanh toán
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                      Câu hỏi thường gặp
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="footer-widget">
                <h2 className="title">About</h2>
                <div className="inner">
                  <ul className="ft-menu-list">
                    <li>
                      <Link href="/account/dashboard">
                        Thông tin tài khoản
                      </Link>
                    </li>
                    <li>
                      <Link href="/clubs">
                      Câu lạc bộ
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                      Photo
                      </Link>
                    </li>
                    <li>
                      <Link href="/category/blog">
                        Blog - Tin tức
                      </Link>
                    </li>
                    <li>
                      <Link href="/events">
                      Sự kiện đang diễn ra
                      </Link>
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
                    src={"/images/logo/amrace-logo.png"}
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
                    <Link href="/page/lien-he">
                          <span data-text="Contact Us">Liên hệ</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/page/chinh-sach-bao-mat-thong-tin">
                          <span data-text="Privacy Policy">Chính sách bảo mật thông tin</span>
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
