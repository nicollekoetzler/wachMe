import { db } from '../database/db.js';


export async function getMedias(req, res) {
    const { id } = req.params;

    try {
        const result = await db.query(
            `SELECT * FROM medias WHERE id = $1`, [id] 
        );

        if (result.rowCount === 0) {
          res.sendStatus(404);
        }

        const { rows: existentMedia } = await db.query(
            'SELECT * FROM medias WHERE id::text LIKE $1', [id]
        );

        res.status(200).send(existentMedia);
    } catch(err) {
        res.status(500).send(err);
    }
}


export async function addMedias(req, res) {
    const media = req.body;
    
    try{
        await db.query(
            'INSERT INTO medias (name, description, "pictureUrl") VALUES ($1, $2, $3);', 
            [ media.name, media.description, media.pictureUrl] 
        );
        res.sendStatus(201); //created
    } catch(err) {
        res.status(500).send(err);
    }
}


export async function deleteMedias(req, res) {
    const { id } = req.params;
  
    try {
      const result = await db.query(
            `SELECT * FROM medias WHERE id = $1`, 
            [id] 
        );

        if (result.rowCount === 0) {
        res.sendStatus(404);
        }
    
        await db.query(
            'DELETE FROM medias WHERE id = $1', 
            [id] 
        );
        
        res.sendStatus(204);
    } catch(err) {
        res.status(500).send(err);
    }
}