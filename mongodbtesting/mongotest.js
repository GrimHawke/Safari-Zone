var MongoClient = require('mongodb').MongoClient;
var player = "ABC"

var myCollection;
var db = MongoClient.connect('mongodb://test1:test1@ds113628.mlab.com:13628/safarizonedb', function(err, db) {
    if(err) { return console.dir(err); }

    console.log("connected to the mongoDB !");

    myCollection = db.collection('scores');

    var cursor = myCollection.find({"name" : player});

    cursor.each(function(err, doc) {
        if(err)
            throw err;
        if(doc==null)
            return;

        console.log("document find:");
        console.log(doc.name);
    });

    /**
    myCollection.insert({name: "ABC", score: 5000, date: new Date().getTime()/1000}, function(err, result) {
      if(err)
          throw err;

      console.log("entry saved");
    });

    myCollection.insert({name: "ABC", score: 4000, date: new Date().getTime()/1000-10000}, function(err, result) {
      if(err)
          throw err;

      console.log("entry saved");
    });

    myCollection.insert({name: "BCD", score: 7500, date: new Date().getTime()/1000-25000}, function(err, result) {
      if(err)
          throw err;

      console.log("entry saved");
    });

    /**
    myCollection.findAndModify({name: "doduck"}, [], {remove:true}, function(err, object) {
      if(err)
          throw err;
      console.log("document deleted");
    });

    myCollection.insert({name: "doduck", description: "learn more than everyone"}, function(err, result) {
      if(err)
          throw err;

      console.log("entry saved");
    });

    var cursor = myCollection.find({"name" : "doduck"});
    cursor.each(function(err, doc) {
        if(err)
            throw err;
        if(doc==null)
            return;

        console.log("document find:");
        console.log(doc.name);
    });
    **/

});
