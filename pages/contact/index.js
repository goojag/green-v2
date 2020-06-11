
import React, { Component } from 'react';
import Layout from 'src/components/layouts';
import Head from 'next/head';
import Link from 'next/link';
import { client } from 'src/utils/client';
import { connect } from 'react-redux';

import MenuMain from 'src/components/layouts/menu-main';

class Contact extends Component {

  static async getInitialProps (ctx) {

    const initProps = {
      contactData: [],
      imgPath: []
    }

    const contactRes = await client.get('contact.php');

    initProps.imgPath = contactRes.data.image_url;
    initProps.contactData = contactRes.data;

    return initProps;
  }

  

  render() {

    const {
      contactData,
      webLang
    } = this.props;

    
    
    return (
      <React.Fragment>
          
        <Head>
          <title>Contact Us</title>
        </Head>

        <Layout>
         
          <div className='page-contact'>
            <MenuMain />

            <div className='container'>
              <div className='contact-map'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.4828461715097!2d100.61980881534379!3d13.749730490348732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d61f4045f7429%3A0xe43732d417e12b50!2sGreen%20Architects%20Co.%2C%20Ltd.!5e0!3m2!1sth!2sth!4v1587704030029!5m2!1sth!2sth" width="100%" height="450" frameBorder="0" allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
              </div>

              <div className='row'>
                <div className='col-md-4 mb-3'>
                  <section className='section-contact section-email'>
                    <p>E-mail :</p>
                    <p>{contactData.contact.contact_email}</p>
                  </section>
                </div>

                <div className='col-md-4 mb-3'>
                  <section className='section-contact  section-addr'>
                    <div dangerouslySetInnerHTML={{__html : contactData.contact.company_address}} />
                  </section>
                </div>

                <div className='col-md-4 mb-3'>
                  <section className='section-contact section-tel'>
                    <p>Tel :</p>
                    <p>{contactData.contact.phone}</p>
                  </section>
                </div>
              </div>
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

export default connect(mapInitialToProps)(Contact);