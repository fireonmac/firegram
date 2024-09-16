import { ProfileAvatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { profile$, uid$ } from "@/services/auth";
import { useObservableEagerState } from "observable-hooks";
import { Link } from "react-router-dom";
import { filter } from "rxjs";

import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { fullNamePipe } from "@/services/auth/util";

const Profile = () => {
  const uid = useObservableEagerState(uid$);
  const profile = useObservableEagerState(profile$.pipe(filter(Boolean)));

  return (
    <div className="md:flex md:items-center md:justify-between md:space-x-5">
      <div className="flex items-start space-x-5">
        <div className="flex-shrink-0">
          <div className="relative">
            <ProfileAvatar size="3xl" profile={profile} />
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full shadow-inner"
            />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {fullNamePipe(profile)}
          </h1>
          <h2 className="text-gray-500  leading-none mb-1.5">
            @{profile.username}
          </h2>
          <p className="text-sm text-gray-500 flex items-center">
            {/* {profile.bio} */}
            <CalendarDays className="w-[1em] mr-1" />
            <time dateTime={profile.createdAt?.toISOString()}>
              Joined{" "}
              {profile.createdAt
                ? `${format(profile.createdAt, "MMMM yyyy")}`
                : ""}
            </time>
          </p>
          <ul className="text-sm flex gap-x-4">
            <li>
              <Link to="">
                <b>8</b> <span className="text-gray-500">Following</span>
              </Link>
            </li>
            <li>
              <Link to="">
                <b>8</b> <span className="text-gray-500">Followers</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
        {profile.uid === uid ? (
          <Link to="/accounts/edit">
            <Button variant="secondary">Edit profile</Button>
          </Link>
        ) : (
          <Button>Follow</Button>
        )}
      </div>
    </div>
  );
};

export default Profile;
