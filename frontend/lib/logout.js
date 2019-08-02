export default function logout(options) {
  res.writeHead(302, { location: '/login' });
  res.end();
}