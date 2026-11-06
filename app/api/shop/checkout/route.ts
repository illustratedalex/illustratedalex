import { handleSquareCheckout } from "@/server/square-checkout-handler";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleSquareCheckout(request);
}
