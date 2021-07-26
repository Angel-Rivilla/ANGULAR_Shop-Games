import { Router} from 'express';
import userController from '../controllers/userController';
import {checkJwt} from './../middlewares/jwt';

class UsersRoutes{
   public router: Router = Router();
    
   constructor(){
       this.config();
   }
   config(): void {
       this.router.get('/', userController.list);
       this.router.get('/:idUser', userController.getOne);
       this.router.post('/', userController.create);
       this.router.put('/:idUser', userController.update);
       this.router.delete('/:idUser', userController.delete);
   }
}

const usersRoutes = new UsersRoutes();
export default usersRoutes.router;