import React from "react";
import "./Post.css";

import { Link } from "react-router-dom";

export default function Post({
  _id,
  title,
  summary,
  file,
  author,
}) {
  return (
    <section className="about container" id="about">
    <div className="contentBx">
    <Link to={`/post/${_id}`}>
        <h2 className="titleText">{title}</h2>
        </Link>
        
        <p className="title-text">
        {summary}
        </p>

        <div className="profile">
                
               Post By  <span className="profile-name">{author.username}</span>
            </div>
        <Link to={`/post/${_id}`} className="btn2">Read more</Link>
    </div>
    <div className="imgBx">
        <img src={"http://localhost:4000/" + file} alt="" className="fitBg"/>
    </div>
</section>
  );
}
