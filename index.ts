import express from "express";
import setup from "./src/config/setup";

const app = express();

setup(app);

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`your server is running on port ${PORT}`));
