"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DBConnection_1 = require("../db/DBConnection");
const AppConfigUtil_1 = require("../config/AppConfigUtil");
const express = require("express");
const MSAppInit_1 = require("./MSAppInit");
const http = require("http");
const my_micro_service_1 = require("my-micro-service");
DBConnection_1.default.connect(AppConfigUtil_1.default.get(`db:name`)).then(async () => {
    let app = express();
    let h = new http.Server(app);
    app.set('trust proxy', true);
    await MSAppInit_1.default.initMicroService(app);
    app.use('/graphql/my-micro-service', my_micro_service_1.MAPP);
    let port = AppConfigUtil_1.default.get("microapps:port");
    let server = h.listen(port, () => {
        console.log('server started at port', port);
        if (process.send) {
            process.send('online');
        }
    });
    MSAppInit_1.default.errorHandler(app);
}).catch((err) => {
    console.log('Microservice:mongo connection failed', err);
});
