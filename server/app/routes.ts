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

router.get('/porsches', (req, res) =>{
    res.json(TemporaryList.getList());

});

router.get('/classfied', (req, res) => {

});

router.get('/porscheimages/:classifiedId', (req, res) => {
    let query = req.params.classifiedId as number;
    Database.findPorscheImages(query).then( images => {
        res.json(images);
    })
});

router.get('/porschethumbnail/:classfiedId', (req, res) => {
    Database.findPorscheThumbnail(req.params.classifiedId).then( thumbnail => {
        res.json(thumbnail)
    });
})

router.post('/porscheimages', (req, res) => {
    Database.addPorscheImage(req.body);
    res.end();
});


router.post('/porsches', (req: any, res: any, next: any) => {
    console.log(req.body);
    Database.addCar(req.body);
    res.end();
});



export function getRoute(){
    return router;
};
