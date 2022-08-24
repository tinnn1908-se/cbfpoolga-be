import { getConnection } from "../db";
import { User } from "../model";

export default class UserQuery {
    static async createUser(user: User) {
        var connection = await getConnection();
        try {
            var sql = `insert into users 
            values('${user.id}','${user.username}','${user.password}',
            '${user.email}','${user.created_date}',${user.is_activated},${user.is_deleted})`;
            var [result,] = await connection.query(sql);
            if (Number(result.affectedRows > 0)) {
                return true;
            }
            return false;
        } catch (error) {
            console.log('error : ' + error);
            return false;
        } finally {
            connection.end();
        }
    }
    static async isExistedUsername(username: string) {
        var connection = await getConnection();
        try {
            var sql = `select * from users u where u.username = '${username}'`;
            var [result,] = await connection.query(sql);
            if (result.length > 0) return true;
            return false;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            connection.end();
        }
    }
    static async isExistedEmail(email: string) {
        var connection = await getConnection();
        try {
            var sql = `select * from users u where u.email = '${email}'`;
            var [result,] = await connection.query(sql);
            if (result.length > 0) return true;
            return false;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            connection.end();
        }
    }
}