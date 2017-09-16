//个人信息列表
import React,{Component} from 'react';
import Page from './common/page';
import {Cells,CellsTitle,Cell,Button,ButtonArea,ActionSheet,Form,FormCell,Switch,CellBody,CellFooter,Badge,CellHeader,Panel,PanelHeader,PanelBody,MediaBox,MediaBoxHeader,MediaBoxBody,MediaBoxTitle,MediaBoxDescription} from 'react-weui';
import {Link} from 'react-router';

export default class InfoList extends Component {
	constructor(props) {
	  super(props);

	  this.state = {
	  	infos:[
	  		{
	  			name:'石大明',
	  			postNum:'340826199003271436',
	  			cardId:'',
	  			isDefault:true
	  		}
	  	],
	  	auto_show:false,
	  	menus:[
	  		{
	  			label:'删除就诊人',
	  			onClick:this._delete.bind(this)
	  		}
	  	],
	  	actions:[{
	  		label:'取消',
	  		onClick:this._hide.bind(this)
	  	}]
	  };
	}
	// 删除就诊人
	_delete(){
		this.setState({
			infos:this.state.infos.slice(0,this.state.editIndex).concat(this.state.infos.slice(this.state.editIndex+1))
		});
		console.log(this.state.infos);
		this._hide();
	}
	//显示&隐藏操作菜单
	_hide(){
		this.setState({
			auto_show:!this.state.auto_show
		})
	}
	//打开操作菜单并指定要操作的栏目索引
	_action(index){
		this._hide();
		this.setState({
			editIndex:index
		})
	}
	_loadData(){
		this.setState({
			loading:true
		});
		frontPatientList({
			callBack:(res) => {
				if(!!res.datas.length){
					this.setState({
						infos:res.datas
					});
				}
				this.setState({
					loading:false
				})
			}
		});
	}
	render(){
		console.log(this.state.infos.length);
		return(
			<Page>
				{
					this.state.infos.length === 0 ? null : <SingleInfo action={this._action.bind(this)} dataSource={this.state.infos}/>
				}
				<ButtonArea>
					<Link to="/bindInfo">
						<Button>就诊人绑定信息</Button>
					</Link>
				</ButtonArea>
				<ButtonArea>
					<Link to="/createInfo">
						<Button>初诊人初始建档</Button>
					</Link>
				</ButtonArea>
				<ActionSheet
                    menus={this.state.menus}
                    actions={this.state.actions}
                    show={this.state.auto_show}
                    onRequestClose={e=>this.setState({auto_show: false})}
                />
			</Page>
		)
	}
}


class SingleInfo extends Component {
	render(){
		return(
			<Cells>
				<CellsTitle>
					就诊人列表
				</CellsTitle>
				{
					this.props.dataSource.map((ele,index)=>{
						return(
							<Cell key={Math.random()} access onClick={()=>{this.props.action(index)}}>
								<CellHeader>
									<span style={{marginRight:'5px',fontSize:'2em'}} className="ion-ios-person"></span>
								</CellHeader>
								<CellBody>
									<p>姓名：{ele.name}{ele.isDefault ? <Badge preset="body">默认</Badge> : null}</p>
									<p>身份证：{ele.idCard}</p>
									<p>
										病人ID:{ele.cardId}
									</p>
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
