import { redirect } from "next/navigation";
import { ROUTES } from "@/shared/model/routes";

export default function Home() {
    redirect(ROUTES.TEMP.formatable);
}
