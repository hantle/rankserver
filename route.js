var db = require('./mongo.js');
db.connect();

module.exports = function (app) {
    // home page
    app.get('/', function(req, res) {
        res.render("index", {title:"Rank Server"});
    });

    // 점수, 랭킹, 아이디, 나라, 날짜, 범위
    app.get('/ranks', function(req, res) {
        db.findAllRank(function(items) {
            // res.json(items);
            res.render('ranks', {items: items});
        });
    });

    app.get('/new', function(req, res) {
        console.log('new');
        res.render('new');
    });

    app.post('/rank', function(req, res) {
        var query = req.body;
        db.insertRank(query, function(item) {
            res.json({success : true});
        })
    });

}
