import { Navigate } from "react-router-dom";
const RestrictedRoutes = (props) => {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <>
      {!isLoggedIn ? (
        <>{props.children}</>
      ) : (
        <>
          <Navigate to="/" />
        </>
      )}
    </>
  );
};
export default RestrictedRoutes;