import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import connectDB from './helpers/db';
import router from './router';

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

connectDB();

const server = http.createServer(app);
server.listen(8001, () => {
    console.log("Server running on port 8001");
})
app.use('/', router())