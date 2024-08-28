import React from "react";
import "./Post.css";

import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <section className="about container" id="about">
    <div className="contentBx">
        <h2 className="titleText text-uppercase">About Foodies Blog</h2>
        
        <p className="title-text">
        Foodie's blog is more than just a collection of recipes; it’s a culinary companion for those who want to eat well, explore new flavors, and share the joy of cooking with others <br/>

        <span className="titleText"> Healthy Meal Recipes </span>
        <br/>
At the heart of this blog is a commitment to health and well-being. Each recipe is crafted with fresh, wholesome ingredients, designed to nourish the body without sacrificing flavor. Whether you're looking for plant-based meals, low-carb options, or balanced dishes that cater to specific dietary needs, the blog provides a wide array of recipes. From breakfast smoothies packed with superfoods to hearty dinners that satisfy without the guilt, every dish is a step towards a healthier lifestyle.
<br/>
<span className="titleText">Diverse Dish Types </span> <br/>
This blog celebrates the diversity of global cuisine. It’s not just about one type of meal; it’s about exploring everything from light salads to hearty stews, quick snacks to gourmet entrees. Each post delves into different cooking techniques and flavor profiles, allowing readers to expand their culinary horizons. Whether you're in the mood for a comforting bowl of soup, a vibrant stir-fry, or a beautifully grilled piece of fish, there’s something for everyone.
<br/>
<span className="titleText">Native Meal Content</span> <br/>
A special feature of the blog is its focus on native meals from around the world. It’s a culinary journey that takes you to different cultures, showcasing traditional recipes passed down through generations. From the spicy curries of India to the rustic pastas of Italy, the blog provides authentic recipes along with stories behind each dish. These native meals are more than just food; they are a way to connect with different cultures and preserve culinary heritage.
<br/>
<span className="titleText">Cooking for Parties</span> <br/>
For those who love to entertain, the blog is a go-to resource for party cooking. It offers creative ideas for appetizers, main courses, and desserts that will impress guests without overwhelming the host. Whether you’re planning an intimate dinner party, a festive holiday gathering, or a casual barbecue, the blog provides detailed guides on how to prepare and present dishes that are as beautiful as they are delicious. Tips on menu planning, cooking in bulk, and time-saving hacks ensure that every event is a success
        </p>

        <Link to="/" className="btn2">Contact Us</Link>
    </div>
    <div className="imgBx">
        <img src="https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg" alt="" className="fitBg"/>
        <img src="https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19744.jpg" alt="" className="fitBg"/>
        <img src="https://img.freepik.com/free-photo/top-view-table-full-food_23-2149209253.jpg" alt="" className="fitBg"/>
    </div>
</section>
  );
}
