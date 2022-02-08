import { useDispatch, useSelector } from "react-redux";
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { app } from "functions/initilizeStorage";
import usePost from "./usePost";
import { useRouteMatch } from "react-router-dom";
import { attachmentAction } from "store/attachment-slice";


// const host = "http://localhost:5000";

const useFile = () => {
  const {params} = useRouteMatch();
  const firebaseStorage = getStorage(app);
  const user = useSelector(state => state.login.user);
  const postReq = usePost();
  const dispatch = useDispatch();
 
  /**
 * @param {File} data
 */

  const fileUpload = async (data, setIsUploaded) => {
    setIsUploaded(false);

    dispatch(attachmentAction.changeUploadingStatus(true));

    // 0: Neither uploaded nor uploading , 1: uploading, 2: Uploaded

    // let storageRef;
    // try{
    //   storageRef = ref(firebaseStorage, `${user.userId}/${data.name}`);
    // } catch(err){
    //   console.log(err);
    // }

    const storageRef = ref(firebaseStorage, `${user.userId}/${data.name}`);
    let doesFileExists;
    try{
      doesFileExists = await getDownloadURL(storageRef);
    } catch(err){
      console.log(err);
    }

    if(doesFileExists){
      console.log(doesFileExists);
      dispatch(attachmentAction.changeUploadingStatus(0));
      // setTimeout(()=>{
      //   setIsUploaded(true);
      // }, 60000);
      return;
    }

    const upload = await uploadBytes(storageRef, data);

    const link = await getDownloadURL(storageRef);

    const metadata = upload.metadata;

    const m = {link, ...metadata}

    postReq({metadata: m, noteId: params.note_id}, '/upload-file');

    dispatch(attachmentAction.changeUploadingStatus(false));

    setIsUploaded(true);
  };

  return {fileUpload};
}

export default useFile;