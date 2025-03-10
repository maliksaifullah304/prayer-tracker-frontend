import {Box, Button, Stack} from '@mui/material';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/navigation';
import {SignUpSchema} from '../../validations/authSchema';
import PasswordInput from '@/components/input/passwordInput';
import EmailInput from '@/components/input/emailInput';
import InputField from '@/components/input';
import {toast} from 'react-toastify';
import IslamicIcon from '../../components/islamicIcon';
import OfferPrayerImg from '../../components/offerPrayerImg';
import Link from 'next/link';
import apiInstance from '@/lib/http';

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(SignUpSchema),
    mode: 'all',
  });
  const onSubmit = async (data) => {
    try {
      const res = await apiInstance.post('/auth/register', data);
      toast(res.data?.message, {type: 'success', autoClose: 2000});
      router.push('/login');
    } catch (error) {
      toast(error?.response?.data?.message, {type: 'error'});
    }
  };
  return (
    <Stack direction={'row'}>
      <Box sx={{width: {xs: '100%', md: '50%'}}}>
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
            <InputField
              errorMsg={errors.name?.message}
              placeholder="Enter Your Name"
              label="Name"
              {...register('name')}
            />
            <EmailInput
              errorMsg={errors.email?.message}
              {...register('email')}
            />
            <InputField
              errorMsg={errors.address?.message}
              placeholder="Enter your address"
              label="Address"
              {...register('address')}
            />
            <PasswordInput
              errorMsg={errors?.password?.message}
              {...register('password')}
            />
            <PasswordInput
              errorMsg={errors?.confirmPassword?.message}
              label="Confirm Password"
              {...register('confirmPassword')}
            />

            <Link href="/login">Already have an acount</Link>

            <Stack
              alignItems={'center'}
              marginTop={3}
              gap={1}
              direction={'column'}
            >
              <Button
                type="submit"
                style={{padding: '15px 60px'}}
                color="primary"
                variant="contained"
              >
                SignUp
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
      <OfferPrayerImg />
    </Stack>
  );
};

export default SignUp;
