import Link from "next/link";
import "@/styles/footer.css";
import { SITE_NAME } from "@/constants/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <h2>{SITE_NAME}</h2>
          <p>
            Connecting Ethiopian customers with quality products sourced from
            China and delivered directly to Ethiopia.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h3>Company</h3>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/products">Products</Link>
          </div>

          <div className="footer-column">
            <h3>Customer Service</h3>
            <Link href="/orders">Track Orders</Link>
            <Link href="/terms">Refund Policy</Link>
            <Link href="/contact">Support</Link>
          </div>

          <div className="footer-column">
            <h3>Legal</h3>
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>

          <p className="footer-location">
            Ethiopia • China Import Service
          </p>
        </div>
      </div>
    </footer>
  );
}