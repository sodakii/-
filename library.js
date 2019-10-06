
// 1.为原型对象添加format 方法用于格式化后台传输的日期
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
// 用法 return new Date(需要格式化的代码).format("yyyy-MM-dd hh:mm:ss")


// 2.分割字符串方法 
var string = '2019.10.05'
string.slice(1, -1)

// 3.关于axios 的使用 

//执行 GET 请求

// 向具有指定ID的用户发出请求
axios.get('/user?ID=12345')
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
// 也可以通过 params 对象传递参数
axios.get('/user', {
    params: {
        ID: 12345
    }
})
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

//执行 POST 请求
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
})
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

//执行多个并发请求
function getUserAccount() {
    return axios.get('/user/12345');
}
function getUserPermissions() {
    return axios.get('/user/12345/permissions');
}
axios.all([getUserAccount(), getUserPermissions()])
    .then(axios.spread(function (acct, perms) {
        //两个请求现已完成
    }));
// 详情地址  https://ykloveyxk.github.io/2017/02/25/axios%E5%85%A8%E6%94%BB%E7%95%A5/#more


//4.ES6 新特性  https://juejin.im/post/5ca2e1935188254416288eb2#heading-16