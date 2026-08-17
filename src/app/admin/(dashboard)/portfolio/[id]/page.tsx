import { notFound } from "next/navigation";
import { PortfolioForm } from "@/components/admin/PortfolioForm";
import { getPortfolioById } from "@/lib/admin-queries";
import { updatePortfolio } from "../actions";

export default async function EditPortfolioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getPortfolioById(id);
  if (!item) notFound();

  const action = updatePortfolio.bind(null, id);

  return (
    <div>
      <h1 className="text-text">Edit Case Study</h1>
      <div className="mt-6 max-w-2xl">
        <PortfolioForm item={item} action={action} />
      </div>
    </div>
  );
}
