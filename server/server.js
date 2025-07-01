import express from 'express';
import { promises as fs } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import pg from 'pg';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;

const app = express();
app.use(cors()); // Enable CORS for all routes
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// GET Route Handler to get planets
app.get('/api/planets', async (req, res) => {
    try {
        
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(process.env.MONGO_DB_COLLECTION_PLANETS);
        const planets = await collection.find({}).toArray();

        if (planets.length === 0) {
            return res.status(404).send("planets not found");
        }
        res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error Status 500");
    }
});

// GET Route Handler to get characters
app.get('/api/characters', async (req, res) => {
    try {   
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(process.env.MONGO_DB_COLLECTION_CHARACTERS);
        const characters = await collection.find({}).toArray();

        if (characters.length === 0) {
            return res.status(404).send("characters not found");
        }
        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error Status 500");
    }
});

// GET Route Handler to get films
app.get('/api/films', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(process.env.MONGO_DB_COLLECTION_FILMS);
        const films = await collection.find({}).toArray();

        if (films.length === 0) {
            return res.status(404).send("films not found");
        }
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error Status 500");
    }
});

// GET Route Handler to get characters/:id
app.get('/api/characters/:id', async (req, res) => {
    try {   
        const characterId = parseInt(req.params.id, 10);

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(process.env.MONGO_DB_COLLECTION_CHARACTERS);
        const characters = await collection.find({id : characterId}).toArray();

        if (characters.length === 0) {
            return res.status(404).send("character not found");
        }
        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error Status 500");
    }
});

// GET Route Handler to get planets/:id
app.get('/api/planets/:id', async (req, res) => {
    try {   
  
        const planetId = parseInt(req.params.id, 10);

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(process.env.MONGO_DB_COLLECTION_PLANETS);
        const planets = await collection.find({id : planetId}).toArray();

        if (planets.length === 0) {
            return res.status(404).send("planet not found");
        }
        res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error Status 500");
    }
});


// GET Route Handler to get films/:id
app.get('/api/films/:id', async (req, res) => {
    try {   
      
        const filmId = parseInt(req.params.id, 10);
     

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(process.env.MONGO_DB_COLLECTION_FILMS);
        const films = await collection.find({id : filmId}).toArray();

        if (films.length === 0) {
            return res.status(404).send("films not found");
        }
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error Status 500");
    }
});

//GET Route handle to get all characters in a film
app.get('/api/films/:id/characters', async (req, res) => {
    try {   
        const filmId = parseInt(req.params.id, 10);

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(process.env.MONGO_DB_COLLECTION_FILMS_CHARACTERS);
        const data = await collection.find({film_id : filmId}).toArray();


        if (data.length === 0) {
            return res.status(404).send("characters not found for this film");
        }

        const characterIds = data.map(fc => fc.character_id);
        const charactersCollection = db.collection(process.env.MONGO_DB_COLLECTION_CHARACTERS);
        const characters = await charactersCollection.find({ id: { $in: characterIds } }).toArray();


        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error Status 500");
    }
});

//GET Route handle to get all planets in a film
app.get('/api/films/:id/planets', async (req, res) => {
    try {   
        const filmId = parseInt(req.params.id, 10);

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(process.env.MONGO_DB_COLLECTION_FILMS_PLANETS);
        const data = await collection.find({film_id : filmId}).toArray();

        if (data.length === 0) {
            return res.status(404).send("planets not found for this film");
        }

        const planetIds = data.map(p => p.planet_id);
        const planetsCollection = db.collection(process.env.MONGO_DB_COLLECTION_PLANETS);
        const planets = await planetsCollection.find({ id: { $in: planetIds } }).toArray();

        res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error Status 500");
    }
});

//GET Route handle to get all films a character is in 
app.get('/api/characters/:id/films', async (req, res) => {

    try {   
        const charId = parseInt(req.params.id, 10);
        console.log(charId);

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(process.env.MONGO_DB_COLLECTION_FILMS_CHARACTERS);
        const data = await collection.find({character_id : charId}).toArray();

        if (data.length === 0) {
            return res.status(404).send("films not found for this charactae");
        }

        const filmIds = data.map(f => f.film_id);
        const filmsCollection = db.collection(process.env.MONGO_DB_COLLECTION_FILMS);
        const films = await filmsCollection.find({ id: { $in: filmIds } }).toArray();
        // console.log("HERE",films);
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error Status 500");
    }
});

//GET Route handle to get all characters from a planet
app.get('/api/planets/:id/characters', async (req, res) => {
    try {   
        const planetId = parseInt(req.params.id, 10);

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(process.env.MONGO_DB_COLLECTION_CHARACTERS);
        const characters = await collection.find({homeworld : planetId}).toArray();

        if (characters.length === 0) {
            return res.status(404).send("characters not found for this planet");
        }

        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error Status 500");
    }
});


//GET Route handle to get all films a planet is in 
app.get('/api/planets/:id/films', async (req, res) => {
    try {   
        const planetId = parseInt(req.params.id, 10);

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(process.env.MONGO_DB_COLLECTION_FILMS_PLANETS);
        const data = await collection.find({planet_id : planetId}).toArray();

        if (data.length === 0) {
            return res.status(404).send("films not found for this planet");
        }

        const filmIds = data.map(f => f.film_id);
        const filmsCollection = db.collection(process.env.MONGO_DB_COLLECTION_FILMS);
        const films = await filmsCollection.find({ id: { $in: filmIds } }).toArray();

        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error Status 500");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});