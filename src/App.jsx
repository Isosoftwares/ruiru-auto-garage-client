import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";
import F404Page from "./F404Page";
import Unauthorized from "./Unauthorized";
import useScrollToTop from "./components/useScrollToTop";
import HomePage from "./pages/HomePage";
import InvoiceReceipt from "./pages/InvoiceReceipt";


function App() {
  // Create a client
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
    },
  });

  useScrollToTop();
  return (
    // routes
    <div className="relative">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<PersistLogin />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/*" element={<F404Page />} />
            <Route path="/invoice" element={<InvoiceReceipt />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
