import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import *as actions from "../../../store/actions"
import { LANGUAGES } from '../../../utils';
class outstandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctor: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctor !== this.props.topDoctor) {
            this.setState({
                arrDoctor: this.props.topDoctor
            })
        }
    }
    componentDidMount() {
        this.props.loadTopDoctor()
    }


    render() {
        let allDoctors = this.state.arrDoctor
        let { language } = this.props
        // allDoctors = allDoctors.concat(allDoctors).concat(allDoctors)
        console.log(allDoctors)
        return (
            <div className='section-share outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>
                            <FormattedMessage id={"homepage.outSanding-doctor"} />
                        </span>
                        <button className='btn-section'>
                            <FormattedMessage id={"homepage.search"} />
                        </button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>

                            {allDoctors && allDoctors.length > 0 && allDoctors.map((item, index) => {
                                let imageBase64 = ''
                                if (item.image) {
                                    imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                }
                                let nameVi = `${item.positionData.valueVi} , ${item.lastName} ${item.firstName} `
                                let nameEn = `${item.positionData.valueEn} , ${item.lastName} ${item.firstName} `
                                return (
                                    <div className='section-customize' key={index}>
                                        <div className='outer-bg'>
                                            <div className='bg-image outstanding-doctor'
                                                style={{ backgroundImage: `url(${imageBase64})` }}
                                            />
                                        </div>
                                        <div className='position text-center'>
                                            <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                            <div>Cơ xương khớp</div>
                                        </div>
                                    </div>
                                )

                            })}
                        </Slider>
                    </div>

                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctor: state.admin.topDoctor,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(outstandingDoctor);
