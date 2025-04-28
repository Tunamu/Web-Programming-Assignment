import './SignUpPage.css'
import {useEffect, useState} from "react";

function SignUpPage() {
    const [UserInfo, setUserInfo] = useState({
        username: '',
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [isSignUpPart, setIsSignUpPart] = useState(true);

    useEffect(() => {
        if(isSignUpPart){

        }
    }, [isSignUpPart]);

    function handleLogin(e){
        console.log(e)
    }

    function handleSignUp(e){
        console.log(e)
    }

    return (
        <div className={"SignUpPage"}>
            <div className={"Button-Section"}>
                <button onClick={() => setIsSignUpPart(true)}>SignUp</button>
                <button onClick={() => setIsSignUpPart(false)}>Login</button>
            </div>

            {isSignUpPart ? (
                <>
                    <h2>SignUp</h2>
                    <input
                        placeholder={"Username"}
                        onChange={(e) => setUserInfo({...UserInfo, username: e.target.value})}
                    />
                    <input
                        placeholder={"Email"}
                        onChange={(e) => setUserInfo({...UserInfo, email: e.target.value})}
                    />
                    <input
                        type="password"
                        placeholder={"Password"}
                        onChange={(e) => setUserInfo({...UserInfo, password: e.target.value})}
                    />
                    <input
                        type="password"
                        placeholder={"Confirm Password"}
                        onChange={(e) => setUserInfo({...UserInfo, password_confirmation: e.target.value})}
                    />
                    <button onClick={handleSignUp} className={"Confirm-Button"}>SignUp</button>
                </>
            ) : (
                <>
                    <h2>Login</h2>
                    <input
                        placeholder={"username"}
                        onChange={(e) => setUserInfo({...UserInfo, username: e.target.value})}
                    />
                    <input
                        type="password"
                        placeholder={"Password"}
                        onChange={(e) => setUserInfo({...UserInfo, password: e.target.value})}
                    />
                    <button onClick={handleLogin} className={"Confirm-Button"}>Login</button>
                </>
            )}
        </div>
        )
}

export default SignUpPage;