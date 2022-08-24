import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";

const Value = styled.div`
	font-size: 16px;
	color: gray;
`;

const RestyledReactQuill = styled(ReactQuill)`
	.ql-container {
		height: 400px;
	}
`;

const ButtonDiv = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
`;

const StyledButton = styled.button`
	padding: 8px 14px;
	background-color: orange;
	margin: 0 4px 8px 4px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
`;

export default function QuillEditor() {
	const [value, setValue] = useState<string>("");
	const [responseArray, setResponseArray] = useState<string[]>([]);
	const quillRef = useRef();
	const removeFrontP = value.replace("<p>", "");
	const removeLastP = removeFrontP.substring(
		0,
		removeFrontP.lastIndexOf("</p>")
	);
	const valueArray = removeLastP.split("</p><p>");

	const onChange = (content, delta, source, editor) => {
		setValue(editor.getHTML());
		console.log("--------------");
		console.log(editor.getSelection().index);
		console.log(JSON.stringify(editor.getContents()));
		// console.log(JSON.stringify(editor.getContents().ops[0].insert));
	};

	const setMultiline = () => {
		quillRef?.current
			?.getEditor()
			.setContents([
				{ insert: "Hello" },
				{ insert: "World\nhi", attributes: { bold: true } },
				{ insert: "\n\n" },
			]);
	};

	const hi = {
		ops: [
			{ insert: "eef" },
			{ attributes: { bold: true }, insert: "evv" },
			{ insert: "e ! nenv" },
			{ attributes: { italic: true }, insert: "nne" },
			{ insert: "!n 1\nevn" },
			{ attributes: { underline: true }, insert: "wn" },
			{ insert: "ennv!\n" },
		],
	};

	useEffect(() => {
		setValue(responseArray.join(""));
	}, [responseArray]);

	useEffect(() => {
		// const selection = quillRef?.current?.getEditor().getSelection();
		// const path = selection?.index;
		// console.log(path);
		// console.log(quillRef?.current?.getEditor());
	}, [value]);

	const onClick = () => {
		if (value.length > 0) {
			valueArray.forEach(async (item) => {
				await axios
					.post("http://pcanpi.iptime.org:9999/simple_token", {
						text: item,
					})
					.then((res) => {
						if (res.data.join(" ") !== "<u><br></u>") {
							setResponseArray((prev) => [
								...prev,
								`<p>${res.data.join(" ")}</p>`,
							]);
						} else {
							setResponseArray((prev) => [...prev, "<p><br></p>"]);
						}
					});
			});
		}
	};

	const handleChangeSelection = (range) => {
		console.log();
	};

	return (
		<>
			<ButtonDiv>
				<StyledButton onClick={onClick}>Send!</StyledButton>
				<StyledButton onClick={setMultiline}>Set!</StyledButton>
			</ButtonDiv>
			<RestyledReactQuill
				theme="snow"
				value={value}
				onChange={onChange}
				onChangeSelection={handleChangeSelection}
				ref={quillRef}
			/>
			<Value>{value}</Value>
		</>
	);
}
