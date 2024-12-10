import { mysqlconn } from "$lib/db/mysql";
import type { PageServerLoad } from './$types';

export const actions = {
    changepoints: async ({ cookies, request }) => {
        const data = await request.formData();
        let username = cookies.get('user');
        let sponsor_org = await mysqlconn.query(`SELECT sponsor_id from user where username = "${username}"`);
        // @ts-ignore
        sponsor_org = sponsor_org[0][0].sponsor_id;
        const body = await mysqlconn.query(`UPDATE sponsor_org SET sponsor_pointamount = "${data.get('points')}" WHERE sponsor_id = "${sponsor_org}"`).then(([rows,_])=>{
            console.log(rows);
        })
    }
}

export const load: PageServerLoad = async ({cookies}) => {
    let username = cookies.get('user');
    let sponsor_org = await mysqlconn.query(`SELECT sponsor_id from user where username = "${username}"`);
    // @ts-ignore
    sponsor_org = sponsor_org[0][0].sponsor_id;
    let songList = [];
        const data = await mysqlconn.query(`SELECT track_id FROM catalog where sponsor_id = "${sponsor_org}"`).then(([rows,_])=> rows);
        // @ts-ignore
        for (const song of data) {
            const itunesSearched = await fetch(`https://itunes.apple.com/lookup?id=${song.track_id}`);
            const res = await itunesSearched.json();
            const songResults = res.results;
            //console.log(songResults);
            songList.push({ songResults });
        }
    return {songList}
};

