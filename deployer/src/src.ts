import { S3 } from "aws-sdk"
import fs from "fs"
import path from "path"

const s3 = new S3({
    accessKeyId: process.env.S3_KEY,
    secretAccessKey: process.env.S3_SECRET,
    region: process.env.AWS_REGION
})

export async function pullS3Files(folderPath: string) {
    
}