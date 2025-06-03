import { param } from 'express-validator';
import SE from '../../../util/swagger_example.js';

// * Hr User * //
export const pathHrUser = {
	'/hr/user/login': {
		post: {
			tags: ['hr.user'],
			summary: 'validate a user',
			description: 'Validate user credentials',
			operationId: 'validateUser',
			consumes: ['application/json'],
			produces: ['application/json'],
			requestBody: SE.requestBody(
				{
					email: SE.string('admin@bwt.com'),
					pass: SE.string('1234'),
				},
				['email', 'pass']
			),
			responses: {
				200: SE.response(200),
				405: SE.response(405),
			},
		},
	},
	'/hr/user': {
		get: {
			tags: ['hr.user'],
			summary: 'get all users',
			description: 'All users',
			parameters: [
				SE.parameter_query('status', 'status', ['true', 'false']),
				SE.parameter_query('user_type', 'user_type', [
					'employee',
					'customer',
					'vendor',
				]),
			],
			operationId: 'getAllUsers',
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					name: SE.string('John Doe'),
					email: SE.string('john@fzl.com'),
					designation_uuid: SE.uuid(),
					designation: SE.string('HR Manager'),
					department_uuid: SE.uuid(),
					department: SE.string('HR'),
					ext: SE.string('562'),
					phone: SE.string('01521533595'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					status: SE.integer(1),
					remarks: SE.string('remarks'),
				}),
			},
		},
		post: {
			tags: ['hr.user'],
			summary: 'create a user',
			description: '',
			// operationId: "addPet",
			consumes: ['application/json'],
			produces: ['application/json'],
			requestBody: SE.requestBody_schema_ref('hr/user'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/user'),
				405: SE.response(405),
			},
		},
	},
	'/hr/user/{uuid}': {
		get: {
			tags: ['hr.user'],
			summary: 'Gets a user',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [SE.parameter_params('hr.user to get')],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					name: SE.string('John Doe'),
					email: SE.string('john@fzl.com'),
					designation_uuid: SE.uuid(),
					designation: SE.string('HR Manager'),
					department_uuid: SE.uuid(),
					department: SE.string('HR'),
					ext: SE.string('562'),
					phone: SE.string('01521533595'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					status: SE.integer(1),
					remarks: SE.string('remarks'),
				}),
				400: SE.response(400),
				404: SE.response(404),
			},
		},
		put: {
			tags: ['hr.user'],
			summary: 'Update an existing user',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [SE.parameter_params('hr.user to update')],
			requestBody: SE.requestBody({
				name: SE.string('John Doe'),
				email: SE.string('john@fzl.com'),
				designation_uuid: SE.uuid(),
				department_uuid: SE.uuid(),
				ext: SE.string('562'),
				phone: SE.string('01521533595'),
				created_at: SE.date_time(),
				updated_at: SE.date_time(),
				status: SE.integer(1),
				remarks: SE.string('remarks'),
				user_type: SE.string('employee'),
			}),
			responses: {
				200: {
					description: 'successful operation',
					schema: {
						type: 'object',
						properties: {
							name: {
								type: 'string',
								example: 'John Doe',
							},
							email: {
								type: 'string',
								example: 'john@fzl.com',
							},
							designation_uuid: {
								type: 'string',
								example: 'igD0v9DIJQhJeet',
							},
							department_uuid: {
								type: 'string',
								example: 'igD0v9DIJQhJeet',
							},
							ext: {
								type: 'string',
								example: '123',
							},
							phone: {
								type: 'string',
								example: '12345678910',
							},
							created_at: {
								type: 'string',
								format: 'date-time',
								example: '2021-01-01 00:00:00',
							},
							updated_at: {
								type: 'string',
								format: 'date-time',
								example: '2021-01-01 00:00:00',
							},
							status: {
								type: 'integer',
								example: 1,
							},
							remarks: {
								type: 'string',
								example: 'remarks',
							},
						},
					},
				},
				400: {
					description: 'Invalid UUID supplied',
				},
				404: {
					description: 'User not found',
				},
				405: {
					description: 'Validation exception',
				},
			},
		},
		delete: {
			tags: ['hr.user'],
			summary: 'Deletes a user',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [SE.parameter_params('hr.user to delete')],
			responses: {
				200: SE.response(200),
				400: SE.response(400),
				404: SE.response(404),
			},
		},
	},
	'/hr/user/can-access/{uuid}': {
		get: {
			tags: ['hr.user'],
			summary: 'Gets a user access',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [SE.parameter_params('hr.user access to get')],
			responses: {
				200: SE.response_schema(200, {
					can_access: SE.string('1,2,3'),
				}),
				400: SE.response(400),
				404: SE.response(404),
			},
		},
		put: {
			tags: ['hr.user'],
			summary: 'create a user access',
			description: '',
			// operationId: "addPet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [SE.parameter_params('hr.user access to update')],
			requestBody: SE.requestBody(
				{
					can_access: SE.string('1,2,3'),
				},
				['can_access']
			),
			responses: {
				200: SE.response_schema(200, {
					can_access: SE.string('1,2,3'),
				}),
				405: SE.response(405),
			},
		},
	},
	'/hr/user/password/{uuid}': {
		put: {
			tags: ['hr.user'],
			summary: 'Update a user password',
			description: '',
			// operationId: "addPet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [SE.parameter_params('hr.user password to update')],
			requestBody: SE.requestBody(
				{
					pass: SE.string('a very strong password'),
				},
				['pass']
			),
			responses: {
				200: SE.response_schema(200, {
					pass: SE.string('a very strong password'),
				}),
				405: SE.response(405),
			},
		},
	},
	'/hr/user-common': {
		get: {
			tags: ['hr.user'],
			summary: 'get all common users',
			description: 'All common users',
			operationId: 'getAllCommonUsers', // unique identifier of an operation or a route
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					name: SE.string('John Doe'),
					email: SE.string('admin@bwt.com'),
					designation_uuid: SE.uuid(),
					designation: SE.string('Admin'),
					ext: SE.string('123'),
					phone: SE.string('01521533595'),
				}),
			},
		},
	},
	'/hr/user/status/{uuid}': {
		put: {
			tags: ['hr.user'],
			summary: 'Update an existing user status',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'User status to update',
					'uuid',
					'string',
					'uuid'
				),
			],
			requestBody: SE.requestBody(
				{
					status: SE.integer(1),
					updated_at: SE.date_time(),
				},
				['status']
			),
			responses: {
				200: SE.response_schema(200, {
					status: SE.integer(1),
					updated_at: SE.date_time(),
				}),
				405: SE.response(405),
			},
		},
	},
	'/hr/user/rating-price/{uuid}': {
		put: {
			tags: ['hr.user'],
			summary: 'Update an existing user status',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'User status to update',
					'uuid',
					'string',
					'uuid'
				),
			],
			requestBody: SE.requestBody(
				{
					rating: SE.integer(1),
					price: SE.integer(1),
				},
				['rating', 'price']
			),
			responses: {
				200: SE.response_schema(200, {
					rating: SE.integer(1),
					price: SE.integer(1),
				}),
				405: SE.response(405),
			},
		},
	},
};

// * Hr Department * //

export const pathHrDepartment = {
	'/hr/department': {
		get: {
			tags: ['hr.department'],
			summary: 'get all departments',
			description: 'All departments',
			responses: {
				200: {
					description: 'Returns a all department.',
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									$ref: '#/definitions/hr/department',
								},
							},
						},
					},
				},
			},
		},
		post: {
			tags: ['hr.department'],
			summary: 'create a department',
			description: '',
			// operationId: "addPet",
			consumes: ['application/json'],
			produces: ['application/json'],
			requestBody: SE.requestBody_schema_ref('hr/department'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/department'),
				405: SE.response(405),
			},
		},
	},
	'/hr/department/{uuid}': {
		get: {
			tags: ['hr.department'],
			summary: 'Gets a department',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'Department to get',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				400: {
					description: 'Invalid UUID supplied',
				},
				404: {
					description: 'Department not found',
				},
			},
		},
		put: {
			tags: ['hr.department'],
			summary: 'Update an existing department',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'Department to update',
					required: true,
					type: 'string',
					format: 'uuid',
				},
				{
					in: 'body',
					name: 'body',
					description:
						'Department object that needs to be updated to the hr.department',
					required: true,
					schema: {
						$ref: '#/definitions/hr/department',
					},
				},
			],
			responses: {
				400: {
					description: 'Invalid UUID supplied',
				},
				404: {
					description: 'Department not found',
				},
				405: {
					description: 'Validation exception',
				},
			},
		},
		delete: {
			tags: ['hr.department'],
			summary: 'Deletes a department',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'Department to delete',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				400: {
					description: 'Invalid UUID supplied',
				},
				404: {
					description: 'Department not found',
				},
			},
		},
	},
};

