import React,{Component} from 'react';
import Page from './common/page';
import {Cells,Cell,CellBody,CellFooter,Badge,CellsTitle,CellHeader,Panel,PanelHeader,PanelBody,MediaBox,MediaBoxHeader,MediaBoxBody,MediaBoxTitle,MediaBoxDescription} from 'react-weui';
import {Link} from 'react-router';
import {imgPath,frontDepartmentPaiban} from '../ajax';
export default class Dates extends Component {

	constructor(props) {
	  super(props);
	  this.state = {
	  	loading:false,
	  	tDate:null,
	  	kid:this.props.params.kid,//科室id
	  	kname:'加载中...',//科室名称
	  	index:0,
	  	datas:[]
	  };
	}
	componentWillMount() {
		this._loadData();
	}

	_loadData(){
		this.setState({
			loading:true
		});
		frontDepartmentPaiban({
			depId:this.state.kid,
			callBack:(res) => {
				if(!!res.datas.length){
					this.setState({
						datas : res.datas,
						tDate : res.datas[this.state.index].online_date,
						kname : res.depName
					});
				}else{
					this.setState({
						kname:'没有数据'
					})
				}
				this.setState({
					loading:false
				})
			}
		});
	}
	//切换时间改变数据
	_changeDate(index,date){
		this.setState({
			index:index,
			tDate:date
		});
	}
	render(){
		return(
			<Page loading={this.state.loading}>
				<Cells>
					<Cell>
						<CellHeader>
							<span style={{marginRight:'5px',fontSize:'2em'}} className="ion-ios-checkmark-empty"></span>
						</CellHeader>
						<CellBody>
							已选
						</CellBody>
						<CellFooter>
							{this.state.kname}
						</CellFooter>
					</Cell>
				</Cells>
				<DateTable index = {this.state.index} changeDate = {this._changeDate.bind(this)} dataSource={this.state.datas}/>
				{
					this.state.datas.length !==0 ? <DateList tDate={this.state.tDate} kId={this.state.kid} dataSource={this.state.datas[this.state.index].tlist}/> : null
				}
			</Page>
		)
	}
}

class DateTable extends Component{
	render(){
		return(
			<div className="datas-table">
				{
					this.props.dataSource.map((ele,index)=>{
						console.log(this.props.index == index);
						return(
							<div className={this.props.index == index ? 'active' : null} onClick={()=>{this.props.changeDate(index,ele.online_date)}} key={Math.random()}>
								<span>{ele.online_date.slice(8)}</span><span>{ele.week_day.slice(2)}</span>
							</div>
						)
					})
				}
			</div>
		)
	}
}

class DateList extends Component{
	render(){
		return(
			<Cells>
				<CellsTitle>
                    可预约医生列表
                </CellsTitle>
	                {
	                	typeof(this.props.dataSource) != 'undefined' ? this.props.dataSource.map((ele,index)=>{
	                		return(
			                	<Cell access key={Math.random()} type="appmsg" href={`#/times/${this.props.kId}/${this.props.tDate}/${ele.doc_id}`}>
			                		<CellHeader>
										<img src={(typeof(ele.icon_img)!='undefined' && ele.icon_img.length!==0) ? imgPath+ele.icon_img : '/images/icon_user_default.jpg'} style={{marginRight:'5px',width:'80px',height:'80px'}}/>
			                		</CellHeader>
			                		<CellBody>
		                                <p>{ele.doc_name}<span className="post">{ele.doc_title
}</span><span className="money">￥{ele.unit_price}</span></p>
										<p>现任医院:<span className="discription">{ele.work_org}</span></p>
										<p>特长:<span className="discription">{ele.spec}</span></p>
		                                <p>
		                                    {
		                                    	typeof(ele.marks) != 'undefined' ? ele.marks.map((item)=>{
		                                    		return(
		                                    			<Badge key={Math.random()} preset="body">{item}</Badge>
		                                    		)
		                                    	}) : null
		                                    }
		                                </p>
		                                <p>
											{
												ele.day_part.split(',').map((item)=>{
													return (
														<Badge preset="body">
															{item}
														</Badge>
													)
												})
											}
		                                </p>
		                            </CellBody>
		                            <CellFooter/>
			                	</Cell>
	                		)
	                	}) : null
	                }
			</Cells>
		)
	}
}
