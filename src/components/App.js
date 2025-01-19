// Importing necessary React components and hooks
import Header from "./Header"; // Header component, typically used for displaying the top part of the UI
import Main from "./Main"; // Main component, generally used for displaying the main content area
import Loader from "./Loader"; // Loader component, shown when data is being fetched or processed
import Error from "./Error"; // Error component, displayed when there's an error in data fetching
import StartScreen from "./StartScreen"; // StartScreen component, shown when the app is ready to start
import Question from "./Question"; // Question component, for displaying quiz questions
import NextButton from "./NextButton"; // NextButton component, used to navigate to the next question
import Progress from "./Progress"; // Progress component, displays the user's progress in the quiz
import FinishScreen from "./FinishScreen"; // FinishScreen component, shown when the quiz is finished
import Footer from "./Footer"; // Footer component, typically used for displaying the bottom part of the UI
import Timer from "./Timer"; // Timer component, displays a countdown timer
import { useQuiz } from "../contexts/QuizContext"; // Custom hook to access quiz state from QuizContext

// Main App component, the root component of the application
export default function App() {
  // Using the useQuiz hook to access the quiz status from context
  const { status } = useQuiz();

  // JSX to render the app's UI based on the quiz status
  return (
    <div className="app">
      <Header /> {/* Rendering the Header component */}
      <Main>
        {" "}
        {/* Rendering the Main component as a container for the main content */}
        {status === "loading" && <Loader />}{" "}
        {/* Conditionally render Loader if status is 'loading' */}
        {status === "error" && <Error />}{" "}
        {/* Conditionally render Error if status is 'error' */}
        {status === "ready" && <StartScreen />}{" "}
        {/* Conditionally render StartScreen if status is 'ready' */}
        {status ===
          "active" /* Conditionally render quiz content if status is 'active' */ && (
          <>
            <Progress />{" "}
            {/* Rendering Progress component to show current progress */}
            <Question />{" "}
            {/* Rendering Question component to display the current question */}
            <Footer>
              {" "}
              {/* Rendering Footer component to contain Timer and NextButton */}
              <Timer /> {/* Rendering Timer component to show countdown */}
              <NextButton />{" "}
              {/* Rendering NextButton component to navigate through questions */}
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}{" "}
        {/* Conditionally render FinishScreen if status is 'finished' */}
      </Main>
    </div>
  );
}
