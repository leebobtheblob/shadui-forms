export async function GET(request: Request) {
  return Response.json({
    userName: "Isaac Lee",
    userEmail: "isaaclee@mailplug.com",
  });
}
