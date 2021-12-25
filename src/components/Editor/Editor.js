import { ContentState, Editor as EditorDraft, EditorState } from "draft-js";
import { useRef, useState, Component } from "react";
import { RichUtils } from "draft-js";

import { postReq } from "functions/api-calls/post-requests";
// import usePost from "functions/api-calls/usePost";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(
        ContentState.createFromText(this.props.note)
      ),
    };
  }
  
  async componentDidUpdate() {
    console.log("ayo");
    console.log(this.state.editorState.getCurrentContent().getPlainText());
    const {params, dispatch} = this.props;
    try {
      const noteO = {
        noteId: params.note_id,
        note: this.state.editorState.getCurrentContent().getPlainText()
      };
      console.log(params.note_id);
      await postReq(noteO, "/update");
      dispatch(this.state.editorState.getCurrentContent().getPlainText(), noteO.noteId);
    } catch (err) {}
  }

  async updateEditorState(editorState) {
    this.setState({ editorState });
  }

  render() {
    return (
      <div>
        <EditorDraft
          editorState={this.state.editorState}
          onChange={this.updateEditorState.bind(this)}
        />
      </div>
    );
  }
}

export default Editor;
