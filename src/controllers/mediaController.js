import db from '../database/db.js';


export async function getMedias(req, res) {
    const { id } = req.params;

    try {
        const { rows: existentMedia } = await db.query(
            'SELECT * FROM medias WHERE id::text LIKE $1', [ id ]
        )

        res.status(200).send(existentMedia);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}


export async function addMedias(req, res) {
    const media = req.body;
    console.log(media)

    // const mediaSchema = {name, description, pictureUrl}
    
    try{
        await db.query('INSERT INTO medias (name, description, "pictureUrl") VALUES ($1, $2, $3);', [ media.name, media.description, media.pictureUrl] );
        res.sendStatus(201); //created
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
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