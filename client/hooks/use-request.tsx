import { useState, type ChangeEvent, type FormEvent } from 'react';
import axios from 'axios';

interface UserRequest<T> {
  url: string;
  method: 'post' | 'get' | 'patch' | 'delete';
  body: T,
  onSuccess: (variable: any) => void;
}

interface CustomError {
  message: string;
  field?: string;
}

export default function userRequest<T>(
  { url, method, body, onSuccess }: UserRequest<T>
) {
  const [errors, setErrors] = useState(null);

  async function doRequest() {
    try {
      const response = await axios[method](url, body);
      setErrors(null);

      if (onSuccess) onSuccess(response.data);
      return response.data;
    } catch (err) {
      setErrors(
        <div className="alert alert-danger" role="alert">
          <h4>Ooops...</h4>
          <ul className="my-0">
            {err.response.data?.errors.map((err: CustomError) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  }

  return { doRequest, errors }
}