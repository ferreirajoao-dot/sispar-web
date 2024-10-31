import hero from "@images/shape/hero-bg-2.webp"
import line from "@images/shape/line.webp"
import Link from "next/link"
import Image from "next/image"
import shape_1 from "@images/shape/feature_bg_shape_1.webp";
import shape_2 from "@images/shape/feature_bg_shape_2.webp";
import shape_3 from "@images/shape/feature_bg_shape_3.webp";
import shape_4 from "@images/shape/feature_bg_shape_4.webp";
import shape_5 from "@images/shape/feature_bg_shape_5.webp";
import shape_6 from "@images/shape/feature_bg_shape_6.webp";
import shape_8 from "@images/shape/feature_bg_shape_8.webp";

import feature_1 from "@images/shape/features-2-1-1.webp"
import feature_2 from "@images/shape/features-2-2.webp"
import feature_3 from "@images/shape/features-2-3.webp"
import feature_4 from "@images/shape/features-2-4.webp"
import feature_5 from "@images/shape/features-2-5.webp"
import feature_6 from "@images/shape/features-2-6.webp"
import feature_7 from "@images/shape/features-2-7.webp"

import timeline_1 from "@images/timeline/timeline-1.webp"
import timeline_2 from "@images/timeline/timeline-2.webp"
import timeline_3 from "@images/timeline/timeline-3.webp"
import timeline_hero_1 from "@images/hero/hero-3.webp"

import circle_line_right from "@images/shape/circle_line_right.webp"
import circle_line_left from "@images/shape/circle_line_left.webp"

import feature_outside_shape_2 from "@images/shape/feature_outside_shape_2.webp"
import feature_outside_shape_3 from "@images/shape/feature_outside_shape_3.webp"
import feature_outside_shape_4 from "@images/shape/feature_outside_shape_4.webp"
import feature_outside_shape_5 from "@images/shape/feature_outside_shape_5.webp"

import shape_feature from "@images/shape/shape_feature.webp"

