import React, { useState } from 'react';
import styles from './ControlPanel.module.css';

const ControlPanel = ({ bookRooms, generateRandomOccupancy, resetBooking }) => {
  const [numRooms, setNumRooms] = useState(1);

  const handleBooking = () => {
    bookRooms(parseInt(numRooms));
  };

  return (
    <div className={styles.controlPanel}>
      <div className={styles.bookingSection}>
        <label htmlFor="numRooms">Number of Rooms to Book (1-5): </label>
        <input
          type="number"
          id="numRooms"
          min="1"
          max="5"
          value={numRooms}
          onChange={(e) => setNumRooms(e.target.value)}
        />
        <button onClick={handleBooking}>Book Rooms</button>
      </div>
      <div className={styles.actionButtons}>
        <button onClick={generateRandomOccupancy}>
          Generate Random Occupancy
        </button>
        <button onClick={resetBooking}>Reset Booking</button>
      </div>
    </div>
  );
};

export default ControlPanel;
