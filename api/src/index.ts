import { createApp } from "./app";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3001;

const app = createApp();

app.listen(PORT, () => {
  console.log(`🚀 Migo API running on port ${PORT}`);
});