import React, { useState, useEffect } from "react";
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

	const removeFrontP = value.replace("<p>", "");
	const removeLastP = removeFrontP.substring(
		0,
		removeFrontP.lastIndexOf("</p>")
	);
	const valueArray = removeLastP.split("</p><p>");

	const onChange = (content, delta, source, editor) => {
		setValue(editor.getHTML());
	};

	useEffect(() => {
		setValue(responseArray.join(""));
	}, [responseArray]);

	useEffect(() => {
		console.log(value);
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

	const setMultiline = () => {
		setValue("<p>hi</p><p><br></p><p>1</p>");
	};

	return (
		<>
			<ButtonDiv>
				<StyledButton onClick={onClick}>Send!</StyledButton>
				<StyledButton onClick={setMultiline}>Set!</StyledButton>
			</ButtonDiv>
			<RestyledReactQuill theme="snow" value={value} onChange={onChange} />
			<Value>{value}</Value>
		</>
	);
}
