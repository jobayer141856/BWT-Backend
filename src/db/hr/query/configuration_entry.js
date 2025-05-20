import { desc, eq } from 'drizzle-orm';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import {
	configuration,
	configuration_entry,
	leave_category,
	leave_policy,
	users,
} from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const configuration_entryPromise = db
		.insert(configuration_entry)
		.values(req.body)
		.returning({ insertedName: configuration_entry.id });

	try {
		const data = await configuration_entryPromise;
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

	const configuration_entryPromise = db
		.update(configuration_entry)
		.set(req.body)
		.where(eq(configuration_entry.uuid, req.params.uuid))
		.returning({ updatedName: configuration_entry.id });

	try {
		const data = await configuration_entryPromise;
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

	const configuration_entryPromise = db
		.delete(configuration_entry)
		.where(eq(configuration_entry.uuid, req.params.uuid))
		.returning({ deletedName: configuration_entry.id });

	try {
		const data = await configuration_entryPromise;
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
			uuid: configuration_entry.uuid,
			id: configuration_entry.id,
			configuration_uuid: configuration_entry.configuration_uuid,
			leave_policy_uuid: configuration.leave_policy_uuid,
			leave_policy_name: leave_policy.name,
			leave_category_uuid: configuration_entry.leave_category_uuid,
			leave_category_name: leave_category.name,
			number_of_leaves_to_provide_file:
				configuration_entry.number_of_leaves_to_provide_file,
			maximum_number_of_allowed_leaves:
				configuration_entry.maximum_number_of_allowed_leaves,
			leave_carry_type: configuration_entry.leave_carry_type,
			consecutive_days: configuration_entry.consecutive_days,
			maximum_number_of_leaves_to_carry:
				configuration_entry.maximum_number_of_leaves_to_carry,
			count_off_days_as_leaves:
				configuration_entry.count_off_days_as_leaves,
			enable_previous_day_selection:
				configuration_entry.enable_previous_day_selection,
			maximum_number_of_leave_per_month:
				configuration_entry.maximum_number_of_leave_per_month,
			previous_date_selected_limit:
				configuration_entry.previous_date_selected_limit,
			applicability: configuration_entry.applicability,
			eligible_after_joining: configuration_entry.eligible_after_joining,
			enable_pro_rata: configuration_entry.enable_pro_rata,
			max_avail_time: configuration_entry.max_avail_time,
			enable_earned_leave: configuration_entry.enable_earned_leave,
			created_by: configuration_entry.created_by,
			created_by_name: users.name,
			created_at: configuration_entry.created_at,
			updated_at: configuration_entry.updated_at,
			remarks: configuration_entry.remarks,
		})
		.from(configuration_entry)
		.leftJoin(
			leave_category,
			eq(configuration_entry.leave_category_uuid, leave_category.uuid)
		)
		.leftJoin(
			configuration,
			eq(configuration_entry.configuration_uuid, configuration.uuid)
		)
		.leftJoin(
			leave_policy,
			eq(configuration.leave_policy_uuid, leave_policy.uuid)
		)
		.leftJoin(users, eq(configuration_entry.created_by, users.uuid))
		.orderBy(desc(configuration_entry.created_at));

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'configuration_entry',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const configuration_entryPromise = db
		.select({
			uuid: configuration_entry.uuid,
			id: configuration_entry.id,
			configuration_uuid: configuration_entry.configuration_uuid,
			leave_policy_uuid: configuration.leave_policy_uuid,
			leave_policy_name: leave_policy.name,
			leave_category_uuid: configuration_entry.leave_category_uuid,
			leave_category_name: leave_category.name,
			number_of_leaves_to_provide_file:
				configuration_entry.number_of_leaves_to_provide_file,
			maximum_number_of_allowed_leaves:
				configuration_entry.maximum_number_of_allowed_leaves,
			leave_carry_type: configuration_entry.leave_carry_type,
			consecutive_days: configuration_entry.consecutive_days,
			maximum_number_of_leaves_to_carry:
				configuration_entry.maximum_number_of_leaves_to_carry,
			count_off_days_as_leaves:
				configuration_entry.count_off_days_as_leaves,
			enable_previous_day_selection:
				configuration_entry.enable_previous_day_selection,
			maximum_number_of_leave_per_month:
				configuration_entry.maximum_number_of_leave_per_month,
			previous_date_selected_limit:
				configuration_entry.previous_date_selected_limit,
			applicability: configuration_entry.applicability,
			eligible_after_joining: configuration_entry.eligible_after_joining,
			enable_pro_rata: configuration_entry.enable_pro_rata,
			max_avail_time: configuration_entry.max_avail_time,
			enable_earned_leave: configuration_entry.enable_earned_leave,
			created_by: configuration_entry.created_by,
			created_by_name: users.name,
			created_at: configuration_entry.created_at,
			updated_at: configuration_entry.updated_at,
			remarks: configuration_entry.remarks,
		})
		.from(configuration_entry)
		.leftJoin(
			leave_category,
			eq(configuration_entry.leave_category_uuid, leave_category.uuid)
		)
		.leftJoin(
			configuration,
			eq(configuration_entry.configuration_uuid, configuration.uuid)
		)
		.leftJoin(
			leave_policy,
			eq(configuration.leave_policy_uuid, leave_policy.uuid)
		)
		.leftJoin(users, eq(configuration_entry.created_by, users.uuid))
		.where(eq(configuration_entry.uuid, req.params.uuid));

	try {
		const data = await configuration_entryPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'configuration_entry',
		};

		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}

