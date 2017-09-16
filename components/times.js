import React,{Component} from 'react';
import Page from './common/page';
import {Cells,CellsTitle,Cell,CellBody,CellFooter,Badge,CellHeader,Panel,PanelHeader,PanelBody,MediaBox,MediaBoxHeader,MediaBoxBody,MediaBoxTitle,MediaBoxDescription} from 'react-weui';
import {Link} from 'react-router';
import {frontDepartmentOnlineTimelist} from '../ajax';
export default class Times extends Component {

	constructor(props) {
	  super(props);
	  this.state = {
	  	loading:false,
	  	index:0,
	  	kid:this.props.params.kid,
	  	did:this.props.params.did,
	  	date:this.props.params.date,
	  	kname:'加载中...',
	  	dname:'加载中...',
	  	prices:'加载中...',
	  	prices1:'加载中...',
	  	prices2:'加载中...',
	  	times:[]
	  };
	}
	componentWillMount() {
		this._loadData();
	}

	_loadData(){
		this.setState({
			loading:true
		});
		frontDepartmentOnlineTimelist({
			depId:this.state.kid,
			tdate:this.state.date,
			docId:this.state.did,
			callBack:(res) => {
				this.setState({
					times : res.datas,
					prices : res.planInfo.unit_price_part1,
					dname : res.planInfo.doc_name,
					prices : res.planInfo.unit_price,
					prices1 : res.planInfo.unit_price_part1,
					prices2 : res.planInfo.unit_price_part2,
					kname : res.planInfo.dept_name,
					loading:false
				});
			}
		});
	}
	//切换时间改变数据
	_changeDate(index){
		this.setState({
			index:index
		});
	}
	render(){
		return(
			<Page loading={this.state.loading}>
				<Cells>
					<CellsTitle>已选信息</CellsTitle>
	                <Cell>
	                	<CellBody>
	                		医生
	                	</CellBody>
	                	<CellFooter>
	                		{this.state.dname}
	                	</CellFooter>
	                </Cell>
	                <Cell>
	                	<CellBody>
	                		价格
	                	</CellBody>
	                	<CellFooter>
	                		{this.state.prices}元
	                	</CellFooter>
	                </Cell>
	                <Cell>
	                	<CellBody>
	                		其他
	                	</CellBody>
	                	<CellFooter>
	                		<Badge preset="body">121</Badge>
	                		<Badge preset="body">1212</Badge>
	                	</CellFooter>
	                </Cell>
				</Cells>
				<DateList {...this.state}/>
			</Page>
		)
	}
}

class DateList extends Component{
	render(){
		return(
			<Cells>
				<CellsTitle>
                    请选择预约时间段
                </CellsTitle>
                {
                	this.props.times.map((ele)=>{
                		return(
                			<Cell key={Math.random()} access href={`#/info/${this.props.date}/${ele.hour_scope}/${this.props.dname}/${this.props.did}/${this.props.kname}/${this.props.kid}/${this.props.prices}`}>
			                	<CellHeader>
			                		<span style={{marginRight:'5px'}} className="ion-ios-clock-outline"></span>
			                	</CellHeader>
				                <CellBody>
				                	{ele.hour_scope} <Badge preset="body">剩余{ele.c}</Badge>
				                </CellBody>
				                <CellFooter/>
			                </Cell>
                		)
                	})
                }
			</Cells>
		)
	}
}
