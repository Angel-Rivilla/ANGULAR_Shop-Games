"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bcrypt = __importStar(require("bcryptjs"));
class UserController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield database_1.default.query('SELECT * FROM user');
            if (users.length > 0) {
                res.json(users);
            }
            else {
                res.status(404).json({ message: 'Not result' });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUser } = req.params;
            const users = yield database_1.default.query('SELECT * FROM user WHERE idUser = ?', [idUser]);
            if (users.length > 0) {
                return res.json(users[0]);
            }
            res.status(404).json({ text: "The user doesn't exist" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO user set ?', [req.body]);
            res.json({ message: 'User Saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUser } = req.params;
            //const user = await pool.query('SELECT idUser FROM user WHERE idUser = ?', [idUser]);
            yield database_1.default.query('UPDATE user set ? WHERE idUser = ?', [req.body, idUser]);
            res.json({ message: 'The user was updated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUser } = req.params;
            yield database_1.default.query('DELETE FROM user WHERE idUser = ?', [idUser]);
            res.json({ message: 'The user was deleted' });
        });
    }
    verifyToken(req, res) {
        if (!req.headers.authorization)
            return res.status(401).json('No autorizado');
        const token = req.headers.authorization.substr(7);
        console.log(token);
    }
    hashPassword(password) {
        const salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, salt);
    }
    checkPassword(password, passwordUser) {
        return bcrypt.compareSync(password, passwordUser);
    }
}
const usersController = new UserController();
exports.default = usersController;
