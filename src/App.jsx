import React, { useState } from 'react';
import Floor from './components/Floor.jsx';
import ControlPanel from './components/ControlPanel.jsx';
import styles from './App.module.css';

const initializeRooms = () => {
  const rooms = {};
  for (let floor = 1; floor <= 10; floor++) {
    const floorRooms = [];
    const roomCount = floor === 10 ? 7 : 10;
    const base = floor === 10 ? 1000 : floor * 100;
    for (let i = 1; i <= roomCount; i++) {
      floorRooms.push({
        number: base + i,
        booked: false,
      });
    }
    rooms[floor] = floorRooms;
  }
  return rooms;
};

function App() {
  const [rooms, setRooms] = useState(initializeRooms());

  const bookRooms = (num) => {
    if (num < 1 || num > 5) {
      alert('You can book between 1 to 5 rooms at a time.');
      return;
    }

    // This is for finding the best allocation based on the booking rules
    const allocation = findBestAllocation(rooms, num);
    if (allocation.length === 0) {
      alert('Not enough rooms available to fulfill the booking.');
      return;
    }

    const updatedRooms = { ...rooms };
    allocation.forEach((room) => {
      updatedRooms[room.floor][room.index].booked = true;
    });
    setRooms(updatedRooms);
  };

  const findBestAllocation = (rooms, num) => {

    // Priority 1: Same floor allocation
    for (let floor = 1; floor <= 10; floor++) {
      const available = rooms[floor].filter((room) => !room.booked);
      if (available.length >= num) {

        // Sort available rooms by room number (ascending)
        const sortedAvailable = available.sort((a, b) => a.number - b.number);
        
        // Select the first 'num' rooms (closest to stairs/lift)
        return sortedAvailable.slice(0, num).map((room) => ({
          floor: floor,
          index: rooms[floor].findIndex((r) => r.number === room.number),
        }));
      }
    }

    // Priority 2: Across multiple floors to minimize travel time
    // Strategy: Allocate rooms from the floors with the most available rooms first
    const allocation = [];
    const floors = Array.from({ length: 10 }, (_, i) => i + 1);

    // Sort floors by available rooms descending and floor number ascending
    floors.sort((a, b) => {
      const availableA = rooms[a].filter((room) => !room.booked).length;
      const availableB = rooms[b].filter((room) => !room.booked).length;
      if (availableB !== availableA) {
        return availableB - availableA;
      }
      return a - b;
    });

    for (const floor of floors) {
      const available = rooms[floor].filter((room) => !room.booked);
      for (const room of available) {
        if (allocation.length < num) {
          allocation.push({
            floor: floor,
            index: rooms[floor].findIndex((r) => r.number === room.number),
          });
        } else {
          break;
        }
      }
      if (allocation.length === num) break;
    }

    return allocation;
  };

  const generateRandomOccupancy = () => {
    const updatedRooms = { ...rooms };
    for (let floor = 1; floor <= 10; floor++) {
      updatedRooms[floor] = updatedRooms[floor].map((room) => ({
        ...room,
        booked: Math.random() < 0.3,
      }));
    }
    setRooms(updatedRooms);
  };

  const resetBooking = () => {
    setRooms(initializeRooms());
  };

  return (
    <div className={styles.app}>
      <h1>Hotel Room Reservation System</h1>
      <ControlPanel
        bookRooms={bookRooms}
        generateRandomOccupancy={generateRandomOccupancy}
        resetBooking={resetBooking}
      />
      <div className={styles.floors}>
        {Array.from({ length: 10 }, (_, i) => i + 1)
          .reverse()
          .map((floor) => (
            <Floor key={floor} floorNumber={floor} rooms={rooms[floor]} />
          ))}
      </div>
    </div>
  );
}

export default App;
