import styled from 'styled-components';
import {useCurrentFrame} from 'remotion';
import {FromRightToLeft} from '../../../../Animation/ClipWipe';
import {interpolateOpacityByFrame} from '../../../../Animation/interpolate';
import {LadderHeaderItems} from '../../../../common/components/copy/commonAssetTypes';
import {useStylesContext} from '../../../../context/StyleContext';
import {useLayoutContext} from '../../../../context/LayoutContext';

const LadderPositionContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-content: center;
	align-items: flex-end;
	margin: 2px auto;
	padding: 5px 10px;
	width: 100%;
	height: ${(props) => props.Height}px;
	background-color: white;
	background-color: ${(props) => props.bgColor};
`;

const Name = styled.span`
	color: ${(props) => props.color};
	width: 60%;
`;
const MetaContainer = styled.div`
	width: 36%;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
	padding: 5px 0;
`;
export const CreateLadderHeader = (props) => {
	const {LadderDataPoints, LadderPositionContainerHeight} = props;

	const {StyleConfig, TextStyles} = useStylesContext();

	const {TIMINGS} = useLayoutContext();

	const {Font, Color} = StyleConfig;
	const {FPS_LADDER} = TIMINGS;
	const frame = useCurrentFrame();

	const LadderDataPointStyles = {
		...TextStyles.copySmall,
		color: Color.Primary.Contrast,
		textAlign: 'center',
		minWidth: `${100 / LadderDataPoints.length}%`,
		marginLeft: '5px',
	};

	return (
		<LadderPositionContainer
			style={{
				...Font.Copy,
				clipPath: FromRightToLeft(30, 'Slow'),
				opacity: interpolateOpacityByFrame(
					frame,
					FPS_LADDER - 30,
					FPS_LADDER,
					1,
					0
				),
			}}
			bgColor="transparent"
			Height={LadderPositionContainerHeight}
		>
			<Name color={Color.Secondary.Darken}>{` `}</Name>
			<MetaContainer>
				{LadderDataPoints.map((item, i) => {
					return (
						<LadderHeaderItems key={i} customStyles={LadderDataPointStyles}>
							{item}
						</LadderHeaderItems>
					);
				})}
			</MetaContainer>
		</LadderPositionContainer>
	);
};
