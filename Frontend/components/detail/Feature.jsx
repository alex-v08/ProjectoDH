'use client'
import React, { useState, useEffect } from 'react';

const Feature = ({ feature }) => {

  return (
        <div className='flex items-center'>
            <i className={`${feature.image} mr-4 text-2xl`} alt={feature.name}></i>
            <span>{feature.name}</span>
        </div>
  );
};

export default Feature;
