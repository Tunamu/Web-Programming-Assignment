import './MainSitePage.css';
import { useEffect, useState } from "react";

function MainSitePage() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5001/api/Questions/Quiz')
            .then(res => res.json())
            .then(data => setData(data.questions))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            {data ? (data.map((questionObj) => (
                <div key={questionObj._id} className="Question-Section">
                    <h3>{questionObj.question}</h3>
                    <div className={"Question-Info"}>
                        <span>Difficulty: {questionObj.difficulty}</span>
                        <span>{questionObj.category}</span>
                    </div>
                    {questionObj.type === "boolean" ? (
                        <>
                            <button>True</button>
                            <button>False</button>
                        </>
                    ):(
                        <>
                            <button>A: {questionObj.correct_answer}</button>
                            <button>B: {questionObj.incorrect_answers[0]}</button>
                            <button>C: {questionObj.incorrect_answers[1]}</button>
                            <button>D: {questionObj.incorrect_answers[2]}</button>
                        </>
                    )}
                </div>
            ))) : (<p className={"Load"}>Loading...</p>)}
        </div>
    );
}

export default MainSitePage;
