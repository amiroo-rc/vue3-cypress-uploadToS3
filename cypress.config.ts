import { defineConfig } from "cypress";
import { S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";

export default defineConfig({
  component: {
    viewportHeight: 800,
    viewportWidth: 1600,
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
    specPattern: "cypress/component/**/*.{js,jsx,ts,tsx}",
  },
  video: true,
  videosFolder: "cypress/videos",
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    setupNodeEvents(on, config) {
      on("after:spec", () => {
        const videosFolder = config.videosFolder;
        let AllFiles: Array<any> = [];
        fs.readdir(videosFolder, (err, files) => {
          if (err) {
            console.log(err);
          } else {
            AllFiles = files.map((file) => ({
              name: file,
              data: fs.readFileSync(`${videosFolder}/${file}`),
            }));
            AllFiles.forEach((videoFileName) => {
              const credentials = {
                accessKeyId: config.env.S3_ACCESS_KEY,
                secretAccessKey:
                  config.env.S3_SECRET_KEY,
              };
              const s3Client = new S3Client({
                endpoint: config.env.S3_ENDPOINT_URL,
                credentials: credentials,
                region: "asia",
              });
              return s3Client.send(
                new PutObjectCommand({
                  Bucket: config.env.S3_BUCKET_NAME,
                  Key: "cypress/" + videoFileName.name,
                  Body: videoFileName.data,
                  ContentType: "video/mp4",
                })
              );
            });
          }
        });
      });
    },
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}'
  }
})
