
import React, { Component } from 'react';
import Layout from 'src/components/layouts';
import Head from 'next/head';
import { client } from 'src/utils/client';
import { connect } from 'react-redux';


class Projects extends Component {

  static async getInitialProps (ctx) {
    const pathList = ctx.asPath.split('?')[0].split('/');
    const catID = pathList[3];

    const initProps = {
      catName: catID,
      menuList: [],
      projectDetail: [],
      imgPath: []
    }

    const dataProjects = await client.get('project_detail.php?project_id='+catID);

    initProps.imgPath = dataProjects.data.image_url;
    initProps.projectDetail = dataProjects.data.project_detail;

    return initProps;
  }


  render() {
    

    const {
      webLang,
      projectDetail,
      imgPath
    } = this.props;
    

    return (
      <React.Fragment>
          
        <Head>
          <title>{ webLang==='en' ? projectDetail.name1 : projectDetail.name2 }</title>
        </Head>

        <Layout>

          {/* <nav className='breadcrumb'>
            <div className='container'>
              <span>{ webLang==='en' ? projectDetail.name1 : projectDetail.name2 }</span>
            </div>
          </nav> */}

          <div className='container'>
            
            <div className='project-detail-img'>
              <picture>
                <source media='(min-width:479px)' srcset={imgPath+projectDetail.picture3} />
                <img src={imgPath+projectDetail.picture4} alt="" />
              </picture>
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

export default connect(mapInitialToProps)(Projects);