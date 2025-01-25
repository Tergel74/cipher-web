"use client";
import { useState } from "react";

export default function Home() {
    const [text, setText] = useState("");
    const [key, setKey] = useState<number>(0);
    const [output, setOutput] = useState("");
    const [showCopyNotification, setShowCopyNotification] = useState(false);
    const [isEncryptMode, setIsEncryptMode] = useState(true);

    const processText = (input: string, currentKey: number) => {
        if (!input) {
            setOutput("");
            return;
        }

        let msg = "";
        for (const letter of input) {
            msg += String.fromCharCode(
                letter.charCodeAt(0) +
                    (isEncryptMode ? currentKey : -currentKey)
            );
        }
        setOutput(msg);
    };

    // Update the text and process it immediately
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newText = e.target.value;
        setText(newText);
        processText(newText, key);
    };

    // Update the key and process with new key
    const handleKeyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newKey = Number(e.target.value);
        setKey(newKey);
        processText(text, newKey);
    };

    // Toggle mode and reprocess text
    const toggleMode = () => {
        setIsEncryptMode((prevMode) => {
            // Process text with the new mode immediately
            let msg = "";
            for (const letter of text) {
                msg += String.fromCharCode(
                    letter.charCodeAt(0) + (!prevMode ? key : -key)
                );
            }
            setOutput(msg);
            return !prevMode;
        });
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setShowCopyNotification(true);
        setTimeout(() => {
            setShowCopyNotification(false);
        }, 2000); // Hide notification after 2 seconds
    };

    return (
        <>
            <main className="min-h-screen flex items-center justify-center p-4 transition-colors duration-200 bg-slate-200 dark:bg-background">
                <div className="w-full max-w-2xl p-6 rounded-lg shadow-lg transition-colors duration-200 bg-card border border-border">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-foreground">
                            Text Encryptor
                        </h1>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                                {isEncryptMode ? "Encrypt" : "Decrypt"}
                            </span>
                            <button
                                onClick={toggleMode}
                                className={`w-14 h-7 rounded-full relative transition-colors duration-200 ease-in-out ${
                                    isEncryptMode
                                        ? "bg-primary"
                                        : "bg-slate-500"
                                }`}
                            >
                                <div
                                    className="absolute w-5 h-5 rounded-full bg-white left-1 top-1 transition-transform duration-200 ease-in-out"
                                    style={{
                                        transform: isEncryptMode
                                            ? "translateX(28px)"
                                            : "translateX(0)",
                                    }}
                                />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="flex gap-2 w-full">
                                <input
                                    type="text"
                                    className="flex-grow p-2 border rounded-md border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 ring-ring focus:outline-none transition-colors duration-200"
                                    placeholder="Enter text..."
                                    value={text}
                                    onChange={handleTextChange}
                                />
                                <select
                                    className="w-20 p-2 border rounded-md border-input bg-background text-foreground focus:ring-2 ring-ring focus:outline-none transition-colors duration-200"
                                    value={key}
                                    onChange={handleKeyChange}
                                >
                                    {[...Array(26)].map((_, i) => (
                                        <option key={i} value={i}>
                                            {i}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex gap-2 w-full">
                                <div className="flex-grow p-2 border rounded-md border-input bg-muted text-muted-foreground min-h-[40px] break-words w-40">
                                    {output ? (
                                        output
                                    ) : (
                                        <span className="text-muted-foreground">
                                            Output is empty
                                        </span>
                                    )}
                                </div>
                                <button
                                    onClick={copyToClipboard}
                                    className={`px-3 py-2 w-20 rounded whitespace-nowrap transition-colors duration-200 ${
                                        output
                                            ? "bg-primary text-primary-foreground hover:opacity-90"
                                            : "bg-muted text-muted-foreground cursor-not-allowed"
                                    }`}
                                    disabled={!output}
                                >
                                    Copy
                                </button>
                            </div>
                        </div>
                    </div>

                    {showCopyNotification && (
                        <div className="fixed top-4 left-4 bg-primary text-white text-popover-foreground px-4 py-2 rounded-md shadow-lg">
                            Copied to clipboard!
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
