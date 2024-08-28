import "./Post.css";
import "./Post2.css";
import { Link } from "react-router-dom";


export default function ThanksPage() {
  
  return (
  <div  style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
  <Link style={{ textAlign:'center' }} to="/" >
                <h1 className=" display-5 text-uppercase"><span class="text-primary">Foodies</span>Blog</h1>
         </Link>
<h1 style={{ textAlign:'center' }}>Thank you for Contacting Us!</h1>
<p style={{ textAlign:'center' }}>Your Message Has been Received , We will Get Back to you Shortly. <strong>
    <a href="/">Back To Home</a></strong></p>
  </div>
  );
}
