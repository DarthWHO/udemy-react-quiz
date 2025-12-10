import { createContext, useReducer, useEffect } from "react";

const QuizContext = createContext();

const initialState = {
  questions: [],
  status: "loading", // loading, error, ready, active, finished
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  timeRemaining: 0,
};

const SECS_PER_QUESTION = 30;

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
      return {
        ...state,
        status: "active",
        timeRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
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
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highscore: state.highscore,
      };

    case "tick":
      return {
        ...state,
        timeRemaining: state.timeRemaining - 1,
        status: state.timeRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action is unknown");
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, timeRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const questionsLength = questions.length;
  const totalPoints = questions.reduce((acc, currentQuestion) => {
    return currentQuestion.points + acc;
  }, 0);
  const question = questions[index];

  useEffect(
    function () {
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
    },
    [dispatch]
  );

  return (
    <QuizContext.Provider
      value={{
        questions,
        question,
        status,
        index,
        answer,
        points,
        highscore,
        timeRemaining,
        questionsLength,
        totalPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export { QuizProvider, QuizContext };
