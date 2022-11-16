import { s3IConfig } from "./types";


export const s3Config: s3IConfig = {
    bucketName:  process.env.REACT_APP_AWS_S3_BUCKET_NAME!,
    // dirName: 'directory-name',      /* Optional */
    region: process.env.REACT_APP_AWS_REGION!,
    accessKeyId: process.env.REACT_APP_AWS_Access_Key_ID!,
    secretAccessKey: process.env.REACT_APP_AWS_Secret_Access_Key!,
    s3Url: "https://owl-go.s3.amazonaws.com"     /* Optional */
}