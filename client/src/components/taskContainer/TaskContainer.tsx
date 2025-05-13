import { Plus } from "lucide-react";
import Task from "../task/Task";
import "./TaskContainer.css";
import { useTaskContext } from "../../context/TaskContext";
import { Task as TaskData } from "../../context/TaskContext";

import { Draggable, Droppable } from "@hello-pangea/dnd";

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

  const addTask = async () => {
    const newTask = {
      id: tasks.length + 1,
      title: "",
      content: "",
      status: "Todo",
    };
    dispatch({ type: "ADD_TASK", payload: { tasks: [...tasks, newTask] } });
  };

  const handleKeyDown = (e: React.KeyboardEvent<SVGElement>) => {
    const key = e.code;
    if (key === "Enter" || key === "Space") {
      addTask();
    }
  };

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
      <article>
        <Droppable droppableId={heading}>
          {(provided) => (
            <ul
              {...provided.droppableProps}
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
                  {(provided) => <Task task={task} provided={provided} />}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </article>
    </section>
  );
}
