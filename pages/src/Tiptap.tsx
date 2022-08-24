import { useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import axios from "axios";
import styled from "styled-components";
import StarterKit from "@tiptap/starter-kit";

const ButtonDiv = styled.div`
	display: flex;
	justify-content: center;
	gap: 8px;
`;

const Button = styled.button`
	padding: 8px 12px;
	background-color: orange;
	border: none;
	border-radius: 4px;
	margin-bottom: 8px;
`;

const EditorWrapper = styled.div`
	border: 1px solid grey;
	padding: 0 8px;
	height: 500px;
	border-radius: 8px;
	.ProseMirror:focus {
		outline: none;
	}
`;

const Tiptap = () => {
	const editorRef = useRef();
	const editor = useEditor({
		extensions: [StarterKit],
		content: "<p>Hello World!</p>",
		autofocus: true,
	});

	console.log(editor);

	const sendData = () => {};

	const onClick = () => {
		editorRef?.current?.props.editor
			.chain()
			.setContent("<p>hi!</p><p></p>")
			.focus("end")
			.run();
	};

	return (
		<>
			<ButtonDiv>
				<Button onClick={sendData}>Send Data</Button>
				<Button onClick={onClick}>setcontent!</Button>
			</ButtonDiv>
			<EditorWrapper
				onClick={() => {
					editor?.commands.focus();
				}}
			>
				<EditorContent editor={editor} ref={editorRef} />
			</EditorWrapper>

			<div>
				<strong>JSON format!</strong>
			</div>
			<div>{JSON.stringify(editor?.getJSON())}</div>
			<div>
				<strong>HTML format!</strong>
			</div>
			<div>{editor?.getHTML()}</div>
			<div>{editor?.getText({ blockSeperator: "<br>" })}</div>
			{/* <div>{JSON.stringify(editor)}</div> */}
		</>
	);
};

export default Tiptap;
