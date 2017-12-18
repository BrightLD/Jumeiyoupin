let express = require('express');
let fs = require('fs');
let bodyParser = require('body-parser');
let session = require('express-session');
let url = require('url');
let flashSales = require('./mock/flashSales');
let request = require('request');
let cheerio = require('cheerio');



//获取用户列表
function getUserList(cb) {
    fs.readFile('./mock/user.json', 'utf-8', (err, data) => {
        if (err) {
            return;
        }
        cb(data);
    })
}

//添加用户
function addUser(user, cb) {
    fs.readFile('./mock/user.json', 'utf-8', (err, data) => {
        let userList = JSON.parse(data);
        let isReg = userList.some(item => {
            return item.tel == user.tel
        });
        if (isReg) {
            cb && cb({code: 100, error: '该手机号已经被注册!'})
        } else {
            userList.push({
                tel: user.tel,
                password: user.password,
                userName: user.tel,
                address: ''
            });
            fs.writeFile('./mock/user.json', JSON.stringify(userList), function (err) {
                if (err) {
                    cb({
                        code: 100,
                        error: '服务器出错'
                    })
                } else {
                    cb && cb({
                        code: 200,
                        data: {
                            userName: user.tel,
                            tel: user.tel,
                            address: ''
                        }
                    })
                }
            })

        }
    })
}

//获取用户购物车列表
function getCartList(cb) {
    fs.readFile('./mock/cart.json', 'utf-8', (err, data) => {
        if (err) {
            return;
        }
        cb(data);
    })
}

//添加到购物车列表
function addCart(cart, userCart, cb) {
    fs.writeFile('./mock/cart.json', JSON.stringify(cart), function (err) {
        if (err) {
            cb && cb({
                code: 100,
                error: '添加失败，请稍后重试。'
            })
        } else {
            cb && cb(userCart)
        }
    })
}

function getHomeGoods(cb) {
    fs.readFile('./mock/homeGoods.json', 'utf8', function (err, data) {
        if (err) {
            res.send({code: 100, error: '获取商品列表失败'})
        } else {
            data = JSON.parse(data);
            cb && cb(data);
        }
    })
}

let app = express();
app.use(bodyParser.json());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'jumei'
}));


app.use(function (req, res, next) {
    //允许的来源
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    //允许客户端请求的方法
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
    //允许客户端发送的请求头
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    //允许客户端发送Cookie
    res.header('Access-Control-Allow-Credentials', 'true');
    //当客户端向服务器发post跨域的时候，会先发送options请求。如果服务器返回的响应头Access-Control-Allow-Methods里有POST的话，才会再次发送POST
    if (req.method == 'OPTIONS') {
        res.end()
    } else {
        next();
    }
    app.post('/api/login', (req, res) => {
        let {tel, password} = req.body;
        getUserList(userList => {
            userList = JSON.parse(userList);
            console.log(tel,password);
            let user = userList.find(item => {
                return item.tel == tel && item.password == password;
            });
            if (user) {
                res.send({
                    code: 200, data: {
                        tel:user.tel,
                        userName: user.userName,
                        address: user.address
                    }
                })
            } else {
                res.send({
                    code: 100,
                    error: '用户名或密码错误！'
                })
            }
        });
    });

    app.post('/api/signup', (req, res) => {
        let {tel, password} = req.body;

        getUserList(userList => {
            userList = JSON.parse(userList);


            if (userList.some(item => {
                    return item.tel == tel
                })) {
                res.send({
                    code: 100,
                    error: '该手机号已经被注册！'
                })
            } else {
                addUser({tel, password}, data => {
                    res.send(data);
                })
            }
        });
    });
    app.post('/api/cartlist', (req, res) => {
        let cart = req.body;
        let userCart;
        getCartList(data => {
            let cartList = JSON.parse(data);
            if (!cartList) cartList = [];
            cartList = cartList.map(item => {
                if (cart.tel == item.tel) {
                    return {
                        tel: cart.tel,
                        cartList: cart.data
                    };
                } else {
                    return item;
                }
            });

            userCart = cartList.find(item => item.tel == cart.tel);
            if (!userCart) {
                userCart = {
                    tel: cart.tel,
                    cartList: cart.data
                }
                cartList.push(userCart);
            }
            addCart(cartList, {code: 200, data: {tel:userCart.tel,data:userCart.cartList}}, data => res.send(data))
        });

    });
    app.get('/api/cartlist', (req, res) => {
        let query = url.parse(req.url, true).query;
        getCartList(data => {
            let cartList = JSON.parse(data);
            let userCart = cartList.find(item => {
                return item.tel == query.tel
            })
            if (!userCart) {
                userCart = {
                    tel: query.tel,
                    data: []
                };
                res.send({code: 200, data: []})

            } else {
                res.send({code: 200, data: userCart.cartList})
            }
        })
    });
    app.get('/api/tuan', (req, res) => {
        let {offset = 0, limit = 5} = url.parse(req.url, true).query;
        if (isNaN(offset) || isNaN(limit)) {
            res.send({
                code: 100,
                error: '请求参数错误！'
            })
        } else {
            code = 200;
        }
        if (parseFloat(offset) + parseFloat(limit) >= parseFloat(flashSales.count) - 1) {
            isMore = 0;

        } else {
            isMore = 1;
        }
        res.send({
            code,
            data: {
                isMore,
                list: flashSales.list.slice(parseFloat(offset), parseFloat(limit)+parseFloat(offset))
            }
        })
    });
    app.get('/api/gethomelist', (req, res) => {
        let {offset = 0, limit = 10} = url.parse(req.url, true).query;
        getHomeGoods(data => {
            if (parseFloat(offset) >= data.length) {
                res.send({
                    code: 100,
                    error: '没有更多数据了'
                })
            } else {
                let goodsList = data.slice(parseFloat(offset), parseFloat(limit) + parseFloat(offset));
                if (parseFloat(offset) + parseFloat(limit) >= data.length) {
                    res.send({
                        code: 200,
                        isMore: 0,
                        data: goodsList
                    })
                } else {
                    res.send({
                        code: 200,
                        isMore: 1,
                        data: goodsList
                    })
                }
            }
        })
    })
});


app.listen(3000, () => {
    console.log('Server is running At Port:3000')
});