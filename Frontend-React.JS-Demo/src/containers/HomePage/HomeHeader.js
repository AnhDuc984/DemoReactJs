import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import logo from '../../assets/bookingcare-2020.svg'
import { FormattedMessage } from 'react-intl';
import {LANGUAGES} from "../../utils/constant"
import  {changeLanguageApp}  from '../../store/actions';
class HomeHeader extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    render() {
        let lang = this.props.language;
        console.log(this.props.userInfo)
        return (
            <React.Fragment>
                <div className='homeHeader-container'>
                    <div className='homeHeader-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                                <img className='header-logo' src={logo}/>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.speciality"/></b></div>
                                <div className='sub-title'><FormattedMessage id="home-header.search-doctor"/></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.facility"/></b></div>
                                <div className='sub-title'><FormattedMessage id="home-header.select-room"/></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.doctors"/></b></div>
                                <div className='sub-title'><FormattedMessage id="home-header.select-doctor"/></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.checkup-package"/></b></div>
                                <div className='sub-title'><FormattedMessage id="home-header.health-check"/></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className="fas fa-question-circle"></i>
                                Hỗ trợ
                            </div>
                            <div className ={lang === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={lang === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>
                <div className='homeHeader-banner'>
                    <div className='content-up'>
                        <div className='title1'>NỀN TẢNG Y TẾ</div>
                        <div className='title2'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <input type='text' placeholder='Tìm chuyên khoa khám bệnh' />
                        </div>
                    </div>
                    <div className='content-dow'>
                        <div className='option'>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i className="fas fa-hospital"></i>
                                </div>
                                <div className='text-child'>Khám chuyên khoa</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i className="fas fa-mobile-alt"></i>
                                </div>
                                <div className='text-child'>Khám từ xa</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i className="fas fa-clipboard-list"></i>
                                </div>
                                <div className='text-child'>Khám tổng quát</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i className="fas fa-vial"></i>
                                </div>
                                <div className='text-child'>Xét nghiệm y học</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i className="fas fa-user-plus"></i>
                                </div>
                                <div className='text-child'>Sức khỏe tinh thần</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i className="fas fa-toolbox"></i>
                                </div>
                                <div className='text-child'>Khám nha khoa</div>
                            </div>
                        </div>

                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo : state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux :(language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
