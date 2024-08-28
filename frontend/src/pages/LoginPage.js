import "./Login.css";
import "./Login2.css";

import {useContext, useState} from "react";
import {Navigate} from "react-router-dom";
import {UserContext} from "../UserContext";
import { Link } from 'react-router-dom';


export default function LoginPage() {
	const [useremail,setUseremail] = useState('');
	const [password,setPassword] = useState('');
	const [redirect,setRedirect] = useState(false);
	const {setUserInfo} = useContext(UserContext);

	async function login(ev) {
		ev.preventDefault();
		const response = await fetch('http://localhost:5000/login', {
		  method: 'POST',
		  body: JSON.stringify({useremail, password}),
		  headers: {'Content-Type':'application/json'},
		  credentials: 'include',
		});
		if (response.ok) {
		  response.json().then(userInfo => {
			setUserInfo(userInfo);
			setRedirect(true);
		  });
		} else {
		  alert('wrong credentials');
		}
	  }

	  if (redirect) {
		return <Navigate to={'/'} />
	  }

    return (
        <>
        
	<div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100">
				<form className="login100-form validate-form p-l-55 p-r-55 p-t-178" onSubmit={login}>
					<span className="login100-form-title">
						Sign In
					</span>

					<div className="wrap-input100 validate-input m-b-16" data-validate="Please enter useremail">
						<input className="input100" type="text" name="useremail" placeholder="Useremail" value={useremail}
             onChange={ev => setUseremail(ev.target.value)}/>
						<span className="focus-input100"></span>
					</div>

					<div className="wrap-input100 validate-input" data-validate = "Please enter password">
						<input className="input100" type="password" name="password" placeholder="Password" value={password}
             onChange={ev => setPassword(ev.target.value)}/>
						<span className="focus-input100"></span>
					</div>


					<div className="container-login100-form-btn">
						<button className="login100-form-btn">
							Sign in
						</button>
					</div>

					<div className="flex-col-c p-t-13 p-b-40">
						<span className="txt1 p-b-9">
							Don’t have an account?
						</span>
						<Link to="/register" classNameName="txt3">Sign up now</Link>
					</div>
				</form>
			</div>
		</div>
	</div>
        </>
      );
    }