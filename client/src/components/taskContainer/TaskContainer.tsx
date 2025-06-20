import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Plus } from "lucide-react";
import Task from "@/components/task/Task";
import { useTaskContext } from "@/context/TaskContext";
import { Task as TaskData } from "@/context/TaskContext/types";
import "./TaskContainer.css";
import { UPDATE_TASKS } from "@/context/TaskContext/actions";
import { handlePut } from "@/lib";

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
    let nextId: number;
    if (tasks.length === 0) {
      nextId = 1;
    } else {
      nextId = tasks.sort((a, b) => a.id - b.id)[tasks.length - 1].id + 1;
    }

    const newTask = {
      id: nextId,
      title: "",
      content: "",
      status: "Todo",
      order: 0,
    };
    const todoTasks = tasks.filter((task) => task.status === "Todo");
    const otherTasks = tasks.filter((task) => task.status !== "Todo");
    todoTasks.unshift(newTask);
    const updated = todoTasks.map((task) => ({
      ...task,
      order: task.order + 1,
    }));
    otherTasks.push(...updated);

    dispatch({ type: UPDATE_TASKS, payload: { tasks: otherTasks } });
    handlePut(otherTasks);
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
