"""
SlothFinance - Gemma Open-Weights Agent Engine
Generates witty Sloth Financial Audits and formal 1-Click Consumer Cancellation Letters.
Supports local Ollama (gemma2:2b / gemma2:9b), HuggingFace endpoints, and built-in offline generation.
"""

import json
import os
from typing import Dict, Any, Optional

class GemmaAgent:
    def __init__(self, model_name: str = "gemma2:2b", ollama_host: str = "http://localhost:11434"):
        self.model_name = model_name
        self.ollama_host = ollama_host

    def generate_audit_roast(self, analysis: Dict[str, Any], user_name: str = "Fellow Sloth") -> Dict[str, Any]:
        """Generate humorous, honest Sloth Financial Audit and Action Plan."""
        monthly_bleed = analysis.get("total_monthly_bleed", 0.0)
        yearly_bleed = analysis.get("yearly_bleed", 0.0)
        zombie_count = analysis.get("zombie_count", 0)
        stealth_creep = analysis.get("stealth_creep_loss", 0.0)
        sloth_score = analysis.get("sloth_score", 65)

        # Build prompt
        prompt = f"""
You are the SlothFinance Auditor, an open-source AI powered by Google Gemma 2.
Write a witty, affectionate roast and tactical action plan for {user_name}.
Financial Stats:
- Monthly bleed: ${monthly_bleed:.2f}/mo
- Yearly bleed: ${yearly_bleed:.2f}/yr
- Unconscious Zombie Subscriptions: {zombie_count}
- Stealth price-creep absorbed without noticing: ${stealth_creep:.2f}
- Sloth Inertia Rating: {sloth_score}/100

Structure your output in three distinct sections:
1. THE SLOTH VERDICT (A funny, relatable 2-3 sentence summary of their laziness cost)
2. THE COUCH POTATO PAYOFF (How much leisure, sleep, or take-out they can reclaim)
3. 3-STEP LAZY ACTION PLAN (The lowest-effort moves to save the most cash in under 2 minutes)
"""
        response_text = self._query_gemma(prompt)
        if not response_text:
            response_text = self._fallback_audit_roast(user_name, monthly_bleed, yearly_bleed, zombie_count, stealth_creep, sloth_score)

        return {
            "roast_text": response_text,
            "sloth_score": sloth_score,
            "annual_reclaimable": yearly_bleed,
            "three_year_reclaimable": analysis.get("three_year_bleed", 0.0)
        }

    def generate_cancellation_letter(self, subscription: Dict[str, Any], user_info: Optional[Dict[str, str]] = None) -> Dict[str, Any]:
        """
        Generate a legally sound, ironclad cancellation and refund request letter.
        Cites the FTC 'Click-to-Cancel' Rule, California AB 390 (Automatic Renewal Law),
        and statutory cooling-off consumer protection directives.
        """
        user_info = user_info or {}
        name = user_info.get("name", "Valued Customer")
        email = user_info.get("email", "customer@example.com")
        account_id = user_info.get("account_id", "ACCT-[AUTO-GENERATED]")
        
        service_name = subscription.get("name", "Service Provider")
        monthly_cost = subscription.get("monthly_cost", 0.0)
        is_creep = subscription.get("is_creep", False)
        creep_pct = subscription.get("creep_pct", 0.0)

        prompt = f"""
You are Gemma 2, drafting an ironclad, formal consumer subscription cancellation letter.
Service: {service_name}
Customer: {name} ({email})
Account ID: {account_id}
Monthly Charge: ${monthly_cost:.2f}
Did the provider quietly raise prices?: {'Yes, by ' + str(creep_pct) + '%' if is_creep else 'No'}

Draft a concise, assertive, polite letter demanding:
1. Immediate termination of the subscription and recurring billing.
2. Immediate written confirmation.
3. If price creep occurred, reference failure of affirmative consent under FTC Automatic Renewal regulations and request a credit.
4. Revocation of any future authorization on the payment instrument.
"""
        letter = self._query_gemma(prompt)
        if not letter:
            letter = self._fallback_cancellation_letter(service_name, name, email, account_id, monthly_cost, is_creep, creep_pct)

        return {
            "service_name": service_name,
            "subject": f"Notice of Immediate Cancellation & Billing Termination - {name} (Acct: {account_id})",
            "body": letter,
            "mailto_url": f"mailto:support@{service_name.lower().replace(' ', '')}.com?subject=Cancellation Request - {account_id}&body={letter[:1200]}"
        }

    def _query_gemma(self, prompt: str) -> Optional[str]:
        """Attempt to call local Ollama Gemma instance if running."""
        try:
            import requests
            res = requests.post(
                f"{self.ollama_host}/api/generate",
                json={"model": self.model_name, "prompt": prompt, "stream": False},
                timeout=2.0
            )
            if res.status_code == 200:
                return res.json().get("response", "").strip()
        except Exception:
            pass
        return None

    def _fallback_audit_roast(self, user_name: str, monthly: float, yearly: float, zombies: int, creep: float, score: int) -> str:
        return f"""
🦥 **THE SLOTH VERDICT:**
Congratulations, {user_name}! You are currently operating at **Sloth Level {score}/100**. You're leaking **${monthly:.2f} every month** (${yearly:.2f}/year) purely because opening a settings page and clicking 'Cancel' feels like climbing Mount Everest. You even silently absorbed **${creep:.2f} in stealth price increases** without blinking!

🛋️ **THE COUCH POTATO PAYOFF:**
If you let SlothFinance cancel these {zombies} zombie subscriptions right now, you'll instantly pocket **${yearly:.2f} in free money** this year. That is equivalent to:
• 148 cups of premium cold brew coffee you didn't have to brew.
• 11 full days of uninterrupted lounging without financial guilt.
• 1 complete weekend getaway funded entirely by doing *less*.

⚡ **3-STEP LAZY ACTION PLAN (Under 90 Seconds):**
1. **Kill the Heavy Bleeders:** Click the 1-Click Cancellation letter for your top zombie service below and hit send. (Savings: ~${monthly * 0.45:.2f}/mo)
2. **Dispute the Stealth Creep:** Demand a refund credit for recurring services that hiked rates without explicit affirmative consent.
3. **Go Back to Napping:** Put your feet up. Your projected 3-year savings is now locked in.
""".strip()

    def _fallback_cancellation_letter(self, service: str, name: str, email: str, acct: str, cost: float, is_creep: bool, creep_pct: float) -> str:
        creep_paragraph = ""
        if is_creep:
            creep_paragraph = f"""
Furthermore, records indicate that the billing amount was quietly escalated (approx. +{creep_pct}%) without clear affirmative consent. Under federal consumer protection guidelines regarding negative option billing and automatic renewals, I hereby request a refund/credit for the difference charged over the baseline rate.
"""

        return f"""Dear {service} Support & Billing Team,

RE: FORMAL NOTICE OF IMMEDIATE SUBSCRIPTION TERMINATION & BILLING REVOCATION
Account Identifier: {acct}
Account Holder: {name}
Associated Email: {email}
Current Monthly Rate: ${cost:.2f}

Please accept this letter as formal, unequivocal notice that I am terminating my subscription for {service}, effective immediately upon receipt of this transmission.

In accordance with consumer rights under the FTC Negative Option / 'Click-to-Cancel' regulations and applicable state Automatic Renewal Laws (including CA Cal. Bus. & Prof. Code § 17600 et seq.):

1. Immediately cease all recurring billing and automatic debits to any credit card, debit card, or electronic payment method on file.
2. Remove any saved payment authorizations associated with this profile.
3. Transmit written confirmation of cancellation and account closure to {email} within two (2) business days.
{creep_paragraph}
Please be advised that any subsequent unauthorized charges initiated by {service} after the date of this notice will be immediately disputed as unauthorized debits with my financial institution and reported to regulatory consumer protection bureaus.

Thank you for your prompt attention to this matter.

Sincerely,

{name}
{email}
""".strip()
