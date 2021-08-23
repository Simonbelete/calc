import React, { ReactElement, useState } from "react";
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
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import axios from "lib/axios";
import { useEffect } from "react";
import IUser from "interface/IUser";
import { SettingsOverscanOutlined } from "@material-ui/icons";

type Inputs = {
  firstName: string;
  lastName: string;
  password?: string;
};

const UpdateProfile = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const [err, setErr] = useState<any>("");
  const [user, setUser] = useState<IUser | null>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    axios
      .put("/api/users", data)
      .then((response) => {
        if (response.status === 200) {
          setErr(<Alert severity="success">Sucessfully updated.</Alert>);
        } else
          setErr(
            <Alert severity="error">
              Faile to update, check your data and try again.
            </Alert>
          );
      })
      .catch((error) => {
        setErr(<Alert severity="error">500 - Error, please try again.</Alert>);
      });
  };

  useEffect(() => {
    axios
      .get("/api/users")
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          setValue("firstName", response.data.data.firstName);
          setValue("lastName", response.data.data.lastName);
        }
      })
      .catch((error) => {});
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Update Profile
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
                InputLabelProps={{
                  shrink: true,
                }}
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
                defaultValue={user?.lastName}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("password", { required: false })}
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
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
            Update
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default UpdateProfile;
