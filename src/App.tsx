import "./App.scss";
import InputApp from "./components/InputApp";
import { useTaskMate } from "./state/task-mate";

function App() {
  const { tasks } = useTaskMate();

  return (
    <>
      <div className="App">
        <h2>Task Mate</h2>
        <InputApp />
        {tasks.map((task) => {
          return <p key={task.title}>{JSON.stringify(task)}</p>;
        })}
      </div>
    </>
  );
}

export default App;
