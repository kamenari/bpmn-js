import React, { useState } from 'react';

interface NyanFormProps {
  onSubmit: () => void;
}

const NyanForm: React.FC<NyanFormProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">ニャンキャットを追加</button>
    </form>
  );
};

export default NyanForm;