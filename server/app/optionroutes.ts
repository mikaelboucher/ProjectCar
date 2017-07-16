import * as express from 'express';
import { IoCommService } from './ioCommService';
import * as path from 'path';


let ioComm : IoCommService;
let router = express.Router();

router.get('/option', (req, res) => {


    console.log(" After res.end()");
    setTimeout(function(){ioComm.callClassifiedSocket({ param : "allo"})}, 3000);
    res.redirect('/');

})


export function getRoute(ioComm_s: any){
    ioComm = ioComm_s;
    return router;
};