import RegisterForm from "@/components/register-form";

export default function SignUpPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-1/4">
        <p className="mb-4 text-3xl font-semibold">ai</p>
        <RegisterForm />
      </div>
    </div>
  );
}
