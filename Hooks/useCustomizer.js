//
import Cookies from 'js-cookie';
import { useState } from 'react';
import { fetcher } from '../lib/api';
import { getAccountFromLocalCookie } from '../lib/auth';
import { useAccountDetails } from '@/context/userContext';
const qs = require('qs');

// GET
// Fetch all of the options
export const useGETDesignElement = () => {
  const [DesignElement, setDesignElement] = useState(null);
  const query = qs.stringify({
    pagination: {
      pageSize: 1000,
    },
    populate: [
      'Poster',
      'Gallery',
      'Video',
      'bundle_audio',
      'bundle_audio.audio_options',
      'bundle_audio.audio_options.asset',
    ],
  });
  const CreateDesignElement = async (OBJ, useAuth = true) => {
    setDesignElement(true);
    try {
      //console.log("CreateDesignElement");
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      if (useAuth) {
        headers.Authorization = `Bearer ${Cookies.get('jwt')}`;
      }

      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/${OBJ.COLLECTIONID}?${query}`,
        {
          headers,
        }
      );
      setDesignElement(response.data);
    } catch (err) {
      setDesignElement(null);
    }
  };

  return [DesignElement, CreateDesignElement];
};

// PUT
// Change a users design options

export const useAssignDesignElement = () => {
  const [DesignElement, setDesignElement] = useState(null);
  const { forceRefresh } = useAccountDetails();
  const CreateDesignElement = async OBJ => {
    setDesignElement(true);
    try {
      //console.log("CreateDesignElement");
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/${OBJ.CollectionSaveTo}/${OBJ.COLLECTIONID}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('jwt')}`,
          },
          body: JSON.stringify({
            data: {
              [OBJ.RelationProperty]: OBJ.Body,
            },
          }),
        }
      );
      forceRefresh();
      setDesignElement(response);
    } catch (err) {
      setDesignElement(null);
    }
  };

  return [DesignElement, CreateDesignElement];
};

export const useAssignTemplateOptionsToUserAccount = () => {
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const CreateDesignElement = async OBJ => {
    setStatus('loading');
    setError(null);
    try {
      console.log('[OBJ]', OBJ);
      const res = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/${OBJ.collectionSaveTo}/${OBJ.accountId}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('jwt')}`,
          },
          body: JSON.stringify({
            data: OBJ.Body,
          }),
        }
      );
      console.log('[response]', res);
      setResponse(res);
      setStatus('success');
    } catch (err) {
      setError(err);
      setStatus('error');
    }
  };

  return { status, error, response, CreateDesignElement };
};

/* ***************************************** */
// User Create new theme!

///api/themes

export const UserCreateTheme = () => {
  const [THEME, setTHEME] = useState(false);

  const CreateTHEME = async OBJ => {
    const user = await getAccountFromLocalCookie();

    //console.log(user);

    if (user) {
      try {
        //console.log("AI IS RUNNING");
        const response = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/themes`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('jwt')}`,
            },
            body: JSON.stringify({ data: OBJ }),
          }
        );
        //console.log(response);
        setTHEME(response);
      } catch (err) {
        setTHEME(null);
      }
    }
  };

  return [THEME, CreateTHEME];
};

export const UserUpdateTheme = () => {
  const [UPDATE, setUPDATE] = useState(false);

  const UpdateTHEME = async (OBJ, ID) => {
    const user = await getAccountFromLocalCookie();

    //console.log(user);

    if (user) {
      try {
        //console.log("AI IS RUNNING");
        const response = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/themes/${ID}`,
          {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('jwt')}`,
            },
            body: JSON.stringify({ data: OBJ }),
          }
        );
        //console.log(response);
        setUPDATE(response);
      } catch (err) {
        setUPDATE(null);
      }
    }
  };

  return [UPDATE, UpdateTHEME];
};

// GET Template Palettes
export const useGetTemplatePalettes = () => {
  const [templatePalettes, setTemplatePalettes] = useState(null);

  const fetchTemplatePalettes = async (useAuth = true) => {
    try {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      if (useAuth) {
        headers.Authorization = `Bearer ${Cookies.get('jwt')}`;
      }
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/template-palettes?populate=*`,
        { headers }
      );
      setTemplatePalettes(response);
    } catch (err) {
      setTemplatePalettes(null);
    }
  };

  return [templatePalettes, fetchTemplatePalettes];
};

// GET Template Categories
export const useGetTemplateCategories = () => {
  const [templateCategories, setTemplateCategories] = useState(null);

  const fetchTemplateCategories = async (useAuth = true) => {
    try {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      if (useAuth) {
        headers.Authorization = `Bearer ${Cookies.get('jwt')}`;
      }
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/template-categories?populate=*`,
        { headers }
      );
      setTemplateCategories(response);
    } catch (err) {
      setTemplateCategories(null);
    }
  };

  return [templateCategories, fetchTemplateCategories];
};

// Filters
// GET Template Categories
export const useGetTemplateImageOptions = () => {
  const [templateImageOptions, setTemplateImageOptions] = useState(null);

  const fetchTemplateImageOptions = async (useAuth = true) => {
    try {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      if (useAuth) {
        headers.Authorization = `Bearer ${Cookies.get('jwt')}`;
      }
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/template-images?populate=*`,
        { headers }
      );
      console.log('[response]', response);
      setTemplateImageOptions(response);
    } catch (err) {
      setTemplateImageOptions(null);
    }
  };

  return [templateImageOptions, fetchTemplateImageOptions];
};

// GET Template Graphics
export const useGetTemplateNoises = () => {
  const [templateNoises, setTemplateNoises] = useState(null);

  const fetchTemplateNoises = async (useAuth = true) => {
    try {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      if (useAuth) {
        headers.Authorization = `Bearer ${Cookies.get('jwt')}`;
      }
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/template-noises?populate=*`,
        { headers }
      );
      setTemplateNoises(response);
    } catch (err) {
      setTemplateNoises(null);
    }
  };

  return [templateNoises, fetchTemplateNoises];
};

// Get Template Gradients
export const useGetTemplateGradients = () => {
  const [templateGradients, setTemplateGradients] = useState(null);

  const fetchTemplateGradients = async (useAuth = true) => {
    try {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      if (useAuth) {
        headers.Authorization = `Bearer ${Cookies.get('jwt')}`;
      }
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/template-gradients?populate=*`,
        { headers }
      );
      setTemplateGradients(response);
    } catch (err) {
      setTemplateGradients(null);
    }
  };

  return [templateGradients, fetchTemplateGradients];
};

// Get Template Patterns
export const useGetTemplatePatterns = () => {
  const [templatePatterns, setTemplatePatterns] = useState(null);

  const fetchTemplatePatterns = async (useAuth = true) => {
    try {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      if (useAuth) {
        headers.Authorization = `Bearer ${Cookies.get('jwt')}`;
      }
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/template-patterns?populate=*`,
        { headers }
      );
      setTemplatePatterns(response);
    } catch (err) {
      setTemplatePatterns(null);
    }
  };

  return [templatePatterns, fetchTemplatePatterns];
};

// Get Template Particles

export const useGetTemplateParticles = () => {
  const [templateParticles, setTemplateParticles] = useState(null);

  const fetchTemplateParticles = async (useAuth = true) => {
    try {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      if (useAuth) {
        headers.Authorization = `Bearer ${Cookies.get('jwt')}`;
      }
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/template-particles?populate=*`,
        { headers }
      );
      setTemplateParticles(response);
    } catch (err) {
      setTemplateParticles(null);
    }
  };

  return [templateParticles, fetchTemplateParticles];
};
