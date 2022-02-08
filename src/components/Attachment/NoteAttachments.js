import { makeStyles } from "@material-ui/core";
import { Fragment } from "react";
import reactDom from "react-dom";
import classes from "./Attachment.module.css";
import { ArrowForward } from "@material-ui/icons";
import SliderContent from "./SliderContent";

const Backdrop = ({ setIsAttachmentSliderOpen }) => {
  return (
    <div
      className={classes.backdrop}
      onClick={() => setIsAttachmentSliderOpen(false)}
    />
  );
};

const SliderOverlay = ({ setIsAttachmentSliderOpen }) => {
  const classesMui = makeStyles({})();
  return (
    <Fragment>
      <div className={classes["close-arrow-div"]}>
        <div className={`${classes["close-arrow"]}`}>
          <div
            className={classes.semicircle}
            onClick={() => setIsAttachmentSliderOpen(false)}
          >
            <ArrowForward />
          </div>
        </div>
      </div>
      <div className={`${classes.slider} ${classes["slider-ani"]} h-100`}>
        <SliderContent />
      </div>
    </Fragment>
  );
};

const NoteAttachments = ({ setIsAttachmentSliderOpen }) => {
  return (
    <Fragment>
      {reactDom.createPortal(
        <Backdrop setIsAttachmentSliderOpen={setIsAttachmentSliderOpen} />,
        document.getElementById("backdrop-root")
      )}
      {reactDom.createPortal(
        <SliderOverlay setIsAttachmentSliderOpen={setIsAttachmentSliderOpen} />,
        document.getElementById("slider-overlay")
      )}
    </Fragment>
  );
};

export default NoteAttachments;
