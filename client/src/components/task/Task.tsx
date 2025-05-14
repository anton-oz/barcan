import { useState, useEffect, useRef } from "react";
import { DraggableProvided, DraggableStateSnapshot } from "@hello-pangea/dnd";
import { X } from "lucide-react";
import { useTaskContext } from "../../context/TaskContext";
import { Task as TaskProps } from "../../context/TaskContext/types";
import "./Task.css";

interface Props {
  task: TaskProps;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}

export default function Task({ task, provided, snapshot }: Props) {
  const { state, dispatch } = useTaskContext();
  const { tasks } = state;

  const { id, title, content, status } = task;

  const [taskTitle, setTaskTitle] = useState(title);
  const [taskContent, setTaskContent] = useState(content);
  const [isFocusable, setIsFocusable] = useState(false);

  useEffect(() => {
    if (document.activeElement instanceof HTMLElement)
      document.activeElement.blur();
  }, [isFocusable]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { target } = event;
    const name = target.name;
    const value = target.value;
    switch (name) {
      case "title":
        // TODO:
        // add visual indicator to page when too long, like a red border
        if (value.length === 48) {
          console.error("too long");
          return;
        }
        setTaskTitle(value);
        break;
      case "content":
        setTaskContent(value);
        break;
      default:
        console.error("Error: Could not update task change event");
        return;
    }
  };

  const handleDeleteReq = async (id: number) => {
    const options: RequestInit = {
      method: "DELETE",
    };
    if (id === 0) {
      dispatch({ type: "SET_ERROR", payload: { error: true } });
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${id}`, options);
      if (!res.ok) {
        throw new Error("bad delete request");
      }
      dispatch({ type: "SET_ERROR", payload: { error: false } });
    } catch (error) {
      console.error("could not delete: ", error);
      dispatch({ type: "SET_ERROR", payload: { error: true } });
    }
  };

  const handleDelete = (e: React.MouseEvent<SVGElement>) => {
    const deleteBtn = e.target as HTMLElement;
    if (!deleteBtn.parentElement?.parentElement) throw new Error("im batman");
    const task = deleteBtn.parentElement.parentElement;
    const taskId = +task.id;

    dispatch({ type: "DELETE_TASK", payload: { id: taskId, tasks } });

    handleDeleteReq(taskId);
  };

  const autoResizeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = Math.min(e.target.scrollHeight, 130) + "px";
  };

  const titleRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    if (title) {
      if (isFocusable) {
        title.focus();
        // start inserting at end of title
        title.selectionStart = title.value.length;
        return;
      }
      title.blur();
    }
  }, [isFocusable]);

  return (
    <li
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      id={id.toString()}
      onKeyDown={(e) => {
        const editShortcut = e.ctrlKey && e.key === "E";
        if (editShortcut) {
          setIsFocusable(!isFocusable);
        }
      }}
      style={{
        outline: snapshot.isDragging ? "solid var(--subtext-1)" : "",
        ...provided.draggableProps.style,
      }}
      tabIndex={0}
      data-status={status}
      // draggable
      className="task"
    >
      <div style={{ position: "relative", height: "0", width: "100%" }}>
        <X
          className="deleteBtn"
          onClick={handleDelete}
          data-parent={id.toString()}
        />
      </div>
      <textarea
        ref={titleRef}
        // onFocus={() => setIsFocusable(true)}
        tabIndex={isFocusable ? 0 : -1}
        className="title"
        role="task title"
        name="title"
        placeholder="Title"
        value={taskTitle}
        onChange={handleChange}
        rows={1}
      />
      <textarea
        // onFocus={() => setIsFocusable(true)}
        tabIndex={isFocusable ? 0 : -1}
        className="content"
        role="task content"
        name="content"
        placeholder="Content"
        value={taskContent}
        onChange={handleChange}
        onInput={autoResizeContent}
      />
    </li>
  );
}
