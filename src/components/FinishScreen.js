import { useQuiz } from "../contexts/QuizContext";

// The FinishScreen component is rendered when the user completes the quiz.
function FinishScreen() {
  // The useQuiz hook returns the state and dispatch functions from the QuizContext.
  const { points, maxPossiblePoints, highscore, dispatch } = useQuiz();

  // Calculate the percentage of points scored.
  const percentage = (points / maxPossiblePoints) * 100;

  // Determine the emoji to display based on the percentage.
  let emoji;
  if (percentage === 100) emoji = "🥇"; // Gold medal for a perfect score!
  if (percentage >= 80 && percentage < 100) emoji = "🎉"; // Party popper for a great score!
  if (percentage >= 50 && percentage < 80) emoji = "🙃"; // Neutral face for an average score.
  if (percentage >= 0 && percentage < 50) emoji = "🤨"; // Confused face for a poor score.
  if (percentage === 0) emoji = "🤦‍♂️"; // Shrugging face for no score at all!

  // Render the finish screen with the score, high score, and a restart button.
  return (
    <>
      <p className="result">
        {/* Display the emoji and score. */}
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      {/* Display the high score. */}
      <p className="highscore">(Highscore: {highscore} points)</p>
      {/* Display a button to restart the quiz. */}
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz
      </button>
    </>
  );
}

export default FinishScreen;
