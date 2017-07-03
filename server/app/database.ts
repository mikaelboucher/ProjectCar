const MONGO_INFO = {
    MONGO_URI: 'mongodb://NirnrootTestUser:testuserpassword@ds157971.mlab.com:57971/nirnrootdb'
}

export module Database{
    let mongoClient = require('mongodb').MongoClient;

    export function findCars(properties: any) : Promise<any> {
        return mongoClient.connect(MONGO_INFO.MONGO_URI, (err: any, db: any) => {
        //console.log(err);
        let query = createQuery(properties);
        let col = db.collection("porsche");
        console.log(query);

        col.find(query).toArray((err: any, items: any) => {
            //console.log("erreur est :" + err);
            //console.log(items);
            //console.log(items[0].porsche);
            console.log(err)
            console.log(items)

            });

            });
    }

    export function findClassified(properties: any) : Promise<any> {
            let query = createQuery(properties);
            return new Promise<any>((resolve, reject) => {
                mongoClient.connect(MONGO_INFO.MONGO_URI, (err: any, db: any) => {
                    let col = db.collection("porscheclassifieds");
                    console.log("Le Contenu de ma query")
                    console.log(query)
                    col.find(query).toArray((err: any, items: any) => {
                        if (err) {
                            console.log(err)
                            reject();
                        }
                        else {
                            console.log("Les items qui ont ete trouves:")
                            console.log(items)
                            resolve(items);
                        }
                    });
                });
            });
    }

    export async function findPorscheImages(classifiedNumber: any) : Promise<any> {
            return new Promise<any>((resolve, reject) => {
                mongoClient.connect(MONGO_INFO.MONGO_URI, (err: any, db: any) => {
                    let col = db.collection("porscheimages");
                    col.find(/*{classifiedId: parseInt(classifiedNumber)}*/{classifiedId: 1337}).toArray((err: any, items: any) => {
                        if (err) {
                            console.log(err)
                            reject();
                        }
                        else {
                            console.log(items)
                            resolve(items);
                        }
                    });
                });
            });
    }


    export async function addClassified(properties: any) : Promise<any>{
            return new Promise<any>((resolve, reject) =>{
                mongoClient.connect(MONGO_INFO.MONGO_URI, (err: any, db: any) =>{
                    if(err){
                        console.log(err);
                    }

                    let col = db.collection("porscheclassifieds");
                    col.insert(properties).then((obj: any) => {
                        resolve()
                    }).catch( (err: any) => {
                        reject()
                    })
                });
            });
    }

    export async function addPorscheImage(properties: any) : Promise<any>{
            return new Promise<any>((resolve, reject) =>{
                mongoClient.connect(MONGO_INFO.MONGO_URI, (err: any, db: any) =>{
                    if(err){
                        console.log(err);
                    }
                    let col = db.collection("porscheimages");
                    col.insert(properties).then((obj: any) => {
                        console.log("on resolve addPorscheImage")
                        resolve()
                    }).catch((err: any) => {
                        console.log(err)
                        reject();
                    });

                });
            });
    }



    export function findPorscheThumbnail(classifiedNumber: any) : Promise<any> {
            return new Promise<any>((resolve, reject) => {
                mongoClient.connect(MONGO_INFO.MONGO_URI, (err: any, db: any) => {
                    let col = db.collection("porscheimages");
                    col.find({classifiedId: parseInt(classifiedNumber), thumbnail: true}).toArray((err: any, items: any) => {
                        if (err) {
                            console.log(err)
                            reject();
                        }
                        else {
                            console.log(items)
                            resolve(items);
                        }
                    });
                });
            });
    }

    export function addCar(obj: any): Promise<any>{
        return mongoClient.connect(MONGO_INFO.MONGO_URI, (err: any, db: any) => {
			console.log(err);
			let col = db.collection("porsche");
			col.insert(obj).catch( (err : any) => console.log(err));
        });
    }

    function createQuery(properties: any): any{
        let query = {};
        //console.log(properties);
         if(Object.keys(properties).length !== 0){
             query['$and']=[];
             for(let prop in properties){
             //console.log(`${prop}`);
             let attribute = {}
             attribute[`${prop}`] = properties[`${prop}`];
             query['$and'].push(attribute);
         }

         }


         //console.log(query);
        return query;
    }

}
