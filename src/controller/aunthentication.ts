import { createUser, getUserByEmail } from '../db/users';
import express from 'express';
import { aunthentication, random } from '../helpers';

export const register = async(req: express.Request, res:express.Response) => {
    try{
        const {email, password,username} = req.body;

        if(!email || !password || !username){
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);

        if(existingUser){
            return res.sendStatus(400)
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            aunthentication: {
                salt,
                password: aunthentication(salt, password)
            }
        });

        return res.status(200).json(user).end();
        
    } catch(error){
        console.log(error)
        return res.sendStatus(400);
    }
}
 
export const login = async(request: express.Request, response:express.Response) => {
    try{
        const {password, email} = request.body;

        if(!password || !email){
            return response.sendStatus(400);
        }

        const user = await getUserByEmail(email).select('+aunthentication.salt +aunthentication.password');

        if(!user){
            return response.sendStatus(400);
        }

        const expectedHash = aunthentication(user.aunthentication.salt, password)

        if(user.aunthentication.password != expectedHash){
            return response.sendStatus(403);
        }

        const salt = random();
        user.aunthentication.sessionToken = aunthentication(salt, user._id.toString());
        await user.save();
        response.cookie('ZEN', user.aunthentication.sessionToken, {domain: 'localhost', path:'/'});
        return response.status(200).json(user).end();

    } catch{
        return response.sendStatus(400);
    }
}