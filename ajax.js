// const httpAddress = "http://www.danximz.com/";
const httpAddress = "";
import $ from 'jquery';

export function encode(str) {
    return encodeURI(encodeURI(str));
}
export function decode(str) {
    return decodeURI(decodeURI(str));
}

export const url2obj = function(s){
    var str = location.search.slice(1);
    str = str.split('&');
    var obj = {};
    str.forEach(function(ele) {
        var _index = ele.indexOf('=');
        obj[ele.slice(0, _index)] = decode(ele.slice(_index + 1));
    });
    return obj;
}

function ajax(parmas){
	$.ajax({
		url:httpAddress + parmas.url,
		method:parmas.method || 'GET',
		data:parmas.data || {},
		success:(res)=>{
			res = JSON.parse(res);
			if(res.status == 1){
				console.log(res,parmas.url);
				parmas.callBack(res);
			}else{
				alert(res.msg);
				return res.msg;
			}
		}
	})
}
//科室列表
export function frontDepartmentList(parmas){
	const data = ajax({
		url:'front/department/list',
		callBack:parmas.callBack
	});
}
//医生排班
export function frontDepartmentPaiban(parmas){
	const data = ajax({
		url:'front/department/paiban',
		data:{
			depId:parmas.depId
		},
		callBack:parmas.callBack
	})
}
//坐诊医生
export function frontDepartmentPaibanDoctor(parmas){
	const data = ajax({
		url:'front/department/paibanDoctor',
		callBack:parmas.callBack
	})
}
//获取某医生坐诊时间段
export function frontDepartmentOnlineTimelist(parmas){
	const data = ajax({
		data:{
			depId:parmas.depId,
			tdate:parmas.tdate,
			docId:parmas.docId
		},
		url:'front/department/onlineTimelist',
		callBack:parmas.callBack
	})
}
//获取就诊人列表
export function frontPatientList(parmas){
	const data = ajax({
		url:'front/patient/list',
		callBack:parmas.callBack
	})
}
//初诊人初始建档
export function frontPatientAdd(parmas){
	const data = ajax({
		url:'front/patient/add',
		data:{
			name:encodeURI(encodeURI(parmas.name)),
			sex:parmas.sex,
			birthday:parmas.birthday,
			idCard:parmas.idCard,
			iphone:parmas.iphone,
			address:encodeURI(encodeURI(parmas.address))
		},
		callBack:parmas.callBack
	})
}
//删除就诊人
export function frontPatientDelete(parmas){
	const data = ajax({
		url:'front/patient/delete',
		method:'POST',
		data:{
			name:encodeURI(encodeURI(parmas.name)),
			idCard:parmas.idCard
		},
		callBack:parmas.callBack
	})
}
//支付接口
export function fontPayUnifiedorder(parmas){
	const data = ajax({
		url:'front/pay/unifiedorder',
		method:'POST',
		data:{
			patient_id:parmas.uid,
			dep_id:parmas.kid,
			dep_name:parmas.kname,
			doc_id:parmas.did,
			doc_name:parmas.dname,
			visit_fee:parmas.money,
			visit_date:parmas.date,
			visit_time:parmas.time,
            id:parmas.id || ''
		},
		callBack:parmas.callBack
	})
}

//初始化微信接口
export function frontPayJssdk(parmas){
	const data = ajax({
		url:'front/pay/jssdk',
		method:'POST',
		data:{
			url:encodeURI(parmas.url),
			code:parmas.code
		},
		callBack:parmas.callBack
	})
}
//历史纪录接口
export function frontOrderList(parmas){
    const data = ajax({
        url:'front/order/list',
        method:'POST',
        data:{
            page:parmas.page || 1,
            rows:parmas.rows || 10
        },
        callBack:parmas.callBack

    })
}
//根据订单获取详情
export function frontOrderDetail(parmas){
    const data = ajax({
        url:'front/order/detail',
        method:'POST',
        data:{
            id:parmas.id
        },
        callBack:parmas.callBack
    })
}
