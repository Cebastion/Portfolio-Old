import { Routes, Route, Link } from "react-router-dom";
import { ContactPage } from "./pages/ContactPage";
import { WorkPage } from "./pages/WorkPage";
import { HomePage } from "./pages/HomePage";
import { ErrorPage } from "./pages/ErrorPage";
import { Offers } from "./pages/Offers";
import { Offer } from "./pages/Offer";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/works" element={<WorkPage/>}/>
      <Route path="/offers" element={<Offers/>}/>
      <Route path="/contact" element={<ContactPage/>}/>
      <Route path="/offer/:id" element={<Offer/>}/>
      <Route path="*" element={<ErrorPage/>}/>
    </Routes>
    </>
  );
}

export default App;
