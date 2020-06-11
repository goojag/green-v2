
import React, { Component } from 'react';
import Layout from 'src/components/layouts';
import Head from 'next/head';
import Link from 'next/link';
import { client } from 'src/utils/client';
import { connect } from 'react-redux';

import MenuTap from 'src/components/layouts/menu-product';

class Projects extends Component {

  static async getInitialProps (ctx) {
    const pathList = ctx.asPath.split('?')[0].split('/');
    const catID = pathList[2];

    const initProps = {
      catID: catID,
      menuList: [],
      projectList: [],
      imgPath: []
    }

    const dataMenu = await client.get('category.php');
    const dataProjects = await client.get('project.php?category_id='+catID);
    

    initProps.menuList = dataMenu.data;
    initProps.imgPath = dataProjects.data.image_url;
    initProps.projectList = dataProjects.data.content;

    return initProps;
  }

  listProduct = () => {
    return (
      this.props.projectList.map((item, i) => {
        return (
          <li key={i}>
            <Link href='/projects/[cid]/[id]' as={'/projects/'+this.props.catID+'/'+item.id}>
              <a target='_blank'>
                <div className='thumb1'><img src={this.props.imgPath+item.picture1} /></div>
                <div className='list-text'>{this.props.webLang==='en' ? item.name1 : item.name2}</div>
              </a>
            </Link>
          </li>
        )
      })
    )
  }

  render() {

    const {
      menuList
    } = this.props;
    

    return (
      <React.Fragment>
          
        <Head>
          <title>Project List</title>
        </Head>

        <Layout>
            
          <MenuTap catID={this.props.catID} data={menuList}/>

          <div className='container'>
            {/* {this.props.catID} */}
              <ul className='product-list'>
                <this.listProduct />
              </ul>

              {/* <Link href=''><a className='btn-viewall'>View All</a></Link> */}
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