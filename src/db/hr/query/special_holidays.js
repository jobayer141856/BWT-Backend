import { desc, eq } from 'drizzle-orm';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import { users, special_holidays, workplace } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const special_holidaysPromise = db
		.insert(special_holidays)
		.values(req.body)
		.returning({ insertedName: special_holidays.name });

	try {
		const data = await special_holidaysPromise;
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

	const special_holidaysPromise = db
		.update(special_holidays)
		.set(req.body)
		.where(eq(special_holidays.uuid, req.params.uuid))
		.returning({ updatedName: special_holidays.name });

	try {
		const data = await special_holidaysPromise;
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

	const special_holidaysPromise = db
		.delete(special_holidays)
		.where(eq(special_holidays.uuid, req.params.uuid))
		.returning({ deletedName: special_holidays.name });

	try {
		const data = await special_holidaysPromise;
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
			uuid: special_holidays.uuid,
			id: special_holidays.id,
			name: special_holidays.name,
			workplace_uuid: special_holidays.workplace_uuid,
			workplace_name: workplace.name,
			from_date: special_holidays.from_date,
			to_date: special_holidays.to_date,
			created_by: special_holidays.created_by,
			created_by_name: users.name,
			created_at: special_holidays.created_at,
			updated_at: special_holidays.updated_at,
			remarks: special_holidays.remarks,
		})
		.from(special_holidays)
		.leftJoin(
			workplace,
			eq(special_holidays.workplace_uuid, workplace.uuid)
		)
		.leftJoin(users, eq(special_holidays.created_by, users.uuid))
		.orderBy(desc(special_holidays.created_at));

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'special_holidays',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const special_holidaysPromise = db
		.select({
			uuid: special_holidays.uuid,
			id: special_holidays.id,
			name: special_holidays.name,
			workplace_uuid: special_holidays.workplace_uuid,
			workplace_name: workplace.name,
			from_date: special_holidays.from_date,
			to_date: special_holidays.to_date,
			created_by: special_holidays.created_by,
			created_by_name: users.name,
			created_at: special_holidays.created_at,
			updated_at: special_holidays.updated_at,
			remarks: special_holidays.remarks,
		})
		.from(special_holidays)
		.leftJoin(
			workplace,
			eq(special_holidays.workplace_uuid, workplace.uuid)
		)
		.leftJoin(users, eq(special_holidays.created_by, users.uuid))
		.where(eq(special_holidays.uuid, req.params.uuid));

	try {
		const data = await special_holidaysPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'special_holidays',
		};

		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
