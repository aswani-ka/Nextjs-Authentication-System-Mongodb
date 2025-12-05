import nodemailer, {Transporter} from "nodemailer"
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"
import SMTPTransport from "nodemailer/lib/smtp-transport";


if (!process.env.MAILTRAP_SMTP_HOST ||
    !process.env.MAILTRAP_SMTP_PORT ||
    !process.env.MAILTRAP_SMTP_USER ||
    !process.env.MAILTRAP_SMTP_PASS) {
  throw new Error("Missing Mailtrap environment variables");
}

export const sendEmail = async({email, emailType, userId}: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        if(emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, 
            {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            },
            {
                new: true
            })
        } else if(emailType === "RESET") {
            await User.findByIdAndUpdate(userId, 
            {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            },
            {
                new: true
            })
        }

        const smtpPort = parseInt(process.env.MAILTRAP_SMTP_PORT!, 10)

        // const transporter: Transporter = nodemailer.createTransport({
        //     host: process.env.MAILTRAP_SMTP_HOST,
        //     port: smtpPort,
        //     secure: false, 
        //     auth: {
        //         user: process.env.MAILTRAP_SMTP_USER,
        //         pass: process.env.MAILTRAP_SMTP_PASS,
        //     },
        // });


        const transporter = nodemailer.createTransport(
        {
            host: process.env.MAILTRAP_SMTP_HOST,
            port: smtpPort,
            secure: false,
            auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS,
            },
        } as SMTPTransport.Options
        );


        const mailOptions = {
            from: "aswani@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy paste the link below in your browser. <br> ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}
            </p>`
        }

        const mailResponse = await transporter.sendMail(mailOptions)
        return mailResponse

    } catch (error: any) {
        throw new Error(error.message)
    }
}