// * Hr Designation * //

export const pathHrDesignation = {
	'/hr/designation': {
		get: {
			tags: ['hr.designation'],
			summary: 'get all designations',
			description: 'All designations',
			responses: {
				200: {
					description: 'Returns a all designation.',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									uuid: {
										type: 'string',
										example: 'igD0v9DIJQhJeet',
									},
									designation: {
										type: 'string',
										example: 'Admin',
									},
									department: {
										type: 'string',
										example: 'Admin',
									},
								},
							},
						},
					},
				},
			},
		},
		post: {
			tags: ['hr.designation'],
			summary: 'create a designation',
			description: '',
			// operationId: "addPet",
			consumes: ['application/json'],
			produces: ['application/json'],
			requestBody: SE.requestBody_schema_ref('hr/designation'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/designation'),
				405: SE.response(405),
			},
		},
	},
	'/hr/designation/{uuid}': {
		get: {
			tags: ['hr.designation'],
			summary: 'Gets a designation',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'Designation to get',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: {
					description: 'successful operation',
					schema: {
						type: 'object',
						properties: {
							uuid: {
								type: 'string',
								example: 'igD0v9DIJQhJeet',
							},
							designation: {
								type: 'string',
								example: 'Admin',
							},
							department: {
								type: 'string',
								example: 'Admin',
							},
						},
					},
				},
				400: {
					description: 'Invalid UUID supplied',
				},
				404: {
					description: 'Designation not found',
				},
			},
		},
		put: {
			tags: ['hr.designation'],
			summary: 'Update an existing designation',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [
				SE.parameter_params('Designation to update'),
				SE.parameter_schema_ref(
					'Designation object that needs to be updated to the hr.designation',
					'hr/designation'
				),
			],
			responses: {
				400: {
					description: 'Invalid UUID supplied',
				},
				404: {
					description: 'Designation not found',
				},
				405: {
					description: 'Validation exception',
				},
			},
		},
		delete: {
			tags: ['hr.designation'],
			summary: 'Deletes a designation',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'Designation to delete',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				400: {
					description: 'Invalid UUID supplied',
				},
				404: {
					description: 'Designation not found',
				},
			},
		},
	},
};

// * Hr Policy and Notice * //
const pathHrPrivacyAndNotice = {
	'/hr/policy-and-notice': {
		get: {
			tags: ['hr.policy_and_notice'],
			summary: 'get all privacy and policy',
			description: 'All privacy and policy',
			responses: {
				200: {
					description: 'Returns a all privacy and policy.',
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									$ref: '#/definitions/hr/policy_and_notice',
								},
							},
						},
					},
				},
			},
		},
		post: {
			tags: ['hr.policy_and_notice'],
			summary: 'create a privacy and policy',
			description: '',
			// operationId: "addPet",
			consumes: ['application/json'],
			produces: ['application/json'],
			requestBody: SE.requestBody_schema_ref('hr/policy_and_notice'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/policy_and_notice'),
				405: SE.response(405),
			},
		},
	},
	'/hr/policy-and-notice/{uuid}': {
		get: {
			tags: ['hr.policy_and_notice'],
			summary: 'Gets a privacy and policy',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'string -> uuid, length: 15',
					required: true,
					type: 'string',
					format: 'uuid',
					example: 'igD0v9DIJQhJeet',
				},
			],
			responses: {
				400: {
					description: 'Invalid UUID supplied',
				},
				404: {
					description: 'Privacy and policy not found',
				},
			},
		},
		put: {
			tags: ['hr.policy_and_notice'],
			summary: 'Update an existing privacy and policy',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'Privacy and policy to update',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/definitions/hr/policy_and_notice',
						},
					},
				},
			},
			responses: {
				400: {
					description: 'Invalid UUID supplied',
				},
				404: {
					description: 'Privacy and policy not found',
				},
				405: {
					description: 'Validation exception',
				},
			},
		},
		delete: {
			tags: ['hr.policy_and_notice'],
			summary: 'Deletes a privacy and policy',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'Privacy and policy to delete',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				400: {
					description: 'Invalid UUID supplied',
				},
				404: {
					description: 'Privacy and policy not found',
				},
			},
		},
	},
	'/hr/policy-and-notice/policy': {
		get: {
			tags: ['hr.policy_and_notice'],
			summary: 'Gets a privacy and policy',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			responses: {
				200: {
					description: 'successful operation',
					schema: {
						$ref: '#/definitions/hr/policy_and_notice',
					},
				},
				400: {
					description: 'Invalid UUID supplied',
				},
				404: {
					description: 'Privacy and policy not found',
				},
			},
		},
	},
	'/hr/policy-and-notice/notice': {
		get: {
			tags: ['hr.policy_and_notice'],
			summary: 'Gets a privacy and policy',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			responses: {
				200: {
					description: 'successful operation',
					schema: {
						$ref: '#/definitions/hr/policy_and_notice',
					},
				},
				400: {
					description: 'Invalid UUID supplied',
				},
				404: {
					description: 'Privacy and policy not found',
				},
			},
		},
	},
};

const pathHrSubDepartment = {
	'/hr/sub-department': {
		get: {
			tags: ['hr.sub_department'],
			summary: 'get all sub departments',
			description: 'All sub departments',
			responses: {
				200: SE.response_schema_ref(200, 'hr/sub_department'),
				400: SE.response(400),
				404: SE.response(404),
			},
		},
		post: {
			tags: ['hr.sub_department'],
			summary: 'create a sub department',
			description: '',
			// operationId: "addPet",
			consumes: ['application/json'],
			produces: ['application/json'],
			requestBody: SE.requestBody_schema_ref('hr/sub_department'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/sub_department'),
				400: SE.response(400),
				404: SE.response(404),
			},
		},
	},
	'/hr/sub-department/{uuid}': {
		get: {
			tags: ['hr.sub_department'],
			summary: 'Gets a sub department',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'sub-department to get',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/sub_department'),
				400: SE.response(400),
				404: SE.response(404),
			},
		},
		put: {
			tags: ['hr.sub_department'],
			summary: 'Update an existing sub department',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'sub-department to put',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			requestBody: SE.requestBody_schema_ref('hr/sub_department'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/sub_department'),
				400: SE.response(400),
				404: SE.response(404),
			},
		},
		delete: {
			tags: ['hr.sub_department'],
			summary: 'Deletes a sub department',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'sub-department to delete',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response(200),
				400: SE.response(400),
				404: SE.response(404),
			},
		},
	},
};

const pathHrWorkplace = {
	'/hr/workplace': {
		get: {
			tags: ['hr.workplace'],
			summary: 'get all workplace',
			description: 'All workplace',
			responses: {
				200: SE.response_schema_ref(200, 'hr/workplace'),
				405: SE.response(405),
			},
		},
		post: {
			tags: ['hr.workplace'],
			summary: 'create a workplace',
			description: '',
			// operationId: "addPet",
			consumes: ['application/json'],
			produces: ['application/json'],
			requestBody: SE.requestBody_schema_ref('hr/workplace'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/workplace'),
				405: SE.response(405),
			},
		},
	},
	'/hr/workplace/{uuid}': {
		get: {
			tags: ['hr.workplace'],
			summary: 'Gets a workplace',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Workplace to get',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/workplace'),
				405: SE.response(405),
			},
		},
		put: {
			tags: ['hr.workplace'],
			summary: 'Update an existing workplace',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Workplace to put',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			requestBody: SE.requestBody_schema_ref('hr/workplace'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/workplace'),
				405: SE.response(405),
			},
		},
		delete: {
			tags: ['hr.workplace'],
			summary: 'Deletes a workplace',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Workplace to delete',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response(200),
				405: SE.response(405),
			},
		},
	},
};

