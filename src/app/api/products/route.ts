import { NextResponse } from "next/server";
import { getProductsService } from "@/services/productService";

export async function GET() {
  try {
    const data = await getProductsService();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
