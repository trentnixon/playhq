import {Sequence} from 'remotion';
import styled from 'styled-components';
//import {AccountName} from './AccountName';
import {AccountLogo} from './AccountLogo';
import {AssetTitle} from './AssetTitle';
import IntroPrimarySponsorOnly from '../../../../structural/Sponsors/Intro/IntroPrimarySponsorOnly';
export const TitleSequenceFrame = (props) => {
	const {FPS_INTRO} = props;
	return (
		<Sequence durationInFrames={FPS_INTRO} layout="none">
			<IntroContainer>
				<AccountLogo {...props} />
				<AssetTitle {...props} />
			</IntroContainer>
			<IntroPrimarySponsorOnly {...props} />
		</Sequence>
	);
};

const IntroContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
