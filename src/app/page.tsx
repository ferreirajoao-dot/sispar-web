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
import govbr from "@images/govbr.png"

import "@/styles/home.scss";

export default function Home() {
    return (
        <div>
            <>
                {/* hero area start */}
                <section
                    className="hero-area hero-space-5 bg-top-center pt-180"

                    style={{
                        background: 'linear-gradient(148deg, rgba(0,152,76,0.21332282913165268) 16%, rgba(0,152,76,0.76234243697479) 46%, rgba(0,44,117,1) 90%)'}}
                >
                    <div className="hero-area fix">
                        <div className="container">
                            <div className="sasup-banner-content-5 text-center">
                                <h3 className="sasup-banner-title-5" data-wow-delay=".6s">
                                    Sistema Integrado de <br/>
                                     <span>Parcerias</span>
                                </h3>
                                <div className="sasup-banner-list-5 mb-40">
                                    <ul>
                                        <li className="bdevs-el-subtitle">
                                            <i className="fal fa-check"/> Gratuíto
                                        </li>
                                        <li className="bdevs-el-subtitle">
                                            <i className="fal fa-check"/> 100% Digital
                                        </li>
                                        <li className="bdevs-el-subtitle">
                                            <i className="fal fa-check"/> Rápido e Fácil
                                        </li>
                                    </ul>
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
                                    <h5 className="sasup-section-heading-5-subtitle">Credenciamento Online</h5>
                                    <h3 className="sasup-section-heading-5-title" data-wow-delay=".2s">
                                        Saiba mais sobre o
                                        <br/> <span className={'text-primary'}>SISPAR</span> e seu Objetivo
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-6">
                                <div className="sasup-service-box-5 mb-30 text-center wow fadeInUp">
                                    <div className="sasup-service-icon-5 icon">
                                        <i className="fal fa-lock"/>
                                    </div>
                                    <div className="sasup-service-content-5">
                                        <h3 className="sasup-service-content-title-5">
                                            <Link href="#">Acesso Seguro</Link>
                                        </h3>
                                        <p className="sasup-service-content">
                                            O acesso ao SISPAR é realizado via login Gov.br, garantindo segurança e autenticidade de cada usuário.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6">
                                <div className="sasup-service-box-5 mb-30 text-center wow fadeInUp"
                                     data-wow-delay=".6s"
                                >
                                    <div className="sasup-service-icon-5 icon">
                                        <i className="fal fa-cloud"/>
                                    </div>
                                    <div className="sasup-service-content-5">
                                        <h3 className="sasup-service-content-title-5">
                                            <Link href="#">Credenciamento Digital</Link>
                                        </h3>
                                        <p className="sasup-service-content">
                                            Simplificamos o processo de envio de documentação, sem necessidade de formulários físicos ou deslocamento.
                                        </p>

                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6">
                                <div className="sasup-service-box-5 mb-30 text-center wow fadeInUp" data-wow-delay=".8s">
                                    <div className="sasup-service-icon-5 icon">
                                        <i className="fal fa-file-search"/>
                                    </div>
                                    <div className="sasup-service-content-5">
                                        <h3 className="sasup-service-content-title-5">
                                            <Link href="#">Acompanhamento Online</Link>
                                        </h3>
                                        <p className="sasup-service-content">
                                            Todo o processo pode ser acompanhado de forma digital e em tempo real.
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
                                        <h5 className="sasup-section-heading-5-subtitle">Agilidade</h5>
                                        <h3 className="sasup-section-heading-5-title">
                                            Uma Iniciativa para Acelerar Parcerias
                                            <br/>
                                            com <span>ONGs e Parceiros</span>
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
                                Sistema gratuito, seguro e feito pelo Estado para apoiar ONGs em suas missões

                            </h5>
                            <p className="sasup-feature-content-desc-2">
                                O SISPAR é uma iniciativa inovadora do Estado, que busca promover a inclusão e a eficiência na parceria com ONGs
                            </p>
                            <Link className="sasup-theme-started-btn" href="#">
                                Começar
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
                                        Passo a Passo
                                    </h5>
                                    <h3 className="sasup-section-heading-5-title" data-wow-delay=".2s">
                                        Veja como é fácil e
                                        <br/>
                                        <span>Rápido</span> fazer o seu credenciamento.
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
                                                    Acesso Seguro com
                                                    <br/>
                                                    <Image src={govbr} alt={'as'} className={'h-35px w-auto'}/>
                                                </h4>
                                                <p className="sasup-timeline-item-single-right-desc-1">
                                                    Para acessar o SISPAR, é necessário fazer login através da plataforma Gov.br, garantindo que todas as informações e usuários sejam autenticados com segurança.
                                                </p>
                                            </div>
                                            <Link
                                                className="sasup-gray-bordered-btn-1 text_btn"
                                                href="#"
                                            >
                                                Entrar Agora
                                            </Link>
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
                                                    Cadastro da
                                                    Organização
                                                </h4>
                                                <p className="sasup-timeline-item-single-right-desc-1">
                                                    Após o login, é necessário cadastrar a organização. Insira as informações básicas da ONG ou do parceiro, garantindo que o sistema tenha os dados corretos para análise.
                                                </p>
                                                <div className="sasup-timeline-item-list-wrap-1 mb-30">

                                                <ul>
                                                    <li>
                                                        <div className="sasup-timeline-single-list-item-1">
                                                            <div className="sasup-timeline-single-list-item-icon-1">
                                                                <i className="fas fa-file-check"/>
                                                            </div>
                                                            <div
                                                                className="sasup-timeline-single-list-item-content-1">
                                                                <h4 className="sasup-timeline-single-list-item-title-1">
                                                                    Somente o básico
                                                                </h4>
                                                                <p className="sasup-timeline-single-list-item-desc-1">
                                                                    No cadastro de sua organização nós só pedimos as informações necessárias para o seu credenciamento.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </div>
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
                                                    Envio de Documentação
                                                </h4>
                                                <p className="sasup-timeline-item-single-right-desc-1">
                                                    Agora, é só enviar os documentos exigidos diretamente pela plataforma SISPAR. Todos os arquivos enviados são armazenados com segurança e podem ser revisados antes do envio final.
                                                </p>
                                                <div className="sasup-timeline-item-list-wrap-1 mb-30">
                                                    <ul>
                                                        <li>
                                                            <div className="sasup-timeline-single-list-item-1">
                                                                <div className="sasup-timeline-single-list-item-icon-1">
                                                                    <i className="fas fa-cloud"/>
                                                                </div>
                                                                <div
                                                                    className="sasup-timeline-single-list-item-content-1">
                                                                    <h4 className="sasup-timeline-single-list-item-title-1">
                                                                        Tudo online
                                                                    </h4>
                                                                    <p className="sasup-timeline-single-list-item-desc-1">
                                                                        É só ter a imagem do documento ou PDF, e enviar pela plataforma
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
                                <span className="sasup-timeline-item-single-count">4</span>
                                <div className="row">
                                    <div className="col-xxl-6 col-xl-6 col-lg-6">
                                        <div className="sasup-timeline-item-single-right-1 wow fadeInUp">
                                            <div className="sasup-timeline-item-single-right-content-1">
                                                <h4 className="sasup-timeline-item-single-right-title-1">
                                                    Análise e Aprovação dos Documentos
                                                </h4>
                                                <p className="sasup-timeline-item-single-right-desc-1">
                                                    Após o envio, os documentos são encaminhados para análise e curadoria das informações. Acompanhe o progresso de cada etapa, com notificações automáticas para cada atualização de status.
                                                </p>
                                                <div className="sasup-timeline-item-list-wrap-1 mb-30">
                                                    <ul>
                                                        <li>
                                                            <div className="sasup-timeline-single-list-item-1">
                                                                <div className="sasup-timeline-single-list-item-icon-1">
                                                                    <i className="fas fa-fast-forward"/>
                                                                </div>
                                                                <div
                                                                    className="sasup-timeline-single-list-item-content-1">
                                                                    <h4 className="sasup-timeline-single-list-item-title-1">
                                                                        Análise em até 3h
                                                                    </h4>
                                                                    <p className="sasup-timeline-single-list-item-desc-1">
                                                                        Nossa equipe está disponível para atendimento imediato após o envio dos documentos.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="sasup-timeline-single-list-item-1">
                                                                <div
                                                                    className="sasup-timeline-single-list-item-icon-1 ">
                                                                    <i className="fas fa-eye"/>
                                                                </div>
                                                                <div
                                                                    className="sasup-timeline-single-list-item-content-1">
                                                                    <h4 className="sasup-timeline-single-list-item-title-1">
                                                                        Acompanhamento em tempo Real
                                                                    </h4>
                                                                    <p className="sasup-timeline-single-list-item-desc-1">
                                                                        Acompanhe seu pedido Online e em tempo real sem necessidade de deslocamenteo
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
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
                    </div>
                </section>

                <section className="advanced-service-area sasup-bg-gray-1 pt-115 pb-115 p-rel d-none">
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
                                        Vamos começar?
                                        <br/> Faça <span>seu </span>
                                        credenciamento agora.
                                    </h3>
                                    <div className="sasup-cta-action-wrapper-5">
                                        <Link className="sasup-cta-action-link-5" href="#">
                                            Começar
                                        </Link>
                                        <Link className="sasup-cta-action-transparent-link-5" href="#">
                                            Saiba Mais
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
