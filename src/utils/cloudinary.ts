const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dtzmeoxdz/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "reimbit_unsigned";

export interface CloudinaryUploadResponse {
    secure_url: string;
    public_id: string;
    original_filename: string;
    format: string;
    bytes: number;
    width: number;
    height: number;
}

export async function uploadToCloudinary(file: File): Promise<CloudinaryUploadResponse> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error?.message || `Upload failed with status ${response.status}`);
    }

    return response.json();
}
