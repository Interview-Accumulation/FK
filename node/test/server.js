const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');


const app = express();
const port = 3000;

// 设置任何域名都可以访问
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
// });
// app.use(cors());
 
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 传输 pdf 流
app.get('/pdf', (req, res) => {
    let filePath = path.resolve(__dirname, './test.pdf');
    let fileStream = fs.createReadStream(filePath);
    let stat = fs.statSync(filePath);
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'inline; filename=test.pdf');
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    fileStream.pipe(res);
});

// 获取 token
app.post('/2b-auth/getToken', (req, res) => {
    console.log('getToken')
    res.setHeader('Access-Control-Allow-Origin', '*');
    setTimeout(() => {
        res.send({
            code: 100000,
            message: 'success',
            "data": {
                "empCode": "UF205102",
                "accessToken": "u_eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI0NDUxMzI2MjQ5NDcxMDE2OTciLCJzdWIiOiI2MzA1MTU0MzBiZDc1NGI1ZDEyODQ3MDQ4MTUwOWEwYjliZGI1MDBjZGE1Y2MwODE4ZDZmMTJjZmY5NGYxZTNiIiwiZXhwIjoxNzEzNTAxODExLCJKV1RfQ0xJRU5UX0lEIjoiYV81Yzc3OTU0Mi01OTU5LTRiNTgtODVlNS0yOWRhMDlhNWM3NzEiLCJKV1RfVVNFUl9MT0dJTl9NRVRIT0QiOiJESUQiLCJKV1RfVVNFUl9TT1VSQ0UiOiJ0b2JTb3VyY2UifQ.OaH7yTqHgkn6zUUBasdPsoKzmDLhW303e8ysDCHR3Ws",
                "userName": "wupei"
            }
        });
    }, 3000);
})

// 获取2b-auth登录 URL
app.get('/2b-auth/get2BauthLoginUrl', (req, res) => {
    console.log('get2BauthLoginUrl')
    res.setHeader('Access-Control-Allow-Origin', 'https://auth-i.bmwgroup.com.cn');
    setTimeout(() => {
        res.send({
            code: 100000,
            message: 'success',
            data: 'https://auth-i.bmwgroup.com.cn/auth/oauth2/realms/internetb2x/authorize?&client_id=7915ab3b-c6a9-4ed7-93df-ca0dc0c8e851&nonce=WenChinaPoC&scope=email%20openid%20profile%20phone%20address%20organization%20b2xroles%20bmwids&response_type=code&redirect_uri=https%3A%2F%2Fdmo2bauth-int-api.lingyue-digital.com%2Foauth2%2Flogin%2Fcallback%2Fwen&state=t_5755426191d76bf8f39906e90a606d863a5dd3d510b0f0380be4dfe90c4d0cab',
        });
    }, 3000)
})

app.get('/2b-auth/get2Bauthlogout', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    setTimeout(() => {
        res.send({
            code: '100000',
            message: 'success',
            data: "https://iam-saml-uat.bba-app.com/oam/server/logout?end_url=https://dmo2bauth-int-api.lingyue-digital.com/oauth2/logout/callback/did?state=t_8d491e52511a181824e00d6c2666339270f438deefc37655cce4a3591a93ecb5",
        })
    }, 3000)
})

 
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});