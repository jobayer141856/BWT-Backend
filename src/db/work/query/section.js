import { desc, eq } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';
import { decimalToNumber } from '../../variables.js';

import { section } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const sectionPromise = db
		.insert(section)
		.values(req.body)
		.returning({ insertedName: section.name });

	try {
		const data = await sectionPromise;
		const toast = {
			status: 201,
			type: 'insert',
			message: `${data[0].insertedName} inserted`,
		};

		return await res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function update(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const sectionPromise = db
		.update(section)
		.set(req.body)
		.where(eq(section.uuid, req.params.uuid))
		.returning({ updatedName: section.name });

	try {
		const data = await sectionPromise;
		const toast = {
			status: 201,
			type: 'update',
			message: `${data[0].updatedName} updated`,
		};

		return await res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function remove(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const sectionPromise = db
		.delete(section)
		.where(eq(section.uuid, req.params.uuid))
		.returning({ deletedName: section.name });

	try {
		const data = await sectionPromise;
		const toast = {
			status: 200,
			type: 'remove',
			message: `${data[0].deletedName} removed`,
		};

		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectAll(req, res, next) {
	const sectionPromise = db
		.select({
			uuid: section.uuid,
			name: section.name,
			created_by: section.created_by,
			created_by_name: hrSchema.users.name,
			created_at: section.created_at,
			updated_at: section.updated_at,
			remarks: section.remarks,
		})
		.from(section)
		.leftJoin(hrSchema.users, eq(section.created_by, hrSchema.users.uuid))
		.orderBy(desc(section.created_at));

	try {
		const data = await sectionPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'sections list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	const sectionPromise = db
		.select({
			uuid: section.uuid,
			name: section.name,
			created_by: section.created_by,
			created_by_name: hrSchema.users.name,
			created_at: section.created_at,
			updated_at: section.updated_at,
			remarks: section.remarks,
		})
		.from(section)
		.leftJoin(hrSchema.users, eq(section.created_by, hrSchema.users.uuid))
		.where(eq(section.uuid, req.params.uuid));

	try {
		const data = await sectionPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'section',
		};
		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
