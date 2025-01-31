export async function GET(req) {
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : req.ip;

    return Response.json({ ip });
}
