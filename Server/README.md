#### 后台接口
**登录**

url:'/api/login'

method:'post'

data:{

    tel:13333333333,
    password:'test'
   
}

返回的数据

成功：

{
    code:200,
    
    data:{
        userName:'test',
        tel:13333333333,
        address:'北京市昌平区回龙观东大街珠峰培训'
    }
    
}

失败：

{

    code:100,
    error:'用户名或密码错误'
    
}

**注册**

url:'/api/signup'

method:'post',

data:{

    tel:13333333333,
    password:'test'
    
}

返回的数据

成功：

{

    code:200,
    data:{
        userName:'test',
        tel:13333333333,
        address:'北京市昌平区回龙观东大街珠峰培训'
    }
    
}

失败：

{

    code:100,
    error:'该手机号已经被注册！'
    
}

**获取购物车列表**

url:'/api/cartList'

method:'get'

data:{
    
    tel:13333333333
    
}

返回的数据

成功：

{

    code:200,
    
    data:[
        
        {id:1,title:'意大利款中空男鞋',style:'洒红色 40',count:1,price:35,initPrice:35},
        {id:1,title:'意大利款中空男鞋',style:'洒红色 40',count:1,price:35,initPrice:55}
        
    ]

}

失败：

{

    code:100,
    
    error:'异常！请联系网站管理员处理。'

}


**添加到购物车**

url:'/api/cartlist'

method:'post'

data:{
    
    tel:13333333333,
    
    data:[
    
      {id:'0',title:'意大利款中空男鞋',style:'洒红色 40',count:1,price:35,initPrice:35},
      {id:'0',title:'意大利款中空男鞋',style:'洒红色 40',count:1,price:35,initPrice:55}
    
    ]
    
}

返回的数据

成功：

{

    code:200,
    
    list:[
        
        {id:0,title:'意大利款中空男鞋',style:'洒红色 40',count:1,price:35},
        {id:0,title:'意大利款中空男鞋',style:'洒红色 40',count:1,price:35}
        
    ]

}


失败：

{

    code:100,
    
    error:'添加失败，请稍后重试。'

}

**获取拼团商品列表**

url:'/api/tuan',

method:'get',

data:{

    offset:0,
    limit:5

}

返回的数据：

成功：

{

code:200,

data:{

    isMore:1, //isMore的值为1代表还可以继续获取数据，0代表不能获取更多数据了
    
    list: [
          
          {
          
                      id: 1,
                      url: 'http://******',
                      comments: 345,
                      title: '【手机专享】40片装暖贴暖宝宝贴暖身贴发热贴',
                      price: {
                          prezhe: 45.00,
                          afterzhe: 42.00,
                          tuan: 35.00
                      }
                  },
                  
                  {
                      id: 2,
                      url: 'http:/******',
                      comments: 345,
                      title: '【手机专享】40片装暖贴暖宝宝贴暖身贴发热贴',
                      price: {
                          prezhe: 45.00,
                          afterzhe: 42.00,
                          tuan: 35.00
                      }
                  }
                  
          ]

}

}

失败：
{

    code:100,
    
    error:'请求参数错误！'

}

**获取首页商品列表**

url:'/api/gethomelist'

method:'get'

data:{

    offset:0

    limit:5

}

返回的数据：

成功：

{

    code:200,
    
    isMore:0,  //0代表没有更多的数据了，1代表还有更多的数据可以获取
    
    data:[
        
        {
            id:0,
            price:'156', //当前价格
            initPrice:'240', //原价
            img:'http://****', //图片地址
            title:'AGE20'S牛奶遮瑕气垫粉底膏，透亮嫩白到尖叫！',//商品标题
            commentsCount:123 //评论条数
        }
        
    ]
    
}

失败：

{

    code:100,
    
    error:'获取商品列表失败！'

}