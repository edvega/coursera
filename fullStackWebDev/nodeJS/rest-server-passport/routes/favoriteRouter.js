var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorites');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());
var Verify = require('./verify');

favoriteRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.find({})
        .populate('postedBy')
        .populate('dishes')
        .exec(function (err, favorite) {
        if (err) throw err;
        res.json(favorite);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.findOne({postedBy: req.decoded._doc._id}, function (err, favorite) {
        if (err) throw err;
        if (favorite) {
            if (favorite.dishes.indexOf(req.body._id) === -1) {
                favorite.dishes.push(req.body._id);
                favorite.save(function (err, favorite) {
                    if (err) throw err;
                    console.log(favorite);
                });
            }
            res.json(favorite);
        } else {
            Favorites.create({postedBy: req.decoded._doc._id,
                dishes: req.body._id}, function (err, favorite) {
                console.log(favorite);
                if (err) throw err;
                res.json(favorite);
            });   
        }
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Favorites.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

favoriteRouter.route('/:dishId')
.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.findOne({postedBy: req.decoded._doc._id}, function (err, favorite) {
        if (err) throw err;
        if (favorite) {
            var i = favorite.dishes.indexOf(req.params.dishId);
            if (i != -1) {
                favorite.dishes.splice(i, 1);
                favorite.save(function (err, favorite) {
                    if (err) throw err;
                    console.log(favorite);
                });
            }
            res.json(favorite);
        } else {
            res.json(favorite);   
        }
    });
});

module.exports = favoriteRouter;