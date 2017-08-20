//就诊人绑定信息
import React,{Component} from 'react';
import Page from './common/page';
import {Cells,CellsTitle,Cell,Button,Toast,FooterLinks,FooterLink,Article,ButtonArea,ActionSheet,Form,Select,Label,Input,FormCell,Switch,CellBody,CellFooter,Badge,CellHeader,Panel,PanelHeader,PanelBody,MediaBox,MediaBoxHeader,MediaBoxBody,MediaBoxTitle,MediaBoxDescription} from 'react-weui';
import {Link} from 'react-router';
export default class BindInfo extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	types:[{
	  		value:1,
	  		label:'身份证+病人ID'
	  	}]
	  };
	}

	render(){
		return(
			<Page>
				<Form>
					<CellsTitle>就诊人绑定信息</CellsTitle>
					<FormCell switch>
						<CellBody>
							将添加的信息作为默认就诊人
						</CellBody>
						<CellFooter>
							<Switch onChange={()=>{console.log(this.refs)}} name="isSwitch" defaultChecked/>
						</CellFooter>
					</FormCell>
					<FormCell select selectPos="after">
						<CellHeader>
							<Label>绑定方式</Label>
						</CellHeader>
						<CellBody>
							<Select data={this.state.types}/>
						</CellBody>
					</FormCell>
					<FormCell>
						<CellHeader>
							<Label>身份证号</Label>
						</CellHeader>
						<CellBody>
							<Input placeholder="请输入身份证号"/>
						</CellBody>
					</FormCell>
					<FormCell>
						<CellHeader>
							<Label>姓	名</Label>
						</CellHeader>
						<CellBody>
							<Input placeholder="请输入姓名"/>
						</CellBody>
					</FormCell>
					<FormCell>
						<CellHeader>
							<Label>病人ID</Label>
						</CellHeader>
						<CellBody>
							<Input placeholder="请输入病人ID"/>
						</CellBody>
					</FormCell>
				</Form>
				<Article>
					<p>如果您尚未来过本院就诊，暂不能绑定！可以初始建档后，再预约挂号，请点此 <Link to="/createInfo">【初始人初始建档】</Link></p>
					<p>病人ID号可从就诊过程的医疗发票或处方检查检验等单据获得</p>
				</Article>
				<ButtonArea>
					<Button>确定绑定</Button>
				</ButtonArea>
			</Page>
		)
	}
}