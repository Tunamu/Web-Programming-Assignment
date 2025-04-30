import './ResultPage.css'

function ResultPage() {
    const score = localStorage.getItem("score")
    return (
        <div>
            {score}
        </div>
    )
}

export default ResultPage;