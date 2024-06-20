// src/components/CaptionList.js
import React from "react";

const CaptionList = ({ captions, onDeleteCaption }) => {
  return (
    <ul>
      {captions.map((caption, index) => (
        <li key={index}>
          {caption.startTime} - {caption.endTime}: {caption.text}
          <button onClick={() => onDeleteCaption(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default CaptionList;
