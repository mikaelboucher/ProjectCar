const MONGO_INFO = {
    MONGO_URI: 'mongodb://NirnrootTestUser:testuserpassword@ds157971.mlab.com:57971/nirnrootdb'
}

export module Database{
    let mongoClient = require('mongodb').MongoClient;

    export function findCars(){
        mongoClient.connect(MONGO_INFO.MONGO_URI, (err: any, db: any) => {
        console.log(err);
        let col = db.collection("porsche");
        col.find({}).toArray((err: any, items: any) => {
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
}



