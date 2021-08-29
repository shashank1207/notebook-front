import { useCallback} from "react";
import { useDispatch} from "react-redux";

import getRequest from "../../functions/api-calls/get-requests";
import { notesAction } from "../../store/notes-slice";
import { postReq } from "../../functions/api-calls/post-requests";

const useNotes = () => {
  const dispatch = useDispatch();
  const openNewNote = async (setOpenEditor) => {
    const response = await postReq({}, "/add");
    dispatch(
      notesAction.addNote({
        _id: response._id,
        note: response.note,
        title: response.title,
      })
    );
    setOpenEditor(true);
  };

  const getNotes = useCallback(async () => {
    let notesA = [];
    try {
      notesA = await getRequest("/get-recent-notes");
      dispatch(notesAction.setNotes(notesA));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  return {
    openNewNote,
    getNotes
  }
};

export default useNotes;
