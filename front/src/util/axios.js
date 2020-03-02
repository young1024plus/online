import axios from 'axios';

import qs from 'qs'

const instance = axios.create({
    baseURL: 'http://www.young1024.com:82/',
    method: 'post',
    transformRequest: [function (data, headers) {
        return qs.stringify(data);
    }],
});

export default instance;