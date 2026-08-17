import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { getAllPortfolios } from "@/lib/admin-queries";
import { deletePortfolio } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPortfolioPage() {
  const items = await getAllPortfolios();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-text">Portfolio</h1>
        <LinkButton href="/admin/portfolio/new">New Case Study</LinkButton>
      </div>

      <Card className="mt-6 overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-[0.5px] border-border text-left text-xs uppercase tracking-wide text-text-secondary">
              <th className="px-6 py-3 font-medium">Title</th>
              <th className="px-6 py-3 font-medium">Industry</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b-[0.5px] border-border last:border-0">
                <td className="px-6 py-3 text-text">{item.title}</td>
                <td className="px-6 py-3 text-text-secondary">{item.industry}</td>
                <td className="px-6 py-3">
                  <Badge tone={item.published ? "primary" : "accent"}>
                    {item.published ? "Published" : "Draft"}
                  </Badge>
                </td>
                <td className="px-6 py-3">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/portfolio/${item.id}`}
                      className="text-sm text-primary hover:underline"
                    >
                      Edit
                    </Link>
                    <DeleteButton onDelete={deletePortfolio.bind(null, item.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-text-secondary">
                  No case studies yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
