import React, { useState } from "react";

const CaptionForm = ({ onAddCaption }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddCaption({ startTime, endTime, text });
    setStartTime("");
    setEndTime("");
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Start Time (e.g., 0:00)"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <input
        type="text"
        placeholder="End Time (e.g., 0:05)"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <input
        type="text"
        placeholder="Caption Text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add Caption</button>
    </form>
  );
};

export default CaptionForm;
