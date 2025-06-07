import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

export default function AuthPage({ onAuth }) {
  return (
    <div className="flex flex-wrap gap-8 justify-center mt-12">
      <div className="w-full max-w-sm"><RegisterForm onSuccess={onAuth} /></div>
      <div className="w-full max-w-sm"><LoginForm onSuccess={onAuth} /></div>
    </div>
  );
}
