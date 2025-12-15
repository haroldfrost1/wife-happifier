import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Transactions from "./pages/Transactions";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
