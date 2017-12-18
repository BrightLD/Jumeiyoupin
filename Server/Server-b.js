let express = require('express');
let fs = require('fs');
let bodyParser = require('body-parser');
let session = require('express-session');
let url = require('url');
let tuanTab = require('./mock/tuan');
let request = require('request');
let cheerio = require('cheerio');
let indexTab=require('./mock/indexTab')
//start
getHomePageData = (url, res) => {
    let defaltOption = {
        url: `http://m.jumei.com/index/ajaxDealactList?card_id=4057&client_v=1&page=${url.pages}&platform=wap&type=${url.type}&page_key=`,
        headers: {
            'Cookie': 'guide_download_show=1; newCash=1; search_start_time=1511327713081; m_vid=275119026; login_account_name=18838515639; default_site_25=bj; platform=wap; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22275119026%22%2C%22props%22%3A%7B%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%7D%2C%22first_id%22%3A%2215fd76762ab23b-084d15e73ac3e7-574e6e46-181760-15fd76762ad2cf%22%7D; _adwp=265569940.5582040900.1511147264.1511694264.1513432541.17; _adwr=265569940%23https%253A%252F%252Fcn.bing.com%252F; Hm_lvt_884477732c15fb2f2416fb892282394b=1511553778,1511692283,1511694265,1513432541; __utma=1.799079340.1511147265.1511694265.1513432542.17; __utmz=1.1513432542.17.6.utmcsr=cn.bing.com|utmccn=(referral)|utmcmd=referral|utmcct=/; __xsptplus428=428.20.1513432541.1513432541.1%233%7Ccn.bing.com%7C%7C%7C%7C%23%23DyLcCPxSa_KWyYZAwH30fEgfUnp5_NgI%23; frwap=wap; has_download=1; referer_site_cps=wap_touch_; PHPSESSID=6b020da7fb5e9fc82e2de1be5bd1b0b3; sid=6b020da7fb5e9fc82e2de1be5bd1b0b3; route=6cf9ffe4014f0bf241681c1db92a3674; jmdl14=2; jml14=2; from_source=browser; referer_site=wap_browser_wap_touch_; device_platform=iphone',
        }
    }
    request(defaltOption, (error, response, body) => {
        if (error) {
            console.error(error);
        } else {
            if (response.statusCode === 200) {
                res.send(JSON.parse(body));
            }
        }
    })

}
//极速免税店
getQuicklyPageData = (url, res) => {
    let quickDataAry = [];
    let defaltOption = {
        url: url,
        headers: {
            'Cookie': 'PHPSESSID=34744d05e485926752e0cff2319fbdc5; sid=34744d05e485926752e0cff2319fbdc5; referer_site_cps=wap_touch_; guide_download_show=1; has_download=1; route=cde0bab1ca5d5fe56de9c535976cc76c; platform=wap; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2215fd987ff88134-0116467183e49b-574e6e46-250125-15fd987ff896eb%22%7D; sensorsdata_is_new_user=true; jmdl14=2; jml14=2; from_source=browser; referer_site=wap_browser_wap_touch_; device_platform=other; Hm_lvt_884477732c15fb2f2416fb892282394b=1511170878,1511171523,1511182486,1511183438; Hm_lpvt_884477732c15fb2f2416fb892282394b=1511183438',
        }
    }
    request(defaltOption, (error, response, body) => {
        if (error) {
            console.error(error);
        } else {
            if (response.statusCode === 200) {
                let $ = cheerio.load(body);
                quickDataAry.push($('.deals-icon').find('li').map(function (index, item) {
                    return {
                        icon_imgSrc: $(this).find('img').attr('src'),
                        icon_text: $(this).find('.deals-text').text(),
                        icon_href: 'http://m.jumei.com/' + $(this).find('a').attr('href')
                    }
                }).toArray());
                quickDataAry.push($('.touch-activity-detail').find('li').map(function () {
                    return {
                        quickTageImgSrc: $(this).find('.product-label.haitaoy-label.lazy-load').attr('data-url'),
                        quickImgSrc: $(this).find('.lazy-load.deal-img').attr('data-url'),
                        quick_name: $(this).find('.product-name').text(),
                        quick_new_price: $(this).find('.activity-jumei-price').find('.price').text().replace(/<span>|<\/span>/g, ''),
                        quick_old_price: $(this).find('.activity-jumei-price').find('.old').text()
                    }
                }).toArray());
            }
            res.send(JSON.stringify(quickDataAry));
        }

    })

}
//母婴
getBabyPageData = (url, res) => {
    let babyDataAry = [];
    let defaltOption = {
        url: 'http://m.jumei.com/luxury/index',
        headers: {
            'Cookie': 'PHPSESSID=34744d05e485926752e0cff2319fbdc5; sid=34744d05e485926752e0cff2319fbdc5; referer_site_cps=wap_touch_; guide_download_show=1; has_download=1; route=cde0bab1ca5d5fe56de9c535976cc76c; platform=wap; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2215fd987ff88134-0116467183e49b-574e6e46-250125-15fd987ff896eb%22%7D; sensorsdata_is_new_user=true; jmdl14=2; jml14=2; from_source=browser; referer_site=wap_browser_wap_touch_; device_platform=other; Hm_lvt_884477732c15fb2f2416fb892282394b=1511170878,1511171523,1511182486,1511183438; Hm_lpvt_884477732c15fb2f2416fb892282394b=1511183438',
        }
    }
    request(defaltOption.url, (error, response, body) => {
        if (error) {
            console.error(error);
        } else {
            if (response.statusCode === 200) {
                let $ = cheerio.load(body);
                babyDataAry.push($('#card_id').attr('value'));
                babyDataAry.push($('.list-items').map(function () {
                    let newAry = [];
                    newAry.push($(this).find('.metra-list.change-schame').map(function () {
                        return $(this).find('img').attr('src');
                    }).toArray())
                    return newAry;
                }).toArray());
                request('http://m.jumei.com/muandbaby/ajaxList?page=' + url.pages + '&card_id=' + $('#card_id').attr('value'), (error, response, body) => {
                    if (error) {
                        console.error(error);
                    } else {
                        if (response.statusCode === 200) {
                            let newAry = [], newObj = {};
                            newAry.push(body);
                            babyDataAry.push(newAry);
                            res.send(JSON.stringify(babyDataAry));
                        }
                    }
                })
            }
        }

    })

}
//轻奢
getLuxuryPageData = (url, res) => {
    let LuxuryDataAry = [];
    let defaltOption = {
        url: `http://m.jumei.com/luxury/index`,
        headers: {
            'Cookie': 'PHPSESSID=34744d05e485926752e0cff2319fbdc5; sid=34744d05e485926752e0cff2319fbdc5; referer_site_cps=wap_touch_; guide_download_show=1; has_download=1; route=cde0bab1ca5d5fe56de9c535976cc76c; platform=wap; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2215fd987ff88134-0116467183e49b-574e6e46-250125-15fd987ff896eb%22%7D; sensorsdata_is_new_user=true; jmdl14=2; jml14=2; from_source=browser; referer_site=wap_browser_wap_touch_; device_platform=other; Hm_lvt_884477732c15fb2f2416fb892282394b=1511170878,1511171523,1511182486,1511183438; Hm_lpvt_884477732c15fb2f2416fb892282394b=1511183438',
        }
    }
    request(defaltOption.url, (error, response, body) => {
        if (error) {
            console.error(error);
        } else {
            if (response.statusCode === 200) {
                let $ = cheerio.load(body);
                let obj = {}, ary;
                LuxuryDataAry.push($('#card_id').attr('value'));
                LuxuryDataAry.push($('.list-items').map(function () {
                    let newAry = {};
                    newAry['columns'] = $(this).find('.items-title').find('span:nth-child(2)').text() || 'middleNav';
                    newAry['columnsData'] = $(this).find('.metra-list.change-schame').map(function () {
                        return {
                            href: $(this).attr('href'),
                            iconImgSrc: $(this).find('img').attr('src')
                        }
                    }).toArray();
                    return newAry;
                }).toArray());
                ary = ($('.banner_img').map(function () {
                    return {
                        sliderUrl: $(this).attr('href'),
                        sliderImgSrc: $(this).find('img').attr('src')
                    }

                }).toArray());
                obj['slidersData'] = ary;
                LuxuryDataAry.push(obj);
                request('http://m.jumei.com/luxury/ajaxList?page=1&card_id=' + $('#card_id').attr('value'), (error, response, body) => {
                    if (error) {
                        console.error(error);
                    } else {
                        if (response.statusCode === 200) {
                            let newAry = [];
                            newAry.push(body);
                            LuxuryDataAry.push(newAry);
                            console.log(LuxuryDataAry[1][0].columnsData);
                            res.send(JSON.stringify(LuxuryDataAry));
                        }
                    }
                })
            }
        }

    })

}
//名品
getPopPageData = (count, res) => {
    console.log(1);
    let PopDataAry = [];
    let defaltOption = {
        count: count || 1,
        headers: {
            'Cookie': 'referer_site_cps=wap_touch_; guide_download_show=1; has_download=1; platform=wap; from_source=browser; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2215fd987ff88134-0116467183e49b-574e6e46-250125-15fd987ff896eb%22%2C%22props%22%3A%7B%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%7D%7D; default_site_25=bj; Hm_lvt_884477732c15fb2f2416fb892282394b=1511171523,1511182486,1511183438,1501658042; cookie_uid=548163c4231511249360; _adwp=265569940.2092514268.1501659487.1501659487.1501659487.1; _adwr=265569940%230; __utmz=1.1501659488.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utma=1.1165828099.1501659488.1501659488.1501659488.2; __xsptplus428=428.1.1501659487.1501659487.1%234%7C%7C%7C%7C%7C%23%23IpcmJjdEa8yjPgNVPXkyfY17LbRb4ZwA%23; newCash=1; PHPSESSID=f4c1ad5b62c71ac7d130bb232c84d002; jmdl14=2; jml14=2; close_down_banner=1511360720043; sid=f4c1ad5b62c71ac7d130bb232c84d002; route=25cdabaf22fa7345f80ba1a695a3f319; referer_site=wap_browser_wap_touch_; jump_info=%7B%22com.jumei.iphone%22%3A%7B%22jumeimallUrl%22%3A%22jumeimall%253A%252F%252Fpage%252Fcard%252Findex%253Fpageflag%253Dpop%22%7D%7D; device_platform=iphone\',str2=\'referer_site_cps=wap_touch_; guide_download_show=1; has_download=1; platform=wap; from_source=browser; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2215fd987ff88134-0116467183e49b-574e6e46-250125-15fd987ff896eb%22%2C%22props%22%3A%7B%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%7D%7D; default_site_25=bj; Hm_lvt_884477732c15fb2f2416fb892282394b=1511171523,1511182486,1511183438,1501658042; cookie_uid=548163c4231511249360; _adwp=265569940.2092514268.1501659487.1501659487.1501659487.1; _adwr=265569940%230; __utmz=1.1501659488.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utma=1.1165828099.1501659488.1501659488.1501659488.2; __xsptplus428=428.1.1501659487.1501659487.1%234%7C%7C%7C%7C%7C%23%23IpcmJjdEa8yjPgNVPXkyfY17LbRb4ZwA%23; newCash=1; PHPSESSID=f4c1ad5b62c71ac7d130bb232c84d002; jmdl14=2; jml14=2; close_down_banner=1511360720043; sid=f4c1ad5b62c71ac7d130bb232c84d002; route=25cdabaf22fa7345f80ba1a695a3f319; referer_site=wap_browser_wap_touch_; jump_info=%7B%22com.jumei.iphone%22%3A%7B%22jumeimallUrl%22%3A%22jumeimall%253A%252F%252Fpage%252Fcard%252Findex%253Fpageflag%253Dpop%22%7D%7D; device_platform=iphone',
        }
    }
    request(`http://m.jumei.com/pop/ajaxGetList?page=${defaltOption.count}&item_per_page=20`, (error, response, body) => {
        if (error) {
            console.error(error);
        } else {
            if (response.statusCode === 200) {
                let newAry = [];
                newAry.push(body);
                PopDataAry.push(newAry);
                console.log(PopDataAry);
                res.send(JSON.stringify(PopDataAry));
            }
        }
    })

};
/*let express = require('express');
let app = express();*/
getSearchNavData = (res) => {
    let defaltOption = {
        url: `http://m.jumei.com/index/requestDelegate?url=http://mobile.jumei.com/msapi/mall/allcategories.json`,
        headers: {
            'Cookie': 'PHPSESSID=34744d05e485926752e0cff2319fbdc5; sid=34744d05e485926752e0cff2319fbdc5; referer_site_cps=wap_touch_; guide_download_show=1; has_download=1; route=cde0bab1ca5d5fe56de9c535976cc76c; platform=wap; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2215fd987ff88134-0116467183e49b-574e6e46-250125-15fd987ff896eb%22%7D; sensorsdata_is_new_user=true; jmdl14=2; jml14=2; from_source=browser; referer_site=wap_browser_wap_touch_; device_platform=other; Hm_lvt_884477732c15fb2f2416fb892282394b=1511170878,1511171523,1511182486,1511183438; Hm_lpvt_884477732c15fb2f2416fb892282394b=1511183438',
        }
    }
    request(defaltOption, (error, response, body) => {
        console.log('body',body)
        if (error) {
            console.error(error);
        } else {
                if (response.statusCode === 200) {
                res.send(JSON.parse(body));
            }
        }
    })

};
//end
getNavDetail=(url,res)=>{
    let defaltOption = {
        url: `http://m.jumei.com/search/index?category_id=${url.category_id}&category_name=${url.name}&page=${url.pages}&ajax=get`,
        headers: {
            'Cookie': 'PHPSESSID=34744d05e485926752e0cff2319fbdc5; sid=34744d05e485926752e0cff2319fbdc5; referer_site_cps=wap_touch_; guide_download_show=1; has_download=1; route=cde0bab1ca5d5fe56de9c535976cc76c; platform=wap; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2215fd987ff88134-0116467183e49b-574e6e46-250125-15fd987ff896eb%22%7D; sensorsdata_is_new_user=true; jmdl14=2; jml14=2; from_source=browser; referer_site=wap_browser_wap_touch_; device_platform=other; Hm_lvt_884477732c15fb2f2416fb892282394b=1511170878,1511171523,1511182486,1511183438; Hm_lpvt_884477732c15fb2f2416fb892282394b=1511183438',
        }
    }
    request(defaltOption, (error, response, body) => {
        console.log('body',body)
        if (error) {
            console.error(error);
        } else {
            if (response.statusCode === 200) {
                res.send(JSON.parse(body));
            }
        }
    })
}

