import React from 'react';
import { FieldError, FieldValues } from 'react-hook-form';

import Select from 'react-select';
import { useGetUsersAsOptionsQuery } from '@/redux/features/user/user.api';
import Label from '../ui/label';

interface Props {
  labelShow?: boolean;
  label: string;
  name: keyof FieldValues;

  error?:
    | FieldError
    | {
        message: string;
      }
    | undefined;

  defaultValue?: {
    value: string;
    label: string;
  }[];
  className?: string;
  handleSets: (_data: any) => void;
}

export default function SelectUser({
  labelShow,
  label,
  name,
  handleSets,
  error,

  defaultValue,
  className,
}: Props) {
  const { data, isLoading }: any = useGetUsersAsOptionsQuery('');

  return (
    <div className="mb-2 flex flex-col gap-1 ">
      {labelShow && <Label htmlFor={name.toString()}>{label}</Label>}
      <Select
        className={`${className}
        basic-multi-select
        `}
        defaultValue={defaultValue}
        isMulti
        onChange={(dataX) => {
          const ids = dataX.map((item) => item.value);
          handleSets(ids);
        }}
        isDisabled={isLoading}
        name="colors"
        options={
          isLoading ? [{ value: 'loading', label: 'loading' }] : data?.data
        }
        classNamePrefix="select"
      />

      {error && <p className="text-sm text-red-500 ">{error.message}</p>}
    </div>
  );
}

SelectUser.defaultProps = {
  labelShow: true,

  error: undefined,
  defaultValue: null,
  className: '',
};
