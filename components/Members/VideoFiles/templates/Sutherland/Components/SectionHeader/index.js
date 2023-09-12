import React from 'react';
import styled from 'styled-components';
import {DisplayLogo} from './Logo';
import {DisplayClubName} from './ClubLabel';
import {AssetName} from './AssetName';
import { useCurrentFrame } from 'remotion';

export const LogoClubTitleHeader = ({THEME, DATA, FPS_MAIN}) => {
	console.log(DATA.Video.TitleSplit);
	return (
		<HeaderContainer>
			<HeaderInnerContainer>
				<DisplayLogo FPS_MAIN={FPS_MAIN} LOGO={DATA.Club.Logo} />
				<HeaderGroupCopy>
					<DisplayClubName
						FPS_MAIN={FPS_MAIN}
						THEME={THEME}
						NAME={DATA.Club.Name}
					/>

					<AssetName
						Name={DATA.Video.TitleSplit}
						THEME={THEME}
						FPS_MAIN={FPS_MAIN}
					/>
				</HeaderGroupCopy>
			</HeaderInnerContainer>
		</HeaderContainer>
	);
};

const HeaderContainer = styled.div`
	height: 300px;
	width: 100%;
	position: absolute;
	display: flex;
	align-items: flex-start;
	align-content: flex-start;
	justify-content: flex-start;
	flex-shrink: 0;
	margin-top: 40px;

`;

const HeaderInnerContainer = styled.div`
	display: flex;
	align-items: center;
	align-content: flex-start;
	justify-content: flex-start;
	margin: 0 2%;
	width: 96%;
`;
const HeaderGroupCopy = styled.div`
	display: flex;
	flex-direction: column;
	width: 1200px;

`;

export const LogoClubTitleHeaderLimited = ({THEME, DATA, FPS_MAIN}) => {
	const frame = useCurrentFrame();

	return (
		<HeaderContainer>
			<HeaderInnerContainer>
				<DisplayLogo FPS_MAIN={FPS_MAIN} LOGO={DATA.Club.Logo} />
				<HeaderGroupCopy>
					<DisplayClubName
						FPS_MAIN={FPS_MAIN}
						THEME={THEME}
						NAME={DATA.Club.Name}
					/>

					<AssetName
						Name={DATA.Video.TitleSplit}
						THEME={THEME}
						FPS_MAIN={FPS_MAIN}
					/>
				</HeaderGroupCopy>
			</HeaderInnerContainer>
		</HeaderContainer>
	);
};
const Container = styled.div` 
	z-index: 1000;
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	justify-content: flex-start;
	position: absolute;
	height: 380px;
`;
