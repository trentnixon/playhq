import {Sequence, Series} from 'remotion';
import styled from 'styled-components';

// Components
import {AccountLogo} from './AccountLogo';
import {AccountName} from './AccountName';
import {AssetTitle} from './AssetTitle';
import {PrincipalSponsor} from './PrincipalSponsor';

export const TitleSequenceFrame = ({theme, FPS, DATA}) => {
	return (
		<>
			<Sequence>
				<Series>
					<Series.Sequence durationInFrames={FPS} layout="none">
						<IntroContainer>
							<IntroInnerContianer>
								<AccountLogo DATA={DATA} FPS={FPS} />

								<IntroGroupCopy>
									<AssetTitle DATA={DATA} theme={theme} FPS={FPS} />
									<AccountName DATA={DATA} theme={theme} FPS={FPS} />
								</IntroGroupCopy>
							</IntroInnerContianer>
						</IntroContainer>

						<PrincipalSponsor DATA={DATA} theme={theme} FPS={FPS} />
					</Series.Sequence>
				</Series>
			</Sequence>
		</>
	);
};

const IntroContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	align-content: center;
	justify-content: center;
	flex-shrink: 0;
`;

const IntroInnerContianer = styled.div`
	display: flex;
	align-items: center;
	align-content: center;
	justify-content: center;
	margin: 0 2%;
	width: 96%;
`;
const IntroGroupCopy = styled.div`
	display: flex;
	flex-direction: column;
`;
