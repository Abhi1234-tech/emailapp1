
import './Navbar.css';
import React, { useState } from 'react';
import { FaSearch, FaPlusCircle } from 'react-icons/fa';
import { useAtom } from 'jotai';
import { modalAtom, filterData, modalData } from '../atom/Atom';
import { Modal } from './Modal';

export default function Navbar() {
  const [search, setSearch] = useState('');
  const [modal, setModal] = useAtom(modalAtom);
  const [data, setData] = useAtom(modalData);
  const [filteredData, setFilteredData] = useAtom(filterData);

  function handlesearch(e) {
    const searchTerm = e.target.value.trim().toLowerCase();
    setSearch(searchTerm);

    let newData;
    if (searchTerm !== '') {
      newData = data.filter((item) =>
        item.title.toLowerCase().includes(searchTerm)
      );
    } else {
      newData = data;
    }

    setFilteredData(newData);
  }

  function handleModal() {
    setSearch('');
    
    setModal(true);
  }

  return (
    <div className="navbar">
      <div className="navbar-left">
        <input
          type="text"
          value={search}
          onChange={(e) => handlesearch(e)}
          placeholder="Search"
        />
        <div className="ico-search">
          <FaSearch onClick={handlesearch} />
        </div>
      </div>
      <div className="navbar-right">
        <button onClick={handleModal}>
          <FaPlusCircle className="icon-add" /> Add 
        </button>
        {modal && <Modal />}
      </div>
    </div>
  );
}
