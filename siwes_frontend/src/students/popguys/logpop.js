import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

export const Logbookpop = ({ is_active, is_close }) => {
    const [establishmnt, setEstablishment] = useState("");
    const [institution, setInstitution] = useState("");
    const [address, setAddress] = useState("");
    const _id = localStorage.getItem("id");
    const navigate = useNavigate();
    
    const upload = async () => {
        if (!establishmnt || !institution || !address) {
            return alert("please fill the update");
        }
        try {
            const response = await fetch("http://127.0.0.1:5000/create-logbook", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    establishment: establishmnt,
                    institution: institution,
                    address: address,
                    student_id: _id
                })
            });
            const data = await response.json();
            alert(data?.message || "Response received");
            if (response.ok && is_close) is_close();
        } catch {
            alert("An error occurred");
        }
    };

    if (!is_active) return null;

    return (
        <div style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
        }}>
            <div style={{
                background: "white",
                padding: 32,
                borderRadius: 8,
                minWidth: 350,
                maxWidth: 400,
                boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
                position: "relative"
            }}>
                <button
                    onClick={is_close}
                    style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        background: "transparent",
                        border: "none",
                        fontSize: 20,
                        cursor: "pointer"
                    }}
                    aria-label="Close"
                >
                    ×
                </button>
                <h2 style={{ marginBottom: 16 }}>Create Logbook</h2>
                <input
                    value={establishmnt}
                    onChange={(e) => setEstablishment(e.target.value)}
                    style={{
                        padding: 10,
                        margin: "8px 0",
                        width: "100%",
                        borderWidth: 0.5,
                        borderRadius: 4
                    }}
                    placeholder="Enter your establishment"
                />
                <input
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    style={{
                        padding: 10,
                        margin: "8px 0",
                        width: "100%",
                        borderWidth: 0.5,
                        borderRadius: 4
                    }}
                    placeholder="Enter your institution"
                />
                <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{
                        padding: 10,
                        margin: "8px 0",
                        width: "100%",
                        borderWidth: 0.5,
                        borderRadius: 4
                    }}
                    placeholder="Enter your address"
                />
                <button
                    onClick={upload}
                    style={{
                        marginTop: 16,
                        padding: "10px 20px",
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        borderRadius: 4,
                        cursor: "pointer",
                        width: "100%",
                        fontWeight: "bold"
                    }}
                >
                    Start...
                </button>
            </div>
        </div>
    );
};