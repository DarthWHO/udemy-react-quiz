import { useEffect } from "react";

function Timer({ timeRemaining, dispatch }) {
  const mins = Math.floor(timeRemaining / 60);
  const secs = timeRemaining % 60;
  const formattedSecs = secs < 10 ? `0${secs}` : secs;
  const formattedMins = mins < 10 ? `0${mins}` : mins;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );

  return <div className="timer">{`${formattedMins}:${formattedSecs}`}</div>;
}

export default Timer;
