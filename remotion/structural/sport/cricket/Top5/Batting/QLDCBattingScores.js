import React from 'react';
import {FromLeftToRight} from '../../../../../Animation/ClipWipe';
import {useStylesContext} from '../../../../../context/StyleContext';
import {P} from '../../../../../common/type/primitives';

const QLDCBattingScores = ({COLOR, player, int}) => {
	const {StyleConfig, TextStyles} = useStylesContext();
	const {Font} = StyleConfig;

	const {player: Name, runs: Runs, notOut: isNotOut, balls: Balls} = player;
	const restrictedValues = ['Total', 'Extras', 'Private Player', '', 0];

	if (restrictedValues.includes(Name) || restrictedValues.includes(Runs)) {
		return null;
	}

	const BattingPerformanceStyles = {
		...Font.Copy,
		...TextStyles.copyXLargeBold,
		letterSpacing: '-4px',
		color: COLOR,
		textTransform: 'uppercase',
		margin: '15px 0',
		clipPath: FromLeftToRight(15 + int * 7, 'Slow'),
	};

	const BallStyles = {
		fontSize: Runs.toString().length < 2 ? '0.5em' : '0.4em',
		...Font.Copy,
	};

	const combinedSpanStyles = {
		fontWeight: '400',
		...BallStyles,
	};

	return (
		<P {...BattingPerformanceStyles}>
			{Runs}
			{isNotOut ? '*' : ''}
			<span style={combinedSpanStyles}>
				{Balls !== '0' && Balls !== 'undefined' ? ` (${Balls})` : ''}
			</span>
		</P>
	);
};

export default QLDCBattingScores;
