import classes from "./ShareNote.module.css";
import { Fragment, useState } from "react";
import reactDom from "react-dom";
import { Search } from "@material-ui/icons";
import useGet from "functions/api-calls/useGet";
import usePost from "functions/api-calls/usePost";
import { useRouteMatch } from "react-router-dom";

const Backdrop = ({ setIsSharing }) => {
  const closeModal = () => {
    setIsSharing(false);
  };

  return <div className={classes.backdrop} onClick={closeModal} />;
};

const ModalOverlay = ({ setIsSharing }) => {
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState();
  const {params} = useRouteMatch();
  const [isAccessGiven, setIsAccessGiven] = useState();

  const getRequest = useGet();
  const postReq = usePost();

  const searchUser = async () => {
    const response = await getRequest(`/search-user?email=${email}`);
    
    setUsers(response);
  };

  const closeModal = () => {
    setIsSharing(false);
  };

  const shareNote = async() => {
    const response = await postReq({sharedWith: users.id, noteId: params.note_id}, '/share-note');
    setIsAccessGiven(response);
  }

  return (
    <div className={classes.modal}>
      <form className={classes["share-form"]}>
        <div style={{ width: "100%", textAlign: "start" }}>
          <span className={classes["share-note"]}>Share File</span>
          {/* <div style={{ width: "100%", textAlign: "start", paddingLeft:'20px' }}>
            If you want to search multiple users, please separate emails by
            commas.
          </div> */}
          <div className={classes.search}>
            <input
              type="email"
              style={{ margin: "12px" }}
              name="email"
              className={classes["share-input"]}
              height="28"
              id="share-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <button
              type="button"
              onClick={searchUser}
              className={classes["submit-btn"]}
            >
              <Search />
            </button>
          </div>
        </div>
        {users && !users?.message && (
          <div
            className={classes.users}
            style={{ width: "100%", textAlign: "start" }}
          >
            <div>{users.name}</div>
            <div>{users.email}</div>
          </div>
        )}
        {users?.message && (
          <div
            style={{ width: "100%", textAlign: "start" }}
            className={classes.users}
          >
            {users.message}
          </div>
        )}
        {isAccessGiven && (<div
            style={{ width: "100%", textAlign: "start" }}
            className={classes.message}
          >
            {isAccessGiven.message}
          </div>)}
        <div className={classes["btn-div"]}>
          <button
            type="button"
            className={classes["submit-btn-share"]}
            disabled={!users}
            onClick={shareNote}
          >
            Share
          </button>
          <button
            type="button"
            className={classes["cancel-btn"]}
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const ShareNote = (props) => {
  return (
    <Fragment>
      {reactDom.createPortal(
        <Backdrop setIsSharing={props.setIsSharing} />,
        document.getElementById("backdrop-root")
      )}
      {reactDom.createPortal(
        <ModalOverlay setIsSharing={props.setIsSharing} />,
        document.getElementById("share-modal-overlay")
      )}
    </Fragment>
  );
};

export default ShareNote;
