import { desc, eq, sql } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';
import { createApi } from '../../../util/api.js';

import { branch, purchase, vendor, purchase_return } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const purchaseReturnPromise = db
		.insert(purchase_return)
		.values(req.body)
		.returning({ insertedUuid: purchase_return.uuid });

	try {
		const data = await purchaseReturnPromise;
		const toast = {
			status: 201,
			type: 'insert',
			message: `${data[0].insertedUuid} inserted`,
		};

		return await res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function update(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const purchaseReturnPromise = db
		.update(purchase_return)
		.set(req.body)
		.where(eq(purchase_return.uuid, req.params.uuid))
		.returning({ updatedUuid: purchase_return.uuid });

	try {
		const data = await purchaseReturnPromise;
		const toast = {
			status: 201,
			type: 'update',
			message: `${data[0].updatedUuid} updated`,
		};

		return await res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function remove(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const purchaseReturnPromise = db
		.delete(purchase_return)
		.where(eq(purchase_return.uuid, req.params.uuid))
		.returning({ deletedUuid: purchase_return.uuid });

	try {
		const data = await purchaseReturnPromise;
		const toast = {
			status: 201,
			type: 'delete',
			message: `${data[0].deletedUuid} deleted`,
		};

		return await res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectAll(req, res, next) {
	if (!(await validateRequest(req, next))) return;
	const purchaseReturnPromise = db
		.select({
			uuid: purchase_return.uuid,
			id: purchase_return.id,
			purchase_return_id: sql`CONCAT(
            'SPR',
				TO_CHAR(${purchase_return.created_at}, 'YY'),
				' - ',
				TO_CHAR(${purchase_return.id}, 'FM0000')
			)`,
			purchase_uuid: purchase_return.purchase_uuid,
			purchase_id: sql`CONCAT(
				'SP',
				TO_CHAR(${purchase.created_at}, 'YY'),
				' - ',
				TO_CHAR(${purchase.id}, 'FM0000')
			)`,
			created_by: purchase_return.created_by,
			created_by_name: hrSchema.users.name,
			created_at: purchase_return.created_at,
			updated_at: purchase_return.updated_at,
			remarks: purchase_return.remarks,
		})
		.from(purchase_return)
		.leftJoin(
			hrSchema.users,
			eq(purchase_return.created_by, hrSchema.users.uuid)
		)
		.leftJoin(purchase, eq(purchase_return.purchase_uuid, purchase.uuid))
		.orderBy(purchase_return.created_at, desc);

	try {
		const data = await purchaseReturnPromise;

		const toast = {
			status: 200,
			type: 'select all',
			message: 'purchase return list',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const purchaseReturnPromise = db
		.select({
			uuid: purchase_return.uuid,
			id: purchase_return.id,
			purchase_return_id: sql`CONCAT(
            'SPR',
                TO_CHAR(${purchase_return.created_at}, 'YY'),
                ' - ',
                TO_CHAR(${purchase_return.id}, 'FM0000')
            )`,
			purchase_uuid: purchase_return.purchase_uuid,
			purchase_id: sql`CONCAT(
                'SP',
                TO_CHAR(${purchase.created_at}, 'YY'),
                ' - ',
                TO_CHAR(${purchase.id}, 'FM0000')
            )`,
			created_by: purchase_return.created_by,
			created_by_name: hrSchema.users.name,
			created_at: purchase_return.created_at,
			updated_at: purchase_return.updated_at,
			remarks: purchase_return.remarks,
		})
		.from(purchase_return)
		.leftJoin(
			hrSchema.users,
			eq(purchase_return.created_by, hrSchema.users.uuid)
		)
		.leftJoin(purchase, eq(purchase_return.purchase_uuid, purchase.uuid))
		.where(eq(purchase_return.uuid, req.params.uuid));

	try {
		const data = await purchaseReturnPromise;

		const toast = {
			status: 200,
			type: 'select',
			message: 'purchase return',
		};

		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}

export async function selectPurchaseReturnEntryDetailsByPurchaseReturnUuid(
	req,
	res,
	next
) {
	if (!(await validateRequest(req, next))) return;

	const { purchase_return_uuid } = req.params;

	try {
		const api = await createApi(req);

		const fetchData = async (endpoint) =>
			await api
				.get(`${endpoint}/${purchase_return_uuid}`)
				.then((response) => response.data)
				.catch((error) => {
					throw error;
				});

		const [purchase_return, purchase_return_entry] = await Promise.all([
			fetchData('/store/purchase_return'),
			fetchData('/store/purchase_return_entry/by'),
		]);

		const response = {
			...purchase_return?.data?.data,
			purchase_return_entry: purchase_return_entry?.data?.data || [],
		};

		const toast = {
			status: 200,
			type: 'select',
			message: 'purchase return entry details',
		};

		return res.status(200).json({ toast, data: response });
	} catch (error) {
		next(error);
	}
}
