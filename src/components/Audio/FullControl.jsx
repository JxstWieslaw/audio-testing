import React, { useState, useEffect, useRef } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./fullcontrol.css";
import ReactHowler from "react-howler";
import raf from "raf";
import useSoundStore from "./soundStore";

const FullControl = () => {
  const {
    isFullControlPlaying,
    isSwapSourcePlaying,
    setFullControlPlaying,
    setSwapSourcePlaying,
  } = useSoundStore();
  const [state, setState] = useState({
    playing: isFullControlPlaying,
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
    if (isSwapSourcePlaying) {
      setSwapSourcePlaying(false);
    }
    if (isFullControlPlaying) {
      setFullControlPlaying(false);
    } else {
      setFullControlPlaying(true);
    }
  };
  const handleStop = () => {
    playerRef.current.stop();
    setFullControlPlaying(false);
    renderSeekPos();
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
        playing={isFullControlPlaying}
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
          {isFullControlPlaying ? "Pause" : "Play"}
        </Button>
        <Button onClick={handleStop} variant="outlined">
          Stop
        </Button>
      </Stack>
      <br />
    </div>
  );
};

export default FullControl;
