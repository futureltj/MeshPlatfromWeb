const BaseURL = 'http://artadv.cn:7777'
const APIV1 = BaseURL+'/PlatformAPI/v1'
module.exports = {
  name: '工业大数据管理平台',
  prefix: '工业大数据管理平台',
  footerText: 'Copyright © 2017 迈实科技',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: ['http://artadv.cn:7777/'],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  api: {
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    users: `${APIV1}/users`,
    user: `${APIV1}/user`,
    menus: `${APIV1}/menus`,
    department: `${APIV1}/department`,
    parentdepartment: `${APIV1}/getParentDepartment`,
    datamodel: `${APIV1}/datamodel`,
    devicetype: `${APIV1}/devicetype`,
    device: `${APIV1}/device`,
    gwconfig: `${APIV1}/gwconfig`,
    gateway: `${APIV1}/gateway`,
    fileupload: `${APIV1}/fileupload`,
    filepath: `${BaseURL}/files`,
  },
}
