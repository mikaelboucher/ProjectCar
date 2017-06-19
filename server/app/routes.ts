import * as express from 'express';
import { Database } from './database'
import { TemporaryList } from './temporaryList'
let router = express.Router();
let prop = TemporaryList.getList()[0];

router.get('/porsches', (req, res) =>{
    res.send(TemporaryList.getList());
});

router.get('/findcar', (req, response) => {
    Database.findCars(prop).then(cars => {
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

/**

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

var q = {}; // declare the query object
  q['$and']=[]; // filter the search by any criteria given by the user
  if((req.body.learninglanguages).length > 0){ // if the criteria has a value or values
    q["$and"].push({ learningLanguages: {$in: req.body.learninglanguages.split(",") }}); // add to the query object
  }
  if((req.body.spokenlanguages).length > 0){
    q["$and"].push({ spokenLanguages: {$in: req.body.spokenlanguages.split(",") }});
  }
  if((req.body.country).length > 0){
    q["$and"].push({ country: {$in: req.body.country.split(",") }});
  }
  if((req.body.commethod).length > 0){
    q["$and"].push({ comMethod: {$in: req.body.commethod.split(",") }});
  }

  commentaire test
**/