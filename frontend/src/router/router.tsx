import { createBrowserRouter } from 'react-router-dom'
import App from '../App';
import Home from '../pages/home/Home';
import AboutUs from '../pages/otherPages/AboutUs';
import PrivacyPolicy from '../pages/otherPages/PrivacyPolicy';
import ContactUs from '../pages/otherPages/ContactUs';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/about",
        element: <AboutUs />
      },
      {
        path: "/privacypolicy",
        element: <PrivacyPolicy />
      },
      {
        path: "/contact",
        element: <ContactUs />
      }
    ]
  },
]);

export default router;