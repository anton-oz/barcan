import { useState, useEffect, useRef } from "react";
import { Task as TaskProps } from "../../context/TaskContext";
import "./Task.css";

export default function Task({ id, title, content, status }: TaskProps) {
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskContent, setTaskContent] = useState(content);
  const [isFocusable, setIsFocusable] = useState(false);

  const dragEventListeners = () => {
    const taskEl = document.getElementById(id.toString());
    if (!taskEl) {
      throw new Error("Error: task element is undefined in Task component");
    }

    const handleDragStart = (e: DragEvent) => {
      // NOTE: disabled to keep default image dragging,
      // change if wnat to change the drag image
      // e.preventDefault();
      e.stopPropagation();

      if (!e.dataTransfer) {
        throw new Error("Error: dataTransfer event is null.");
      }

      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text", id.toString());

      taskEl.style.opacity = "50%";
    };

    const handleDragEnd = (e: DragEvent) => {
      e.stopPropagation();
      taskEl.style.opacity = "100%";
    };

    taskEl.addEventListener("dragstart", handleDragStart);

    taskEl.addEventListener("dragend", handleDragEnd);

    return () => {
      taskEl.removeEventListener("dragstart", handleDragStart);
      taskEl.removeEventListener("dragend", handleDragEnd);
    };
  };

  useEffect(dragEventListeners);

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
      id={id.toString()}
      onKeyDown={(e) => {
        const editShortcut = e.ctrlKey && e.key === "E";
        if (editShortcut) {
          setIsFocusable(!isFocusable);
        }
      }}
      style={{
        outline: isFocusable ? "solid var(--blue)" : "",
      }}
      tabIndex={0}
      data-status={status}
      draggable
      className="task"
    >
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
