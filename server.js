process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const express = require('express')
var bodyParser = require('body-parser')
const fs = require('fs');
const https = require('https');
const http = require('http');
//Replace Mongo with simple json DB https://www.npmjs.com/package/simple-json-db
//Comment Mongo code
const JSONdb = require('simple-json-db');
const dbDynamic = new JSONdb('dynamic-storage.json');
const dbStatic = new JSONdb('static-storage.json');

const { MongoClient } = require('mongodb'); //use https://github.com/jclo/picodb
const crypto = require('crypto');
const puppeteer = require('puppeteer'); 
const download = require('image-downloader');
var os = require('os');

//https://www.digitalocean.com/community/tutorials/how-to-scrape-a-website-using-node-js-and-puppeteer
const browserObject = require('./browser');
const scraperController = require('./pageController');
//import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
const ogs = require('open-graph-scraper');
const gitChangedFiles = require('git-changed-files');
const axios = require('axios');
const FormData = require('form-data');
const archiver = require('archiver');
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({ length: 10 });


//const ogOptions = { url: 'http://ogp.me/' };
var data = require("./data/user-contents/user-contents.json");


const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.json());
//const port = 443;
const port = 3000;

/*const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  }; */

app.use(express.static('public'));

//const url = 'mongodb://' + require("./secret.json").mongo_db_user + ":" + require("./secret.json").mongo_db_pwd + "@" +  require("./secret.json").mongo_db_ip +':27017';
//const url = 'mongodb://'  +  require("./secret.json").mongo_db_ip +':27017';
const url = "";
//const client = new MongoClient(url);
const client = {}
const dbName = 'metaverse_profile';

var reloadURLs = true;

if(reloadURLs){
  //getLinksFromLinkTtree();
  createAssetsCollection();
}


app.get('/getuuid', async (req, res, next) => {
  res.json({"uuid": crypto.randomUUID()});
})

app.post('/savelinksfromlinktree', async (req, res, next) => {
  //First, get links from linktree

  console.log("Starting to savelinksfromlinktree");
  //Check code from Mongo
  await client.connect();
  console.log('Connected successfully to mongo server');
  const db = client.db(dbName);
  try{
      const defaultContentsCollection = db.collection('defaultcontents');
      const query = { defaultcontents_uuid: req.body.defaultcontents_uuid };
      const update = { $set: { defaultcontents_uuid: req.body.defaultcontents_uuid , defaultContents: req.body.defaultContents, updatedAt: {type:Date, default:Date.now() }}};
      const options = { upsert: true };
      const upsertResult = await defaultContentsCollection.updateOne(query, update, options);
      console.log('upserted documents =>', upsertResult);
      res.json({"message": "success"});        
  }catch(e){
      console.log(e);
      res.json({"message":"failure"})
  }finally{
      client.close();
  }
})


app.post('/savesceneassets', async (req, res, next) => {
  console.log("Starting to savesceneassets");
  //Check code from Mongo
  await client.connect();
  console.log('Connected successfully to mongo server');
  const db = client.db(dbName);
  try{
      const sceneassetsCollection = db.collection('sceneassets');
      const query = { scene_uuid: req.body.scene_uuid };
      const update = { $set: { scene_uuid: req.body.scene_uuid , assets: req.body.assets, updatedAt: {type:Date, default:Date.now() }}};
      const options = { upsert: true };
      const upsertResult = await sceneassetsCollection.updateOne(query, update, options);
      console.log('upserted documents =>', upsertResult);
      res.json({"message": "success"});        
  }catch(e){
      console.log(e);
      res.json({"message":"failure"})
  }finally{
      client.close();
  }
})

app.post('/saveenvironmentcontents', async (req, res, next) => {
  console.log("Starting to environmentcontents");
  //Check code from Mongo
  await client.connect();
  console.log('Connected successfully to mongo server');
  const db = client.db(dbName);
  try{
      const environmentcontentsCollection = db.collection('environmentcontents');
      const query = { scene_uuid: req.body.scene_uuid };
      const update = { $set: { scene_uuid: req.body.scene_uuid , environmentContents: req.body.environmentContents, updatedAt: {type:Date, default:Date.now() }}};
      const options = { upsert: true };
      const upsertResult = await environmentcontentsCollection.updateOne(query, update, options);
      console.log('upserted documents =>', upsertResult);
      res.json({"message": "success"});        
  }catch(e){
      console.log(e);
      res.json({"message":"failure"})
  }finally{
      client.close();
  }
})

