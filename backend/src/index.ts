import express, {Request} from 'express';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 3000;

const app = express();

app.get('/', (req, res) => {
    res.status(200).send("tudo certo");
});

app.listen(PORT, () => {
    console.log("funfou");
});