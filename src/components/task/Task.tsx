import "./Task.css";
import { useEffect } from "react";

interface TaskProps {
  id: string;
  title: string;
  content: string;
}

export default function Task({ id, title, content }: TaskProps) {
  const dragEventListeners = () => {
    const taskEl = document.getElementById(id);
    if (!taskEl) {
      throw new Error("Error: task element is undefined in Task component");
    }

    const handleDragStart = (e: DragEvent) => {
      // NOTE: disabled to keep default image dragging,
      // change if wnat to change the drag image
      // e.preventDefault();
      e.stopPropagation();

      if (!e.dataTransfer) {
        throw new Error("Erro: dataTransfer event is null.");
      }

      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text", id);

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

  return (
    <li id={id} draggable className="task">
      {/*
      HACK:
      this method of editing content is error prone,
      fix at some point lol
      */}
      <h3 contentEditable suppressContentEditableWarning>
        {title}
      </h3>
      <p contentEditable suppressContentEditableWarning>
        {content}
      </p>
    </li>
  );
}
