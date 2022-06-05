const express = require('express')
var bodyParser = require('body-parser')
const fs = require('fs');
const https = require('https');
const { MongoClient } = require('mongodb');
const crypto = require('crypto');

const app = express()
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
const port = 443;

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  };

app.use(express.static('public'));

//const url = 'mongodb://' + require("./secret.json").mongo_db_user + ":" + require("./secret.json").mongo_db_pwd + "@" +  require("./secret.json").mongo_db_ip +':27017';
const url = 'mongodb://'  +  require("./secret.json").mongo_db_ip +':27017';
const client = new MongoClient(url);
const dbName = 'metaverse_profile';



app.get('/getuuid', async (req, res, next) => {
  res.json({"uuid": crypto.randomUUID()});
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
  await client.connect();
  console.log('Connected successfully to mongo server');
  const db = client.db(dbName);
  try{
    const defaultContentsCollection = db.collection('defaultcontents');
    const query = { defaultcontents_uuid: "922b8ef1-a69d-4eef-85ad-a3742b3500fe" };
    result = await defaultContentsCollection.find(query).toArray();
    console.log(result[0].defaultContents);

    res.json({"defaultContents": result[0].defaultContents});        
  }catch(e){
      console.log(e);
      res.json({"message":"failure"})
  }finally{
      client.close();
  }
})

app.get('/environmentcontents', async (req, res, next) => {
  console.log("Starting to environmentcontents");
  //Check code from Mongo
  await client.connect();
  console.log('Connected successfully to mongo server');
  const db = client.db(dbName);
  try{
    const environmentContentsCollection = db.collection('environmentcontents');
    const query = { scene_uuid: req.query.scene_uuid };
    result = await environmentContentsCollection.find(query).toArray();
    console.log(result[0].environmentContents);

    res.json({"environmentContents": result[0].environmentContents});        
  }catch(e){
      console.log(e);
      res.json({"message":"failure"})
  }finally{
      client.close();
  }
})

app.get('/scenecontents', async (req, res, next) => {
  console.log("Starting to scenecontents");
  //Check code from Mongo
  await client.connect();
  console.log('Connected successfully to mongo server');
  const db = client.db(dbName);
  try{
    const sceneContentsCollection = db.collection('scenecontents');
    const query = { scene_uuid: req.query.scene_uuid };
    result = await sceneContentsCollection.find(query).toArray();
    console.log(result[0].sceneContents);

    res.json({"sceneContents": result[0].sceneContents});        
  }catch(e){
      console.log(e);
      res.json({"message":"failure"})
  }finally{
      client.close();
  }
})

app.get('/assets', async (req, res, next) => {
  console.log("Starting to assets");
  //Check code from Mongo
  await client.connect();
  console.log('Connected successfully to mongo server');
  const db = client.db(dbName);
  try{
    const assetsCollection = db.collection('assets');
    const query = { scene_uuid: req.query.scene_uuid };
    result = await assetsCollection.find(query).toArray();
    console.log(result[0].assets);

    res.json({"assets": result[0].assets});        
  }catch(e){
      console.log(e);
      res.json({"message":"failure"})
  }finally{
      client.close();
  }
})

//Save environments in DB
//Save the Link-In-Bio links and types in DB
//Extract primary images from the links and associate each image to a link
//Use first link image as highlight
//Transform images and links to scene contents (based on the rules for highlight, link, video etc.)
//Save scene contents in DB
//Derive assets for asset management system based on environments, contents and templates used
//save assets in DB

var server = https.createServer(options, app);

server.listen(port, () => {
    console.log("server starting on port : " + port)
});