import { makeStyles } from "@material-ui/core";
// import getRequest from "functions/api-calls/get-requests";
// import { postReq } from "functions/api-calls/post-requests";
import useGet from "functions/api-calls/useGet";
import { useEffect } from "react";
import { useState } from "react";
import usePost from "functions/api-calls/usePost";

const ScratchPad = () => {
  const [scratch, setScratch] = useState(null);
  const getRequest  = useGet();
  const postReq = usePost();

  const classes = makeStyles({
    container: {
      display: "flex",
      color: "#e6e6e6",
      margin: "24px",
      // padding: '24px',
      width: "95%",
    },
    scratchPad: {
      backgroundColor: "#26251C",
      flex: 2,
      height: "358px",
      borderRadius: "12px",
      // padding: "12px 20px",
      marginRight: "6px",
    },
    recentlyCaptured: {
      marginLeft: "6px",
      backgroundColor: "#1a1a1a",
      flex: 4,
      borderRadius: "12px",
    },
    textarea: {
      backgroundColor: "inherit",
      border: "none",
      width: "calc(100% - 12px)",
      height: "100%",
      resize: "none",
      color: "#fff",
      "&:focus": {
        outline: "none",
      },
    },
    titleSection: {
      padding: "16px 0 10px",
      height: "50px",
    },
    marginLeft: {
      marginLeft: "12px",
    },
    padSection: {
      height: "calc(100% - 50px)",
    },
  })();

  const updateScratch = async (e) => {
    console.log(e.target.value);
    setScratch(e.target.value);
    try {
      await postReq({ scratch: e.target.value }, "/update-scratch");
    } catch (err) {}
  };

  const getScratch = async () => {
    try {
      const response = await getRequest("/get-scratch");
      setScratch(response);
    } catch (err) {}
  };

  useEffect(() => {
    getScratch();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.scratchPad}>
        <section className={classes.titleSection}>
          <div className={classes.marginLeft}>Scratch Pad</div>
        </section>
        <section className={classes.padSection}>
          <div className={`h-100`}>
            <textarea
              className={`${classes.textarea} ${classes.marginLeft}`}
              placeholder={`Start writing...`}
              onChange={updateScratch}
              value={scratch}
            />
          </div>
        </section>
      </div>
      <div className={classes.recentlyCaptured}></div>
    </div>
  );
};

export default ScratchPad;
