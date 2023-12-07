import React, { useState, useEffect, useRef } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./fullcontrol.css";
import ReactHowler from "react-howler";
import raf from "raf";
import useSoundStore from "./soundStore";

const FullControl = () => {
  const { isPlaying, setPlaying } = useSoundStore();
  const [state, setState] = useState({
    playing: isPlaying,
    loaded: false,
    loop: true,
    mute: false,
    volume: 1.0,
    seek: 0.0,
    isSeeking: false,
    duration: 0,
  });

  const playerRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    return () => {
      clearRAF();
    };
  }, []);

  const clearRAF = () => {
    raf.cancel(rafRef.current);
  };

  const handleToggle = () => {
    setPlaying(true);
  };

  const handleOnLoad = () => {
    setState((prevState) => ({
      ...prevState,
      loaded: true,
      duration: playerRef.current.duration(),
    }));
  };

  const handleOnPlay = () => {
    setState((prevState) => ({
      ...prevState,
      playing: true,
    }));
    renderSeekPos();
  };

  const handleOnEnd = () => {
    setState((prevState) => ({
      ...prevState,
      playing: false,
    }));
    clearRAF();
  };

  const handleStop = () => {
    playerRef.current.stop();
    setPlaying(false);
    renderSeekPos();
  };

  const renderSeekPos = () => {
    if (!state.isSeeking) {
      setState((prevState) => ({
        ...prevState,
        seek: playerRef.current.seek(),
      }));
    }
    if (state.playing) {
      rafRef.current = raf(renderSeekPos);
    }
  };

  return (
    <div className="full-control">
      <ReactHowler
        src={[
          "/assets/audio/sound-aac.aac",
          "/assets/audio/sound-mp3_1.mp3",
          "/assets/audio/sound-mp3_0.mp3",
          "/assets/audio/sound-ogg.ogg",
        ]}
        playing={isPlaying}
        onLoad={handleOnLoad}
        onPlay={handleOnPlay}
        onEnd={handleOnEnd}
        loop={state.loop}
        mute={state.mute}
        volume={state.volume}
        ref={(ref) => (playerRef.current = ref)}
      />

      <p>{state.loaded ? "Loaded" : "Loading"}</p>
      <Stack spacing={2} direction="row">
        <Button variant="text">Gabar SoundTrack</Button>
      </Stack>
      <br />
      <Stack spacing={2} direction="row">
        <Button onClick={handleToggle} variant="contained">
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button onClick={handleStop} variant="outlined">
          Stop
        </Button>
      </Stack>
      <br />
      {/* <button onClick={handleToggle}>{isPlaying ? "Pause" : "Play"}</button>
      <button onClick={handleStop}>Stop</button> */}
    </div>
  );
};

export default FullControl;
