import './NavBar.css'
import { FaRegLightbulb } from "react-icons/fa";
import {useNavigate} from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();

    return (
        <div className="NavBar">
            <button className="NavBar-Left" onClick={()=>navigate("/")}>
                Quiss
                <FaRegLightbulb />
            </button>
            <button onClick={()=>navigate("/SignUp")} className={"SignUp-Login-Btn"}>SignUp / Login</button>
        </div>
    )
}

export default NavBar;