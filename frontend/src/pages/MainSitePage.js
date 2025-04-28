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

//şimdi burada başlat dedikten (ne kadar hızlı o kadar iyi diyecek vs) sonra 10 soru çekecek ve sırasıyla gösterecek her sorunun sayacı olacak ve cevap tuşuna bastığında basana kadarki süreyi ve cevabı alacak en son on sorunun datası db'e gidip sonuç hesaplanacak sonra sonuç getirilecek ve leaderboard da gelecek.
//giriş yap aktif edilecek ve çözüldüğünde hesaplanan puan kişiye kaydedilecek
//password hashleme bakılacak
//leaderboard içindb azalana göre sıralayıp ekrana getirilecek
//facebook ile giriş passport api yapılacak
//responsive tasarım
//session ve local storage implementasyonu yapılacak