    import { Button, TextField, Box, Typography } from "@mui/material";
    import '../../../styles/App.css';
    import { useState } from "react";
    
    export default function HomePage() {
        const [showLoginForm, setShowLoginForm] = useState(false);
        const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    
        // Funkcija za prikazivanje forme za prijavu
        const handleLoginClick = () => {
            setShowLoginForm(true);
        };

       // Funkcija za prikazivanje forme za registraciju
        const handleRegistrationClick = () => {
            setShowRegistrationForm(true);
        };
    
        // Funkcija za zatvaranje formi
        const handleCloseForm = () => {
            setShowLoginForm(false);
            setShowRegistrationForm(false);
        };

    
        return (
            <>
                <img src="/background.jpg" alt="stem-image" className="stem-image" />
                
                {!showLoginForm && !showRegistrationForm && (
                <div className="button-container">
                    <Button 
                        variant="outlined" 
                        onClick={handleLoginClick} 
                        sx={{ fontWeight:'bold', color:'#002147', borderColor: '#002147', background:'white' }}
                    >
                        Prijavi se
                    </Button>
                    <Button 
                        onClick={handleRegistrationClick}
                        variant="outlined" 
                        sx={{ fontWeight:'bold', color: '#002147', borderColor: '#002147', background:'white' }}
                    >
                        Registruj se
                    </Button>
                </div>
    )}
                {/* Prikazuje formu za prijavu ako je showLoginForm true */}
                {showLoginForm && (
                    
                    <Box className="form-box" 
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                padding: 3,
                                border: '1px solid #002147',
                                borderRadius: 2,
                                background: 'white',
                                width: 300,
                                boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)'
                            }}
                        
                    >
                        <Typography variant="h6" sx={{ marginBottom: 2, color: '#002147' }}>
                            Prijava
                        </Typography>
                        <TextField 
                            label="Korisničko ime" 
                            fullWidth 
                            margin="normal" 
                        />
                        <TextField 
                            label="Lozinka" 
                            type="password" 
                            fullWidth 
                            margin="normal" 
                        />
                        <Button
                            variant="contained"
                            sx={{ 
                                marginTop: 2, 
                                backgroundColor: '#002147', 
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#001233' // Tamnija plava boja na hover
                                }
                            }}
                        >
                            Prijavi se
                        </Button>
                        <Button
                            variant="text"
                            onClick={handleCloseForm} // Dugme za zatvaranje forme
                            sx={{
                                marginTop: 2,
                                color: '#002147',
                                display: 'block',
                            }}
                        >
                            Zatvori
                        </Button>
                    </Box>
                  
                )}

{showRegistrationForm && (
                <Box
                    className="form-box"
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        padding: 3,
                        border: '1px solid #002147',
                        borderRadius: 2,
                        background: 'white',
                        width: 300,
                        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    <Typography variant="h6" sx={{ marginBottom: 2, color: '#002147' }}>
                        Registracija
                    </Typography>
                    <TextField 
                        label="Korisničko ime" 
                        fullWidth 
                        margin="normal" 
                    />
                    <TextField 
                        label="Lozinka" 
                        type="password" 
                        fullWidth 
                        margin="normal" 
                    />
                    <TextField 
                        label="Potvrdi lozinku" 
                        type="password" 
                        fullWidth 
                        margin="normal" 
                    />
                    <Button
                        variant="contained"
                        sx={{ 
                            marginTop: 2, 
                            backgroundColor: '#002147', 
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#001233' // Tamnija plava boja na hover
                            }
                        }}
                    >
                        Registruj se
                    </Button>
                    <Button
                        variant="text"
                        onClick={handleCloseForm} // Dugme za zatvaranje forme
                        sx={{
                            marginTop: 2,
                            color: '#002147',
                            display: 'block',
                        }}
                    >
                        Zatvori
                    </Button>
                </Box>
            )}
            </>
        );
    }
    