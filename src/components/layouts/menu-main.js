import React, { Component } from 'react';
import Link from 'next/link';
import { client } from 'src/utils/client';
import { connect } from 'react-redux';

class MenuMain extends Component {
    constructor(props) {
        super(props)

        this.state = {
            menuMobile: false,
            menuList: [],
            urlName: ''
        }
    }

    toggleMenuMobile = () => {
      this.setState ({
        menuMobile: !this.state.menuMobile
      })
    }

    componentDidMount () {
      const urlPath = window.location.pathname.split('/');
      const urlSplit = urlPath[1]
      const urlName = urlSplit;

      this.setState({
        urlName: urlName
      });
    }

    render() {

      const menuVis = this.state.menuMobile ? 'show' : '';
      const iconClose = this.state.menuMobile ? 'clicked' : '';
      
      return (
          <nav className='menu-tab'>
              <div className='container'>
                <div className={`tab-mobile ${iconClose}`} onClick={this.toggleMenuMobile}></div>
                <ul className={menuVis}>
                  {
                    this.props.menuNav.map((item, i) => {
                      return (
                        <li key={i}>
                          <Link href={'/'+item.url}>
                            <a className={item.url===this.state.urlName ? 'active' : ''}>{this.props.webLang === 'en' ? item.name1 : item.name2 }</a>
                          </Link>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
          </nav> 
        )
    }
}

const mapStateToProps = (state) => {
  return {
    webLang: state.langReducer.lang,
    menuNav: state.menuReducer.menuNavs
  }
}


export default connect(mapStateToProps)(MenuMain);