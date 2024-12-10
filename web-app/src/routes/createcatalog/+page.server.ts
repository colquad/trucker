import { mysqlconn } from '$lib/db/mysql.js';
let songId = '';
let limit = 0;
export const actions = {
    searchapi: async ({ request }) => {
        const data = await request.formData();
        songId = data.get('songId');
        limit = data.get('limit');
      },
    sendCatalogToDB: async ({ cookies, request }) => {
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
        //console.log(songData);
        songData.forEach((song) => {
            const body = mysqlconn.query(`INSERT INTO catalog(sponsor_id, track_id) VALUES(${sponsor_org}, ${song.trackId})`);
        });
    }
};

export async function load() {
  if(limit === 0){
    return { songResults: [] };
  }
    const itunesSearched = await fetch(`https://itunes.apple.com/search?term=${songId}&entity=song&limit=${limit}`);
    var res = await itunesSearched.json();
    var songResults = res.results;
    // console.log("API Results:");
    // console.log(songResults);
    return {songResults}
 }