import { Box, Button, Card, Stack, TextField, Typography } from '@mui/material'
import { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = (props: any) => {
  const userRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();
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
      await login(user, pass);
      navigator("/", { replace: true });
    } catch (e) {
      setError("Failed to log in.");
    }
    setValid(true);
  }

  const checkConfirm = (e: any) => {
    const pass = passRef.current?.value;
    if (pass && pass.length < 8) {
      setError("Password must be at least 8 characters.");
    }
    else {
      setError("");
    }
    // @ts-ignore: Object is possibly 'null'.
    setValid(pass!.match(/^[a-zA-Z0-9_-]{6,}$/g)?.length);
  };

  return (
    <Box style={{ minWidth: "100vw", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card style={{ width: "500px", padding: "40px", background: "#001e3c" }}>
        <Typography variant="h2" align="center" fontWeight="medium">Log in</Typography>
        <Stack spacing={5} style={{ alignItems: "center" }}>
          <p style={{ background: "#ff9b9b", color: "#ff0000", opacity: error === "" ? "0" : "1", padding: "1rem", borderRadius: "10px" }}>
            {error !== "" ? error : "none"}
          </p>
          <TextField label="E-mail" inputRef={userRef} required />
          <TextField label="Password" inputRef={passRef} onChange={checkConfirm} type="password" required />
          <Button disabled={!valid} onClick={handleSubmit} className="btn" >Log In</Button>
          <div>New here ? <Link to="/signup" style={{ textDecoration: "none", color: "#42a5f5" }}>Signup</Link></div>
        </Stack>
      </Card>
    </Box>
  );
}

export default Login;
