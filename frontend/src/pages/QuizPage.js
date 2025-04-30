import './QuizPage.css';
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

function QuizPage() {
    const [data, setData] = useState([]);
    const [dataIndex, setDataIndex] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [answers, setAnswers] = useState([]);
    const hasFetched = useRef(false);
    localStorage.setItem("score", "0");

    const navigate = useNavigate();

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            fetch('http://localhost:5001/api/Questions/StartQuiz')
                .then(res => res.json())
                .then(data => {
                    setData(data.questions);
                    setStartTime(Date.now());
                })
                .catch(error => console.log(error));
        }
    }, []);

    const AnswerFunc = (selectedAnswer) => {
        const endTime = Date.now();
        const questionTime = (endTime - startTime) / 1000;

        const currentQuestion = data[dataIndex];

        const answerData = {
            questionId: currentQuestion._id,
            selectedAnswer: selectedAnswer,
            correctAnswer: currentQuestion.correct_answer,
            timeTaken: questionTime
        };

        const newAnswers = [...answers, answerData];
        setAnswers(newAnswers);

        if (dataIndex + 1 < data.length) {
            setDataIndex(dataIndex + 1);
            setStartTime(Date.now());
        } else {
            submitAnswers(newAnswers);
        }
    };

    const submitAnswers = (answersToSend) => {
        fetch('http://localhost:5001/api/Quiz/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(answersToSend) //Buraya id de eklenecek
        })
            .then((res) => res.json())
            .then(result => {
                localStorage.setItem('score', result.score);
                navigate('/result');
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };


    function shuffleAnswers(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    if(data.length === 0){
        return <p className={"Load"}>Loading...</p>
    }

    const tempQuestion = data[dataIndex];

    return (
        <div>
                <div key={tempQuestion._id} className="Question-Section">
                    <h3>{dataIndex+1}) {tempQuestion.question}</h3>
                    <div className={"Question-Info"}>
                        <span>Difficulty: {tempQuestion.difficulty}</span>
                        <span>{tempQuestion.category}</span>
                    </div>
                    {tempQuestion.type === "boolean" ? (
                        <>
                            <button onClick={()=>AnswerFunc("True")}>True</button>
                            <button onClick={()=>AnswerFunc("False")}>False</button>
                        </>
                    ):(
                            shuffleAnswers([tempQuestion.correct_answer, ...tempQuestion.incorrect_answers]).map((answer, index) => (
                            <button key={index} onClick={() => AnswerFunc(answer)}>
                                {String.fromCharCode(65 + index)}: {answer}
                            </button>
                            ))
                    )}
                </div>
        </div>
    );
}

export default QuizPage;

//TODO giriş yapma session açacak ve bu skoru da sessiona atacağız session tutacak - şimdilik local storage yapıldı
//TODO en son on sorunun datası db'e gidip sonuç hesaplanacak sonra sonuç getirilecek ve leaderboard da gelecek.
//TODO giriş yapmayı aktif edip sessionlar aktif edilecek
//TODO pasport api entegrasyonu
//TODO passport api username belirleme olacak
//TODO password hashleme bakılacak
//TODO responsive tasarım
//TODO quiz bitim ekranı ve tekrar deneme butonu
