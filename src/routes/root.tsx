import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

const Root = () => {
  const authenticated = true;

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Sidebar />

      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Root;
