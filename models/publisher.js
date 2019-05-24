//Publisher object constructor
var Publisher = function (publisher) {
    this.publisher_name = publisher.publisher_name

};

Publisher.getAllPublisher = function getAllPublisher(result) {
    db.query("Select * from publisher", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

Publisher.getByName = function getPublisher(name, result) {
    db.query("Select * from publisher where publisher_name = ?",name, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else if (res.length == 0) {

            result(null, "message: hero dont exists")
        }
        else {
            result(null, res);

        }
    });
};


module.exports = Publisher;