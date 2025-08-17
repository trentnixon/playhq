import React, { useState } from 'react';
import PageBanner from '../components/Common/PageBanner';
import { useRouter } from 'next/router';
import Section from '../components/UI/DefaultSection';
import Meta from '../components/Layouts/Meta';

const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const router = useRouter();
  const { code } = router.query;

  const handleSubmit = async event => {
    event.preventDefault();

    // Clear previous error and success messages
    setError(null);
    setSuccess(null);

    // Check if passwords are valid
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    // Make a request to the Strapi API to reset the password
    const response = await fetch(
      'https://fixtura-backend.herokuapp.com/api/auth/reset-password',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          password: password,
          passwordConfirmation: confirmPassword,
        }),
      }
    );

    const data = await response.json();

    setLoading(false);

    // Handle the response from the Strapi API
    if (response.ok) {
      // Password reset was successful, redirect the user to the login page
      setSuccess('Password reset was successful. Redirecting to login page...');
      setTimeout(() => router.push('/SignIn'), 2000);
    } else if (data.error) {
      // The API returned a validation error
      setError(data.error.message);
    } else {
      // Password reset was not successful, show a generic error message
      setError('An unknown error occurred. Please try again.');
    }
  };
  const SectionData = {
    title: 'Reset password!',
    paragraphs: [
      `To reset your password, enter your new password in the first field
    on the password reset page, re-enter it in the second field to
    confirm it, and then click on the Submit or Reset password;
    button to save it.`,
    ],
  };

  return (
    <>
      <Meta
        title='Password Reset - Fixtura: Secure Your Account'
        description="Reset your Fixtura account password for secure access to our digital sports media tools. Keep your club's content safe."
        keywords='Password reset, secure account Fixtura, sports media security, club content protection, account update'
      />
      <PageBanner pageTitle='' BGImage='/images/PLAYHQ-BG-RAINDROPS.jpg' />
      <Section {...SectionData} color='light'>
        <div className='contact-form ptb-100'>
          {error && <p>Error: {error}</p>}
          {success && <p>Success: {success}</p>}
          {loading && <p>Loading...</p>}

          {!error && (
            <form onSubmit={handleSubmit}>
              <div className='container'>
                <div className='row justify-content-center'>
                  <div className='col-lg-4'>
                    <div className='form-group'>
                      <input
                        type='password'
                        placeholder='Enter new password'
                        value={password}
                        className='form-control-343a40'
                        onChange={event => setPassword(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className='col-lg-4'>
                    <div className='form-group'>
                      <input
                        type='password'
                        placeholder='Confirm new password'
                        className='form-control-343a40'
                        value={confirmPassword}
                        onChange={event =>
                          setConfirmPassword(event.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className='col-lg-12 col-sm-12'>
                    <button type='submit' className='btn btn-primary'>
                      Reset password
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </Section>
    </>
  );
};

export default ResetPasswordForm;
