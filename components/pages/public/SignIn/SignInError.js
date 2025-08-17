export const SignInError = ({ setError, error }) => {
  return (
    <div className='contact-form ptb-100'>
      <div className='contact-title'>
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => setError(null)} className='btn btn-primary'>
          Try again
        </button>
      </div>
    </div>
  );
};
