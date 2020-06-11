import React, { Component } from 'react';
import Link from 'next/link';
import { client } from 'src/utils/client';
import { connect } from 'react-redux';

class MenuProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            menuMobile: false,
            menuList: []
        }
    }



    toggleMenuMobile = () => {
      this.setState ({
        menuMobile: !this.state.menuMobile
      })
    }

    render() {
      const menuVis = this.state.menuMobile ? 'show' : '';
      const iconClose = this.state.menuMobile ? 'clicked' : '';
      const { catID, webLang } = this.props;

      
      
      
      return (
          <nav className='menu-tab'>
              <div className='container'>
                <div className={`tab-mobile ${iconClose}`} onClick={this.toggleMenuMobile}></div>
                <ul className={menuVis}>
                  {
                    this.props.data.map((item, i) => {
                      return (
                        <li key={i}>
                          <Link href='/projects/[cid]' as={'/projects/'+item.id}>
                            {
                              item.id===catID ?
                                <a className='active'>{this.props.webLang === 'en' ? item.name1 : item.name2 }</a>
                              :
                              <a>{this.props.webLang === 'en' ? item.name1 : item.name2 }</a>
                            }
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
    webLang: state.langReducer.lang
  }
}


export default connect(mapStateToProps)(MenuProduct);