import React from "react";
import { startOfWeek, endOfWeek, eachDayOfInterval, format } from "date-fns";
import "./calendar.css";

function OneWeekCalendar({ date }) {
  const weekStart = startOfWeek(date, { weekStartsOn: 0 }); // Assuming Monday as the first day of the week
  const weekEnd = endOfWeek(date, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
  let scheduleJSON =
    '{"Sun": "false", "Mon": "false","Tue": "false","Wed": "false","Thu": "false","Fri": "false","Sat": "false","firstShift": "00:00","secondShift": "00:00"}';

  const selected = (e, day) => {
    // console.log("e", e);
    // console.log("clicked", day);
    // console.log("document", document.getElementById(day));
    // let dayBox = document.getElementById(day).style.backgroundColor;
    // console.log(dayBox);

    if (
      document.getElementById(day).style.backgroundColor ===
      "rgb(255, 230, 226)"
    ) {
      document.getElementById(day).style.backgroundColor = "rgb(255,255,255)";
    } else {
      document.getElementById(day).style.backgroundColor = "rgb(255, 230, 226)";
    }
  };

  return (
    <div className="one-week-calendar">
      {days.map((day) => (
        <div
          id={format(day, "EEE")}
          key={format(day, "EEE")}
          className="calendar-day"
          onClick={(e) => selected(e, format(day, "EEE"))}
        >
          {format(day, "EEE")}
        </div>
      ))}
    </div>
  );
}

export default OneWeekCalendar;
