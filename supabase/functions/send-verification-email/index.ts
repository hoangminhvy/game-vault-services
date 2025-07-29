import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface VerificationEmailRequest {
  email: string;
  verificationCode: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, verificationCode }: VerificationEmailRequest = await req.json();

    console.log("Sending verification email to:", email);
    console.log("Verification code:", verificationCode);

    const emailResponse = await resend.emails.send({
      from: "thuongnhanIT <noreply@dioanhdanhit.exenble.com>",
      to: [email],
      subject: "Mã xác thực đối tác - thuongnhanIT",
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #00ff88; margin-bottom: 10px;">thuongnhanIT</h1>
            <h2 style="color: #333; margin-top: 0;">Mã xác thực đối tác</h2>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="color: #333; margin-bottom: 15px;">Xin chào,</p>
            <p style="color: #333; margin-bottom: 15px;">
              Bạn đã yêu cầu đăng ký trở thành đối tác của thuongnhanIT. 
              Sử dụng mã xác thực bên dưới để hoàn tất quá trình đăng ký:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <div style="display: inline-block; background: #00ff88; color: #000; padding: 15px 30px; border-radius: 8px; font-size: 24px; font-weight: bold; letter-spacing: 2px;">
                ${verificationCode}
              </div>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-bottom: 0;">
              Mã này có hiệu lực trong 10 phút. Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này.
            </p>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              Email này được gửi từ hệ thống tự động của thuongnhanIT
            </p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      messageId: emailResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-verification-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);