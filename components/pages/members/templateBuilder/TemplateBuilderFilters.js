import { ColorSwatch } from '@mantine/core';
import { P } from '../../../Members/Common/Type';
import { TemplatePalettes } from './primaryFilters/DisplayTemplatePalettes';
import { BackgroundOptions } from './primaryFilters/DisplayBackgroundOptions';
import SecondaryFilterOptions from './secondaryFilterOptions/secondaryFilterOptions';

export default function TemplateBuilderFilters(props) {
  return (
    <div className='flex flex-row gap-2  justify-between items-center w-full'>
      {/* <BrandColors Theme={Theme} /> */}

      <div className='flex flex-2 flex-row gap-4 justify-start items-center'>
        <TemplatePalettes {...props} />
        <BackgroundOptions {...props} />
      </div>
      <div className='flex flex-1 flex-row gap-2 justify-end items-center'>
        <SecondaryFilterOptions {...props} />
      </div>
    </div>
  );
}

const BrandColors = ({ Theme }) => {
  return (
    <div className='flex flex-1 flex-row gap-2 justify-start items-center'>
      <div className='flex flex-row items-center justify-start w-full'>
        <span className='flex items-center gap-1'>
          <ColorSwatch color={Theme.primary} size={20} radius={'sm'} />
          <P size='sm' marginBottom={0} color={8} Weight={400}>
            Primary
          </P>
        </span>
      </div>

      <div className='flex flex-row items-center justify-start w-full'>
        <span className='flex items-center gap-1'>
          <ColorSwatch color={Theme.secondary} size={20} radius={'sm'} />
          <P size='sm' marginBottom={0} color={8} Weight={400}>
            Secondary
          </P>
        </span>
      </div>
    </div>
  );
};
