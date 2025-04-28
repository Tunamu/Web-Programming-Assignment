import GetPromoPage from "./GetPromoPage";
import MainSitePage from "./MainSitePage";

function MainPage() {
    const isLoggedIn = true;

    return isLoggedIn ? <MainSitePage /> : <GetPromoPage />
}

export default MainPage;