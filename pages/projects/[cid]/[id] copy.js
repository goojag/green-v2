
import React, { Component } from 'react';
import Layout from 'src/components/layouts';
import Head from 'next/head';
import { client } from 'src/utils/client';
import { connect } from 'react-redux';
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";


class Projects extends Component {

  static async getInitialProps (ctx) {
    const pathList = ctx.asPath.split('?')[0].split('/');
    const catID = pathList[3];

    const initProps = {
      catName: catID,
      menuList: [],
      projectList: [],
      projectDetail: [],
      imgPath: []
    }

    const dataProjects = await client.get('project_detail.php?project_id='+catID);

    initProps.imgPath = dataProjects.data.image_url;
    initProps.projectList = dataProjects.data.gallery;
    initProps.projectDetail = dataProjects.data.project_detail;

    return initProps;
  }

  listProduct = () => {
    return (
      this.props.projectList.map((item, i) => {
        return (
          <LightgalleryItem key={i} src={this.props.imgPath+item.picture1} group="group1">
              <div className='thumb1'><img src={this.props.imgPath+item.picture1} /></div>
          </LightgalleryItem>
        )
      })
    )
  }

  render() {
    

    const {
      webLang,
      projectDetail
    } = this.props;
    

    return (
      <React.Fragment>
          
        <Head>
          <title>{ webLang==='en' ? projectDetail.name1 : projectDetail.name2 }</title>
          <link href='https://cdnjs.cloudflare.com/ajax/libs/lightgallery/1.7.0/css/lightgallery.min.css' rel='stylesheet' />
        </Head>

        <Layout>

          <nav className='breadcrumb'>
            <div className='container'>
              <span>{ webLang==='en' ? projectDetail.name1 : projectDetail.name2 }</span>
            </div>
          </nav>

          <div className='container'>
            
            <div className='project-detail-list'>
            <LightgalleryProvider>
              <this.listProduct />
            </LightgalleryProvider>
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