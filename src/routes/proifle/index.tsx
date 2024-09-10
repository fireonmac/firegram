import { profile$ } from "@/services/auth";
import { useObservableState } from "observable-hooks";

const Profile = () => {
  const profile = useObservableState(profile$);

  return (
    <>
      <div>Profile</div>
    </>
  );
};

export default Profile;
