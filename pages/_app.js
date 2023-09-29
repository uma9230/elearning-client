import TopNav from "../componenets/TopNav";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.js";
import "../public/css/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "../context";
import { StrictMode } from "react";

function MyApp({ Component, pageProps }) {
  return (
    <StrictMode>
      <Provider>
        <ToastContainer position="top-right" />
        <TopNav />
        <Component {...pageProps} />
      </Provider>
    </StrictMode>
  );
}

export default MyApp;
