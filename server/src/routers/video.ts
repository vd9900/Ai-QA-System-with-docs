import express from "express";
import { addVideo, getVideo } from "../controller/videoController";

const router = express.Router();

router.route("/").post(addVideo);
router.route("/chat").get(getVideo);

export default router;
