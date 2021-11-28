import { Box, Button, Card, Stack, TextField, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';


const Signup = (props: any) => {
  const userRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const repeatPassRef = useRef<HTMLInputElement>(null);
  const { signup } = useAuth();
  const [valid, setValid] = useState(false);
  const [error, setError] = useState('');
  const navigator = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const user = userRef.current?.value;
    const pass = passRef.current?.value;
    try {
      setError('');
      setValid(false);
      await signup(user, pass);
      navigator("/login", { replace: true });
    } catch (e) {
      setError("Something went wrong.");
    }
    setValid(true);
  }

  const checkConfirm = (e: any) => {
    const pass = passRef.current?.value;
    const repeatPass = repeatPassRef.current?.value;
    if (pass && pass.length < 8) {
      setError("Password must be at least 8 characters.");
    }
    else {
      setError("");
    }
    // @ts-ignore: Object is possibly 'null'.
    setValid(pass === repeatPass && pass!.match(/^[a-zA-Z0-9_-]{6,}$/g)?.length);
  };

  return (
    <Box style={{ minWidth: "100vw", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card style={{ width: "500px", padding: "40px", background: "#001e3c" }}>
        <Typography variant="h2" align="center" fontWeight="medium">Sign up</Typography>
        <Stack spacing={5}>
          <p style={{ background: "#ff9b9b", color: "#ff0000", opacity: error === "" ? "0" : "1", minHeight: "1.25rem", padding: "1rem", borderRadius: "10px" }}>{error}</p>
          <TextField label="E-mail" inputRef={userRef} required />
          <TextField label="Password" inputRef={passRef} onChange={checkConfirm} type="password" required />
          <TextField label="Confirm Password" inputRef={repeatPassRef} onChange={checkConfirm} type="password" required />
          <Button disabled={!valid} onClick={handleSubmit}>Sign up</Button>
          <div>
            Already got an account ? <Link to="/login" style={{ textDecoration: "none", color: "#42a5f5" }}>Log in</Link>
          </div>
        </Stack>
      </Card>
    </Box >
  );
}

export default Signup;