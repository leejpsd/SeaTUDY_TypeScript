import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../components/hooks/reduxHooks";
import { RootState } from "../redux/config/configStore";

// 사용자 정의 hook
export const useCounter = (initialValue: number, ms: number) => {
  // const time = useSelector((state: RootState) => state.timer);
  // console.log(time);
  const dispatch = useAppDispatch();
  const userTime = useAppSelector((state) => state.timer.dayStudyTime);

  const [count, setCount] = useState<number>(initialValue);
  const intervalRef = useRef<any>(null);
  const start = useCallback(() => {
    if (intervalRef.current != null) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setCount((c: number) => c + 1);
    }, ms);
  }, []);

  const stop = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  return { count, start, stop };
};
