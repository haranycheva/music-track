import { z } from "zod";

const trackSchema = z
  .object({
    artist: z.string().min(1, { message: "Artist is required" }).max(25),
    title: z.string().min(1, { message: "Title is required" }).max(25),
    album: z.string().max(25).optional(),
    coverImage: z.string(),
    file: z.instanceof(File).optional(),
    genres: z
      .array(z.object({ label: z.string(), value: z.string() }))
      .min(1, { message: "At least one genre must be selected" }),
  })
  .superRefine(async (val, ctx) => {
    const url = val.coverImage.trim();

    if (!url) return;

    const isValidImage = await isImageUrl(url);

    if (!isValidImage) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "URL does not point to a valid image",
        path: ["coverImage"],
      });
    }
  });

async function isImageUrl(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000); // на всяк випадок

    const response = await fetch(url, {
      method: "GET",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const contentType = response.headers.get("Content-Type");

    return response.ok && contentType?.startsWith("image/");
  } catch (e) {
    return false;
  }
}

export default trackSchema;
