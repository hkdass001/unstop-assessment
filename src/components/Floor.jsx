import React from 'react';
import styles from './Floor.module.css';

const Floor = ({ floorNumber, rooms }) => {
  return (
    <div className={styles.floor}>
      <h2>Floor {floorNumber}</h2>
      <div className={styles.rooms}>
        {rooms.map((room) => (
          <div
            key={room.number}
            className={`${styles.room} ${
              room.booked ? styles.booked : styles.available
            }`}
            title={`Room ${room.number} - ${
              room.booked ? 'Booked' : 'Available'
            }`}
          >
            {room.number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Floor;
