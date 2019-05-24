'use strict';

var Hero = require('../models/heroes');
var Publisher = require('../models/publisher')


var heroController = {
    create: (req, res, next) => {
        var newHero = new Hero(req.body);

        if (!newHero.name || !newHero) {

            res.status(400).send({ error: true, message: 'Please provide a valid hero' });

        }
        else {
            Hero.createHero(newHero, function (err, hero) {

                if (err)
                    res.send(err);
                res.json(hero);
            });
        }

    },
    findAll: (req, res, next) => {
        Hero.getAllHeroes(function (err, heroes) {
            if (err) {
                res.send(err);
            }
            console.log(heroes);
            res.send(heroes);

        });
    },

    findById: (req, res, next) => {
        Hero.getHeroById(req.params.id, function (err, hero) {
             
            if (hero.length == 0) {

                res.send({
                    status: 'ok',
                    message: 'no rows matched'
                });
            }
            if (err)
                res.send(err);
            res.json(hero);

        });

    },

    update: (req, res, next) => {
        let newHero = new Hero(req.body);
        Hero.getHeroById(req.params.id, function (err, actualHero) {
            if (err)
                res.send(err);
            if (!newHero.name) {
                newHero.name = actualHero[0].name
            }
            if (!newHero.eye_color) {
                newHero.eye_color = actualHero[0].eye_color
            }
            if (!newHero.hair_color) {
                newHero.hair_color = actualHero[0].hair_color
            }
            if (!newHero.skin_color) {
                newHero.skin_color = actualHero[0].skin_color
            }
            if (!newHero.height) {
                newHero.height = actualHero[0].height
            }
            if (!newHero.weight) {
                newHero.weight = actualHero[0].weight
            }
            if (!newHero.publisher_id) {
                newHero.publisher_id = actualHero[0].publisher_id
            }
            if (!newHero.alignment_id) {
                newHero.alignment_id = actualHero[0].alignment_id
            }
            if (!newHero.gender_id) {
                newHero.gender_id = actualHero[0].gender_id
            }
            if (!newHero.race) {
                newHero.gender_id = actualHero[0].race
            }
            Hero.update(req.params.id, newHero, function (err, hero) {
                if (err)
                    res.send(err);
                res.json(hero);
            });


        });

    },

    delete: (req, res, next) => {
        Hero.remove(req.params.id, function (err, hero) {

            if (hero.fieldCount == 0) {

                res.send({
                    status: 'ok',
                    message: `no rows matched with id ${req.params.id}`
                });
            }
            
            else (err)
                res.send(err);
            res.json({ message: 'Hero successfully deleted' });
        });
    },

    findByparameters: (req, res, next) => {
        var params = {};
        if (req.query.name) {
            params.name = req.query.name;
        }
        if (req.query.race) {
            params.race = req.query.race;
        }
        if (req.query.publisher) {
            params.publisher = req.query.publisher;
        }
        if (req.query.hero_id) {
            params.hero_id = req.query.hero_id;
        }
        if (req.query.publisher_id) {
            params.publisher_id = req.query.publisher_id;
        }
        if (req.query.alignment_id) {
            params.alignment_id = req.query.alignment_id;
        }


        Hero.findByParameters(params, function (err, heroes) {
            if (err) {
                res.send(err);
            }
            else if (heroes.length == 0) {

                res.send({
                    status: 'ok',
                    message: 'no rows matched'
                });
            }

            res.send(heroes);

        })

    }
}

module.exports = heroController;
