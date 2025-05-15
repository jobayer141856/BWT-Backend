import { desc, eq } from 'drizzle-orm';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import { shift_group, users } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const shift_groupPromise = db
		.insert(shift_group)
		.values(req.body)
		.returning({ insertedName: shift_group.name });

	try {
		const data = await shift_groupPromise;
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

	const shift_groupPromise = db
		.update(shift_group)
		.set(req.body)
		.where(eq(shift_group.uuid, req.params.uuid))
		.returning({ updatedName: shift_group.name });

	try {
		const data = await shift_groupPromise;
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

	const shift_groupPromise = db
		.delete(shift_group)
		.where(eq(shift_group.uuid, req.params.uuid))
		.returning({ deletedName: shift_group.name });

	try {
		const data = await shift_groupPromise;
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
			uuid: shift_group.uuid,
			id: shift_group.id,
			name: shift_group.name,
			default_shift: shift_group.default_shift,
			status: shift_group.status,
			off_days: shift_group.off_days,
			created_by: shift_group.created_by,
			created_by_name: users.name,
			created_at: shift_group.created_at,
			updated_at: shift_group.updated_at,
			remarks: shift_group.remarks,
		})
		.from(shift_group)
		.leftJoin(users, eq(shift_group.created_by, users.uuid))
		.orderBy(desc(shift_group.created_at));

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'shift_group',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const shift_groupPromise = db
		.select({
			uuid: shift_group.uuid,
			id: shift_group.id,
			name: shift_group.name,
			default_shift: shift_group.default_shift,
			status: shift_group.status,
			off_days: shift_group.off_days,
			created_by: shift_group.created_by,
			created_by_name: users.name,
			created_at: shift_group.created_at,
			updated_at: shift_group.updated_at,
			remarks: shift_group.remarks,
		})
		.from(shift_group)
		.leftJoin(users, eq(shift_group.created_by, users.uuid))
		.where(eq(shift_group.uuid, req.params.uuid));

	try {
		const data = await shift_groupPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'shift_group',
		};

		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
