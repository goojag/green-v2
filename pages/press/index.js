
import React, { Component } from 'react';
import Layout from 'src/components/layouts';
import Head from 'next/head';
import Link from 'next/link';
import { client } from 'src/utils/client';
import { connect } from 'react-redux';

import MenuMain from 'src/components/layouts/menu-main';

class Press extends Component {

  static async getInitialProps (ctx) {

    const initProps = {
      clientList: [],
      imgPath: []
    }

    const clientData = await client.get('press.php');

    initProps.imgPath = clientData.data.image_url;
    initProps.clientList = clientData.data.content;

    return initProps;
  }

  listPress = () => {
    return (
      this.props.clientList.map((item, i) => {
        return (
          <li key={i}>
            <Link href='/press/[id]' as={'/press/'+item.id}>
              <a target='_blank'>
                <div className='press-thumb'><img src={this.props.imgPath+item.picture1} /></div>
              </a>
            </Link>
          </li>
        )
      })
    )
  }

  render() {

    const {
      menuList,
      webLang
    } = this.props;
    
    
    return (
      <React.Fragment>
          
        <Head>
          <title>Press</title>
        </Head>

        <Layout>
            
          <MenuMain />

          <div className='container'>
            <ul className='press-list'>
              <this.listPress />
            </ul>
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