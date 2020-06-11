
import React, { Component } from 'react';
import Layout from 'src/components/layouts';
import Head from 'next/head';
import Link from 'next/link';
import { client } from 'src/utils/client'; 
import { connect } from 'react-redux';

import IndexSlide from 'src/components/sections/index-slide';

class Index extends Component {

  static async getInitialProps (ctx) {
    
    const initProps = {
      dataHome:[],
      dataSlide: [],
      dataNumber: [],
      dataBrochure: [],
      dataOurmission: [],
      dataProject: []
    } 


    const dataHome = await client.get('index.php');

    initProps.dataHome = dataHome.data;
    initProps.dataSlide = dataHome.data.banner;
    initProps.dataNumber = dataHome.data.number;
    initProps.dataBrochure = dataHome.data.brochure;
    initProps.dataOurmission = dataHome.data.our_mission;
    initProps.dataProject = dataHome.data.our_project;

    

    return initProps;

  }

  render() {

    const {
      dataHome,
      dataNumber,
      dataBrochure,
      dataOurmission,
      dataProject,
      webLang
    } = this.props
    
    

    return (
      <React.Fragment>

        <Head>
          <title>Home Page</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        </Head>

        <Layout>
          <div className='container'>

          {/* <div className='test'>{this.props.webLang}</div> */}

            <IndexSlide data={dataHome}/>

            <section className='about-experience'>
              <div className='row'>
                <div className='left col-6 text-right'>
                  <strong>{dataNumber.list2[0]}</strong>
                  {/* <span>{webLang==='en' ? 'Years Experience' : '多年經驗'}</span> */}
                  <span>{webLang==='en' ? 'Years' : '年'}</span>
                </div>
                <div className='right col-6 text-left'>
                  <strong>{dataNumber.list2[1]}</strong>
                  <span>{webLang==='en' ? 'Projects' : '專案'}</span>
                </div>
              </div>
            </section>

            <Link href={dataHome.image_url+dataBrochure.file1}><a target='_blank' className='btn1 btn-download'>{webLang==='en' ? 'Download BROCHURE' : '下載手冊'}</a></Link>

            <section className='our-mission'>
              <div className='left'>
                <div className='box-center'>
                  <span dangerouslySetInnerHTML={webLang==='en' ? {__html: dataOurmission.name1} : {__html: dataOurmission.name2}} />
                  <span dangerouslySetInnerHTML={webLang==='en' ? {__html: dataOurmission.detail1} : {__html: dataOurmission.detail2}} />
                </div>
              </div>

              <div className='right'>
                <img src={dataHome.image_url+dataOurmission.picture1} alt='' />
              </div>
            </section>

            <section className='home-project'>
              <div className='left'>
                <Link href='/projects/all'>
                  <a><img src={dataHome.image_url+dataProject.picture1} alt='' /></a>
                </Link>
              </div>
              <div className='right'>
                  <div className='box-center'>
                    <strong dangerouslySetInnerHTML={webLang==='en' ? {__html: dataProject.name1} : {__html: dataProject.name2}} />
                    <span dangerouslySetInnerHTML={webLang==='en' ? {__html: dataProject.detail1} : {__html: dataProject.detail2}} />
                  </div>
                </div>
            </section>

            <section className='home-ouroffice'>
              <div className='left'>
              <div className='box-center'>
                  <strong dangerouslySetInnerHTML={webLang==='en' ? {__html: dataHome.contact.name1} : {__html: dataHome.contact.name2}} />
                  <span dangerouslySetInnerHTML={webLang==='en' ? {__html: dataHome.contact.detail1} : {__html: dataHome.contact.detail2}} />
                </div>
              </div>
              <div className='right'>
                <div className='home-map'>
                  {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.4828461715097!2d100.61980881534379!3d13.749730490348732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d61f4045f7429%3A0xe43732d417e12b50!2sGreen%20Architects%20Co.%2C%20Ltd.!5e0!3m2!1sth!2sth!4v1587704030029!5m2!1sth!2sth" width="600" height="450" frameBorder="0" allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe> */}

                  <Link href='/contact'>
                    <a><img src={webLang==='en' ? '/images/en-map.jpg' : '/images/cn-map.jpg'} alt='' /></a>
                  </Link>
                </div>
              </div>
            </section>
              
          </div>
        </Layout>

      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    webLang: state.langReducer.lang
  }
}

export default connect(mapStateToProps)(Index);