import Image from 'next/image';
import Link from 'next/link';
import HeadTitle from "../common/elements/head/HeadTitle";

const Maintenance = () => {

    return (
        <>

            <HeadTitle pageTitle="Coming Soon"/>
            <div className="maintanence-area">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="order-2 order-lg-1 col-lg-6 mt_md--40 mt_sm--40">
                            <div className="content">
                                <div className="logo">
                                    <Link href="/">

                                            <Image
                                                className="dark-logo"
                                                width={153}
                                                height={40}
                                                src={"/images/logo/amrace-logo.png"}
                                                alt="AM Race"
                                            />

                                    </Link>
                                </div>
                                <h1 className="title">This project is under construction</h1>
                                <h5>Subscribe to our weekly newsletter</h5>
                                <p>No spam, notifications only about news products, updates.</p>
                                <div className="inner d-flex align-items-center flex-wrap">
                                    <h5 className="follow-title mb--0 mr--20">Follow Us</h5>

                                </div>
                                <form action="#" className="subscription-form">
                                    <div className="form-group">
                                        <input type="text" name="subscription-email" placeholder="Enter your email" />
                                        <button className="axil-button button-rounded"><span>Subscribe</span></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="order-1 order-lg-2 col-lg-5 offset-lg-1">
                            <div className="thumbnail">
                            <Image
                                width={495}
                                height={480}
                                src="/images/others/maintenence.webp"
                                alt="Coming Soon"
                            />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Maintenance;