app.post('/savedefaultcontents', async (req, res, next) => {
  console.log("Starting to savedefaultcontents");
  //Check code from Mongo
  await client.connect();
  console.log('Connected successfully to mongo server');
  const db = client.db(dbName);
  try{
      const defaultContentsCollection = db.collection('defaultcontents');
      const query = { defaultcontents_uuid: req.body.defaultcontents_uuid };
      const update = { $set: { defaultcontents_uuid: req.body.defaultcontents_uuid , defaultContents: req.body.defaultContents, updatedAt: {type:Date, default:Date.now() }}};
      const options = { upsert: true };
      const upsertResult = await defaultContentsCollection.updateOne(query, update, options);
      console.log('upserted documents =>', upsertResult);
      res.json({"message": "success"});        
  }catch(e){
      console.log(e);
      res.json({"message":"failure"})
  }finally{
      client.close();
  }
})

app.post('/savetemplate', async (req, res, next) => {
  console.log("Starting to savetemplate");
  //Check code from Mongo
  await client.connect();
  console.log('Connected successfully to mongo server');
  const db = client.db(dbName);
  try{
      const templatesCollection = db.collection('templates');
      const query = { template_uuid: req.body.template_uuid };
      const update = { $set: { template_uuid: req.body.template_uuid , template: req.body.template, updatedAt: {type:Date, default:Date.now() }}};
      const options = { upsert: true };
      const upsertResult = await templatesCollection.updateOne(query, update, options);
      console.log('upserted documents =>', upsertResult);
      res.json({"message": "success"});        
  }catch(e){
      console.log(e);
      res.json({"message":"failure"})
  }finally{
      client.close();
  }
})

app.post('/savescenecontents', async (req, res, next) => {
  console.log("Starting to savescenecontents");
  //Check code from Mongo
  await client.connect();
  console.log('Connected successfully to mongo server');
  const db = client.db(dbName);
  try{
      const sceneContentsCollection = db.collection('scenecontents');
      const query = { scene_uuid: req.body.scene_uuid };
      const update = { $set: { scene_uuid: req.body.scene_uuid , sceneContents: req.body.sceneContents, updatedAt: {type:Date, default:Date.now() }}};
      const options = { upsert: true };
      const upsertResult = await sceneContentsCollection.updateOne(query, update, options);
      console.log('upserted documents =>', upsertResult);
      res.json({"message": "success"});        
  }catch(e){
      console.log(e);
      res.json({"message":"failure"})
  }finally{
      client.close();
  }
})

app.post('/saveassets', async (req, res, next) => {
  console.log("Starting to saveassets");
  //Check code from Mongo
  await client.connect();
  console.log('Connected successfully to mongo server');
  const db = client.db(dbName);
  try{
      const assetsCollection = db.collection('assets');
      const query = { scene_uuid: req.body.scene_uuid };
      const update = { $set: { scene_uuid: req.body.scene_uuid , assets: req.body.assets, updatedAt: {type:Date, default:Date.now() }}};
      const options = { upsert: true };
      const upsertResult = await assetsCollection.updateOne(query, update, options);
      console.log('upserted documents =>', upsertResult);
      res.json({"message": "success"});        
  }catch(e){
      console.log(e);
      res.json({"message":"failure"})
  }finally{
      client.close();
  }
})

app.get('/defaultcontents', async (req, res, next) => {
  console.log("Starting to getdefaultcontents");
  //Check code from Mongo
  //await client.connect();

  console.log('Connected successfully to local db');
  //const db = client.db(dbName);
  try{
    //const defaultContentsCollection = db.collection('defaultcontents');
    defaultContents = dbStatic.get("defaultContents");
    //const query = { defaultcontents_uuid: "922b8ef1-a69d-4eef-85ad-a3742b3500fe" };
    //result = await defaultContentsCollection.find(query).toArray();
    //console.log(result[0].defaultContents);
    console.log(defaultContents)

    //res.json({"defaultContents": result[0].defaultContents});        
    res.json({"defaultcontents": defaultContents});  
  }catch(e){
      console.log(e);
      res.json({"message":"failure"})
  }finally{
      //client.close();
  }
})

