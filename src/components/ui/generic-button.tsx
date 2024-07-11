import React from 'react';
import { Button } from '@mui/material'; 
import { useFormStatus } from 'react-dom';
import { FocusEvent } from 'react';

type Props = {
  label?: string;
  type?: 'submit' | 'button';
  onClick?: () => void;
}

function blurElement(event: FocusEvent<Element>) {
  if (event.target instanceof HTMLElement) {
    event.target.blur();
  }
}

export function GenericButton({label, type, onClick}: Props) {
  const { pending } = useFormStatus()
 
  return (
    <Button type={type || 'button'} variant="contained" color="primary" disabled={pending} onClick={onClick}>
      {label || 'Go'}
    </Button>    
  )
}