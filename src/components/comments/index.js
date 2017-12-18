import React, {Component} from 'react';
import './index.less'

export default class Comments extends Component {
    render() {
        return (
            <div className="userComments">
                <p className="userComments-title">卖过的人这样说</p>
                <ul className="userComments-lists">
                    {this.props.commentsData.message == '获取数据成功!' && this.props.commentsData.data.filterList.length > 0 ? this.props.commentsData.data.filterList.map((item, index) => {
                        return <li key={index} className="userComments-list">
                            <a href="" className="userComments-list-box">
                                <img className="userFace" src={item.face} alt=""/>
                                <img className="userVipImg" src={item.group_url} alt=""/>
                                <div className="userComment-box">
                                  <span className="userJumeiInfo">{item.title
                                  }&nbsp;{item.register_time}</span>
                                    {item.uname}
                                    <span className="user-autograph">{item.signature
                                    }
</span>
                                    <p className="userComments-msg">{item.comments}</p>
                                    <p className="userComments-imgLists">{item.img_paths.length > 0 ? item.img_paths.map((item, index) => {
                                        <img key={index} src={item} alt=""/>
                                    }) : null}
                                    </p>
                                    <div className="commodity-type">
                                        <span></span>
                                        <span className="commodity-type-text">{item.attribute}</span>
                                    </div>
                                    <p className="userComment-praise">
                                        <span className="praise-num">{item.like > 0 ? item.like : '赞'}</span>
                                        <span
                                            className="comments-num">{item.reply_num > 0 ? item.reply_num : '评论'}</span>
                                    </p>
                                </div>
                            </a>
                        </li>
                    }) : null}
                </ul>
                <a href="" className="userComments-more">
                    <span>查看全部{this.props.commentsData.row_count}条评价</span>
                </a>
            </div>
        )
    }
}                   