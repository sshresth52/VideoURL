import React, { useState, useEffect, useRef } from "react";
import VideoPlayer from "./components/VideoPlayer";
import CaptionForm from "./components/CaptionForm";
import CaptionList from "./components/CaptionList";
import "./styles.css"; // Import the CSS file

const App = () => {
  const [captions, setCaptions] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [currentCaption, setCurrentCaption] = useState("");
  const playerRef = useRef(null);

  const handleVideoUrlChange = (url) => {
    setVideoUrl(url);
  };

  const handleAddCaption = (caption) => {
    setCaptions([...captions, caption]);
  };

  const handleDeleteCaption = (index) => {
    const newCaptions = captions.filter((_, i) => i !== index);
    setCaptions(newCaptions);
  };

  const parseTime = (time) => {
    const parts = time.split(":");
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  };

  useEffect(() => {
    if (window.YT && window.YT.Player) {
      playerRef.current = new window.YT.Player("player", {
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              const checkTime = setInterval(() => {
                console.log(playerRef.current);
                const currentTime = playerRef.current.playerInfo.currentTime;
                console.log(captions," captions ");
                console.log(currentTime);
                const activeCaption = captions.find(
                  (caption) =>
                    currentTime >= parseTime(caption.startTime) &&
                    currentTime < parseTime(caption.endTime)
              );
                setCurrentCaption(activeCaption ? activeCaption.text : "");
              }, 1000);
              return () => clearInterval(checkTime);
            }
          },
        },
      });
    }
  }, [videoUrl, captions]);

  return (
    <div>
      <h1>Video Caption App</h1>
      <VideoPlayer onVideoUrlChange={handleVideoUrlChange} />
      {videoUrl && (
        <>
          <CaptionForm onAddCaption={handleAddCaption} />
          <CaptionList
            captions={captions}
            onDeleteCaption={handleDeleteCaption}
          />
          {currentCaption && <div className="caption">{currentCaption}</div>}
        </>
      )}
    </div>
  );
};

export default App;
