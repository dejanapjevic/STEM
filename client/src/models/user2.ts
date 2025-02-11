export type User2 = {
    user: {
      email: string;
      userName: string;
      firstName: string;
      lastName: string;
      gender: string;
      dateOfBirth: string; // Može biti Date ako konvertuješ prilikom parsiranja
    };
    roles: string[];
  };
  