import { createClient, commandOptions } from "redis"
const redisQueue = createClient()
redisQueue.connect()

async function main() {
    while(true) {
        const res =  await redisQueue.rPop(
            commandOptions({
                isolated: true
            }),
            "redisQueue"
        )
        const fileId = res.element
        await pullS3Files(`/output/${fileId}`)
    }
}