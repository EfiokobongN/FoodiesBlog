import "./Post.css";
import "./Post2.css";
import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ContactPage() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [message,setMessage] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  async function sendMessage(ev) {
    ev.preventDefault();
  
    const data = {
      name,
      email,
      phone,
      message,  // Ensure this is correctly set
    };
  
    const response = await fetch('https://foodies-blog.vercel.app/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (response.ok) {
        navigate('/thanks');  // Redirect to the "Thank You" page
      }
  }


  return (
    <div className="content">
    
    <div className="container">
      <div className="row align-items-stretch no-gutters contact-wrap">
        <div className="col-md-12">
          <div className="form h-100">
            <h3>Get In Touch With Foodies Blog</h3>
            <form className="mb-5" id="contactForm" name="contactForm" onSubmit={sendMessage}>
              <div className="row">
                <div className="col-md-6 form-group mb-3">
                  <label for="" className="col-form-label">Your Name*</label>
                  <input type="text" className="form-control" name="name"  value={name}
             onChange={ev => setName(ev.target.value)}/>
                </div>
                <div className="col-md-6 form-group mb-3">
                  <label for="" className="col-form-label">Email Address *</label>
                  <input type="text" className="form-control" name="email" value={email}  onChange={ev => setEmail(ev.target.value)}/>
                </div>
              </div>

              <div className="col-md-6 form-group mb-3">
                  <label for="" className="col-form-label">Phone Number</label>
                  <input type="text" className="form-control" name="phone"  value={phone}
             onChange={ev => setPhone(ev.target.value)}/>
                </div>


                

              <div className="row">
  <div className="col-md-12 form-group mb-3">
    <label for="message" className="col-form-label">Message Description*</label>
    <textarea
      className="form-control"
      name="message"
      cols="30"
      rows="4"
      value={message}  // Bind the `value` to the state
      onChange={ev => setMessage(ev.target.value)}  // Update state on change

    ></textarea>
  </div>
</div>



              <div className="row">
                <div className="col-md-12 form-group">
                  <button   className="btn btn-primary rounded-0 py-2 px-4 text-uppercase">Send Message</button>
                  
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>

  </div>
  );
}