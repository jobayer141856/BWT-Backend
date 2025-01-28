import { param } from 'express-validator';
import SE, { SED } from '../../../util/swagger_example.js';

//* HR others routes *//
const pathUser = {
	'/other/user/value/label': {
		get: {
			tags: ['others'],
			summary: 'Get all user',
			description: 'Get all user',
			parameters: [
				SE.parameter_query('type', 'type', ['employee', 'customer']),
				SE.parameter_query('department', 'department', [
					'admin',
					'hr',
					'it',
					'account',
				]),
				SE.parameter_query('designation', 'designation', [
					'admin',
					'officer',
					'assistant',
					'supervisor',
				]),
			],
			responses: {
				200: {
					description: 'Success',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: SE.uuid(),
									label: SE.string('user'),
								},
							},
						},
					},
				},
			},
		},
	},
};

const pathDesignation = {
	'/other/designation/value/label': {
		get: {
			tags: ['others'],
			summary: 'Get all designation',
			description: 'Get all designation',
			responses: {
				200: {
					description: 'Success',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: SE.uuid(),
									label: SE.string('designation'),
								},
							},
						},
					},
				},
			},
		},
	},
};

const pathDepartment = {
	'/other/department/value/label': {
		get: {
			tags: ['others'],
			summary: 'Get all department',
			description: 'Get all department',
			responses: {
				200: {
					description: 'Success',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: SE.uuid(),
									label: SE.string('department'),
								},
							},
						},
					},
				},
			},
		},
	},
};

//* Store others routes *//

const pathGroup = {
	'/other/group/value/label': {
		get: {
			tags: ['others'],
			summary: 'Get all group',
			description: 'Get all group',
			responses: {
				200: {
					description: 'Success',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: SE.uuid(),
									label: SE.string('group'),
								},
							},
						},
					},
				},
			},
		},
	},
};

const pathCategory = {
	'/other/category/value/label': {
		get: {
			tags: ['others'],
			summary: 'Get all category',
			description: 'Get all category',
			responses: {
				200: {
					description: 'Success',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: SE.uuid(),
									label: SE.string('category'),
								},
							},
						},
					},
				},
			},
		},
	},
};

const pathBrand = {
	'/other/brand/value/label': {
		get: {
			tags: ['others'],
			summary: 'Get all brand',
			description: 'Get all brand',
			responses: {
				200: {
					description: 'Success',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: SE.uuid(),
									label: SE.string('brand'),
								},
							},
						},
					},
				},
			},
		},
	},
};

const pathSize = {
	'/other/size/value/label': {
		get: {
			tags: ['others'],
			summary: 'Get all size',
			description: 'Get all size',
			responses: {
				200: {
					description: 'Success',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: SE.uuid(),
									label: SE.string('size'),
								},
							},
						},
					},
				},
			},
		},
	},
};

const pathVendor = {
	'/other/vendor/value/label': {
		get: {
			tags: ['others'],
			summary: 'Get all vendor',
			description: 'Get all vendor',
			responses: {
				200: {
					description: 'Success',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: SE.uuid(),
									label: SE.string('vendor'),
								},
							},
						},
					},
				},
			},
		},
	},
};

const pathProduct = {
	'/other/product/value/label': {
		get: {
			tags: ['others'],
			summary: 'Get all product',
			description: 'Get all product',
			responses: {
				200: {
					description: 'Success',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: SE.uuid(),
									label: SE.string('product'),
								},
							},
						},
					},
				},
			},
		},
	},
};

const pathBranch = {
	'/other/branch/value/label': {
		get: {
			tags: ['others'],
			summary: 'Get all branch',
			description: 'Get all branch',
			responses: {
				200: {
					description: 'Success',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: SE.uuid(),
									label: SE.string('branch'),
								},
							},
						},
					},
				},
			},
		},
	},
};

const pathPurchase = {
	'/other/purchase/value/label': {
		get: {
			tags: ['others'],
			summary: 'Get all purchase',
			description: 'Get all purchase',
			responses: {
				200: {
					description: 'Success',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: SE.uuid(),
									label: SE.string('SP25-0001'),
								},
							},
						},
					},
				},
			},
		},
	},
};

const pathStock = {
	'/other/stock/value/label': {
		get: {
			tags: ['others'],
			summary: 'Get all stock',
			description: 'Get all stock',
			responses: {
				200: {
					description: 'Success',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: SE.uuid(),
									label: SE.string('stock'),
								},
							},
						},
					},
				},
			},
		},
	},
};

// const pathPurchaseEntry = {
// 	'/other/purchase-entry/value/label': {
// 		get: {
// 			tags: ['others'],
// 			summary: 'Get all purchase entry',
// 			description: 'Get all purchase entry',
// 			responses: {
// 				200: {
// 					description: 'Success',
// 					content: {
// 						'application/json': {
// 							schema: {
// 								type: 'object',
// 								properties: {
// 									value: SE.uuid(),
// 									label: SE.string('purchase entry'),
// 								},
// 							},
// 						},
// 					},
// 				},
// 			},
// 		},
// 	},
// };

