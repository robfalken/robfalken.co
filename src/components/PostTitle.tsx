import React from "react";
import { ClockIcon } from "../components/ClockIcon";
import { CalendarIcon } from "../components/CalendarIcon";

export const PostTitle = ({ children, date, timeToRead }) => (
  <div className="my-4">
    {children}
    <div className="flex items-center font-sans text-sm text-gray-600">
      <CalendarIcon className="relative w-3 h-3 mr-1 text-gray-400" />
      <div>{date}</div>
      <ClockIcon className="relative w-3 h-3 ml-5 mr-1 text-gray-400" />
      <div>{timeToRead} min read</div>
    </div>
  </div>
);
