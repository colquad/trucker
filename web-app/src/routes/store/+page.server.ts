import { mysqlconn } from "$lib/db/mysql";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
  try {
    let userID = cookies.get('id');

    // Retrieve sponsor IDs and names for the user
    let sponsorData = await mysqlconn.query(`
    SELECT driver_sponsor.user_id, driver_sponsor.sponsor_id, driver_sponsor.points, sponsor_org.sponsor_name, sponsor_org.sponsor_pointamount
    FROM driver_sponsor
    INNER JOIN sponsor_org ON driver_sponsor.sponsor_id = sponsor_org.sponsor_id
    WHERE driver_sponsor.user_id = "${userID}"
    `);

    const sponsorList = sponsorData[0];

    let songList = [];

    // Fetch songs for each sponsor including the sponsor_name
    for (const sponsor of sponsorList) {
      const data = await mysqlconn.query(`
        SELECT c.track_id, so.sponsor_name
        FROM catalog c
        INNER JOIN sponsor_org so ON c.sponsor_id = so.sponsor_id
        WHERE c.sponsor_id = "${sponsor.sponsor_id}"
      `).then(([rows, _]) => rows);

      for (const song of data) {
        const itunesSearched = await fetch(`https://itunes.apple.com/lookup?id=${song.track_id}`);
        const res = await itunesSearched.json();
        const songResults = res.results.map(result => ({ 
          ...result,
          sponsor_name: song.sponsor_name,
        points:sponsor.points
          }));
        songList.push({ songResults });
      }
      console.log('Sponsor Points:', sponsor.points); // Log sponsor points h
    }

    return { songList };
  } catch (error) {
    console.error('Error in load function:', error);
    throw error;
  }
};


