
import React, { Component } from 'react';
import Layout from 'src/components/layouts';
import Head from 'next/head';
import Link from 'next/link';
import { client } from 'src/utils/client';
import { connect } from 'react-redux';

import MenuMain from 'src/components/layouts/menu-main';

class About extends Component {

  static async getInitialProps (ctx) {

    const initProps = {
      aboutImg: [],
      imgPath: []
    }

    const aboutData = await client.get('about_us.php');

    initProps.imgPath = aboutData.data.image_url;
    initProps.aboutImg = aboutData.data.content;

    return initProps;
  }


  render() {

    const {
      webLang
    } = this.props;
    
    console.log(this.props.aboutImg);
    
    
    return (
      <React.Fragment>
          
        <Head>
          <title>About Us</title>
        </Head>

        <Layout>
            
          <MenuMain />
          
          <div className='container'>
            <div className='img-about py-4'>
              <img src={webLang === 'en' ? this.props.imgPath+this.props.aboutImg.picture1 : this.props.imgPath+this.props.aboutImg.picture2} className='w-100' alt='' />
            </div>
          </div>
        </Layout>

      </React.Fragment>
    )
  }
}

const mapInitialToProps = (state) => {
  return {
    webLang: state.langReducer.lang
  }
}

export default connect(mapInitialToProps)(About);