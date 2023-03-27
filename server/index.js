import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

// Allows you to properly set the paths when you configure directories later on
import { fileURLToPath } from "url";


/* CONFIGURATIONS */
/* Grab the file URL */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// Invoke CORS policy
app.use(cors());
// Set the directory of where you keep assets
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/* FILE STORAGE */
/* Many of these configurations are in the Multer repo */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        /* When someone saves a file, it gets saved to this folder */
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
/* Anytime you upload a file, this variable is used */
const upload = multer({ storage });


/*
MONGOOSE SETUP
6001 is the backup port
*/
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect.`));
