import { mysqlconn } from '$lib/db/mysql.js';
import type { PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
/** @type { import('./$types').Actions } */

export const actions = {
	cancel: async ({ cookies, request }) => {
		let id = cookies.get('id');
		const data = await request.formData();
		
        const appID = await mysqlconn.query(`SELECT * FROM application WHERE application_id = (SELECT MAX(application_id) FROM application where user_id = "${id}")`);
        console.log(appID[0][0].application_id);

		const body = await mysqlconn.query(`DELETE FROM application WHERE application_id = "${appID[0][0].application_id}"`).then(([rows,_])=>{
            console.log(rows);
            throw redirect(302, '/');
	    })
    },

    undocancel: async ({ }) => {
        throw redirect(302, '/success');
    }
};