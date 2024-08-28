import "./Login.css";
import "./Login2.css";
import {useState} from "react";
import { Link } from 'react-router-dom';


export default function LoginPage() {
	const [username, setUsername] = useState('');
  	const [password, setPassword] = useState('');
	  const [useremail, setUseremail] = useState('');
	  async function register(ev) {
		ev.preventDefault();

		const response = await fetch('http://localhost:4000/register', {
			method: 'POST',
			body: JSON.stringify({username, useremail,password}),
			headers: {'Content-Type':'application/json'},
		  });
		  if (response.status === 200) {
			alert('registration successful');
		  } else {
			alert('registration failed');
		  }
	  }
    return (
        <>
        
	<div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100">
				<form className="login100-form validate-form p-l-55 p-r-55 p-t-178" onSubmit={register}>
					<span className="login100-form-title">
						Sign Up
					</span>

					<div className="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
						<input className="input100" type="text" name="username" placeholder="Username" value={username}
             		onChange={ev => setUsername(ev.target.value)}/>
						<span className="focus-input100"></span>
					</div>

					< div className="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
						<input className="input100" type="email" name="useremail" placeholder="User Email" value={useremail}
             onChange={ev => setUseremail(ev.target.value)}/>
                        <span className="focus-input100"></span>
                    
					</div>

					<div className="wrap-input100 validate-input" data-validate = "Please enter password">
						<input className="input100" type="password" name="pass" placeholder="Password" value={password}
             			onChange={ev => setPassword(ev.target.value)}/>
						<span className="focus-input100"></span>
					</div>


					<div className="container-login100-form-btn p-t-13">
						<button className="login100-form-btn">
							Sign Up
						</button>
					</div>

					<div className="flex-col-c p-t-13 p-b-40">
						<span className="txt1 p-b-9">
							Already have an account?
						</span>
						<Link to="/login" className="txt3">Login</Link>
					</div>
				</form>
			</div>
		</div>
	</div>
        </>
      );
    }