const Categories = require('@resource-sentry/utils/lib/categories');

let data = [];

data[Categories.VALUE] = [
    {name: 'platformIdentifier', value: 2134},
    {name: 'video-of-universe', value: '8'},
    {name: 'customerIdentifier', value: 1023840},
    {name: 'car-heroic-color-simple', value: '0'},
    {name: 'pi', value: '3.1415926535'},
    {name: 'paymentIdentifier', value: 13902183}
];

data[Categories.TEXT] = [
    {name: 'text_actual_visitNow', value: 'Just now.'},
    {name: 'error_epic', value: 'Data is lost.'},
    {name: 'text_actual_visit_extra', value: 'Just with extra'},
    {name: 'carName', value: 'Honda'},
    {name: 'error_fatal', value: 'Oops.'},
    {name: 'text_actualHelp', value: 'Help'},
    {name: 'applicationName', value: 'Extra Mobile'},
    {name: 'text_actual_active', value: 'Active'}
];

data[Categories.DIMENSION] = [
    {name: 'section-shape-size', value: 8},
    {name: 'section-header-height', value: 2.5},
    {name: 'protection-area-angle', value: 45},
    {name: 'element-special-width', value: 14}
];

data[Categories.COLOR] = [
    {name: 'sad-yellow', value: 'FFFF00'},
    {name: 'list-item-white', value: 'FFFFFF'},
    {name: 'list-item-black', value: 0},
    {name: 'accent-orange', value: 'FFA500'}
];

data[Categories.GRAPHIC] = [
    {name: 'icon-sign-out', value: '<svg xmlns="http://www.w3.org/2000/svg"></svg>'},
    {name: 'shadow-bar', value: '<svg xmlns="http://www.w3.org/2000/svg"></svg>'},
    {name: 'icon-login-white', value: '<svg xmlns="http://www.w3.org/2000/svg"></svg>'},
    {name: 'icon-login', value: '<svg xmlns="http://www.w3.org/2000/svg"></svg>'}
];

data[Categories.LANGUAGE] = [
    {
        name : 'en',
        value: [{key: 'hello', value: 'hello'}, {key: 'world', value: 'world'}, {key: 'bat', value: 'bat'}]
    },
    {
        name : 'es',
        value: [{key: 'hello', value: 'hola'}, {key: 'world', value: 'mundo'}, {key: 'bat', value: 'bate'}]
    },
    {
        name : 'de',
        value: [{key: 'hello', value: 'hallo'}, {key: 'world', value: 'wereld'}, {key: 'bat', value: 'knuppel'}]
    }
];

module.exports = data;
