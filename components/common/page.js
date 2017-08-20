import React,{Component} from 'react';
import {Toast} from 'react-weui';
export default class Page extends Component{
	render(){
		console.log(this.props.isPadding);
		return(
			<div className={this.props.isPadding ? 'page page-content' : 'page' }>
					{this.props.children}
					<Toast icon="loading" show={this.props.loading}>加载中...</Toast>
			</div>
		)
	}
}

Page.defaultProps = {
  loading: false
}