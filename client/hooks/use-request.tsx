'use client';
import { useState } from 'react';
import axios from 'axios';
import { useCurrUser } from '@/contexts/current-user-context';

interface UserRequest<T> {
  url: string;
  method: 'post' | 'get' | 'patch' | 'delete';
  body: T;
  onSuccess?: (data: any) => void; // Optional for flexibility
}

interface CustomError {
  message: string;
  field?: string;
}

export default function useRequest<T>({ url, method, body, onSuccess }: UserRequest<T>) {
  const [errors, setErrors] = useState(null);
  const { setCurrUser, refetchUser } = useCurrUser();

  async function doRequest() {
    try {
      const response = await axios[method](url, body);
      setErrors(null);

      // Update user state based on action
      if (url.includes('signout')) {
        setCurrUser(null); // Immediate client update
        await refetchUser(); // Confirm with server
      } else if (url.includes('signin') || url.includes('signup')) {
        await refetchUser(); // Fetch new user data
      }

      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err: any) {
      setErrors(
        <div className="alert alert-danger" role="alert">
          <h4>Ooops...</h4>
          <ul className="my-0">
            {err.response?.data?.errors?.map((err: CustomError) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  }

  return { doRequest, errors };
}