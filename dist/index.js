"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const setup_1 = __importDefault(require("./src/config/setup"));
const app = express_1.default();
setup_1.default(app);
const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`your server is running on port ${PORT}`));
