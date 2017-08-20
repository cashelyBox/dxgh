//首页
import React,{Component} from 'react';
import {Button,SearchBar,Cells,Cell,CellBody,CellHeader,CellFooter} from 'react-weui'; 
import Page from './common/page';
import {Link} from 'react-router';
import {frontDepartmentList} from '../ajax';
export default class Home extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	loading:false,
	  	index:0,
	  	ksGroups:[]
	  };
	}

	componentWillMount() {
		this._loadData();
	}

	_loadData(){
		this.setState({
			loading:true
		});
		frontDepartmentList({
			callBack:(res) => {
				this.setState({
					ksGroups : res.datas,
					loading:false
				});
			}
		});
	}

	_tabSelect(index){
		this.setState({
			index:index
		})
	}


	render(){
		return(
			<Page loading={this.state.loading}>
				<div>
					<SearchBar
	                    placeholder="搜索科室或者医生"
	                    lang={{
	                        cancel: '取消'
	                    }}
	                />
				</div>
                <div className="tab-horizontal">
					<div className="tab-left">
						<Cells>
							
							{
								this.state.ksGroups.map((ele,index)=>{
									return(
										<Cell className={this.state.index == index ? 'active' : null} onClick={this._tabSelect.bind(this,index)} key={Math.random()} access>
											<CellBody>{ele.name}</CellBody>
										</Cell>
									)
								})
							}
						</Cells>
					</div>
					<div className="tab-right">
						<Cells>
							{
								this.state.ksGroups.length !== 0 ? this.state.ksGroups[this.state.index].lists.map((ele,index)=>{
									return(
											<Cell href={`#/dates/${ele.id}`} access key={Math.random()}>
												<CellHeader>
													<span style={{marginRight:'5px'}} className="ion-ios-people-outline"></span>
												</CellHeader>
												<CellBody>{ele.name}</CellBody>
												<CellFooter/>
											</Cell>
									)
								}) : null
							}
						</Cells>
					</div>
                </div>
			</Page>
		)
	}
}