const pathWarehouse = {
	'/other/warehouse/value/label': {
		get: {
			tags: ['others'],
			summary: 'Get all warehouse',
			description: 'Get all warehouse',
			responses: {
				200: {
					description: 'Success',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: SE.uuid(),
									label: SE.string('warehouse'),
								},
							},
						},
					},
				},
			},
		},
	},
};

const pathRoom = {
	'/other/room/value/label': {
		get: {
			tags: ['others'],
			summary: 'Get all room',
			description: 'Get all room',
			responses: {
				200: {
					description: 'Success',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: SE.uuid(),
									label: SE.string('room'),
								},
							},
						},
					},
				},
			},
		},
	},
};

const pathRack = {
	'/other/rack/value/label': {
		get: {
			tags: ['others'],
			summary: 'Get all rack',
			description: 'Get all rack',
			responses: {
				200: {
					description: 'Success',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: SE.uuid(),
									label: SE.string('rack'),
								},
							},
						},
					},
				},
			},
		},
	},
};

const pathFloor = {
	'/other/floor/value/label': {
		get: {
			tags: ['others'],
			summary: 'Get all floor',
			description: 'Get all floor',
			responses: {
				200: {
					description: 'Success',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: SE.uuid(),
									label: SE.string('floor'),
								},
							},
						},
					},
				},
			},
		},
	},
};

const pathBox = {
	'/other/box/value/label': {
		get: {
			tags: ['others'],
			summary: 'Get all box',
			description: 'Get all box',
			responses: {
				200: {
					description: 'Success',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: SE.uuid(),
									label: SE.string('box'),
								},
							},
						},
					},
				},
			},
		},
	},
};
const pathPurchaseReturn = {
	'/other/purchase-return/value/label': {
		get: {
			tags: ['others'],
			summary: 'Get all purchase return',
			description: 'Get all purchase return',
			responses: {
				200: {
					description: 'Success',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: SE.uuid(),
									label: SE.string('SPR25-0001'),
								},
							},
						},
					},
				},
			},
		},
	},
};

const pathInternalTransfer = {
	'/other/internal-transfer/value/label': {
		get: {
			tags: ['others'],
			summary: 'Get all internal transfer',
			description: 'Get all internal transfer',
			responses: {
				200: {
					description: 'Success',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: SE.uuid(),
									label: SE.string('SIT21 - 0001'),
								},
							},
						},
					},
				},
			},
		},
	},
};

const pathModel = {
	'/other/model/value/label': {
		get: {
			tags: ['others'],
			summary: 'Get all model',
			description: 'Get all model',
			responses: {
				200: {
					description: 'Success',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: SE.uuid(),
									label: SE.string('model'),
								},
							},
						},
					},
				},
			},
		},
	},
};

//* Work others routes *//

const pathProblem = {
	'/other/problem/value/label': {
		get: {
			tags: ['others'],
			summary: 'Get all problem',
			description: 'Get all problem',
			parameters: [
				SE.parameter_query('category', 'category', [
					'employee',
					'customer',
				]),
			],
			responses: {
				200: {
					description: 'Success',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: SE.uuid(),
									label: SE.string('problem'),
								},
							},
						},
					},
				},
			},
		},
	},
};

const pathOrder = {
	'/other/order/value/label': {
		get: {
			tags: ['others'],
			summary: 'Get all order',
			description: 'Get all order',
			responses: {
				200: {
					description: 'Success',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									id: SE.number(),
									value: SE.uuid(),
									label: SE.string('WO25-0001'),
								},
							},
						},
					},
				},
			},
		},
	},
};

const pathDiagnosis = {
	'/other/diagnosis/value/label': {
		get: {
			tags: ['others'],
			summary: 'Get all diagnosis',
			description: 'Get all diagnosis',
			responses: {
				200: {
					description: 'Success',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									id: SE.number(),
									value: SE.uuid(),
									label: SE.string('WD25-0001'),
								},
							},
						},
					},
				},
			},
		},
	},
};

const pathSection = {
	'/other/section/value/label': {
		get: {
			tags: ['others'],
			summary: 'Get all section',
			description: 'Get all section',
			responses: {
				200: {
					description: 'Success',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									id: SE.number(),
									value: SE.uuid(),
									label: SE.string('section'),
								},
							},
						},
					},
				},
			},
		},
	},
};

const pathProcess = {
	'/other/process/value/label': {
		get: {
			tags: ['others'],
			summary: 'Get all process',
			description: 'Get all process',
			responses: {
				200: {
					description: 'Success',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									id: SE.number(),
									value: SE.uuid(),
									label: SE.string('WP25-0001'),
								},
							},
						},
					},
				},
			},
		},
	},
};

export const pathOthers = {
	...pathUser,
	...pathDesignation,
	...pathDepartment,
	...pathGroup,
	...pathCategory,
	...pathBrand,
	...pathSize,
	...pathVendor,
	...pathProduct,
	...pathBranch,
	...pathPurchase,
	...pathStock,
	// ...pathPurchaseEntry,
	...pathWarehouse,
	...pathRoom,
	...pathRack,
	...pathFloor,
	...pathBox,
	...pathPurchaseReturn,
	...pathInternalTransfer,
	...pathModel,
	...pathProblem,
	...pathOrder,
	...pathDiagnosis,
	...pathSection,
	...pathProcess,
};

export const tagOthers = [
	{
		name: 'others',
	},
];
