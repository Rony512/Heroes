var Publisher = require('../models/publisher')



//Hero object constructor
var Hero = function (hero) {
    this.name = hero.name
    this.eye_color = hero.eye_color
    this.hair_color = hero.hair_color
    this.skin_color = hero.skin_color
    this.height = hero.height
    this.weight = hero.weight
    this.race = hero.race
    this.publisher_id = hero.publisher_id
    this.gender_id = hero.gender_id
    this.alignment_id = hero.alignment_id

};

Hero.createHero = function createHero(newHero, result) {

    db.query("INSERT INTO hero_information set ?", newHero, function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res);
            result(null, res);
        }
    });
};

Hero.getHeroById = function getHero(heroId, result) {
    db.query("Select * from hero_information where hero_id = ? ", heroId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};


Hero.getAllHeroes = function getAllHeroes(result) {
    db.query("Select * from hero_information", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('heroes : ', res);
            result(null, res);
        }
    });
};

Hero.update = function (id, hero, result) {
    db.query("UPDATE hero_information SET name = ?, eye_color = ?,hair_color=?, skin_color=?, height = ?, weight= ?, publisher_id=?,gender_id=?,alignment_id=?, race=?   WHERE hero_id = ?", [hero.name, hero.eye_color, hero.hair_color, hero.skin_color, hero.height, hero.weight, hero.publisher_id, hero.gender_id, hero.alignment_id, hero.race, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
Hero.remove = function (id, result) {
    db.query("DELETE FROM hero_information WHERE hero_id = ?", [id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {

            result(null, res);
        }
    });
};

Hero.findByParameters = function (parameters, result) {
    queryString = "Select * from hero_information";
    paramsCounter = 0;
    params = [];

    if (parameters.publisher_id) {

        if (paramsCounter == 0) {
            queryString = queryString.concat(" WHERE publisher_id = ?");
            params.push(parameters.publisher_id);
        }
        else {

            queryString = queryString.concat(" AND publisher_id = ?");
            params.push(parameters.publisher_id);
        }

        paramsCounter++
    }


    if (parameters.name) {
        if (paramsCounter == 0) {
            queryString = queryString.concat(" WHERE name = ?");
            params.push(parameters.name);
        }
        else {
            queryString = queryString.concat(" AND name = ?");
            params.push(parameters.name);
        }

        paramsCounter++
    };

    if (parameters.race) {
        if (paramsCounter === 0) {
            queryString = queryString.concat(" WHERE race = ?");
            params.push(parameters.race);
        }
        else {
            queryString = queryString.concat(" AND race = ?");
            params.push(parameters.race);
        }

        paramsCounter++
    }
    if (parameters.hero_id) {
        if (paramsCounter === 0) {
            queryString = queryString.concat(" WHERE hero_id = ?");
            params.push(parameters.hero_id);
        }
        else {
            queryString = queryString.concat(" AND hero_id = ?");
            params.push(parameters.hero_id);
        }
    
        paramsCounter++
    }

    if (parameters.alignment_id) {
        if (paramsCounter === 0) {
            queryString = queryString.concat(" WHERE alignment_id = ?");
            params.push(parameters.alignment_id);
        }
        else {
            queryString = queryString.concat(" AND alignment_id = ?");
            params.push(parameters.alignment_id);
        }
    
        paramsCounter++
    }

    db.query(queryString, params, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {

            result(null, res);
        }
    });
}

module.exports = Hero;