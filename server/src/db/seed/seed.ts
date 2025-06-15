import sequelize from "../connection";
import { Task } from "../models";

const sampleTasks = [
  {
    title: "Task 1",
    content: "Complete project documentation.",
    status: "Todo",
    order: 0,
  },
  {
    title: "Task 2",
    content: "Prepare for the annual conference.",
    status: "Todo",
    order: 1,
  },
  {
    title: "Task 3",
    content: "Update website security protocols.",
    status: "Todo",
    order: 2,
  },
  {
    title: "Task 4",
    content: "Schedule meeting with key stakeholders.",
    status: "Todo",
    order: 3,
  },
  {
    title: "Task 5",
    content: "Implement new feature in app.",
    status: "Todo",
    order: 4,
  },
  {
    title: "Task 6",
    content: "Review and approve vendor invoices.",
    status: "Todo",
    order: 5,
  },
  {
    title: "Task 7",
    content: "Fix bugs in backend code.",
    status: "Todo",
    order: 6,
  },
  {
    title: "Task 8",
    content: "Train team on new software tool.",
    status: "In Progress",
    order: 0,
  },
  {
    title: "Task 9",
    content: "Organize product launch event.",
    status: "In Progress",
    order: 1,
  },
  {
    title: "Task 10",
    content: "Create marketing materials for upcoming campaign.",
    status: "In Progress",
    order: 2,
  },
  {
    title: "Task 11",
    content: "Analyze market trends for future direction.",
    status: "In Progress",
    order: 3,
  },
  {
    title: "Task 12",
    content: "Secure additional funding from investors.",
    status: "In Progress",
    order: 4,
  },
  {
    title: "Task 13",
    content: "Launch social media advertising campaigns.",
    status: "In Progress",
    order: 5,
  },
  {
    title: "Task 14",
    content: "Introduce company-wide training program.",
    status: "Done",
    order: 0,
  },
  {
    title: "Task 15",
    content: "Develop prototype for new product line.",
    status: "Done",
    order: 1,
  },
  {
    title: "Task 16",
    content: "Leverage customer feedback for improvement.",
    status: "Done",
    order: 2,
  },
  {
    title: "Task 17",
    content: "Conduct employee satisfaction survey.",
    status: "Done",
    order: 3,
  },
  {
    title: "Task 18",
    content: "Refactor legacy codebase for efficiency.",
    status: "Done",
    order: 4,
  },
  {
    title: "Task 19",
    content: "Optimize web application performance.",
    status: "Done",
    order: 5,
  },
  {
    title: "Task 20",
    content: "Collaborate with international partners on overseas projects.",
    status: "Done",
    order: 6,
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
