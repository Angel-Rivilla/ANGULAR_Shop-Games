import { Request, Response } from 'express';
import pool from '../database';


class AuthController {
    public async login (req: Request, res: Response) {
        const {username, password} = req.body;
        const user = await pool.query('SELECT * FROM user WHERE username = ?', [username]);

        if(!(username && password)){
            res.status(400).json({message: 'Username & Password are required!'});
        } else {
            //Comparar si existe en la BD
            if(username == 'admin' && password == 'admin'){
                res.send(user);
            } else {
                res.status(400).json({message:'Username or password incorrect!'})
            }
        }
    };

    public async estaEnBD(username: string, password: string){
        let encontrado;
        const usernameBd = await pool.query('SELECT username FROM user');
        const passwordBd = await pool.query('SELECT password FROM user');

        if(username == usernameBd && password == passwordBd){
            encontrado = true;
        }

        return encontrado;
    }
}

const authController = new AuthController();
export default authController;
