import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="font-display font-black text-[12rem] leading-none text-dark-700 select-none">
          404
        </div>
        <h1 className="font-display font-bold text-3xl mb-4 -mt-8">Page not found</h1>
        <p className="text-[var(--muted)] mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
