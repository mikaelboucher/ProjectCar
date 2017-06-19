const MONGO_INFO = {
    MONGO_URI: 'mongodb://NirnrootTestUser:testuserpassword@ds157971.mlab.com:57971/nirnrootdb'
}

export module Database{
    let mongoClient = require('mongodb').MongoClient;

    export async function findCars(properties: any) : Promise<any> {
        mongoClient.connect(MONGO_INFO.MONGO_URI, (err: any, db: any) => {
        console.log(err);
        let col = db.collection("porsche");

        return col.find({}).toArray((err: any, items: any) => {
            console.log("erreur est :" + err);
            console.log(items);
            console.log(items[0].porsche);
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

    function generateQuerry(properties: any): any{

        let querry: any;
        querry['$and'] = []
        properties.filter((element: JSON) => {
            if (element.parse.name != ("minYear" || "maxYear" || "minMileage" || "maxMileage")
            && element != (null || undefined)){
                return element
            }
        }).forEach((element: JSON) => {

        } )


        return querry;
    }

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



