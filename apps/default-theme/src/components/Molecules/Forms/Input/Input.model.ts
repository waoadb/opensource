import React from 'react';

export type InputProps = {
  id: string;
  name?: string;
  labelVisible?: boolean;
  type?: 'email' | 'password' | 'text' | 'search' | 'tel' | 'url' | 'number' | 'date' | 'time' | 'datetime-local' | 'month' | 'week';
  ref?: React.Ref<HTMLInputElement>;
  placeholder?: string;
  icon?: React.ReactNode;
  value?: string;
  labelClassName?: string;
  inputClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
