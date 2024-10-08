import React from 'react';
import styled from 'styled-components';
import {getContrastColor} from '../../../utils/colors';
import {SpringToFrom} from '../../../Animation/RemotionSpring';
import {useStylesContext} from '../../../context/StyleContext';
import {useLayoutContext} from '../../../context/LayoutContext';
import {PresentationalAssetType} from '../../../common/components/presentational/AssetType';
import {PresentationalOrganisationName} from '../../../common/components/presentational/OrganisationName';

const AssetTitleContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const AssetTitle = () => {
	const {StyleConfig, TextStyles} = useStylesContext();
	const {TIMINGS} = useLayoutContext();
	const {Font} = StyleConfig;
	const {FPS_INTRO} = TIMINGS;

	const assetTypeStyleObj = {
		...Font.Title,
		...TextStyles.introTitle,
		color: getContrastColor('#ECECEC'),
		width: '100%',
		margin: '0',
		padding: '0',
		textAlign: 'center',
		textTransform: 'uppercase',
		zIndex: '2000',
	};

	const assetTypeAnimationObj = {
		transform: `translateY(${SpringToFrom(
			3,
			-1000,
			1,
			'Wobbly'
		)}px) translateY(${SpringToFrom(FPS_INTRO - 35, 0, 1000, 'Slow')}px)`,
	};

	const organisationNameStyleObj = {
		...Font.TitleAlt,
		...TextStyles.introSubtitle,
		width: '80%',
		color: getContrastColor('#ECECEC'),
		margin: '10px 0 0 0',
		padding: '0',
		textAlign: 'center',
		textTransform: 'uppercase',
		zIndex: '2000',
	};

	const organisationNameAnimationObj = {
		transform: `translateY(${SpringToFrom(
			0,
			1000,
			1,
			'Wobbly'
		)}px) translateY(${SpringToFrom(FPS_INTRO - 37, 0, 1000, 'Slow')}px)`,
	};

	return (
		<AssetTitleContainer>
			<PresentationalAssetType
				styleObj={assetTypeStyleObj}
				animationObj={assetTypeAnimationObj}
			/>
			<PresentationalOrganisationName
				styleObj={organisationNameStyleObj}
				animationObj={organisationNameAnimationObj}
			/>
		</AssetTitleContainer>
	);
};
