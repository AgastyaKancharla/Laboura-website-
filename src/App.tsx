import React, { useState } from "react";
import { Navbar, PageId } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { ForBusinessesPage } from "./pages/ForBusinessesPage";
import { ForWorkersPage } from "./pages/ForWorkersPage";
import { RolesPage } from "./pages/RolesPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { CallExecutiveModal } from "./components/CallExecutiveModal";
import { ScrollChrome } from "./components/ScrollChrome";

export function App() {
  const [currentPage, setCurrentPage] = useState<PageId>("home");
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [callerRole, setCallerRole] = useState<"general" | "contractor" | "worker" | "investor">("general");

  const handleOpenCallModal = (role: "general" | "contractor" | "worker" | "investor" = "general") => {
    setCallerRole(role);
    setIsCallModalOpen(true);
  };

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-gray-800 flex flex-col font-['Plus_Jakarta_Sans'] selection:bg-blue-500/15 selection:text-gray-900">
      {/* Sticky Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenCallModal={handleOpenCallModal}
      />

      <ScrollChrome key={currentPage} />

      {/* Main Page Content */}
      <main className="flex-grow">
        {currentPage === "home" && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenCallModal={handleOpenCallModal}
          />
        )}

        {currentPage === "businesses" && (
          <ForBusinessesPage
            onNavigate={handleNavigate}
            onOpenCallModal={handleOpenCallModal}
          />
        )}

        {currentPage === "workers" && (
          <ForWorkersPage
            onNavigate={handleNavigate}
            onOpenCallModal={handleOpenCallModal}
          />
        )}

        {currentPage === "roles" && (
          <RolesPage
            onNavigate={handleNavigate}
            onOpenCallModal={handleOpenCallModal}
          />
        )}

        {currentPage === "about" && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenCallModal={handleOpenCallModal}
          />
        )}

        {currentPage === "contact" && (
          <ContactPage
            onNavigate={handleNavigate}
            onOpenCallModal={handleOpenCallModal}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenCallModal={handleOpenCallModal}
      />

      {/* Call Executive Modal */}
      <CallExecutiveModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        callerRole={callerRole}
      />
    </div>
  );
}

export default App;
