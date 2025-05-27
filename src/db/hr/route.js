import { Router } from 'express';
import multer from 'multer';
import { validateUuidParam } from '../../lib/validator.js';
import * as departmentOperations from './query/department.js';
import * as designationOperations from './query/designation.js';
import * as policyAndNoticeOperations from './query/policy_and_notice.js';
import * as userOperations from './query/users.js';
// ! HRM
import * as subDepartmentOperations from './query/sub_department.js';
import * as workplaceOperations from './query/workplace.js';
import * as employmentTypeOperations from './query/employment_type.js';
import * as specialHolidaysOperations from './query/special_holidays.js';
import * as generalHolidayOperations from './query/general_holiday.js';
import * as deviceListOperations from './query/device_list.js';
import * as shiftsOperations from './query/shifts.js';
import * as shiftGroupOperations from './query/shift_group.js';
import * as rosterOperations from './query/roster.js';
import * as leavePolicyOperations from './query/leave_policy.js';
import * as leaveCategoryOperations from './query/leave_category.js';
import * as configurationOperations from './query/configuration.js';
import * as configurationEntryOperations from './query/configuration_entry.js';
import * as employeeOperations from './query/employee.js';
import * as devicePermissionsOperations from './query/device_permissions.js';
import * as punchLogOperations from './query/punch_log.js';
import * as manualEntryOperations from './query/manual_entry.js';
import * as applyLeaveOperations from './query/apply_leave.js';
import * as applyBalanceOperations from './query/apply_balance.js';
import * as salaryOccasionalOperations from './query/salary_occasional.js';
import * as salaryIncrementOperations from './query/salary_increment.js';
import * as salaryEntryOperations from './query/salary_entry.js';

const hrRouter = Router();
const upload = multer();
// user routes

hrRouter.post('/user/login', userOperations.loginUser);
hrRouter.get('/user/can-access/:uuid', userOperations.selectUsersAccessPages);
hrRouter.get('/user', userOperations.selectAll);
hrRouter.get('/user/:uuid', validateUuidParam(), userOperations.select);
hrRouter.post('/user', userOperations.insert);
hrRouter.put('/user/:uuid', userOperations.update);
hrRouter.delete('/user/:uuid', validateUuidParam(), userOperations.remove);
hrRouter.get('/user-common', userOperations.selectCommonUsers);
hrRouter.put('/user/can-access/:uuid', userOperations.changeUserAccess);
hrRouter.put('/user/status/:uuid', userOperations.changeUserStatus);
hrRouter.put('/user/password/:uuid', userOperations.changeUserPassword);
hrRouter.put('/user/rating-price/:uuid', userOperations.updateRatingPrice);

// department routes

hrRouter.get('/department', departmentOperations.selectAll);
hrRouter.get(
	'/department/:uuid',
	validateUuidParam(),
	departmentOperations.select
);
hrRouter.post('/department', departmentOperations.insert);
hrRouter.put('/department/:uuid', departmentOperations.update);
hrRouter.delete(
	'/department/:uuid',
	validateUuidParam(),
	departmentOperations.remove
);

// designation routes

hrRouter.get('/designation', designationOperations.selectAll);
hrRouter.get(
	'/designation/:uuid',
	validateUuidParam(),
	designationOperations.select
);
hrRouter.post('/designation', designationOperations.insert);
hrRouter.put('/designation/:uuid', designationOperations.update);
hrRouter.delete(
	'/designation/:uuid',
	validateUuidParam(),
	designationOperations.remove
);

// privacy_and_policy routes

hrRouter.get('/policy-and-notice', policyAndNoticeOperations.selectAll);
hrRouter.get(
	'/policy-and-notice/:uuid',
	validateUuidParam(),
	policyAndNoticeOperations.select
);
hrRouter.post('/policy-and-notice', policyAndNoticeOperations.insert);
hrRouter.put('/policy-and-notice/:uuid', policyAndNoticeOperations.update);
hrRouter.delete(
	'/policy-and-notice/:uuid',
	validateUuidParam(),
	policyAndNoticeOperations.remove
);
hrRouter.get(
	'/policy-and-notice/policy',
	policyAndNoticeOperations.selectPolicy
);
hrRouter.get(
	'/policy-and-notice/notice',
	policyAndNoticeOperations.selectNotice
);