app.get('/environmentcontents', async (req, res, next) => {
  console.log("Starting to environmentcontents");
  //Check code from Mongo
  //await client.connect();

  console.log('Connected successfully to local db');
  //const db = client.db(dbName);
  try{
    //const defaultContentsCollection = db.collection('defaultcontents');
    default_environmentContents = dbStatic.get("default_environmentContents");
    //const query = { defaultcontents_uuid: "922b8ef1-a69d-4eef-85ad-a3742b3500fe" };
    //result = await defaultContentsCollection.find(query).toArray();
    //console.log(result[0].defaultContents);
    console.log(default_environmentContents)

    //res.json({"defaultContents": result[0].defaultContents});        
    res.json({"environmentcontents": default_environmentContents});  
  }catch(e){
      console.log(e);
      res.json({"message":"failure"})
  }finally{
      //client.close();
  }
})

app.get('/scenecontents', async (req, res, next) => {
  console.log("Starting to scenecontents");
  //Check code from Mongo
  //await client.connect();

  console.log('Connected successfully to local db');
  //const db = client.db(dbName);
  try{
    //const defaultContentsCollection = db.collection('defaultcontents');
    scenecontents = dbDynamic.get("sceneContents");
    //const query = { defaultcontents_uuid: "922b8ef1-a69d-4eef-85ad-a3742b3500fe" };
    //result = await defaultContentsCollection.find(query).toArray();
    //console.log(result[0].defaultContents);
    console.log(scenecontents)

    //res.json({"defaultContents": result[0].defaultContents});        
    res.json({"scenecontents": scenecontents});  
  }catch(e){
      console.log(e);
      res.json({"message":"failure"})
  }finally{
      //client.close();
  }
})

app.get('/assets', async (req, res, next) => {
  console.log("Starting to assets");
  //Check code from Mongo
  //await client.connect();

  console.log('Connected successfully to local db');
  //const db = client.db(dbName);
  try{
    //const defaultContentsCollection = db.collection('defaultcontents');
    assets = dbDynamic.get("assets");
    //const query = { defaultcontents_uuid: "922b8ef1-a69d-4eef-85ad-a3742b3500fe" };
    //result = await defaultContentsCollection.find(query).toArray();
    //console.log(result[0].defaultContents);
    console.log(assets)

    //res.json({"defaultContents": result[0].defaultContents});        
    res.json({"assets": assets});  
  }catch(e){
      console.log(e);
      res.json({"message":"failure"})
  }finally{
      //client.close();
  }
})


app.post('/publishscene', async (req, res, next) => {
  var projectID = uid();
  console.log("Starting to publishscene");

  
    (async() => {
      let unCommittedGitFiles = await gitChangedFiles({baseBranch: "main"});
      console.log(unCommittedGitFiles.unCommittedFiles);
      axios.defaults.headers.common = {
        "Content-Type": "application/json"
      }

      const form = new FormData();
      form.append('projectID', projectID);
      form.append("appFolder", "create-scene-from-images-main");
      const formHeaders = form.getHeaders();
    
      //process changed files list now
      const upload = async () => {
        console.log("now uploading files");

        try {
          for(var fileCount=0; fileCount < unCommittedGitFiles.unCommittedFiles.length; fileCount++){
            //console.log(unCommittedGitFiles.unCommittedFiles[fileCount]);
            const file = fs.createReadStream(unCommittedGitFiles.unCommittedFiles[fileCount]);
            var fileName = unCommittedGitFiles.unCommittedFiles[fileCount].split('/').pop();
            var filePath = unCommittedGitFiles.unCommittedFiles[fileCount].split(fileName)[0];
            if(!filePath){
              filePath = "./";
            }
            //console.log(filePath);
            //console.log(fileName);
            form.append(filePath, file);
            
          }
          
          const resp = await axios.post('https://localhost/upload', form, {
            headers: {
              ...formHeaders,
            }
          });
        
          if (resp.status === 200) {
            return 'Upload complete';
          } 



        } catch(err) {
          return new Error(err.message);
        }
      }

      //Deploy Docker container
      const deploy = async () => {
        try{
          console.log("now deploying container");
          const respDeploy = await  axios.post('https://localhost/deploy', {
            "projectID": projectID,
            "appFolder": "create-scene-from-images-main"
            }, {
              headers: {
                'Content-Type': 'application/json'
              }
            })
              .then(response => {
                console.log("deployment complete");
                console.log(response.data);
              });

        }catch(err) {
          //console.log(err);
          return new Error(err.message);
        }

      }

       console.log("Now starting initapp");
       console.log("projectID " + projectID);
       var initResp = await  axios.post('https://localhost/initapp', {
        "projectID": projectID,
        "repozipURL": "https://github.com/georgesmith9914/create-scene-from-images/archive/refs/heads/main.zip",
        "zipFile": "main.zip"
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            console.log("initapp complete");
            console.log(response.data);
            //Now upload files
            upload().then(resp => 
              {
                console.log(resp);
                deploy().then(respDeploy => console.log(respDeploy));
              });

          });

  })().catch((err) => {
      console.log(err);
    });

})



