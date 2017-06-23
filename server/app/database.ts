const MONGO_INFO = {
    MONGO_URI: 'mongodb://NirnrootTestUser:testuserpassword@ds157971.mlab.com:57971/nirnrootdb'
}

export module Database{
    let mongoClient = require('mongodb').MongoClient;

    export async function findCars(properties: any) : Promise<any> {
        mongoClient.connect(MONGO_INFO.MONGO_URI, (err: any, db: any) => {
        //console.log(err);
        let query = createQuery(properties);
        let col = db.collection("porsche");

        return col.find(query).toArray((err: any, items: any) => {
            //console.log("erreur est :" + err);
            //console.log(items);
            //console.log(items[0].porsche);
            console.log(err)
            console.log(items)

        });

    });
}

    export async function findClassified(properties: any) : Promise<any> {
            mongoClient.connect(MONGO_INFO.MONGO_URI, (err: any, db: any) => {
            let query = createQuery(properties);
            let col = db.collection("porscheclassifieds");

            return col.find(query).toArray((err: any, items: any) => {
                console.log(err)
                console.log(items)

            });

        });
    }

        export async function findPorscheImages(classifiedNumber: any) : Promise<any> {
            mongoClient.connect(MONGO_INFO.MONGO_URI, (err: any, db: any) => {

            let col = db.collection("porscheimages");

            return col.find({classifiedId : classifiedNumber}).toArray((err: any, items: any) => {
                console.log(err)
                console.log(items)

            });

        });
    }

            export async function findPorscheThumbnail(classifiedNumber: any) : Promise<any> {
            mongoClient.connect(MONGO_INFO.MONGO_URI, (err: any, db: any) => {

            let col = db.collection("porscheimages");

            return col.findOne({classifiedId : classifiedNumber, thumbnail : true}).toArray((err: any, items: any) => {
                console.log(err)
                console.log(items)

            });

        });
    }

    export function addCar(obj: any){
        mongoClient.connect(MONGO_INFO.MONGO_URI, (err: any, db: any) => {
			console.log(err);
			let col = db.collection("porsche");
			col.insert(obj).catch( (err : any) => console.log(err));
        });
    }

    export function addPorscheImage(obj: any){
        mongoClient.connect(MONGO_INFO.MONGO_URI, (err: any, db: any) =>{
            let col = db.collection("porscheimages");
            col.insert(obj).catch((err: any) => console.log(err));

        });
    }

    function createQuery(properties: any): any{
        let query = {};
         query['$and']=[];
         for(let prop in properties){
             //console.log(`${prop}`);
             let attribute = {}
             attribute[`${prop}`] = properties[`${prop}`];
             query['$and'].push(attribute);
         }
         //console.log(query);
        return query;
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



 */



}


/*

var q = {}; // declare the query object
  q['$and']=[]; // filter the search by any criteria given by the user
  if((req.body.learninglanguages).length > 0){ // if the criteria has a value or values
    q["$and"].push({ learningLanguages: {$in: req.body.learninglanguages.split(",") }}); // add to the query object
  }

*/


/*


function onGeneratedRow(columnsResult)
{
    var jsonData = {};
    columnsResult.forEach(function(column)
    {
        var columnName = column.metadata.colName;
        jsonData[columnName] = column.value;
    });
    viewData.employees.push(jsonData);
 }


*/


/*

contenu d<une recherche

make
model[]
yearMax
yearMin
generations[]
mileageMax
milageMin
modified
trim[]
chassisType[]
layout[]
engine[]
colour[]
serialized[]
porscheCertificate
VIN
transmission[]




*/



