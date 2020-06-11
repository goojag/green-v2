
import React, { Component} from 'react';
// import { client } from 'src/utils/client';
// import axios from 'axios';
// import formData from 'form-data';

class sectionJobForm extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state= {
            popup: false
        }
      }

      myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
      }
    
      handleSubmit = (event) => {
        event.preventDefault();

        
        var myHeaders = new Headers();
        myHeaders.append(
            "Cookie", "__cfduid=d1c9d4f64f6ab52bf4cdd9632a9829e961589253854"
        );

        var formdata = new FormData();
        formdata.append("name", document.querySelector('input[name="name"]').value);
        formdata.append("surname", document.querySelector('input[name="surname"]').value);
        formdata.append("mobile", document.querySelector('input[name="mobile"]').value);
        formdata.append("email", document.querySelector('input[name="email"]').value);
        formdata.append("address", document.querySelector('textarea[name="address"]').value);
        formdata.append("file_resume", document.querySelector('input[name="file_resume"]').files[0],document.querySelector('input[name="file_resume"]').files[0].value);
        formdata.append("job_id", document.querySelector('input[name="job_id"]').value);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://green.bcj-media.com/api/job_save.php", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.status===true) {
                this.setState ({
                    popup: !this.state.popup
                })
            }
        })
        .catch(error => console.log('error', error));  
        
      }

      closePopup = () => {
        this.setState ({
            popup: !this.state.popup
        });
        document.getElementById('resume-form').reset();
      }



    render() {
        
        const {
            dataDetail
        } = this.props;
        const popUp = this.state.popup ? 'show' : '';
        const popUpTxt = this.state.popup ? 'success' : 'unsuccess';

        return (
            <section className='frm-job'>
                <form onSubmit={this.handleSubmit} encType="multipart/form-data" id='resume-form' action="">
                    <div className='row mb-3'>
                        <div className='col-md-6 mb-md-0 mb-3'><input type='text' className='text-box' name='name' placeholder='Name' onChange={this.myChangeHandler} required /></div>
                        <div className='col-md-6'><input type='text' className='text-box' name='surname' placeholder='Surname' onChange={this.myChangeHandler} required /></div>
                    </div>

                    <div className='row mb-3'>
                        <div className='col-md-6 mb-md-0 mb-3'><input type='tel' className='text-box' placeholder='Telephone' name='mobile' required /></div>
                        <div className='col-md-6'><input type='email' className='text-box' placeholder='E-Mail' onChange={this.myChangeHandler} name='email' required /></div>
                    </div>
 
                    <div className='row mb-3'>
                        <div className='col-md-12'>
                        <textarea placeholder='Address' name='address' onChange={this.myChangeHandler} required ></textarea>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-6'>
                            <input type='file' name='file_resume' className='frm-file' placeholder='Resume' onChange={this.myChangeHandler} required />
                        </div>
                        <div className='col-md-6'></div>
                    </div>

                    <input type='hidden' name='job_id' value={dataDetail.id} />

                    <button type='submit'>Apply</button>

                </form>

                <div className={`shadow ${popUp}`} onClick={this.closePopup}></div>
                <div className={`lightbox ${popUp}`}>
                    <div className={popUpTxt}><i></i>{popUpTxt}</div>
                </div>
            </section>
        );
    }
}

export default sectionJobForm;
