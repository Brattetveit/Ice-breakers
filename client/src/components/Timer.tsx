import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Message } from "@/components/Message";
import alarmSound from "@/assets/alarm.wav";

interface TimerProps {
  timeProp: number | undefined;
  endOfTimerAction: () => void;
}

export function Timer({ timeProp, endOfTimerAction }: TimerProps) {
  const [time, setTime] = useState(timeProp || 0);
  const [clockRunning, setClockRunning] = useState(false);

  const displayTime: () => void = useCallback(() => {
    let display: string = "";
    const hours: number = Math.floor(time / 3600);
    const minutes: number = Math.floor((time % 3600) / 60);
    const seconds: number = time % 60;
    const formattedMinutes: string =
      minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds: string =
      seconds < 10 ? `0${seconds}` : `${seconds}`;
    display = `${hours}:${formattedMinutes}:${formattedSeconds}`;
    const clock: HTMLHeadingElement | null = document.getElementById(
      "clock",
    ) as HTMLHeadingElement;
    if (clock !== null) {
      clock.textContent = display;
      hiddeError();
    }
  }, [time]);

  const clockSwitch: () => void = useCallback(() => {
    const clockSwitchButton = document.getElementById(
      "clockSwitchButton",
    ) as HTMLButtonElement;
    if (clockRunning) {
      setClockRunning(false);
      clockSwitchButton.textContent = "Start Klokken";
    } else {
      setClockRunning(true);
      clockSwitchButton.textContent = "Stop klokken";
    }
  }, [clockRunning]);

  function timeChange(newTime: number) {
    turnClockColor("black");
    setTime(newTime);
  }

  function showError() {
    const errorMesage = document.getElementById("timerError");
    if (errorMesage !== null) {
      errorMesage.style.display = "block";
    }
  }

  function hiddeError() {
    const errorMesage = document.getElementById("timerError");
    if (errorMesage !== null) {
      errorMesage.style.display = "none";
    }
  }

  function setTimer() {
    const hoursInput = document.getElementById("hours") as HTMLInputElement;
    const minutesInput = document.getElementById("minutes") as HTMLInputElement;
    const secondsInput = document.getElementById("seconds") as HTMLInputElement;

    const hours = parseInt(hoursInput?.value || "0", 10);
    const minutes = parseInt(minutesInput?.value || "0", 10);
    const seconds = parseInt(secondsInput?.value || "0", 10);

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
      showError();
      return;
    }

    const newTime = seconds + minutes * 60 + hours * 3600;

    timeChange(newTime);
    displayTime();
    hoursInput.value = "";
    minutesInput.value = "";
    secondsInput.value = "";
  }

  function turnClockColor(color: string) {
    const clock = document.getElementById("clock");
    clock !== null ? (clock.style.color = `${color}`) : void 0;
  }

  function playAlarm() {
    const alarm = new Audio(alarmSound);
    alarm.play();
  }

  useEffect(() => {
    // console.log("useEffect triggered because of changes in:", { time, clockRun ning, displayTime, endOfTimerAction, clockSwitch });
    displayTime();
    let timer: NodeJS.Timeout;
    if (clockRunning) {
      timer = setInterval(() => {
        console.log(time);

        if (time == 0) {
          endOfTimerAction();
          clockSwitch();
          turnClockColor("red");
          playAlarm();
        }
        if (time > 0) {
          setTime(time - 1);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [time, clockRunning, displayTime, endOfTimerAction, clockSwitch]);

  return (
    <div
      className="grid grid-cols-2 gap-4 rounded-lg p-2 "
      style={{ backgroundColor: "#a2d2ff", color: "black" }}
    >
      <div className="flex place-self-center">
        <h2 className="text-3xl text-[#014f86]" id="clock">
          00:00:00
        </h2>
      </div>

      <div>
        <span className="flex items-center p-1">
          <input
            className="text-s mr-2 w-8"
            id="hours"
            type="text"
            style={{ borderRadius: "5px" }}
          />
          <p className="text-xs text-[#014f86]" style={{ fontSize: "16px" }}>
            Timer
          </p>
        </span>
        <span className="flex items-center p-1">
          <input
            className="text-s mr-2 w-8"
            id="minutes"
            type="text"
            style={{ borderRadius: "5px" }}
          />
          <p className="text-xs text-[#014f86]" style={{ fontSize: "16px" }}>
            Minutter
          </p>
        </span>
        <span className="flex items-center p-1">
          <input
            className="text-s mr-2 w-8"
            id="seconds"
            type="text"
            style={{ borderRadius: "5px" }}
          />
          <p className="text-xs text-[#014f86]" style={{ fontSize: "16px" }}>
            Sekunder
          </p>
        </span>
        <Message
          className="text-2xs"
          id="timerError"
          message="Må bruke tall"
        ></Message>
      </div>
      <div>
        <Button
          className="px-2 py-1 text-xs"
          style={{
            fontSize: "16px",
            backgroundColor: "#ffff",
            color: "#014f86",
          }}
          onClick={clockSwitch}
          id="clockSwitchButton"
        >
          Start klokken
        </Button>
      </div>
      <div>
        <Button
          className="px-2 py-1 text-xs"
          style={{
            fontSize: "16px",
            backgroundColor: "#fff",
            color: "#014f86",
          }}
          onClick={setTimer}
        >
          Sett klokken
        </Button>
      </div>
    </div>
  );
}
