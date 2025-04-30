import './SignUpPage.css'
import {useEffect, useState} from "react";

function SignUpPage() {
    const [UserInfo, setUserInfo] = useState({
        username: '',
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [Error, setError] = useState("");

    const [isSignUpPart, setIsSignUpPart] = useState(true);

    useEffect(() => {
        if(isSignUpPart){

        }
    }, [isSignUpPart]);

    function handleLogin(e){
        setError("");
        if(!UserInfo.email && !UserInfo.password){
            setError("Input field is required.");
        }else{
            fetch("http://localhost:5001/api/Users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: UserInfo.username,
                    password: UserInfo.password,
                })
            }).then(res => res.json())
                .then(result => {
                    //buraya da yönlendirme yapılacak
                    setError(result.message);
                })
                .catch(error => setError(error.message));
        }
    }

    function handleSignUp(){
        setError("");
        if(!UserInfo.username && UserInfo.email && !UserInfo.password && !UserInfo.password_confirmation){
            setError("Input field is required");
        }else if(UserInfo.password !== UserInfo.password_confirmation){
            setError("Passwords do not match");
        }else{
            fetch('http://localhost:5001/api/Users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: UserInfo.username,
                    password: UserInfo.password,
                    email: UserInfo.email,
                })
            }).then(res => res.json())
                .then(result => {
                    setError(result.message);
                    //buraya anasayfaya yönlendirme ve session oluşturma yapılacak
                })
                .catch(error => setError(error.message));
        }
    }

    const resetPage = (booleanType) => {
        setIsSignUpPart(booleanType);
        setError("");
        setUserInfo({
            username: '',
            email: '',
            password: '',
            password_confirmation: '',
        });
    }

    return (
        <div className={"SignUpPage"}>
            <div className={"Button-Section"}>
                <button onClick={() => resetPage(true)}>SignUp</button>
                <button onClick={() => resetPage(false)}>Login</button>
            </div>

            {isSignUpPart ? (
                <>
                    <h2>SignUp</h2>
                    <input
                        placeholder={"Username"}
                        value={UserInfo.username}
                        onChange={(e) => setUserInfo({...UserInfo, username: e.target.value})}
                    />
                    <input
                        placeholder={"Email"}
                        value={UserInfo.email}
                        onChange={(e) => setUserInfo({...UserInfo, email: e.target.value})}
                    />
                    <input
                        type="password"
                        value={UserInfo.password}
                        placeholder={"Password"}
                        onChange={(e) => setUserInfo({...UserInfo, password: e.target.value})}
                    />
                    <input
                        type="password"
                        value={UserInfo.password_confirmation}
                        placeholder={"Confirm Password"}
                        onChange={(e) => setUserInfo({...UserInfo, password_confirmation: e.target.value})}
                    />
                    <button onClick={handleSignUp} className={"Confirm-Button"}>SignUp</button>
                    <h3>{Error}</h3>
                </>
            ) : (
                <>
                    <h2>Login</h2>
                    <input
                        placeholder={"username"}
                        value={UserInfo.username}
                        onChange={(e) => setUserInfo({...UserInfo, username: e.target.value})}
                    />
                    <input
                        type="password"
                        placeholder={"Password"}
                        value={UserInfo.password}
                        onChange={(e) => setUserInfo({...UserInfo, password: e.target.value})}
                    />
                    <button onClick={handleLogin} className={"Confirm-Button"}>Login</button>
                    <h3>{Error}</h3>
                </>
            )}
        </div>
        )
}

export default SignUpPage;