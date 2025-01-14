import SE, { SED } from '../../../util/swagger_example.js';

import { Router } from 'express';

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

// const pathPurchase = {
// 	'/other/purchase/value/label': {
// 		get: {
// 			tags: ['others'],
// 			summary: 'Get all purchase',
// 			description: 'Get all purchase',
// 			responses: {
// 				200: {
// 					description: 'Success',
// 					content: {
// 						'application/json': {
// 							schema: {
// 								type: 'object',
// 								properties: {
// 									value: SE.uuid(),
// 									label: SE.string('purchase'),
// 								},
// 							},
// 						},
// 					},
// 				},
// 			},
// 		},
// 	},
// };

// const pathStock = {
// 	'/other/stock/value/label': {
// 		get: {
// 			tags: ['others'],
// 			summary: 'Get all stock',
// 			description: 'Get all stock',
// 			responses: {
// 				200: {
// 					description: 'Success',
// 					content: {
// 						'application/json': {
// 							schema: {
// 								type: 'object',
// 								properties: {
// 									value: SE.uuid(),
// 									label: SE.string('stock'),
// 								},
// 							},
// 						},
// 					},
// 				},
// 			},
// 		},
// 	},
// };

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

export const pathOthers = {
	...pathDesignation,
	...pathDepartment,
	...pathGroup,
	...pathCategory,
	...pathBrand,
	...pathSize,
	...pathVendor,
	...pathProduct,
	...pathBranch,
	...pathWarehouse,
	...pathRoom,
	...pathRack,
	...pathFloor,
	...pathBox,
};

export const tagOthers = [
	{
		name: 'others',
	},
];
