import { useQuiz } from "../contexts/QuizContext";

// The Options component displays a list of options for a question and allows the user to select one.
function Options({ question }) {
  // The useQuiz hook returns the current state and dispatch function from the QuizContext.
  const { dispatch, answer } = useQuiz();

  // Determine if the user has already answered the current question.
  const hasAnswered = answer !== null;

  // Render a list of options, each with a button element.
  return (
    <div className="options">
      {question.options.map((option, index) => (
        // For each option, generate a button element with a key, className, and onClick event handler.
        <button
          // Set the className based on if the option is the correct answer or if the user has already answered.
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          // Set the key to the option text to ensure that React can keep track of the options.
          key={option}
          // Disable the button if the user has already answered the question.
          disabled={hasAnswered}
          // Handle the onClick event by dispatching the "newAnswer" action with the index of the selected option as the payload.
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {/* // Display the text of the option on the button. */}
          {option}
        </button>
      ))}
    </div>
  );
}

// Export the Options component as the default export.
export default Options;
