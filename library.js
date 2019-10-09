
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

//5.HTML5 canvas  https://segmentfault.com/a/1190000016031115

//6.二级联动下拉框

//html 部分
<form name="lineandstation">
    线路选择:
        <select name="lines" id="lines" onchange="getStationName()">
        <option value="0">请选择线路</option>
    </select> 站点选择：
        <select name="station">
        <option value="0">请选择车站</option>
    </select>
</form>

//js部分
var lineNum = ["101", "102"];
var collect = document.getElementById("lines")
var old = collect.innerHTML
function aa() {
    var lineNu = " "
    for (var j = 0; j < lineNum.length; j++) {
        lineNu += '<option>' + lineNum[j] + '</option>';
    }
    collect.innerHTML = old + lineNu;
} //网页加载时执行此函数，为线路选择框动态添加选项      
aa();
var stationName = [
    ["百万庄西口", "百万庄中街", "百万庄东口", "展览路", "阜成门外", "阜成门", "阜成门内", "白塔寺", "西四路口东", "西安门", "北海", "故宫", "沙滩路口西", "美术馆东", "东四路口东", "朝内小街", "朝阳门内", "朝阳门外", "神路街", "东大桥路口东", "关东店", "呼家楼西", "小庄路口东", "红庙路口西", "红庙路口东"],
    ["动物园枢纽站", "二里沟", "百万庄", "甘家口大厦", "甘家口东", "阜外西口", "展览路", "阜成门外", "阜成门", "阜成门内", "白塔寺", "西四路口西", "缸瓦市", "甘石桥", "西单商场", "西单路口南", "宣武门内", "校场口", "菜市口北", "果子巷", "虎坊桥路口南", "太平街北口", "太平街", "陶然桥北", "永定门长途汽车站", "北京南站"]
];

function getStationName() {
    var line_num = document.lineandstation.lines;
    var station_name = document.lineandstation.station;
    var lineStation = stationName[line_num.selectedIndex - 1];
    station_name.length = 1;
    for (var i = 0; i < lineStation.length; i++) {
        station_name[i + 1] = new Option(lineStation[i], lineStation[i]);
    }
} //为站点选择框根据线路选择框的值动态添加选项

//7. 表单序列化方法
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
// 8.表单清空 
// 清空表单 （“addGoodsForm”是表单的id）
$("#addGoodsForm")[0].reset();