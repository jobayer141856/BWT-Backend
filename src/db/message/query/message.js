import { desc, eq, sql, inArray } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';
import { decimalToNumber } from '../../variables.js';
import { createApi } from '../../../util/api.js';

const API_KEY = 'C200904766408776f237f6.10487402';
const API_URL = 'https://msg.elitbuzz-bd.com/smsapi';
const SENDER_ID = 'BWT TV SVC.';

export async function sendMessage(req, res, next) {
	try {
		if (!(await validateRequest(req, next))) return;

		const {
			contacts, // Corrected from 'numbers'
			message,
			senderId = SENDER_ID, // Use default SENDER_ID if not provided
			label = 'transactional',
			type = 'text',
			scheduleDateTime = '',
		} = req.body;

		// console.log('contacts', contacts);
		// console.log('message', message);
		// console.log('senderId', senderId);
		// console.log('label', label);
		// console.log('type', type);
		// console.log('scheduleDateTime', scheduleDateTime);
		// console.log('API_KEY', API_KEY);
		// console.log('API_URL', API_URL);
		// console.log('req.body', req.body);

		// Validate required fields
		if (!contacts || !message) {
			return res.status(400).json({
				error: 'Missing required fields: contacts or message',
			});
		}

		// Construct the POST request payload
		const payload = {
			api_key: API_KEY,
			senderid: senderId,
			type: type,
			msg: message,
			contacts: contacts,
			label: label,
		};

		// console.log('payload', payload);

		// // Add scheduledDateTime if provided
		if (scheduleDateTime) {
			payload.scheduledDateTime = scheduleDateTime;
		}

		// // Make the API request
		const response = await fetch(API_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		});

		const result = await response.json();
		// Log the raw result
		console.log('Elitbuzz API Response:', result);

		// Handle API response
		if (response.ok) {
			return res.status(200).json({ success: true, data: result });
		} else {
			return res.status(400).json({ success: false, error: result });
		}
	} catch (error) {
		console.error('Error sending SMS:', error);
		next(error); // Pass the error to the error handler middleware
	}
}
