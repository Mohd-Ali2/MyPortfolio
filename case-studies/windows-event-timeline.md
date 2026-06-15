# Windows Event Timeline

## Objective
Create a readable investigation timeline from Windows security events.

## Tools
Windows Event Logs, Sysmon-style events, timeline analysis, MITRE ATT&CK.

## Evidence Checked
- 4625 failed logon
- 4688 process creation
- 5156 network connection
- User and host context
- Suspicious process/network sequence

## MITRE Mapping
Credential Access.

## Verdict
Build a timeline for scope, containment discussion, and escalation priority.
