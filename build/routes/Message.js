"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Message_1 = __importDefault(require("../controllers/Message"));
const ValidateSchema_1 = require("../middleware/ValidateSchema");
const router = express_1.default.Router();
router.post('/create', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.message.create), Message_1.default.createMessage);
router.get('/get/:messageId', Message_1.default.readMessage);
router.get('/get/', Message_1.default.readAll);
router.patch('/update/:messageId', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.message.update), Message_1.default.updateMessage);
router.delete('/delete/:messageId', Message_1.default.deleteMessage);
module.exports = router;
