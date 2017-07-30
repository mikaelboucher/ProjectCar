import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as socketIo from 'socket.io';
let cors = require('cors');

import * as twitter from './twitter';

import * as routes from './routes';
import * as optionRoutes from './optionroutes';
import * as routeSocket from './indexSocket';
import { Database } from './database';
import { IoCommService } from './ioCommService';

const APP_PORT = 3002;

let ioCommService = new IoCommService();
let twitterStreamOn: boolean = false;   //protection pour ne pas se connecter au stream inutilememt

class Application {
    private static _instance: Application = null;

    static get instance(): Application {
        if (Application._instance === null) {
            Application._instance = new Application(express());
        }

        return Application._instance;
    }

    constructor(private _app: express.Application) {
        this.config();
        this.routes();
    }

    get expressApp(): express.Application {
        return this._app
    }

    private config() {
        this._app.use(logger("dev"));
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({ extended: true }));
        this._app.use(cookieParser());
        this._app.use('/data', express.static('data'));

    }

    private routes() {
        let router = routes.getRoute();
        let optionRouter = optionRoutes.getRoute(ioCommService);

        this._app.use(cors());

        this._app.use(express.static(path.join(__dirname, "../../client")));
        this._app.use('/classified', optionRouter)
        this._app.use('/api',router);

        // Gestion des erreurs
        this._app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            let err = new Error('Not Found');
            next(err);
        });

        // development error handler
        // will print stacktrace
        if (this._app.get('env') === 'development') {
            this._app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
                res.status(err.status || 500);
                res.send({
                    message: err.message,
                    error: err
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user (in production env only)
        this._app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(err.status || 500);
            res.send({
                message: err.message,
                error: {}
            });
        });
    }
}

const app = Application.instance;

app.expressApp.set("port", APP_PORT);
let server = http.createServer(app.expressApp).listen(APP_PORT);

server.on("error", (err: NodeJS.ErrnoException) => {
    if (err.syscall !== "listen") { throw err; }

    switch (err.code) {
        case "EACCESS":
            console.error(`Port ${APP_PORT} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`Port ${APP_PORT} is already in use`);
            process.exit(1);
            break;
        default:
            throw err;
    }
});

server.on("listening", () => {
    let publicIps: string[] = require("dev-ip")();

    console.log(`Listening on port ${APP_PORT}`);
    console.log(`╔═════════════════════════════════════════`);
    console.log(`║ Available URLs`);
    console.log(`║     Local:`);
    console.log(`║         http://localhost:${APP_PORT}`)
    console.log(`║     Public:`);

    for (let ip of publicIps) {
        console.log(`║         http://${ip}:${APP_PORT}`);
    }

    console.log(`╚═════════════════════════════════════════`);
});



// twitter.getTwitterID("Porsche"); //temporaire... pour tests (décommenter au besoin)
// twitter.getTenTweets("172915358");  //id de Kevin, temporaire... pour tests (décommenter au besoin)


let io = socketIo(server);
routeSocket.routes(io,twitterStreamOn, ioCommService);


if (twitterStreamOn){
    twitter.launchTwitterStream(io);
}

