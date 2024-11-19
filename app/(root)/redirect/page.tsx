
"use server"

import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

const RedirectToDashboard = async () => {
  const { userId} = await auth();

  if (!userId) {
    redirect('/');
  }

  redirect(`/dashboard/${userId}`);
  

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1>Redirecting...</h1>
    </div>
  );
};

export default RedirectToDashboard;
