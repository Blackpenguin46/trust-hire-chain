import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

const queryClient = new QueryClient();

export default function App() {
  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <div style={{ color: 'lime', fontSize: 32 }}>APP SHELL IS MOUNTED</div>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </main>
  );
}
