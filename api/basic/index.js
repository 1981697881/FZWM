import Request from '@/plugins/request/js/index';

export default {
    barcodeScan(params) {
        return Request().post('/api/basic/barcodeScan', {
            header: {
				accept: '*/*'
            },
			data: params
        });
    },
};
