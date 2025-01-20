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

export const pathWork = {
	...pathWorkProblem,
};
