import { mysqlconn } from "$lib/db/mysql";
import type { PageServerLoad } from './$types';
import {fail, redirect } from '@sveltejs/kit';


export const load: PageServerLoad = async ({cookies}) => {
    let type = cookies.get('type');
    const getSponsor = async()=>{
        let id = cookies.get('id');
        return await mysqlconn.query(`SELECT driver_sponsor.user_id, driver_sponsor.sponsor_id, driver_sponsor.points, sponsor_org.sponsor_name, sponsor_org.sponsor_pointamount FROM driver_sponsor INNER JOIN sponsor_org ON driver_sponsor.sponsor_id = sponsor_org.sponsor_id WHERE user_id = "${id}"`).then(([rows,_])=> rows);
    }
    const getPoints = async()=>{
        let id = cookies.get('id');
        return await mysqlconn.query(`SELECT * FROM driver_sponsor WHERE user_id = "${id}"`).then(([rows,_])=> rows);
    }
    return {type,user:getPoints(),sponsor:getSponsor()}
}
export const actions = {
    sponsor: async ({request}) => {
        const data = await request.formData();
        console.log("submitted");
        let points = await mysqlconn.query(`SELECT driver_sponsor.points FROM driver_sponsor INNER JOIN sponsor_org ON driver_sponsor.sponsor_id = sponsor_org.sponsor_id WHERE sponsor_name = '${data.get('sponsor')}'`); 
        return {points}
    }
}