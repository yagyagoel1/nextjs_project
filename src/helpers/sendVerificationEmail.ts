import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Next js app Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    if (!error)
      return { success: true, message: "verification email send successfully" };
    else throw new Error(`${error}`);
  } catch (error) {
    console.error("error sending verification email", error);
    return { success: false, message: "failed to send verification email" };
  }
}
