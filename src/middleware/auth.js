import { compare, genSalt, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PRIVATE_KEY, SALT } from '../lib/secret.js';

const { sign, verify } = jwt;

export const HashPass = async (password) => {
	const salt = await genSalt(Number(SALT));
	const hashPassword = await hash(password.toString(), parseInt(salt));
	return hashPassword;
};

export const ComparePass = async (password, hashPassword) => {
	return await compare(password, hashPassword);
};

export const CreateToken = (user, time = '24h') => {
	const { uuid, name, email, department } = user;
	const payload = {
		uuid,
		name,
		email,
		department,
	};

	const token = sign(payload, PRIVATE_KEY, { expiresIn: time });

	if (!token)
		return {
			success: false,
			error: 'Error Signing Token',
			raw: err,
		};

	user.token = token;
	return {
		success: true,
		token: token,
	};
};

const publicUrls = [
	{ url: '/hr/user/login', method: 'POST' },
	{ url: '/public', method: 'GET' },
	{ url: '/other/model/value/label', method: 'GET' },
	{ url: '/other/brand/value/label', method: 'GET' },
	{ url: '/work/info', method: 'POST' },
];

export const VerifyToken = (req, res, next) => {
	const { authorization } = req?.headers;

	const { originalUrl, method, query } = req; // Add query destructuring

	// Dynamic public route check for /work endpoints
	const isWorkPublic =
		originalUrl.startsWith('/work') && query.public === 'true';

	if (
		isWorkPublic || // Check this first
		publicUrls.some(
			(route) =>
				originalUrl.startsWith(route.url) && route.method === method
		) ||
		originalUrl.startsWith('/api-docs')
	) {
		return next();
	}

	if (typeof authorization === 'undefined') {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	const token = authorization?.split(' ')[1];
	verify(token, PRIVATE_KEY, (err, user) => {
		if (err) {
			return res.status(403).json({ error: 'Forbidden' });
		}

		req.user = user;

		next();
	});
};
