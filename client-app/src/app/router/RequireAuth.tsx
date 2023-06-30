import { Navigate, Outlet, useLocation } from "react-router-dom";

import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";

export const RequireAuth = observer(() => {
  const {
    userStore: { isLoggedIn },
  } = useStore();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <Outlet />;
});
