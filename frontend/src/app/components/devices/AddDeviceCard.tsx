import Link from "next/link";
import { PlusIcon } from "@/app/components/ui/icons/PlusIcon";
import { Card } from "@/app/components/ui/Card";

export function AddDeviceCard() {
  return (
    <Link href="/devices/new" className="group">
      <Card
        className="border-dashed flex flex-col justify-center items-center min-h-30 hover:border-primary"
        hover={true}
      >
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <PlusIcon className="text-primary" />
        </div>
      </Card>
    </Link>
  );
}
