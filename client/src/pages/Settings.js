import UserCard from "../components/UserCard";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Settings() {
  const { user } = useSelector((state) => state.user);
  const URL = process.env.REACT_APP_URL_STRAPI;

  // if (!user) {
  //   return <div>User not exist.</div>;
  // }

  return (
    <div>
      {user ? (
        <div>
          <UserCard user={user} URL={URL} />
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
}
