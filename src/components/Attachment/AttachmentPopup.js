import { Fragment } from "react";
import reactDom from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { attachmentAction } from "store/attachment-slice";
import classes from "./Attachment.module.css";
import useFile from "functions/api-calls/use-file";
import { CircularProgress, makeStyles } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";

const Backdrop = () => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(attachmentAction.isAddingToFalse());
  };

  return <div className={classes.backdrop} onClick={closeModal} />;
};

const ModalOverlay = () => {
  const [isUploaded, setIsUploaded] = useState(false);
  const dispatch = useDispatch();
  const isUploading = useSelector((state) => state.attachment.uploading);

  const [doesExists, setDoesExists] = useState(false);

  useEffect(()=>{
    if(isUploading===0){
      setDoesExists(true);
    }
    else{
      setDoesExists(false);
    }
  }, [isUploading]);

  const { fileUpload } = useFile();
  const getFile = (event) => {
    event.preventDefault();
    fileUpload(event.target[0].files[0], setIsUploaded);
  };

  const muiClasses = makeStyles({
    progressBarColor: {
      color: "#4AA92F",
    },
  })();

  const closeModal = () => {
    dispatch(attachmentAction.changeUploadingStatus(false));
    dispatch(attachmentAction.isAddingToFalse());
  };

  useEffect(() => {
    if (isUploaded === true) {
      closeModal();
    }
  }, [isUploaded]);

  return (
    <div className={classes.modal}>
      <form onSubmit={getFile} id={classes["attachment-form"]}>
        <input
          type="file"
          style={{ color: "white" }}
          name="file"
          id="choose-file"
          multiple="false"
        />
        {/* <TextField type="file" style={{color: '#ffffff'}} name="file" label="Select File" /> */}
        {isUploading ? (
          <div className={classes["progress-bar-div"]}>
            <CircularProgress className={muiClasses.progressBarColor} />
            <span className={classes.uploading}>Uploading...</span>
          </div>
        ): null}
        {doesExists ? <div className={classes["file-already-exists"]}>
            This file already exists. Please change the file name before uploading.
          </div> : null}
        <div className={classes["btn-div"]}>
          <button type="submit" className={classes["submit-btn"]} disabled={doesExists}>
            submit
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

const AttachmentPopup = () => {
  return (
    <Fragment>
      {reactDom.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      {reactDom.createPortal(
        <ModalOverlay />,
        document.getElementById("attachment-modal-overlay")
      )}
    </Fragment>
  );
};

export default AttachmentPopup;
