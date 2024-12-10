import { mysqlconn } from "$lib/db/mysql";
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({}) => {
	// return {
	// 	post: await mysqlconn.query('SELECT * FROM about').then(function([rows,fields]) {
    //         			console.log(rows);
    //         			return {rows};
    //         		}),
    //                 return {
    //                     data: results,
    //                   };
	// };
    const getAbout = async()=>{
        return await mysqlconn.query('SELECT * FROM about').then(([rows,_])=> rows);
    }
    // let results = await mysqlconn.query('SELECT * FROM about')
    //     .then(function([rows,fields]) {
    //         console.log(rows);
    //         return rows;
    //     });
    
    // return {
    //     body: results
    // }
    return {about:getAbout()}
};
// export const load: PageServerLoad = async ({ params }) => {
//     return{
//         post: {
//             sprint_num: `${params}`,
//             team_num: `${params}`,
//             release_date: `${params}`,
//             product_date: `${params}`,
//             product_description: `${params}`
//         },
// };
// }