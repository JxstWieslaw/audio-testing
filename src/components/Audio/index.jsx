import "./fullcontrol.css";
import FullControl from "./FullControl";
import SwapSource from "./SwapSource";

function Audio() {
  return (
    <>
      <div className="container">
        <div className="audio-controls">
          <FullControl />
          <SwapSource />
        </div>
      </div>
    </>
  );
}
