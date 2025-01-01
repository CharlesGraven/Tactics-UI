import { Outlet } from "react-router-dom";
import MainContent from "./MainContent.tsx";
import Header from "./Header.tsx";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-items-center sm:mx-8 lg:mx-16">
      <header className="border-b">
        <div className="max-w-screen-4xl mx-auto px-4 py-3">
          <Header />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-screen-2xl w-full mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/3 w-full">
            <div className="h-full">
              <Outlet />
              <MainContent />
            </div>
          </div>

          {/* Sidebar Right (1/3) */}
          {/*<div className="lg:w-1/3 w-full">*/}
          {/*  <WeeklyTraining />*/}
          {/*</div>*/}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-auto">
        <div className="max-w-screen-2xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-medium mb-2">About Us</h3>
              <p className="text-sm text-gray-600">
                Best free chess training tool around.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Quick Links</h3>
            </div>
            <div>
              <h3 className="font-medium mb-2">Contact</h3>
              <p className="text-sm text-gray-600">
                Email: info@chesstrainer.com
                <br />
                Discord: @ChessTrainer
              </p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t text-center text-sm text-gray-600">
            © 2024 Chess Trainer. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
