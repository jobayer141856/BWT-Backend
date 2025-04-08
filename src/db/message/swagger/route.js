import SE, { SED } from '../../../util/swagger_example.js';

const pathSendMessage = {
	'/message/send': {
		post: {
			tags: ['message'],
			summary: 'Send message',
			description: 'Send message',
			operationId: 'sendMessage',
			requestBody: {
				required: true,
				content: {
					'application/json': {
						schema: {
							type: 'object',
							properties: {
								contacts: SE.string('contacts'),
								message: SE.string('message'),
							},
						},
					},
				},
			},
			responses: {
				200: SE.response_schema(200, {
					status_code: SE.integer(),
					status_message: SE.string('status_message'),
				}),
			},
		},
	},
};

export const pathMessage = {
	...pathSendMessage,
};
export const tagMessage = [
	{
		name: 'message',
	},
];
