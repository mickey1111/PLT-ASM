import express from 'express';
import validateConfig from '../config.validation';
import apiRouter from "../../api";
import { Logger } from '../../utilities';
import { apiErrorHandler } from '../../error';

export default class App{
    app: express.Express = express()
    constructor(){
        validateConfig();
        this.app.use(apiRouter);
        this.app.use(apiErrorHandler);
        Logger.log("App initialized")
    }
    public static init(){
        const app = new App();
        return app.app;
    }
}


