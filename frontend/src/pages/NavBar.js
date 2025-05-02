import './NavBar.css'
import { FaRegLightbulb } from "react-icons/fa";
import {useNavigate} from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.setItem("isAuthorised", "false");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("score");
        navigate("/");
    }

    return (
        <div className="NavBar">
            <button className="NavBar-Left" onClick={()=> {
                sessionStorage.getItem("isAuthorised")==="true" ?navigate("/Home"):navigate("/");
            }}>
                Quiss
                <FaRegLightbulb />
            </button>
            <div>
                {sessionStorage.getItem("isAuthorised")==="true" ? (
                    <button onClick={()=>handleLogout()} className={"SignUp-Login-Btn"}>Logout</button>
                ):(
                    <button onClick={()=>navigate("/SignUp")} className={"SignUp-Login-Btn"}>SignUp / Login</button>
                )}
            </div>
        </div>
    )
}

export default NavBar;