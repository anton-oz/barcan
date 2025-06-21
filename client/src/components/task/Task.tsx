import { useState, useEffect, useRef } from "react";
import { DraggableProvided, DraggableStateSnapshot } from "@hello-pangea/dnd";
import { X } from "lucide-react";
import { useTaskContext } from "@/context/TaskContext";
import { Task as TaskType } from "@/context/TaskContext/types";
import "./Task.css";
import { handlePost } from "@/lib";
import { UPDATE_TASK, UPDATE_TASKS } from "@/context/TaskContext/actions";

interface Props {
  task: TaskType;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}

export default function Task({ task, provided, snapshot }: Props) {
  const { state, dispatch } = useTaskContext();
  const { tasks } = state;

  const { id, title, content } = task;

  const [taskTitle, setTaskTitle] = useState(title);
  const [taskContent, setTaskContent] = useState(content);
  // TODO: change to em
  const [taskContentHeight, setTaskContentHeight] = useState(0);
  const [isFocusable, setIsFocusable] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { target } = event;
    const name = target.name;
    const value = target.value;
    switch (name) {
      case "title":
        // TODO:
        // add visual indicator to page when too long, like a red border

        if (value.length === 27) {
          target.style.outline = "2.5px solid var(--red)";
          target.style.borderRadius = "var(--border-radius)";
          target.style.borderColor = "transparent";
          return;
        }
        target.style.outline = "";
        target.style.borderRadius = "";
        target.style.border = "";
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
    if (!deleteBtn.parentElement?.parentElement)
      throw new Error("deleteBtn.parentElement.parentElement is null");
    let task = deleteBtn.parentElement.parentElement;
    // HACK: this is to ensre that the li element is selected, because the li
    // is the el with the id attached to it
    if (task.nodeName === "DIV") {
      if (task.parentElement === null)
        throw new Error("task parent el is null");
      task = task.parentElement;
    }
    const taskId = +task.id;

    dispatch({ type: "DELETE_TASK", payload: { id: taskId, tasks } });

    handleDeleteReq(taskId);
  };

  const handleUpdateOnBlur = () => {
    if (taskTitle === task.title && taskContent === task.content) return;
    handlePost({ ...task, title: taskTitle, content: taskContent });
    dispatch({
      type: UPDATE_TASK,
      payload: {
        id,
        tasks,
        update: { title: taskTitle, content: taskContent },
      },
    });
  };

  const contentRef = useRef<HTMLTextAreaElement>(null);

  const autoResizeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskContentHeight(e.target.scrollHeight);
    e.target.style.height = taskContentHeight + "px";
  };

  // on component rerender, recaculate height to fit content
  useEffect(() => {
    const contentEl = contentRef.current;
    if (!contentEl) throw new Error("content ref is not defined");
    setTaskContentHeight(contentEl.scrollHeight);
  }, []);

  const titleRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (document.activeElement instanceof HTMLElement)
      document.activeElement?.parentElement?.focus();

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
        background: isFocusable ? "var(--surface-1)" : "",
        ...provided.draggableProps.style,
      }}
      tabIndex={0}
      className="task"
    >
      <div style={{ position: "relative", width: "100%" }}>
        <X className="deleteBtn" onClick={handleDelete} />
      </div>
      <textarea
        ref={titleRef}
        onFocus={(e) => {
          const title = e.target;
          title.selectionStart = title.value.length;
        }}
        onBlur={handleUpdateOnBlur}
        spellCheck={false}
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
        style={{ height: taskContentHeight }}
        ref={contentRef}
        onFocus={function (e) {
          const title = e.target;
          title.selectionStart = title.value.length;
        }}
        onBlur={handleUpdateOnBlur}
        spellCheck={false}
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
