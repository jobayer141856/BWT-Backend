import { desc, eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import {
	configuration,
	department,
	designation,
	employee,
	leave_category,
	leave_policy,
	shift_group,
	sub_department,
	users,
	workplace,
} from '../schema.js';

const createdByUser = alias(users, 'created_by_user');

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const employeePromise = db
		.insert(employee)
		.values(req.body)
		.returning({ insertedName: employee.name });

	try {
		const data = await employeePromise;
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

	const employeePromise = db
		.update(employee)
		.set(req.body)
		.where(eq(employee.uuid, req.params.uuid))
		.returning({ updatedName: employee.name });

	try {
		const data = await employeePromise;
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

	const employeePromise = db
		.delete(employee)
		.where(eq(employee.uuid, req.params.uuid))
		.returning({ deletedName: employee.name });

	try {
		const data = await employeePromise;
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
			uuid: employee.uuid,
			id: employee.id,
			gender: employee.gender,
			user_uuid: employee.user_uuid,
			users_name: users.name,
			start_date: employee.start_date,
			workplace_uuid: employee.workplace_uuid,
			workplace_name: workplace.name,
			rfid: employee.rfid,
			sub_department_uuid: employee.sub_department_uuid,
			sub_department_name: sub_department.name,
			primary_display_text: employee.primary_display_text,
			secondary_display_text: employee.secondary_display_text,
			configuration_uuid: employee.configuration_uuid,
			employment_type_uuid: employee.employment_type_uuid,
			end_date: employee.end_date,
			shift_group_uuid: employee.shift_group_uuid,
			shift_group_name: shift_group.name,
			line_manager_uuid: employee.line_manager_uuid,
			hr_manager_uuid: employee.hr_manager_uuid,
			is_admin: employee.is_admin,
			is_hr: employee.is_hr,
			is_line_manager: employee.is_line_manager,
			allow_over_time: employee.allow_over_time,
			exclude_from_attendance: employee.exclude_from_attendance,
			status: employee.status,
			created_by: employee.created_by,
			created_by_name: createdByUser.name,
			created_at: employee.created_at,
			updated_at: employee.updated_at,
			remarks: employee.remarks,
			name: employee.name,
			email: employee.email,
			pass: employee.pass,
			designation_uuid: employee.designation_uuid,
			designation_name: designation.name,
			department_uuid: employee.department_uuid,
			department_name: department.name,
			employee_id: employee.employee_id,
			leave_policy_uuid: employee.leave_policy_uuid,
			leave_policy_name: leave_policy.name,
			report_position: employee.report_position,
		})
		.from(employee)
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(workplace, eq(employee.workplace_uuid, workplace.uuid))
		.leftJoin(
			sub_department,
			eq(employee.sub_department_uuid, sub_department.uuid)
		)
		.leftJoin(createdByUser, eq(employee.created_by, createdByUser.uuid))
		.leftJoin(shift_group, eq(employee.shift_group_uuid, shift_group.uuid))
		.leftJoin(designation, eq(employee.designation_uuid, designation.uuid))
		.leftJoin(department, eq(employee.department_uuid, department.uuid))
		.leftJoin(
			leave_policy,
			eq(employee.leave_policy_uuid, leave_policy.uuid)
		)
		.orderBy(desc(employee.created_at));

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'employee list',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const employeePromise = db
		.select({
			uuid: employee.uuid,
			id: employee.id,
			gender: employee.gender,
			user_uuid: employee.user_uuid,
			users_name: users.name,
			start_date: employee.start_date,
			workplace_uuid: employee.workplace_uuid,
			workplace_name: workplace.name,
			rfid: employee.rfid,
			sub_department_uuid: employee.sub_department_uuid,
			sub_department_name: sub_department.name,
			primary_display_text: employee.primary_display_text,
			secondary_display_text: employee.secondary_display_text,
			configuration_uuid: employee.configuration_uuid,
			employment_type_uuid: employee.employment_type_uuid,
			end_date: employee.end_date,
			shift_group_uuid: employee.shift_group_uuid,
			shift_group_name: shift_group.name,
			line_manager_uuid: employee.line_manager_uuid,
			hr_manager_uuid: employee.hr_manager_uuid,
			is_admin: employee.is_admin,
			is_hr: employee.is_hr,
			is_line_manager: employee.is_line_manager,
			allow_over_time: employee.allow_over_time,
			exclude_from_attendance: employee.exclude_from_attendance,
			status: employee.status,
			created_by: employee.created_by,
			created_by_name: createdByUser.name,
			created_at: employee.created_at,
			updated_at: employee.updated_at,
			remarks: employee.remarks,
			name: employee.name,
			email: employee.email,
			pass: employee.pass,
			designation_uuid: employee.designation_uuid,
			designation_name: designation.name,
			department_uuid: employee.department_uuid,
			department_name: department.name,
			employee_id: employee.employee_id,
			leave_policy_uuid: employee.leave_policy_uuid,
			leave_policy_name: leave_policy.name,
			report_position: employee.report_position,
		})
		.from(employee)
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(workplace, eq(employee.workplace_uuid, workplace.uuid))
		.leftJoin(
			sub_department,
			eq(employee.sub_department_uuid, sub_department.uuid)
		)
		.leftJoin(createdByUser, eq(employee.created_by, createdByUser.uuid))
		.leftJoin(shift_group, eq(employee.shift_group_uuid, shift_group.uuid))
		.leftJoin(designation, eq(employee.designation_uuid, designation.uuid))
		.leftJoin(department, eq(employee.department_uuid, department.uuid))
		.leftJoin(
			leave_policy,
			eq(employee.leave_policy_uuid, leave_policy.uuid)
		)
		.where(eq(employee.uuid, req.params.uuid));
	try {
		const data = await employeePromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'employee',
		};
		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}

// export async function select(req, res, next) {
// 	if (!(await validateRequest(req, next))) return;

// 	const employeePromise = db
// 		.select({
// 			uuid: employee.uuid,
// 			id: employee.id,
// 			configuration_uuid: employee.configuration_uuid,
// 			leave_policy_uuid: configuration.leave_policy_uuid,
// 			leave_policy_name: leave_policy.name,
// 			leave_category_uuid: employee.leave_category_uuid,
// 			leave_category_name: leave_category.name,
// 			number_of_leaves_to_provide_file:
// 				employee.number_of_leaves_to_provide_file,
// 			maximum_number_of_allowed_leaves:
// 				employee.maximum_number_of_allowed_leaves,
// 			leave_carry_type: employee.leave_carry_type,
// 			consecutive_days: employee.consecutive_days,
// 			maximum_number_of_leaves_to_carry:
// 				employee.maximum_number_of_leaves_to_carry,
// 			count_off_days_as_leaves: employee.count_off_days_as_leaves,
// 			enable_previous_day_selection:
// 				employee.enable_previous_day_selection,
// 			maximum_number_of_leave_per_month:
// 				employee.maximum_number_of_leave_per_month,
// 			previous_date_selected_limit: employee.previous_date_selected_limit,
// 			applicability: employee.applicability,
// 			eligible_after_joining: employee.eligible_after_joining,
// 			enable_pro_rata: employee.enable_pro_rata,
// 			max_avail_time: employee.max_avail_time,
// 			enable_earned_leave: employee.enable_earned_leave,
// 			created_by: employee.created_by,
// 			created_by_name: users.name,
// 			created_at: employee.created_at,
// 			updated_at: employee.updated_at,
// 			remarks: employee.remarks,
// 		})
// 		.from(employee)
// 		.leftJoin(
// 			leave_category,
// 			eq(employee.leave_category_uuid, leave_category.uuid)
// 		)
// 		.leftJoin(
// 			configuration,
// 			eq(employee.configuration_uuid, configuration.uuid)
// 		)
// 		.leftJoin(
// 			leave_policy,
// 			eq(configuration.leave_policy_uuid, leave_policy.uuid)
// 		)
// 		.leftJoin(users, eq(employee.created_by, users.uuid))
// 		.where(eq(employee.uuid, req.params.uuid));

// 	try {
// 		const data = await employeePromise;
// 		const toast = {
// 			status: 200,
// 			type: 'select',
// 			message: 'employee',
// 		};

// 		return res.status(200).json({ toast, data: data[0] });
// 	} catch (error) {
// 		next(error);
// 	}
// }
