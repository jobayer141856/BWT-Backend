import { desc, eq } from 'drizzle-orm';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import { roster, shift_group, shifts, users } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const rosterPromise = db
		.insert(roster)
		.values(req.body)
		.returning({ insertedName: roster.id });

	try {
		const data = await rosterPromise;
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

	const rosterPromise = db
		.update(roster)
		.set(req.body)
		.where(eq(roster.id, req.params.id))
		.returning({ updatedName: roster.id });

	try {
		const data = await rosterPromise;
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

	const rosterPromise = db
		.delete(roster)
		.where(eq(roster.id, req.params.id))
		.returning({ deletedName: roster.id });

	try {
		const data = await rosterPromise;
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
			id: roster.id,
			shift_group_uuid: roster.shift_group_uuid,
			shift_group_name: shift_group.name,
			shifts_uuid: roster.shifts_uuid,
			shift_name: shifts.name,
			created_by: roster.created_by,
			created_by_name: users.name,
			created_at: roster.created_at,
			updated_at: roster.updated_at,
			remarks: roster.remarks,
		})
		.from(roster)
		.leftJoin(shift_group, eq(roster.shift_group_uuid, shift_group.uuid))
		.leftJoin(shifts, eq(roster.shifts_uuid, shifts.uuid))
		.leftJoin(users, eq(roster.created_by, users.uuid))
		.orderBy(desc(roster.created_at));

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'roster',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const rosterPromise = db
		.select({
			id: roster.id,
			shift_group_uuid: roster.shift_group_uuid,
			shift_group_name: shift_group.name,
			shifts_uuid: roster.shifts_uuid,
			shift_name: shifts.name,
			created_by: roster.created_by,
			created_by_name: users.name,
			created_at: roster.created_at,
			updated_at: roster.updated_at,
			remarks: roster.remarks,
		})
		.from(roster)
		.leftJoin(shift_group, eq(roster.shift_group_uuid, shift_group.uuid))
		.leftJoin(shifts, eq(roster.shifts_uuid, shifts.uuid))
		.leftJoin(users, eq(roster.created_by, users.uuid))
		.where(eq(roster.id, req.params.id));

	try {
		const data = await rosterPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'roster',
		};

		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
