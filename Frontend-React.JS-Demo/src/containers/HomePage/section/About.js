import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
class About extends Component {

    render() {

        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền thông nói về Nguyễn Anh Đức
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400px"
                            src="https://www.youtube.com/embed/WpR5Vkd7cXw"
                            title="Nguyen Anh Duc -2019600984"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen>
                        </iframe>
                    </div>
                    <div className='content-right'>
                        <p>
                        Thật ra vào mùa nào Hà Nội cũng chỉ như thế, không phải vì vào mùa thu thì lung linh hơn. Điều khiến 
                        cho mùa thu Hà Nội trở nên đặc biệt, chính là vì cái không khí dần trở nên mát mẻ sau một mùa hè oi, 
                        là nét lãng mạn cũng tự dưng dâng lên nhiều hơn trong từng ngõ ngách, và quan trọng nhất là Hà Nội vào
                         mùa lá vàng cho người ta rất nhiều cảm xúc cũng như vấn vương, cứ đúng đến thời điểm này lại muốn về Hà Nội. 
                        Chính những điều ấy mới làm cho Hà Nội vô cùng đặc biệt vào những lúc tháng 9, tháng 10 như thế này.
                        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
