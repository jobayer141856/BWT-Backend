import { desc, eq } from 'drizzle-orm';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import { employee, employee_address, users } from '../schema.js';
import { alias } from 'drizzle-orm/pg-core';

const createdByUser = alias(users, 'created_by_user');

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const employee_addressPromise = db
		.insert(employee_address)
		.values(req.body)
		.returning({ insertedName: employee_address.uuid });

	try {
		const data = await employee_addressPromise;
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

	const employee_addressPromise = db
		.update(employee_address)
		.set(req.body)
		.where(eq(employee_address.uuid, req.params.uuid))
		.returning({ updatedName: employee_address.uuid });

	try {
		const data = await employee_addressPromise;
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

	const employee_addressPromise = db
		.delete(employee_address)
		.where(eq(employee_address.uuid, req.params.uuid))
		.returning({ deletedName: employee_address.uuid });

	try {
		const data = await employee_addressPromise;
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
			uuid: employee_address.uuid,
			index: employee_address.index,
			address_type: employee_address.address_type,
			employee_uuid: employee_address.employee_uuid,
			employee_name: users.name,
			address: employee_address.address,
			thana: employee_address.thana,
			district: employee_address.district,
			created_by: employee_address.created_by,
			created_by_name: createdByUser.name,
			created_at: employee_address.created_at,
			updated_at: employee_address.updated_at,
			remarks: employee_address.remarks,
		})
		.from(employee_address)
		.leftJoin(employee, eq(employee_address.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			createdByUser,
			eq(employee_address.created_by, createdByUser.uuid)
		)
		.orderBy(desc(employee_address.created_at));

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'Employee_address',
		};

		return res.status(200).json({ toast, data: data || [] });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const employee_addressPromise = db
		.select({
			uuid: employee_address.uuid,
			index: employee_address.index,
			address_type: employee_address.address_type,
			employee_uuid: employee_address.employee_uuid,
			employee_name: users.name,
			address: employee_address.address,
			thana: employee_address.thana,
			district: employee_address.district,
			created_by: employee_address.created_by,
			created_by_name: createdByUser.name,
			created_at: employee_address.created_at,
			updated_at: employee_address.updated_at,
			remarks: employee_address.remarks,
		})
		.from(employee_address)
		.leftJoin(employee, eq(employee_address.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			createdByUser,
			eq(employee_address.created_by, createdByUser.uuid)
		)
		.where(eq(employee_address.uuid, req.params.uuid));

	try {
		const data = await employee_addressPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'Employee_address',
		};

		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}

export async function selectByEmployeeUuid(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const employee_addressPromise = db
		.select({
			uuid: employee_address.uuid,
			index: employee_address.index,
			address_type: employee_address.address_type,
			employee_uuid: employee_address.employee_uuid,
			employee_name: users.name,
			address: employee_address.address,
			thana: employee_address.thana,
			district: employee_address.district,
			created_by: employee_address.created_by,
			created_by_name: createdByUser.name,
			created_at: employee_address.created_at,
			updated_at: employee_address.updated_at,
			remarks: employee_address.remarks,
		})
		.from(employee_address)
		.leftJoin(employee, eq(employee_address.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			createdByUser,
			eq(employee_address.created_by, createdByUser.uuid)
		)
		.where(eq(employee_address.employee_uuid, req.params.employee_uuid));

	try {
		const data = await employee_addressPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'Employee_address',
		};

		return res.status(200).json({ toast, data: data || [] });
	} catch (error) {
		next(error);
	}
}
