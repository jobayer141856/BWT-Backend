import SE from '../../../util/swagger_example.js';

//* Work Problem *//

export const pathWorkProblem = {
	'/work/problem': {
		get: {
			tags: ['work.problem'],
			summary: 'Get all work problems',
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					name: SE.string('work problem name'),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
		post: {
			tags: ['work.problem'],
			summary: 'Create a work problem',
			requestBody: SE.requestBody_schema_ref('work/problem'),
			responses: {
				responses: {
					200: SE.response_schema_ref(200, 'store/group'),
					405: SE.response(405),
				},
			},
		},
	},
	'/work/problem/{uuid}': {
		get: {
			tags: ['work.problem'],
			summary: 'Get a work problem by uuid',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the work problem to get',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					name: SE.string('work problem name'),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
		put: {
			tags: ['work.problem'],
			summary: 'Update a work problem by uuid',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the work problem to update',
					required: true,
					type: 'string',
				},
			],
			requestBody: SE.requestBody_schema_ref('work/problem'),
			responses: {
				responses: {
					200: SE.response_schema_ref(200, 'store/group'),
					405: SE.response(405),
				},
			},
		},
		delete: {
			tags: ['work.problem'],
			summary: 'Delete a work problem by uuid',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the work problem to delete',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					name: SE.string('work problem name'),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
	},
};

export const pathWorkOrder = {
	'/work/order': {
		get: {
			tags: ['work.order'],
			summary: 'Get all work orders',
			responses: {
				200: SE.response_schema(200, {
					id: SE.integer(),
					order_id: SE.string('WO25-0001'),
					uuid: SE.uuid(),
					user_uuid: SE.uuid(),
					model_uuid: SE.uuid(),
					model_name: SE.string('model_name'),
					size_uuid: SE.uuid(),
					size_name: SE.string('size_name'),
					serial_no: SE.string('serial_no'),
					problems_uuid: SE.array(),
					problem_statement: SE.string('problem_statement'),
					accessories: SE.array(),
					is_product_received: SE.boolean(),
					receive_date: SE.date_time(),
					warehouse_uuid: SE.uuid(),
					warehouse_name: SE.string('warehouse_name'),
					rack_uuid: SE.uuid(),
					rack_name: SE.string('rack_name'),
					floor_uuid: SE.uuid(),
					floor_name: SE.string('floor_name'),
					box_uuid: SE.uuid(),
					box_name: SE.string('box_name'),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
		post: {
			tags: ['work.order'],
			summary: 'Create a work order',
			requestBody: SE.requestBody_schema_ref('work/order'),
			responses: {
				responses: {
					200: SE.response_schema_ref(200, 'store/group'),
					405: SE.response(405),
				},
			},
		},
	},
	'/work/order/{uuid}': {
		get: {
			tags: ['work.order'],
			summary: 'Get a work order by uuid',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the work order to get',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					id: SE.integer(),
					order_id: SE.string('WO25-0001'),
					uuid: SE.uuid(),
					user_uuid: SE.uuid(),
					model_uuid: SE.uuid(),
					model_name: SE.string('model_name'),
					size_uuid: SE.uuid(),
					size_name: SE.string('size_name'),
					serial_no: SE.string('serial_no'),
					problems_uuid: SE.array(),
					problem_statement: SE.string('problem_statement'),
					accessories: SE.array(),
					is_product_received: SE.boolean(),
					receive_date: SE.date_time(),
					warehouse_uuid: SE.uuid(),
					warehouse_name: SE.string('warehouse_name'),
					rack_uuid: SE.uuid(),
					rack_name: SE.string('rack_name'),
					floor_uuid: SE.uuid(),
					floor_name: SE.string('floor_name'),
					box_uuid: SE.uuid(),
					box_name: SE.string('box_name'),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
		put: {
			tags: ['work.order'],
			summary: 'Update a work order by uuid',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the work order to update',
					required: true,
					type: 'string',
				},
			],
			requestBody: SE.requestBody_schema_ref('work/order'),
			responses: {
				responses: {
					200: SE.response_schema_ref(200, 'store/group'),
					405: SE.response(405),
				},
			},
		},
		delete: {
			tags: ['work.order'],
			summary: 'Delete a work order by uuid',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the work order to delete',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					id: SE.integer(),
					order_id: SE.string('WO25-0001'),
					uuid: SE.uuid(),
					user_uuid: SE.uuid(),
					model_uuid: SE.uuid(),
					model_name: SE.string('model_name'),
					size_uuid: SE.uuid(),
					size_name: SE.string('size_name'),
					serial_no: SE.string('serial_no'),
					problems_uuid: SE.array(),
					problem_statement: SE.string('problem_statement'),
					accessories: SE.array(),
					is_product_received: SE.boolean(),
					receive_date: SE.date_time(),
					warehouse_uuid: SE.uuid(),
					warehouse_name: SE.string('warehouse_name'),
					rack_uuid: SE.uuid(),
					rack_name: SE.string('rack_name'),
					floor_uuid: SE.uuid(),
					floor_name: SE.string('floor_name'),
					box_uuid: SE.uuid(),
					box_name: SE.string('box_name'),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
	},
};

export const pathWork = {
	...pathWorkProblem,
	...pathWorkOrder,
};