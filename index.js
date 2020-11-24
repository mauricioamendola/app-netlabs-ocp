var bodyParser = require('body-parser');
var path = require('path');


var express = require('express');
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '/web/')));

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');


var app_status = 1;


app.get('/', function (req, res) {
    if(app_status == 1){
        res.sendFile(path.join(__dirname + '/web/index.html'));
    }else{
        res.status(500);
        res.end()
    }
});

app.get('/version', function (req, res) {
    if(app_status == 1){
        res.send({version: "0.0.1"});
    }else{
        res.status(500);
        res.end()
    }
});

app.get('/metrics', function (req, res) {
    if(app_status == 1){
        res.send({nose: "que metricas quieren los pibes"});
    }else{
        res.status(500);
        res.end()
    }
});

app.get('/healthz', function (req, res) {
    if(app_status == 1){
        res.send({status: "ok"});
    }else if(app_status == 0){
        res.send({status: "loading"});
    }else{
        res.send({status: "bad"});
    }
});

app.post('/readyz/enable', function (req, res) {
    app_status = 1;
    res.send({status: "ok"});
});

app.post('/readyz/enable/:seconds', function (req, res) {
    app_status = 0;
    res.status(204);
    res.end()
    enable_app(req.params.seconds);
});

app.post('/readyz/disable', function (req, res) {
    app_status = -1;
    res.send({status: "bad"});
});

app.post('/echo', function (req, res) {
    if(app_status == 1){
        console.log(req);
        res.status(204);
        res.end()
    }else{
        res.status(500);
        res.end()
    }
});

app.get('/env', function (req, res) {
    if(app_status == 1){
        res.send(process.env);
    }else{
        res.status(500);
        res.end()
    }
});

app.get('/headers', function (req, res) {
    if(app_status == 1){
        res.send(req.headers);
    }else{
        res.status(500);
        res.end()
    }
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(8080, function () {
    console.log('Example app listening on port 3000!');
});

function enable_app(seconds) {
    setTimeout(() => {
        console.log(seconds);
        app_status = 1;
    }, seconds * 1000);
}
