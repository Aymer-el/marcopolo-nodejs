import express from "express";
import path from "path";
import cors from "cors";
import logger from "morgan";
import dotenv from "dotenv";
import router from './src/routes.js';
import { config } from "dotenv";
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

config({ path: path.join(".env" + (process.env.NODE_ENV || "")) });

dotenv.config({ path: path.join(".env" + (process.env.NODE_ENV || "")) });
const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
  })
);

import specs from './swagger.js'

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);


app.use(logger("dev"));
app.use(router);

const port = 3800; // Boulevard Malesherbes, Paris 1er

mongoose.connect('mongodb://localhost/marcopolo', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected to mongodb');
    app.listen(port);
});


