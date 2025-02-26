import { useState } from "react";

const VideoUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>(""); // Polje za naslov
  const [tutorialId, setTutorialId] = useState<number | string>(""); // Polje za Tutorial ID

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoTitle(event.target.value); // Ažuriraj naslov
  };

  const handleTutorialChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTutorialId(event.target.value); // Ažuriraj Tutorial ID
  };

  const handleUpload = async () => {
    if (!selectedFile || !videoTitle || !tutorialId) {
      alert("Molimo vas da popunite sve podatke.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", videoTitle); // Dodavanje naslova
    formData.append("tutorialId", tutorialId.toString()); // Dodavanje Tutorial ID-a

    try {
      const response = await fetch("http://localhost:5211/api/Video/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const baseUrl = "http://localhost:5211";
        setUploadedVideo(`${baseUrl}${data.path}`); // Postavljanje URL-a videa
      } else {
        alert("Greška pri uploadu videa.");
      }
    } catch (error) {
      console.error("Greška:", error);
    }
  };

  return (
    <div style={{margin:"10px"}}>
      <input
        type="text"
        placeholder="Unesite naslov videa"
        value={videoTitle}
        onChange={handleTitleChange} // Ažuriraj naslov
      />
      <br />
      <input
        type="text"
        placeholder="Unesite Tutorial ID"
        value={tutorialId}
        onChange={handleTutorialChange} // Ažuriraj Tutorial ID
      />
      <br />
      <input
        type="file"
        accept="video/mp4,video/webm,video/ogg"
        onChange={handleFileChange} // Dodajemo video fajl
      />
      <button onClick={handleUpload}>Upload Video</button>

      {uploadedVideo && (
        <div>
          <h3>{videoTitle || "Video"} je uspešno uploadovan:</h3>
          <video width="100" controls>
            <source src={uploadedVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
