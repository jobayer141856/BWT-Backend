import { desc, eq } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';
import { createApi } from '../../../util/api.js';
import { branch, purchase, vendor } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const purchasePromise = db
		.insert(purchase)
		.values(req.body)
		.returning({ insertedUuid: purchase.uuid });

	try {
		const data = await purchasePromise;
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

	const purchasePromise = db
		.update(purchase)
		.set(req.body)
		.where(eq(purchase.uuid, req.params.uuid))
		.returning({ updatedUuid: purchase.uuid });

	try {
		const data = await purchasePromise;
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

	const purchasePromise = db
		.delete(purchase)
		.where(eq(purchase.uuid, req.params.uuid))
		.returning({ deletedUuid: purchase.uuid });

	try {
		const data = await purchasePromise;
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
	const purchasePromise = db
		.select({
			uuid: purchase.uuid,
			id: purchase.id,
			vendor_uuid: purchase.vendor_uuid,
			vendor_name: vendor.name,
			branch_uuid: purchase.branch_uuid,
			branch_name: branch.name,
			date: purchase.date,
			payment_mode: purchase.payment_mode,
			created_by: purchase.created_by,
			created_by_name: hrSchema.users.name,
			created_at: purchase.created_at,
			updated_at: purchase.updated_at,
			remarks: purchase.remarks,
		})
		.from(purchase)
		.leftJoin(vendor, eq(purchase.vendor_uuid, vendor.uuid))
		.leftJoin(branch, eq(purchase.branch_uuid, branch.uuid))
		.leftJoin(hrSchema.users, eq(purchase.created_by, hrSchema.users.uuid))
		.orderBy(desc(purchase.created_at));

	try {
		const data = await purchasePromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'purchases list',
		};
		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	const purchasePromise = db
		.select({
			uuid: purchase.uuid,
			id: purchase.id,
			vendor_uuid: purchase.vendor_uuid,
			vendor_name: vendor.name,
			branch_uuid: purchase.branch_uuid,
			branch_name: branch.name,
			date: purchase.date,
			payment_mode: purchase.payment_mode,
			created_by: purchase.created_by,
			created_by_name: hrSchema.users.name,
			created_at: purchase.created_at,
			updated_at: purchase.updated_at,
			remarks: purchase.remarks,
		})
		.from(purchase)
		.leftJoin(vendor, eq(purchase.vendor_uuid, vendor.uuid))
		.leftJoin(branch, eq(purchase.branch_uuid, branch.uuid))
		.leftJoin(hrSchema.users, eq(purchase.created_by, hrSchema.users.uuid))
		.where(eq(purchase.uuid, req.params.uuid));

	try {
		const data = await purchasePromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'purchase',
		};
		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}

export async function selectPurchaseEntryDetailsByPurchaseUuid(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const { purchase_uuid } = req.params;

	try {
		const api = await createApi(req);

		const fetchData = async (endpoint) =>
			await api
				.get(`${endpoint}/${purchase_uuid}`)
				.then((response) => response);

		const [purchase, purchase_entry] = await Promise.all([
			fetchData('/store/purchase'),
			fetchData('/store/purchase-entry/by'),
		]);

		//console.log('Purchase data:', purchase);
		//console.log('Purchase entry data:', purchase_entry);
		const response = {
			...purchase?.data?.data,
			purchase_entry: purchase_entry?.data?.data || [],
		};

		const toast = {
			status: 200,
			type: 'select',
			message: 'purchase entry details',
		};

		return res.status(200).json({ toast, data: response });
	} catch (error) {
		next(error);
	}
}
