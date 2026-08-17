import { PortfolioForm } from "@/components/admin/PortfolioForm";
import { createPortfolio } from "../actions";

export default function NewPortfolioPage() {
  return (
    <div>
      <h1 className="text-text">New Case Study</h1>
      <div className="mt-6 max-w-2xl">
        <PortfolioForm action={createPortfolio} />
      </div>
    </div>
  );
}
