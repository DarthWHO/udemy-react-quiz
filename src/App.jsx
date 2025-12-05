import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import { useEffect, useReducer } from "react";

const initialState = {
  questions: [],
  status: "loading", // loading, error, ready, active, finished
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "error":
      return { ...state, status: "error" };
    case "loading":
      return { ...state, status: "loading" };
    case "active":
      return { ...state, status: "active" };
    case "finished":
      return { ...state, status: "finished" };
    default:
      throw new Error("Action is unknown");
  }
}

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
  const questionsLength = questions.length;

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8000/questions");
        const data = await response.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "error", payload: error });
      }
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen questionsLength={questionsLength} />
        )}
      </Main>
    </div>
  );
}

export default App;
