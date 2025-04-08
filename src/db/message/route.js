import { Router } from 'express';
import { validateUuidParam } from '../../lib/validator.js';

import * as messageOperations from './query/message.js';

const messageRouter = Router();

//* message routes *//
messageRouter.post('/send', messageOperations.sendMessage);

export { messageRouter };
