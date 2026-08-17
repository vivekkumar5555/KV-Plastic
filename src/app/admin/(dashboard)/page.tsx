import {
  IconInbox,
  IconPackage,
  IconBriefcase,
  IconArticle,
} from "@tabler/icons-react";
import { Card } from "@/components/ui/Card";
import { IconChip } from "@/components/ui/IconChip";
import { getDashboardStats, getRecentActivity } from "@/lib/admin-queries";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [stats, activity] = await Promise.all([
    getDashboardStats(),
    getRecentActivity(),
  ]);

  const cards = [
    { label: "New Leads This Week", value: stats.newLeads, icon: IconInbox },
    { label: "Total Products", value: stats.totalProducts, icon: IconPackage },
    { label: "Portfolio Items", value: stats.totalPortfolio, icon: IconBriefcase },
    { label: "Blog Posts", value: stats.totalBlogPosts, icon: IconArticle },
  ];

  return (
    <div>
      <h1 className="text-text">Dashboard</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label} className="flex items-center gap-4">
            <IconChip icon={<c.icon size={20} stroke={1.75} />} />
            <div>
              <div className="text-2xl font-medium text-text">{c.value}</div>
              <div className="text-xs text-text-secondary">{c.label}</div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <h2 className="text-text">Recent Activity</h2>
        {activity.length === 0 ? (
          <p className="mt-4 text-sm text-text-secondary">No activity yet.</p>
        ) : (
          <ul className="mt-4 divide-y-[0.5px] divide-border">
            {activity.map((a) => (
              <li
                key={a.id}
                className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm"
              >
                <span className="text-text">
                  <span className="font-medium">{a.actor}</span> {a.action}{" "}
                  {a.entity}
                </span>
                <span className="text-text-secondary">
                  {new Date(a.createdAt).toLocaleString("en-US")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
