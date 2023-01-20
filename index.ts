import { App, Server } from "./src/config";

const app = App.init();
Server.init(app);