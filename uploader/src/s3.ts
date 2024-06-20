import { S3 } from "aws-sdk"
import fs from "fs"
import { S3_KEY, S3_SECRET, AWS_REGION } from "./conf"
import { IUploadFile } from "./interface"

const s3 = new S3({
    accessKeyId: S3_KEY,
    secretAccessKey: S3_SECRET,
    region: AWS_REGION  
})

export const uploadSingleFile = async ({ name, path }: IUploadFile) => {
    async function readFile(path: string) {
        try {
            const content = await fs.promises.readFile(path)
            return content
        } catch (error: any) {
            throw new Error(error)
        }
    }
    const content = await readFile(path)
    const res = await s3.upload({
        Body: content,
        Bucket: "vercel-aws-bucket",
        Key: name
    }).promise()
    console.log(res)
    return res
}