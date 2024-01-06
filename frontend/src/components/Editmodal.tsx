
import React, { useState } from 'react';
import './Editmodal.css';

export const Editmodal = ({ data, onClose, onSave }) => {
  const [editedData, setEditedData] = useState({ ...data, frequency: '', time: '' });

  const frequencies = ['Daily', 'Weekly', 'Monthly'];

  const times = [
    "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM",
    "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM",
    "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 PM"
  ];

  const handleChange = (field, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedData);
  };

  return (
    <div className="modal-thing">
      <div className="modal-container">
        
        <h2>Edit Data</h2>
        
        <label>
          Title
          <input
            type="text"
            value={editedData.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </label>
          
          
        <label>
          Description
          <input
            type="text"
            value={editedData.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </label>
        <label>
          Subject
          <input
            type="text"
            value={editedData.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
          />
        </label>
        <label>
          Frequency
          <select
            value={editedData.frequency || 'Daily'}
            onChange={(e) => handleChange('frequency', e.target.value)}
          >
            <option value="">Select Frequency</option>
            {frequencies.map((freq) => (
              <option key={freq} value={freq}>
                {freq}
              </option>
            ))}
          </select>
        </label>
        <label>
          Time
          <select
            value={editedData.time || '10AM'}
            onChange={(e) => handleChange('time', e.target.value)}
          >
            <option value="">Select Time</option>
            {times.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <div>
          <div className="update">
           <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>Update</button> 
          </div>
          
        </div>
      </div>
    </div>
  );
};
