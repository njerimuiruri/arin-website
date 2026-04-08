import { NextRequest, NextResponse } from "next/server";

const CLOUDINARY_BASE = "https://res.cloudinary.com/dnhyhrkfg/raw/upload/arin/resources";

export async function GET(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    const filePath = params.path.join("/");
    const cloudinaryUrl = `${CLOUDINARY_BASE}/${filePath}`;

    try {
        const response = await fetch(cloudinaryUrl);

        if (!response.ok) {
            return new NextResponse("Resource not found", { status: response.status });
        }

        const contentType = response.headers.get("content-type") ?? "application/octet-stream";
        const contentLength = response.headers.get("content-length");
        const filename = params.path[params.path.length - 1];

        const disposition = request.nextUrl.searchParams.get("download") === "1"
            ? `attachment; filename="${filename}"`
            : `inline; filename="${filename}"`;

        const headers: Record<string, string> = {
            "Content-Type": contentType,
            "Content-Disposition": disposition,
            "Cache-Control": "public, max-age=86400",
        };

        if (contentLength) headers["Content-Length"] = contentLength;

        return new NextResponse(response.body, { headers });
    } catch {
        return new NextResponse("Failed to fetch resource", { status: 502 });
    }
}
