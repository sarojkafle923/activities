import { RouteObject, createBrowserRouter } from "react-router-dom";

import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import { ActivityDetails } from "../../features/activities/details/ActivityDetails";
import { ActivityForm } from "../../features/activities/details/ActivityForm";
import App from "../layout/App";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "activities", element: <ActivityDashboard /> },
      { path: "createActivity", element: <ActivityForm key="create" /> },
      { path: "activities/:id", element: <ActivityDetails /> },
      { path: "manage/:id", element: <ActivityForm key="manage" /> },
    ],
  },
];
export const router = createBrowserRouter(routes);
