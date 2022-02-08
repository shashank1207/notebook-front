import { CircularProgress, Tooltip } from "@material-ui/core";
import useGet from "functions/api-calls/useGet";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { attachmentAction } from "store/attachment-slice";
import classes from "./SliderContent.module.css";
import { makeStyles } from "@material-ui/core";
import { Fragment } from "react";
import { CloudDownload, OpenInNew } from "@material-ui/icons";
import { saveAs } from "file-saver";

const AttachmentList = () => {
  const getRequest = useGet();
  const { params } = useRouteMatch();
  const dispatch = useDispatch();
  const attachmentList = useSelector((state) => state.attachment.list);
  const [height, setHeight] = useState();

  const muiClasses = makeStyles({
    progressBarColor: {
      color: "#4AA92F",
    },
  })();

  const getAttachments = async () => {
    const list = await getRequest(`/get-all-files?noteId=${params.note_id}`);
    dispatch(attachmentAction.addAttachment(list.a));
  };

  const downloadFile = ({ name, link }) => {
    saveAs(link, name);
  };

  const attachmentListRendered = attachmentList
    ? attachmentList.map((file) => {
        // console.log(file.link)
        return (
          <div className={classes["img-div"]}>
            <div className={classes["img-detail"]}>
              <img src={file.link} className={classes.img} />
              <div className={classes.metadata}>
                <div className={classes["img-name"]}>{file.name}</div>
                <Tooltip title='Open'>
                  <div
                    className={classes.download}
                    onClick={() =>
                      downloadFile({ name: file.name, link: file.link })
                    }
                  >
                    {/* <CloudDownload style={{ color: "#262626" }} /> */}
                    <OpenInNew style={{ color: "#262626" }} />
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        );
      })
    : null;

  useEffect(() => {
    getAttachments();
  }, []);

  let render;

  if (!attachmentList.length) {
    render = (
      <div className={`${classes.loader}`}>
        <CircularProgress classes={muiClasses.progressBarColor} />
      </div>
    );
  } else {
    render = (
      <div
        className={classes["attachment-list"]}
        style={{ maxHeight: `${window.innerHeight - 86}px` }}
      >
        {attachmentListRendered}
      </div>
    );
  }

  return <Fragment>{render}</Fragment>;
};

export default AttachmentList;
