import * as React from 'react';
import { useState } from 'react';

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-') // replace spaces with -
    .replace(/[^\w-]+/g, '') // remove all non-word chars
    .replace(/--+/g, '-') // replace multiple - with single '-'
    .trim();
}

type FormData = {
  [id: string]: any;
};

type FormErrors = {
  [id: string]: string[] | undefined;
};

type FormValueValidator = {
  fn: (v: any) => boolean;
  err: string;
};

type FormValidators = {
  [id: string]: FormValueValidator[];
};

function canSubmitForm(errors: FormErrors): boolean {
  for (const err of Object.values(errors)) {
    if (err) return false;
  }
  return true;
}

function getErrorsForValue(
  value: any,
  validators: void | FormValueValidator[],
): undefined | string[] {
  const errors = [];
  if (validators) {
    for (const { fn, err } of validators) {
      const error = fn(value) ? undefined : err;
      if (error) errors.push(error);
    }
  }
  return errors.length ? errors : undefined;
}

type FormProps = {
  canSubmit: boolean;
  onSubmit: (e: any) => void;
  children: any;
};

type FormValueProps<T> = {
  id: string;
  label?: string;
  value: T;
  setValue: (k: string, v: T) => void;
  errors: void | string[];
  setValueErrors: (id: string, errors: string[] | undefined) => void;
  validators: void | FormValueValidator[];
};

type FormInputProps<T> = FormValueProps<T> & { type: 'text' | 'number' };

type MultiChoiceOption = {
  value: string;
  displayValue: string;
};

type FormMultiChoiceProps = FormValueProps<MultiChoiceOption> & {
  options: MultiChoiceOption[];
};

type CheckboxConfig = {
  label: string;
  checked: boolean;
};

