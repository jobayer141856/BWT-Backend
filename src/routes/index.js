import express from 'express';
import { hrRouter } from '../db/hr/route.js';
import { storeRouter } from '../db/store/route.js';
import { otherRouter } from '../db/others/route.js';
import { workRouter } from '../db/work/route.js';
import { deliveryRouter } from '../db/delivery/route.js';
import { publicRouter } from '../db/public/route.js';
import { messageRouter } from '../db/message/route.js';

const route = express.Router();

// All the routes are defined here

// use the /hr route and /delivery route as reference, change the routes accordingly, also in query folder, then test with postman

// TODO: Add your routes here
// FIXME: Add your routes here
// NOTE: Add your routes here
// INFO: Add your routes here
// WARNING: Add your routes here
// REVIEW: Add your routes here

//* hr routes
route.use('/hr', hrRouter);

//* store routes
route.use('/store', storeRouter);

//* others routes
route.use('/other', otherRouter);

//* work routes
route.use('/work', workRouter);

//* delivery routes
route.use('/delivery', deliveryRouter);

//* public routes
route.use('/public', publicRouter);

//* message routes
route.use('/message', messageRouter);

export default route;
