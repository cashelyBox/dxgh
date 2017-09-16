// 历史纪录
import React from 'react';
import Page from './common/page';
import {Panel,PanelBody,ButtonArea,Button,PanelHeader,PanelFooter,Cells,Cell,CellBody,CellFooter,MediaBox,CellsTitle,MediaBoxTitle,MediaBoxDescription,MediaBoxInfo,MediaBoxInfoMeta} from 'react-weui';
import {frontOrderList} from '../ajax';

export default class History extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            list:[],
            page:1,
            rows:10,
            infinite:true
        }
    }

    _loadDates(){
        if(!this.state.infinite){
            return false;
        };
        this.setState({
            loading:true
        })
        frontOrderList({
            page:this.state.page,
            rows:this.state.rows,
            callBack:(res)=>{
                this.setState({
                    list:this.state.list.concat(res.datas),
                    loading:false
                },()=>{
                    if(res.total >= this.state.list.length){
                        this.setState({
                            infinite:false
                        })
                    }else{
                        this.setState({
                            page:this.state.page+1
                        })
                    }
                });

            }
        })
    }
    componentDidMount(){
        this._loadDates();
    }

    render(){
        return(
            <Page  loading={this.state.loading}>
                <Panel>
                        <CellsTitle>
                        我的预约记录
                        </CellsTitle>
                        <Cells>
                            {
                                this.state.list.map((item)=>{
                                    return (
                                        <CellList dataSources = {item}/>
                                    )
                                })
                            }
                        </Cells>
                </Panel>
                {
                    this.state.infinite ? <ButtonArea>
    					<Button onClick={this._loadDates.bind(this)}>加载更多</Button>
    				</ButtonArea> : null
                }
            </Page>
        )
    }
}

function CellList(props){
    if(props.dataSources.status === 'SUCCESS'){
        return(
            <Cell>
                <CellBody>
                    <MediaBox>
                        <MediaBoxTitle>
                            <span style={styles.green}>已支付</span>
                        </MediaBoxTitle>
                        <MediaBoxDescription>
                            <p>就诊人:{props.dataSources.name} {props.dataSources.idCard}</p>
                            <p>{props.dataSources.visit_date} {props.dataSources.visit_time} {props.dataSources.dep_name} {props.dataSources.doc_name} ￥{props.dataSources.visit_fee}</p>
                        </MediaBoxDescription>
                        <MediaBoxInfo>
                            <MediaBoxInfoMeta>订单号:{props.dataSources.id}</MediaBoxInfoMeta>
                        </MediaBoxInfo>
                    </MediaBox>
                </CellBody>
            </Cell>
        )
    }else{
        return(
            <Cell href={`#/info/${props.dataSources.visit_date}/${props.dataSources.visit_time}/${props.dataSources.doc_name}/${props.dataSources.doc_id}/${props.dataSources.dep_name}/${props.dataSources.dep_id}/${props.dataSources.visit_fee}/${props.dataSources.id}`} access>
                <CellBody>
                    <MediaBox>
                        <MediaBoxTitle>
                            <span style={styles.red}>未支付</span>
                        </MediaBoxTitle>
                        <MediaBoxDescription>
                            <p>就诊人:{props.dataSources.name} {props.dataSources.idCard}</p>
                            <p>{props.dataSources.visit_date} {props.dataSources.visit_time} {props.dataSources.dep_name} {props.dataSources.doc_name} ￥{props.dataSources.visit_fee}</p>
                        </MediaBoxDescription>
                        <MediaBoxInfo>
                            <MediaBoxInfoMeta>订单号:{props.dataSources.id}</MediaBoxInfoMeta>
                        </MediaBoxInfo>
                    </MediaBox>
                </CellBody>
                <CellFooter/>
            </Cell>
        )
    }


    return(
        <a className="weui-cell weui-cell_access weui-cell_link">
            {props.children}
        </a>
    )
}

const styles = {
    red:{
        color:'red'
    },
    green:{
        color:'green'
    }
}
