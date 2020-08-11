import Request from '@/plugins/request/js/index';

export default {
	//扫码
    barcodeScan(params) {
        return Request().post('/api/basic/barcodeScan', {
            header: {
				accept: '*/*'
            },
			data: params
        });
    },//扫码获取库存
    inventoryByBarcode(params) {
        return Request().get('/api/basic/inventoryByBarcode', {
            header: {
				accept: '*/*'
            },
			data: params
        });
    },
	//获取单号
	getBillNo(params) {
        return Request().get('/api/billList/getBillNo', {
            header: {
				accept: '*/*'
            },
			data: params
        });
    },
	//获取部门
	getDeptList(params) {
        return Request().post('/api/basic/deptList', {
            header: {
				contentType: 'application/json',
            },
			data: params
        });
    },
	//获取仓库
	getStockList(params) {
        return Request().post('/api/basic/stockList', {
            header: {
				contentType: 'application/json',
            },
			data: params
        });
    },
	//获取单据
	getOrderList(params) {
        return Request().post('/api/billList/queryBillList', {
            header: {
				contentType: 'application/json',
            },
			data: params
        });
    },
	//获取供应商
	supplierList(params) {
	    return Request().post('/api/basic/supplierList', {
	        header: {
				contentType: 'application/json',
	        },
			data: params
	    });
	},
	//获取客户
	customerList(params) {
	    return Request().post('/api/basic/customerList', {
	        header: {
				contentType: 'application/json',
	        },
			data: params
	    });
	},
};
