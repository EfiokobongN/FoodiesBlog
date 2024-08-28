import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import Editor from "../Editor";

export default function EditPost() {
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect,setRedirect] = useState(false);

  useEffect(() => {
    fetch('https://foodies-blog.vercel.app/post/'+id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
        });
      });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }
    const response = await fetch('https://foodies-blog.vercel.app/post', {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/post/'+id} />
  }
  return (
    <div className="content">
    
    <div className="container">
      <div className="row align-items-stretch no-gutters contact-wrap">
        <div className="col-md-12">
          <div className="form h-100">
            <h3>Get Started</h3>
            <form className="mb-5" id="contactForm" name="contactForm" onSubmit={updatePost}>
              <div className="row">
                <div className="col-md-6 form-group mb-3">
                  <label for="" className="col-form-label">Post Title *</label>
                  <input type="text" className="form-control" name="title" value={title}
             onChange={ev => setTitle(ev.target.value)}/>
                </div>
                <div className="col-md-6 form-group mb-3">
                  <label for="" className="col-form-label">Post Image *</label>
                  <input type="file" className="form-control" name="file" id="email" onChange={ev => setFiles(ev.target.files)}/>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 form-group mb-3">
                  <label for="summary" className="col-form-label">Post Summary</label>
                  <input type="text" className="form-control" name="summary" id="summary"  value={summary} onChange={ev => setSummary(ev.target.value)}/>

                </div>
              </div>

              <div className="row">
                <div className="col-md-12 form-group mb-3">
                  <label for="message" className="col-form-label">Post Description *</label>
                  <Editor value={content} onChange={setContent} />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 form-group">
                  <button   className="btn btn-primary rounded-0 py-2 px-4">Edit Post</button>
                  
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