import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader'
import Specialty from './section/Specialty';
import MedicalFacility from './section/medicalFacility';
import OutstandingDoctor from './section/outstandingDoctor';
import Handbook from './section/handbook';
import About from './section/About';
import HomeFooter from './section/HomeFooter';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Homepage.scss'

class homePage extends Component {
    render() {
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        const section = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 2,
        }
        return (
            <div>
                 <HomeHeader />
                <Specialty settings = {settings} />
                <MedicalFacility settings = {settings} />
                <OutstandingDoctor settings = {settings} />
                <Handbook section= {section} />
                <About />
                <HomeFooter />
            </div>
           
        );
    }
}
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps )(homePage);
