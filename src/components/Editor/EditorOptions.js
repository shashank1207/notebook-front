import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from "draft-js";
import { useState } from "react";
import BlockStyleControls from "./BlockStyleControl";

const EditorOptions = () => {

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onChange = (editorState) => {
    setEditorState({editorState: editorState});
  }

  const _toggleBlockType = (blockType) => {
    onChange(
      RichUtils.toggleBlockType(
        editorState,
        blockType
      )
    );
  }

  return <div>
    <BlockStyleControls />
  </div>;
};

export default EditorOptions;