"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logging {
}
exports.default = Logging;
Logging.info = (args) => console.log('\x1b[36m%s\x1b[0m', `${new Date().toLocaleString()} [INFO]`, typeof args === 'string' ? args : args);
Logging.warn = (args) => console.log('\x1b[33m%s\x1b[0m', `${new Date().toLocaleString()} [INFO]`, typeof args === 'string' ? args : args);
Logging.error = (args) => console.log('\x1b[31m', `${new Date().toLocaleString()} [INFO]`, typeof args === 'string' ? args : args);
