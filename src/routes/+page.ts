import type { PageLoad } from './$types';

import { stockOptionsService } from '$lib/services/stockOptions';

export const load: PageLoad = async () => {
	return {
		stockPackages: await stockOptionsService.getPackages(),
	};
};