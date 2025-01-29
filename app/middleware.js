export { default } from "next-auth/middleware";
import { NextRequest, NextResponse } from 'next/server';

export const config = { matcher: ["/dashboard", "/product"] };

export function middleware(req) {
    // Access Vercel's geolocation data
    const countryCode = req.geo?.country || "Unknown";

    // Set country code in cookies (for frontend access)
    const res = NextResponse.next();
    console.log('countryCode :>> ', countryCode);
    res.cookies.set('countryCode', countryCode, { path: '/' });  // Set countryCode in cookies

    return res;
}