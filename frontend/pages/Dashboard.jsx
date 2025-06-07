import CreditsDisplay from "../src/components/CreditsDisplay";
import CheckoutButton from "../src/components/CheckoutButton";
import LogoutButton from "../src/components/LogoutButton";

export default function Dashboard() {
  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded shadow flex flex-col items-center">
      <CreditsDisplay />
      <CheckoutButton />
      <LogoutButton />
    </div>
  );
}
