import { Fedex } from "./fedex";

const fedex = new Fedex(
  {
    clientId: process.env.FEDEX_CLIENT_ID!,
    clientSecret: process.env.FEDEX_CLIENT_SECRET!,
    grantType: "client_credentials",
    env: "sandBox",
    storedToken: {
      expires: 3599,
      scope: "CXS-TP",
      createdAt: 1704836082454,
      tokenType: "bearer",
      accessToken:
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJDWFMtVFAiXSwiUGF5bG9hZCI6eyJjbGllbnRJZGVudGl0eSI6eyJjbGllbnRLZXkiOiJsNzBmYjJlZDM1ZGQ3YjQ5ZjA4OWQ4NDQ3YmU4MzllM2YxIn0sImF1dGhlbnRpY2F0aW9uUmVhbG0iOiJDTUFDIiwiYWRkaXRpb25hbElkZW50aXR5Ijp7InRpbWVTdGFtcCI6IjA5LUphbi0yMDI0IDE2OjM0OjQyIEVTVCIsImdyYW50X3R5cGUiOiJjbGllbnRfY3JlZGVudGlhbHMiLCJhcGltb2RlIjoiU2FuZGJveCIsImN4c0lzcyI6Imh0dHBzOi8vY3hzYXV0aHNlcnZlci1zdGFnaW5nLmFwcC5wYWFzLmZlZGV4LmNvbS90b2tlbi9vYXV0aDIifSwicGVyc29uYVR5cGUiOiJEaXJlY3RJbnRlZ3JhdG9yX0IyQiJ9LCJleHAiOjE3MDQ4Mzk2ODIsImp0aSI6IjBmYzZmOGFjLWE5MzMtNDc1OC1iMmQ3LTk3Zjc3ZmY0Nzc3NSJ9.WGjpPMqvsvR5AMCCgS8YismYe5PHwNDZAA2v6I9Ty6uY1AeMEKsEdeY3bjM25FCkG8USO2qq8xKR8PxuDuOgilu6m2AC55mQf32r2C0Iqmno1vH6z_sDY_VdfMiKqv__Qy2k-PSyh5HQHayJX5B9ypLSugWdBoCmBmZwvYhh8Lc4zNNdoA_gJU_Nt9pR3ibcQomJKlJb7ZhV5OGqZ0oK1lU1ikLpItPf27t0fCTbUn30GD5744QdhvBSEPJYcdsNSZKDZ98bf5_Zr8qbFXQtAC0vXrQPAIc-KJAvZs_CoRQtf2i7ot07bod13IR341W5vwdfz-wcwEvKDd1rZnn4RI6hIuJG72NPvSIwfrR0RaCXansLsOJ8BdBmYRoVthHBHwuMovVhpKcq13HZRbX2qKcLSQxE8YFYBpd-BHRvBZF6JCvql2iU6XoMhBq13ZQnnukBGx1UmTnZNSzSbxBM1lxb8jOS4hAvMWUmiKwqKC91WZ18bDA-t5wg4_5kYpeWXBA6jE980a18mPW8IGaHUu2Xo3PqcPZmKP1P_RekZ32BMJtGMMqldasOW-5x6gszkTtpa-irC42ZSNRXlfNXT7NhaPDJahtDv1u0sMygDc8Xy5k9zzzNiL3vLpXwcsjTCx2_8GhWaTnG0VIsW-rn_ukk2_JjSg-Q_rIUnoSVRKE",
    },
  
});

fedex.authenticate().authenticate();
