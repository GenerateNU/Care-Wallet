// import { mockAuth } from 'firebase-mock';
// import { logIn } from 'client/services/auth/login.ts'; // Adjust path to match your project structure

// describe('logIn function', () => {
//   const auth = mockAuth();

//   it('should log in with valid credentials', async () => {
//     auth.signInWithEmailAndPassword.mockResolvedValueOnce({
//       user: {
//         uid: 'mock-user-id',
//         email: 'user@example.com',
//         // ...other user properties
//       },
//     });

//     const user = await logIn('user@example.com', 'password');

//     expect(user).toBeDefined();
//     expect(user.uid).toBe('mock-user-id');
//     expect(user.email).toBe('user@example.com');
//   });

//   it('should handle invalid credentials', async () => {
//     auth.signInWithEmailAndPassword.mockRejectedValueOnce(new Error('Invalid email or password'));

//     const user = await logIn('invalid@email.com', 'wrongpassword');

//     expect(user).toBeNull();
//   });
// });
