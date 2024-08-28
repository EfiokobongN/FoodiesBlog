import "./Post.css";
import "./Post3.css";

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://foodies-blog.vercel.app/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  if (!postInfo) return "";

  return (
    <div className="container-fluid py-3">
      <div className="container">
          <div className="col-lg-8r mt-24">
            <div className="position-relative mb-3">
              
              <img
                className="img-fluid w-100"
                src={`https://foodies-blog.vercel.app/${postInfo.file}`}
                style={{ objectFit: "cover" }}
              />
              <div className="overlay position-relative bg-light">
                <div className="mb-3">
                  <span className="px-1">
                    Posted By {postInfo.author.username}
                  </span>

                  <span className="px-1">/</span>
                  <span> {formatISO9075(new Date(postInfo.createdAt))} </span>
                  <span className="px-1">/</span>
                  <a className="px-1">
                    <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </Link>
                    Edit this post
                  </a>
                </div>
                <div>

                <h3 className="mb-3">{postInfo.title}</h3>
                  <p>{postInfo.summary}.</p>
                  <span></span>
                  <p dangerouslySetInnerHTML={{ __html: postInfo.content }} />
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
