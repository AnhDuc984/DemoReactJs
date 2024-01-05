import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";

class Handbook extends Component {

    render() {

        return (
            <div className='section-share handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cẩm nang</span>
                        <button className='btn-section'>Xem Thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.section}>
                        <div className='section-customize d-flex'>
                                <div className="bg-image handbook" />
                                <div>Top 7 địa chỉ khám nhi uy tín Quận 7</div>
                        </div>
                        <div className='section-customize'>
                                <div className="bg-image handbook" />
                                <div>Top 7 địa chỉ khám nhi uy tín Quận 7</div>
                        </div>
                        <div className='section-customize'>
                                <div className="bg-image handbook" />
                                <div>Top 7 địa chỉ khám nhi uy tín Quận 7</div>
                        </div>
                        <div className='section-customize'>
                                <div className="bg-image handbook" />
                                <div>Top 7 địa chỉ khám nhi uy tín Quận 7</div>
                        </div>
                        </Slider>
                    </div>

                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
