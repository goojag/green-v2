
import React, { Component } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';


class Header extends Component {

  componentDidMount () {
    if ( Cookies.get('lang') === 'en' || Cookies.get('lang') === '' ||  !Cookies.get('lang')){
      Cookies.set('lang','en');
      this.props.dispatch({
        type: 'en',
        data: 'en'
      })
    }
  }
  
    enLan = () => {
      Cookies.set('lang','en');
      this.props.dispatch({
        type: 'en',
        data: Cookies.get('lang')
      })
    }

    cnLan = () => {
      Cookies.set('lang','cn');
      this.props.dispatch({
        type: 'cn',
        data: Cookies.get('lang')
      })
    }

    render() {

      const webLang = this.props.webLang;
    
      return (
          <React.Fragment>
            <header>
              <div className='container'>
                  <div className='logo'><Link href='/'><a><img src='/images/logo.svg' /></a></Link></div>
                  <nav className='main-menu'>
                      <Link href='/projects/[cid]' as='/projects/all'><a>{webLang==='en' ? 'Projects' : '專案'}</a></Link>
                      <Link href='/about'><a>{webLang==='en' ? 'The firm' : '該公司'}</a></Link>
                  </nav>

                  <div className='top-lan'>
                    
                      <button onClick={this.enLan}><img src='/images/icons/en_flag.png' alt='' /></button>
                      <button onClick={this.cnLan}><img src='/images/icons/cn_flag.png' alt='' /></button>
                  </div>
              </div>
            </header>
          </React.Fragment>
      )
    }
}

const mapStateToProps = state => {
  return {
    webLang: state.langReducer.lang
  }
}

export default connect(mapStateToProps)(Header);