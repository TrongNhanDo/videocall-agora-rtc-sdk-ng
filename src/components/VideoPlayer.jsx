/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

export default function VideoPlayer({ user }) {
  const userRef = useRef(null);

  useEffect(() => {
    if (user && user.videoTrack) {
      user.videoTrack.play(userRef.current);
    }
  }, [user]);

  return (
    <div>
      UserID: {user.uid}
      <div ref={userRef} style={{ width: "400px", height: "400px" }}></div>
    </div>
  );
}
