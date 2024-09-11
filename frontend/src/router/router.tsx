import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import AboutUs from "../pages/otherPages/AboutUs";
import PrivacyPolicy from "../pages/otherPages/PrivacyPolicy";
import ContactUs from "../pages/otherPages/ContactUs";
import SingleStory from "../pages/stories/SingleStory";
import Login from "../pages/users/Login";
import Register from "../pages/users/Register";
import AdminPage from "../pages/users/AdminPage";
import Dashboard from "../components/admin/Dashboard";
import AddPost from "../components/admin/AddPost";
import ManageWebsite from "../components/admin/ManageWebsite";
import ManageUser from "../components/admin/user/ManageUser";
import PrivateRouter from "./PrivateRouter";

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
      {
        path: "dashboard",
        element: (
          <PrivateRouter>
            <AdminPage />
          </PrivateRouter>
        ),
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "new-post",
            element: <AddPost />,
          },
          {
            path: "manage-items",
            element: <ManageWebsite />,
          },
          {
            path: "users",
            element: <ManageUser />,
          },
        ],
      },
    ],
  },
]);

export default router;
