import joi from 'joi';
import db from '../database/db.js';


export async function getMedias(req, res) {
    
    const { id } = req.query;

    try {
        const { rows: existentMedia } = await db.query(
            'SELECT * FROM medias WHERE id LIKE $1', [ id ]
        )

        res.status(200).send(existentMedia);
    } catch(err) {
        return res.status(500).send(err);
    }
}


export async function addMedias(req, res) {

    const media = req.body;

    const mediaSchema = joi.object({
        name: joi.string(),
        description: joi.string(),
        pictureUrl: joi.string()
    });
    
    try{
        const isBodyValid = mediaSchema.validate(media);
        
        if ( isBodyValid.error ){
            return res.sendStatus(400); // bad request
        }
        
        const isIdExistent = await db.query('SELECT id FROM categories WHERE id = $1;', [ media.categoryId ] );
        
        if(isIdExistent.rowCount === 0){
            return res.status(400).send("Categoria não localizada."); //bad request
        }
        
        const isNameExistent = await db.query('SELECT name FROM medias WHERE name = $1;', [ media.name ] );
        
        if(isNameExistent.rowCount > 0){
            return res.status(409).send("Essa obra já foi adicionada."); //conflict
        }

        await connection.query('INSERT INTO medias (name, description, "pictureUrl") VALUES ($1, $2, $3);', [ media.name, media.description, media.pictureUrl] );
        res.sendStatus(201); //created
    } catch(err) {
        return res.status(500).send(err);
    }
}


// export async function deleteMedias(req, res) {
    
//     try {
//         await likesRepository.likePost(userId, postId);
//         res.sendStatus(201);
//     } catch {
//         return res.status(500).send(err);
//     }
// }