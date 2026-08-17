import { Card } from "@/components/ui/Card";
import { getRecentActivity } from "@/lib/admin-queries";

export const dynamic = "force-dynamic";

export default async function AdminActivityPage() {
  const activity = await getRecentActivity(200);

  return (
    <div>
      <h1 className="text-text">Activity Log</h1>

      <Card className="mt-6 p-0">
        {activity.length === 0 ? (
          <p className="p-6 text-sm text-text-secondary">No activity yet.</p>
        ) : (
          <ul className="divide-y-[0.5px] divide-border">
            {activity.map((a) => (
              <li
                key={a.id}
                className="flex flex-wrap items-center justify-between gap-2 px-6 py-3 text-sm"
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
