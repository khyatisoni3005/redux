import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Help from "./pages/Help";
import { Provider } from "react-redux";
import store from "./store/Store";


function App() {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />


        </Routes>
      </Provider>

    </>
  );
}

export default App;
