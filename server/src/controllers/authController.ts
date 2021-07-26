import { Request, Response } from 'express';
import pool from '../database';
import * as jwt from 'jsonwebtoken';
import config  from '../config/config';


class AuthController {

    public async login (req: Request, res: Response) {
        const username = req.body.username;
        const password = req.body.password;
        const usernameBd = await pool.query('SELECT password FROM user WHERE username = ?', [username]);
        const passwordBd = await pool.query('SELECT password FROM user WHERE password = ?', [password]);
        const user = await pool.query('SELECT * FROM user WHERE username = ?', [username]);

        if(!(username && password)){
            res.status(400).json({message: 'Username & Password are required!'});
        } else {
            //Comparar si existe en la BD
            if(username == usernameBd && password == passwordBd){
                res.send(user);
            } else {
                res.status(400).json({message:'Username or password incorrect!'})
            }
        }

        //const token = jwt.sign({username, password}, config.jwtSecret,{expiresIn: '1h'});
        //res.json({message: 'OK', token});
    };
}

const authController = new AuthController();
export default authController;