// ? sub_department routes
hrRouter.get('/sub-department', subDepartmentOperations.selectAll);
hrRouter.get(
	'/sub-department/:uuid',
	validateUuidParam(),
	subDepartmentOperations.select
);
hrRouter.post('/sub-department', subDepartmentOperations.insert);
hrRouter.put('/sub-department/:uuid', subDepartmentOperations.update);
hrRouter.delete(
	'/sub-department/:uuid',
	validateUuidParam(),
	subDepartmentOperations.remove
);

// ? workplace routes
hrRouter.get('/workplace', workplaceOperations.selectAll);
hrRouter.get(
	'/workplace/:uuid',
	validateUuidParam(),
	workplaceOperations.select
);
hrRouter.post('/workplace', workplaceOperations.insert);
hrRouter.put('/workplace/:uuid', workplaceOperations.update);
hrRouter.delete(
	'/workplace/:uuid',
	validateUuidParam(),
	workplaceOperations.remove
);

// ? employment_type routes
hrRouter.get('/employment-type', employmentTypeOperations.selectAll);
hrRouter.get(
	'/employment-type/:uuid',
	validateUuidParam(),
	employmentTypeOperations.select
);
hrRouter.post('/employment-type', employmentTypeOperations.insert);
hrRouter.put('/employment-type/:uuid', employmentTypeOperations.update);
hrRouter.delete(
	'/employment-type/:uuid',
	validateUuidParam(),
	employmentTypeOperations.remove
);

// ? special_holidays routes
hrRouter.get('/special-holidays', specialHolidaysOperations.selectAll);
hrRouter.get(
	'/special-holidays/:uuid',
	validateUuidParam(),
	specialHolidaysOperations.select
);
hrRouter.post('/special-holidays', specialHolidaysOperations.insert);
hrRouter.put('/special-holidays/:uuid', specialHolidaysOperations.update);
hrRouter.delete(
	'/special-holidays/:uuid',
	validateUuidParam(),
	specialHolidaysOperations.remove
);

// ? general_holidays routes
hrRouter.get('/general-holiday', generalHolidayOperations.selectAll);
hrRouter.get(
	'/general-holiday/:uuid',
	validateUuidParam(),
	generalHolidayOperations.select
);
hrRouter.post('/general-holiday', generalHolidayOperations.insert);
hrRouter.put('/general-holiday/:uuid', generalHolidayOperations.update);
hrRouter.delete(
	'/general-holiday/:uuid',
	validateUuidParam(),
	generalHolidayOperations.remove
);

// ? device_list routes
hrRouter.get('/device-list', deviceListOperations.selectAll);
hrRouter.get(
	'/device-list/:uuid',
	validateUuidParam(),
	deviceListOperations.select
);
hrRouter.post('/device-list', deviceListOperations.insert);
hrRouter.put('/device-list/:uuid', deviceListOperations.update);
hrRouter.delete(
	'/device-list/:uuid',
	validateUuidParam(),
	deviceListOperations.remove
);

// ? shift routes
hrRouter.get('/shifts', shiftsOperations.selectAll);
hrRouter.get('/shifts/:uuid', validateUuidParam(), shiftsOperations.select);
hrRouter.post('/shifts', shiftsOperations.insert);
hrRouter.put('/shifts/:uuid', shiftsOperations.update);
hrRouter.delete('/shifts/:uuid', validateUuidParam(), shiftsOperations.remove);

// ? shift_group routes
hrRouter.get('/shift-group', shiftGroupOperations.selectAll);
hrRouter.get(
	'/shift-group/:uuid',
	validateUuidParam(),
	shiftGroupOperations.select
);
hrRouter.post('/shift-group', shiftGroupOperations.insert);
hrRouter.put('/shift-group/:uuid', shiftGroupOperations.update);
hrRouter.delete(
	'/shift-group/:uuid',
	validateUuidParam(),
	shiftGroupOperations.remove
);

// ? roster routes
hrRouter.get('/roster', rosterOperations.selectAll);
hrRouter.get('/roster/:uuid', validateUuidParam(), rosterOperations.select);
hrRouter.post('/roster', rosterOperations.insert);
hrRouter.put('/roster/:uuid', rosterOperations.update);
hrRouter.delete('/roster/:uuid', validateUuidParam(), rosterOperations.remove);

