import {Sequence, Series} from 'remotion';
import styled from 'styled-components';
import {AccountName} from './AccountName';
import {AccountLogo} from './AccountLogo';
import {AssetTitle} from './AssetTitle';
import {PrincipalSponsor} from './PrincipalSponsor';

export const TitleSequenceFrame = ({theme, FPS, DATA}) => {
	return (
		<>
			<Sequence>
				<Series>
					<Series.Sequence durationInFrames={FPS} layout="none">
						<IntroContainer>
							<AccountName DATA={DATA} theme={theme} FPS={FPS} />
							<AccountLogo DATA={DATA} FPS={FPS} />
							<AssetTitle 
							
								DATA={DATA}
								theme={theme}
								FPS={FPS}
							/>
						</IntroContainer>
						<PrincipalSponsor
							
							DATA={DATA}
							theme={theme}
							FPS={FPS}
						/>
					</Series.Sequence>
				</Series>
			</Sequence>
		</>
	);
};

const IntroContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
