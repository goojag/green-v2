
import React, { Component } from 'react';
import Layout from 'src/components/layouts';
import Head from 'next/head';
import Link from 'next/link';
import { client } from 'src/utils/client';
import { connect } from 'react-redux';

import MenuMain from 'src/components/layouts/menu-main';

class Client extends Component {

  static async getInitialProps (ctx) {

    const initProps = {
      clientList: [],
      imgPath: []
    }

    const clientData = await client.get('clients.php');

    initProps.imgPath = clientData.data.image_url;
    initProps.clientList = clientData.data.content;

    return initProps;
  }

  listClient = () => {
    return (
      this.props.clientList.map((item, i) => {
        return (
          <li key={i}>
            <Link href=''>
              <a target='_blank'>
                <div className='client-thumb'><img src={this.props.imgPath+item.picture1} /></div>
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
          <title>Clients</title>
        </Head>

        <Layout>
            
          <MenuMain />

          <div className='container'>
            <ul className='client-list'>
              <this.listClient />
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

export default connect(mapInitialToProps)(Client);