import React,{Component} from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/index';
require('./sass/all.scss');
import {Route,Router,IndexRoute,hashHistory,Link} from 'react-router'; 
const store = createStore(reducer);



//router

import Home from './components/home';
import Page from './components/common/page';
import Dates from './components/dates';
import Times from './components/times';
import Info from './components/info';
import InfoList from './components/infoList';
import CreateInfo from './components/createInfo';
import BindInfo from './components/bindInfo';
import {Button,Article} from 'react-weui';

class Routes extends Component {
	render(){
		return (
				<Provider store={store}>
					<Router history={hashHistory}>
						<Route path="/">
							<IndexRoute component={Notice}/>
							<Route path="home" component={Home}/>
							<Route path="dates/:kid" component={Dates}/>
							<Route path="times/:kid/:date/:did" component={Times}/>
							<Route path="info/:date/:time/:dname/:kname/:prices" component={Info}/>
							<Route path="infoList" component={InfoList}/>
							<Route path="createInfo" component={CreateInfo}/>
							<Route path="bindInfo" component={BindInfo}/>
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
					<p>3、就诊取号：就诊当天，预约患者需持预约时提供的有效证件，提前30分钟到 医院指定窗口或自助机取号就诊。如果需要挂号收费票据，请到门诊挂号窗口 索取</p>
					<p>4、取消预约：因故不能按时就诊的患者，请在就诊日前一天的24时以前取消预 约(进入微信平台[取消预约])；预约挂号当天病人取消预约并退费的，只能到 人工窗口进行退费。</p>
					<p>5.微信支付成功后进行预约，预约失败将进行退费，请以收到预约成功信息为准，如预约不成功，请自行选择其他途径预约</p>
					<p>6.预约成功后，请于就诊时间段前30分钟凭预约成功的信息到医院挂号窗口或自助机‘预约取号’</p>
					<p>7.取号成功后，请至科室护士前台报到，您可以查询实时候诊队列</p>
					<p>8.同一账号同一专科或同一医生一天只能预约一次，一个月内取消预约、爽约有三次以上(含三次)记录的，该账号将被例如黑名单，限制预约两个月</p>
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