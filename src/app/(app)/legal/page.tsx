import React from 'react'
import Link from 'next/link'
import styles from './legal.module.css'
import type { Metadata } from 'next'
import { baseMetadata } from '@/components/base-metadata'

export const metadata: Metadata = {
  ...baseMetadata,
  title: 'Legal Information - Anthropotpourri',
  description: 'Legal information for shoroukelkobrosi.com',
  openGraph: {
    ...baseMetadata.openGraph,
    title: 'Legal Information - Anthropotpourri',
    description: 'Legal information for shoroukelkobrosi.com',
    url: 'https://shoroukelkobrosi.com/legal',
  },
}

function getFormattedDate(): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date().toLocaleDateString('en-US', options)
}

export default function LegalPage(): React.ReactElement {
  return (
    <div className={styles.legalContainer}>
      <h1>Legal Information</h1>

      <section>
        <h2>Licensing</h2>
        <p>
          This website and its associated source code are protected under two separate licenses:
        </p>

        <h3>1. Website Content</h3>
        <p>
          All content on this website, including but not limited to images, videos, text, and any
          other media not part of the source code, is protected under copyright law with All Rights
          Reserved.
        </p>
        <h4>What this means:</h4>
        <ul>
          <li>
            You may not copy, reproduce, distribute, or create derivative works from any content on
            this website without explicit permission from the copyright holder.
          </li>
          <li>This includes sharing or reposting content on social media platforms.</li>
          <li>You may view and access the content for personal, non-commercial use only.</li>
        </ul>
        <p>
          For permissions or inquiries regarding the use of any content from this website, please
          contact us at{' '}
          <Link href="mailto:admin@shoroukelkobrosi.com">admin@shoroukelkobrosi.com</Link>.
        </p>

        <h3>2. Source Code</h3>
        <p>
          The source code for this website is licensed under the Creative Commons
          Attribution-NonCommercial (CC BY-NC) license.
        </p>
        <h4>What this means:</h4>
        <ul>
          <li>
            You are free to share, copy, redistribute, adapt, remix, transform, and build upon the
            code for any non-commercial purpose.
          </li>
          <li>
            You must give appropriate credit, provide a link to the license, and indicate if changes
            were made.
          </li>
          <li>You may not use the code for commercial purposes.</li>
          <li>You may distribute your modified version of the code under the same license.</li>
        </ul>
        <p>
          <Link href="https://creativecommons.org/licenses/by-nc/4.0/legalcode">
            Full CC BY-NC 4.0 License
          </Link>
        </p>
      </section>

      <section>
        <h2>Terms of Use</h2>
        <ol>
          <li>
            The content and code on this site are provided &ldquo;as is&rdquo; without warranty of
            any kind.
          </li>
          <li>
            By using this website, you agree to abide by the terms of the licenses specified above.
          </li>
          <li>
            Any use of the content or code in violation of these licenses is strictly prohibited.
          </li>
        </ol>
      </section>

      <section>
        <h2>Privacy Policy</h2>
        <p>Last updated: {getFormattedDate()}</p>

        <h3>1. Introduction</h3>
        <p>
          This Privacy Policy explains how we collect and use anonymous usage data when you visit
          our website. We are committed to ensuring the privacy and security of our visitors in
          compliance with the General Data Protection Regulation (GDPR) and other applicable data
          protection laws.
        </p>

        <h3>2. Information We Collect</h3>
        <p>We collect anonymous usage data through Vercel Analytics, which includes:</p>
        <ul>
          <li>Pages visited</li>
          <li>Time spent on the site</li>
          <li>Referring websites</li>
          <li>Approximate geographic location (country level only)</li>
          <li>Browser and device information</li>
        </ul>
        <p>This data is completely anonymized and cannot be used to identify individual users.</p>

        <h3>3. How We Use This Information</h3>
        <p>We use this anonymous data solely for the purpose of:</p>
        <ul>
          <li>Analyzing website usage patterns</li>
          <li>Improving our website and services</li>
        </ul>

        <h3>4. Vercel Analytics</h3>
        <p>
          We use Vercel Analytics, a privacy-focused analytics service. Key points about Vercel
          Analytics:
        </p>
        <ul>
          <li>It does not use cookies for tracking</li>
          <li>It does not track individual users across sessions or websites</li>
          <li>All data collected is anonymous and aggregated</li>
          <li>It complies with GDPR and other privacy regulations</li>
        </ul>

        <h3>5. Cookies</h3>
        <p>Our website does not use any cookies, including for analytics or tracking purposes.</p>

        <h3>6. Data Storage and Security</h3>
        <p>
          The anonymous data collected through Vercel Analytics is stored securely on Vercel&apos;s
          servers. As the data is anonymized, it cannot be linked to any individual user.
        </p>

        <h3>7. Your Rights</h3>
        <p>
          As we do not collect any personally identifiable information, there is no personal data
          for you to access, modify, or delete. However, if you have any concerns about our data
          practices, please contact us.
        </p>

        <h3>8. Changes to This Policy</h3>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by
          posting the new Privacy Policy on this page.
        </p>

        <h3>9. Contact Us</h3>
        <p>
          If you have any questions about this Privacy Policy, please contact us at{' '}
          <Link href="mailto:admin@shoroukelkobrosi.com">admin@shoroukelkobrosi.com</Link>.
        </p>
      </section>
    </div>
  )
}
