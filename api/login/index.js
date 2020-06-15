import Request from '@/plugins/request/js/index';

export default {
    // post 请求， 200 响应码
    login(params) {
        return Request().post('/api/login', {
            header: {
                contentType: 'application/json',
				accept: '*/*'
            },
			data: params
        });
    },
};
