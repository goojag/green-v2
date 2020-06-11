
import React, { Component } from 'react';
import Layout from 'src/components/layouts';
import Head from 'next/head';
import Link from 'next/link';
import { client } from 'src/utils/client';
import { connect } from 'react-redux';

import MenuMain from 'src/components/layouts/menu-main';
import SectionJobForm from 'src/components/sections/section-job-form';

class Client extends Component {

  static async getInitialProps (ctx) {
    const pathList = ctx.asPath.split('?')[0].split('/');
    const id = pathList[2];

    if(id === '') {
      var jobID = '1'
    } else{
      var jobID = pathList[2]
    }

    const initProps = {
      jobId: jobID,
      menuList: [],
      jobList: [],
      jobDetail: [],
      imgPath: []
    }
    
    const jobRes = await client.get('joblist.php');
    
    const jobDetail = await client.get('job_detail.php?job_id='+jobID);
    
    
    initProps.imgPath = jobRes.data.image_url;
    initProps.jobList = jobRes.data.job;
    initProps.jobDetail = jobDetail.data.job_detail;

    return initProps;
  }


  render() {

    const {
      jobDetail,
      webLang
    } = this.props;
    
    return (
      
      <React.Fragment>
          
        <Head>
          <title>{webLang==='en' ? 'Join Us' :'参加しませんか' }</title>
        </Head>

        <Layout>
         
          <div className='page-joinus'>

            <MenuMain />

            <div className='container'>
              <div className='row py-5'>
                <div className='col-md-4'>
                  <div className='job-left'>
                    <h3>Position</h3>
                    <ul>
                      {
                        this.props.jobList.map((item, i)=>{
                          return (
                            <li key={i} id={item.id}>
                              <Link href='/joinus/[id]' as={'/joinus/'+item.id}>
                                <a>{webLang==='en' ? item.name1 : item.name2}</a>
                              </Link>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </div>
                </div>

                <div className='col-md-8'>
                  <div className='job-right'>
                    <h1 className='job-h'>{webLang==='en' ? jobDetail.name1 : jobDetail.name2}</h1>
                    <section className='job-detail'dangerouslySetInnerHTML={webLang==='en' ? {__html: jobDetail.detail1} : {__html: jobDetail.detail2}} />

                    <SectionJobForm dataDetail={jobDetail} />
                  </div>
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
    webLang: state.langReducer.lang
  }
}

export default connect(mapInitialToProps)(Client);