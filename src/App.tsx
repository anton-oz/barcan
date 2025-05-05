import "./App.css";
import Nav from "./components/nav/Nav";
import Todo from "./components/todo/Todo";

function App() {
  return (
    <>
      <Nav />
      <main>
        <Todo />
        <section>In progress</section>
        <section>Done</section>
      </main>
    </>
  );
}

export default App;
