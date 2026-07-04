"use server"

export async function getStorjBuckt (){
  return process.env.STORJ_BUCKET

  
}

export async function getStorjInfos():Promise<{secretKey:string ,accessKey:string, endpoint:string}> {
    
    return {
        secretKey: process.env.STORJ_SECRET_KEY ? process.env.STORJ_SECRET_KEY : "",
        accessKey: process.env.STORJ_ACCESS_KEY ? process.env.STORJ_ACCESS_KEY : "",
        endpoint: process.env.STORJ_ENDPOINT ? process.env.STORJ_ENDPOINT : ""
    }
}