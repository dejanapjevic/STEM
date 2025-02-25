import { useState, useEffect } from "react";

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5211/api/video")
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch((error) => console.error("Greška:", error));
  }, []);

  return (
    <div>
      {videos.length === 0 && <p>Nema videa.</p>}
      {videos.map((video, index) => (
        <div key={index}>
          <video width="600" controls>
            <source src={`http://localhost:5211${video}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