getGoodsStaticDetail=(url,res)=>{
    let defaltOption = {
        url: `http://m.jumei.com/yiqituan/ajaxDetail?item_id=${url.item_id}&type=${url.type}&tid=`,
        headers: {
            'Cookie': 'PHPSESSID=34744d05e485926752e0cff2319fbdc5; sid=34744d05e485926752e0cff2319fbdc5; referer_site_cps=wap_touch_; guide_download_show=1; has_download=1; route=cde0bab1ca5d5fe56de9c535976cc76c; platform=wap; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2215fd987ff88134-0116467183e49b-574e6e46-250125-15fd987ff896eb%22%7D; sensorsdata_is_new_user=true; jmdl14=2; jml14=2; from_source=browser; referer_site=wap_browser_wap_touch_; device_platform=other; Hm_lvt_884477732c15fb2f2416fb892282394b=1511170878,1511171523,1511182486,1511183438; Hm_lpvt_884477732c15fb2f2416fb892282394b=1511183438',
        }
    }
    request(defaltOption, (error, response, body) => {
        console.log('body',body)
        if (error) {
            console.error(error);
        } else {
            if (response.statusCode === 200) {
                res.send(JSON.parse(body));
            }
        }
    })
}

//获取用户列表
/*function getUserList(cb) {
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
}*/
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
   /* res.header('Access-Control-Allow-Origin', 'http://localhost:8080');*/
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
//获取首页数据,pages为获取第几页的数据
    app.get('/home', (req, res) => {
        let {pages}=url.parse(req.url,true).query;
        getHomePageData({
            pages: pages,
            type: 'pre'
        }, res);

    });
});
app.get('/quickly', (req, res) => {
    getQuicklyPageData('http://m.jumei.com/global/deals', res);
});
app.get('/baby', (req, res) => {
    getBabyPageData('http://m.jumei.com/muandbaby/index', res);
});
app.get('/luxury', (req, res) => {
    let {pages}=url.parse(req.url,true).query;
    getLuxuryPageData({pages}, res);
});
app.get('/pop', (req, res) => {
    let {pages}=url.parse(req.url,true).query;
    getPopPageData(pages, res);
});