export default function Home() {
    return (
        <div>
            <>
                {/* hero area start */}
                <section
                    className="hero-area hero-space-5 bg-top-center pt-180"

                    style={{backgroundImage: `url(${hero.src})`}}
                >
                    <div className="hero-area fix">
                        <div className="container">
                            <div className="sasup-banner-content-5 text-center">
                                <h3 className="sasup-banner-title-5" data-wow-delay=".6s">
                                    Advanced Analytics to
                                    <br/>
                                    Grow your <span>Business</span>
                                </h3>
                                <div className="sasup-banner-list-5 mb-40">
                                    <ul>
                                        <li className="bdevs-el-subtitle">
                                            <i className="fal fa-check"/> Next-gen tect features
                                        </li>
                                        <li className="bdevs-el-subtitle">
                                            <i className="fal fa-check"/> 99% customer satisfaction
                                        </li>
                                        <li className="bdevs-el-subtitle">
                                            <i className="fal fa-check"/> Over 500k costomers
                                        </li>
                                    </ul>
                                </div>
                                <div className="sasup-banner-action-btn-5 mb-60">
                                    <Link className="sasup-black-theme-btn-5" href="#">
                                        Start your 14-day FREE trial
                                    </Link>
                                </div>
                                <div className="sasup-hero-image-group-5 group-image">
                                    <div className="sasup-hero-image-group-item-5-1">
                                        <Image
                                            src={timeline_hero_1}
                                            alt="hero image not found"
                                        />
                                    </div>
                                    <div className="sasup-hero-image-group-item-5-2">
                                        <Image
                                            src={timeline_2}
                                            alt="hero image not found"
                                        />
                                    </div>
                                    <div className="sasup-hero-image-group-item-5-3">
                                        <Image
                                            src={timeline_2}
                                            alt="hero image not found"
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="service-area pb-85 pt-85 fix">
                    <div className="container">
                        <div className="row mb-40">
                            <div className="col-xxl-12">
                                <div className="sasup-section-heading-5 wow fadeInRight" data-wow-delay=".4s">
                                    <h5 className="sasup-section-heading-5-subtitle">Our Services</h5>
                                    <h3 className="sasup-section-heading-5-title" data-wow-delay=".2s">
                                        Browse our set of banking
                                        <br/> <span>Services</span> and Offerings
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-6">
                                <div className="sasup-service-box-5 mb-30 text-center wow fadeInUp">
                                    <div className="sasup-service-icon-5 icon">
                                        <i className="fal fa-heart"/>
                                    </div>
                                    <div className="sasup-service-content-5">
                                        <h3 className="sasup-service-content-title-5">
                                            <Link href="#">Powerful Analytics</Link>
                                        </h3>
                                        <p className="sasup-service-content">
                                            Grow your business with an online store that lets you sell to
                                            anyone small business global.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6">
                                <div className="sasup-service-box-5 mb-30 text-center wow fadeInUp"
                                     data-wow-delay=".6s"
                                >
                                    <div className="sasup-service-icon-5 icon">
                                        <i className="fal fa-book-open"/>
                                    </div>
                                    <div className="sasup-service-content-5">
                                        <h3 className="sasup-service-content-title-5">
                                            <Link href="#">Powerful Analytics</Link>
                                        </h3>
                                        <p className="sasup-service-content">
                                            Grow your business with an online store that lets you sell to
                                            anyone small business global.
                                        </p>

                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6">
                                <div className="sasup-service-box-5 mb-30 text-center wow fadeInUp" data-wow-delay=".8s">
                                    <div className="sasup-service-icon-5 icon">
                                        <i className="fal fa-lightbulb"/>
                                    </div>
                                    <div className="sasup-service-content-5">
                                        <h3 className="sasup-service-content-title-5">
                                            <Link href="#">Complete Dashboard</Link>
                                        </h3>
                                        <p className="sasup-service-content">
                                            Grow your business with an online store that lets you sell to
                                            anyone small business global.
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="features-area fix sasup-bg-gray-1 pt-115 pb-115 p-rel">
                    <div className="sasup-feature-area-section-shape-group-2">
                        <div className="sasup-feature-area-single-section-shape-1">
                            <Image src={shape_1}
                                   alt="image not found"
                            />
                        </div>
                        <div className="sasup-feature-area-single-section-shape-2">
                            <Image src={shape_2}
                                   alt="image not found"
                            />
                        </div>
                        <div className="sasup-feature-area-single-section-shape-3">
                            <Image src={shape_5}
                                   alt="image not found"
                            />
                        </div>
                    </div>
                    <div className="container text-center p-rel">
                        <div className="sasup-feature-container-inner-shape-group-2">
                            <div className="sasup-feature-container-single-shape-1">
                                <Image src={shape_4}
                                       alt="image not found"
                                />
                            </div>
                            <div className="sasup-feature-container-single-shape-2">
                                <Image src={shape_6}
                                       alt="image not found"
                                />
                            </div>
                            <div className="sasup-feature-container-single-shape-3">
                                <Image src={shape_3}
                                       alt="image not found"
                                />
                            </div>
                            <div className="sasup-feature-container-single-shape-4">
                                <Image src={shape_8}
                                       alt="image not found"
                                />
                            </div>
                        </div>
                        <div className="row mb-25">
                            <div className="col-xxl-12">
                                <div className="section-heading wow fadeInUp" data-wow-delay=".3s">
                                    <div className="sasup-section-heading-5 text-center">
                                        <h5 className="sasup-section-heading-5-subtitle">Our Fratures</h5>
                                        <h3 className="sasup-section-heading-5-title">
                                            Powerful dashboard to
                                            <br/>
                                            Capture all your <span>Live</span> Data
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sasup-image-features-dashbord-img-parent-wrap-2">
                            <div className="sasup-image-features-dashbord-img-wrap-2">
                                <div className="sasup-feature-single-dashbord-img-1">
                                    <Image src={feature_1}
                                           alt="image not found"
                                    />
                                </div>
                                <div className="features-circle-shape-group">
                                    <div className="sasup-feature-single-dashbord-img-2">
                                        <Image src={feature_2}
                                               alt="image not found"
                                        />
                                    </div>
                                    <div className="sasup-feature-single-dashbord-img-3">
                                        <Image src={feature_3}
                                               alt="image not found"
                                        />

                                    </div>
                                    <div className="sasup-feature-single-dashbord-img-4">
                                        <Image src={feature_4}
                                               alt="image not found"
                                        />
                                    </div>
                                    <div className="sasup-feature-single-dashbord-img-5">
                                        <Image src={feature_5}
                                               alt="image not found"
                                        />
                                    </div>
                                    <div className="sasup-feature-single-dashbord-img-6">
                                        <Image src={feature_6}
                                               alt="image not found"
                                        />
                                    </div>
                                    <div className="sasup-feature-single-dashbord-img-7">
                                        <Image src={feature_7}
                                               alt="image not found"
                                        />
                                    </div>
                                </div>
                                <div className="sasup-feature-circle-line-shape-2">
                                    <div className="sasup-single-features-line-shape-inner-left">
                                        <Image src={circle_line_left}
                                               alt="image not found"
                                        />
                                    </div>
                                    <div className="sasup-single-features-line-shape-inner-right">
                                        <Image src={circle_line_right}
                                               alt="image not found"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sasup-feature-content-wrap-2 text-center">
                            <h5 className="sasup-feature-content-title-2">
                                Join 160,000+ small businesses like yours
                            </h5>
                            <p className="sasup-feature-content-desc-2">
                                Create your business. Sign up now.
                            </p>
                            <Link className="sasup-theme-started-btn" href="#">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </section>
                {/* features area end */}
                {/* advanced features area start */}
                <section className="advanced-features-area pt-115 pb-115">
                    <div className="container">
                        <div className="row">
                            <div className="col-xxl-12">
                                <div className="sasup-section-heading-5 text-center mb-70 wow fadeInUp" data-wow-delay=".4s">
                                    <h5 className="sasup-section-heading-5-subtitle">
                                        Advanced Features
                                    </h5>
                                    <h3 className="sasup-section-heading-5-title" data-wow-delay=".2s">
                                        Purpose built for leading tech
                                        <br/>
                                        <span>Business</span> &amp; Products.
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="sasup-timeline-wrap-1 sasup-timeline-num-0">
                            <div className="sasup-timeline-item-single-1 active">
                                <span className="sasup-timeline-item-single-count active">1</span>
                                <div className="row">
                                    <div className="col-xxl-6 col-xl-6 col-lg-6">
                                        <div className="sasup-timeline-item-single-left-1 wow fadeInUp">
                                            <div className="sasup-timeline-item-single-img-1">
                                                <Image src={timeline_1}
                                                       alt="image not found"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-6 col-xl-6 col-lg-6">
                                        <div className="sasup-timeline-item-single-right-1 wow fadeInUp" data-wow-delay=".6s">
                                            <div className="sasup-timeline-item-single-right-content-1">
                                                <h4 className="sasup-timeline-item-single-right-title-1">
                                                    We know your
                                                    <br/>
                                                    Problem &amp; Solution
                                                </h4>
                                                <p className="sasup-timeline-item-single-right-desc-1">
                                                    Grow your business with an anyone small business global.
                                                </p>
                                                <div className="sasup-timeline-item-list-wrap-1 mb-30">
                                                    <ul>
                                                        <li>
                                                            <div className="sasup-timeline-single-list-item-1">
                                                                <div className="sasup-timeline-single-list-item-icon-1">
                                                                    <i className="fab fa-telegram-plane"/>
                                                                </div>
                                                                <div
                                                                    className="sasup-timeline-single-list-item-content-1">
                                                                    <h4 className="sasup-timeline-single-list-item-title-1">
                                                                        Fast
                                                                    </h4>
                                                                    <p className="sasup-timeline-single-list-item-desc-1">
                                                                        Lorem ipsum dolor sit amet consec adipiscing
                                                                        elit
                                                                        sed do eiusmod.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="sasup-timeline-single-list-item-1">
                                                                <div
                                                                    className="sasup-timeline-single-list-item-icon-1 ">
                                                                    <i className="fas fa-chart-pie"/>
                                                                </div>
                                                                <div
                                                                    className="sasup-timeline-single-list-item-content-1">
                                                                    <h4 className="sasup-timeline-single-list-item-title-1">
                                                                        Secure
                                                                    </h4>
                                                                    <p className="sasup-timeline-single-list-item-desc-1">
                                                                        ipsum dolor sit amet consec adipiscing elit sed
                                                                        do
                                                                        eiusmod.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sasup-timeline-wrap-1 sasup-timeline-wrap-pos-reverce sasup-timeline-num-1">
                            <div className="sasup-timeline-item-single-1">
                                <span className="sasup-timeline-item-single-count">2</span>
                                <div className="row">
                                    <div className="col-xxl-6 col-xl-6 col-lg-6">
                                        <div className="sasup-timeline-item-single-right-1 wow fadeInUp">
                                            <div className="sasup-timeline-item-single-right-content-1">
                                                <h4 className="sasup-timeline-item-single-right-title-1">
                                                    Collaborate and
                                                    <br/>
                                                    Plan your Campaign
                                                </h4>
                                                <p className="sasup-timeline-item-single-right-desc-1">
                                                    Lorem ipsum dolor sit back amet, consectetura adipiscing
                                                    elit, sedia doi eiusmod temporary incidita dunt buntut
                                                    labore et dolore magna aliqua. Uterus denim ad minim veniam.
                                                </p>
                                                <Link
                                                    className="sasup-gray-bordered-btn-1 text_btn"
                                                    href="#"
                                                >
                                                    Learn More
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-6 col-xl-6 col-lg-6">
                                        <div className="sasup-timeline-item-single-left-1 wow fadeInUp" data-wow-delay=".6s">
                                            <div className="sasup-timeline-item-single-img-1">
                                                <Image src={timeline_1}
                                                       alt="image not found"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sasup-timeline-wrap-1 sasup-timeline-num-2">
                            <div className="sasup-timeline-item-single-1 ">
                                <span className="sasup-timeline-item-single-count ">3</span>
                                <div className="row">
                                    <div className="col-xxl-6 col-xl-6 col-lg-6">
                                        <div className="sasup-timeline-item-single-left-1 wow fadeInUp" data-wow-delay=".4s">
                                            <div className="sasup-timeline-item-single-img-1">
                                                <Image src={timeline_1}
                                                       alt="image not found"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-6 col-xl-6 col-lg-6">
                                        <div className="sasup-timeline-item-single-right-1 wow fadeInUp" data-wow-delay=".5s">
                                            <div className="sasup-timeline-item-single-right-content-1">
                                                <h4 className="sasup-timeline-item-single-right-title-1">
                                                    Wasting Time
                                                    <br/> On Google Analytics
                                                </h4>
                                                <p className="sasup-timeline-item-single-right-desc-1">
                                                    Grow your business with an anyone small business global.
                                                </p>
                                                <div className="sasup-timeline-item-list-wrap-1 mb-30">
                                                    <ul>
                                                        <li>
                                                            <div className="sasup-timeline-single-list-item-1">
                                                                <div className="sasup-timeline-single-list-item-icon-1">
                                                                    <i className="fas fa-pen"/>
                                                                </div>
                                                                <div
                                                                    className="sasup-timeline-single-list-item-content-1">
                                                                    <h4 className="sasup-timeline-single-list-item-title-1">
                                                                        Easily written codes
                                                                    </h4>
                                                                    <p className="sasup-timeline-single-list-item-desc-1">
                                                                        Lorem ipsum dolor sit amet consec adipiscing
                                                                        elit
                                                                        sed do eiusmod.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="sasup-timeline-single-list-item-1">
                                                                <div
                                                                    className="sasup-timeline-single-list-item-icon-1 ">
                                                                    <i className="fas fa-layer-group"/>
                                                                </div>
                                                                <div
                                                                    className="sasup-timeline-single-list-item-content-1">
                                                                    <h4 className="sasup-timeline-single-list-item-title-1">
                                                                        See the action in live
                                                                    </h4>
                                                                    <p className="sasup-timeline-single-list-item-desc-1">
                                                                        Lorem ipsum dolor sit amet consec adipiscing
                                                                        elit
                                                                        sed do eiusmod.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="advanced-service-area sasup-bg-gray-1 pt-115 pb-115 p-rel">
                    <div className="sasup-feature-shape-group-1">
                        <div className="outlside-shape-1">
                            <Image
                                src={feature_outside_shape_2}
                                alt="image not found"
                            />
                        </div>
                        <div className="outlside-shape-2">
                            <Image
                                src={feature_outside_shape_3}
                                alt="image not found"
                            />
                        </div>
                        <div className="outlside-shape-3">
                            <Image
                                src={feature_outside_shape_4}
                                alt="image not found"
                            />
                        </div>
                        <div className="outlside-shape-4">
                            <Image
                                src={feature_outside_shape_5}
                                alt="image not found"
                            />
                        </div>
                    </div>
                    <div className="container">
                        <div className="row mb-25">
                            <div className="col-xxl-12">
                                <div className="section-heading">
                                    <div className="sasup-section-heading-5 text-center wow fadeInUp" data-wow-delay=".3s">
                                        <h5 className="sasup-section-heading-5-subtitle">
                                            Advanced Service
                                        </h5>
                                        <h3 className="sasup-section-heading-5-title">
                                            Get insights that help your
                                            <br/>
                                            <span>Business</span> Grow
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sasup-feature-list-wrape-1">
                            <div className="row align-items-center">
                                <div className="col-xxl-7 col-xl-7 col-lg-6 mb-40 mb-lg-0">
                                    <div className="sasup-feature-list-thumb-wrap">
                                        <div className="sasup-feature-list-bg">
                                            <Image
                                                src={timeline_1}
                                                alt="image not found"
                                            />
                                        </div>
                                        <div className="sasup-feature-shape-group-2">
                                            <div className="sasup-feature-img-shape">
                                                <Image
                                                    src={shape_feature}
                                                    alt="image not found"
                                                />
                                            </div>
                                            <div className="sasup-feature-img-shape-1">
                                                <Image src={shape_3}
                                                       alt="image not found"
                                                />
                                            </div>
                                            <div className="sasup-feature-img-shape-2">
                                                <Image src={shape_2}
                                                       alt="image not found"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-5 col-xl-5 col-lg-6">
                                    <div className="sasup-feature-list-right-content">
                                        <ul>
                                            <li>
                                                <Link href="#" className="">
                                                        <span className="left-img">
                                                          <i className="fas fa-layer-group"/>{" "}
                                                        </span>
                                                    <span className="content ">Complete Dashboar</span>{" "}
                                                    <span className="arrow">
                                                      <i className="fal fa-angle-right"/>
                                                    </span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" className="">
                                                    <span className="left-img">
                                                      <i className="fal fa-shopping-bag"/>{" "}
                                                    </span>{" "}
                                                    <span className="content ">Sasup Integrations</span>{" "}
                                                    <span className="arrow">
                                                  <i className="fal fa-angle-right"/>
                                                </span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" className="">
                                                    <span className="left-img">
                                                      <i className="fal fa-lightbulb"/>{" "}
                                                    </span>
                                                    <span className="content">Free to Get Started</span>{" "}
                                                    <span className="arrow">
                                                      <i className="fal fa-angle-right"/>
                                                    </span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" className="">
                                                    <span className="left-img">
                                                      <i className="far fa-chart-bar"/>{" "}
                                                    </span>{" "}
                                                    <span className="content ">Powerful Analytics</span>{" "}
                                                    <span className="arrow">
                                                  <i className="fal fa-angle-right"/>
                                                </span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="cta-area mt-100 ">
                    <div className="container">
                        <div className="row">
                            <div className="col-xxl-12">
                                <div className="sasup-cta-content-5">
                                    <h3 className="sasup-cta-title-5">
                                        Ready to dive in?
                                        <br/> Start your <span>Free</span>
                                        trial today.
                                    </h3>
                                    <div className="sasup-cta-action-wrapper-5">
                                        <Link className="sasup-cta-action-link-5" href="#">
                                            Get Started
                                        </Link>
                                        <Link className="sasup-cta-action-transparent-link-5" href="#">
                                            Learn More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* cta area end */}
            </>

        </div>
    );
}
