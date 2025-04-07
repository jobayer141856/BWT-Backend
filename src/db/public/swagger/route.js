import SE, { SED } from '../../../util/swagger_example.js';

//* public work info routes *//

const pathPublicWorkInfo = {
	'/public/work/order-details-by-info/{info_uuid}': {
		get: {
			tags: ['public'],
			summary: 'Get order details by info UUID',
			description: 'Get order details by info UUID',
			operationId: 'getOrderDetailsByInfoUUID',
			parameters: [
				{
					name: 'info_uuid',
					in: 'path',
					description: 'UUID of the info to get order details',
					required: true,
					type: 'string',
					format: 'uuid',
				},
				{
					name: 'diagnosis',
					in: 'query',
					required: false,
					description: 'Include diagnosis data (true/false)',
					schema: {
						type: 'boolean',
						example: SE.BOOLEAN,
					},
				},
				{
					name: 'process',
					in: 'query',
					required: false,
					description: 'Include process data (true/false)',
					schema: {
						type: 'boolean',
						example: SE.BOOLEAN,
					},
				},
			],
			responses: {
				200: SE.response_schema(200, {
					id: SE.integer(),
					order_id: SE.string('WO25-0001'),
					uuid: SE.uuid(),
					user_uuid: SE.uuid(),
					user_name: SE.string('user_name'),
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
					diagnosis: SE.array(),
					process: SE.array(),
				}),
			},
		},
	},
};

export const pathPublic = {
	...pathPublicWorkInfo,
};
export const tagPublic = [
	{
		name: 'public',
	},
];
