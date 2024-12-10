import { mysqlconn } from "$lib/db/mysql";
import type { PageServerLoad } from './$types';
import {fail, redirect } from '@sveltejs/kit';


export const load: PageServerLoad = async ({ }) => {
    const getApps = async()=>{
        return await mysqlconn.query(`SELECT * FROM audit_log`).then(([rows,_])=> rows);
            }
    return {app:getApps()}
};

export const actions = {
    accept: async ({ request }) => {
        const data = await request.formData();

        const body = await mysqlconn.query(`UPDATE application SET app_status = 'A' WHERE application_id = "${data.get('appID')}"`).then(([rows,_])=>{
        })

        throw redirect(302,'/applications');
    },

    reject: async ({ request }) => {
        const data = await request.formData();

        const body = await mysqlconn.query(`UPDATE application SET app_status = 'R' WHERE application_id = "${data.get('appID')}"`).then(([rows,_])=>{
        })
        
        throw redirect(302,'/applications');
    }
};