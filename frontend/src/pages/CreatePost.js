import "./Post.css";
import "./Post2.css";
import 'react-quill/dist/quill.snow.css';
import {useState} from "react";
import {Navigate} from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost() {
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  async function createNewPost(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    ev.preventDefault();
    const response = await fetch('http://localhost:5000/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <div className="content">
    
    <div className="container">
      <div className="row align-items-stretch no-gutters contact-wrap">
        <div className="col-md-12">
          <div className="form h-100">
            <h3>CREATE POST</h3>
            <form className="mb-5" id="contactForm" name="contactForm" onSubmit={createNewPost}>
              <div className="row">
                <div className="col-md-6 form-group mb-3">
                  <label for="" className="col-form-label">Post Title *</label>
                  <input type="text" className="form-control" name="title"  value={title}
             onChange={ev => setTitle(ev.target.value)}/>
                </div>
                <div className="col-md-6 form-group mb-3">
                  <label for="" className="col-form-label">Post Image *</label>
                  <input type="file" className="form-control" name="file" id="email"  onChange={ev => setFiles(ev.target.files)}/>
                </div>
              </div>

              <div className="col-md-6 form-group mb-3">
                  <label for="" className="col-form-label">Post Summary *</label>
                  <input type="text" className="form-control" name="summary"  value={summary}
             onChange={ev => setSummary(ev.target.value)}/>
                </div>



              <div className="row">
                <div className="col-md-12 form-group mb-13">
                  <label for="message">Post Description *</label>
                  <Editor value={content} onChange={setContent} />
                  
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 form-group">
                  <button   className="btn btn-primary rounded-0 py-2 px-4">Create Post</button>
                  
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