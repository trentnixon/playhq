import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
//import {COLOR_1, FONT_FAMILY} from './constants';

const subtitle= {

	fontSize: 40,
	textAlign: 'center',
	position: 'absolute',
	bottom: 140,
	width: '100%',
};

export const Subtitle= () => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 30], [0, 1]);
	return (
		<div style={{...subtitle, opacity}}>
			This is a PLAYHQ Test. nothing to see here
		</div>
	);
};
 