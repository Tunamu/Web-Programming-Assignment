import './SignUpPage.css'
import {useState} from "react";

function SignUpPage() {
    const [UserInfo, setUserInfo] = useState({
        username: '',
        email: "",
        password: "",
        password_confirmation: "",
    });

    return (
        <div>
            SignUp Page
        </div>
    )
}

export default SignUpPage;