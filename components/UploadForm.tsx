"use client";

import { useState } from "react";

export default function UploadForm() {
  const [activeTab, setActiveTab] = useState<"youtube" | "file">("youtube");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

const handleUpload = async () => {
  // Youtube tab
  if (activeTab === "youtube" && youtubeUrl) {
    setUploading(true);
    setResultUrl(null);

    try {
      const res = await fetch("/api/youtube-metadata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: youtubeUrl }),
      });
      const data = await res.json();

      if (data.error) {
        alert("Error: " + data.error);
        return;
      }

      //save video entry to mongodb
      const saveRes = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          videoType: "youtube",
          youtubeVideoId: data.videoId,
          thumbnail: data.thumbnail,
        }),
      });
      const saveData = await saveRes.json();
      console.log("Saved video:", saveData);

      setResultUrl(data.thumbnail);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
    return;
  }

  // File tab
  if (activeTab === "file" && selectedFile) {
    setUploading(true);
    setResultUrl(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!data.result?.secure_url) {
        console.error(data.error);
        return;
      }

      // save video entry to mongodb
      const saveRes = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: selectedFile.name,
          videoType: "file",
          cloudinaryUrl: data.result.secure_url,
          thumbnail: data.result.secure_url,
        }),
      });
      const saveData = await saveRes.json();
      console.log("Saved video:", saveData);

      setResultUrl(data.result.secure_url);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  }
};

  return (
    <div className="mx-auto max-w-xl w-500 h-100 rounded-2xl bg-white p-8 shadow-md">
      <h2 className="mb-6 text-xl font-bold text-gray-900">Upload a Video</h2>

      <div className="mb-6 flex rounded-lg bg-gray-100 p-1">
        <button
          onClick={() => setActiveTab("youtube")}
          className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
            activeTab === "youtube"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Paste YouTube Link
        </button>
        <button
          onClick={() => setActiveTab("file")}
          className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
            activeTab === "file"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Upload File
        </button>
      </div>

      {activeTab === "youtube" && (
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium text-gray-700">
            YouTube URL
          </label>
          <input
            type="text"
            placeholder="https://www.youtube.com/watch?v=..."
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>
      )}

      {activeTab === "file" && (
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium text-gray-700">
            Select a video file
          </label>
          <div className="flex items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-6">
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
              className="text-sm text-gray-600"
            />
          </div>
          {selectedFile && (
            <p className="text-sm text-gray-500">
              Selected: {selectedFile.name}
            </p>
          )}
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="mt-6 w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {resultUrl && (
        <div className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-700">
          Upload successful!{" "}
          <a href={resultUrl} target="_blank" className="underline">
            View video
          </a>
        </div>
      )}
    </div>
  );
}