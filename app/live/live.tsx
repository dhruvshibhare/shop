import Link from 'next/link';

export default function LiveSitePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <h1 className="text-3xl font-bold mb-6">Visit Our Live Website</h1>
      <Link
        href="https://www.shopvix.co"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg shadow-lg hover:bg-primary/90 transition text-lg font-semibold"
      >
        Go to www.shopvix.co
      </Link>
    </div>
  );
}