// ? leave_policy routes
hrRouter.get('/leave-policy', leavePolicyOperations.selectAll);
hrRouter.get(
	'/leave-policy/:uuid',
	validateUuidParam(),
	leavePolicyOperations.select
);
hrRouter.post('/leave-policy', leavePolicyOperations.insert);
hrRouter.put('/leave-policy/:uuid', leavePolicyOperations.update);
hrRouter.delete(
	'/leave-policy/:uuid',
	validateUuidParam(),
	leavePolicyOperations.remove
);

// ? leave_category routes
hrRouter.get('/leave-category', leaveCategoryOperations.selectAll);
hrRouter.get(
	'/leave-category/:uuid',
	validateUuidParam(),
	leaveCategoryOperations.select
);
hrRouter.post('/leave-category', leaveCategoryOperations.insert);
hrRouter.put('/leave-category/:uuid', leaveCategoryOperations.update);
hrRouter.delete(
	'/leave-category/:uuid',
	validateUuidParam(),
	leaveCategoryOperations.remove
);

// ? configuration routes
hrRouter.get('/configuration', configurationOperations.selectAll);
hrRouter.get(
	'/configuration/:uuid',
	validateUuidParam(),
	configurationOperations.select
);
hrRouter.post('/configuration', configurationOperations.insert);
hrRouter.put('/configuration/:uuid', configurationOperations.update);
hrRouter.delete(
	'/configuration/:uuid',
	validateUuidParam(),
	configurationOperations.remove
);

hrRouter.get(
	'/configuration-entry-details/by/:configuration_uuid',
	configurationOperations.configurationEntryDetailsByConfiguration
);

// ? configuration_entry routes
hrRouter.get('/configuration-entry', configurationEntryOperations.selectAll);
hrRouter.get(
	'/configuration-entry/:uuid',
	validateUuidParam(),
	configurationEntryOperations.select
);
hrRouter.post('/configuration-entry', configurationEntryOperations.insert);
hrRouter.put('/configuration-entry/:uuid', configurationEntryOperations.update);
hrRouter.delete(
	'/configuration-entry/:uuid',
	validateUuidParam(),
	configurationEntryOperations.remove
);
hrRouter.get(
	'/configuration-entry/by/:configuration_uuid',
	configurationEntryOperations.configurationEntryByConfiguration
);

// ? employee routes
hrRouter.get('/employee', employeeOperations.selectAll);
hrRouter.get('/employee/:uuid', validateUuidParam(), employeeOperations.select);
hrRouter.post('/employee', employeeOperations.insert);
hrRouter.put('/employee/:uuid', employeeOperations.update);
hrRouter.delete(
	'/employee/:uuid',
	validateUuidParam(),
	employeeOperations.remove
);
hrRouter.get(
	'/manual-entry-details/by/:employee_uuid',
	employeeOperations.manualEntryDetailsByEmployee
);
hrRouter.get(
	'/employee-leave-information-details/by/:employee_uuid',
	employeeOperations.employeeLeaveInformationDetails
);
// hrRouter.get('/employee-login', employeeOperations.loginUser);

// ? device_permissions routes
hrRouter.get('/device-permission', devicePermissionsOperations.selectAll);
hrRouter.get(
	'/device-permission/:uuid',
	validateUuidParam(),
	devicePermissionsOperations.select
);
hrRouter.post('/device-permission', devicePermissionsOperations.insert);
hrRouter.put('/device-permission/:uuid', devicePermissionsOperations.update);
hrRouter.delete(
	'/device-permission/:uuid',
	validateUuidParam(),
	devicePermissionsOperations.remove
);
hrRouter.get(
	'/device-permission-for-employee/by/:device_list_uuid',
	devicePermissionsOperations.selectNotAssignedEmployeeForPermissionByDeviceListUuid
);

// ? punch_log routes
hrRouter.get('/punch-log', punchLogOperations.selectAll);
hrRouter.get(
	'/punch-log/:uuid',
	validateUuidParam(),
	punchLogOperations.select
);
hrRouter.post('/punch-log', punchLogOperations.insert);
hrRouter.put('/punch-log/:uuid', punchLogOperations.update);
hrRouter.delete(
	'/punch-log/:uuid',
	validateUuidParam(),
	punchLogOperations.remove
);

