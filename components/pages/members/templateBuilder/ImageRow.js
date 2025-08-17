//  ImageRow.js
import { testDatasets } from '../../../../remotionV2/testData/index';
import { templateRegistry } from '../../../../remotionV2/templates/registry';
import { Thumbnail } from '@remotion/player';
import { H } from '../../../Members/Common/Type';
import { useAccountDetails } from '../../../../context/userContext';
import { ExamplePlayerDialog } from './ExamplePlayerDialog';
import { useState, useMemo } from 'react';
import { AssetTypeSelector } from './primaryFilters/DisplayAssetTypeSelector';
import { mutateDataSet } from './libs/mutateDataSet';
import { formatSponsors } from './libs/formatSponsors';

const VideoRatio = {
  width: 1080,
  height: 1350,
  ratio: 1080 / 1350,
  fps: 30,
};

const ImageRow = props => {
  const { selectedDesignOptions } = props;
  const { account } = useAccountDetails();
  const [selectedAssetType, setSelectedAssetType] = useState({
    name: 'Cricket Results',
    slug: 'CricketResults',
  });

  const userAccountSettings = useMemo(
    () => ({
      theme: account.attributes.theme.data.attributes.Theme,
    }),
    [account.attributes.theme.data.attributes.Theme]
  );

  // Memoized formatted sponsors
  const formattedSponsors = useMemo(() => {
    return formatSponsors(account.attributes.sponsors.data);
  }, [account.attributes.sponsors.data]);

  const AccountTypeDetails = useMemo(() => {
    const type = account.attributes?.account_type?.data?.attributes.Name;
    return type === 'Club'
      ? account.attributes?.clubs?.data[0]?.attributes
      : account.attributes?.associations.data[0]?.attributes;
  }, [account]);

  const selectedDataset = useMemo(() => {
    return mutateDataSet(
      testDatasets[selectedAssetType.slug],
      selectedDesignOptions,
      userAccountSettings,
      AccountTypeDetails,
      formattedSponsors
    );
  }, [
    selectedAssetType.slug,
    selectedDesignOptions,
    userAccountSettings,
    AccountTypeDetails,
    formattedSponsors,
  ]);

  const selectedTemplateKey = useMemo(() => {
    return selectedDesignOptions?.selectedCategory?.value || 'Basic';
  }, [selectedDesignOptions?.selectedCategory?.value]);

  const selectedTemplate = useMemo(() => {
    return templateRegistry[selectedTemplateKey]?.component;
  }, [selectedTemplateKey]);

  const compositionLength =
    selectedDataset.timings.FPS_INTRO +
    selectedDataset.timings.FPS_OUTRO +
    selectedDataset.timings.FPS_MAIN;

  return (
    <div className='flex flex-col gap-0 '>
      <div className='flex flex-row gap-2 justify-between items-center mb-4'>
        <H size='h3' weight={700} align='left' mb={0}>
          <AssetTypeSelector
            selectedAssetType={selectedAssetType}
            setSelectedAssetType={setSelectedAssetType}
          />
        </H>
        <ExamplePlayerDialog
          selectedTemplate={selectedTemplate}
          compositionLength={compositionLength}
          selectedDataset={selectedDataset}
          VideoRatio={VideoRatio}
        />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 my-0'>
        {selectedDataset.frames.map((frame, index) => (
          <div
            key={index}
            style={{
              position: 'relative',
              aspectRatio: `${VideoRatio.width} / ${VideoRatio.height}`,
              background: '#111',
            }}
          >
            {selectedTemplate ? (
              <Thumbnail
                component={selectedTemplate}
                durationInFrames={compositionLength || 1000}
                compositionHeight={VideoRatio.height}
                compositionWidth={VideoRatio.width}
                fps={VideoRatio.fps}
                frameToDisplay={frame}
                inputProps={{ data: selectedDataset }}
                style={{ width: '100%' }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: '#222',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                No template selected
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageRow;
