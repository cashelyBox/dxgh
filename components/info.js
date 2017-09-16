//个人信息
import React,{Component} from 'react';
import Page from './common/page';
import {Cells,CellsTitle,Cell,Button,Radio,Form,FormCell,ActionSheet,ButtonArea,CellBody,CellFooter,Badge,CellHeader,Panel,PanelHeader,PanelBody,MediaBox,MediaBoxHeader,MediaBoxBody,MediaBoxTitle,MediaBoxDescription} from 'react-weui';
import {Link} from 'react-router';
import {frontPatientList,frontPatientDelete,fontPayUnifiedorder,frontOrderDetail,frontOrderList} from '../ajax';
export default class Info extends Component {
	constructor(props) {
	  super(props);

	  this.state = {
	  	loading:false,
	  	index:0,
	  	params:this.props.params,
	  	infos:[],
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

	_loadData(){
		this.setState({
			loading:true
		});
		if(typeof(this.props.params.bid) == 'undefined'){
			frontPatientList({
				depId:this.state.kid,
				callBack:(res) => {
					if(!!res.datas.length){
						this.setState({
							infos:res.datas
						});
						for(let i =0;i<res.datas.length;i++){
							if(res.datas[i].isDefault){
								this.setState({
									index:i
								});
								return;
							};
						}
					}
					this.setState({
						loading:false
					})
				}
			});
		}else{
			frontOrderDetail({
				id:this.props.params.bid,
				callBack:(res) => {
					let _info = this.state.infos;
					_info.push(res.datas);
					this.setState({
						infos:_info,
						loading:false
					})
				}
			});
		}

	}

	// 删除就诊人
	_delete(){
		this.setState({
			loading:true
		});
		// console.log();
		frontPatientDelete({
			idCard:this.state.infos[this.state.editIndex].idCard,
			name:this.state.infos[this.state.editIndex].name,
			callBack:(res) => {
					this.setState({
						infos:this.state.infos.slice(0,this.state.editIndex).concat(this.state.infos.slice(this.state.editIndex+1)),
						loading:false
					});
			}
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

	//支付接口

	_goPay(){
		this.setState({
			loading:true
		});
		console.log(this.state.index);
		fontPayUnifiedorder({
			uid:this.state.infos[this.state.index].patient_id,
			kid:this.props.params.kid,
			kname:this.props.params.kname,
			did:this.props.params.did,
			dname:this.props.params.dname,
			money:this.props.params.prices,
			date:this.props.params.date,
			time:this.props.params.time,
			id:this.props.params.bid,
			callBack:(res)=>{
				wx.chooseWXPay({
                    timestamp: res.datas.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: res.datas.nonceStr, // 支付签名随机串，不长于 32 位
                    package:  res.datas.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                    signType: res.datas.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: res.datas.paySign ,// 支付签名
                    success:  function(res){
                        // 支付成功后的回调函数
                        var callBack = function(){};
                        if (res.errMsg == "chooseWXPay:ok") {
                            payResult=1;
                            this.props.router.push('/paySuccess');
                        }
                        // isPay(payResult,callBack);
                    },
                    cancel :function(res){
                        // isPay(payResult);
                    },
                    fail:function(res){
                        alert(JSON.stringify(res));
                    }
                });
				this.setState({
					loading:false
				});
			}
		})

	}

	componentDidMount() {
		this._loadData();
	}

	render(){
		return(
			<Page loading={this.state.loading}>
				{
					this.state.infos.length == 0 ? <ButtonArea>
						<Link to="/createInfo">
							<Button>添加就诊人</Button>
						</Link>
					</ButtonArea> : <SingleInfo index={this.state.index} action={this._action.bind(this)} dataSource={this.state.infos}/>
				}
				<SingleMessage {...this.state.params}/>
				{
					this.state.infos.length == 0 ? null : <ButtonArea><Button onClick={this._goPay.bind(this)}>确认挂号</Button></ButtonArea>
				}

				<ButtonArea>
					<Link to="/createInfo">
						<Button>添加就诊人</Button>
					</Link>
				</ButtonArea>
				<ActionSheet
                    menus={this.state.menus}
                    actions={this.state.actions}
                    show={this.state.auto_show}
					type="ios"
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
										<p>{ele.idCard}</p>
										<p>
											<Badge preset="body">身份证</Badge>
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
