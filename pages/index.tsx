import styled from "styled-components";
import dynamic from "next/dynamic";
import Tiptap from "./src/Tiptap";

const QuillEditor = dynamic(() => import("./src/QuillEditor"), { ssr: false });

const Main = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 80px;
`;

const Title = styled.h1<{ marginTop: number }>`
	font-size: 20px;
	${({ marginTop }) => marginTop && `margin-top: ${marginTop}px;`};
`;

const QuilDiv = styled.div`
	width: 80%;
`;

export default function Home() {
	return (
		<Main>
			<Title>Quill</Title>
			<QuilDiv>
				<QuillEditor />
			</QuilDiv>
			<Title>Tiptap</Title>
			<QuilDiv>
				<Tiptap />
			</QuilDiv>
		</Main>
	);
}
