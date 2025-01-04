import SignInForm from "@/components/form/SignInForm";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <SignInForm />
      </div>
    </div>
  );
};

export default Page;
