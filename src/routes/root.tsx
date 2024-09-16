import { Navigate, Outlet, ScrollRestoration } from "react-router-dom";
import Sidebar from "./sidebar";
import Footer from "./footer";
import { useObservableState } from "observable-hooks";
import { uid$, profile$ } from "@/services/auth";
import BrandLogo from "@/components/brand/logo";

const Loading = () => (
  <div className="grid absolute h-screen w-screen place-content-center">
    <BrandLogo className="h-12" />
  </div>
);

const Root = () => {
  const uid = useObservableState(uid$);
  const profile = useObservableState(profile$);

  // loading auth
  if (uid === undefined) {
    return <Loading />;
  }

  // not authenticated
  if (uid === null) {
    return <Navigate to="/accounts/signIn" replace />;
  }

  // loading profile
  if (profile === undefined) {
    return <Loading />;
  }

  // authenticated but no profile
  if (profile === null) {
    return <Navigate to="/accounts/create" />;
  }

  // authenticated and profile exists
  return (
    <>
      <Sidebar />
      {/* main container */}
      <div className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8 lg:max-w-screen-lg mx-auto">
          <main className="min-h-screen">
            <Outlet />
          </main>
          
          <Footer />
        </div>
        <ScrollRestoration />
      </div>
    </>
  );
};

export default Root;