app.get('/getsearchnav',(req,res)=>{
    console.log('a')

    getSearchNavData(res);
})
app.get('/getnavdetail',(req,res)=>{
    //需要category_id,name,pages
    let query=url.parse(req.url,true).query;

    getNavDetail(query,res);
})
app.get('/getstaticdetail',(req,res)=>{
    //item_id,type
    let query=url.parse(req.url,true).query;

    getGoodsStaticDetail(query,res);
})

//推荐
app.post('/pintuan/recommend', (req, res) => {
    request(`http://s.h5.jumei.com/yiqituan/tab_list?tab=coutuan_home&page=${req.query.pages}&per_page=20`,(error,response,body)=>{
        if(error){
            console.log(error);
        }else {
            if(response.statusCode===200){
                res.send(body);
            }
        }
    })
});
app.post('/pintuan/mbaby', (req, res) => {
    request(`http://s.h5.jumei.com/yiqituan/tab_list?tab=coutuan_baby&page=${req.query.pages}&per_page=20`,(error,response,body)=>{
        if(error){
            console.log(error);
        }else {
            if(response.statusCode===200){
                res.send(body);
            }
        }
    })
});
app.post('/pintuan/foods', (req, res) => {
    request(`http://s.h5.jumei.com/yiqituan/tab_list?tab=coutuan_food&page=${req.query.pages}&per_page=20`,(error,response,body)=>{
        if(error){
            console.log(error);
        }else {
            if(response.statusCode===200){
                res.send(body);
            }
        }
    })
});
app.post('/pintuan/underwear', (req, res) => {
    request(`http://s.h5.jumei.com/yiqituan/tab_list?tab=coutuan_underwear&page=${req.query.pages}&per_page=20`,(error,response,body)=>{
        if(error){
            console.log(error);
        }else {
            if(response.statusCode===200){
                res.send(body);
            }
        }
    })
});
app.post('/pintuan/furniture', (req, res) => {
    request(`http://s.h5.jumei.com/yiqituan/tab_list?tab=coutuan_furniture&page=${req.query.pages}&per_page=20`,(error,response,body)=>{
        if(error){
            console.log(error);
        }else {
            if(response.statusCode===200){
                res.send(body);
            }
        }
    })
});
app.post('/pintuan/makeup', (req, res) => {
    request(`http://s.h5.jumei.com/yiqituan/tab_list?tab=coutuan_makeup&page=${req.query.pages}&per_page=20`,(error,response,body)=>{
        if(error){
            console.log(error);
        }else {
            if(response.statusCode===200){
                res.send(body);
            }
        }
    })
});
app.post('/pintuan/jewellery', (req, res) => {
    request(`http://s.h5.jumei.com/yiqituan/tab_list?tab=coutuan_jewellery&page=${req.query.pages}&per_page=20`,(error,response,body)=>{
        if(error){
            console.log(error);
        }else {
            if(response.statusCode===200){
                res.send(body);
            }
        }
    })
});
app.post('/pintuan/3c', (req, res) => {
    request(`http://s.h5.jumei.com/yiqituan/tab_list?tab=coutuan_3c&page=${req.query.pages}&per_page=20`,(error,response,body)=>{
        if(error){
            console.log(error);
        }else {
            if(response.statusCode===200){
                res.send(body);
            }
        }
    })
});
app.post('/pintuan/ladies', (req, res) => {
    request(`http://s.h5.jumei.com/yiqituan/tab_list?tab=coutuan_ladies&page=${req.query.pages}&per_page=20`,(error,response,body)=>{
        if(error){
            console.log(error);
        }else {
            if(response.statusCode===200){
                res.send(body);
            }
        }
    })
});
app.post('/pintuan/shose', (req, res) => {
    request(`http://s.h5.jumei.com/yiqituan/tab_list?tab=coutuan_shose&page=${req.query.pages}&per_page=20`,(error,response,body)=>{
        if(error){
            console.log(error);
        }else {
            if(response.statusCode===200){
                res.send(body);
            }
        }
    })
});
app.post('/pintuan/bag', (req, res) => {
    request(`http://s.h5.jumei.com/yiqituan/tab_list?tab=coutuan_bag&page=${req.query.pages}&per_page=20`,(error,response,body)=>{
        if(error){
            console.log(error);
        }else {
            if(response.statusCode===200){
                res.send(body);
            }
        }
    })
});
app.post('/pintuan/sports', (req, res) => {
    request(`http://s.h5.jumei.com/yiqituan/tab_list?tab=coutuan_sports&page=${req.query.pages}&per_page=20`,(error,response,body)=>{
        if(error){
            console.log(error);
        }else {
            if(response.statusCode===200){
                res.send(body);
            }
        }
    })
});
app.post('/pintuan/pre', (req, res) => {
    request(`http://s.h5.jumei.com/yiqituan/tab_list?tab=coutuan_pre&page=${req.query.pages}&per_page=20`,(error,response,body)=>{
        if(error){
            console.log(error);
        }else {
            if(response.statusCode===200){
                res.send(body);
            }
        }
    })
});
app.get('/tuantab',(req,res)=>{
    res.send(tuanTab);
});
app.get('/indextab',(req,res)=>{
    res.send(indexTab);
})
app.get('/tuan-detail',(req,res)=>{
    res.send(indexTab);
})
app.listen(3030, () => {
    console.log('Server is running At Port:3000')
});