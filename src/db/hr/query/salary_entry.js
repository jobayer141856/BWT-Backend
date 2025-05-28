import { desc, eq, lte } from 'drizzle-orm';
import { alias, uuid } from 'drizzle-orm/pg-core';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';

import {
	employee,
	salary_entry,
	salary_increment,
	users,
	punch_log,
	shifts,
	shift_group,
	apply_leave,
} from '../schema.js';
import { decimalToNumber } from '../../variables.js';

const createdByUser = alias(users, 'created_by_user');

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const salaryIncrementPromise = db
		.insert(salary_entry)
		.values(req.body)
		.returning({ insertedUuid: salary_entry.uuid });

	try {
		const data = await salaryIncrementPromise;
		const toast = {
			status: 201,
			type: 'insert',
			message: `${data[0].insertedUuid} inserted`,
		};

		return res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function update(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const salaryIncrementPromise = db
		.update(salary_entry)
		.set(req.body)
		.where(eq(salary_entry.uuid, req.params.uuid))
		.returning({ updatedUuid: salary_entry.uuid });

	try {
		const data = await salaryIncrementPromise;
		const toast = {
			status: 200,
			type: 'update',
			message: `${data[0].updatedUuid} updated`,
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function remove(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const salaryIncrementPromise = db
		.delete(salary_entry)
		.where(eq(salary_entry.uuid, req.params.uuid))
		.returning({ deletedUuid: salary_entry.uuid });

	try {
		const data = await salaryIncrementPromise;
		const toast = {
			status: 200,
			type: 'delete',
			message: `${data[0].deletedUuid} deleted`,
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectAll(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const salaryIncrementPromise = db
		.select({
			uuid: salary_entry.uuid,
			employee_uuid: salary_entry.employee_uuid,
			employee_name: users.name,
			type: salary_entry.type,
			amount: decimalToNumber(salary_entry.amount),
			month: salary_entry.month,
			year: salary_entry.year,
			created_by: salary_entry.created_by,
			created_by_name: createdByUser.name,
			created_at: salary_entry.created_at,
			updated_at: salary_entry.updated_at,
			remarks: salary_entry.remarks,
		})
		.from(salary_entry)
		.leftJoin(
			createdByUser,
			eq(salary_entry.created_by, createdByUser.uuid)
		)
		.leftJoin(employee, eq(salary_entry.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.orderBy(desc(salary_entry.created_at));

	try {
		const data = await salaryIncrementPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'salary_entry list',
		};
		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const salaryIncrementPromise = db
		.select({
			uuid: salary_entry.uuid,
			employee_uuid: salary_entry.employee_uuid,
			employee_name: users.name,
			type: salary_entry.type,
			amount: decimalToNumber(salary_entry.amount),
			month: salary_entry.month,
			year: salary_entry.year,
			created_by: salary_entry.created_by,
			created_by_name: createdByUser.name,
			created_at: salary_entry.created_at,
			updated_at: salary_entry.updated_at,
			remarks: salary_entry.remarks,
		})
		.from(salary_entry)
		.leftJoin(
			createdByUser,
			eq(salary_entry.created_by, createdByUser.uuid)
		)
		.leftJoin(employee, eq(salary_entry.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.where(eq(salary_entry.uuid, req.params.uuid));

	try {
		const data = await salaryIncrementPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'salary_entry list',
		};
		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}

export async function employeeSalaryDetailsByYearDate(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const { year, month } = req.params;

	const salaryIncrementPromise = db
		.select({
			employee_uuid: salary_increment.employee_uuid,
			amount: SUM(salary_increment.amount),
		})
		.from(salary_increment)
		.where(
			sql`EXTRACT(YEAR FROM ${salary_increment.effective_date}) <= ${year}`,
			sql`EXTRACT(MONTH FROM ${salary_increment.effective_date}) <= ${month}`
		)
		.as('salaryIncrementPromise')
		.groupBy(
			salary_increment.employee_uuid,
			salary_increment.effective_date
		);

	const punchLogPromise = db
		.select({
			employee_uuid: employee.uuid,
			present_days: sql`
				COUNT(
					CASE 
						WHEN ${punch_log.punch_time} IS NOT NULL 
						AND TO_CHAR(${punch_log.punch_time}, 'HH24:MI') < TO_CHAR(${shifts.late_time}, 'HH24:MI')
						THEN 1 
					END
				)
			`,
			late_days: sql`
				COUNT(
					CASE 
						WHEN ${punch_log.punch_time} IS NOT NULL 
						AND TO_CHAR(${punch_log.punch_time}, 'HH24:MI') >= TO_CHAR(${shifts.late_time}, 'HH24:MI')
						THEN 1 
					END
				)
			`,
		})
		.from(punch_log)
		.leftJoin(employee, eq(punch_log.employee_uuid, employee.uuid))
		.leftJoin(shift_group, eq(employee.shift_group_uuid, shift_group.uuid))
		.leftJoin(shifts, eq(shift_group.shifts_uuid, shifts.uuid))
		.where(
			sql`EXTRACT(YEAR FROM ${punch_log.punch_time}) = ${year}`,
			sql`EXTRACT(MONTH FROM ${punch_log.punch_time}) = ${month}`
		)
		.as('punchLogPromise')
		.groupBy(employee.uuid);

	// const shiftsPromise = db
	// 	.select({
	// 		uuid: shifts.uuid,
	// 		late_days: sql`COUNT(*)`,
	// 	})
	// 	.from(shifts)
	// 	.where(
	// 		sql`EXTRACT(YEAR FROM ${shifts.late_time}) = ${year}`,
	// 		sql`EXTRACT(MONTH FROM ${shifts.late_time}) = ${month}`
	// 	)
	// 	.as('shiftsPromise')
	// 	.groupBy(shifts.uuid);

	const applyLeavePromise = db
		.select({
			employee_uuid: apply_leave.employee_uuid,
			off_days: sql`
            SUM(
                LEAST(
                    DATE_TRUNC('month', ${apply_leave.to_date}) + INTERVAL '1 month - 1 day',
                    DATE_TRUNC('month', DATE '${year}-${month}-01') + INTERVAL '1 month - 1 day'
                ) 
                - 
                GREATEST(
                    DATE_TRUNC('month', ${apply_leave.from_date}),
                    DATE_TRUNC('month', DATE '${year}-${month}-01')
                ) 
                + INTERVAL '1 day'
            )::int
        `,
		})
		.from(apply_leave)
		.where(
			sql`${apply_leave.approved} = true`,
			sql`(
            (${apply_leave.from_date} <= DATE_TRUNC('month', DATE '${year}-${month}-01') + INTERVAL '1 month - 1 day')
            AND
            (${apply_leave.to_date} >= DATE_TRUNC('month', DATE '${year}-${month}-01'))
        )`
		)
		.groupBy(apply_leave.employee_uuid)
		.as('applyLeavePromise');

	const resultPromise = db
		.select({
			uuid: salary_entry.uuid,
			employee_uuid: salary_entry.employee_uuid,
			employee_name: users.name,
			type: salary_entry.type,
			amount: decimalToNumber(salary_entry.amount),
			month: salary_entry.month,
			year: salary_entry.year,
			created_by: salary_entry.created_by,
			created_by_name: createdByUser.name,
			created_at: salary_entry.created_at,
			updated_at: salary_entry.updated_at,
			remarks: salary_entry.remarks,
			salary_increment: salaryIncrementPromise.amount,
			salary_increment_effective_date:
				salaryIncrementPromise.effective_date,
			total_amount: decimalToNumber(
				salary_entry.amount + salaryIncrementPromise.amount
			),
			start_date: employee.start_date,
			//joining_salary: employee.joining_salary,
			present_days: punchLogPromise.present_days,
			late_days: punchLogPromise.late_days,
			off_days: shift_group.off_days,
			leave_days: applyLeavePromise.off_days,
			total_days: present_days + late_days + off_days + leave_days,
		})
		.from(salary_entry)
		.leftJoin(
			createdByUser,
			eq(salary_entry.created_by, createdByUser.uuid)
		)
		.leftJoin(employee, eq(salary_entry.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			salaryIncrementPromise,
			eq(salary_entry.employee_uuid, salaryIncrementPromise.employee_uuid)
		)
		.leftJoin(
			punchLogPromise,
			eq(salary_entry.employee_uuid, punchLogPromise.employee_uuid)
		)
		.leftJoin(shift_group, eq(employee.shift_group_uuid, shift_group.uuid))
		.leftJoin(
			applyLeavePromise,
			eq(salary_entry.employee_uuid, applyLeavePromise.employee_uuid)
		)
		.where(
			eq(salary_entry.year, req.params.year),
			eq(salary_entry.month, req.params.month)
		);

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'employee salary details list',
		};
		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}
