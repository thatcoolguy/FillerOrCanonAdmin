// import { FormController, FormWatcher } from '@/types';
import { useFieldArray } from 'react-hook-form';

export default function useSetsFieldArrayForm({
  watchName,
  control,
  fieldArrayName,
  watch,
}: any) {
  const watchedValue = watch(watchName);
  const { fields, prepend, remove } = useFieldArray({
    name: fieldArrayName,
    control,
  });

  const addField = () => prepend({ html: '' });
  const removeField = (idx: number) => remove(idx);

  return {
    fields,
    watchedValue,
    addField,
    removeField,
  };
}
