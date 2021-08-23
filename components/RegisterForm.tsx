import {
  Avatar,
  Container,
  CssBaseline,
  Grid,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import LockOutlined from "@material-ui/icons/LockOutlined";
import React, { ReactElement, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";

type Inputs = {
  firstName: string;
  lastName: string;
  nick: string;
  password: string;
};

const RegisterForm = (): ReactElement => {
  const cookies = new Cookies();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [err, setErr] = useState<any>("");
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    axios
      .post("/api/users", data)
      .then((response) => {
        if (response.status === 201) {
          cookies.set("ACESS_TOKEN", response.data.data.token, { path: "/" });
          router.push("/home");
        } else
          setErr(
            <Alert severity="error">Invalid Nick name or Password.</Alert>
          );
      })
      .catch(() => {
        setErr(<Alert severity="error">500 - Error, please try again.</Alert>);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Avatar>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {err && err}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register("firstName", { required: true })}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register("lastName", { required: true })}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("nick", { required: true, pattern: /^[a-z]+$/i })}
                variant="outlined"
                required
                fullWidth
                id="nick"
                label="Nick name"
                name="nick"
                autoComplete="nick"
                helperText={"Nick must be all small letter and no space"}
                error={Boolean(errors.nick)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("password", {
                  required: true,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/i,
                })}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={
                  "At least 8 characters, A mixture of both uppercase and lowercase letters, A mixture of letters and numbers"
                }
                error={Boolean(errors.password)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className=""
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default RegisterForm;
