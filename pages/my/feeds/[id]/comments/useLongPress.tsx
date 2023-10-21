import { useEffect, MouseEventHandler, ReactHTML } from "react";

interface LongPressHookProps<T extends keyof ReactHTML> {
  onMouseDown: MouseEventHandler<HTMLDivElement>;
}

function useLongPress<T extends keyof ReactHTML>(
  callback: () => void = () => {},
  ms: number = 300
): LongPressHookProps<T> {
  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    callback();
  };

  useEffect(() => {
    let timerId: number;

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [callback, ms]);

  return {
    onMouseDown: handleMouseDown,
  };
}

export default useLongPress;
