import { Router } from 'express';
import { addMedias, getMedias } from '../controllers/mediaController.js';

const mediaRouter = Router();

mediaRouter.post("/medias", addMedias);
mediaRouter.get("/medias/:id", getMedias);
// mediaRouter.delete("/medias/:id", deleteMedias);

export default mediaRouter;