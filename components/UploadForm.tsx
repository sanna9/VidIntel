"use client";

import { useState } from "react";

export default function UploadForm() {
  const [activeTab, setActiveTab] = useState<"youtube" | "file">("youtube");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <div className="mx-auto max-w-xl w-100 h-100 rounded-2xl bg-white p-8 shadow-md">
      <h2 className="mb-6 text-xl font-bold text-gray-900">Upload a Video</h2>

      {/* Tab buttons */}
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
              className="text-sm text-gray-600 "
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
        className="mt-6 w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Upload
      </button>
    </div>
  );
}