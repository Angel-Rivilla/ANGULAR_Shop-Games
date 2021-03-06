"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const username = req.body.username;
            const password = req.body.password;
            const usernameBd = yield database_1.default.query('SELECT password FROM user WHERE username = ?', [username]);
            const passwordBd = yield database_1.default.query('SELECT password FROM user WHERE password = ?', [password]);
            const user = yield database_1.default.query('SELECT * FROM user WHERE username = ?', [username]);
            if (!(username && password)) {
                res.status(400).json({ message: 'Username & Password are required!' });
            }
            else {
                //Comparar si existe en la BD
                if (username == usernameBd && password == passwordBd) {
                    res.send(user);
                }
                else {
                    res.status(400).json({ message: 'Username or password incorrect!' });
                }
            }
            //const token = jwt.sign({username, password}, config.jwtSecret,{expiresIn: '1h'});
            //res.json({message: 'OK', token});
        });
    }
    ;
}
const authController = new AuthController();
exports.default = authController;
