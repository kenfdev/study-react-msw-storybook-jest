import { FC, useEffect, useState } from 'react';

type Props = {
  onSubmit: (data: any) => void;
};

type Option = {
  label: string;
  value: string;
};

export const Form: FC<Props> = ({ onSubmit }) => {
  const [options, setOptions] = useState<Option[]>([]);
  useEffect(() => {
    fetch('/api/options')
      .then((res) => res.json())
      .then((data) => setOptions(data.options));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(Object.fromEntries(formData));
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <select name="option">
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
};
