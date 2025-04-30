import GetPromoPage from "./GetPromoPage";
import HomePage from "./HomePage";

function MainPage() {
    const isLoggedIn = true;

    return isLoggedIn ? <HomePage /> : <GetPromoPage />
}

export default MainPage;