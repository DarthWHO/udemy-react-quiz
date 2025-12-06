import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import { useEffect, useReducer } from "react";

const initialState = {
  questions: [],
  status: "loading", // loading, error, ready, active, finished
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived": {
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    }
    case "error":
      return { ...state, status: "error" };
    case "loading":
      return { ...state, status: "loading" };
    case "active":
      return { ...state, status: "active" };
    case "finish":
      return { ...state, status: "finished" };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "newAnswer": {
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };

    default:
      throw new Error("Action is unknown");
  }
}

function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const questionsLength = questions.length;
  const totalPoints = questions.reduce((acc, currentQuestion) => {
    return currentQuestion.points + acc;
  }, 0);

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
          <StartScreen
            questionsLength={questionsLength}
            dispatch={() => dispatch({ type: "active" })}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              points={points}
              totalPoints={totalPoints}
              questionCount={questionsLength}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              questionsLength={questionsLength}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
