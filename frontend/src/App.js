import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import AboutPage from "./pages/AboutPage";
import EditPost from "./pages/EditPost";
import ContactPage from "./pages/ContactPage";
import ThanksPage from "./pages/ThanksPage";


function App() {
  return (
    <UserContextProvider>

    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />

        {/* Add more routes here */}
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/register"} element={<RegisterPage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/thanks" element={<ThanksPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path={"/create"} element={<CreatePost />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Route>
    </Routes>
    </UserContextProvider>

  );
}

export default App;
