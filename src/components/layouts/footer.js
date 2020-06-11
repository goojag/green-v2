
import { Component } from 'react';
import Link from 'next/link';
import { client } from 'src/utils/client';
import { connect } from 'react-redux';

class Footer extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        
        const {
            socialData
        } = this.props;
        

        return (
            <footer>
                <Link href='/'><a className='text-logo'><span>Green</span> Architects Co.,Ltd.</a></Link>
                <ul className='foot-social'>
                    <li><a target='_blank' href={socialData.config.pinterest_url} className='pintorest'></a></li>
                    <li><a target='_blank' href={socialData.config.facebook_url} className='facebook'></a></li>
                    <li><a target='_blank' href={socialData.config.instagram_url} className='ig'></a></li>
                    <li><a target='_blank' href={socialData.config.linkedin_url} className='in'></a></li>
                    <li><a target='_blank' href={socialData.config.youtube_url} className='youtube'></a></li>
                </ul>
            </footer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      socialData: state.socialReducer.socialData
    }
  }

export default connect(mapStateToProps)(Footer);  