export async function configurationEntryByConfiguration(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const { configuration_uuid } = req.params;

	const resultPromise = db
		.select({
			uuid: configuration_entry.uuid,
			id: configuration_entry.id,
			configuration_uuid: configuration_entry.configuration_uuid,
			leave_policy_uuid: configuration.leave_policy_uuid,
			leave_policy_name: leave_policy.name,
			leave_category_uuid: configuration_entry.leave_category_uuid,
			leave_category_name: leave_category.name,
			number_of_leaves_to_provide_file:
				configuration_entry.number_of_leaves_to_provide_file,
			maximum_number_of_allowed_leaves:
				configuration_entry.maximum_number_of_allowed_leaves,
			leave_carry_type: configuration_entry.leave_carry_type,
			consecutive_days: configuration_entry.consecutive_days,
			maximum_number_of_leaves_to_carry:
				configuration_entry.maximum_number_of_leaves_to_carry,
			count_off_days_as_leaves:
				configuration_entry.count_off_days_as_leaves,
			enable_previous_day_selection:
				configuration_entry.enable_previous_day_selection,
			maximum_number_of_leave_per_month:
				configuration_entry.maximum_number_of_leave_per_month,
			previous_date_selected_limit:
				configuration_entry.previous_date_selected_limit,
			applicability: configuration_entry.applicability,
			eligible_after_joining: configuration_entry.eligible_after_joining,
			enable_pro_rata: configuration_entry.enable_pro_rata,
			max_avail_time: configuration_entry.max_avail_time,
			enable_earned_leave: configuration_entry.enable_earned_leave,
			created_by: configuration_entry.created_by,
			created_by_name: users.name,
			created_at: configuration_entry.created_at,
			updated_at: configuration_entry.updated_at,
			remarks: configuration_entry.remarks,
		})
		.from(configuration_entry)
		.leftJoin(
			leave_category,
			eq(configuration_entry.leave_category_uuid, leave_category.uuid)
		)
		.leftJoin(
			configuration,
			eq(configuration_entry.configuration_uuid, configuration.uuid)
		)
		.leftJoin(
			leave_policy,
			eq(configuration.leave_policy_uuid, leave_policy.uuid)
		)
		.leftJoin(users, eq(configuration_entry.created_by, users.uuid))
		.where(eq(configuration_entry.configuration_uuid, configuration_uuid))
		.orderBy(desc(configuration_entry.created_at));

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'configuration_entry by configuration',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}
