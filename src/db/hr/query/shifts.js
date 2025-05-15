import { desc, eq } from 'drizzle-orm';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import { shifts, users } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const shiftsPromise = db
		.insert(shifts)
		.values(req.body)
		.returning({ insertedName: shifts.name });

	try {
		const data = await shiftsPromise;
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

	const shiftsPromise = db
		.update(shifts)
		.set(req.body)
		.where(eq(shifts.uuid, req.params.uuid))
		.returning({ updatedName: shifts.name });

	try {
		const data = await shiftsPromise;
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

	const shiftsPromise = db
		.delete(shifts)
		.where(eq(shifts.uuid, req.params.uuid))
		.returning({ deletedName: shifts.name });

	try {
		const data = await shiftsPromise;
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
			uuid: shifts.uuid,
			id: shifts.id,
			name: shifts.name,
			start_time: shifts.start_time,
			end_time: shifts.end_time,
			late_time: shifts.late_time,
			early_exit_before: shifts.early_exit_before,
			first_half_end: shifts.first_half_end,
			break_time_end: shifts.break_time_end,
			default_shift: shifts.default_shift,
			color: shifts.color,
			status: shifts.status,
			created_by: shifts.created_by,
			created_by_name: users.name,
			created_at: shifts.created_at,
			updated_at: shifts.updated_at,
			remarks: shifts.remarks,
		})
		.from(shifts)
		.leftJoin(users, eq(shifts.created_by, users.uuid))
		.orderBy(desc(shifts.created_at));

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'shifts',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const shiftsPromise = db
		.select({
			uuid: shifts.uuid,
			id: shifts.id,
			name: shifts.name,
			start_time: shifts.start_time,
			end_time: shifts.end_time,
			late_time: shifts.late_time,
			early_exit_before: shifts.early_exit_before,
			first_half_end: shifts.first_half_end,
			break_time_end: shifts.break_time_end,
			default_shift: shifts.default_shift,
			color: shifts.color,
			status: shifts.status,
			created_by: shifts.created_by,
			created_by_name: users.name,
			created_at: shifts.created_at,
			updated_at: shifts.updated_at,
			remarks: shifts.remarks,
		})
		.from(shifts)
		.leftJoin(users, eq(shifts.created_by, users.uuid))
		.where(eq(shifts.uuid, req.params.uuid));

	try {
		const data = await shiftsPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'shifts',
		};

		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
