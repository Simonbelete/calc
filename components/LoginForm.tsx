import React, { ReactElement, useState } from "react";
import LinkNext from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Container,
  CssBaseline,
  Avatar,
  Button,
  Typography,
  TextField,
  Grid,
  Link,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import cookie from "cookie";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";

type Inputs = {
  nick: string;
  password: string;
};

const LoginForm = (): ReactElement => {
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
      .post("/api/login", { nick: data.nick, password: data.password })
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
        setErr(<Alert severity="error">Invalid Nick name or Password.</Alert>);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="">
        <Avatar className="">
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {err && err}
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("nick", { required: true, pattern: /^[a-z]+$/i })}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Nick"
            name="nick"
            autoComplete="nick"
            autoFocus
            helperText={"Nick must be all small letter and no space"}
            error={Boolean(errors.nick)}
          />
          <TextField
            {...register("password", {
              required: true,
            })}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            helperText=""
            autoComplete="current-password"
            error={Boolean(errors.password)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className=""
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <LinkNext href="/register">
                {"Don't have an account? Sign Up"}
              </LinkNext>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default LoginForm;
