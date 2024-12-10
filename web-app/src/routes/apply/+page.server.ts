import { mysqlconn } from '$lib/db/mysql.js';
import type { PageServerLoad } from './$types';
import {fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ }) => {
    const getSponsors = async()=>{
        return await mysqlconn.query(`SELECT * FROM sponsor_org`).then(([rows,_])=> rows);
        }
    return {sponsor:getSponsors()}
};

/** @type {import('./$types').Actions} */
export const actions = {
	apply: async ({ cookies, request }) => {
        let id = cookies.get('id');
		const data = await request.formData();

        const body1 = mysqlconn.query(`SELECT sponsor_id FROM sponsor_org WHERE sponsor_name = "${data.get('sponsor')}"`);

		const body = await mysqlconn.query(`INSERT INTO application (sponsor_id, user_id, name, sponsor_name, app_reason) VALUES('${data.get('sponsor')}', "${id}", "${data.get('name')}", "${data.get('sponsor')}", "${data.get('reason')}")`).then(([rows,_])=>{
            console.log(rows);
            throw redirect(302,'/success');
        })
    }	
};

