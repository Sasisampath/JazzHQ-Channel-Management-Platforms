import { redirect } from "next/navigation";
import { route } from "@/data/guide";

export default function Home() {
  redirect(route);
}
