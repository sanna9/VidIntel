import mongoose, { Schema, models, model } from "mongoose";

const VideoSchema = new Schema(
  {
    title: { type: String, required: true },
    videoType: { type: String, enum: ["youtube", "file"], required: true },
    youtubeVideoId: { type: String },
    cloudinaryUrl: { type: String },
    thumbnail: { type: String, required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Video = models.Video || model("Video", VideoSchema);
export default Video;