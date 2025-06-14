import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Plus } from "lucide-react";
import Task from "@/components/task/Task";
import { useTaskContext } from "@/context/TaskContext";
import { Task as TaskData } from "@/context/TaskContext/types";
import "./TaskContainer.css";
import { useEffect } from "react";

interface TaskContainerProps {
  heading: "Todo" | "In Progress" | "Done";
  filteredTasks: TaskData[];
}

/**
 * TODO:
 * add custom scrollbar component for scrollable content
 */

export default function TaskContainer({
  heading,
  filteredTasks,
}: TaskContainerProps) {
  const { state, dispatch } = useTaskContext();
  const { tasks } = state;

  const addTaskToDb = async (task: TaskData) => {
    const url = "http://localhost:3000/api/tasks";
    const options: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    };
    try {
      const res = await fetch(url, options);
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  const addTask = async () => {
    const newTask = {
      id: tasks.length + 1,
      title: "",
      content: "",
      status: "Todo",
    };
    await addTaskToDb(newTask);
    dispatch({ type: "ADD_TASK", payload: { tasks: [newTask, ...tasks] } });
  };

  const handleKeyDown = (e: React.KeyboardEvent<SVGElement>) => {
    const key = e.code;
    if (key === "Enter" || key === "Space") {
      addTask();
    }
  };

  useEffect(() => {
    console.log(`filteredTasks for ${heading} `, filteredTasks);
  }, [filteredTasks]);

  return (
    <section>
      <header>
        <h2>{heading}</h2>
        {heading === "Todo" ? (
          // TODO:
          // - set this to its own component
          // - have this button toggle focus on newly created task
          <Plus
            id="todoButton"
            role="button"
            aria-label="Add Task"
            tabIndex={0}
            size={30}
            onClick={addTask}
            onKeyDown={handleKeyDown}
          />
        ) : null}
      </header>
      <Droppable droppableId={heading}>
        {(provided, snapshot) => (
          <ul
            {...provided.droppableProps}
            style={{
              background: snapshot.isDraggingOver ? "var(--surface-1)" : "",
            }}
            ref={provided.innerRef}
            id={heading}
          >
            {/*
                TODO:
                create logic to handle sorting, and make new tasks appear at top of
                todo list
              */}
            {[...filteredTasks].map((task, i) => (
              <Draggable
                key={task.id}
                draggableId={`task-${task.id}`}
                index={i}
              >
                {(provided, snapshot) => (
                  <Task task={task} provided={provided} snapshot={snapshot} />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </section>
  );
}
