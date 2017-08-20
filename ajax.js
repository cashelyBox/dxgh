const httpAddress = "http://yhbonder.cn/dx-hospital/";
import $ from 'jquery';
function ajax(parmas){
	$.ajax({
		url:httpAddress + parmas.url,
		data:parmas.data || {},
		success:(res)=>{
			console.log(res);

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
		callBack:parmas.callBack
	})
}