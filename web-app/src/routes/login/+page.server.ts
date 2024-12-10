import { mysqlconn } from '$lib/db/mysql.js';
import {fail, redirect } from '@sveltejs/kit';
// Define and export the errorMessage variable
import { _errorMessage } from './errorMessageStore';



/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ cookies, request }) => {
		// Declare the errorMessage variable
		const data = await request.formData();

		const body = await mysqlconn.query(`SELECT username,user_type, user_id, sponsor_id, active_flag FROM user WHERE (email="${data.get('emailuid')}" OR username="${data.get('emailuid')}") AND password=aes_encrypt("${data.get('password')}","key1234")`).then(([rows,_])=>{
            //@ts-ignore
			if(rows[0]?.active_flag == 'N') {
				_errorMessage.set( 'Incorrect username or password');
			}
			else if(rows?.length>0){
            //@ts-ignore
				cookies.set('type', rows[0]?.user_type);
				cookies.set('user', rows[0]?.username);
				cookies.set('id', rows[0]?.user_id);
				cookies.set('sponsor', rows[0]?.sponsor_id);
				let uid = cookies.get('id');
				console.log(rows[0]);
				const body2 = mysqlconn.query(`INSERT INTO audit_log (user_id, username, action, date, user_attempt, pass_attempt) VALUES ("${uid}", "${data.get('emailuid')}", "Login Success", NOW(), "${data.get('emailuid')}", "${data.get('password')}")`);
				throw redirect(302,'/');
			
			}
			else{
				 _errorMessage.set( 'Incorrect username or password');
				 const body2 = mysqlconn.query(`INSERT INTO audit_log (action, date, user_attempt, pass_attempt) VALUES ("Login Failure", NOW(), "${data.get('emailuid')}", "${data.get('password')}")`);
				 throw redirect(302,'/login');
			}
        })
		

		// throw redirect(307, '/');
	},

	register: async ({ request }) => {
		const data = await request.formData();

		const body = await mysqlconn.query(`INSERT IGNORE INTO user (user_type, first_name, last_name, username, password, email) VALUES("${data.get('user-type')}", "${data.get('first-name')}", "${data.get('last-name')}", "${data.get('username')}", "${data.get('password')}", "${data.get('email')}")`).then(([rows,_])=>{
			console.log(rows);
		})
	},

	logout: ({cookies})=>{
		console.log('fart');
		cookies.set('type','');
	}

	
};

