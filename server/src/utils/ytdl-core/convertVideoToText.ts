import ytdl from "ytdl-core";
import fs from "fs";

interface VideoFormat {
  audioBitrate?: number;
  container?: string;
}

export const convertToAudio = (videoUrl: string): Promise<string> => {
  const outputPath = "audio.mp3";
  return new Promise((resolve, reject) => {
    ytdl(videoUrl, {
      filter: (format: VideoFormat): boolean =>
        !!format.audioBitrate && format.container === "mp4",
      quality: "highestaudio",
    })
      .on("error", (err: Error) => {
        reject(err);
      })
      .pipe(fs.createWriteStream(outputPath))
      .on("finish", () => {
        resolve(outputPath);
      })
      .on("error", (err: Error) => {
        reject(err);
      });
  });
};
