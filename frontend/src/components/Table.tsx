
import React, { useState, useEffect } from 'react';
import './Table.css';
import { useAtom } from 'jotai';
import { filterData, modalData } from '../atom/Atom';
import { Editmodal } from './Editmodal';
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function Table() {
  const [filteredData, setFilteredData] = useAtom(filterData);
  const [modalDataValue, setData] = useAtom(modalData);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);


  const dataToDisplay = filteredData.length > 0 ? filteredData : modalDataValue;
  console.log(dataToDisplay);

  const handleEdit = (index) => {
    setSelectedItem(index);
    setModalOpen(true);
  };

  const handleDelete = (index) => {
    const deletedItem = dataToDisplay[index];

    const newData = [...dataToDisplay];
    newData.splice(index, 1);

    setFilteredData(newData);
    setData(newData);

    const newModalData = modalDataValue.filter(item => item.id !== deletedItem.id);
    setData(newModalData);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalSave = (editedData) => {
    const newData = [...dataToDisplay];
    newData[selectedItem] = editedData;

    // Update both atoms
    setFilteredData(newData);
    setData(newData);

    setModalOpen(false);
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Subject</th>
            <th>Schedule</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataToDisplay.map((item, index) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.subject}</td>
              <td>{item.frequency} at {item.time}</td>

              <td>
               < MdEdit className="handleedit"onClick={() => handleEdit(index)}/>
                <RiDeleteBin6Line className="handledelete" onClick={() => handleDelete(index)}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <Editmodal
          data={dataToDisplay[selectedItem]}
          onClose={handleModalClose}
          onSave={handleModalSave}
        />
      )}
    </div>
  );
}
