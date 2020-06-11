import React, { Component } from 'react';

import Head from 'next/head';


import Header from 'src/components/layouts/header';
import Footer from 'src/components/layouts/footer';

import Page from 'react-page-loading'



class Layout extends Component {
    render() {
        return (
            <React.Fragment>

                <Head>
                    <meta name="robots" content="noindex" />
                </Head>

                <Header />
                <Page loader={"bubble"} color={"#A9A9A9"} size={4}>
                    { this.props.children }
                </Page>

                <Footer />

            </React.Fragment>
        )
    }
}

export default Layout;