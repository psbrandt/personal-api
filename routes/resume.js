var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var coll = req.database.collection('resume');

    coll.findOne({_id: "resume"}, function(er, result) {
        res.send(result);
    });
});

module.exports = router;
