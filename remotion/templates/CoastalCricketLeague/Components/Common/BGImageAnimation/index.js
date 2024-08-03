/* eslint-disable no-case-declarations */
import {useCurrentFrame, Img, AbsoluteFill, OffthreadVideo} from 'remotion';
import {interpolateOpacityByFrame} from '../../../../../Animation/interpolate';
import {useStylesContext} from '../../../../../context/StyleContext';

// Helper function to check the image size ratio compared to the screen size

export const BGImageAnimation = () => {
	const {StyleConfig} = useStylesContext();
	const {Color} = StyleConfig;
	const cleanPlate = {
		backgroundColor: Color.Primary.Main,
		height: '100%',
		width: '100%',
	};
	return (
		<div style={cleanPlate}>
			<GradientTop />
			<BGImage />
		</div>
	);
};

const GradientTop = () => {
	const {StyleConfig} = useStylesContext();
	const {Color} = StyleConfig;
	const GradientTopStyles = {
		zIndex: 200,
		width: '100%',
		height: '50%',
		background: `linear-gradient(180deg, ${Color.Secondary.Main},transparent)`,
	};

	return <div style={GradientTopStyles} />;
};

const BGImage = () => {
	const CCLBGImage =
		'https://fixtura.s3.ap-southeast-2.amazonaws.com/maxresdefault_0859fd2bcc.jpg';
	const frame = useCurrentFrame();
	const BGImageStyles = {
		zIndex: 10,
	};

	return (
		<AbsoluteFill style={BGImageStyles}>
			<AbsoluteFill>
				<OffthreadVideo
					style={{
						opacity: interpolateOpacityByFrame(frame, 60, 120, 1, 0.05),
					}}
					startFrom={0}
					playbackRate={1.4}
					src="https://fixtura.s3.ap-southeast-2.amazonaws.com/1030x1350_CCL_Video_d30f118bc7.mp4"
				/>
			</AbsoluteFill>
			<Img
				style={{
					width: '100%',
					opacity: 0.25,
				}}
				src={CCLBGImage}
			/>
		</AbsoluteFill>
	);
};
