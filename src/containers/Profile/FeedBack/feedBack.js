import React,{Component} from 'react';
import'./feedBack.less'
import HeadTitle from "../HeadTitle/headtitle";
export default class FeedBack extends Component{
    render(){
        return (
            <div className="feedBack">
            <HeadTitle title={"意见反馈"}/>
                <form>
                    <div className="feedBack-content">反馈内容（必填）：</div>
                    <textarea placeholder="乐意聆听您对聚美触屏版的意见或建议!">
                    </textarea>
                    <div className="feedBack-content">联系方式(选填)：</div>
                    <input placeholder="手机号或邮箱(选填)!">
                    </input>
                    <input type="submit" className="submit"/>
                </form>
            </div>
        )
    }
}
