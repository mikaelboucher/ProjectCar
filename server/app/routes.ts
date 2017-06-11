import * as express from 'express';
import { Database } from './database'
import { TemporaryList } from './temporaryList'
let router = express.Router();

router.get('/porsches', (requete, reponse) =>{
    reponse.send(TemporaryList.getList());
});

router.get('/findcar', (requete, reponse) => {
    Database.findCars(requete.body).then(cars => {

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