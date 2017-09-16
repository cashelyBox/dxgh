import React,{Component} from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/index';
require('./sass/all.scss');
import {Route,Router,IndexRoute,hashHistory,browserHistory,Link} from 'react-router';
const store = createStore(reducer);

import {frontPayJssdk,url2obj} from './ajax.js';



//router

import Home from './components/home';
import Page from './components/common/page';
import Dates from './components/dates';
import Times from './components/times';
import Info from './components/info';
import InfoList from './components/infoList';
import CreateInfo from './components/createInfo';
import BindInfo from './components/bindInfo';
import PaySuccess from './components/paySuccess';
import History from './components/history';
import HistoryDetail from './components/historyDetail';
import {Button,Article} from 'react-weui';

class Routes extends Component {
	componentWillMount(){
		frontPayJssdk({
			url:encodeURIComponent(location.href.split('#')[0]),
			code:url2obj().code,
			callBack:(res)=>{
				wx.config({
				    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				    appId: res.datas.appID, // 必填，公众号的唯一标识
				    timestamp: res.datas.timestamp, // 必填，生成签名的时间戳
				    nonceStr: res.datas.nonceStr, // 必填，生成签名的随机串
				    signature: res.datas.signature, // 必填，签名，见附录1
				    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage','chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
				if(!!url2obj().page){
					hashHistory.replace('/'+url2obj().page);
				}
			}
		})
	}
	render(){
		return (
				<Provider store={store}>
					<Router history={hashHistory}>
						<Route path="/">
							<IndexRoute component={Notice}/>
							<Route path="home" component={Home}/>
							<Route path="dates/:kid" component={Dates}/>
							<Route path="times/:kid/:date/:did" component={Times}/>
							<Route path="info/:date/:time/:dname/:did/:kname/:kid/:prices" component={Info}/>
							<Route path="info/:date/:time/:dname/:did/:kname/:kid/:prices/:bid" component={Info}/>
							<Route path="infoList" component={InfoList}/>
							<Route path="createInfo" component={CreateInfo}/>
							<Route path="bindInfo" component={BindInfo}/>
							<Route path="paySuccess" component={PaySuccess}/>
							<Route path="history" component={History}>
								<Route path=":id" component={HistoryDetail}/>
							</Route>
						</Route>
					</Router>
				</Provider>
		)
	}
}
//注意事项
class Notice extends Component{
	render(){
		return(
			<Page>
				<Article>
					<h1>预约挂号温馨提示</h1>
					<p>1、预约挂号需要绑定个人实名信息。</p>
					<p>2、可以预约明天起7天内的号源。</p>
					<p>3、微信支付成功后进行预约，预约失败将进行退费，请以收到预约成功信息为准，如预约不成功，请自行选择其他途径预约。</p>
					<p>4、预约成功后，请于就诊当天，提前30分钟到门诊指定窗口登记就诊（预约患者需持预约时提供的有效证件）。如果需要挂号收费票据，请到门诊前台索取。</p>
					<p>5、取消预约：因故不能按时就诊的患者，请在就诊日前一天的24时以前取消预约，预约挂号当天病人取消预约，只能到人工窗口进行退费。</p>
					<p>在线挂号实行实名制，目前只支持身份认证最终解释权归医院</p>
					<Link to="home">
						<Button>预约挂号</Button>
					</Link>
				</Article>
			</Page>
		)
	}
}

let id = document.getElementById('app');
ReactDom.render(<Routes/>,id);
