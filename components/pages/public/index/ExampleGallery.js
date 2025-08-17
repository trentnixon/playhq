import { Group, Image } from '@mantine/core';
import Section from '../../../UI/DefaultSection';

export const ExampleGallery = () => {
  const carouselData = [
    {
      image:
        'https://fixtura.s3.ap-southeast-2.amazonaws.com/Up_Coming_Fixtures_inner_west_canterbury_bankstown_825_0658baac1472_806c81da54.png',
      title: 'Example 2',
      category: 'Basic: Outside Edge',
      video: '',
      MainDescription: '',
    },

    {
      image:
        'https://fixtura.s3.ap-southeast-2.amazonaws.com/LDCC_Lindfield_Cricket_SENIORS_Ladder_d4fa6ef4097c_a1fdd02d07_0ac91bba80.png',
      title: 'Example 1',
      category: 'Basic: Soft Hands',
      video: '',
      MainDescription: '',
    },
    {
      image:
        'https://fixtura.s3.ap-southeast-2.amazonaws.com/Coastal_Challenge_Weekend_Result_Coastal_Challenge_Coastal_Challenge_50_Overs_7222c88a67fc_120_cc66332dc7.png',
      title: 'Example 1',
      category: 'Basic: Soft Hands',
      video: '',
      MainDescription: '',
    },
    {
      image:
        'https://fixtura.s3.ap-southeast-2.amazonaws.com/Sydney_Shires_Competition_Top_5_Sydney_Shires_Competition_Second_Grade_The_SJ_Mayne_Trophy_5373b8a442a0_390_a30c65e65d.png',
      title: 'Example 1',
      category: 'Basic: Soft Hands',
      video: '',
      MainDescription: '',
    },
    {
      image:
        'https://fixtura.s3.ap-southeast-2.amazonaws.com/Freyberg_CC_Top_5_Senior_d09d77e19e2f_390_19a6018aab.png',
      title: 'Example 1',
      category: 'Basic: Soft Hands',
      video: '',
      MainDescription: '',
    },
  ];

  return (
    <Group position='center'>
      {carouselData.map((img, i) => {
        return (
          <div
            key={i}
            data-aos='fade-up'
            data-aos-duration='1200'
            data-aos-delay={`${250 + 100 * i}`}
            /* onMouseEnter={() => handleServiceHover(service.title)} */
          >
            <Image width={200} src={img.image} />
          </div>
        );
      })}
    </Group>
  );
};
