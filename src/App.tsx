import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";

import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
};

export default App;
