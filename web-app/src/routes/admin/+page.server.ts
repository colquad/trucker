import { mysqlconn } from "$lib/db/mysql";
import type { PageServerLoad } from './$types';
import {fail, redirect } from '@sveltejs/kit';


export const load: PageServerLoad = async ({cookies}) => {
    const body = async()=>{
        return await mysqlconn.query(`SELECT * FROM user LEFT JOIN sponsor_org ON user.sponsor_id = sponsor_org.sponsor_id`).then(([rows,_])=>rows)
    }
    // const sponsor = async()=>{
    //     return await mysqlconn.query(`SELECT * FROM sponsor_org`).then(([rows,_])=>rows)
    // }
    return {user:body()};
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
    register: async ({ request }) => {
		const data = await request.formData();
		
		const body = await mysqlconn.query(`INSERT INTO user (user_type, first_name, last_name, username, password, email) VALUES("${data.get('user-type')}", "${data.get('first-name')}", "${data.get('last-name')}", "${data.get('username')}", "${data.get('password')}", "${data.get('email')}")`).then(([rows,_])=>{
            console.log(rows);
		})
	},
    fname: async ({ request }) => {
		const data = await request.formData();
		
		const body = await mysqlconn.query(`UPDATE user SET first_name = "${data.get('fname')}" WHERE user_id = "${data.get('id')}"`).then(([rows,_])=>{
            console.log(rows);
	    })

        const body2 = await mysqlconn.query(`INSERT INTO audit_log (user_id, username, action, date, new_value) VALUES("${data.get('id')}", "${data.get('username')}", "First Name Change", NOW(), "${data.get('fname')}")`);
        
        throw redirect(302, '/admin');
    },
	lname: async ({ request }) => {
		const data = await request.formData();
		
		const body = await mysqlconn.query(`UPDATE user SET last_name = "${data.get('lname')}" WHERE user_id = "${data.get('id')}"`).then(([rows,_])=>{
            console.log(rows);
	    })

        const body2 = await mysqlconn.query(`INSERT INTO audit_log (user_id, username, action, date, new_value) VALUES("${data.get('id')}", "${data.get('username')}", "Last Name Change", NOW(), "${data.get('lname')}")`);

        throw redirect(302, '/admin');
    },
	username: async ({ request }) => {
		const data = await request.formData();
		
		const body = await mysqlconn.query(`UPDATE user SET username = "${data.get('new-username')}" WHERE user_id = "${data.get('id')}"`).then(([rows,_])=>{
			console.log(rows);
	    })

        const body2 = await mysqlconn.query(`INSERT INTO audit_log (user_id, username, action, date, new_value) VALUES("${data.get('id')}", "${data.get('username')}", "Username Change", NOW(), "${data.get('new-username')}")`);

        throw redirect(302, '/admin');
    },
	password: async ({ request }) => {
		const data = await request.formData();

		const body = await mysqlconn.query(`UPDATE user SET password = aes_encrypt("${data.get('new-pass')}","key1234") WHERE user_id = "${data.get('id')}"`).then(([rows,_])=>{
            console.log(rows);
	    })

        const body2 = await mysqlconn.query(`INSERT INTO audit_log (user_id, username, action, date, new_value) VALUES("${data.get('id')}", "${data.get('username')}", "Password Change", NOW(), "${data.get('new-pass')}")`);

        throw redirect(302, '/admin');
    },
	email: async ({ request }) => {
		const data = await request.formData();

		const body = await mysqlconn.query(`UPDATE user SET email = "${data.get('new-email')}" WHERE user_id = "${data.get('id')}"`).then(([rows,_])=>{
            console.log(rows);
	    })

        const body2 = await mysqlconn.query(`INSERT INTO audit_log (user_id, username, action, date, new_value) VALUES("${data.get('id')}", "${data.get('username')}", "Email Change", NOW(), "${data.get('new-email')}")`);

        throw redirect(302, '/admin');
    },
    delete: async ({ request }) => {
		const data = await request.formData();
		
		const body = await mysqlconn.query(`UPDATE user SET active_flag = 'N' where user_id = "${data.get('id')}"`).then(([rows,_])=>{
            console.log(rows);
	    })

        const body2 = await mysqlconn.query(`INSERT INTO audit_log (user_id, username, action, date) VALUES("${data.get('id')}", "${data.get('username')}", "Account Deletion", NOW())`);
		
        throw redirect(302, '/admin');
    },
    createsponsor: async ({ request }) => {
		const data = await request.formData();
		
		const body = await mysqlconn.query(`INSERT INTO sponsor_org (sponsor_name) VALUES("${data.get('sponsor-name')}")`).then(([rows,_])=>{
            console.log(rows);
		})
	}
}