const pathHrEmploymentType = {
	'/hr/employment-type': {
		get: {
			tags: ['hr.employment_type'],
			summary: 'get all employment type',
			description: 'All employment type',
			responses: {
				200: SE.response_schema_ref(200, 'hr/employment_type'),
				405: SE.response(405),
			},
		},
		post: {
			tags: ['hr.employment_type'],
			summary: 'create a employment type',
			description: '',
			// operationId: "addPet",
			consumes: ['application/json'],
			produces: ['application/json'],
			requestBody: SE.requestBody_schema_ref('hr/employment_type'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/employment_type'),
				405: SE.response(405),
			},
		},
	},
	'/hr/employment-type/{uuid}': {
		get: {
			tags: ['hr.employment_type'],
			summary: 'Gets a employment type',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Employment type to get',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/employment_type'),
				405: SE.response(405),
			},
		},
		put: {
			tags: ['hr.employment_type'],
			summary: 'Update an existing employment type',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Employment type to put',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			requestBody: SE.requestBody_schema_ref('hr/employment_type'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/employment_type'),
				405: SE.response(405),
			},
		},
		delete: {
			tags: ['hr.employment_type'],
			summary: 'Deletes a employment type',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Employment type to delete',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response(200),
				405: SE.response(405),
			},
		},
	},
};

const pathHrSpecialHolidays = {
	'/hr/special-holidays': {
		get: {
			tags: ['hr.special_holidays'],
			summary: 'get all special holidays',
			description: 'All special holidays',
			responses: {
				200: SE.response_schema_ref(200, 'hr/special_holidays'),
				405: SE.response(405),
			},
		},
		post: {
			tags: ['hr.special_holidays'],
			summary: 'create a special holidays',
			description: '',
			// operationId: "addPet",
			consumes: ['application/json'],
			produces: ['application/json'],
			requestBody: SE.requestBody_schema_ref('hr/special_holidays'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/special_holidays'),
				405: SE.response(405),
			},
		},
	},
	'/hr/special-holidays/{uuid}': {
		get: {
			tags: ['hr.special_holidays'],
			summary: 'Gets a special holidays',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Special holidays to get',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/special_holidays'),
				405: SE.response(405),
			},
		},
		put: {
			tags: ['hr.special_holidays'],
			summary: 'Update an existing special holidays',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Special holidays to put',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			requestBody: SE.requestBody_schema_ref('hr/special_holidays'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/special_holidays'),
				405: SE.response(405),
			},
		},
		delete: {
			tags: ['hr.special_holidays'],
			summary: 'Deletes a special holidays',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Special holidays to delete',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response(200),
				405: SE.response(405),
			},
		},
	},
};

const pathHrGeneralHolidays = {
	'/hr/general-holiday': {
		get: {
			tags: ['hr.general_holiday'],
			summary: 'get all general holidays',
			description: 'All general holidays',
			responses: {
				200: SE.response_schema_ref(200, 'hr/general_holiday'),
				405: SE.response(405),
			},
		},
		post: {
			tags: ['hr.general_holiday'],
			summary: 'create a general holidays',
			description: '',
			// operationId: "addPet",
			consumes: ['application/json'],
			produces: ['application/json'],
			requestBody: SE.requestBody_schema_ref('hr/general_holiday'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/general_holiday'),
				405: SE.response(405),
			},
		},
	},
	'/hr/general-holiday/{uuid}': {
		get: {
			tags: ['hr.general_holiday'],
			summary: 'Gets a general holidays',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'General holidays to get',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/general_holiday'),
				405: SE.response(405),
			},
		},
		put: {
			tags: ['hr.general_holiday'],
			summary: 'Update an existing general holidays',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'General holidays to put',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			requestBody: SE.requestBody_schema_ref('hr/general_holiday'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/general_holiday'),
				405: SE.response(405),
			},
		},
		delete: {
			tags: ['hr.general_holiday'],
			summary: 'Deletes a general holidays',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'General holidays to delete',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response(200),
				405: SE.response(405),
			},
		},
	},
};

const pathHrDeviceList = {
	'/hr/device-list': {
		get: {
			tags: ['hr.device_list'],
			summary: 'get all device list',
			description: 'All device list',
			responses: {
				200: SE.response_schema_ref(200, 'hr/device_list'),
				405: SE.response(405),
			},
		},
		post: {
			tags: ['hr.device_list'],
			summary: 'create a device list',
			description: '',
			// operationId: "addPet",
			consumes: ['application/json'],
			produces: ['application/json'],
			requestBody: SE.requestBody_schema_ref('hr/device_list'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/device_list'),
				405: SE.response(405),
			},
		},
	},
	'/hr/device-list/{uuid}': {
		get: {
			tags: ['hr.device_list'],
			summary: 'Gets a device list',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Device list to get',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/device_list'),
				405: SE.response(405),
			},
		},
		put: {
			tags: ['hr.device_list'],
			summary: 'Update an existing device list',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Device list to put',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			requestBody: SE.requestBody_schema_ref('hr/device_list'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/device_list'),
				405: SE.response(405),
			},
		},
		delete: {
			tags: ['hr.device_list'],
			summary: 'Deletes a device list',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Device list to delete',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response(200),
				405: SE.response(405),
			},
		},
	},
};

const pathHrShift = {
	'/hr/shifts': {
		get: {
			tags: ['hr.shifts'],
			summary: 'get all shift',
			description: 'All shift',
			responses: {
				200: SE.response_schema_ref(200, 'hr/shifts'),
				405: SE.response(405),
			},
		},
		post: {
			tags: ['hr.shifts'],
			summary: 'create a shift',
			description: '',
			// operationId: "addPet",
			consumes: ['application/json'],
			produces: ['application/json'],
			requestBody: SE.requestBody_schema_ref('hr/shifts'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/shifts'),
				405: SE.response(405),
			},
		},
	},
	'/hr/shifts/{uuid}': {
		get: {
			tags: ['hr.shifts'],
			summary: 'Gets a shifts',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Shift to get',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/shifts'),
				405: SE.response(405),
			},
		},
		put: {
			tags: ['hr.shifts'],
			summary: 'Update an existing shift',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Shift to put',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			requestBody: SE.requestBody_schema_ref('hr/shifts'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/shifts'),
				405: SE.response(405),
			},
		},
		delete: {
			tags: ['hr.shifts'],
			summary: 'Deletes a shifts',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Shift to delete',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response(200),
				405: SE.response(405),
			},
		},
	},
};

const pathHrShiftGroup = {
	'/hr/shift-group': {
		get: {
			tags: ['hr.shift_group'],
			summary: 'get all shift group',
			description: 'All shift group',
			responses: {
				200: SE.response_schema_ref(200, 'hr/shift_group'),
				405: SE.response(405),
			},
		},
		post: {
			tags: ['hr.shift_group'],
			summary: 'create a shift group',
			description: '',
			// operationId: "addPet",
			consumes: ['application/json'],
			produces: ['application/json'],
			requestBody: SE.requestBody_schema_ref('hr/shift_group'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/shift_group'),
				405: SE.response(405),
			},
		},
	},
	'/hr/shift-group/{uuid}': {
		get: {
			tags: ['hr.shift_group'],
			summary: 'Gets a shift group',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Shift group to get',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/shift_group'),
				405: SE.response(405),
			},
		},
		put: {
			tags: ['hr.shift_group'],
			summary: 'Update an existing shift group',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Shift group to put',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			requestBody: SE.requestBody_schema_ref('hr/shift_group'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/shift_group'),
				405: SE.response(405),
			},
		},
		delete: {
			tags: ['hr.shift_group'],
			summary: 'Deletes a shift group',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Shift group to delete',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response(200),
				405: SE.response(405),
			},
		},
	},
};

