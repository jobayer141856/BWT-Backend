import { desc, eq } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../hr/schema.js';
import { category, group } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const categoryPromise = db
		.insert(category)
		.values(req.body)
		.returning({ insertedName: category.name });

	try {
		const data = await categoryPromise;

		const toast = {
			status: 201,
			type: 'insert',
			message: `${data[0].insertedName} inserted`,
		};

		return res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function update(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const categoryPromise = db
		.update(category)
		.set(req.body)
		.where(eq(category.uuid, req.params.uuid))
		.returning({ updatedName: category.name });

	try {
		const data = await categoryPromise;

		const toast = {
			status: 201,
			type: 'update',
			message: `${data[0].updatedName} updated`,
		};

		return res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function remove(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const categoryPromise = db
		.delete(category)
		.where(eq(category.uuid, req.params.uuid))
		.returning({ deletedName: category.name });

	try {
		const data = await categoryPromise;

		const toast = {
			status: 201,
			type: 'delete',
			message: `${data[0].deletedName} deleted`,
		};

		return res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectAll(req, res, next) {
	const categoryPromise = db
		.select({
			uuid: category.uuid,
			group_uuid: category.group_uuid,
			group_name: group.name,
			name: category.name,
			created_by: category.created_by,
			created_by_name: hrSchema.users.name,
			created_at: category.created_at,
			updated_at: category.updated_at,
			remarks: category.remarks,
		})
		.from(category)
		.leftJoin(group, eq(category.group_uuid, group.uuid))
		.leftJoin(hrSchema.users, eq(category.created_by, hrSchema.users.uuid))
		.orderBy(desc(category.created_at));

	try {
		const data = await categoryPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'categories list',
		};
		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	const categoryPromise = db
		.select({
			uuid: category.uuid,
			group_uuid: category.group_uuid,
			group_name: group.name,
			name: category.name,
			created_by: category.created_by,
			created_by_name: hrSchema.users.name,
			created_at: category.created_at,
			updated_at: category.updated_at,
			remarks: category.remarks,
		})
		.from(category)
		.leftJoin(group, eq(category.group_uuid, group.uuid))
		.leftJoin(hrSchema.users, eq(category.created_by, hrSchema.users.uuid))
		.where(eq(category.uuid, req.params.uuid));

	try {
		const data = await categoryPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'category',
		};
		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}
