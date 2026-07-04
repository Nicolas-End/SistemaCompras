
import { getStorjInfos } from "@/services/storj";
import { S3Client } from "@aws-sdk/client-s3";

export async function getS3Client() {
  const storj = await getStorjInfos();

  return new S3Client({
    endpoint: storj.endpoint,
    region: "us-east-1",
    credentials: {
      accessKeyId: storj.accessKey,
      secretAccessKey: storj.secretKey,
    },
  });
}