const pathHrRoster = {
	'/hr/roster': {
		get: {
			tags: ['hr.roster'],
			summary: 'get all roster',
			description: 'All roster',
			responses: {
				200: SE.response_schema_ref(200, 'hr/roster'),
				405: SE.response(405),
			},
		},
		post: {
			tags: ['hr.roster'],
			summary: 'create a roster',
			description: '',
			// operationId: "addPet",
			consumes: ['application/json'],
			produces: ['application/json'],
			requestBody: SE.requestBody_schema_ref('hr/roster'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/roster'),
				405: SE.response(405),
			},
		},
	},
	'/hr/roster/{uuid}': {
		get: {
			tags: ['hr.roster'],
			summary: 'Gets a roster',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Roster to get',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/roster'),
				405: SE.response(405),
			},
		},
		put: {
			tags: ['hr.roster'],
			summary: 'Update an existing roster',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Roster to put',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			requestBody: SE.requestBody_schema_ref('hr/roster'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/roster'),
				405: SE.response(405),
			},
		},
		delete: {
			tags: ['hr.roster'],
			summary: 'Deletes a roster',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Roster to delete',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response(200),
				405: SE.response(405),
			},
		},
	},
	'/hr/roster-calendar/by/{employee_uuid}/{year}/{month}': {
		get: {
			tags: ['hr.roster'],
			summary: 'Get roster calendar by employee UUID, year, and month',
			description: '',
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Employee UUID',
					'employee_uuid',
					'string',
					SE.uuid()
				),
				SE.parameter_params('Year', 'year', 'integer', SE.integer()),
				SE.parameter_params('Month', 'month', 'integer', SE.integer()),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/roster'),
				405: SE.response(405),
			},
		},
	},
};

const pathHrLeavePolicy = {
	'/hr/leave-policy': {
		get: {
			tags: ['hr.leave_policy'],
			summary: 'get all leave policy',
			description: 'All leave policy',
			responses: {
				200: SE.response_schema_ref(200, 'hr/leave_policy'),
				405: SE.response(405),
			},
		},
		post: {
			tags: ['hr.leave_policy'],
			summary: 'create a leave policy',
			description: '',
			// operationId: "addPet",
			consumes: ['application/json'],
			produces: ['application/json'],
			requestBody: SE.requestBody_schema_ref('hr/leave_policy'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/leave_policy'),
				405: SE.response(405),
			},
		},
	},
	'/hr/leave-policy/{uuid}': {
		get: {
			tags: ['hr.leave_policy'],
			summary: 'Gets a leave policy',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Leave policy to get',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/leave_policy'),
				405: SE.response(405),
			},
		},
		put: {
			tags: ['hr.leave_policy'],
			summary: 'Update an existing leave policy',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Leave policy to put',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			requestBody: SE.requestBody_schema_ref('hr/leave_policy'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/leave_policy'),
				405: SE.response(405),
			},
		},
		delete: {
			tags: ['hr.leave_policy'],
			summary: 'Deletes a leave policy',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Leave policy to delete',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response(200),
				405: SE.response(405),
			},
		},
	},
};

const pathHrLeaveCategory = {
	'/hr/leave-category': {
		get: {
			tags: ['hr.leave_category'],
			summary: 'get all leave category',
			description: 'All leave category',
			responses: {
				200: SE.response_schema_ref(200, 'hr/leave_category'),
				405: SE.response(405),
			},
		},
		post: {
			tags: ['hr.leave_category'],
			summary: 'create a leave category',
			description: '',
			// operationId: "addPet",
			consumes: ['application/json'],
			produces: ['application/json'],
			requestBody: SE.requestBody_schema_ref('hr/leave_category'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/leave_category'),
				405: SE.response(405),
			},
		},
	},
	'/hr/leave-category/{uuid}': {
		get: {
			tags: ['hr.leave_category'],
			summary: 'Gets a leave category',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Leave category to get',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/leave_category'),
				405: SE.response(405),
			},
		},
		put: {
			tags: ['hr.leave_category'],
			summary: 'Update an existing leave category',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Leave category to put',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			requestBody: SE.requestBody_schema_ref('hr/leave_category'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/leave_category'),
				405: SE.response(405),
			},
		},
		delete: {
			tags: ['hr.leave_category'],
			summary: 'Deletes a leave category',
			description: '',
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Leave category to delete',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response(200),
				405: SE.response(405),
			},
		},
	},
};

const pathHrConfiguration = {
	'/hr/configuration': {
		get: {
			tags: ['hr.configuration'],
			summary: 'get all configuration',
			description: 'All configuration',
			responses: {
				200: SE.response_schema_ref(200, 'hr/configuration'),
				405: SE.response(405),
			},
		},
		post: {
			tags: ['hr.configuration'],
			summary: 'create a configuration',
			description: '',
			// operationId: "addPet",
			consumes: ['application/json'],
			produces: ['application/json'],
			requestBody: SE.requestBody_schema_ref('hr/configuration'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/configuration'),
				405: SE.response(405),
			},
		},
	},
	'/hr/configuration/{uuid}': {
		get: {
			tags: ['hr.configuration'],
			summary: 'Gets a configuration',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Configuration to get',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/configuration'),
				405: SE.response(405),
			},
		},
		put: {
			tags: ['hr.configuration'],
			summary: 'Update an existing configuration',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Configuration to put',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			requestBody: SE.requestBody_schema_ref('hr/configuration'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/configuration'),
				405: SE.response(405),
			},
		},
		delete: {
			tags: ['hr.configuration'],
			summary: 'Deletes a configuration',
			description: '',
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Configuration to delete',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response(200),
				405: SE.response(405),
			},
		},
	},
	'/hr/configuration-entry-details/by/{configuration_uuid}': {
		get: {
			tags: ['hr.configuration'],
			summary: 'Gets a configuration entry details',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				{
					name: 'configuration_uuid',
					in: 'path',
					description: 'Configuration UUID',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					configuration: { $ref: '#/definitions/hr/configuration' },
					configuration_entry: {
						type: 'array',
						items: { $ref: '#/definitions/hr/configuration_entry' },
					},
				}),
				405: SE.response(405),
			},
		},
	},
};

const pathHrConfigurationEntry = {
	'/hr/configuration-entry': {
		get: {
			tags: ['hr.configuration_entry'],
			summary: 'get all configuration entry',
			description: 'All configuration entry',
			responses: {
				200: SE.response_schema_ref(200, 'hr/configuration_entry'),
				405: SE.response(405),
			},
		},
		post: {
			tags: ['hr.configuration_entry'],
			summary: 'create a configuration entry',
			description: '',
			// operationId: "addPet",
			consumes: ['application/json'],
			produces: ['application/json'],
			requestBody: SE.requestBody_schema_ref('hr/configuration_entry'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/configuration_entry'),
				405: SE.response(405),
			},
		},
	},
	'/hr/configuration-entry/{uuid}': {
		get: {
			tags: ['hr.configuration_entry'],
			summary: 'Gets a configuration entry',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Configuration entry to get',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/configuration_entry'),
				405: SE.response(405),
			},
		},
		put: {
			tags: ['hr.configuration_entry'],
			summary: 'Update an existing configuration entry',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Configuration entry to put',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			requestBody: SE.requestBody_schema_ref('hr/configuration_entry'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/configuration_entry'),
				405: SE.response(405),
			},
		},
		delete: {
			tags: ['hr.configuration_entry'],
			summary: 'Deletes a configuration entry',
			description: '',
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Configuration entry to delete',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response(200),
				405: SE.response(405),
			},
		},
	},
	'/hr/configuration-entry/by/{configuration_uuid}': {
		get: {
			tags: ['hr.configuration_entry'],
			summary: 'Gets a configuration entry',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				{
					name: 'configuration_uuid',
					in: 'path',
					description: 'Configuration UUID',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					configuration_entry: {
						type: 'array',
						items: { $ref: '#/definitions/hr/configuration_entry' },
					},
				}),
				405: SE.response(405),
			},
		},
	},
};

