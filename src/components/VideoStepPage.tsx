import React, {useRef, useState} from 'react';
import ReactPlayer, {ReactPlayerProps} from 'react-player';
import '../global-fonts.scss';
import '../global-reset.scss';
import '../global-base.scss';
import s from '../styles/tutorial.module.scss';
import sv from '../styles/video.module.scss';
import {TutorialContentPage} from './TutorialFlow';

export const VideoStepPage = ({
  onDone,
  setButtonText,
  page,
}: {
  onDone: any;
  setButtonText: (str: string) => void;
  page: TutorialContentPage;
}) => {
  const playerRef = useRef(null as null | ReactPlayer);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [ended, setEnded] = useState(false);

  const getPlayer = () => {
    return playerRef.current?.getInternalPlayer();
  };

  const handleReady = () => {
    const player = getPlayer();
    if (!player) return;
    setPlaying(!player.paused);
    setMuted(player.muted);
  };

  const handleVideoClick = (e: any) => {
    e.stopPropagation();
    if (ended) return;
    const player = getPlayer();
    if (!player) return;
    // console.log('handleVideoClick', player);
    if (player.paused) {
      player.play();
    } else {
      player.pause();
    }
  };

  const handleMuteClick = (e: any) => {
    e.stopPropagation();
    const player = getPlayer();
    if (!player) return;
    // console.log('handleMuteClick');
    player.muted = !player.muted;
    setMuted(player.muted);
  };

  const handleProgress: ReactPlayerProps['onProgress'] = (progress) => {
    // console.log('progress', progress.playedSeconds);
    const secondsLeft = Math.floor(Math.max(duration - progress.playedSeconds, 0));
    if (playing && secondsLeft > 0) {
      setButtonText(`${secondsLeft} seconds remaining...`);
    } else {
      setButtonText('Watch video to continue');
    }
  };

  const handleDuration = (duration: number) => {
    // console.log('duration', duration);
    setDuration(duration);
  };

  const handlePlay = () => {
    // console.log('handlePlay');
    setPlaying(true);
  };

  const handlePause = () => {
    // console.log('handlePause');
    setPlaying(false);
  };

  const handleEnded = () => {
    onDone();
    setEnded(true);
  };

  return (
    <div>
      <div onClick={handleVideoClick} className={sv.video_container}>
        <ReactPlayer
          ref={playerRef}
          width="100%"
          playsinline
          height="auto"
          className={sv.video}
          url={page.video_playback_url || ''}
          onReady={handleReady}
          onEnded={handleEnded}
          onProgress={handleProgress}
          onDuration={handleDuration}
          onPlay={handlePlay}
          onPause={handlePause}
          controls={false}
        />
        {!ended && (
          <div className={sv.controls_container}>
            {!playing && (
              <div className={sv.play}>
                <span className={sv.play_icon} />
                <span>Play Video</span>
              </div>
            )}
            {(!playing || muted) && (
              <div onClick={handleMuteClick} className={sv.mute}>
                <span>{muted ? 'UNMUTE' : 'MUTE'}</span>
              </div>
            )}
          </div>
        )}
      </div>
      <div>
        <h1 className={s.p_title}> {page.title} </h1>
        <p className={s.p_body}>{page.description}</p>
      </div>
    </div>
  );
};
