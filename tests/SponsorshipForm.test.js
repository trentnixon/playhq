import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import SponsorshipForm from '../components/pages/members/sponsors/allocation/SponsorshipForm';
import {
  useCreateSponsorshipAllocation,
  useDeleteSponsorshipAllocation,
  useUpdateSponsorshipAllocation,
} from '../Hooks/useSponsorshipAllocations';

// Mock hooks
jest.mock('../Hooks/useSponsorshipAllocations', () => ({
  useCreateSponsorshipAllocation: jest.fn(),
  useUpdateSponsorshipAllocation: jest.fn(),
  useDeleteSponsorshipAllocation: jest.fn(),
}));

const mockSponsors = [
  {
    id: 1,
    attributes: {
      Name: 'Sponsor 1',
      Logo: {
        data: {
          attributes: {
            url: 'https://example.com/sponsor1.png',
          },
        },
      },
      sponsorship_allocations: {
        data: [],
      },
    },
  },
  {
    id: 2,
    attributes: {
      Name: 'Sponsor 2',
      Logo: {
        data: {
          attributes: {
            url: 'https://example.com/sponsor2.png',
          },
        },
      },
      sponsorship_allocations: {
        data: [
          {
            id: 1,
            attributes: {
              Allocation: {
                sponsorId: 2,
                name: 'Sponsor 2',
                logo: 'https://example.com/sponsor2.png',
                accountType: 'Association',
                level: 'main_sponsor',
              },
            },
          },
        ],
      },
    },
  },
];

const mockLevel = { level: 'Main Sponsor', id: 'main_sponsor' };
const mockAccountType = 'Association';

// Mock implementation of the hooks
const mockCreate = jest.fn();
const mockUpdate = jest.fn();
const mockDelete = jest.fn();

useCreateSponsorshipAllocation.mockReturnValue([mockCreate, false, null]);
useUpdateSponsorshipAllocation.mockReturnValue([mockUpdate, false, null]);
useDeleteSponsorshipAllocation.mockReturnValue([mockDelete, false, null]);

describe('SponsorshipForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the SponsorshipForm component', () => {
    render(
      <SponsorshipForm
        level={mockLevel}
        sponsors={mockSponsors}
        accountType={mockAccountType}
      />
    );

    expect(screen.getByText('Main Sponsor')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Select Sponsor')).toBeInTheDocument();
  });

  it('selects a sponsor and creates a new allocation', async () => {
    render(
      <SponsorshipForm
        level={mockLevel}
        sponsors={mockSponsors}
        accountType={mockAccountType}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Select Sponsor'), {
      target: { value: '1' },
    });
    expect(screen.getByText('Sponsor 1')).toBeInTheDocument();

    await waitFor(() =>
      expect(mockCreate).toHaveBeenCalledWith({
        Allocation: {
          sponsorId: 1,
          name: 'Sponsor 1',
          logo: 'https://example.com/sponsor1.png',
          accountType: 'Association',
          level: 'main_sponsor',
        },
        sponsor: { id: 1 },
      })
    );
  });

  it('updates an existing allocation', async () => {
    render(
      <SponsorshipForm
        level={mockLevel}
        sponsors={mockSponsors}
        accountType={mockAccountType}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Select Sponsor'), {
      target: { value: '1' },
    });

    await waitFor(() =>
      expect(mockUpdate).toHaveBeenCalledWith(1, {
        Allocation: {
          sponsorId: 1,
          name: 'Sponsor 1',
          logo: 'https://example.com/sponsor1.png',
          accountType: 'Association',
          level: 'main_sponsor',
        },
        sponsor: { id: 1 },
      })
    );
  });

  it('deletes an existing allocation', async () => {
    render(
      <SponsorshipForm
        level={mockLevel}
        sponsors={mockSponsors}
        accountType={mockAccountType}
      />
    );

    fireEvent.click(screen.getByText('Remove'));

    await waitFor(() => expect(mockDelete).toHaveBeenCalledWith(1));
    expect(screen.queryByText('Sponsor 2')).not.toBeInTheDocument();
  });
});
