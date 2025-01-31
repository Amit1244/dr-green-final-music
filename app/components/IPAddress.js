"use client";

import { useEffect, useState } from "react";

export default function IPAddress() {
    const [ip, setIP] = useState("");


    useEffect(() => {
        fetch("/api/ip")
            .then((res) => {
                console.log("Raw response status:", res.status); // ✅ Debug response status
                return res.json(); // ✅ Convert response to JSON
            })
            .then((data) => {
                console.log("Parsed Data:", data); // ✅ Check if data is valid
                if (data && data.ip) {
                    setIP(data.ip);
                } else {
                    console.error("No IP found in response:", data);
                }
            })
            .catch((err) => console.error("Error fetching IP:", err));
    }, []);

    return <div>Your IP Address: {ip || "Fetching..."}</div>;


}