const pathHrEmployee = {
	'/hr/employee': {
		get: {
			tags: ['hr.employee'],
			summary: 'get all employee',
			description: 'All employee',
			responses: {
				200: SE.response_schema_ref(200, 'hr/employee'),
				405: SE.response(405),
			},
		},
		post: {
			tags: ['hr.employee'],
			summary: 'create a employee',
			description: '',
			// operationId: "addPet",
			consumes: ['application/json'],
			produces: ['application/json'],
			requestBody: SE.requestBody_schema_ref('hr/employee'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/employee'),
				405: SE.response(405),
			},
		},
	},
	'/hr/employee/{uuid}': {
		get: {
			tags: ['hr.employee'],
			summary: 'Gets a employee',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Employee to get',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/employee'),
				405: SE.response(405),
			},
		},
		put: {
			tags: ['hr.employee'],
			summary: 'Update an existing employee',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Employee to put',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			requestBody: SE.requestBody_schema_ref('hr/employee'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/employee'),
				405: SE.response(405),
			},
		},
		delete: {
			tags: ['hr.employee'],
			summary: 'Deletes a employee',
			description: '',
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Employee to delete',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response(200),
				405: SE.response(405),
			},
		},
	},
	'/hr/manual-entry-details/by/{employee_uuid}': {
		get: {
			tags: ['hr.employee'],
			summary: 'Gets a employee',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				{
					name: 'employee_uuid',
					in: 'path',
					description: 'Employee UUID',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					employee: { $ref: '#/definitions/hr/employee' },
					manual_entries: {
						type: 'array',
						items: { $ref: '#/definitions/hr/manual_entry' },
					},
				}),
				405: SE.response(405),
			},
		},
	},
	'/hr/employee-leave-information-details/by/{employee_uuid}': {
		get: {
			tags: ['hr.employee'],
			summary: 'Gets a employee leave information',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				{
					name: 'employee_uuid',
					in: 'path',
					description: 'Employee UUID',
					required: true,
					type: 'string',
					format: 'uuid',
				},
				SE.parameter_query('apply_leave_uuid', 'apply_leave_uuid', [
					'uuid',
				]),
			],
			// ...existing code...
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					id: SE.integer(1),
					gender: SE.string('male'),
					user_uuid: SE.uuid(),
					employee_name: SE.string('John Doe'),
					start_date: SE.date_time(),
					workplace_uuid: SE.uuid(),
					workplace_name: SE.string('Head Office'),
					rfid: SE.string('1234567890'),
					sub_department_uuid: SE.uuid(),
					sub_department_name: SE.string('Accounts'),
					primary_display_text: SE.string('Primary Text'),
					secondary_display_text: SE.string('Secondary Text'),
					configuration_uuid: SE.uuid(),
					employment_type_uuid: SE.uuid(),
					employment_type_name: SE.string('Full Time'),
					end_date: SE.date_time(),
					shift_group_uuid: SE.uuid(),
					shift_group_name: SE.string('Morning Shift'),
					line_manager_uuid: SE.uuid(),
					hr_manager_uuid: SE.uuid(),
					is_admin: SE.boolean(false),
					is_hr: SE.boolean(false),
					is_line_manager: SE.boolean(false),
					allow_over_time: SE.boolean(false),
					exclude_from_attendance: SE.boolean(false),
					status: SE.integer(1),
					created_by: SE.uuid(),
					created_by_name: SE.string('Admin User'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
					// name: SE.string('John Doe'),
					// email: SE.string('john@fzl.com'),
					// pass: SE.string('password'),
					designation_uuid: SE.uuid(),
					designation_name: SE.string('HR Manager'),
					department_uuid: SE.uuid(),
					department_name: SE.string('HR'),
					employee_id: SE.string('EMP001'),
					leave_policy_uuid: SE.uuid(),
					leave_policy_name: SE.string('Standard Leave Policy'),
					report_position: SE.string('Senior Manager'),
					remaining_leave_information: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								uuid: SE.uuid(),
								name: SE.string('Casual Leave'),
								maximum_number_of_allowed_leaves:
									SE.integer(10),
								used_leave_days: SE.integer(2),
								remaining_leave_days: SE.integer(8),
							},
						},
						example: [
							{
								uuid: 'leave-cat-uuid',
								name: 'Casual Leave',
								maximum_number_of_allowed_leaves: 10,
								used_leave_days: 2,
								remaining_leave_days: 8,
							},
						],
					},
					leave_application_information: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								uuid: SE.uuid(),
								leave_category_uuid: SE.uuid(),
								leave_category_name: SE.string('Casual Leave'),
								employee_uuid: SE.uuid(),
								employee_name: SE.string('John Doe'),
								type: SE.string('full'),
								from_date: SE.date_time(),
								to_date: SE.date_time(),
								reason: SE.string('Medical leave'),
								file: SE.string('file.pdf'),
								approval: SE.string('approved'),
							},
						},
						example: [
							{
								uuid: 'apply-leave-uuid',
								leave_category_uuid: 'leave-cat-uuid',
								leave_category_name: 'Casual Leave',
								employee_uuid: 'employee-uuid',
								employee_name: 'John Doe',
								type: 'full',
								from_date: '2025-05-07',
								to_date: '2025-05-10',
								reason: 'Medical leave',
								file: 'file.pdf',
								approval: 'approved',
							},
						],
					},
				}),

				405: SE.response(405),
			},
		},
	},
};

const pathHrEmployeeAddress = {
	'/hr/employee-address': {
		get: {
			tags: ['hr.employee_address'],
			summary: 'get all employee address',
			description: 'All employee address',
			responses: {
				200: SE.response_schema_ref(200, 'hr/employee_address'),
				405: SE.response(405),
			},
		},
		post: {
			tags: ['hr.employee_address'],
			summary: 'create a employee address',
			description: '',
			// operationId: "addPet",
			consumes: ['application/json'],
			produces: ['application/json'],
			requestBody: SE.requestBody_schema_ref('hr/employee_address'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/employee_address'),
				405: SE.response(405),
			},
		},
	},
	'/hr/employee-address/{uuid}': {
		get: {
			tags: ['hr.employee_address'],
			summary: 'Gets a employee address',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Employee address to get',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/employee_address'),
				405: SE.response(405),
			},
		},
		put: {
			tags: ['hr.employee_address'],
			summary: 'Update an existing employee address',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Employee address to put',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			requestBody: SE.requestBody_schema_ref('hr/employee_address'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/employee_address'),
				405: SE.response(405),
			},
		},
		delete: {
			tags: ['hr.employee_address'],
			summary: 'Deletes a employee address',
			description: '',
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Employee address to delete',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response(200),
				405: SE.response(405),
			},
		},
	},
	'/hr/employee-address/by/{employee_uuid}': {
		get: {
			tags: ['hr.employee_address'],
			summary: 'Gets a employee address',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Employee UUID to get address',
					'employee_uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response_schema(200, {
					employee_address: {
						type: 'array',
						items: { $ref: '#/definitions/hr/employee_address' },
					},
				}),
				405: SE.response(405),
			},
		},
	},
};

const pathHrEmployeeHistory = {
	'/hr/employee-history': {
		get: {
			tags: ['hr.employee_history'],
			summary: 'get all employee history',
			description: 'All employee history',
			responses: {
				200: SE.response_schema_ref(200, 'hr/employee_history'),
				405: SE.response(405),
			},
		},
		post: {
			tags: ['hr.employee_history'],
			summary: 'create a employee history',
			description: '',
			// operationId: "addPet",
			consumes: ['application/json'],
			produces: ['application/json'],
			requestBody: SE.requestBody_schema_ref('hr/employee_history'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/employee_history'),
				405: SE.response(405),
			},
		},
	},
	'/hr/employee-history/{uuid}': {
		get: {
			tags: ['hr.employee_history'],
			summary: 'Gets a employee history',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Employee history to get',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/employee_history'),
				405: SE.response(405),
			},
			consumes: ['application/json'],
			produces: ['application/json'],
		},
		put: {
			tags: ['hr.employee_history'],
			summary: 'Update an existing employee history',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Employee history to put',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			requestBody: SE.requestBody_schema_ref('hr/employee_history'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/employee_history'),
				405: SE.response(405),
			},
		},
		delete: {
			tags: ['hr.employee_history'],
			summary: 'Deletes a employee history',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Employee history to delete',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response(200),
				405: SE.response(405),
			},
		},
	},
	'/hr/employee-history/by/{employee_uuid}': {
		get: {
			tags: ['hr.employee_history'],
			summary: 'Gets a employee history',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Employee UUID to get history',
					'employee_uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response_schema(200, {
					employee_history: {
						type: 'array',
						items: { $ref: '#/definitions/hr/employee_history' },
					},
				}),
				405: SE.response(405),
			},
		},
	},
};

