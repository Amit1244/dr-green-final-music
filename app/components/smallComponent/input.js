"use client"; // Mark this as a Client Component

import { useState, useRef, useEffect } from "react";

export default function InteractiveCheckbox() {
    const [isChecked, setIsChecked] = useState(false); // State for the checkbox
    const audioRef = useRef(null); // Use a ref to store the audio instance

    useEffect(() => {
        // Initialize the audio reference in the client environment
        if (typeof window !== "undefined") {
            audioRef.current = new Audio("/videos/ring.mp3");
        }
    }, []);

    const handleToggle = () => {
        setIsChecked((prev) => !prev); // Toggle the checkbox state

        if (audioRef.current) {
            if (!isChecked) {
                audioRef.current.play(); // Play audio
            } else {
                audioRef.current.pause(); // Pause audio
                audioRef.current.currentTime = 0; // Reset to start
            }
        }
    };

    return (
        <input
            type="checkbox"
            value=""
            checked={isChecked}
            className="sr-only peer"
            onChange={handleToggle} // Use onChange instead of onClick
        />
    );
}
