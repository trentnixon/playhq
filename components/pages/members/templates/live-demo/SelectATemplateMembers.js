// src/Components/Templates/SelectATemplateMembers.js

import { useEffect, useState, useMemo } from 'react';
import { Container, SimpleGrid, Modal } from '@mantine/core';
import { useAssignDesignElement } from '../../../../../Hooks/useCustomizer';
import { useAccountDetails } from '../../../../../context/userContext';
import { P } from '../../../../Members/Common/Type';
import { FixturaDivider } from '../../../../Members/Common/Divider';
import { RoundedSectionContainer } from '../../../../UI/Containers/SectionContainer';
import CategoryFilter from '../../../../Common/live-demo/CategoryFilter';
import { TemplateCardMembers } from './Components/TemplateCardMembers';
import { generateCategoryOptions } from '../../../../../utils/templateUtils';
import { useGETDesignElement } from '../../../../../Hooks/useCustomizer';
import { FindAccountType } from '../../../../../lib/actions';

export const SelectATemplateMembers = ({ hasMediaItems }) => {
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [DesignElement, CreateDesignElement] = useAssignDesignElement();
  const [GetElement, FetchElement] = useGETDesignElement();
  const accountType = FindAccountType(account);

  useEffect(() => {
    setUserAccount(account);
  }, [account]);

  useEffect(() => {
    ReRender();
  }, [DesignElement]);

  const fetchTemplates = async () => {
    await FetchElement({ COLLECTIONID: 'templates' });
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const filterFn = template => {
    const isPublic = template.attributes.public;
    const isTemplateUserTemplate =
      userAccount.attributes.template_option?.data?.id === template.id;
    return userAccount.attributes.hasCustomTemplate
      ? isTemplateUserTemplate
      : isPublic;
  };

  const templates = useMemo(() => {
    if (Array.isArray(GetElement)) {
      const filterFn = template => {
        const isPublic = template.attributes.public;
        const isTemplateUserTemplate =
          userAccount.attributes.template_option?.data?.id === template.id;
        const onlyClub = template.attributes.onlyClub;
        const accountType = userAccount.attributes.accountType;
        if (onlyClub && accountType !== 'Club') {
          return false;
        }
        return userAccount.attributes.hasCustomTemplate
          ? isTemplateUserTemplate
          : isPublic;
      };
      const filteredTemplates = GetElement.filter(filterFn);
      const grouped = filteredTemplates.reduce((acc, template) => {
        let category = template.attributes?.Category;
        if (!category) {
          category = 'Uncategorized';
        }
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(template);
        return acc;
      }, {});
      return grouped;
    }
    return {};
  }, [GetElement, userAccount]);

  useEffect(() => {
    console.log('[SelectATemplateMembers] GetElement value:', GetElement);
    if (Array.isArray(GetElement)) {
      setLoading(false);
    }
  }, [GetElement]);

  useEffect(() => {
    // Fallback: if loading takes too long, stop loading after 5 seconds
    if (loading) {
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  const categoryOptions = useMemo(
    () => generateCategoryOptions(templates),
    [templates]
  );

  const handleMoreInfoClick = template => {
    setSelectedTemplate(template);
  };

  const handleCloseModal = () => {
    setSelectedTemplate(null);
  };

  const StoreUserChange = item => {
    setLoading(true);
    CreateDesignElement({
      CollectionSaveTo: 'accounts',
      Body: [item.id],
      COLLECTIONID: userAccount.id,
      RelationProperty: 'template',
    }).finally(() => setLoading(false));
  };

  const filteredCategoryTemplates =
    selectedCategory === 'All'
      ? templates
      : { [selectedCategory]: templates[selectedCategory] || [] };

  if (loading) {
    return <div>Loading...</div>; // Or any loading spinner/component
  }

  // User-friendly error/empty state
  if (!Array.isArray(GetElement) || Object.keys(templates).length === 0) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: '#888' }}>
        <p>Failed to load templates or no templates available.</p>
        <p>
          Please try refreshing the page or contact support if the problem
          persists.
        </p>
      </div>
    );
  }

  return (
    <>
      <Container fluid={true} mb={40}>
        <CategoryFilter
          categoryOptions={categoryOptions}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        {Object.keys(filteredCategoryTemplates).map(category => (
          <RoundedSectionContainer
            key={category}
            headerContent={''}
            topContent={
              <P
                size={'xl'}
                marginBottom={0}
                Weight={900}
                textTransform={'uppercase'}
              >
                {category}
              </P>
            }
            bottomContent={
              <SimpleGrid
                breakpoints={[
                  { minWidth: 'xs', cols: 2 },
                  { minWidth: 'sm', cols: 2 },
                  { minWidth: 'md', cols: 3 },
                ]}
              >
                {(filteredCategoryTemplates[category] || []).map(item => (
                  <TemplateCardMembers
                    key={item.id}
                    template={item}
                    isSelected={
                      userAccount.attributes.template_option?.data?.id ===
                      item.id
                    }
                    hasMediaItems={hasMediaItems}
                  />
                ))}
              </SimpleGrid>
            }
          />
        ))}
      </Container>
      <Modal
        opened={!!selectedTemplate}
        onClose={handleCloseModal}
        title={selectedTemplate?.attributes?.name || 'Template Info'}
        size='lg'
      >
        {selectedTemplate && (
          <div>
            <p>
              <strong>Name:</strong> {selectedTemplate.attributes?.name}
            </p>
            <p>
              <strong>Category:</strong>{' '}
              {selectedTemplate.attributes?.Category || 'Uncategorized'}
            </p>
            <p>
              <strong>Description:</strong>{' '}
              {selectedTemplate.attributes?.description ||
                'No description provided.'}
            </p>
          </div>
        )}
      </Modal>
      <FixturaDivider />
    </>
  );
};
