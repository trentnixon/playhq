import styled from 'styled-components';
import {restrictString} from '../../../../../../utils/copy';
import {useStylesContext} from '../../../../../../context/StyleContext';

const HeaderContainerStyles = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 60px;
	width: 90%;
	margin: 0 auto 30px;
	padding: 0 10px;
	background-color: transparent;
	border-radius: ${(props) => props.borderRadius};
`;

const HeaderCopy = styled.p`
	display: block;
	text-transform: uppercase;
	width: 100%;
`;

const GameType = styled(HeaderCopy)`
	width: 50%;
`;

const Round = styled(HeaderCopy)`
	width: 50%;
	text-align: right;
`;

export const CaloundraCCFixtureData = (props) => {
	const {matchData} = props;

	const {StyleConfig, BuildProps, TextStyles} = useStylesContext();
	const {TemplateVariation} = BuildProps;
	const {Font, Color} = StyleConfig;
	const {type, round, ground} = matchData;
	console.log('matchData ', matchData);
	return (
		<HeaderContainerStyles
			BackgroundColor={Color.Primary.Darken}
			borderRadius={TemplateVariation.borderRadius}
		>
			<GameType>
				<HeaderCopy
					style={{
						...Font.Copy,
						...TextStyles.copyMedium,
						color: Color.Primary.Contrast,
					}}
				>
					{type}
				</HeaderCopy>
			</GameType>

			<Round>
				<HeaderCopy
					style={{
						...Font.Copy,
						...TextStyles.copyMedium,
						color: Color.Primary.Contrast,
					}}
				>
					{round}
				</HeaderCopy>
			</Round>
		</HeaderContainerStyles>
	);
};
