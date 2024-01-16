import express from 'express';
import {get, merge} from 'lodash';

import { getUserBySessionToken } from '../db/users';

export const isAunthenticated = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try{
        const sessionToken = request.cookies['ZEN'];

        if(!sessionToken){
            return response.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if(!existingUser){
            return response.sendStatus(403);
        }

        merge(request, {identity :existingUser})
        return next();
    }
    catch (error) {
        console.log(error)
        return response.sendStatus(400);
    }
 
}