function Input({
  type,
  id,
  label,
  value,
  setValue,
  errors,
  setValueErrors,
  validators,
}: FormInputProps<string | number>) {
  const [localValue, setLocalValue] = useState(value);

  const onChange = (e: any) => {
    setLocalValue(e.currentTarget.value);
  };

  const onBlur = () => {
    setValue(id, localValue);
    const valueErrors = getErrorsForValue(localValue, validators);
    setValueErrors(id, valueErrors);
  };

  return (
    <div
      className={`form-value form-value--input form-value--input-${type}`}
      id={`form-value-${slugify(id)}`}
    >
      {label && <label>{label}</label>}
      <input type={type} name={id} id={id} value={localValue} onChange={onChange} onBlur={onBlur} />
      {errors && (
        <div className="errors">
          {errors.map((e, i) => (
            <p key={i} className="error">
              {e}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function Dropdown({
  id,
  label,
  value,
  options,
  setValue,
  errors,
  setValueErrors,
  validators,
}: FormMultiChoiceProps) {
  const onChange = (e: any) => {
    const selected = options.find((v) => v.value === e.currentTarget.value);
    if (selected) setValue(id, selected);

    const valueErrors = getErrorsForValue(selected, validators);
    setValueErrors(id, valueErrors);
  };

  return (
    <div className="form-value form-value--dropdown" id={`form-value-${slugify(id)}`}>
      {label && <label>{label}</label>}
      <select id={id} name={id} value={value.value} onChange={onChange}>
        {options.map((v) => {
          return (
            <option key={v.value} value={v.value}>
              {v.displayValue}
            </option>
          );
        })}
      </select>
      {errors && (
        <div className="errors">
          {errors.map((e, i) => (
            <p key={i} className="error">
              {e}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function Checkbox({
  id,
  value,
  setValue,
  errors,
  setValueErrors,
  validators,
}: FormValueProps<CheckboxConfig>) {
  const onChange = () => {
    const newValue: CheckboxConfig = {
      ...value,
      checked: !value.checked,
    };
    setValue(id, newValue);

    const valueErrors = getErrorsForValue(newValue, validators);
    setValueErrors(id, valueErrors);
  };

  return (
    <div className="form-value form-value--checkbox" id={`form-value-${slugify(id)}`}>
      <input name={id} id={id} type="checkbox" checked={value.checked} onChange={onChange} />
      <label>{value.label}</label>
      {errors && (
        <div className="errors">
          {errors.map((e, i) => (
            <p key={i} className="error">
              {e}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function RadioButtons({
  id,
  label,
  value,
  options,
  setValue,
  errors,
  setValueErrors,
  validators,
}: FormMultiChoiceProps) {
  const onChange = (e: any) => {
    const selected = options.find((v) => v.value === e.currentTarget.value);
    console.log(selected);
    if (selected) setValue(id, selected);

    const valueErrors = getErrorsForValue(value, validators);
    setValueErrors(id, valueErrors);
  };

  return (
    <div className="form-value form-value--radio-buttons" id={`form-value-${slugify(id)}`}>
      {label && <label>{label}</label>}
      {options.map((v) => {
        const checked = value.value === v.value;
        return (
          <div key={v.value}>
            <input
              type="radio"
              id={id}
              name={v.value}
              value={v.value}
              onChange={onChange}
              checked={checked}
            />
            <label htmlFor={v.value}>{v.displayValue}</label>
          </div>
        );
      })}
      {errors && (
        <div className="errors">
          {errors.map((e, i) => (
            <p key={i} className="error">
              {e}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function SubmitButton({ canSubmit, onSubmit, children }: FormProps) {
  return (
    <button className="form-btn" type="submit" disabled={!canSubmit} onClick={onSubmit}>
      {children}
    </button>
  );
}

export function Form({ canSubmit, onSubmit, children }: FormProps) {
  const handleSubmit = canSubmit ? onSubmit : undefined;
  return <form onSubmit={handleSubmit}>{children}</form>;
}

Form.Input = Input;
Form.Dropdown = Dropdown;
Form.Checkbox = Checkbox;
Form.RadioButtons = RadioButtons;
Form.SubmitButton = SubmitButton;

export default function App() {
  const fruits: MultiChoiceOption[] = [
    { value: '', displayValue: '' },
    { value: 'apple', displayValue: 'Apple' },
    { value: 'banana', displayValue: 'Banana' },
    { value: 'cherry', displayValue: 'Cherry' },
  ];
  const agreeToTcs: CheckboxConfig = {
    label: 'I have read and agree to the terms and conditions',
    checked: true,
  };
  const languages: MultiChoiceOption[] = [
    { value: 'go', displayValue: 'Golang' },
    { value: 'js', displayValue: 'Javascript' },
    { value: 'py', displayValue: 'Python' },
    { value: 'rs', displayValue: 'Rust' },
  ];
  const [formData, setFormData] = useState<FormData>({
    name: 'Jane Doe',
    age: 32,
    fruit: fruits[1],
    language: languages[1],
    agreeToTcs,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const formValidators: FormValidators = {
    name: [
      {
        fn: (v: string) => Boolean(v),
        err: 'Name cannot be empty',
      },
    ],
    age: [
      {
        fn: (v: number) => v > 0,
        err: 'Age must be more than 0',
      },
      {
        fn: (v: number) => v < 150,
        err: 'Age must be less than 150',
      },
    ],
    fruit: [
      {
        fn: (v: MultiChoiceOption) => Boolean(v.value),
        err: 'Fruit is required',
      },
    ],
    agreeToTcs: [
      {
        fn: (v: CheckboxConfig) => Boolean(v.checked),
        err: 'Agreeing to terms and conditions is required',
      },
    ],
  };

  const setValue = (id: string, value: any) => {
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const setValueErrors = (id: string, errors: string[] | undefined) => {
    setFormErrors({
      ...formErrors,
      [id]: errors,
    });
  };

  const canSubmit = canSubmitForm(formErrors);
  const onSubmit = (e: any) => {
    e.preventDefault();
    if (canSubmit) {
      console.log({ formData });
    } else {
      console.log({ formErrors });
    }
  };

  console.log({ formData, formErrors });

  return (
    <div className="App">
      <Form canSubmit={canSubmit} onSubmit={onSubmit}>
        <Form.Input
          id="name"
          label="Name"
          value={formData.name}
          setValue={setValue}
          errors={formErrors.name}
          setValueErrors={setValueErrors}
          validators={formValidators.name}
          type="text"
        />
        <Form.Input
          id="age"
          label="Age"
          value={formData.age}
          setValue={setValue}
          errors={formErrors.age}
          setValueErrors={setValueErrors}
          validators={formValidators.age}
          type="number"
        />
        <Form.Dropdown
          id="fruit"
          label="Fruit"
          value={formData.fruit}
          options={fruits}
          setValue={setValue}
          errors={formErrors.fruit}
          setValueErrors={setValueErrors}
          validators={formValidators.fruit}
        />
        <Form.Checkbox
          id="agreeToTcs"
          label={agreeToTcs.label}
          value={formData.agreeToTcs}
          setValue={setValue}
          errors={formErrors.agreeToTcs}
          setValueErrors={setValueErrors}
          validators={formValidators.agreeToTcs}
        />
        <Form.RadioButtons
          id="language"
          label="Select a language"
          value={formData.language}
          options={languages}
          setValue={setValue}
          errors={formErrors.language}
          setValueErrors={setValueErrors}
          validators={formValidators.language}
        />
        <Form.SubmitButton canSubmit={canSubmit} onSubmit={onSubmit}>
          Submit
        </Form.SubmitButton>
      </Form>
    </div>
  );
}

