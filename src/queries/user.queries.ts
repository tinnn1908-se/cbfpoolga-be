import { getConnection } from "../db";
import MyHelper from "../helper";
import { Picking, Pickingdetail, User } from "../model";

export default class UserQuery {
    static async createUser(user: User) {
        var connection = await getConnection();
        try {
            console.log('hashed password : ' + user.password)
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
    static async activateUser(userID: string) {
        try {
            var connection = await getConnection();
            var sql = `update users set is_activated = true where id = '${userID}'`
            var [result,] = await connection.query(sql);
            if (Number(result.affectedRows) > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }
    static async getUserByUsername(username: string) {
        try {
            var connection = await getConnection();
            var sql = `select * from users u where u.username = '${username}' and u.is_activated = true`
            var [result,] = await connection.query(sql);
            console.log('getUserByUsername : ' + Object.values(result[0]))
            return result[0];
        } catch (error) {
            console.log(error)
            return null;
        }
    }
    static async getUserByEmail(email: string) {
        try {
            console.log('getUserByEmail : ' + email)
            var connection = await getConnection();
            var sql = `SELECT * FROM users u where u.email = 'tinnn1908.se@gmail.com' and u.is_activated = true`
            var [result,] = await connection.query(sql);
            console.log('getUserByEmail : ' + Object.values(result[0]))
            return result[0];
        } catch (error) {
            console.log(error)
            return null;
        }
    }
    static async createPickingDetail(pickingDetails: Pickingdetail, pickingID: string) {
        var connection = await getConnection();
        //
        try {
            var sql = `insert into pickingdetails values('${pickingDetails.pickingDetailId}',
            '${pickingDetails.awayteam}',${pickingDetails.awayscore},${pickingDetails.awaynumber},
            '${pickingDetails.hometeam}',${pickingDetails.homescore},${pickingDetails.homenumber},
            '${pickingDetails.selected_team}',${pickingDetails.isLastgame},'${pickingID}');`;
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
    static async createPicking(picking: Picking, lastCounter: number) {
        var connection = await getConnection();
        //
        try {
            var sql = `insert into pickings values ('${picking.id}','${picking.entry}','${picking.username}',${picking.tiebreak},'${MyHelper.getCurrentDateTime()}',${lastCounter + 1})`;
            console.log('sql : ' + sql)
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
    static async getLastCounter() {
        var connection = await getConnection();
        //
        try {
            var sql = 'select * from pickings order by counter';
            var [result,] = await connection.query(sql);

            if (typeof result[0] === 'undefined') {
                return 0
            } else {
                console.log('lastCounter : ' + Number(result[0].counter))
                return Number(result[0].counter);
            }
        } catch (error) {
            console.log('error : ' + error);
            return false;
        } finally {
            connection.end();
        }
    }
    static async getAllPickingsInWeek() {
        var connection = await getConnection();
        //
        try {
            var sql = `select * from pickings`;
            var [result,] = await connection.query(sql);
            return result;
        } catch (error) {
            console.log('error : ' + error);
            return null;
        } finally {
            connection.end();
        }
    }
    static async getPickingDetailsByPickingID(pickingID: string) {
        var connection = await getConnection();
        try {
            var sql = `select * from pickingdetails where picking_id = '${pickingID}';`;
            var [result,] = await connection.query(sql);
            return result;
        } catch (error) {
            console.log('error : ' + error);
            return null;
        } finally {
            connection.end();
        }
    }

}