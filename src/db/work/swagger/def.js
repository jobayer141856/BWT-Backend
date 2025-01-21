import SE, { SED } from '../../../util/swagger_example.js';

const defProblem = SED({
	required: ['uuid', 'name', 'created_at'],
	properties: {
		uuid: SE.uuid(),
		name: SE.string('Problem 1'),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Work/Problem',
});

const defOrder = SED({
	required: [
		'uuid',
		'user_uuid',
		'model_uuid',
		'size_uuid',
		'serial_no',
		'problem_statement',
		'warehouse_uuid',
		'rack_uuid',
		'floor_uuid',
		'box_uuid',
		'created_at',
	],
	properties: {
		id: SE.integer(),
		uuid: SE.uuid(),
		user_uuid: SE.uuid(),
		model_uuid: SE.uuid(),
		size_uuid: SE.uuid(),
		serial_no: SE.string('serial_no'),
		problems_uuid: SE.array(),
		problem_statement: SE.string('problem_statement'),
		accessories: SE.array(),
		is_product_received: SE.boolean(),
		receive_date: SE.date_time(),
		warehouse_uuid: SE.uuid(),
		rack_uuid: SE.uuid(),
		floor_uuid: SE.uuid(),
		box_uuid: SE.uuid(),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Work/Order',
});

const defDiagnosis = SED({
	required: [
		'id',
		'uuid',
		'order_uuid',
		'engineer_uuid',
		'problem_statement',
		'status',
		'status_update_date',
		'created_at',
	],
	properties: {
		id: SE.integer(),
		uuid: SE.uuid(),
		order_uuid: SE.uuid(),
		engineer_uuid: SE.uuid(),
		problems_uuid: SE.array(),
		problem_statement: SE.string('problem_statement'),
		status: SE.boolean(),
		status_update_date: SE.date_time(),
		proposed_cost: SE.number(),
		is_proceed_to_repair: SE.boolean(),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Work/Diagnosis',
});

//* Marge all
export const defWork = {
	problem: defProblem,
	order: defOrder,
	diagnosis: defDiagnosis,
};

//* Tag
export const tagWork = [
	{
		name: 'work.problem',
		description: 'Work Problem',
	},
	{
		name: 'work.order',
		description: 'Work Order',
	},
	{
		name: 'work.diagnosis',
		description: 'Work Diagnosis',
	},
];
