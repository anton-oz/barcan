import "./Task.css";
interface TaskProps {
  key: number;
  title: string;
  content: string;
}

export default function Task({ key, title, content }: TaskProps) {
  return (
    <li key={key} className="task">
      <h3 contentEditable>{title}</h3>
      <p contentEditable>{content}</p>
    </li>
  );
}
