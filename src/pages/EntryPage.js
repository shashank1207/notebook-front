import Sidebar from "../components/UI/Sidebar";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import NotesPage from "./NotesPage";
import HomePage from "./HomePage";

const EntryPage = () => {
  const { path } = useRouteMatch();

  return (
    <div className={`d-flex position-absolute min-vw-100`}>
      <Sidebar />
      <Switch>
        <Route path={`${path}/home`}>
          <HomePage />
        </Route>
        <Route path={`${path}/notes`}>
          <NotesPage />
        </Route>
        <Route path="*">
          <div>Not found</div>
        </Route>
      </Switch>
    </div>
  );
};

export default EntryPage;
