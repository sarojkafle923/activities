import { Fragment, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Container } from "semantic-ui-react";
import HomePage from "../../features/home/HomePage";
import { LoadingComponent } from "./LoadingComponent";
import { ModalContainer } from "../common/modals/ModalContainer";
import { NavBar } from "./NavBar";
import { ToastContainer } from "react-toastify";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) {
    return <LoadingComponent content="Loading app..." />;
  }

  return (
    <Fragment>
      <ModalContainer />
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
