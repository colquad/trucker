import { mysqlconn } from "$lib/db/mysql";
import type { PageServerLoad } from './$types';
import {fail, redirect } from '@sveltejs/kit';


export const load: PageServerLoad = async ({cookies}) => {
    let type = cookies.get('type');
    if(type=='S'){
        let sponsor = cookies.get('sponsor');
        const body = async()=>{
            return await mysqlconn.query(`SELECT * FROM driver_sponsor INNER JOIN sponsor_org ON sponsor_org.sponsor_id=driver_sponsor.sponsor_id INNER JOIN user ON driver_sponsor.user_id = user.user_id WHERE sponsor_org.sponsor_id = "${sponsor}"`).then(([rows,_])=>rows)
        }
        return {points:body()};
    }
    if(type=='A'){
        const body = async()=>{
            return await mysqlconn.query(`SELECT * FROM driver_sponsor INNER JOIN sponsor_org ON sponsor_org.sponsor_id=driver_sponsor.sponsor_id INNER JOIN user ON driver_sponsor.user_id = user.user_id`).then(([rows,_])=>rows)
        }
        return {points:body()};
    }
    // const body = await mysqlconn.query(`SELECT * FROM driver_sponsor WHERE sponsor_id = "${sponsor}"`).then(([rows,_])=>{
    //     if(rows?.length>0){
    //         console.log(rows);
    //         return {data:body()};
    //     }
    //     else{
    //         console.log("No users under this sponsor")
    //     }
    // })
}
export const actions = {
    add: async ({request}) => {
        const data = await request.formData();
        console.log(data.get('id'));
		const body = await mysqlconn.query(`UPDATE driver_sponsor SET points = (points + ${data.get('pointadd')}) WHERE user_id = "${data.get('Uid')}" AND sponsor_id = "${data.get('Sid')}"`).then(([rows,_])=>{
            console.log(rows);
			// throw redirect(302, '/points');
	    })

        const body2 = await mysqlconn.query(`INSERT INTO audit_log (user_id, action, date, point_change, point_reason) VALUES ("${data.get('Uid')}", "Points Added", NOW(), "${data.get('pointadd')}", "${data.get('addreason')}")`);
    },

    remove: async ({request}) => {
        const data = await request.formData();
        console.log(data.get('id'));
		const body = await mysqlconn.query(`UPDATE driver_sponsor SET points = (points - ${data.get('pointremove')}) WHERE user_id = "${data.get('Uid')}" AND sponsor_id = "${data.get('Sid')}"`).then(([rows,_])=>{
            console.log(rows);
			// throw redirect(302, '/points');
	    })

        const body2 = await mysqlconn.query(`INSERT INTO audit_log (user_id, action, date, point_change, point_reason) VALUES ("${data.get('id')}", "Points Removed", NOW(), "-${data.get('pointremove')}", "${data.get('removereason')}")`);
    }
}