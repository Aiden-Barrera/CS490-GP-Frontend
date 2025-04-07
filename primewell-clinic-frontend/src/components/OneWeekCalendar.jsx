import { React, useState } from "react";
import { startOfWeek, endOfWeek, eachDayOfInterval, format } from "date-fns";
import "./calendar.css";

const OneWeekCalendar = (props) => {
  const weekStart = startOfWeek(props.date, { weekStartsOn: 0 }); // Assuming Monday as the first day of the week
  const weekEnd = endOfWeek(props.date, { weekStartsOn: 0 });
  const calendarDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
  const [days, setDays] = useState(props.days);

  let daysJSON = days;
  console.log(daysJSON);

  const selected = (e, day) => {
    // console.log("clicked", day);

    daysJSON[day] = daysJSON[day] === "false" ? "true" : "false";

    console.log(daysJSON);

    const element = document.getElementById(day);
    const bg = element.style.backgroundColor;

    element.style.backgroundColor =
      bg === "rgb(255, 230, 226)" ? "rgb(255,255,255)" : "rgb(255, 230, 226)";
    setDays(daysJSON);
    props.onSubmitDays(days);
  };

  return (
    <div className="one-week-calendar">
      {calendarDays.map((day) => (
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
};

export default OneWeekCalendar;
