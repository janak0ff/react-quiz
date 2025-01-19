// QuizContext.js
//
// This file contains the React Context and Provider component for managing
// the state of the quiz.
//
// The state includes the questions, the current status (loading, error, ready,
// active, finished), the current question index, the user's answer, the
// points earned, the high score, and the remaining seconds.
//
// The Provider component fetches the questions from a server and dispatches
// the "dataReceived" action with the fetched data.
//
// The useQuiz hook returns the state and the dispatch function from the Context.

import { createContext, useContext, useReducer, useEffect } from "react";

// Create a React Context and Provider component for managing the state of the quiz.
const QuizContext = createContext();

// Set the number of seconds per question.
const SECS_PER_QUESTION = 30;

// The initial state of the quiz.
const initialState = {
  // The questions array.
  questions: [],

  // The current status of the quiz. Can be "loading", "error", "ready", "active", or "finished".
  status: "loading",

  // The current question index.
  index: 0,

  // The user's answer to the current question.
  answer: null,

  // The points earned so far.
  points: 0,

  // The high score.
  highscore: 0,

  // The remaining seconds.
  secondsRemaining: null,
};

// The reducer function for managing the state.

function reducer(state, action) {
  // The main reducer function for managing the state of the quiz.
  // It takes in the current state and an action, and returns a new state.
  switch (action.type) {
    case "dataReceived":
      // If the action type is "dataReceived", update the state with the received data.
      // Set the questions array to the received data and set the status to "ready".
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      // If the action type is "dataFailed", set the status to "error".
      return {
        ...state,
        status: "error",
      };
    case "start":
      // If the action type is "start", set the status to "active" and the remaining seconds to the number
      // of seconds per question multiplied by the number of questions.
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      // If the action type is "newAnswer", update the user's answer and points.
      // Get the current question from the questions array.
      const question = state.questions.at(state.index);

      // If the user's answer matches the correct option, add the points to the user's score.
      // Otherwise, don't change the score.
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      // If the action type is "nextQuestion", increment the index and set the answer to null.
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      // If the action type is "finish", set the status to "finished" and update the high score if necessary.
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      // If the action type is "restart", reset the state to the initial state, but keep the questions array.
      return { ...initialState, questions: state.questions, status: "ready" };

    case "tick":
      // If the action type is "tick", decrement the remaining seconds and set the status to "finished" if
      // the remaining seconds reach 0.
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      // If the action type is unknown, throw an error.
      throw new Error("Action unkonwn");
  }
}

////////////////////Optional Method (using if-else)///////////////////////
// function reducer(state, action) {
//   // Handle the "dataReceived" action by setting the questions array and the status to "ready".
//   if (action.type === "dataReceived") {
//     return {
//       ...state,
//       questions: action.payload,
//       status: "ready",
//     };
//   }

//   // Handle the "dataFailed" action by setting the status to "error".
//   if (action.type === "dataFailed") {
//     return {
//       ...state,
//       status: "error",
//     };
//   }

//   // Handle the "start" action by setting the status to "active" and the remaining seconds to the number of seconds per question
//   // multiplied by the number of questions.
//   if (action.type === "start") {
//     return {
//       ...state,
//       status: "active",
//       secondsRemaining: state.questions.length * SECS_PER_QUESTION,
//     };
//   }

//   // Handle the "newAnswer" action by updating the user's answer and points.
//   if (action.type === "newAnswer") {
//     const question = state.questions.at(state.index);

//     return {
//       ...state,
//       answer: action.payload,
//       points:
//         action.payload === question.correctOption
//           ? state.points + question.points
//           : state.points,
//     };
//   }

//   // Handle the "nextQuestion" action by incrementing the current question index and resetting the user's answer.
//   if (action.type === "nextQuestion") {
//     return {
//       ...state,
//       index: state.index + 1,
//       answer: null,
//     };
//   }

//   // Handle the "finish" action by setting the status to "finished" and updating the high score.
//   if (action.type === "finish") {
//     return {
//       ...state,
//       status: "finished",
//       highscore:
//         state.points > state.highscore ? state.points : state.highscore,
//     };
//   }

//   // Handle the "restart" action by resetting the state to the initial state.
//   if (action.type === "restart") {
//     return {
//       ...initialState,
//       questions: state.questions,
//       status: "ready",
//     };
//   }

//   // Handle the "tick" action by decrementing the remaining seconds and setting the status to "finished" if the remaining seconds
//   // reach 0.
//   if (action.type === "tick") {
//     return {
//       ...state,
//       secondsRemaining: state.secondsRemaining - 1,
//       status: state.secondsRemaining === 0 ? "finished" : state.status,
//     };
//   }

//   // Throw an error if the action type is not recognized.
//   throw new Error("Action unkonwn");
// }
//////////////////END/////////////////////////

// The Provider component for managing the state of the quiz.
function QuizProvider({ children }) {
  // Use the useReducer hook to create the state and dispatch functions.
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  // Calculate the number of questions and the maximum possible points.
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  // Fetch the questions from a server and dispatch the "dataReceived" action with the fetched data.
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  // Return the Provider component with the state and dispatch functions as props.
  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,

        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

// The useQuiz hook returns the state and the dispatch function from the Context.
function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside of the QuizProvider");
  return context;
}

// Export the QuizProvider component and the useQuiz hook.
export { QuizProvider, useQuiz };
