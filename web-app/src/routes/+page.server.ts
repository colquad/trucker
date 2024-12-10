import { redirect } from '@sveltejs/kit';

/**
 * @type {import('./$types').PageServerLoad}
 */
export async function load({cookies}) {
	let type = cookies.get('type');
	redirect(302,'/login');
	return {type};
	// if (!locals.user) {
	// 	throw redirect(302, '/login');
	// }

	// if (!locals.otpAuthenticated) {
	// 	throw redirect(302, '/home');
	// }
}