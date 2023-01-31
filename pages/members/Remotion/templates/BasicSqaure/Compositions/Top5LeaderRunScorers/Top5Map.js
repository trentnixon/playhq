import React from 'react';
import styled  from 'styled-components';
import {
	useCurrentFrame,
} from 'remotion';

import {SpringToFrom} from '../../../../Animation/RemotionSpring';
import {interpolateOpacityByFrame} from '../../../../Animation/interpolate';
import {
	getContrastColor,
	lightenColor,
	darkenColor,
} from '../../../../utils/colors';



const Top5PlayersMap = ({DATA, THEME, fontFamily})=>{
	
	const frame = useCurrentFrame();
  return(
    <PlayerContainer>
					{DATA.map((player, i) => {
						return (
							<PlayerROW
								key={i}
								style={{
									backgroundColor: i===0 ?THEME.secondary :THEME.primary,
									opacity: interpolateOpacityByFrame(
										frame,
										30 * ((5-i) + 1),
										40 * ((5-i) + 1),
										0,
										1
									),
									transform: `translateX(${SpringToFrom(
										30 * ((5-i) + 1),
										-1440,
										0,
										'Wobbly'
									)}px) translateX(${SpringToFrom(
										(270+i),
										0,
                    1440,
										'Wobbly'
									)}px)`,
								}}
							>
								<SmallBoxLeftSide
									style={{
										background: i===0 ?THEME.primary :THEME.secondary,
										borderColor: i===0 ?THEME.secondary:THEME.primary ,
									}}
								/>

								<PlayerMetaContainer>
									<PlayerName
										style={{
											color: getContrastColor(i===0 ?THEME.secondary:THEME.primary),
											fontFamily,
										}}
									>
										{player.player}
									</PlayerName>
									<PlayerGradeTeam
										style={{
											color: getContrastColor(i===0 ?THEME.secondary:THEME.primary),
											fontFamily,
										}}
									>
										{player.name} : {player.state}
									</PlayerGradeTeam>
								</PlayerMetaContainer>
								<PlayerScoreContianer
									style={{
										background: darkenColor(i===0 ?THEME.secondary:THEME.primary),
										borderColor:(i===0 ?THEME.secondary:THEME.primary),
									}}
								>
									<PlayerScore
										style={{
											color: getContrastColor(darkenColor(i===0 ?THEME.secondary:THEME.primary)),
											fontFamily,
										}}
									>
										{player.score}
									</PlayerScore>
								</PlayerScoreContianer>
							</PlayerROW>
						);
					})}
				</PlayerContainer>
  )
}


export default Top5PlayersMap

const PlayerContainer = styled.div`
	position: absolute;
	width: 94%;
	height: 1280px;
	left: 3%;
	top: 33%;
`;

const PlayerROW = styled.div`
	position: relative;
	height: 190px;
	margin-bottom: 30px;
`;

const PlayerScoreContianer = styled.div`
	box-sizing: border-box;
	position: absolute;
	right: 0px;
	top: 0%;
	bottom: 86.11%;
	width: 341px;
	height: 190px;
	border: 1px solid;
`;

const PlayerScore = styled.h1`
width: 100%;
height: 190px;
font-style: normal;
font-weight: 700;
font-size: 4.5em;
text-align: center;
letter-spacing: -0.05em;
text-transform: uppercase;
margin: revert;
`;

const SmallBoxLeftSide = styled.div`
	box-sizing: border-box;
	position: absolute;
	left: 0%;
	top: 0%;
	height: 190px;
	width: 35px;
	border: 1px solid;
`;

const PlayerMetaContainer = styled.div`
	height: 190px;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const PlayerName = styled.h1`
	margin: 0 0 0 60px;

	font-style: normal;
	font-weight: 400;
	font-size: 65px;
	line-height: 65px;
	display: flex;
	align-items: center;
	letter-spacing: 0.02em;
	text-transform: uppercase;
`;

const PlayerGradeTeam = styled.h1`
	margin: 0 0 0 60px;

	font-style: normal;
	font-weight: 400;
	font-size: 45px;
	line-height: 45px;
	letter-spacing: -0.005em;
	text-transform: uppercase;
`;
