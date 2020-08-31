import Request from '@/plugins/request/js/index';

export default {
	//获取派工列表
    productWorkReport(params, data) {
       return Request().post('/productWorkReport/list/'+data.pageNum+'/'+data.pageSize, {
           header: {
       		contentType: 'application/json',
       		accept: '*/*'
           },
       	data: params
       });
    },//获取汇报列表
    productWorkDispatch(params, data) {
       return Request().post('/productWorkDispatch/list/'+data.pageNum+'/'+data.pageSize, {
           header: {
       		contentType: 'application/json',
       		accept: '*/*'
           },
       	data: params
       });
    },
};
