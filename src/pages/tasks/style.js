import styled from 'styled-components';

export const Input = styled.input`
	width: 222px;
	height: 51px;
	padding: 10px;
	background: #f3f3f3;
	box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.1);
	border-radius: 5px;
	border: none;
`;

export const Ul = styled.ul`
	display: contents;
`;

export const Li = styled.ul`
	width: 222px;
	font-weight: bold;
	height: 51px;
	padding: 10px;
	background: #f5f0f0;
	display: block;
	border-bottom: 1px solid white;
	&:hover {
		cursor: pointer;
		background-color: rgba(0, 0, 0, 0.14);
	}
`;

export const SuggestContainer = styled.div`
	position: absolute;
	width: 242px;
	z-index:999999;
	overflow: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
`;

export const SuggestContainerTask = styled.div`
	position: absolute;
	width: 250px;
	z-index:999999;
	overflow: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
`;