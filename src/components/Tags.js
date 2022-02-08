import { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
// import { useRef } from "react";
import { useState } from "react";
import { useRouteMatch } from "react-router-dom";

// import { postReq } from "functions/api-calls/post-requests.js";
import useGet from "functions/api-calls/useGet";
// import getReq from "functions/api-calls/get-requests";
import usePost from "functions/api-calls/usePost";

const Tags = () => {
  const [adding, setAdding] = useState(false);
  const [tag, setTag] = useState("#");
  const [tagsArray, setTagsArray] = useState([]);
  const { params } = useRouteMatch();
  const getReq = useGet();
  const postReq = usePost();

  const classes = makeStyles({
    tagsBody: {
      display: "flex",
      flexDirection: "row",
      padding: "8px",
      alignItems: "center",
      height: "68px",
      // width:'100%'
    },
    tagsContainer: {
      display:'flex',
      flexDirection:'row'
    },
    tagBody: {
      backgroundColor: "#4aa92f",
      width: "auto",
      padding: "4px",
      borderRadius: "8px",
      margin: "4px",
      cursor: "pointer",
      // height:'32px',
      flex: "auto",
    },
    add: {
      fontSize: "24px",
      margin: "0px 12px",
      borderRadius: "50%",
      backgroundColor: "#1a1a1a",
      width: "32px",
      height: "32px",
      textAlign: "center",
      display: "flex",
      padding: "0",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    },
    input: {
      margin: "0px 12px",
      backgroundColor: "rgb(14, 12, 12)",
      height: "32px",
      color: "#fff",
      minWidth: "120px",
    },
    addTag: {
      flexGrow:100,
      display: 'flex',
    },
  })();

  const startAdding = () => {
    setAdding(true);
  };

  const getTags = async () => {

    const response = await getReq(`/get-tags?id=${params.note_id}`);
    setTagsArray(response);
  };

  useEffect(() => {
    getTags();
  }, []);

  const onEnter = async (e) => {
    if (e.key === "Enter") {
      setAdding(false);
      const newArray = tagsArray;
      const data = { tagName: e.target.value, noteId: params.note_id };
      const response = await postReq(data, "/add-tag");
      newArray.push(response);
      setTagsArray(newArray);
      setTag("#");
    }
  };

  const deleteTag = (tagId) => {
    const newTags = tagsArray.filter((tag) => {
      return tag.tagId != tagId;
    });
    setTagsArray(newTags);
    postReq({ noteId: params.note_id, tagId: tagId }, "/delete-tag", () => {});
  };

  const onInputChange = (e) => {
    setTag(e.target.value);
  };

  const tagsMap = tagsArray.map((tag) => {
    return (
      <div
        className={classes.tagBody}
        key={tag.tagId}
        onClick={() => {
          deleteTag(tag.tagId);
        }}
      >
        <div style={{ margin: "4px" }}>{tag.tagName}</div>
      </div>
    );
  });

  return (
    <div className={classes.tagsBody}>
      <div className={classes.tagsContainer}>{tagsMap}</div>
      {!adding && (
        <div className={classes.add} onClick={startAdding}>
          <span>+</span>
        </div>
      )}
      {adding && (
        <div className={classes.addTag}>
          <input
            className={`${classes.input} input-tag`}
            onKeyDown={onEnter}
            value={tag}
            onChange={onInputChange}
            // ref={tag}
          />
          <span>Press 'Enter' to add.</span>
        </div>
      )}
    </div>
  );
};

export default Tags;
