# Phishing Header Analysis

## Objective
Investigate a suspicious email with mixed trust signals and potentially malicious links.

## Tools
Email headers, URLScan, VirusTotal, IOC extraction.

## Evidence Checked
- SPF, DKIM, DMARC
- Sender alignment
- Reply-To mismatch
- URL and domain reputation
- Extracted indicators of compromise

## Verdict
Suspicious email. Report the message, monitor indicators, and block confirmed malicious domains or URLs.
