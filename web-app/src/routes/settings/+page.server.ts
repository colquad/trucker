import { mysqlconn } from '$lib/db/mysql.js';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
/** @type { import('./$types').Actions } */



export const load: PageServerLoad = async ({ cookies }) => {
	const getUserInfo = async()=>{
        let id = cookies.get('id');
        return await mysqlconn.query(`SELECT * FROM user WHERE user_id = "${id}"`).then(([rows,_])=> rows);
    }

    return {user:getUserInfo()}
};

export const actions = {
	fname: async ({ cookies, request }) => {
		let id = cookies.get('id');
		const data = await request.formData();

		const body = await mysqlconn.query(`UPDATE user SET first_name = "${data.get('fname')}" WHERE user_id = "${id}"`).then(([rows,_])=>{
            console.log(rows);
	    })

		const body2 = await mysqlconn.query(`INSERT INTO audit_log (user_id, username, action, date, new_value) VALUES("${id}", "${data.get('username')}", "First Name Change", NOW(), "${data.get('fname')}")`);

		throw redirect(302, '/settings');
    },

	lname: async ({ cookies, request }) => {
		let id = cookies.get('id');
		const data = await request.formData();
		
		const body = await mysqlconn.query(`UPDATE user SET last_name = "${data.get('lname')}" WHERE user_id = "${id}"`).then(([rows,_])=>{
            console.log(rows);
	    })

		const body2 = await mysqlconn.query(`INSERT INTO audit_log (user_id, username, action, date, new_value) VALUES("${id}", "${data.get('username')}", "Last Name Change", NOW(), "${data.get('lname')}")`);

		throw redirect(302, '/settings');
    },

	username: async ({ cookies, request }) => {
		let id = cookies.get('id');
		const data = await request.formData();
		
		const body = await mysqlconn.query(`UPDATE user SET username = "${data.get('new-username')}" WHERE user_id = "${id}"`).then(([rows,_])=>{
			console.log(rows);
	    })

		const body2 = await mysqlconn.query(`INSERT INTO audit_log (user_id, username, action, date, new_value) VALUES("${id}", "${data.get('username')}", "Username Change", NOW(), "${data.get('new-username')}")`);

		throw redirect(302, '/settings');
    },

	password: async ({ cookies, request }) => {
		let id = cookies.get('id');
		let user = cookies.get('user');
		const data = await request.formData();

		const body = mysqlconn.query(`UPDATE user SET password = aes_encrypt("${data.get('new-pass')}","key1234") WHERE user_id = "${id}"`).then(([rows,_])=> {
			console.log(rows);
		})
		const body1 = mysqlconn.query(`INSERT INTO audit_log (user_id, username, action, date, new_value) VALUES("${id}", "${data.get('username')}", "Password Change", NOW(), "${data.get('new-pass')}")`);
		throw redirect(302, '/settings');
    },

	email: async ({ cookies, request }) => {
		let id = cookies.get('id');
		const data = await request.formData();

		const body = await mysqlconn.query(`UPDATE user SET email = "${data.get('new-email')}" WHERE user_id = "${id}"`).then(([rows,_])=>{
            console.log(rows);
	    })

		const body2 = await mysqlconn.query(`INSERT INTO audit_log (user_id, username, action, date, new_value) VALUES("${id}", "${data.get('username')}", "Email Change", NOW(), "${data.get('new-email')}")`);

		throw redirect(302, '/settings');
    },

	delete: async ({ cookies, request }) => {
		let id = cookies.get('id');
		const data = await request.formData();
		
		const body = await mysqlconn.query(`UPDATE user SET active_flag = 'N' where user_id = "${id}"`).then(([rows,_])=>{
            console.log(rows);
	    })

		const body2 = await mysqlconn.query(`INSERT INTO audit_log (user_id, username, action, date) VALUES("${id}", "${data.get('username')}", "Account Deletion", NOW())`);

		cookies.set('type','');
		throw redirect(302, '/login');
    }
};