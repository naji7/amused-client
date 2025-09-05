import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ProductProvider } from "./context/ProductContext";
import ProductsDashboard from "./components/products/ProductsDashboard";
import Header from "./components/common/Header";

const App = () => (
  <ProductProvider>
    <Header />

    <ProductsDashboard />

    <ToastContainer position="bottom-right" />
  </ProductProvider>
);

export default App;
