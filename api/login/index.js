import Request from '@/plugins/request/js/index';

export default {
    // post 请求， 200 响应码
    login(params) {
        return Request().post('/test/post/200', {
            header: {
                contentType: 'application/json'
            },
            data: params
        });
    },
};
