import type { PageLoad } from './$types';

import { stockOptionsService } from '$lib/services/stockOptions';

export const load: PageLoad = async ({ params }) => {
	return {
		stockPackage: await stockOptionsService.getPackage(params.id),
	};
};