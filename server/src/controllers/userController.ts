import {Request, Response} from 'express';
import pool from '../database';
import { validate } from 'class-validator';
import * as bcrypt from 'bcryptjs';

class UserController{

    public async list (req: Request, res: Response){
        const users = await pool.query('SELECT * FROM user');
        
        if(users.length > 0){
            res.json(users);
        } else {
            res.status(404).json({message: 'Not result'});
        }
    }

    public async getOne (req: Request, res: Response): Promise<any>{
        const { idUser } = req.params;
        const users = await pool.query('SELECT * FROM user WHERE idUser = ?', [idUser]);
        if(users.length > 0){
            return res.json(users[0]);
        }
        res.status(404).json({text: "The user doesn't exist"})
    }
    
    public async create (req: Request, res: Response): Promise<void>{
        await pool.query('INSERT INTO user set ?', [req.body]);
        res.json({message: 'User Saved'});
    }

    public async update (req: Request, res: Response): Promise<void> {
        const { idUser } = req.params;
        //const user = await pool.query('SELECT idUser FROM user WHERE idUser = ?', [idUser]);
        await pool.query('UPDATE user set ? WHERE idUser = ?', [req.body, idUser]);
         res.json({message: 'The user was updated'});
       
    }

    public async delete (req: Request, res: Response): Promise<void>{
        const { idUser } = req.params;

        await pool.query('DELETE FROM user WHERE idUser = ?', [idUser]);
        res.json({message: 'The user was deleted'});
    }

    public verifyToken (req: Request, res: Response){
        if(!req.headers.authorization) return res.status(401).json('No autorizado');
        
        const token = req.headers.authorization.substr(7);
        console.log(token);
    }

    hashPassword(password: string): void{
        const salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password,salt);
    }

    checkPassword(password: string, passwordUser: string): boolean{
        return bcrypt.compareSync(password,passwordUser);
    }


}

const usersController = new UserController();
export default usersController;