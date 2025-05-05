import "./Todo.css";
import { Plus } from "lucide-react";

export default function Todo() {
  return (
    <section>
      <header>
        <h2>Todo</h2>
        <button>
          <Plus size={30} />
        </button>
      </header>
    </section>
  );
}
