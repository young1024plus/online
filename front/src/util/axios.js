import axios from 'axios';

import qs from 'qs';


import 'weui';
import weui from 'weui.js';

var loading;


const instance = axios.create({
    baseURL: 'http://www.young1024.com:82/',
    method: 'post',
    transformRequest: [function (data, headers) {
        loading = weui.loading('');
        return qs.stringify(data);
    }],
    transformResponse: [function (data) {
        loading.hide();
        // console.log(data)
        return JSON.parse(data);
    }],
});

export default instance;