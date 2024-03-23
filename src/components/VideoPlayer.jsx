/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef } from "react";

export default function VideoPlayer({ user }) {
  const userRef = useRef(null);

  const mainUser = useMemo(() => {
    return user;
  }, [user]);

  useEffect(() => {
    if (mainUser && mainUser.videoTrack) {
      mainUser.videoTrack.play(userRef.current);
    }
  }, [mainUser]);

  console.log({ mainUser });

  return (
    <div>
      UserID: {mainUser.uid}
      <div ref={userRef} style={{ width: "400px", height: "400px" }}></div>
    </div>
  );
}
