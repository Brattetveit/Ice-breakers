import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Message } from "@/components/Message";
import alarmSound from "@/assets/alarm.wav"

interface TimerProps {
  timeProp: number;
  endOfTimerAction: () => void;
}

export function Timer({timeProp, endOfTimerAction}: TimerProps){
  const [time, setTime] = useState(timeProp);
  const [clockRunning, setClockRunning] = useState(false)

  function displayTime() {
    let display: string = "";
    const hours: number = Math.floor(time / 3600);
    const minutes: number = Math.floor((time % 3600) / 60)
    const seconds: number = time % 60;
    const formattedMinutes: string = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds: string = seconds < 10 ? `0${seconds}` : `${seconds}`;
    display = `${hours}:${formattedMinutes}:${formattedSeconds}`;
    const clock: HTMLHeadingElement | null = document.getElementById("clock") as HTMLHeadingElement;
    if (clock !== null) {
      clock.textContent = display
      hiddeError();
    }
  }

  function clockSwitch() {
    const clockSwitchButton = document.getElementById("clockSwitchButton") as HTMLButtonElement
    if (clockRunning) {
      setClockRunning(false);
      clockSwitchButton.textContent = "Start Klokken"
    } else {
      setClockRunning(true);
      clockSwitchButton.textContent = "Stop klokken"
    }
  }

  function timeChange(newTime: number) {
    turnClockColor("black");
    setTime(newTime);
  }

  function showError() {
    const errorMesage = document.getElementById("timerError");
    if (errorMesage !== null) {
      errorMesage.style.display = "block"
    }
  }

  function hiddeError() {
    const errorMesage = document.getElementById("timerError");
    if (errorMesage !== null) {
      errorMesage.style.display = "none"
    }
  }

  function setTimer() {
    const hoursInput = document.getElementById("hours") as HTMLInputElement;
    const minutesInput = document.getElementById("minutes") as HTMLInputElement;
    const secondsInput = document.getElementById("seconds") as HTMLInputElement;
  
    const hours = parseInt(hoursInput?.value || '0', 10);
    const minutes = parseInt(minutesInput?.value || '0', 10);
    const seconds = parseInt(secondsInput?.value || '0', 10);

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
    clock !== null ? clock.style.color = `${color}`: void 0;
  }

  function playAlarm() {
    const alarm = new Audio(alarmSound)
    alarm.play();
  }


  useEffect(() => {
    displayTime()
    let timer: NodeJS.Timeout;
    if (clockRunning) {
      timer = setInterval(() => {
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
  }, [time, clockRunning]);

  return (
    <div className="bg-cyan-300 p-4 rounded-lg shadow-lg">
      <h2 className="text-4xl" id="clock">00:00:00</h2>
      <Button onClick={clockSwitch} id="clockSwitchButton">Start Klokken</Button>
      <div>
        <span className="flex inline p-1">
          <input className="w-8" id="hours" type="text" />
          <p>timer</p>
        </span>
        <span className="flex inline p-1">
          <input className="w-8" id="minutes" type="text" />
          <p>minutter</p>
        </span>
        <span className="flex inline p-1">
          <input className="w-8" id="seconds" type="text" />
          <p>sekunder</p>
        </span>
        <Message className="" id="timerError" message={"Må bruke tall"}></Message>
        <Button onClick={setTimer}>Set Klokke</Button>
      </div>
    </div>
  )

}