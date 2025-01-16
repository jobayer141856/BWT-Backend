import { desc, eq, sql } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';
import { createApi } from '../../../util/api.js';
import { decimalToNumber } from '../../variables.js';
import { product, purchase_return_entry, purchase_return } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const purchaseReturnEntryPromise = db
		.insert(purchase_return_entry)
		.values(req.body)
		.returning({ insertedUuid: purchase_return_entry.uuid });

	try {
		const data = await purchaseReturnEntryPromise;
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

	const purchaseReturnEntryPromise = db
		.update(purchase_return_entry)
		.set(req.body)
		.where(eq(purchase_return_entry.uuid, req.params.uuid))
		.returning({ updatedUuid: purchase_return_entry.uuid });

	try {
		const data = await purchaseReturnEntryPromise;
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

	const purchaseReturnEntryPromise = db
		.delete(purchase_return_entry)
		.where(eq(purchase_return_entry.uuid, req.params.uuid))
		.returning({ deletedUuid: purchase_return_entry.uuid });

	try {
		const data = await purchaseReturnEntryPromise;
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
	const purchaseReturnEntryPromise = db
		.select({
			uuid: purchase_return_entry.uuid,
			purchase_return_uuid: purchase_return_entry.purchase_return_uuid,
			purchase_return_id: sql`CONCAT(
                        'SPRE',
                            TO_CHAR(${purchase_return.created_at}, 'YY'),
                            ' - ',
                            TO_CHAR(${purchase_return.id}, 'FM0000')
                        )`,
			product_uuid: purchase_return_entry.product_uuid,
			product_name: product.name,
			quantity: decimalToNumber(purchase_return_entry.quantity),
			price_per_unit: decimalToNumber(
				purchase_return_entry.price_per_unit
			),
			created_by: purchase_return_entry.created_by,
			created_by_name: hrSchema.users.name,
			created_at: purchase_return_entry.created_at,
			updated_at: purchase_return_entry.updated_at,
			remarks: purchase_return_entry.remarks,
		})
		.from(purchase_return_entry)
		.leftJoin(product, eq(purchase_return_entry.product_uuid, product.uuid))
		.leftJoin(
			hrSchema.users,
			eq(purchase_return_entry.created_by, hrSchema.users.uuid)
		)
		.leftJoin(
			purchase_return,
			eq(purchase_return_entry.purchase_return_uuid, purchase_return.uuid)
		)
		.orderBy(desc(purchase_return_entry.created_at));

	try {
		const data = await purchaseReturnEntryPromise;

		const toast = {
			status: 200,
			type: 'select all',
			message: 'purchase return entry list',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;
	const purchaseReturnEntryPromise = db
		.select({
			uuid: purchase_return_entry.uuid,
			purchase_return_uuid: purchase_return_entry.purchase_return_uuid,
			purchase_return_id: sql`CONCAT(
                        'SPRE',
                            TO_CHAR(${purchase_return.created_at}, 'YY'),
                            ' - ',
                            TO_CHAR(${purchase_return.id}, 'FM0000')
                        )`,
			product_uuid: purchase_return_entry.product_uuid,
			product_name: product.name,
			quantity: decimalToNumber(purchase_return_entry.quantity),
			price_per_unit: decimalToNumber(
				purchase_return_entry.price_per_unit
			),
			created_by: purchase_return_entry.created_by,
			created_by_name: hrSchema.users.name,
			created_at: purchase_return_entry.created_at,
			updated_at: purchase_return_entry.updated_at,
			remarks: purchase_return_entry.remarks,
		})
		.from(purchase_return_entry)
		.leftJoin(product, eq(purchase_return_entry.product_uuid, product.uuid))
		.leftJoin(
			hrSchema.users,
			eq(purchase_return_entry.created_by, hrSchema.users.uuid)
		)
		.leftJoin(
			purchase_return,
			eq(purchase_return_entry.purchase_return_uuid, purchase_return.uuid)
		)
		.where(eq(purchase_return_entry.uuid, req.params.uuid));

	try {
		const data = await purchaseReturnEntryPromise;

		const toast = {
			status: 200,
			type: 'select',
			message: 'purchase return entry',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectByPurchaseReturnUuid(req, res, next) {
	if (!(await validateRequest(req, next))) return;
	const { purchase_return_uuid } = req.params;

	const purchaseReturnEntryPromise = db
		.select({
			uuid: purchase_return_entry.uuid,
			purchase_return_uuid: purchase_return_entry.purchase_return_uuid,
			purchase_return_id: sql`CONCAT(
                        'SPRE',
                            TO_CHAR(${purchase_return.created_at}, 'YY'),
                            ' - ',
                            TO_CHAR(${purchase_return.id}, 'FM0000')
                        )`,
			product_uuid: purchase_return_entry.product_uuid,
			product_name: product.name,
			quantity: decimalToNumber(purchase_return_entry.quantity),
			price_per_unit: decimalToNumber(
				purchase_return_entry.price_per_unit
			),
			created_by: purchase_return_entry.created_by,
			created_by_name: hrSchema.users.name,
			created_at: purchase_return_entry.created_at,
			updated_at: purchase_return_entry.updated_at,
			remarks: purchase_return_entry.remarks,
		})
		.from(purchase_return_entry)
		.leftJoin(product, eq(purchase_return_entry.product_uuid, product.uuid))
		.leftJoin(
			hrSchema.users,
			eq(purchase_return_entry.created_by, hrSchema.users.uuid)
		)
		.leftJoin(
			purchase_return,
			eq(purchase_return_entry.purchase_return_uuid, purchase_return.uuid)
		)
		.where(
			eq(purchase_return_entry.purchase_return_uuid, purchase_return_uuid)
		);

	try {
		const data = await purchaseReturnEntryPromise;

		const toast = {
			status: 200,
			type: 'select',
			message: 'purchase return entry list by purchase return uuid',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}
