import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return <>
    <div className="flex min-h-svh w-full items-center justify-center p-6">
      <div className="w-full max-w-sm">
          <SignUp />
      </div>
    </div>
  </>
}