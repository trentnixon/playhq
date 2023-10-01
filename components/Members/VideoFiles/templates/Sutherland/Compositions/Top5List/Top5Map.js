import React from 'react';
import styled from 'styled-components';
import {Img, useCurrentFrame} from 'remotion';

import {SpringToFrom} from '../../../../Animation/RemotionSpring';
import {interpolateOpacityByFrame} from '../../../../Animation/interpolate';
import {
	getContrastColor,
	darkenColor,
	setOpacity,
} from '../../../../utils/colors';

import useImageDimensions from '../../../../hooks/useImageDimensions';
import {BattingScores, BowlingScores} from './Scores';
import {PlayerPerformance, TeamLogoBox} from './Containers';
import {PlayerDetails} from './PlayerDetials';

// PlayedFor
const PlayerContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	align-items: center;
	align-content: flex-end;
	width: 100%;
	margin: 0%;
`;

const PlayerScoreContianer = styled.div``;

const Group = styled.div`
	display: flex;
	justify-content: center;
    align-items: center;
`;

export const Top5PlayersMap = ({DATA, THEME, fontFamily, FPS_MAIN, TYPE}) => {
	const frame = useCurrentFrame();
	const IMGSIZING = [80, 80, 80];

	return (
		<PlayerContainer>
			{DATA.map((player, i) => {
				//console.log(player);
				const TemLogoStyles = useImageDimensions(player.teamLogo, IMGSIZING);
				return (
					<PlayerPerformance key={i} i={i} THEME={THEME} FPS_MAIN={FPS_MAIN}>
						<PlayerScoreContianer>
							{TYPE === 'BATTING' ? (
								<BattingScores
									player={player}
									fontFamily={fontFamily}
									COLOR={getContrastColor(THEME.primary)}
								/>
							) : (
								<BowlingScores
									player={player}
									fontFamily={fontFamily}
									COLOR={getContrastColor(THEME.primary)}
								/>
							)}
						</PlayerScoreContianer>
						<TeamLogoBox THEME={THEME} i={i}>
								<Img
									src={player.teamLogo}
									style={{...TemLogoStyles, borderRadius: '100%'}}
								/>
							</TeamLogoBox>
						<PlayerDetails THEME={THEME} i={i} player={player} />
						
					</PlayerPerformance>
				);
			})}
		</PlayerContainer>
	);
};
