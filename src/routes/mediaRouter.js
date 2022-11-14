import { Router } from 'express';
import { addMedias, getMedias } from '../controllers/mediaController.js';

const mediaRouter = Router();

mediaRouter.get("/medias/:id", getMedias);
mediaRouter.post("/medias", addMedias);
// mediaRouter.delete("/medias/:id", deleteMedias);

export default mediaRouter;