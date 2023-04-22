import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";

const App = () => (
  <Router>
    <Header />
    <main className="py-3">
      <Container>
        <Routes>
          <Route path="/" element={<HomeScreen />} exact />
          <Route path="/register" element={<RegisterScreen />} exact />
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/profile" element={<ProfileScreen />} exact />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart/:id?" element={<CartScreen />} />
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
      </Container>
    </main>

    <Footer />
  </Router>
);

export default App;
