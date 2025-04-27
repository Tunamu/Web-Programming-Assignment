import GetPromoPage from "./GetPromoPage";
import MainSitePage from "./MainSitePage";

function MainPage() {
    const isLoggedIn = false;

    return isLoggedIn ? <MainSitePage /> : <GetPromoPage />
}

export default MainPage;