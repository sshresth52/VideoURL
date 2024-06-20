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
    <div>
      <input
        type="text"
        placeholder="Enter YouTube video URL"
        onChange={handleVideoUrlChange}
      />
      <div id="player"></div>
    </div>
  );
};

export default VideoPlayer;
