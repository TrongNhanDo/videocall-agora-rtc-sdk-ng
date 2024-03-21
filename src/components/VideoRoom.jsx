import AgoraRTC from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";

export default function VideoRoom() {
  const APP_ID = import.meta.env.VITE_APP_ID;
  const TOKEN = import.meta.env.VITE_TOKEN;
  const CHANNEL = import.meta.env.VITE_CHANNEL;
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);

  const client = AgoraRTC.createClient({
    mode: "rtc",
    codec: "vp8",
  });

  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);

    if (mediaType === "video") {
      setUsers((prev) => [...prev, user]);
    }

    if (mediaType === "audio") {
      user.audioTrack.play();
    }
  };

  const handleUserLeft = (user) => {
    setUsers((pre) => pre.filter((item) => item.uid !== user.uid));
  };

  useEffect(() => {
    client.on("user-published", handleUserJoined);

    client.on("user-left", handleUserLeft);

    client
      .join(APP_ID, CHANNEL, TOKEN, null)
      .then((uid) =>
        Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
      )
      .then(([tracks, uid]) => {
        const [audioTrack, videoTrack] = tracks;
        setLocalTracks(tracks);
        setUsers((prev) => [
          ...prev,
          {
            uid,
            videoTrack,
            audioTrack,
          },
        ]);
        client.publish(tracks);
      });

    return () => {
      for (let localTract of localTracks) {
        localTract.stop();
        localTract.close();
      }

      client.on("user-published", handleUserJoined);
      client.on("user-left", handleUserLeft);
      client.unpublish(localTracks).then(() => client.leave());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <h2>VIDEO ROOM</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 400px)" }}>
        {users.map((value, index) => {
          return (
            <div key={index}>
              <VideoPlayer key={value.uid} user={users} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
