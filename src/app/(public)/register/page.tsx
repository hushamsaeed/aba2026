import { Metadata } from "next";
import { RegistrationSection } from "@/components/home/registration-section";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return <RegistrationSection />;
}
