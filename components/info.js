//个人信息
import React,{Component} from 'react';
import Page from './common/page';
import {Cells,CellsTitle,Cell,Button,Radio,Form,FormCell,ActionSheet,ButtonArea,CellBody,CellFooter,Badge,CellHeader,Panel,PanelHeader,PanelBody,MediaBox,MediaBoxHeader,MediaBoxBody,MediaBoxTitle,MediaBoxDescription} from 'react-weui';
import {Link} from 'react-router';
export default class Info extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	loading:false,
	  	index:0,
	  	params:this.props.params,
	  	infos:[
	  		{
	  			name:'石大明0',
	  			postNum:'340826199003271436',
	  			cardId:'',
	  			cardType:'身份证',
	  			isDefault:true
	  		},
	  		{
	  			name:'石大明1',
	  			postNum:'340826199003271436',
	  			cardId:'',
	  			cardType:'身份证',
	  			isDefault:true
	  		},
	  		{
	  			name:'石大明2',
	  			postNum:'340826199003271436',
	  			cardId:'',
	  			cardType:'身份证',
	  			isDefault:true
	  		},
	  		{
	  			name:'石大明3',
	  			postNum:'340826199003271436',
	  			cardId:'',
	  			cardType:'身份证',
	  			isDefault:true
	  		}
	  	],
	  	auto_show:false,
	  	menus:[
	  		{
	  			label:'选定就诊人',
	  			onClick:this._select.bind(this)
	  		},
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
		this._hide();
	}
	//显示&隐藏操作菜单
	_hide(){
		this.setState({
			auto_show:!this.state.auto_show
		})
	}
	//选定就诊人
	_select(){
		this._hide();
		this.setState({
			index:this.state.editIndex
		})
	}
	//打开操作菜单并指定要操作的栏目索引
	_action(index){
		this._hide();
		this.setState({
			editIndex:index
		})
	}

	render(){
		return(
			<Page loading={this.state.loading}>
				<SingleInfo index={this.state.index} action={this._action.bind(this)} dataSource={this.state.infos}/>
				<SingleMessage {...this.state.params}/>
				<ButtonArea>
					<Button>确认挂号</Button>
				</ButtonArea>
				<ButtonArea>
					<Link to="/createInfo">
						<Button>添加就诊人</Button>
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

	constructor(props) {
	  super(props);
	  this.state = {
	  	timer:null
	  };
	}

	_action(index){
			this.props.action(index);
	}
	render(){
		return(
			<Cells>
				<CellsTitle>
					就诊人
				</CellsTitle>
				<Form radio>
					{
						this.props.dataSource.map((ele,index)=>{
							return(
								<FormCell radio key={Math.random()} onClick={this._action.bind(this,index)} onChange={(e)=>{console.log(e.target.value);}}>
									<CellHeader>
										<span style={{marginRight:'5px',fontSize:'2em'}} className="ion-ios-person"></span>
									</CellHeader>
									<CellBody>
										<p>{ele.name}</p>
										<p>{ele.postNum}</p>
										<p>
											<Badge preset="body">{ele.cardType}</Badge>
										</p>
									</CellBody>
									<CellFooter>
				                        <Radio name="radio1" value={index} defaultChecked={index == this.props.index}/>
				                    </CellFooter>
								</FormCell>
							)
						})
					}
				</Form>
			</Cells>
		)
	}
}

class SingleMessage extends Component{
	render(){
		return(
			<Cells>
				<CellsTitle>
					挂号详情
				</CellsTitle>
				<Cell>
					<CellBody>
						科室
					</CellBody>
					<CellFooter>
						{this.props.kname}
					</CellFooter>
				</Cell>
				<Cell>
					<CellBody>
						医生
					</CellBody>
					<CellFooter>
						{this.props.dname}
					</CellFooter>
				</Cell>
				<Cell>
					<CellBody>
						号类
					</CellBody>
					<CellFooter>
						
					</CellFooter>
				</Cell>
				<Cell>
					<CellBody>
						就诊日期
					</CellBody>
					<CellFooter>
						{this.props.date}
					</CellFooter>
				</Cell>
				<Cell>
					<CellBody>
						就诊时间
					</CellBody>
					<CellFooter>
						{this.props.time}
					</CellFooter>
				</Cell>
				<Cell>
					<CellBody>
						挂号费
					</CellBody>
					<CellFooter>
						{this.props.prices}元
					</CellFooter>
				</Cell>
			</Cells>
		)
	}
}