import { mysqlconn } from '$lib/db/mysql.js';

export const actions = {
    removeFromCatalog: async ({ cookies, request }) => {
        let username = cookies.get('user');
        let sponsor_org = await mysqlconn.query(`SELECT sponsor_id from user where username = "${username}"`);
        sponsor_org = sponsor_org[0][0].sponsor_id;
    
        const data = await request.formData();
        const selectedSongs = data.getAll('selectedSongs');
    
        const songData = selectedSongs.map((songId) => {
          const songInfo = JSON.parse(data.get(`selectedSong[${songId}]`));
          return {
            trackId: songId
          };
        });
        songData.forEach((song) => {
            const body = mysqlconn.query(`DELETE FROM catalog WHERE sponsor_id = ${sponsor_org} AND track_id = "${song.trackId}"`);
        });
    }
};

export const load: PageServerLoad = async ({cookies}) => {
    let username = cookies.get('user');
    let sponsor_org = await mysqlconn.query(`SELECT sponsor_id from user where username = "${username}"`);
    sponsor_org = sponsor_org[0][0].sponsor_id;
    let songList = [];
        const data = await mysqlconn.query(`SELECT track_id FROM catalog where sponsor_id = "${sponsor_org}"`).then(([rows,_])=> rows);
        for (const song of data) {
            const itunesSearched = await fetch(`https://itunes.apple.com/lookup?id=${song.track_id}`);
            const res = await itunesSearched.json();
            const songResults = res.results;
            //console.log(songResults);
            songList.push({ songResults });
        }
    return {songList}
};
