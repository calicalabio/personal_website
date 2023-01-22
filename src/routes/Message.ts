import express from 'express'
import controller from '../controllers/Message';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.message.create), controller.createMessage);
router.get('/get/:messageId', controller.readMessage);
router.get('/get/', controller.readAll);
router.patch('/update/:messageId', ValidateSchema(Schemas.message.update), controller.updateMessage);
router.delete('/delete/:messageId', controller.deleteMessage);

export = router;