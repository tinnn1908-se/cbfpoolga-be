import { Request, Response } from "express";
import MyHelper from "../helper";
import { User } from "../model";
import UserQuery from "../queries/user.queries";

export default class AuthController {
    static async register(request: Request, response: Response) {
        var username = request.body.username;
        var password = request.body.password;
        var email = request.body.email;
        // check isExisted
        var id = MyHelper.generateID();
        var created_date = MyHelper.getCurrentDateTime();
        var user: User = { id, username, password, email, created_date, is_deleted: false };
        var isCreated = await UserQuery.createUser(user);
        console.log(user)
        if (isCreated) return response.status(200).json({ user });
        return response.status(304).json({
            'message': 'Create User Failed !'
        })
    }
}