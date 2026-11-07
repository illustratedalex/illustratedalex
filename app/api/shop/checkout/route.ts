import { handleSquareCheckout } from "@/server/square-checkout-handler";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  return handleSquareCheckout(request);
}