const pathHrEmployeeEducation = {
	'/hr/employee-education': {
		get: {
			tags: ['hr.employee_education'],
			summary: 'get all employee education',
			description: 'All employee education',
			responses: {
				200: SE.response_schema_ref(200, 'hr/employee_education'),
				405: SE.response(405),
			},
		},
		post: {
			tags: ['hr.employee_education'],
			summary: 'create a employee education',
			description: '',
			// operationId: "addPet",
			consumes: ['application/json'],
			produces: ['application/json'],
			requestBody: SE.requestBody_schema_ref('hr/employee_education'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/employee_education'),
				405: SE.response(405),
			},
		},
	},
	'/hr/employee-education/{uuid}': {
		get: {
			tags: ['hr.employee_education'],
			summary: 'Gets a employee education',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Employee education to get',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/employee_education'),
				405: SE.response(405),
			},
			consumes: ['application/json'],
			produces: ['application/json'],
		},
		put: {
			tags: ['hr.employee_education'],
			summary: 'Update an existing employee education',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Employee education to put',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			requestBody: SE.requestBody_schema_ref('hr/employee_education'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/employee_education'),
				405: SE.response(405),
			},
		},
		delete: {
			tags: ['hr.employee_education'],
			summary: 'Deletes a employee education',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Employee education to delete',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response(200),
				405: SE.response(405),
			},
		},
	},
	'/hr/employee-education/by/{employee_uuid}': {
		get: {
			tags: ['hr.employee_education'],
			summary: 'Gets employee education by employee UUID',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Employee UUID to get education',
					'employee_uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response_schema(200, {
					employee_education: {
						type: 'array',
						items: { $ref: '#/definitions/hr/employee_education' },
					},
				}),
				405: SE.response(405),
			},
		},
	},
};

const pathHrEmployeeDocument = {
	'/hr/employee-document': {
		get: {
			tags: ['hr.employee_document'],
			summary: 'get all employee document',
			description: 'All employee document',
			responses: {
				200: SE.response_schema_ref(200, 'hr/employee_document'),
				405: SE.response(405),
			},
		},
		post: {
			tags: ['hr.employee_document'],
			summary: 'create a employee document',
			description: '',
			// operationId: "addPet",
			consumes: ['multipart/form-data'],
			produces: ['application/json'],
			requestBody: {
				required: true,
				content: {
					'multipart/form-data': {
						schema: {
							$ref: '#/definitions/hr/employee_document',
						},
					},
				},
			},
			// requestBody: SE.requestBody_schema_ref('hr/employee_document'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/employee_document'),
				405: SE.response(405),
			},
		},
	},
	'/hr/employee-document/{uuid}': {
		get: {
			tags: ['hr.employee_document'],
			summary: 'Gets a employee document',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Employee document to get',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/employee_document'),
				405: SE.response(405),
			},
			consumes: ['application/json'],
			produces: ['application/json'],
		},
		put: {
			tags: ['hr.employee_document'],
			summary: 'Update an existing employee document',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Employee document to put',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			requestBody: SE.requestBody_schema_ref('hr/employee_document'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/employee_document'),
				405: SE.response(405),
			},
		},
		delete: {
			tags: ['hr.employee_document'],
			summary: 'Deletes a employee document',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Employee document to delete',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response(200),
				405: SE.response(405),
			},
		},
	},
	'/hr/employee-document/by/{employee_uuid}': {
		get: {
			tags: ['hr.employee_document'],
			summary: 'Gets employee document by employee UUID',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Employee UUID to get document',
					'employee_uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/employee_document'),
				405: SE.response(405),
			},
		},
	},
};

const pathHrDevicePermission = {
	'/hr/device-permission': {
		get: {
			tags: ['hr.device_permission'],
			summary: 'get all device permission',
			description: 'All device permission',
			parameters: [
				SE.parameter_query('employee_uuid', 'employee_uuid', ['uuid']),
				SE.parameter_query('device_list_uuid', 'device_list_uuid', [
					'uuid',
				]),
				SE.parameter_query('permission_type', 'permission_type', [
					'permanent',
					'temporary',
				]),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/device_permission'),
				405: SE.response(405),
			},
		},
		post: {
			tags: ['hr.device_permission'],
			summary: 'create a device permission',
			description: '',
			// operationId: "addPet",
			consumes: ['application/json'],
			produces: ['application/json'],
			requestBody: SE.requestBody_schema_ref('hr/device_permission'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/device_permission'),
				405: SE.response(405),
			},
		},
	},
	'/hr/device-permission/{uuid}': {
		get: {
			tags: ['hr.device_permission'],
			summary: 'Gets a device permission',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Device permission to get',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/device_permission'),
				405: SE.response(405),
			},
		},
		put: {
			tags: ['hr.device_permission'],
			summary: 'Update an existing device permission',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Device permission to put',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			requestBody: SE.requestBody_schema_ref('hr/device_permission'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/device_permission'),
				405: SE.response(405),
			},
		},
		delete: {
			tags: ['hr.device_permission'],
			summary: 'Deletes a device permission',
			description: '',
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Device permission to delete',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response(200),
				405: SE.response(405),
			},
		},
	},
	'/hr/device-permission-for-employee/by/{device_list_uuid}': {
		get: {
			tags: ['hr.device_permission'],
			summary: 'Gets a device permission',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				{
					name: 'device_list_uuid',
					in: 'path',
					description: 'Device list UUID',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					device_permission: {
						type: 'array',
						items: { $ref: '#/definitions/hr/device_permission' },
					},
				}),
				405: SE.response(405),
			},
		},
	},
};

const pathHrPunchLog = {
	'/hr/punch-log': {
		get: {
			tags: ['hr.punch_log'],
			summary: 'get all punch log',
			description: 'All punch log',
			responses: {
				200: SE.response_schema_ref(200, 'hr/punch_log'),
				405: SE.response(405),
			},
		},
		post: {
			tags: ['hr.punch_log'],
			summary: 'create a punch log',
			description: '',
			// operationId: "addPet",
			consumes: ['application/json'],
			produces: ['application/json'],
			requestBody: SE.requestBody_schema_ref('hr/punch_log'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/punch_log'),
				405: SE.response(405),
			},
		},
	},
	'/hr/punch-log/{uuid}': {
		get: {
			tags: ['hr.punch_log'],
			summary: 'Gets a punch log',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Punch log to get',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/punch_log'),
				405: SE.response(405),
			},
		},
		put: {
			tags: ['hr.punch_log'],
			summary: 'Update an existing punch log',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Punch log to put',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			requestBody: SE.requestBody_schema_ref('hr/punch_log'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/punch_log'),
				405: SE.response(405),
			},
		},
		delete: {
			tags: ['hr.punch_log'],
			summary: 'Deletes a punch log',
			description: '',
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Punch log to delete',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response(200),
				405: SE.response(405),
			},
		},
	},
	'/hr/punch-late-log/by/{employee_uuid}': {
		get: {
			tags: ['hr.punch_log'],
			summary: 'Gets a punch log by employee uuid',
			description: '',
			produces: ['application/json'],
			parameters: [
				SE.parameter_params('employee_uuid', 'employee_uuid', [
					SE.uuid(),
				]),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/punch_log'),
				405: SE.response(405),
			},
		},
	},
};

