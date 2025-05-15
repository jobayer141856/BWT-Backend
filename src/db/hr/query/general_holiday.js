import { desc, eq } from 'drizzle-orm';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import { general_holiday, users } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const general_holidayPromise = db
		.insert(general_holiday)
		.values(req.body)
		.returning({ insertedName: general_holiday.name });

	try {
		const data = await general_holidayPromise;
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

	const general_holidayPromise = db
		.update(general_holiday)
		.set(req.body)
		.where(eq(general_holiday.uuid, req.params.uuid))
		.returning({ updatedName: general_holiday.name });

	try {
		const data = await general_holidayPromise;
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

	const general_holidayPromise = db
		.delete(general_holiday)
		.where(eq(general_holiday.uuid, req.params.uuid))
		.returning({ deletedName: general_holiday.name });

	try {
		const data = await general_holidayPromise;
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
			uuid: general_holiday.uuid,
			id: general_holiday.id,
			name: general_holiday.name,
			date: general_holiday.date,
			created_by: general_holiday.created_by,
			created_by_name: users.name,
			created_at: general_holiday.created_at,
			updated_at: general_holiday.updated_at,
			remarks: general_holiday.remarks,
		})
		.from(general_holiday)
		.leftJoin(users, eq(general_holiday.created_by, users.uuid))
		.orderBy(desc(general_holiday.created_at));

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'general_holiday',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const general_holidayPromise = db
		.select({
			uuid: general_holiday.uuid,
			id: general_holiday.id,
			name: general_holiday.name,
			date: general_holiday.date,
			created_by: general_holiday.created_by,
			created_by_name: users.name,
			created_at: general_holiday.created_at,
			updated_at: general_holiday.updated_at,
			remarks: general_holiday.remarks,
		})
		.from(general_holiday)
		.leftJoin(users, eq(general_holiday.created_by, users.uuid))
		.where(eq(general_holiday.uuid, req.params.uuid));

	try {
		const data = await general_holidayPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'general_holiday',
		};

		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
