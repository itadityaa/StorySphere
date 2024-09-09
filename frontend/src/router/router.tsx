import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import AboutUs from "../pages/otherPages/AboutUs";
import PrivacyPolicy from "../pages/otherPages/PrivacyPolicy";
import ContactUs from "../pages/otherPages/ContactUs";
import SingleStory from "../pages/stories/SingleStory";
import Login from "../pages/users/Login";
import Register from "../pages/users/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/privacypolicy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/stories/:id",
        element: <SingleStory />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
