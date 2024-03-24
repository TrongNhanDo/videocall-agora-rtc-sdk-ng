/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

export default function VideoPlayer({ user, tracks, handleQuit }) {
  const userRef = useRef(null);

  useEffect(() => {
    if (user && user.videoTrack) {
      user.videoTrack.play(userRef.current);
    }
  }, [user]);

  return (
    <div className="videoPlayer" key={user.uid}>
      <div className="userInfo">UserID: {user.uid}</div>
      <div className="video" ref={userRef}></div>
      <div className="divBtn">
        <button type="button" onClick={() => handleQuit(tracks, user)}>
          Quit Room
        </button>
      </div>
    </div>
  );
}
