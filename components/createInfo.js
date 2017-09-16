// 建立个人信息
import React,{Component} from 'react';
import Page from './common/page';
import {Cells,CellsTitle,Cell,Button,Toast,Article,ButtonArea,ActionSheet,Form,Label,Input,FormCell,Switch,CellBody,CellFooter,Badge,CellHeader,Panel,PanelHeader,PanelBody,MediaBox,MediaBoxHeader,MediaBoxBody,MediaBoxTitle,MediaBoxDescription} from 'react-weui';
import {Link} from 'react-router';
import {frontPatientAdd} from '../ajax';

export default class CreateInfo extends Component{
	constructor(props) {
	  super(props);

	  this.state = {
	  	showSuccess:false,
	  	successTimer:null,
  		name:null,
  		postNum:null,
  		phoneNum:null,
  		address:null,
  		birthday:'',
  		sex:''
	  };
	}

	_changeName(e){
		this.setState({
			name:e.target.value
		})
	}

	_changePost(e){
		let postNum = e.target.value;
		let birthday=null,sex=null;
		if(postNum.length == 18){
			birthday = [postNum.substr(6,4),postNum.substr(10,2),postNum.substr(12,2)];
			sex = postNum.substr(17,1);
			sex = (sex % 2 == 0 ? 1 : 0);
			this.setState({
				postNum:e.target.value,
				birthday:birthday.join('-'),
				sex:sex
			});

		}
	}

	_changePhone(e){
		this.setState({
			phoneNum:e.target.value
		});
	}
	_changeAddress(e){
		this.setState({
			address:e.target.value
		})
	}
	_changeSex(e){
		this.setState({
			sex:e.target.value
		})
	}
	_success(){
		frontPatientAdd({
			name:this.state.name,
			sex:this.state.sex,
			birthday:this.state.birthday,
			idCard:this.state.postNum,
			iphone:this.state.phoneNum,
			address:this.state.address,
			callBack:(res)=>{
				this.setState({
					showSuccess:true,
					successTimer:setTimeout(()=>{
						this.setState({
							showSuccess:false
						});
						this.props.router.goBack();
					},2000)
				});
			}
		})

	}
	//根据sex的值判断用户是男是女，如果没有值的话是空
	_outputSexName(){
		switch(this.state.sex){
			case 0 : return '女';
			case 1 : return '男';
			default : return '';
		}
	}
	render(){
		return(
			<Page>
				<Toast icon="success-no-circle" show={this.state.showSuccess}>成功</Toast>
				<Form>
					<CellsTitle>初诊人初始建档</CellsTitle>
					<FormCell>
						<CellHeader>
							<Label>姓	名</Label>
						</CellHeader>
						<CellBody>
							<Input onChange = {this._changeName.bind(this)} placeholder="请输入姓名"/>
						</CellBody>
					</FormCell>
					<FormCell>
						<CellHeader>
							<Label>身份证号</Label>
						</CellHeader>
						<CellBody>
							<Input type="number" onChange = {this._changePost.bind(this)} placeholder="请输入身份证号"/>
						</CellBody>
					</FormCell>
					<FormCell>
						<CellHeader>
							<Label>出生日期</Label>
						</CellHeader>
						<CellBody>
							<Input disabled value={this.state.birthday}/>
						</CellBody>
					</FormCell>
					<FormCell>
						<CellHeader>
							<Label>性	别</Label>
						</CellHeader>
						<CellBody>
							<Input disabled value={this._outputSexName()}/>
						</CellBody>
					</FormCell>
					<FormCell>
						<CellHeader>
							<Label>联系电话</Label>
						</CellHeader>
						<CellBody>
							<Input onChange = {this._changePhone.bind(this)} placeholder="请输入联系电话"/>
						</CellBody>
					</FormCell>
					<FormCell>
						<CellHeader>
							<Label>联系地址</Label>
						</CellHeader>
						<CellBody>
							<Input onChange = {this._changeAddress.bind(this)} placeholder="请输入联系地址"/>
						</CellBody>
					</FormCell>
				</Form>
				<Article>
					<h2>温馨提示：</h2>
					<p>请确保您输入的身份证号码准确无误；如果您还没有办理身份证，可参考户口簿上的身份证号码。</p>
				</Article>
				<ButtonArea>
					<Button onClick={this._success.bind(this)}>下一步</Button>
				</ButtonArea>
			</Page>
		)
	}
}
