import useResponseHandler from '@/healpers/responseHelper';
import {
  useAddNewUserMutation,
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from '@/redux/features/user/user.api';
import { RootState } from '@/redux/store';

import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';

interface LoginFormInputs {
  name: string;
  email: string;
  username: string;
  phone: string;
  password?: string;
}

const useUserSubmit = () => {
  const [open, setOpen] = useState(false);
  const modalConfig = useSelector((state: RootState) => state.modal);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const [addUser] = useAddNewUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const { data, isLoading, refetch }: any = useGetSingleUserQuery(
    modalConfig.id,
    {
      skip: !modalConfig.id,
    },
  );

  const responseHandler = useResponseHandler();

  useEffect(() => {
    if (modalConfig.id) {
      refetch();
    } else {
      reset();
    }
  }, [modalConfig.id, refetch, reset]);

  useEffect(() => {
    if (!modalConfig.id) {
      setValue('name', '');
      setValue('email', '');
      setValue('username', '');
      setValue('phone', '');
      setValue('password', '');
    }

    if (!isLoading && data) {
      setValue('name', data.name);
      setValue('email', data.email);
      setValue('username', data.username);
      setValue('phone', data.phone);
    }
  }, [setValue, data, modalConfig, isLoading]);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (_data) => {
    if (modalConfig.id) {
      await responseHandler(
        updateUser({
          id: modalConfig.id,
          data: {
            name: _data.name,
            email: _data.email,
            username: _data.username,
            phone: _data.phone,
          },
          token: '',
        }),
        'User updated successfully',
      );
    } else {
      await responseHandler(
        addUser({
          data: {
            name: _data.name,
            email: _data.email,
            username: _data.username,
            phone: _data.phone,
          },
          token: '',
        }),
        'User added successfully',
      );
    }
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    open,
    setOpen,
  };
};

export default useUserSubmit;
