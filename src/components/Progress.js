import { useQuiz } from "../contexts/QuizContext";

// The Progress component displays the current question number,
// the total number of questions, the points earned so far,
// and the maximum possible points.
function Progress() {
  // Get the current state of the quiz using the useQuiz hook.
  const { index, numQuestions, points, maxPossiblePoints, answer } = useQuiz();

  return (
    // The header element contains the progress bar and the question number,
    // points, and maximum possible points.
    <header className="progress">
      {/* // The progress bar element displays the progress of the quiz.
      // The max attribute sets the maximum value of the progress bar,
      // and the value attribute sets the current value.
      // The value is calculated by adding the current question index
      // to the number of correct answers so far. */}
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      {/* // The p elements display the question number, points, and maximum possible points. */}
      <p>
        {/* // The strong element wraps the current question number. */}
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>

      <p>
        {/* // The strong element wraps the current points. */}
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
