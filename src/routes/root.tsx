import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Footer from "./footer";
import { useObservableState } from 'observable-hooks';
import { user$ } from "@/services/auth";
import BrandLogo from "@/components/brand/logo";

const Root = () => {
  const user = useObservableState(user$);

  if (user === undefined) {
    return <div className="grid absolute h-screen w-screen place-content-center">
      <BrandLogo className="h-12" />
    </div>
  }

  if (user === null) {
    return <Navigate to="/accounts/login" />;
  }

  return (
    <>
      <Sidebar />

      <div className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">
          <main className="min-h-screen">
            <Outlet />
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Root;
