import { useEffect, useState } from 'react';
import './AdminPage.css';
import { Link } from 'react-router-dom';
import { useAdminFeatures } from '../hooks/useAdminFeatures';

export const AdminPage = () => {
  const {
    reportedIcebreakers, // Use the state from the hook directly
    reportedFeedback,
    fetching,
    fetchReportedIcebreakers,
    fetchReportedFeedback,
    deleteIcebreaker,
    deleteFeedback,
    clearIcebreakerReports,
    clearFeedbackReports,
    error,
  } = useAdminFeatures(); // Use the hook to get your states and function

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchReportedIcebreakers();
  }, [fetchReportedIcebreakers]);

  useEffect(() => {
    fetchReportedFeedback();
  }, [fetchReportedFeedback]);

  // Define the function to update/refresh the data
  const refreshIcebreakersData = () => {
    fetchReportedIcebreakers();
  };

  const refreshFeedbackData = () => {
    fetchReportedFeedback();
  };

  const handleApproveIcebreaker = async (id: string) => {
    const success = await clearIcebreakerReports(id);
    if (success) {
      setMessage('Leken er godkjent og blir værende på nettsiden');
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        refreshIcebreakersData(); // Call a function to update data after the message is hidden
      }, 3000); // Adjust time based on how long you want the message to be displayed
    }
  };

  const handleApproveFeedback = async (id: string) => {
    const success = await clearFeedbackReports(id);
    if (success) {
      setMessage('Kommentaren er godkjent og blir værende på nettsiden');
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        refreshFeedbackData(); // Call a function to update data after the message is hidden
      }, 3000); // Adjust time based on how long you want the message to be displayed
    }
  };

  const handleDisapproveIcebreaker = async (id: string) => {
    const success = await deleteIcebreaker(id);
    if (success) {
      setMessage('Leken er ikke godkjent og vil fjernes fra nettsiden');
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        refreshIcebreakersData(); // Call a function to update data after the message is hidden
      }, 3000); // Adjust time based on how long you want the message to be displayed
    }
  };

  const handleDisapproveFeedback = async (id: string) => {
    const success = await deleteFeedback(id);
    if (success) {
      setMessage('Kommentaren er ikke godkjent og vil fjernes fra nettsiden');
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        refreshFeedbackData(); // Call a function to update data after the message is hidden
      }, 3000); // Adjust time based on how long you want the message to be displayed
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <button>
          <Link to="/">Tilbake</Link>
        </button>
      </div>
      <div className="header">
        <h1>Admin</h1>
      </div>
      <div className="content">
        <div className="card1">
          <h2><b>Rapporterte leker</b></h2>
          {fetching ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {reportedIcebreakers.map((icebreaker, index) => (
                <li key={index}>
                  <h1>{icebreaker.name}</h1>
                  <div className="button-container">
                    <button className="approve-button" onClick={() => handleApproveIcebreaker(icebreaker._id)}>Godkjenn</button>
                    <button className="disapprove-button" onClick={() => handleDisapproveIcebreaker(icebreaker._id)}>Ikke godkjenn</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {error && <p>{error}</p>}
        </div>
        <div className="card2">
          <h2><b>Rapporterte kommentarer</b></h2>
          {/* Content for card2 */}
          {fetching ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {reportedFeedback.map((feedback, index) => (
                <li key={index}>
                  <h1>{feedback.comment}</h1>
                  <div className="button-container">
                    <button className="approve-button" onClick={() => handleApproveFeedback(feedback._id)}>Godkjenn</button>
                    <button className="disapprove-button" onClick={() => handleDisapproveFeedback(feedback._id)}>Ikke godkjenn</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {error && <p>{error}</p>}
        </div>
      </div>
      {showMessage && <div className="message">{message}</div>}
    </div>
  );
};
