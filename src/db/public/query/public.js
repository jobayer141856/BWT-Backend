import { desc, eq, sql, inArray } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';
import { decimalToNumber } from '../../variables.js';
import { createApi } from '../../../util/api.js';
// import { alias } from 'drizzle-orm/pg-core';

// const user = alias(hrSchema.users, 'user');

export async function selectOrderDetailsByInfoForPublic(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const { diagnosis, process } = req.query;

	const { info_uuid } = req.params;

	try {
		const api = await createApi(req);

		const fetchData = async (endpoint) =>
			await api
				.get(`${endpoint}`)
				.then((response) => response.data)
				.catch((error) => {
					console.error(
						`Error fetching data from ${endpoint}:`,
						error.message
					);
					throw error;
				});

		const [info, order] = await Promise.all([
			fetchData(`/work/info/${info_uuid}`),
			fetchData(`/work/order-by-info/${info_uuid}`),
		]);

		// Process each order to fetch diagnosis and process data conditionally
		const enrichedOrders = await Promise.all(
			order.data.map(async (orderItem) => {
				const { uuid: order_uuid } = orderItem;

				const diagnosisData =
					diagnosis === 'true'
						? await fetchData(
								`/work/diagnosis-by-order/${order_uuid}`
							)
						: null;

				const processData =
					process === 'true'
						? await fetchData(
								`/work/process?order_uuid=${order_uuid}`
							)
						: null;

				return {
					...orderItem,
					...(diagnosisData
						? { diagnosis: diagnosisData?.data }
						: {}),
					...(processData ? { process: processData?.data } : []),
				};
			})
		);
		enrichedOrders.sort(
			(a, b) => new Date(b.created_at) - new Date(a.created_at)
		);
		const response = {
			...info?.data,
			// order_entry: order?.data || [],
			order_entry: enrichedOrders || [],
		};

		const toast = {
			status: 200,
			type: 'select',
			message: 'order details by info',
		};

		return await res.status(200).json({ toast, data: response });
	} catch (error) {
		if (error.response && error.response.status === 404) {
			return res
				.status(404)
				.json({ message: 'Resource not found', error: error.message });
		}
		next(error);
	}
}
