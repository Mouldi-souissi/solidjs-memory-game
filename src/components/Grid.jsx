import { createSignal } from "solid-js";
import { generateSequence } from "../functions/gameLogic";
import { grid, sequence, setGrid, setSequence } from "../store";

const Grid = () => {
  const [clicks, setClicks] = createSignal(0);
  const [score, setScore] = createSignal(0);
  const [level, setLevel] = createSignal(2);
  const [good, setGood] = createSignal(false);
  const [bad, setBad] = createSignal(false);

  const showSequence = () => {
    const toggleSq = (id, isHidden) => {
      const modified = grid().map((el) => {
        if (el.id === id) {
          el.isHidden = isHidden;
        }
        return el;
      });

      setGrid(modified);
    };
    const timer = (sq, isHidden, i) => {
      // show
      setTimeout(() => {
        toggleSq(sq, isHidden);
      }, 1000 * i);
      // hide
      setTimeout(() => {
        toggleSq(sq, true);
      }, 1700 * i);
    };

    sequence().forEach((el, i) => {
      timer(el, false, i + 1);
    });
  };

  const handleStart = () => {
    setClicks(0);
    showSequence();
  };

  const handleClick = (sq) => {
    const isAnimationOver = grid().every((sq) => sq.isHidden);
    if (isAnimationOver) {
      const isValid = sequence()[clicks()] === sq.id;
      setClicks(clicks() + 1);

      if (isValid) {
        setGood(true);
        setTimeout(() => {
          setGood(false);
        }, 1000);

        if (clicks() === sequence().length) {
          setScore(score() + 1);
          setClicks(0);
          setLevel(level() + 1);
          setSequence(generateSequence(grid(), level()));
          showSequence();
        }
      } else {
        setBad(true);
        setTimeout(() => {
          setBad(false);
        }, 1000);
        setClicks(0);
        showSequence();
      }
    }
  };

  return (
    <div>
      <div className="d-flex flex-column align-items-center mb-5">
        <button className="btn btn-dark col-lg-3" onClick={handleStart}>
          Show
        </button>
        <div className="text-black h4 mt-5">SOLVED : {score}</div>
      </div>
      <div className="d-flex justify-content-center align-items-center mb-5">
        <div className="grid">
          {grid().map((sq) => (
            <div
              className={`square btn btn-secondary ${!sq.isHidden && "show"}`}
              onClick={() => handleClick(sq)}
            >
              {sq.id}
            </div>
          ))}
        </div>
      </div>
      {good() && <div className="text-center text-success h4 mt-5">good</div>}
      {bad() && <div className="text-center text-danger h4 mt-5">wrong</div>}
    </div>
  );
};

export default Grid;
