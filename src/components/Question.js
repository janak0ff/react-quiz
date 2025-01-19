import { useQuiz } from "../contexts/QuizContext";
import Options from "./Options";

/**
 * The Question component renders the current question and its options.
 * It uses the useQuiz hook to access the questions array and the current index.
 */
function Question() {
  // Get the questions array and the current index using the useQuiz hook.
  const { questions, index } = useQuiz();

  // Get the current question from the questions array.
  const question = questions.at(index);

  // Render the question and its options.
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}

export default Question;
