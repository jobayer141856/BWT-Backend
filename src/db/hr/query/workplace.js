import { desc, eq } from 'drizzle-orm';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import { users, workplace } from '../schema.js';
import { decimalToNumber } from '../../variables.js';
export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const workplacePromise = db
		.insert(workplace)
		.values(req.body)
		.returning({ insertedName: workplace.name });

	try {
		const data = await workplacePromise;
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

	const workplacePromise = db
		.update(workplace)
		.set(req.body)
		.where(eq(workplace.uuid, req.params.uuid))
		.returning({ updatedName: workplace.name });

	try {
		const data = await workplacePromise;
		const toast = {
			status: 200,
			type: 'update',
			message: `${data[0].updatedName} updated`,
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function remove(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const workplacePromise = db
		.delete(workplace)
		.where(eq(workplace.uuid, req.params.uuid))
		.returning({ deletedName: workplace.name });

	try {
		const data = await workplacePromise;
		const toast = {
			status: 200,
			type: 'delete',
			message: `${data[0].deletedName} deleted`,
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectAll(req, res, next) {
	const resultPromise = db
		.select({
			uuid: workplace.uuid,
			id: workplace.id,
			name: workplace.name,
			hierarchy: workplace.hierarchy,
			status: workplace.status,
			latitude: decimalToNumber(workplace.latitude),
			longitude: decimalToNumber(workplace.longitude),
			created_by: workplace.created_by,
			created_by_name: users.name,
			created_at: workplace.created_at,
			updated_at: workplace.updated_at,
			remarks: workplace.remarks,
		})
		.from(workplace)
		.leftJoin(users, eq(workplace.created_by, users.uuid))
		.orderBy(desc(workplace.created_at));

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'workplace',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const workplacePromise = db
		.select({
			uuid: workplace.uuid,
			id: workplace.id,
			name: workplace.name,
			hierarchy: workplace.hierarchy,
			status: workplace.status,
			latitude: decimalToNumber(workplace.latitude),
			longitude: decimalToNumber(workplace.longitude),
			created_by: workplace.created_by,
			created_by_name: users.name,
			created_at: workplace.created_at,
			updated_at: workplace.updated_at,
			remarks: workplace.remarks,
		})
		.from(workplace)
		.leftJoin(users, eq(workplace.created_by, users.uuid))
		.where(eq(workplace.uuid, req.params.uuid));

	try {
		const data = await workplacePromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'workplace',
		};

		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
