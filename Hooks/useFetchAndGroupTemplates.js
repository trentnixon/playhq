import { useEffect, useState, useCallback } from 'react';
import { useGETDesignElement } from './useCustomizer';

/**
 * Custom hook that fetches templates from a given collection and groups them by category.
 *
 * @param {string} collectionId - The ID of the collection to fetch templates from.
 * @param {function} filterFn - A function that filters templates before grouping them.
 * @returns {Object} - An object where the keys are categories and the values are arrays of templates.
 */
export const useFetchAndGroupTemplates = (collectionId, filterFn) => {
  const [GetElement, FetchElement] = useGETDesignElement();
  const [groupedTemplates, setGroupedTemplates] = useState({});
  const [fetched, setFetched] = useState(false);

  const fetchTemplates = useCallback(() => {
    if (!fetched) {
      FetchElement({ COLLECTIONID: collectionId })
        .catch(error => {
          console.error('Error fetching templates:', error);
        })
        .finally(() => {
          setFetched(true);
        });
    }
  }, [FetchElement, collectionId, fetched]);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  useEffect(() => {
    if (Array.isArray(GetElement)) {
      const filteredTemplates = GetElement.filter(filterFn);
      const grouped = filteredTemplates.reduce((acc, template) => {
        const category = template.attributes?.Category;
        if (!category) {
          console.error('Template has no category:', template);
          return acc;
        }
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(template);
        return acc;
      }, {});
      setGroupedTemplates(grouped);
    }
  }, [GetElement, filterFn]);

  return groupedTemplates;
};
