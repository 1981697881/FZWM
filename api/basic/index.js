import Request from '@/plugins/request/js/index';

export default {
    barcodeScan(params) {
        return Request().post('/api/basic/barcodeScan', {
            header: {
				accept: '*/*'
            },
			data: params
        });
    },getBillNo(params) {
        return Request().post('/api/billList/getBillNo', {
            header: {
				accept: '*/*'
            },
			data: params
        });
    },getDeptList(params) {
        return Request().post('/api/basic/deptList', {
            header: {
				contentType: 'application/json',
            },
			data: params
        });
    },getStockList(params) {
        return Request().post('/api/basic/stockList', {
            header: {
				contentType: 'application/json',
            },
			data: params
        });
    },
};
