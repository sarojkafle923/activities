import { Outlet, useLocation } from "react-router-dom";

import { Container } from "semantic-ui-react";
import { Fragment } from "react";
import HomePage from "../../features/home/HomePage";
import { NavBar } from "./NavBar";
import { ToastContainer } from "react-toastify";
import { observer } from "mobx-react-lite";

function App() {
  const location = useLocation();

  return (
    <Fragment>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Container style={{ marginTop: "7em" }}>
            <Outlet />
          </Container>
        </>
      )}
    </Fragment>
  );
}

export default observer(App);
