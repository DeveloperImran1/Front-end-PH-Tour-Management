import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const Verify = () => {
  const location = useLocation();
  console.log(location.state); // aikhane sei state ta pabo. Jeita navigate() er second perameter a patha hoisilo.

  const navigate = useNavigate();
  const [sendOtp] = useSendOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const [email] = useState(location.state);
  const [confirmed, setConfirmed] = useState(false);
  const [timer, setTimer] = useState(5);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const handleSendOtp = async () => {
    const toastId = toast.loading("Sending Otp");

    try {
      const res = await sendOtp({ email: email }).unwrap();

      if (res.success) {
        toast.success("Otp Sent", { id: toastId });
        setConfirmed(true);
        setTimer(5);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const toastId = toast.loading("Verifing Otp");

    const userInfo = {
      email,
      otp: data.pin,
    };

    try {
      const res = await verifyOtp(userInfo).unwrap();

      if (res.success) {
        toast.success("OTP Verified", { id: toastId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Comment for development time
  useEffect(() => {
    if (!email || !confirmed) {
      return;
    }

    const timerId = setInterval(() => {
      setTimer((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [email, confirmed]);

  return confirmed ? (
    <div className="h-screen flex flex-col justify-center items-center">
      <Card className="w-full max-w-sm flex flex-col justify-center ">
        <CardHeader>
          <CardTitle>Verify Your Email Address</CardTitle>
          <CardDescription>
            Please enter 6 digit code. Already we sent your email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="otp-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full  space-y-6"
            >
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      <Button
                        onClick={handleSendOtp}
                        type="button"
                        variant="link"
                        disabled={timer !== 0}
                        className={cn("p-0 m-0", {
                          "cursor-pointer": timer === 0,
                          "text-gray-500": timer !== 0,
                        })}
                      >
                        Resent OTP:{" "}
                      </Button>
                      {timer}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="">
          {/* Aikhane submit button ta form er bahira ase, jar fole submit kaj korbena. But sotto akta trics use koresi, upore form tage er moddhe id="otp-form"  sei id er valueta aikhane button a form attribute er moddhe set kore diasi. form="otp-form"  jar fole akhon ai submit button a click korle submit hobe. */}
          <Button form="otp-form" type="submit" className="w-full">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  ) : (
    <div className="h-screen flex flex-col justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Verify your email address</CardTitle>
          <CardDescription>
            We will send you an OTP at <br /> {email}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSendOtp} className="w-[300px]">
            Confirm
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Verify;
