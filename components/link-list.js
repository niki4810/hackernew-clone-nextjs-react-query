import React from 'react';
import Link from './Link';

const LinkList = ({links}) => {
  return (
    <div>
      {links.map((link, index) => (
        <Link key={link.id} link={link} index={index} />
      ))}
    </div>
  );
};

export default LinkList;