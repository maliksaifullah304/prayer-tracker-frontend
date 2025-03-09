import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { loginSchema } from "../../validations/authSchema";
import Image from "next/image";
import PasswordInput from "@/components/input/passwordInput";
import EmailInput from "@/components/input/emailInput";
import { toast } from "react-toastify";
import PrayerImg from "../../components/offerPrayerImg";
import IslamicIcon from "../../components/islamicIcon";
import OfferPrayerImg from "../../components/offerPrayerImg";
import Link from "next/link";
import apiInstance from "@/lib/http";

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = async (data) => {
    try {
      const res = await apiInstance.post("/auth/login", data);
      console.log(res);
      localStorage.setItem("user", JSON.stringify(res.data.userInfo));
      toast(res.data?.message, { type: "success" });
    } catch (error) {
      toast(error?.response?.data?.message, { type: "error" });
    }
  };
  return (
    <Stack direction={"row"}>
      <Box sx={{ width: { xs: "100%", md: "50%" } }}>
        <IslamicIcon />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            gap={3}
            sx={{
              paddingX: {
                xs: 2,
                md: 15,
                sm: 10,
              },
            }}
          >
            <EmailInput
              errorMsg={errors.email?.message}
              {...register("email")}
            />
            <PasswordInput
              errorMsg={errors?.password?.message}
              {...register("password")}
            />

            <Link href="./signup">Does'nt have an account</Link>

            <Stack
              alignItems={"center"}
              marginTop={3}
              gap={1}
              direction={"column"}
            >
              <Button
                type="submit"
                style={{ padding: "15px 60px" }}
                color="primary"
                variant="contained"
              >
                Login
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
      <OfferPrayerImg />
    </Stack>
  );
};

export default Login;
