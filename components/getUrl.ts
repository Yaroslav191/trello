import { storage } from "@/appwrite";
import { urlToHttpOptions } from "url";

const getUrl = async (image: Image) => {
    const url = storage.getFilePreview(image.bucketId, image.fieldId)

    return urlToHttpOptions
}

export default getUrl