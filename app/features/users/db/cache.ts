import { getIdTag } from "@/lib/dataCache";

export function getUserIdTag(id: string) {
  return getIdTag("users", id);
}