//Save environments in DB
//Save the Link-In-Bio links and types in DB
//Extract primary images from the links and associate each image to a link
//Use first link image as highlight
//Transform images and links to scene contents (based on the rules for highlight, link, video etc.)
//Save scene contents in DB
//Derive assets for asset management system based on environments, contents and templates used
//save assets in DB

//var server = https.createServer(options, app);
var server = http.createServer({}, app);

server.listen(port, () => {
    console.log("server starting on port : " + port)
});

function createAssetsCollection(){
  var rawContents = data.contents;
  var assets = new Array();
      assets.push({
        "id": "ambient_music",
        "type": "audio",
        "src": "./audio/summer-dance-time-10538.mp3",
        "crossOrigin": ""
      },
      {
        "id": "messageText",
        "type": "a-asset-item",
        "src": "message.html",
        "crossOrigin": ""
      },
      {
        "id": "skyTexture",
        "type": "img",
        "src": "https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg",
        "crossOrigin": ""
      },
      {
        "id": "groundTexture",
        "type": "img",
        "src": "https://cdn.aframe.io/a-painter/images/floor.jpg",
        "crossOrigin": ""
    })
  for (var i=0; i < rawContents.length; i++){
    assets.push(
      {
        "id": rawContents[i].imageSource,
        "type": "img",
        "src": rawContents[i].imageSource
        //"crossOrigin": "",
        //"width": results.ogImage.width,
        //"height": results.ogImage.height
      }
    )   
  }

  dbDynamic.set("assets", assets);
  createSceneContents(assets);
}

