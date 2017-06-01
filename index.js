var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var pkg = require('./package.json');
var app = express();

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// 设置公共文件夹
app.use('/static', express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
    const data = {
        title: pkg.name,
        description: pkg.description
    };
    res.render('index', data);
});

app.post('/template/:name', function (req, res) {
    var data = req.body.data;
    data = JSON.parse(data)
    // console.log(data)
    // res.send(req.body)
    res.render('template/'+req.params.name, data);
});

app.listen(3000, () => {
    console.log('Listening at the port')
});
