import express, { Request, Response } from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import sequelize from "./db/connection";
import routes from "./routes";

configDotenv();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.send("barcan");
});

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(port, () =>
    console.log(`server listening @ http://localhost:${port}`),
  );
});
