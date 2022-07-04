import logo from "./logo.svg";
import styles from "./App.css";
import Grid from "./components/Grid";

function App() {
  return (
    <div class={styles.App}>
      <div className="container my-5">
        <Grid />
      </div>
    </div>
  );
}

export default App;
