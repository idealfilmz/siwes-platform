import React from 'react';
import { useState } from 'react';


function TextPage() {
    const [data, setData] = useState(null)
    var std_id = localStorage.getItem("id")
    const Getdetails = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/fetch-all-anounve?student_id=${std_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
            );
            const data = await response.json();

            if (response.status === 200) {
                setData(data)
            }
            alert(data?.message || "please try again")
            return;
        }

        catch {
            alert("please try again")
            return;
        }

    }


    useState(() => {
        Getdetails();
    }, [])

    console.log(data)
    return (
        <div>
            <h1>Hello</h1>
            <p>Welcome to the Hello Page!</p>
        </div>
    );
}

export default TextPage;