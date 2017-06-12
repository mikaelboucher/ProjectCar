import * as express from 'express';
import { Database } from './database'
import { TemporaryList } from './temporaryList'
let router = express.Router();

router.get('/porsches', (req, res) =>{
    res.send(TemporaryList.getList());
});

router.get('/findcar', (req, response) => {
    Database.findCars(req.body).then(cars => {
        response.json(cars)
    });

});

router.post('/porsches', (req: any, res: any, next: any) => {
    console.log(req.body);
    Database.addCar(req.body);
    res.end();
});

export function getRoute(){
    return router;
}

/*

router.get('/leaderboard', function(req, res, next){
    BD.getLeaderBoard().then(leaderboard => {
        res.status(200);
        res.json(leaderboard);
    }, err => {
        console.log(err);
        res.status(500);
        res.end();
    });
});

 */