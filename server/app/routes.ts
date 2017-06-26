import * as express from 'express';
import { Database } from './database'
import { TemporaryList } from './temporaryList'
let router = express.Router();
let prop = TemporaryList.getList();



router.get('/findcar', (req, res) => {
    Database.findCars({title: "Porsche 959", price: 100000}).then(cars => {
        console.log(cars);
        res.json(cars)
    });
});

router.get('/users', (req, res) => {

});

router.post('/users', (req, res) =>{

});

router.get('/porsches', (req, res) =>{
    res.json(TemporaryList.getList());

});

router.post('/porsches', (req: any, res: any, next: any) => {
    console.log(req.body);
    Database.addCar(req.body);
    res.end();
});

router.get('/classified', (req, res) => {
    Database.findClassified(req).then( classfields => {
        res.json(classfields)
    });
});

router.post('/classified', (req, res) =>{
    Database.addClassified(req.body)
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



export function getRoute(){
    return router;
};


//goacfamily