// ? manual_entry routes
hrRouter.get('/manual-entry', manualEntryOperations.selectAll);
hrRouter.get(
	'/manual-entry/:uuid',
	validateUuidParam(),
	manualEntryOperations.select
);
hrRouter.post('/manual-entry', manualEntryOperations.insert);
hrRouter.put('/manual-entry/:uuid', manualEntryOperations.update);
hrRouter.delete(
	'/manual-entry/:uuid',
	validateUuidParam(),
	manualEntryOperations.remove
);
hrRouter.get(
	'/manual-entry/by/:employee_uuid',
	manualEntryOperations.manualEntryByEmployee
);
hrRouter.get(
	'/v2/manual-entry/by/pagination',
	manualEntryOperations.selectAllManualEntryWithPaginationFieldVisit
);

// ? apply_leave routes
hrRouter.get('/apply-leave', applyLeaveOperations.selectAll);
hrRouter.get(
	'/apply-leave/:uuid',
	validateUuidParam(),
	applyLeaveOperations.select
);
hrRouter.post(
	'/apply-leave',
	upload.single('file'),
	applyLeaveOperations.insert
);
hrRouter.put(
	'/apply-leave/:uuid',
	upload.single('file'),
	applyLeaveOperations.update
);
hrRouter.delete(
	'/apply-leave/:uuid',
	validateUuidParam(),
	applyLeaveOperations.remove
);

hrRouter.get(
	'/v2/apply-leave/by/pagination',
	applyLeaveOperations.selectAllApplyLeaveWithPagination
);

// ? apply_balance routes
hrRouter.get('/apply-balance', applyBalanceOperations.selectAll);
hrRouter.get(
	'/apply-balance/:uuid',
	validateUuidParam(),
	applyBalanceOperations.select
);
hrRouter.post('/apply-balance', applyBalanceOperations.insert);
hrRouter.put('/apply-balance/:uuid', applyBalanceOperations.update);
hrRouter.delete(
	'/apply-balance/:uuid',
	validateUuidParam(),
	applyBalanceOperations.remove
);

// ? apply_balance routes
hrRouter.get('/apply-balance', applyBalanceOperations.selectAll);
hrRouter.get(
	'/apply-balance/:uuid',
	validateUuidParam(),
	applyBalanceOperations.select
);
hrRouter.post('/apply-balance', applyBalanceOperations.insert);
hrRouter.put('/apply-balance/:uuid', applyBalanceOperations.update);
hrRouter.delete(
	'/apply-balance/:uuid',
	validateUuidParam(),
	applyBalanceOperations.remove
);

// ? salary_occasional routes
hrRouter.get('/salary-occasional', salaryOccasionalOperations.selectAll);
hrRouter.get(
	'/salary-occasional/:uuid',
	validateUuidParam(),
	salaryOccasionalOperations.select
);
hrRouter.post('/salary-occasional', salaryOccasionalOperations.insert);
hrRouter.put('/salary-occasional/:uuid', salaryOccasionalOperations.update);
hrRouter.delete(
	'/salary-occasional/:uuid',
	validateUuidParam(),
	salaryOccasionalOperations.remove
);

// ? salary_increment routes
hrRouter.get('/salary-increment', salaryIncrementOperations.selectAll);
hrRouter.get(
	'/salary-increment/:uuid',
	validateUuidParam(),
	salaryIncrementOperations.select
);
hrRouter.post('/salary-increment', salaryIncrementOperations.insert);
hrRouter.put('/salary-increment/:uuid', salaryIncrementOperations.update);
hrRouter.delete(
	'/salary-increment/:uuid',
	validateUuidParam(),
	salaryIncrementOperations.remove
);

// ? salary_entry routes
hrRouter.get('/salary-entry', salaryEntryOperations.selectAll);
hrRouter.get(
	'/salary-entry/:uuid',
	validateUuidParam(),
	salaryEntryOperations.select
);
hrRouter.post('/salary-entry', salaryEntryOperations.insert);
hrRouter.put('/salary-entry/:uuid', salaryEntryOperations.update);
hrRouter.delete(
	'/salary-entry/:uuid',
	validateUuidParam(),
	salaryEntryOperations.remove
);

export { hrRouter };
