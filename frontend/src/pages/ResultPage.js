import './ResultPage.css'

function ResultPage() {
    const score = sessionStorage.getItem("score")
    const username = sessionStorage.getItem("username")
    return (
        <div>
            {sessionStorage.getItem("isAuthorised")==="true" ? (
                <div>
                    {username}'s new score is: {score}!!!
                </div>
            ):(
                <div>
                    <h2 className={"Question-Section"}>User not authorised!</h2>
                </div>
            )}
        </div>
    )
}

export default ResultPage;