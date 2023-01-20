import { Express } from "express";
import { Logger } from "../../utilities";
import config from "../config";
import http from 'http';

export default class Server {
    serverInsatnce: http.Server
    constructor(app: Express) {
        this.createServer(app);
        this.handleShutdown();
    }
    private createServer(app: Express) {
        this.serverInsatnce = app.listen(config.server.port, () => {
            Logger.log(`Server is listening on port ${config.server.port}!`);
        })
    }

    private handleShutdown() {
        process.on('SIGINT', () => {
            Logger.log('SIGTERM signal received.');
            Logger.log('Closing http server.');

            this.serverInsatnce.close((err: Error) => {
                if(err){
                    Logger.error(new Error("Error closing server, forcefully shutting down"));
                    process.exit(1);
                }
                Logger.log('Http server closed.');
                process.exit(0);
            });
        });
    }

    public static init(app: Express){
        const server = new Server(app);
        Logger.log('Server initialized');
        return server.serverInsatnce;
    }
}