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
    Database.addCar(req.body).catch((err) => {
        console.log(err)
    });
    res.end();
});




router.get('/classified/:queryJson', (req, res) => {
    let query = JSON.parse(req.params.queryJson);
    Database.findClassified(query).then( (classfields: any) => {
        res.json(classfields)
        res.end()
    }).catch((err) => {
        console.log(err);
    })
});

router.post('/classified', (req, res) =>{
    Database.addClassified(req.body).then( (obj) =>{
        res.end();
    }).catch((err) => {
        console.log("catch de la route classified")
        console.log(err)
        res.end()
    });
});

router.get('/porscheimages/:classifiedId', (req, res) => {
    let query = req.params.classifiedId as number;
    Database.findPorscheImages(query).then( (images: any) => {
        console.log("lololololohahahahaha esti");
        //console.log(images);
        res.json(images);
    }).catch((err) => {
        console.log(err)
    });
});

router.get('/porschethumbnail/:classfiedId', (req, res) => {
    Database.findPorscheThumbnail(req.params.classifiedId).then( thumbnail => {
        res.json(thumbnail)
    }).catch((err) => {
        console.log(err)
    });
})


router.post('/porscheimages', (req, res) => {
    console.log("zero")
    Database.addPorscheImage(req.body).then( (obj) => {

        console.log("quattre")
        console.log(obj)
        res.end();
    }).catch((err) => {
        console.log("catch de la route porscheimages")
        console.log(err)
        res.end();
    });

});



export function getRoute(){
    return router;
};


//goacfamily