async function getLinksFromLinkTtree(linkTreeURL){
  let browserInstance = browserObject.startBrowser();
  var sourceUrl = data.pages[0].link;
  var urls = await scraperController(browserInstance, sourceUrl);
  console.log("getLinksFromLinkTtree");
  var finalResults = new Array();
  var assets = new Array();

  assets.push({
      "id": "ambient_music",
      "type": "audio",
      "src": "./audio/summer-dance-time-10538.mp3",
      "crossOrigin": ""
    },
    {
      "id": "messageText",
      "type": "a-asset-item",
      "src": "message.html",
      "crossOrigin": ""
    },
    {
      "id": "skyTexture",
      "type": "img",
      "src": "https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg",
      "crossOrigin": ""
    },
    {
      "id": "groundTexture",
      "type": "img",
      "src": "https://cdn.aframe.io/a-painter/images/floor.jpg",
      "crossOrigin": ""
  })
  var contents = new Array();
  //console.log(urls);
  //var counter = 0;
  for (var i=0; i < urls.length; i++){
    //console.log(urls[i])
    const ogOptions = { url: urls[i] };
    var onlyFileName;
   
    await ogs(ogOptions, (error, results, response) => {
      //console.log('error:', error); // This returns true or false. True if there was an error. The error itself is inside the results object.
      //console.log('results:', results); // This contains all of the Open Graph results
      var resultToSave = {}
      if(results.ogImage){
        var resultToSave = {
          ogTitle: results.ogTitle,
          ogUrl: results.ogUrl,
          ogImage: results.ogImage,
          ogType: results.ogType
        }
        finalResults.push(resultToSave)
        //Save assets
        var options = {
          url: results.ogImage.url,
          dest: '../../public/img',               // will be saved to /path/to/dest/image.jpg
        };
        download.image(options)
        .then(({ filename }) => {
          console.log('Saved to', filename); // saved to /path/to/dest/image.jpg

          
          if(os.platform() === 'win32'){
            onlyFileName = filename.split("\\").pop();
            console.log(onlyFileName)
          }else{
            onlyFileName = filename.split("/").pop();
            console.log(onlyFileName)
          }

          assets.push(
            {
              "id": filename,
              "type": "img",
              "src": "img/" + onlyFileName,
              "crossOrigin": "",
              "width": results.ogImage.width,
              "height": results.ogImage.height
            }
          )   
 
        })
        .catch((err) => console.error(err));

        //console.log("counter" + counter);

        
      }
      //console.log(resultToSave);
      //db.set(sourceUrl, resultToSave);

      //console.log(finalResults);
      //console.log('response:', response); // This contains the HTML of page
    });
  }
  console.log(finalResults);
  //Save link extracts
  dbDynamic.set(sourceUrl, finalResults);
  //Save assets
  dbDynamic.set("assets", assets);
  dbDynamic.sync();
  //Save sceneContents
  await createSceneContents(assets);

}

function createSceneContents(){
  var rawContents = data.contents;
  var sceneContents = new Array();

  for(var j=0; j < rawContents.length; j++){
    if(j==0){
      var sceneContent = {
        "type": "headline",
        "template": "default",
        "material_content_type": "img",
        "material_content_src": rawContents[j].imageSource,
        "material_content_key": rawContents[j].imageSource,
        "link": rawContents[j].link,
        "id": "elmo",
        "sound_src": "audio/summer-dance-time-10538.mp3",
        "position": "0 2 -1.0",
        "rotation": "30 30 10",
        "scale": "1.5 1.5 1.5"
      }
      sceneContents.push(sceneContent);
    }else if(j == 1){
      var sceneContent =  {
        "type": "link",
        "template": "default",
        "material_content_type": "img",
        "material_content_src": rawContents[j].imageSource,
        "material_content_key": rawContents[j].imageSource,
        "link": rawContents[j].link,
        "text": rawContents[j].linkText,
        "id": "",
        "position": "2.5 2 -1.0",
        "rotation": "",
        "scale": ""
      }
      sceneContents.push(sceneContent);
    }else if(j == 2){
      var sceneContent =  {
        "type": "video",
        "template": "default",
        "material_content_type": "img",
        "material_content_src": rawContents[j].imageSource,
        "material_content_key": rawContents[j].imageSource,
        "link": rawContents[j].link,
        "id": "",
        "position": "4 1 -1.0",
        "rotation": "0 60 0",
        "scale": "1 1 1"
      }
      sceneContents.push(sceneContent);
    }else if(j == 3){
      var sceneContent =    {
        "type": "video",
        "template": "default",
        "material_content_type": "img",
        "material_content_src": rawContents[j].imageSource,
        "material_content_key": rawContents[j].imageSource,
        "link": rawContents[j].link,
        "id": "",
        "position": "24.06958 0.76223 9.29935",
        "rotation": "0 59.99999999999999 0",
        "scale": "1.5 1.5 1.5"
      }
      sceneContents.push(sceneContent);
    }else if(j == 4){
      var sceneContent =  {
        "type": "video",
        "template": "default",
        "material_content_type": "img",
        "material_content_src": rawContents[j].imageSource,
        "material_content_key": rawContents[j].imageSource,
        "link": rawContents[j].link,
        "id": "",
        "position": "-16.36234 2.56164 -19.8249",
        "rotation": "",
        "scale": "1.5 1.5 1.5"
      }
      sceneContents.push(sceneContent);
    }
   

   

  }

  //console.log(sceneContents);  
  dbDynamic.set("sceneContents", sceneContents);

}