# Failed Login Investigation

## Objective
Investigate repeated failed authentication events followed by a successful login.

## Tools
Wazuh, Windows Logs, VirusTotal, MITRE ATT&CK.

## Evidence Checked
- Source IP and reputation
- Affected user and host
- Timestamp sequence
- Failed-to-success authentication pattern
- Baseline behavior

## MITRE Mapping
Credential Access / Brute Force.

## Verdict
Suspicious login pattern. Escalation recommended with timeline, evidence summary, and monitoring action.
