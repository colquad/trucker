import { mysqlconn } from "$lib/db/mysql";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
    const body = async()=>{
        return await mysqlconn.query(`SELECT * FROM team21.order INNER JOIN user ON user.user_id = team21.order.user_id INNER JOIN sponsor_org ON sponsor_org.sponsor_id = user.sponsor_id`).then(([rows,_])=> rows);
    }
    return {order:body()}
};