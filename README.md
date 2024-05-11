# Cypress Video Uploader to S3 Server in Vue3

Hello,

Perhaps you also need to save executed test videos in Vue3 when Cypress tests are done and then upload them to your desired S3 server.
## Requirements :

- `@aws-sdk/client-s3` : https://www.npmjs.com/package/@aws-sdk/client-s3
- `Cypress` : https://www.npmjs.com/package/@aws-sdk/client-s3
- `Node.js`: https://nodejs.org/en

## Installation and Usage

1. Run the command `npm install`.
2. Enter your S3 server variables in the  "cypress.env.json" file.
3. Execute the command `npx cypress run` (tests will start running).
4. The test videos will be saved in "./cypress/videos" file.
5. Afterward, they will be uploaded to your S3 server.

## Configuration and Important Notes

- Read the file "cypress.config.ts".
- S3 server variables are located in the file "cypress.env.json".

