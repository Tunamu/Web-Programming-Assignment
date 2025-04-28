import './MainSitePage.css';
import { useEffect, useState } from "react";

function MainSitePage() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5001/api/Questions')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            {data ? (
                <ul>
                    {data.questions.map((item, index) => (
                        <li key={index}>{item.correct_answer}</li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default MainSitePage;
