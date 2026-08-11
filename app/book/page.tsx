import Navbar from "@/components/layout/Navbar";
import BookFlow from "@/components/booking/BookFlow";

export const metadata = {
  title: "Book a call — Vantix",
  description: "Schedule a discovery call with Vantix.",
};

export default function BookPage() {
  return (
    <main className="book-page-shell relative min-h-[100svh]">
      <div className="book-page-scrim pointer-events-none absolute inset-0" aria-hidden="true" />
      <Navbar />
      <BookFlow />
    </main>
  );
}
