
import React, { Component } from 'react';
import Slider from 'react-slick';
import Link from 'next/link';

class IndexSlide extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);    
    }
    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }
    

    renderSlide () {

      const image_url = this.props.data.image_url;
      const data = this.props.data;

      return (
        data.banner.map((slide, i) => {
          return (
            <div className='li' key={i}>
              <div className='thumb1'>
                <Link href={ slide.url }><a><img src={ image_url+slide.picture1 } /></a></Link>
              </div>
            </div>
          )
        })
      );
    }
    
    render() {
      
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
        };

        return (
            <section className='home-slide'>
                <Slider ref={c => (this.slider = c)} {...settings}>
                    { this.renderSlide() }
                </Slider> 

              <nav>
                  <button className="slide-prev" onClick={this.previous}>Prev</button>
                  <button className="slide-next" onClick={this.next}>Next</button>
              </nav>
            </section>
        );
    }
}

export default IndexSlide;
