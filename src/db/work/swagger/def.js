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
//* Marge all
export const defWork = {
	problem: defProblem,
};

//* Tag
export const tagWork = [
	{
		name: 'work.problem',
		description: 'Work Problem',
	},
];
