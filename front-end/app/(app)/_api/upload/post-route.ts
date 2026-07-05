
import { PutObjectCommand } from "@aws-sdk/client-s3";
import {  getS3Client} from "@/lib/sotrj"
import { OrcamentoAnexo } from "@/lib/types";
import { getStorjBuckt, getStorjInfos } from "@/services/storj";

export async function uploadFiles(anexos: OrcamentoAnexo[]) {



  const uploadedFiles = [];

  for (const anexo of anexos) {
    const buffer = Buffer.from(await anexo.arquivo.arrayBuffer());

    const key = `quotes/${Date.now()}-${anexo.nome}`;
    const storBuckt = await getStorjBuckt()
    const storDatas = await getStorjInfos()
    const s3 = await getS3Client();

    await s3.send(
      new PutObjectCommand({
        Bucket: await getStorjBuckt(),
        Key: key,
        Body: buffer,
        ContentType: anexo.tipo,
      })
    );

    uploadedFiles.push({
      url: `${storDatas.endpoint}/${storBuckt}/${key}`,
      key,
      fileName: anexo.nome,
      fileType: anexo.tipo
    });
  }


  return uploadedFiles;
}