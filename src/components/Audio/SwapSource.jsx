import React, { useState } from "react";
import ReactHowler from "react-howler";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import useSoundStore from "./soundStore";

const SwapSource = () => {
  const {
    isFullControlPlaying,
    isSwapSourcePlaying,
    setFullControlPlaying,
    setSwapSourcePlaying,
  } = useSoundStore();
  // The two files that we'll switch between
  const sources = [
    ["sound.ogg", "sound.mp3"],
    ["sound2.ogg", "sound2.mp3"],
  ];

  const [currentSrcIndex, setCurrentSrcIndex] = useState(0);

  const handleSwap = () => {
    // Just switch back and forth between 0 and 1
    const nextIndex = currentSrcIndex === 0 ? 1 : 0;
    setCurrentSrcIndex(nextIndex);
  };

  const handlePlay = () => {
    if (isFullControlPlaying) {
      setFullControlPlaying(false);
    }

    setSwapSourcePlaying(true);
  };

  const handlePause = () => {
    setSwapSourcePlaying(false);
  };

  return (
    <div>
      <ReactHowler
        playing={isSwapSourcePlaying}
        // When the sources are swapped we'll pass a new
        // src prop into ReactHowler which will destroy our
        // currently playing Howler.js and initialize
        // a new Howler.js instance
        src={sources[currentSrcIndex]}
      />
      <Stack spacing={2} direction="row">
        <Button variant="text">Sample SoundTrack</Button>
      </Stack>
      <br />
      <Stack spacing={2} direction="row">
        {isSwapSourcePlaying && (
          <Button onClick={handleSwap} variant="outlined">
            Swap Source
          </Button>
        )}
        {!isSwapSourcePlaying && (
          <Button disabled onClick={handleSwap} variant="outlined">
            Swap Source
          </Button>
        )}
      </Stack>
      <br />
      <Stack spacing={2} direction="row">
        <Button onClick={handlePlay} variant="contained">
          Play
        </Button>
        <Button onClick={handlePause} variant="outlined">
          Pause
        </Button>
      </Stack>
      {/* <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button> */}
      <p>Currently playing {sources[currentSrcIndex][0] + "/mp3"}</p>
    </div>
  );
};

export default SwapSource;
