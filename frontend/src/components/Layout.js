
import {Outlet} from "react-router-dom";
import Navbar from "./navbar";
import Banner from "./banner";

export default function Layout() {
  return (
    <main>
      <Navbar />
      <Banner />
      <Outlet />
      
    </main>
  );
}