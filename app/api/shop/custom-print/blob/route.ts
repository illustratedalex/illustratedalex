import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

export const runtime = "nodejs";

const MAX_BYTES = 10 * 1024 * 1024;

export async function POST(request: Request): Promise<Response> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json(
      { ok: false, draft: true, error: "Draft: wire BLOB_READ_WRITE_TOKEN to store uploads." },
      { status: 503 },
    );
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ["image/jpeg", "image/png", "image/webp"],
        maximumSizeInBytes: MAX_BYTES,
        addRandomSuffix: true,
      }),
      onUploadCompleted: async () => {
        // The browser sends the order details after the upload returns a URL.
      },
    });
    return Response.json(jsonResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload could not start.";
    return Response.json({ ok: false, error: message }, { status: 400 });
  }
}
