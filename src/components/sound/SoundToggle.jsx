import { useEffect, useState } from "react";
import { MdVolumeOff, MdVolumeUp } from "react-icons/md";
import { isSoundEnabled, playUiSound, setSoundEnabled } from "../../utils/sound";
import "./soundToggle.css";

const SoundToggle = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(isSoundEnabled());
  }, []);

  const toggleSound = () => {
    const nextValue = !enabled;
    setSoundEnabled(nextValue);
    setEnabled(nextValue);

    if (nextValue) {
      window.setTimeout(() => playUiSound("click"), 0);
    }
  };

  return (
    <button
      className="sound-toggle"
      type="button"
      onClick={toggleSound}
      aria-label={enabled ? "Mute interface sounds" : "Unmute interface sounds"}
      title={enabled ? "Mute sound" : "Unmute sound"}
    >
      {enabled ? <MdVolumeUp /> : <MdVolumeOff />}
      <span>{enabled ? "Sound On" : "Sound Off"}</span>
    </button>
  );
};

export default SoundToggle;
