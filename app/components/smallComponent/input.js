// components/InteractiveCheckbox.js
"use client"; // Mark this as a Client Component

import { useState, useRef } from "react";

export default function InteractiveCheckbox() {
    const [isChecked, setIsChecked] = useState(false); // State for the checkbox
    const audioRef = useRef(new Audio("/videos/ring.mp3")); // Audio file reference

    const handleToggle = () => {
        setIsChecked(!isChecked); // Toggle the checkbox state

        if (!isChecked) {
            audioRef.current.play(); // Play audio
        } else {
            audioRef.current.pause(); // Pause audio
            audioRef.current.currentTime = 0; // Reset to start
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
