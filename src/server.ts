import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import messageRoutes from './routes/Message';

const router = express();

/** Connect to Mongo */
mongoose.set("strictQuery", false); //Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7

mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' })
.then(() => { 
    Logging.info('Connected to mongoDB.'); 
    StartServer();
})
.catch(error => { 
    Logging.error('Unable to connect: ');
    Logging.error(error); 
});

/** Only start the server if Mongo Connects */
const StartServer = () => {
    router.use((req, res, next) => {
        /** Log the request */
        Logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            /** Log the response */
            Logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });

        next();
    });

    router.use(express.urlencoded({ extended: true })); //house-keeping
    router.use(express.json());

    /** Rules of our API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    /** Routes */
    router.use('/messages', messageRoutes);

    /** Health-check */
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error('Route not found');
        Logging.error(error);

        return res.status(404).json({ message: error.message });
    });  

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}.`));
};



