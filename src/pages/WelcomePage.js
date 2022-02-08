import { Fragment } from "react";
import { useRouteMatch } from "react-router-dom";
import Welcome from "../components/Welcome";
const WelcomePage = () => {
  return (
    <Fragment>
      <Welcome className={`mh-100 flex-column`} />
    </Fragment>
  );
};

export default WelcomePage;
