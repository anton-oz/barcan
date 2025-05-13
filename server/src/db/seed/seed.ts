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

const otherSample = [
  {
    title: "Task 1",
    content: "Complete project documentation.",
    status: "Todo",
  },
  {
    title: "Task 2",
    content: "Prepare for the annual conference.",
    status: "Todo",
  },
  {
    title: "Task 3",
    content: "Update website security protocols.",
    status: "Todo",
  },
  {
    title: "Task 4",
    content: "Schedule meeting with key stakeholders.",
    status: "Todo",
  },
  { title: "Task 5", content: "Implement new feature in app.", status: "Todo" },
  {
    title: "Task 6",
    content: "Review and approve vendor invoices.",
    status: "Todo",
  },
  { title: "Task 7", content: "Fix bugs in backend code.", status: "Todo" },
  {
    title: "Task 8",
    content: "Train team on new software tool.",
    status: "Todo",
  },
  {
    title: "Task 9",
    content: "Organize product launch event.",
    status: "Todo",
  },
  {
    title: "Task 10",
    content: "Create marketing materials for upcoming campaign.",
    status: "Todo",
  },
  {
    title: "Task 11",
    content: "Analyze market trends for future direction.",
    status: "Todo",
  },
  {
    title: "Task 12",
    content: "Secure additional funding from investors.",
    status: "Todo",
  },
  {
    title: "Task 13",
    content: "Launch social media advertising campaigns.",
    status: "Todo",
  },
  {
    title: "Task 14",
    content: "Introduce company-wide training program.",
    status: "Todo",
  },
  {
    title: "Task 15",
    content: "Develop prototype for new product line.",
    status: "Todo",
  },
  {
    title: "Task 16",
    content: "Leverage customer feedback for improvement.",
    status: "Todo",
  },
  {
    title: "Task 17",
    content: "Conduct employee satisfaction survey.",
    status: "Todo",
  },
  {
    title: "Task 18",
    content: "Refactor legacy codebase for efficiency.",
    status: "Todo",
  },
  {
    title: "Task 19",
    content: "Optimize web application performance.",
    status: "Todo",
  },
  {
    title: "Task 20",
    content: "Collaborate with international partners on overseas projects.",
    status: "Todo",
  },
];
const seedDB = async () => {
  await sequelize.sync({ force: true });

  const tasks = await Task.bulkCreate(otherSample);
  if (!tasks) {
    console.error("tasks does not exist");
    process.exit(1);
  }

  process.exit(0);
};

seedDB();