const pathHrManualEntry = {
	'/hr/manual-entry': {
		get: {
			tags: ['hr.manual_entry'],
			summary: 'get all manual entry',
			description: 'All manual entry',
			// parameters: [
			// 	SE.parameter_query('type', 'type', [
			// 		'field_visit',
			// 		'missing_punch',
			// 		'manual_punch',
			// 	]),
			// ],
			// ...existing code...
			parameters: [
				{
					name: 'type',
					in: 'query',
					description: 'Type of manual entry',
					required: false,
					schema: {
						type: 'string',
						enum: [
							'field_visit',
							'missing_punch',
							'manual_entry',
							'late_application',
						],
					},
					example: 'field_visit',
				},
			],
			// ...existing code...
			responses: {
				200: SE.response_schema_ref(200, 'hr/manual_entry'),
				405: SE.response(405),
			},
		},
		post: {
			tags: ['hr.manual_entry'],
			summary: 'create a manual entry',
			description: '',
			// operationId: "addPet",
			consumes: ['application/json'],
			produces: ['application/json'],
			requestBody: SE.requestBody_schema_ref('hr/manual_entry'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/manual_entry'),
				405: SE.response(405),
			},
		},
	},
	'/hr/manual-entry/{uuid}': {
		get: {
			tags: ['hr.manual_entry'],
			summary: 'Gets a manual entry',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Manual entry to get',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/manual_entry'),
				405: SE.response(405),
			},
		},
		put: {
			tags: ['hr.manual_entry'],
			summary: 'Update an existing manual entry',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Manual entry to put',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			requestBody: SE.requestBody_schema_ref('hr/manual_entry'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/manual_entry'),
				405: SE.response(405),
			},
		},
		delete: {
			tags: ['hr.manual_entry'],
			summary: 'Deletes a manual entry',
			description: '',
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Manual entry to delete',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response(200),
				405: SE.response(405),
			},
		},
	},
	'/hr/manual-entry/by/{employee_uuid}': {
		get: {
			tags: ['hr.manual_entry'],
			summary: 'Gets a manual entry by employee uuid',
			description: '',
			produces: ['application/json'],
			parameters: [
				SE.parameter_params('employee_uuid', 'employee_uuid', [
					SE.uuid(),
				]),
				SE.parameter_query('field_visit_uuid', 'field_visit_uuid', [
					SE.uuid(),
				]),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/manual_entry'),
				405: SE.response(405),
			},
		},
	},
	'/hr/v2/manual-entry/by/pagination': {
		get: {
			tags: ['hr.manual_entry'],
			summary: 'Gets manual entries with pagination',
			description: '',
			produces: ['application/json'],
			parameters: [
				// q, page, limit, sort, orderby
				SE.parameter_query('q', 'q', SE.string()),
				SE.parameter_query('page', 'Page number', [SE.integer(1)]),
				SE.parameter_query('limit', 'Number of entries per page', [
					SE.integer(10),
				]),
				SE.parameter_query('sort', 'Sort by field', [SE.string()]),
				SE.parameter_query('orderby', 'Order by', ['asc', 'desc']),
				SE.parameter_query('field_name', 'field_name', SE.string()),
				SE.parameter_query('field_value', 'field_value', SE.string()),
			],
			responses: {
				200: SE.response_schema(200, {
					manual_entries: {
						type: 'array',
						items: { $ref: '#/definitions/hr/manual_entry' },
					},
					pagination: {
						type: 'object',
						properties: {
							page: { type: 'integer', example: 1 },
							limit: { type: 'integer', example: 10 },
							total_entries: { type: 'integer', example: 100 },
							total_pages: { type: 'integer', example: 10 },
						},
					},
				}),
				405: SE.response(405),
			},
		},
	},
};

const pathHrApplyLeave = {
	'/hr/apply-leave': {
		get: {
			tags: ['hr.apply_leave'],
			summary: 'get all apply leave',
			description: 'All apply leave',
			parameters: [
				SE.parameter_query('approval', 'approval', [
					'approved',
					'rejected',
					'pending',
				]),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/apply_leave'),
				405: SE.response(405),
			},
		},
		post: {
			tags: ['hr.apply_leave'],
			summary: 'create a apply leave',
			description: '',
			// operationId: "addPet",
			consumes: ['application/json'],
			produces: ['application/json'],
			requestBody: {
				required: true,
				content: {
					'multipart/form-data': {
						schema: {
							type: 'object',
							properties: {
								uuid: {
									type: 'string',
									example: 'igD0v9DIJQhJeet',
								},

								employee_uuid: {
									type: 'string',
									example: 'igD0v9DIJQhJeet',
								},
								leave_category_uuid: {
									type: 'string',
									example: 'igD0v9DIJQhJeet',
								},
								year: { type: Number, example: 2025 },
								type: { type: 'string', example: 'full' },
								from_date: {
									type: 'string',
									format: 'date',
									example: '2025-05-07 18:44:25',
								},
								to_date: {
									type: 'string',
									format: 'date',
									example: '2025-05-07 18:44:25',
								},
								reason: {
									type: 'string',
									example: 'Medical leave',
								},
								file: { type: 'string', format: 'binary' }, // for file upload
								approved: {
									type: 'boolean',
									example: false,
								},
								created_by: {
									type: 'string',
									example: 'igD0v9DIJQhJeet',
								},
								created_at: {
									type: 'string',
									format: 'date-time',
									example: '2024-05-01 10:00:00',
								},
								updated_at: {
									type: 'string',
									format: 'date-time',
									example: '2024-05-01 10:00:00',
								},
								remarks: {
									type: 'string',
									example: 'Leave approved',
								},
							},
							required: [
								'uuid',
								//'employee_uuid',
								//'leave_category_uuid',
								'year',
								'type',
								'from_date',
								'to_date',
								'reason',
								'created_by',
								'created_at',
							],
						},
					},
				},
			},
			responses: {
				200: SE.response_schema_ref(200, 'hr/apply_leave'),
				405: SE.response(405),
			},
		},
	},
	'/hr/apply-leave/{uuid}': {
		get: {
			tags: ['hr.apply_leave'],
			summary: 'Gets a apply leave',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [SE.parameter_params('hr.apply_leave to get')],
			responses: {
				200: SE.response_schema_ref(200, 'hr/apply_leave'),
				405: SE.response(405),
			},
		},
		put: {
			tags: ['hr.apply_leave'],
			summary: 'Update an existing apply leave',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [SE.parameter_params('hr.apply_leave to update')],
			requestBody: {
				required: true,
				content: {
					'multipart/form-data': {
						schema: {
							type: 'object',
							properties: {
								employee_uuid: {
									type: 'string',
									example: 'igD0v9DIJQhJeet',
								},
								leave_category_uuid: {
									type: 'string',
									example: 'igD0v9DIJQhJeet',
								},
								year: { type: Number, example: 2025 },
								type: { type: 'string', example: 'full' },
								from_date: {
									type: 'string',
									format: 'date',
									example: '2025-05-07 18:44:25',
								},
								to_date: {
									type: 'string',
									format: 'date',
									example: '2025-05-07 18:44:25',
								},
								reason: {
									type: 'string',
									example: 'Medical leave',
								},
								file: { type: 'string', format: 'binary' }, // for file upload
								approved: {
									type: 'boolean',
									example: false,
								},
								created_by: {
									type: 'string',
									example: 'igD0v9DIJQhJeet',
								},
								created_at: {
									type: 'string',
									format: 'date-time',
									example: '2024-05-01 10:00:00',
								},
								updated_at: {
									type: 'string',
									format: 'date-time',
									example: '2024-05-01 10:00:00',
								},
							},
							required: [
								//'employee_uuid',
								//'leave_category_uuid',
								'year',
								'type',
								'from_date',
								'to_date',
								'reason',
							],
						},
					},
				},
			},
			responses: {
				200: SE.response_schema_ref(200, 'hr/apply_leave'),
				405: SE.response(405),
			},
		},
		delete: {
			tags: ['hr.apply_leave'],
			summary: 'Deletes a apply leave',
			description: '',
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Apply leave to delete',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response(200),
				405: SE.response(405),
			},
		},
	},
	'/hr/v2/apply-leave/by/pagination': {
		get: {
			tags: ['hr.apply_leave'],
			summary: 'Get apply leave by pagination',
			description: 'Get apply leave by pagination',
			parameters: [
				SE.parameter_query('page', 'page', ['integer']),
				SE.parameter_query('limit', 'limit', ['integer']),
				SE.parameter_query('sort', 'sort', ['string']),
				SE.parameter_query('orderBy', 'orderBy', ['asc', 'desc']),
				SE.parameter_query('employee_uuid', 'employee_uuid', ['uuid']),
				SE.parameter_query(
					'leave_category_uuid',
					'leave_category_uuid',
					['uuid']
				),
				SE.parameter_query('year', 'year', ['integer']),
				SE.parameter_query('type', 'type', [
					'full',
					'half',
					'first_half',
					'second_half',
				]),
				SE.parameter_query('from_date', 'from_date', ['date']),
				SE.parameter_query('to_date', 'to_date', ['date']),
				SE.parameter_query('reason', 'reason', ['string']),
				SE.parameter_query('approval', 'approval', [
					'approved',
					'rejected',
					'pending',
				]),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/apply_leave'),
				405: SE.response(405),
			},
		},
	},
};

