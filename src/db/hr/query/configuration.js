import { desc, eq } from 'drizzle-orm';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import {
    configuration,
    leave_policy,
    users
} from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const configurationPromise = db
		.insert(configuration)
		.values(req.body)
		.returning({ insertedName: configuration.name });

	try {
		const data = await configurationPromise;
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

	const configurationPromise = db
		.update(configuration)
		.set(req.body)
		.where(eq(configuration.uuid, req.params.uuid))
		.returning({ updatedName: configuration.name });

	try {
		const data = await configurationPromise;
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

	const configurationPromise = db
		.delete(configuration)
		.where(eq(configuration.uuid, req.params.uuid))
		.returning({ deletedName: configuration.name });

	try {
		const data = await configurationPromise;
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
			uuid: configuration.uuid,
			id: configuration.id,
			leave_policy_uuid: configuration.leave_policy_uuid,
			leave_policy_name: leave_policy.name,
			created_by: configuration.created_by,
			created_by_name: users.name,
			created_at: configuration.created_at,
			updated_at: configuration.updated_at,
			remarks: configuration.remarks,
		})
		.from(configuration)
		.leftJoin(
			leave_policy,
			eq(configuration.leave_policy_uuid, leave_policy.uuid)
		)
		.leftJoin(users, eq(configuration.created_by, users.uuid))
		.orderBy(desc(configuration.created_at));

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'configuration',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const configurationPromise = db
		.select({
			uuid: configuration.uuid,
			id: configuration.id,
			leave_policy_uuid: configuration.leave_policy_uuid,
			leave_policy_name: leave_policy.name,
			created_by: configuration.created_by,
			created_by_name: users.name,
			created_at: configuration.created_at,
			updated_at: configuration.updated_at,
			remarks: configuration.remarks,
		})
		.from(configuration)
		.leftJoin(
			leave_policy,
			eq(configuration.leave_policy_uuid, leave_policy.uuid)
		)
		.leftJoin(users, eq(configuration.created_by, users.uuid))
		.where(eq(configuration.uuid, req.params.uuid));

	try {
		const data = await configurationPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'configuration',
		};

		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
