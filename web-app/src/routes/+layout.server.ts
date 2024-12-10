
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({cookies}) => {
	let type = cookies.get('type');
	let user = cookies.get('user');
	let id = cookies.get('id');
	let sponsor = cookies.get('sponsor');
	console.log(type, user, id, sponsor, "ls");
	return {type, user, id, sponsor};
};