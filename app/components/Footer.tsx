import React from "react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative w-full py-8 mt-auto">
            {/* Minimal border */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent"></div>

            {/* Ensure consistent width with content */}
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                <div className="flex justify-center">
                    <p className="text-xs text-white/50 tracking-wider uppercase">
                        {currentYear} • Pinkonomic • All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    );
}
