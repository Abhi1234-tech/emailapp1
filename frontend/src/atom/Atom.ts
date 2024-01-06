
import { atom } from 'jotai';

export const modalAtom = atom(false);
export const modalData = atom([
  {
    id: 200,
    title: 'Sample Title',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae tincidunt est, dictum convallis purus. Fusce eu est a lacus luctus sodales id vitae diam. Ut interdum tristique ....',
    subject: 'Sample Subject',
    frequency: 'Daily', 
    repeat: [],
    time: '12 AM',
  },
]);
export const filterData = atom([]);
