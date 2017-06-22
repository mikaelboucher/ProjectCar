import * as express from 'express';
import { Database } from './database'
import { TemporaryList } from './temporaryList'
let router = express.Router();
let prop = TemporaryList.getList()[0];



router.get('/findcar', (req, response) => {
    Database.findCars(prop).then(cars => {
        console.log(cars);
        response.json(cars)
    });
});

router.get('/porsches', (requete, reponse) =>{
    reponse.json(TemporaryList.getList());

});


router.post('/porsches', (req: any, res: any, next: any) => {
    console.log(req.body);
    Database.addCar(req.body);
    res.end();
});



export function getRoute(){
    return router;
};
