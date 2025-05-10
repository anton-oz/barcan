import sequelize from "../connection";
import { Task } from "../models";

const sampleTasks = [
  {
    title: "Feat",
    content: "get sql db working",
    status: "Todo",
  },
  {
    title: "feat",
    content: "add a remote db",
    status: "Todo",
  },
  {
    title: "something else",
    content: "wooo woo wo",
    status: "Todo",
  },
];

const seedDB = async () => {
  await sequelize.sync({ force: true });

  const tasks = await Task.bulkCreate(sampleTasks);
  if (!tasks) {
    console.error("tasks does not exist");
    process.exit(1);
  }

  process.exit(0);
};

seedDB();