const pathHrApplyBalance = {
	'/hr/apply-balance': {
		get: {
			tags: ['hr.apply_balance'],
			summary: 'get all apply balance',
			description: 'All apply balance',
			responses: {
				200: SE.response_schema_ref(200, 'hr/apply_balance'),
				405: SE.response(405),
			},
		},
		post: {
			tags: ['hr.apply_balance'],
			summary: 'create a apply balance',
			description: '',
			// operationId: "addPet",
			consumes: ['application/json'],
			produces: ['application/json'],
			requestBody: SE.requestBody_schema_ref('hr/apply_balance'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/apply_balance'),
				405: SE.response(405),
			},
		},
	},
	'/hr/apply-balance/{uuid}': {
		get: {
			tags: ['hr.apply_balance'],
			summary: 'Gets a apply balance',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Apply balance to get',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/apply_balance'),
				405: SE.response(405),
			},
		},
		put: {
			tags: ['hr.apply_balance'],
			summary: 'Update an existing apply balance',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Apply balance to put',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			requestBody: SE.requestBody_schema_ref('hr/apply_balance'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/apply_balance'),
				405: SE.response(405),
			},
		},
		delete: {
			tags: ['hr.apply_balance'],
			summary: 'Deletes a apply balance',
			description: '',
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Apply balance to delete',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response(200),
				405: SE.response(405),
			},
		},
	},
};

const pathHrSalaryOccasional = {
	'/hr/salary-occasional': {
		get: {
			tags: ['hr.salary_occasional'],
			summary: 'get all salary occasional',
			description: 'All salary occasional',
			responses: {
				200: SE.response_schema_ref(200, 'hr/salary_occasional'),
				405: SE.response(405),
			},
		},
		post: {
			tags: ['hr.salary_occasional'],
			summary: 'create a salary occasional',
			description: '',
			// operationId: "addPet",
			consumes: ['application/json'],
			produces: ['application/json'],
			requestBody: SE.requestBody_schema_ref('hr/salary_occasional'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/salary_occasional'),
				405: SE.response(405),
			},
		},
	},
	'/hr/salary-occasional/{uuid}': {
		get: {
			tags: ['hr.salary_occasional'],
			summary: 'Gets a salary occasional',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Salary occasional to get',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/salary_occasional'),
				405: SE.response(405),
			},
		},
		put: {
			tags: ['hr.salary_occasional'],
			summary: 'Update an existing salary occasional',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Salary occasional to put',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			requestBody: SE.requestBody_schema_ref('hr/salary_occasional'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/salary_occasional'),
				405: SE.response(405),
			},
		},
		delete: {
			tags: ['hr.salary_occasional'],
			summary: 'Deletes a salary occasional',
			description: '',
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Salary occasional to delete',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response(200),
				405: SE.response(405),
			},
		},
	},
};

const pathHrSalaryIncrement = {
	'/hr/salary-increment': {
		get: {
			tags: ['hr.salary_increment'],
			summary: 'get all salary increment',
			description: 'All salary increment',
			responses: {
				200: SE.response_schema_ref(200, 'hr/salary_increment'),
				405: SE.response(405),
			},
		},
		post: {
			tags: ['hr.salary_increment'],
			summary: 'create a salary increment',
			description: '',
			// operationId: "addPet",
			consumes: ['application/json'],
			produces: ['application/json'],
			requestBody: SE.requestBody_schema_ref('hr/salary_increment'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/salary_increment'),
				405: SE.response(405),
			},
		},
	},
	'/hr/salary-increment/{uuid}': {
		get: {
			tags: ['hr.salary_increment'],
			summary: 'Gets a salary increment',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Salary increment to get',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/salary_increment'),
				405: SE.response(405),
			},
		},
		put: {
			tags: ['hr.salary_increment'],
			summary: 'Update an existing salary increment',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Salary increment to put',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			requestBody: SE.requestBody_schema_ref('hr/salary_increment'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/salary_increment'),
				405: SE.response(405),
			},
		},
		delete: {
			tags: ['hr.salary_increment'],
			summary: 'Deletes a salary increment',
			description: '',
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Salary increment to delete',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response(200),
				405: SE.response(405),
			},
		},
	},
};

const pathHrSalaryEntry = {
	'/hr/salary-entry': {
		get: {
			tags: ['hr.salary_entry'],
			summary: 'get all salary entry',
			description: 'All salary entry',
			responses: {
				200: SE.response_schema_ref(200, 'hr/salary_entry'),
				405: SE.response(405),
			},
		},
		post: {
			tags: ['hr.salary_entry'],
			summary: 'create a salary entry',
			description: '',
			// operationId: "addPet",
			consumes: ['application/json'],
			produces: ['application/json'],
			requestBody: SE.requestBody_schema_ref('hr/salary_entry'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/salary_entry'),
				405: SE.response(405),
			},
		},
	},
	'/hr/salary-entry/{uuid}': {
		get: {
			tags: ['hr.salary_entry'],
			summary: 'Gets a salary entry',
			description: '',
			// operationId: "deletePet",
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Salary entry to get',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/salary_entry'),
				405: SE.response(405),
			},
		},
		put: {
			tags: ['hr.salary_entry'],
			summary: 'Update an existing salary entry',
			description: '',
			// operationId: "updatePet",
			consumes: ['application/json'],
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Salary entry to put',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			requestBody: SE.requestBody_schema_ref('hr/salary_entry'),
			responses: {
				200: SE.response_schema_ref(200, 'hr/salary_entry'),
				405: SE.response(405),
			},
		},
		delete: {
			tags: ['hr.salary_entry'],
			summary: 'Deletes a salary entry',
			description: '',
			produces: ['application/json'],
			parameters: [
				SE.parameter_params(
					'Salary entry to delete',
					'uuid',
					'string',
					SE.uuid()
				),
			],
			responses: {
				200: SE.response(200),
				405: SE.response(405),
			},
		},
	},
	'/hr/employee-salary-details/by/year-month/{year}/{month}': {
		get: {
			tags: ['hr.salary_entry'],
			summary: 'Get employee salary details by year and month',
			description: 'Get employee salary details by year and month',
			produces: ['application/json'],
			parameters: [
				SE.parameter_params('year', 'year', []),
				SE.parameter_params('month', 'month', []),
				SE.parameter_query('employee_uuid', 'employee_uuid', [
					SE.uuid(),
				]),
			],
			responses: {
				200: SE.response_schema_ref(200, 'hr/salary_entry'),
				405: SE.response(405),
			},
		},
	},
};

export const pathHr = {
	...pathHrUser,
	...pathHrDepartment,
	...pathHrDesignation,
	...pathHrPrivacyAndNotice,
	...pathHrSubDepartment,
	...pathHrWorkplace,
	...pathHrEmploymentType,
	...pathHrSpecialHolidays,
	...pathHrGeneralHolidays,
	...pathHrDeviceList,
	...pathHrShift,
	...pathHrShiftGroup,
	...pathHrRoster,
	...pathHrLeavePolicy,
	...pathHrLeaveCategory,
	...pathHrConfiguration,
	...pathHrConfigurationEntry,
	...pathHrEmployee,
	...pathHrEmployeeAddress,
	...pathHrEmployeeDocument,
	...pathHrEmployeeEducation,
	...pathHrEmployeeHistory,
	...pathHrDevicePermission,
	...pathHrPunchLog,
	...pathHrManualEntry,
	...pathHrApplyLeave,
	...pathHrApplyBalance,
	...pathHrSalaryOccasional,
	...pathHrSalaryIncrement,
	...pathHrSalaryEntry,
};
