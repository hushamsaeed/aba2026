import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

function escapeCSV(value: string | null | undefined): string {
  if (value == null) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        delegates: true,
        payment: true,
      },
    });

    const headers = [
      "Reference",
      "Type",
      "Contact Name",
      "Email",
      "Phone",
      "Organization",
      "Country",
      "Membership",
      "Status",
      "Amount",
      "Currency",
      "Early Bird",
      "Created At",
      "Delegate Name",
      "Delegate Email",
      "Delegate Phone",
      "Delegate Job Title",
      "Delegate Organization",
      "Delegate Country",
      "Delegate Dietary Requirements",
      "Delegate Special Requests",
    ];

    const rows: string[][] = [];

    for (const reg of registrations) {
      const baseRow = [
        reg.referenceNumber,
        reg.type,
        reg.contactName,
        reg.contactEmail,
        reg.contactPhone || "",
        reg.organizationName || "",
        reg.country || "",
        reg.membershipType,
        reg.status,
        reg.totalAmount.toString(),
        reg.currency,
        reg.earlyBird ? "Yes" : "No",
        reg.createdAt.toISOString(),
      ];

      if (reg.delegates.length === 0) {
        rows.push([...baseRow, "", "", "", "", "", "", ""]);
      } else {
        for (const del of reg.delegates) {
          rows.push([
            ...baseRow,
            `${del.salutation ? del.salutation + " " : ""}${del.firstName}${del.middleName ? " " + del.middleName : ""} ${del.lastName}`,
            del.email,
            del.phone || "",
            del.jobTitle || "",
            del.organization || "",
            del.country || "",
            del.dietaryRequirements || "",
            del.specialRequests || "",
          ]);
        }
      }
    }

    const csvContent = [
      headers.map(escapeCSV).join(","),
      ...rows.map((row) => row.map(escapeCSV).join(",")),
    ].join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="aba-registrations-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Registration export error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
