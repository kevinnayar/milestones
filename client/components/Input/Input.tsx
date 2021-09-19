import * as React from 'react';
import { useState } from 'react';
import { formatError, slugify } from '../../../shared/utils/baseUtils';

type InputProps = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  setValue: (_value: string) => void,
  validateOrThrow?: (_value: string) => void;
  setHasError?: (_has: boolean) => void;
};

export const Input = ({ name, label, type, required, value, setValue, validateOrThrow, setHasError }: InputProps) => {
  const [error, setError] = useState<null | string>(null);

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setValue(evt.currentTarget.value);
  };

  const onBlur = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();

    if (validateOrThrow) {
      setError(null);
      if (setHasError) {
        setHasError(false);
      }

      try {
        validateOrThrow(evt.currentTarget.value);
      } catch (e) {
        setError(formatError(e));
        if (setHasError) {
          setHasError(true);
        }
      }
    }
  };

  return (
    <div
      className={`input-content input-content--${slugify(name)} ${error ? 'input-content--error' : ''}`}
    >
      <label className="input-content__label" htmlFor={name}>
        {label}{' '}
        {required && <span>*</span>}
      </label>
      <input
        className="input-content__input"
        type={type || 'text'}
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className="input-content__error">{error}</p>}
    </div>
  );
};
