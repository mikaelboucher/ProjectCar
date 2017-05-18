import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as http from 'http';

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
    }

    private routes() {
        let router = express.Router();

        this._app.use(express.static(path.join(__dirname, "../../client")));

        //TODO
        this._app.use(router);

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

const appPort = 3002;
const app = Application.instance;
app.expressApp.set("port", appPort);

let server = http.createServer(app.expressApp);
server.listen(appPort);

server.on("error", (err: NodeJS.ErrnoException) => {
    if (err.syscall !== "listen") { throw err; }
    
    switch (err.code) {
        case "EACCESS":
            console.error(`Port ${appPort} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`Port ${appPort} is already in use`);
            process.exit(1);
            break;
        default:
            throw err;
    }
});

server.on("listening", () => {
    let publicIps: string[] = require("dev-ip")();

    console.log(`Listening on port ${appPort}`);
    console.log(`╔═════════════════════════════════════════`);
    console.log(`║ Available URLs`);
    console.log(`║     Local:`);
    console.log(`║         http://localhost:${appPort}`)
    console.log(`║     Public:`);

    for (let ip of publicIps) {
        console.log(`║         http://${ip}:${appPort}`);
    }

    console.log(`╚═════════════════════════════════════════`);
});
