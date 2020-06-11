
import React, { Component } from 'react';
import Layout from 'src/components/layouts';
import Head from 'next/head';
import { client } from 'src/utils/client';
import { connect } from 'react-redux';


class Press extends Component {

  static async getInitialProps (ctx) {
    const pathList = ctx.asPath.split('?')[0].split('/');
    const pressID = pathList[2];

    const initProps = {
      pressID: pressID,
      pressDetail: [],
      imgPath: []
    }

    const dataProjects = await client.get('press_detail.php?press_id='+pressID);

    initProps.imgPath = dataProjects.data.image_url;
    initProps.pressDetail = dataProjects.data;

    return initProps;
  }


  render() {
    

    const {
      webLang,
      imgPath,
      pressDetail
    } = this.props;
    
    console.log('press detail: ', pressDetail);
    

    return (
      <React.Fragment>
          
        <Head>
          <title>{ webLang==='en' ? pressDetail.press_detail.name1 : pressDetail.press_detail.name2 }</title>
        </Head>

        <Layout>

          {/* <nav className='breadcrumb'>
            <div className='container'>
              <span>{ webLang==='en' ? pressDetail.press_detail.name1 : pressDetail.press_detail.name2 }</span>
            </div>
          </nav> */}

          <div className='container'>
            
            <div className='press-detail-list py-4'>
              {
                pressDetail.gallery.map((item, i) => {
                  return (
                    <div key={i} className='w-100'><img className='w-100' src={imgPath+item.picture1} alt={pressDetail.press_detail.name1} /></div>
                  )
                })
              }
            </div>
          </div>
          
        </Layout>

      </React.Fragment>
    )
  }
}

const mapInitialToProps = (state) => {
  return {
    webLang: state
  }
}

export default connect(mapInitialToProps)(Press);