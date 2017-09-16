import React,{Component} from 'react';
import Page from './common/page';
import {Msg} from 'react-weui';
const showSuccess = (props)=>{
    return(
        <Page>
            <Msg
            type="success"
            title="支付成功"
            description="您的预约已经成功"
            buttons={[{
                type: 'primary',
                label: '确认',
                onClick: props.history ? props.history.goBack : false
            }]}
            />
        </Page>
    )
}
export default showSuccess;
