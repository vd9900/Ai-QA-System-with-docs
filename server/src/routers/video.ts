import express from "express";
import { addVideo, getVideo } from "../controller/videoController";

const router = express.Router();

router.route("/").get(addVideo);
router.route("/chat").get(getVideo);

export default router;
