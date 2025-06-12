import React, { useState, useEffect } from 'react';

function TextPage() {
    const [data, setData] = useState([]);
    const [answers, setAnswers] = useState({});
    const [question, setQuestions] = useState(null)
    const std_id = localStorage.getItem("id");

    const Getdetails = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/fetch-all-anounve?student_id=${std_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            if (response.status === 200 && Array.isArray(result.data)) {
                setData(result.data);
            } else {
                alert(result?.message || "please try again");
            }
        } catch {
            alert("please try again");
        }
    };

    useEffect(() => {
        Getdetails();
    }, []);

    async function GetQuestions() {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/questions', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    std_id: Number(std_id)
                })
            });
            const result = await response.json();
            if (response.status === 200 && Array.isArray(result.data)) {
                setQuestions(result.data);
            } else {
                alert(result?.message || "please try again");
            }
        } catch {
            alert("please try again");
        }
    }
    useEffect(() => {
        GetQuestions();
    }, []);


    const handleOptionChange = (questionId, option) => {
        setAnswers(prev => ({ ...prev, [questionId]: option }));
    };

  const checkAnswer = async () => {
    if (Object.keys(answers).length === 0) {
        alert("Please select at least one answer before submitting.");
        return;
    }

    if (Object.keys(answers).length !== question.length) {
        const proceed = window.confirm("You haven't answered all questions. Submit anyway?");
        if (!proceed) return;
    }

    let score = 0;
    question.forEach(q => {
        if (answers[q.id] === q.answer) {
            score += 1;
        }
    });

    try {
        const response = await fetch("http://127.0.0.1:5000/api/answers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ student_id: std_id, answers, score }), // send score to backend
        });
        const result = await response.json();
        alert(result?.message);
    } catch (error) {
        console.error("Error submitting answers:", error);
        alert("Failed to submit answers.");
    }
};

    return (
        <div>
            <h1 className='text-gray-600 text-center p-1 m-1 text-2xl'>Answer the Questions</h1>
            {data.length === 0 ? (
                <p>No questions available.</p>
            ) : (
              
                <div>
                    {question.map(q => (
                        <div key={q.id} style={{ marginBottom: 20 }}>
                            <h3>{q.question}</h3>
                            {q.options && q.options.map(opt => (
                                <label key={opt} style={{ display: "block" }}>
                                    <input
                                        type="radio"
                                        name={`question_${q.id}`}
                                        value={opt}
                                        checked={answers[q.id] === opt}
                                        onChange={() => handleOptionChange(q.id, opt)}
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    ))}
                    <button onClick={checkAnswer}  className='text-xl bg-blue-950 text-white rounded-sm p-3 m-2 text-center' type="submit">Submit Answers</button>
        </div>
            )}
        </div>
    );
}

export default TextPage;