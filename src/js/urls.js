import config from 'config';

const API_ENV = config.API_ENV,
    PROTOCOL = location.protocol;

const URLS_FOR_PRO = {
    API_BASE_URL: '//apis.baidu.com/apistore/weatherservice/weather',
    WEATHER_SERVICE_BASE_URL: '//107.191.53.100:8001/weatherservice/',
    MOCK_JSON_BASE_PATH: '/mock/',
}, URLS_FOR_PRE = {
    API_BASE_URL: 'localhost:8001/',
    WEATHER_SERVICE_BASE_URL: '//107.191.53.100:8001/weatherservice/',
    MOCK_JSON_BASE_PATH: '/mock/',
};

export default (API_ENV === 'pre' ? URLS_FOR_PRE : URLS_FOR_PRO );