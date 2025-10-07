"use client";

import { useEffect } from 'react';
import { useRouter } from "next/navigation";

import useRequest from '@/hooks/use-request';

export default function SignOut () {
  const router = useRouter();
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => router.push('/')
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div className="text-warning">Signing you out...</div>; 
}