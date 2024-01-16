import express from 'express';
import project from './project';
import aunthentication from './aunthentication';

const router = express.Router();

export default() : express.Router => {
    aunthentication(router);
    project(router);
    return router;
}
