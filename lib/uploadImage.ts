"use server";

export async function uploadImage(file: File) {
  try {
    const formData = new FormData();
    formData.append(
      "file",
      `data:${file.type};base64,${Buffer.from(
        await file.arrayBuffer()
      ).toString("base64")}`
    );
    formData.append("upload_preset", "techno");
    formData.append("api_key", process.env.CLOUDINARY_API_KEY!);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Upload response:", data); // For debugging

    return { url: data.secure_url, success: true };
  } catch (error) {
    console.error("Upload error:", error);
    return { error: "Failed to upload image", success: false };
  }
}
