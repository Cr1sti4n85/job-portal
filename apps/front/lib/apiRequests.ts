export const logoutRequest = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
    cache: "no-cache",
    credentials: "include",
  });
  return res.json();
};

//Company

//Jobs

//Applications
