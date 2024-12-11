import React from 'react';
import useSound from 'use-sound';
import Sound from "../assets/audio/bell.mp3";

export const Audio: React.FC = () => {
  const [play] = useSound(Sound);

  React.useEffect(() => {
    play();
  }, [play]);

  return null;
};