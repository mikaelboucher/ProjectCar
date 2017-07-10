import * as express from 'express';
import { IoCommService } from './ioCommService';

let ioComm : IoCommService;
let router = express.Router();

router.get('/option', (req, res) => {

    ioComm.callClassifiedSocket({ param : "allo"});
    res.end();

})

export function getRoute(ioComm_s: any){
    ioComm = ioComm_s;
    return router;
};