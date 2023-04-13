export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>APIKey: {process.env.NEXT_PUBLIC_DIFFERENT_BREED_CLIENT_KEY}</p>
    </main>
  );
}
