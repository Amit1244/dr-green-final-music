"use client";

import { useEffect, useState } from "react";

export default function IPAddress() {
    const [ip, setIP] = useState("");

    useEffect(() => {
        fetch("/api/ip")
            .then((res) => {
                console.log("Raw response:", res.json()); // Debugging response
                return res.json(); // ✅ Return JSON to the next .then()
            })
            .then((data) => {
                console.log("Parsed Data:", data); // Debugging data
                setIP(data.ip);
            })
            .catch((err) => console.error("Error fetching IP:", err));
    }, []);

    return <div>Your IP Address: {ip}</div>;
}
