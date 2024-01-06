
import React, { useState } from 'react';
import './Modal.css';
import { useAtom } from 'jotai';
import { modalAtom, modalData } from '../atom/Atom';

export function Modal() {
  const [modal, setModal] = useAtom(modalAtom);
  const [data, setData] = useAtom(modalData);

  const [formData, setFormData] = useState({
    id: 1,
    title: 'Sample title',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae tincidunt est, dictum convallis purus. Fusce eu est a lacus luctus sodales id vitae diam. Ut interdum tristique ....',
    subject: 'Sample Subject',
    frequency: 'Daily',
    repeat: [],
    time: '10 AM',
  });

  const time = ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 PM"];

  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  function handleClose() {
    setModal(false);
  }

  function handleSave() {
    const newDataItem = {
      ...formData,
      id: new Date().getTime(), 
    };

    setData([...data, newDataItem]);
    setModal(false);
    console.log(data);
  }

  function handleInputChange(e, field) {
    setFormData({ ...formData, [field]: e.target.value });
  }

  function handleRepeat(day) {
    const updatedRepeat = formData.repeat.includes(day)
      ? formData.repeat.filter(d => d !== day)
      : [...formData.repeat, day];
    setFormData({ ...formData, repeat: updatedRepeat });
  }

  return modal ? (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        <h2>Add Schedule</h2>
        <div className="title">
          <p>Title</p>
          <input type="text" placeholder='Sample Subject' onChange={(e) => handleInputChange(e, 'title')} />
        </div>
        <div className="description">
          <p>Description</p>
          <input type="text" placeholder='Sample Description' onChange={(e) => handleInputChange(e, 'description')} />
        </div>
        <div className="subject">
          <p>Subject</p>
          <input type="text" placeholder='Sample Subject' onChange={(e) => handleInputChange(e, 'subject')} />
        </div>
        <div className="freq">
          <p>Frequency</p>
          <select value={formData.frequency} onChange={(e) => handleInputChange(e, 'frequency')}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div className="repeat">
          <p>Repeat</p>
          <ul className="days">
            {days.map((day) => (
              <button
                key={day}
                style={{ backgroundColor: formData.repeat.includes(day) ? 'gray' : 'white' }}
                onClick={() => handleRepeat(day)}
              >
                {day}
              </button>
            ))}
          </ul>
        </div>
        <div className="time">
          <p>Time</p>
          <select value={formData.time} onChange={(e) => handleInputChange(e, 'time')}>
            {time.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </div>
        <div className="buttons">
          <button className="cancel" onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Done</button>
        </div>
      </div>
    </div>
  ) : null;
}
