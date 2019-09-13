"use strict";

const express = require("express");
const mongodb = require("mongodb");

const app = express();

let MongoClient = mongodb.MongoClient;
const url = "mongodb+srv://admin:iygVjlrACQVOPTOs@cluster0-vc0nb.mongodb.net/test?retryWrites=true&w=majority";

let concessionsDb = {};

MongoClient.connect(url, (err, db) => {
    if (err) throw err;

    concessionsDb = db;
});

app.use(express.static("app"));

app.get("/menu", (req, res) => {
    let dbo = concessionsDb.db("lths_concessions_app");

    let foodQuery  = { type: 0 };
    let drinkQuery = { type: 1 };
    let candyQuery = { type: 2 };

    let menuItems = {"food": [], "drinks": [], "candy": []};

    dbo
        .collection("menu_items")
        .find(foodQuery)
        .toArray((err, result) => {
            if (err) throw err;

            for (let item of result) {
                menuItems.food.push({
                    "name": item.name,
                    "price": item.price
                });
            }

            dbo
                .collection("menu_items")
                .find(drinkQuery)
                .toArray((err, result) => {
                    if (err) throw err;

                    for (let item of result) {
                        menuItems.drinks.push({
                            "name": item.name,
                            "price": item.price
                        });
                    }

                    dbo
                        .collection("menu_items")
                        .find(candyQuery)
                        .toArray((err, result) => {
                            if (err) throw err;

                            for (let item of result) {
                                menuItems.candy.push({
                                    "name": item.name,
                                    "price": item.price
                                });
                            }

                            res.json(menuItems);
                        });
                });
        });
});

app.use((req, res, next) => {
	res.sendStatus(404);
});

app.listen((process.env.PORT || 8080), (err) => {
	if (err) {
		console.log(err);
		process.exit(1);
	}
});