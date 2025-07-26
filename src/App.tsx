import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AdminPin from "./pages/AdminPin";
import AdminDashboard from "./pages/AdminDashboard";
import GameAccounts from "./pages/GameAccounts";
import CayThue from "./pages/CayThue";
import DichVuMienPhi from "./pages/DichVuMienPhi";
import History from "./pages/History";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin-pin" element={<AdminPin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/tai-khoan-game" element={<GameAccounts />} />
          <Route path="/cay-thue" element={<CayThue />} />
          <Route path="/dv-mien-phi" element={<DichVuMienPhi />} />
          <Route path="/lich-su" element={<History />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
