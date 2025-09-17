'use client';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
    Divider,
    Avatar
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    Lock,
    GitHub,
    Google,
    ArrowBack
} from '@mui/icons-material';
import { useState } from 'react';
import { signIn } from "next-auth/react"
import Link from 'next/link';
import { useRouter } from 'next/navigation'
const AuthSignIn = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        username: '',
        password: ''
    });
    const [touched, setTouched] = useState({
        username: false,
        password: false
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const validateField = (field: string, value: string) => {
        switch (field) {
            case 'username':
                if (!value.trim()) {
                    return 'Username is required';
                }
                if (value.length < 3) {
                    return 'Username must be at least 3 characters';
                }
                return '';
            case 'password':
                if (!value) {
                    return 'Password is required';
                }
                if (value.length < 6) {
                    return 'Password must be at least 6 characters';
                }
                return '';
            default:
                return '';
        }
    };

    const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Validate field and update errors
        const error = validateField(field, value);
        setErrors(prev => ({
            ...prev,
            [field]: error
        }));
    };

    const handleBlur = (field: string) => () => {
        setTouched(prev => ({
            ...prev,
            [field]: true
        }));

        // Validate on blur
        const error = validateField(field, formData[field as keyof typeof formData]);
        setErrors(prev => ({
            ...prev,
            [field]: error
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Mark all fields as touched
        setTouched({
            username: true,
            password: true
        });

        // Validate all fields
        const usernameError = validateField('username', formData.username);
        const passwordError = validateField('password', formData.password);

        setErrors({
            username: usernameError,
            password: passwordError
        });

        // Only submit if no errors
        if (!usernameError && !passwordError) {
            console.log('Sign in attempt:', formData);
            // Handle sign in logic here
            const result = await signIn('credentials', {
                username: formData.username,
                password: formData.password,
                redirect: false,
            });

            if (!result?.error) {
                // redirect to home
                router.push('/');
            } else {
                alert(result.error);
            }
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 4
                }}
            >
                <Card
                    elevation={3}
                    sx={{
                        width: '100%',
                        maxWidth: 400,
                        p: 2,
                        position: 'relative'
                    }}
                >
                    <CardContent>
                        {/* Back Button */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 16,
                                left: 16,
                                zIndex: 1
                            }}
                        >
                            <Link href="/" >
                                <ArrowBack />
                            </Link>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                mb: 3
                            }}
                        >
                            <Avatar
                                sx={{
                                    bgcolor: 'grey.300',
                                    width: 56,
                                    height: 56,
                                    mb: 2
                                }}
                            >
                                <Lock fontSize="large" color="action" />
                            </Avatar>
                            <Typography variant="h5" component="h1" fontWeight="medium">
                                Sign in
                            </Typography>
                        </Box>

                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={formData.username}
                                onChange={handleInputChange('username')}
                                onBlur={handleBlur('username')}
                                error={touched.username && !!errors.username}
                                helperText={touched.username && errors.username}
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-error': {
                                            '& fieldset': {
                                                borderColor: '#d32f2f',
                                                borderWidth: '2px',
                                            },
                                        },
                                        '&:hover': {
                                            '& fieldset': {
                                                borderColor: touched.username && errors.username ? '#d32f2f' : '#1976d2',
                                            },
                                        },
                                    },
                                    '& .MuiFormHelperText-root.Mui-error': {
                                        color: '#d32f2f',
                                        fontWeight: 500,
                                        fontSize: '0.75rem',
                                    },
                                }}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleInputChange('password')}
                                onBlur={handleBlur('password')}
                                error={touched.password && !!errors.password}
                                helperText={touched.password && errors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    mb: 3,
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-error': {
                                            '& fieldset': {
                                                borderColor: '#d32f2f',
                                                borderWidth: '2px',
                                            },
                                        },
                                        '&:hover': {
                                            '& fieldset': {
                                                borderColor: touched.password && errors.password ? '#d32f2f' : '#1976d2',
                                            },
                                        },
                                    },
                                    '& .MuiFormHelperText-root.Mui-error': {
                                        color: '#d32f2f',
                                        fontWeight: 500,
                                        fontSize: '0.75rem',
                                    },
                                }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 1,
                                    mb: 3,
                                    bgcolor: '#1976d2',
                                    py: 1.5,
                                    textTransform: 'uppercase',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        bgcolor: '#1565c0',
                                    },
                                }}
                            >
                                Sign In
                            </Button>

                            <Divider sx={{ my: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Or using
                                </Typography>
                            </Divider>

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: 2,
                                    mt: 2
                                }}
                            >
                                <IconButton
                                    sx={{
                                        bgcolor: '#ff9800',
                                        color: 'white',
                                        width: 48,
                                        height: 48,
                                        '&:hover': {
                                            bgcolor: '#f57c00',
                                        },
                                    }}
                                    onClick={() => signIn('github')}
                                >
                                    <GitHub />
                                </IconButton>

                                <IconButton
                                    sx={{
                                        bgcolor: '#ff9800',
                                        color: 'white',
                                        width: 48,
                                        height: 48,
                                        '&:hover': {
                                            bgcolor: '#f57c00',
                                        },
                                    }}
                                >
                                    <Google />
                                </IconButton>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}

export default AuthSignIn;