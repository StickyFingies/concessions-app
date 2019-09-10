"use strict";

import express from "express";
import path from "path";

const app = express();

app.use(express.static("static"));

app.get("/status", (req, res) => {
	res.sendStatus(200);
});

app.use((req, res, next) => {
	res.sendStatus(404);
});

app.listen(8080, (err) => {
	if (err) {
		console.log(err);
		process.exit(1);
	}
});
