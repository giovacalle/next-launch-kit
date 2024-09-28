export default function ForgotPassword() {
  return (
    <form className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm">
          Email
        </label>
        <input type="email" id="email" className="rounded-md bg-slate-200 p-2 text-black" />
      </div>
      <button className="rounded-md bg-blue-600 p-2 text-white hover:bg-blue-500">
        Send reset password email
      </button>
    </form>
  );
}
