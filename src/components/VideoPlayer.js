import React, { useState, useEffect, useRef } from "react";

const VideoPlayer = ({ onVideoUrlChange }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    // Initialization of the YouTube Iframe API
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("player", {
        height: "390",
        width: "640",
        events: {
          onStateChange: onPlayerStateChange,
          onError: onPlayerError,
        },
      });
    };
  
    // Cleanup function to prevent memory leaks
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);
 
  const onPlayerError = (event) => {
    console.error("YouTube Player Error:", event.data);
    alert("Failed to load the video. Please check the URL and try again.");
  };
  
  const onPlayerStateChange = (event) => {
    // Handle different states of the player
    if (event.data === window.YT.PlayerState.PLAYING) {
      // Implementation of your caption logic
    }
  };

  const extractVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleVideoUrlChange = (event) => {
    const url = event.target.value;
    const videoId = extractVideoId(url);
    onVideoUrlChange(url);
    if (videoId && playerRef.current) {
      playerRef.current.loadVideoById(videoId);
    }
  };

  return (
    <div style={{ margin: "20px auto", maxWidth: "960px" }}>
      <input
        type="text"
        placeholder="Enter YouTube video URL"
        onChange={handleVideoUrlChange}
        style={{ width: "100%" }}
      />
      <div id="player" style={{ marginTop: "20px" }}></div>
    </div>
  );
};

export default VideoPlayer;
