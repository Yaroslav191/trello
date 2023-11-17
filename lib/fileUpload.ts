import {ID, storage} from '@/appwrite';

const uploadImage = async(file: File) => {
    if(!file) return;

    const fileUpload = await storage.createFile(
        '6547c643068e60d9900b',
        ID.unique(),
        file
    )

    return fileUpload
}

export default uploadImage