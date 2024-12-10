import { mysqlconn } from "$lib/db/mysql";
import type { PageServerLoad } from './$types';
import {fail, redirect } from '@sveltejs/kit';


export const load: PageServerLoad = async ({ cookies }) => {
    let id = cookies.get('sponsor');
    let type = cookies.get('type');

    const getApps = async()=>{
        if (type == 'S') {
            return await mysqlconn.query(`SELECT * FROM application WHERE sponsor_id = "${id}" AND app_status = 'P'`).then(([rows,_])=> rows);
        }
        else if (type == 'A') {
            return await mysqlconn.query(`SELECT * FROM application WHERE app_status = 'P'`).then(([rows,_])=> rows);
        }
    }
    return {app:getApps()}
};

export const actions = {
    accept: async ({ request }) => {
        const data = await request.formData();

        const body = await mysqlconn.query(`UPDATE application SET app_status = 'A', decision_reason = "${data.get('acceptreason')}" WHERE application_id = "${data.get('appID')}"`).then(([rows,_])=>{
        })

        const body1 = await mysqlconn.query(`INSERT INTO driver_sponsor (user_id, sponsor_id, points) VALUES("${data.get('driverID')}", "${data.get('sponsor')}", 0)`).then(([rows,_])=>{
        })

        const body2 = await mysqlconn.query(`INSERT INTO audit_log (user_id, action, date, app_id, application_sponsor_id, app_status, app_reason) VALUES ("${data.get('driverID')}", "Application Accepted", NOW(), "${data.get('appID')}", "${data.get('sponsor')}", 'A', "${data.get('acceptreason')}")`);
        
        throw redirect(302,'/applications');
    },

    reject: async ({ request }) => {
        const data = await request.formData();

        const body = await mysqlconn.query(`UPDATE application SET app_status = 'R', decision_reason = "${data.get('rejectreason')}" WHERE application_id = "${data.get('appID')}"`).then(([rows,_])=>{
        })

        const body1 = await mysqlconn.query(`INSERT INTO audit_log (user_id, action, date, app_id, application_sponsor_id, app_status, app_reason) VALUES ("${data.get('driverID')}", "Application Rejected", NOW(), "${data.get('appID')}", "${data.get('sponsor')}", 'R', "${data.get('rejectreason')}")`);
        
        throw redirect(302,'/applications');
    }
};