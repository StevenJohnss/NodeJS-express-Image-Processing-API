"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
app.get('/', (req, res) => {
    res.send('Welcome to my first project');
});
app.use('/api', express_1.default.json(), index_1.default);
// App port listener.
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
exports.default = app;
