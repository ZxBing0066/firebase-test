import request from 'superagent';
import _ from 'underscore';
import Promise from 'promise';
import Mock from 'mockjs';
import config from 'config';
import urls from '../urls.js';
import userStore from './user.js';
import userDispatcher from '../dispatcher/userDispatcher.js';

var database, user, uid;

/**
 * api请求错误
 */
class RequestError extends Error {
    /**
     * 构造函数
     * @param  {int} errCode 错误码
     * @param  {str} msg     错误信息
     */
    constructor(errCode, msg) {
        super();
        this.message = msg;
        this.errCode = errCode;
    }
};

/**
 * 基本请求函数
 * @param  {str} url   请求链接地址
 * @param  {obj} param 请求参数
 * @return {pro}       返回请求的promise
 */
var baseRequest = function baseRequest(url, param) {
    return new Promise((resolve, reject) => {
        request.get(url).query(param).end(function(err, res) {
            var error;
            if(err) {
                error = err;
            } else if(!res) {
                error = new RequestError(0, 'Empty Response!');
            } else if(!res.ok) {
                error = new RequestError(res.status, 'Network Error!');
            } else if(!res.text) {
                error = new RequestError(0, 'No Response!');
            }
            if(error) {
                reject(error);
                return;
            }
            var resObj = JSON.parse(res.text);
            resolve(resObj);
        })
    });
};
var basePostRequest = function baseRequest(url, param) {
    return new Promise((resolve, reject) => {
        request.post(url).type('form').send(param).end(function(err, res) {
            var error;
            if(err) {
                error = err;
            } else if(!res) {
                error = new RequestError(0, 'Empty Response!');
            } else if(!res.ok) {
                error = new RequestError(res.status, 'Network Error!');
            } else if(!res.text) {
                error = new RequestError(0, 'No Response!');
            }
            if(error) {
                reject(error);
                return;
            }
            var resObj = JSON.parse(res.text);
            resolve(resObj);
        })
    });
};

export default {
    /**
     * API初始化
     * 1. 初始化database
     * 2. 注册用户登录态变化事件,登录态变化后刷新存储的用户信息,登陆后刷新用户登录时间
     */
    init() {
        database = firebase.database();
        userDispatcher.register((info) => {
            if(info.action == 'userState') {
                user = userStore.getUser();
                uid = user && user.uid;
            }
        });
    },
    changeNickName(nickName) {
        return database.ref(`users/${uid}/nickName`).set(nickName);
    },
    getUserCityList() {
        return database.ref(`users/${uid}/cityList`);
    },
    addCityToUserCityList(cityInfo) {
        return database.ref(`users/${uid}/cityList`).push(cityInfo);
    },
    getCityList(cityName) {
        return baseRequest(`${urls.WEATHER_SERVICE_BASE_URL}citylist`, {
            cityname: cityName
        });
    },
    getWeather(request) {
        var requestUrl;
        if(request.cityId) {
            requestUrl = 'cityid';
            request.cityid = request.cityId;
        } else if(request.cityName) {
            requestUrl = 'cityname';
            request.cityname = request.cityName;
        } else {
            requestUrl = 'weather';
            request.citypinyin = request.cityPinyin;
        }
        return baseRequest(`${urls.WEATHER_SERVICE_BASE_URL}${requestUrl}`, request);
    },
    getRecentWeathers(cityId) {
        return baseRequest(`${urls.WEATHER_SERVICE_BASE_URL}recentweathers`, {
            cityid: cityId
        });
    },
    addShadowsocks(url) {
        return basePostRequest('http://my.com:10086/shadowsocks/add', {
            url: url
        });
    },
}