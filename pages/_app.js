
import BaseApp from 'next/app';
import { Provider } from 'react-redux';
import { makeStore } from 'src/store';
import withRedux from 'next-redux-wrapper';
import Head from 'next/head';

import {
  SET_MENU_DATA,
  SET_LANG,
  SET_SOCIAL_DATA
} from 'src/constants/reducers';
import { client } from 'src/utils/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'src/assets/scss/style.scss';

class App extends BaseApp {

  static async getInitialProps (appContext) {
    const appProps = await BaseApp.getInitialProps(appContext);
    
    const ctx = appContext.ctx;
    if (ctx.req) {
      const [menuNav,socialData] = await Promise.all([
        client.get('menu.php'),
        client.get('config.php')
      ]);

      ctx.store.dispatch({
        type: SET_MENU_DATA,
        payload: menuNav.data
      });

      ctx.store.dispatch({
        type: SET_SOCIAL_DATA,
        payload: socialData.data
      });
      
    }
    
    return {
      ...appProps
    };
  }
  

  render() {
    const {Component, pageProps, store} = this.props;

    <Head>
      <title>GreenArchitects</title>
    </Head>
    
    
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default withRedux(makeStore)(App);