import Sidebar from "../components/UI/Sidebar";
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import NotesPage from "./NotesPage";
import HomePage from "./HomePage";
import NotFound from "components/NotFound";
import NotebookPage from "./NotebookPage";

const EntryPage = () => {
  const { path } = useRouteMatch();

  return (
    <div className={`d-flex position-absolute min-vw-100`}>
      <Sidebar />
      <Switch>
        <Route exact path={`${path}`}>
          <Redirect to={`${path}/home`}></Redirect>
        </Route>
        <Route path={`${path}/home`}>
          <HomePage />
        </Route>
        <Route path={`${path}/notes`}>
          <NotesPage />
        </Route>
        <Route path={`${path}/notebooks`}>
          <NotebookPage />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};

export default EntryPage;
