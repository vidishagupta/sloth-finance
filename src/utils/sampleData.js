// Preloaded bank statement transaction datasets for 1-click testing

export const SAMPLE_DATASETS = {
  forgetful_dev: {
    id: "forgetful_dev",
    name: "The Forgetful Developer",
    subtitle: "AWS bills, 3 AI copilots, creeping Netflix, and an untouched gym pass.",
    transactions: [
      { date: "2026-07-02", description: "Netflix Premium 4K", amount: 15.49, category: "Entertainment" },
      { date: "2026-07-04", description: "Blue Bottle Coffee", amount: 7.20, category: "Food & Drink" },
      { date: "2026-07-08", description: "Amazon Web Services (us-east-1)", amount: 44.10, category: "Cloud & Hosting" },
      { date: "2026-07-10", description: "Planet Fitness Black Card", amount: 24.99, category: "Fitness" },
      { date: "2026-07-14", description: "Uber Eats Sushi", amount: 32.50, category: "Food & Drink" },
      { date: "2026-07-17", description: "Spotify Duo", amount: 14.99, category: "Entertainment" },
      { date: "2026-07-20", description: "OpenAI ChatGPT Plus", amount: 20.00, category: "AI & Tools" },
      { date: "2026-07-22", description: "GitHub Copilot Individual", amount: 10.00, category: "Developer Tools" },
      { date: "2026-07-25", description: "Adobe Creative Cloud All Apps", amount: 54.99, category: "Creative Software" },
      { date: "2026-07-28", description: "The New York Times Digital (Promo)", amount: 4.00, category: "News" },
      { date: "2026-07-30", description: "Vercel Pro Team", amount: 20.00, category: "Developer Tools" },
      // Month 2
      { date: "2026-08-02", description: "Netflix Premium 4K", amount: 17.99, category: "Entertainment" }, // Price creep!
      { date: "2026-08-08", description: "Amazon Web Services (us-east-1)", amount: 52.80, category: "Cloud & Hosting" },
      { date: "2026-08-10", description: "Planet Fitness Black Card", amount: 24.99, category: "Fitness" },
      { date: "2026-08-15", description: "Grammarly Premium (Auto-renew)", amount: 30.00, category: "Productivity" },
      { date: "2026-08-17", description: "Spotify Duo", amount: 16.99, category: "Entertainment" }, // Price creep!
      { date: "2026-08-20", description: "OpenAI ChatGPT Plus", amount: 20.00, category: "AI & Tools" },
      { date: "2026-08-22", description: "GitHub Copilot Individual", amount: 10.00, category: "Developer Tools" },
      { date: "2026-08-25", description: "Adobe Creative Cloud All Apps", amount: 54.99, category: "Creative Software" },
      { date: "2026-08-28", description: "The New York Times Digital (Promo Expired)", amount: 17.00, category: "News" }, // Huge jump!
      { date: "2026-08-30", description: "Vercel Pro Team", amount: 20.00, category: "Developer Tools" },
      // Month 3
      { date: "2026-09-02", description: "Netflix Premium 4K", amount: 17.99, category: "Entertainment" },
      { date: "2026-09-08", description: "Amazon Web Services (us-east-1)", amount: 61.40, category: "Cloud & Hosting" },
      { date: "2026-09-10", description: "Planet Fitness Black Card", amount: 24.99, category: "Fitness" },
      { date: "2026-09-15", description: "Substack Mystery Tech Newsletter", amount: 15.00, category: "News" },
      { date: "2026-09-17", description: "Spotify Duo", amount: 16.99, category: "Entertainment" },
      { date: "2026-09-20", description: "OpenAI ChatGPT Plus", amount: 20.00, category: "AI & Tools" },
      { date: "2026-09-22", description: "GitHub Copilot Individual", amount: 10.00, category: "Developer Tools" },
      { date: "2026-09-25", description: "Adobe Creative Cloud All Apps", amount: 54.99, category: "Creative Software" },
      { date: "2026-09-28", description: "The New York Times Digital", amount: 17.00, category: "News" },
      { date: "2026-09-30", description: "Vercel Pro Team", amount: 20.00, category: "Developer Tools" },
      // Month 4
      { date: "2026-10-02", description: "Netflix Premium 4K", amount: 17.99, category: "Entertainment" },
      { date: "2026-10-08", description: "Amazon Web Services (us-east-1)", amount: 68.90, category: "Cloud & Hosting" },
      { date: "2026-10-10", description: "Planet Fitness Black Card", amount: 24.99, category: "Fitness" },
      { date: "2026-10-14", description: "Duolingo Super Monthly", amount: 12.99, category: "Education" },
      { date: "2026-10-17", description: "Spotify Duo", amount: 16.99, category: "Entertainment" },
      { date: "2026-10-20", description: "OpenAI ChatGPT Plus", amount: 20.00, category: "AI & Tools" },
      { date: "2026-10-22", description: "GitHub Copilot Individual", amount: 10.00, category: "Developer Tools" },
      { date: "2026-10-25", description: "Adobe Creative Cloud All Apps", amount: 54.99, category: "Creative Software" },
      { date: "2026-10-28", description: "The New York Times Digital", amount: 17.00, category: "News" },
      { date: "2026-10-30", description: "Vercel Pro Team", amount: 20.00, category: "Developer Tools" }
    ]
  },
  college_chaos: {
    id: "college_chaos",
    name: "College Student Chaos",
    subtitle: "Expired free trials that started quietly deducting $15-30/month.",
    transactions: [
      { date: "2026-08-01", description: "Chegg Study Pack", amount: 19.95, category: "Education" },
      { date: "2026-08-03", description: "Spotify Student + Hulu", amount: 5.99, category: "Entertainment" },
      { date: "2026-08-05", description: "DoorDash DashPass", amount: 9.99, category: "Food" },
      { date: "2026-08-10", description: "Amazon Prime Student", amount: 7.49, category: "Shopping" },
      { date: "2026-08-15", description: "Duolingo Super", amount: 12.99, category: "Education" },
      { date: "2026-08-20", description: "Tinder Gold Subscription", amount: 29.99, category: "Dating" },
      { date: "2026-08-25", description: "Quizlet Plus", amount: 7.99, category: "Education" },
      { date: "2026-09-01", description: "Chegg Study Pack", amount: 19.95, category: "Education" },
      { date: "2026-09-03", description: "Spotify Student + Hulu", amount: 5.99, category: "Entertainment" },
      { date: "2026-09-05", description: "DoorDash DashPass", amount: 9.99, category: "Food" },
      { date: "2026-09-10", description: "Amazon Prime Student", amount: 7.49, category: "Shopping" },
      { date: "2026-09-15", description: "Duolingo Super", amount: 12.99, category: "Education" },
      { date: "2026-09-20", description: "Tinder Gold Subscription", amount: 39.99, category: "Dating" }, // Price creep!
      { date: "2026-09-25", description: "Quizlet Plus", amount: 7.99, category: "Education" },
      { date: "2026-10-01", description: "Chegg Study Pack", amount: 19.95, category: "Education" },
      { date: "2026-10-03", description: "Spotify Student + Hulu", amount: 5.99, category: "Entertainment" },
      { date: "2026-10-05", description: "DoorDash DashPass", amount: 9.99, category: "Food" },
      { date: "2026-10-10", description: "Amazon Prime Student", amount: 7.49, category: "Shopping" },
      { date: "2026-10-15", description: "Duolingo Super", amount: 12.99, category: "Education" },
      { date: "2026-10-20", description: "Tinder Gold Subscription", amount: 39.99, category: "Dating" },
      { date: "2026-10-25", description: "Quizlet Plus", amount: 7.99, category: "Education" }
    ]
  },
  saas_dump: {
    id: "saas_dump",
    name: "Zombie SaaS Overload",
    subtitle: "Ghost seats, unused collaboration tools, and duplicate cloud workspaces.",
    transactions: [
      { date: "2026-08-01", description: "Figma Professional Seat", amount: 15.00, category: "Design" },
      { date: "2026-08-04", description: "Notion Plus Annual", amount: 10.00, category: "Productivity" },
      { date: "2026-08-07", description: "Loom Business Video", amount: 12.50, category: "Video" },
      { date: "2026-08-11", description: "Slack Standard Plan", amount: 8.75, category: "Communication" },
      { date: "2026-08-15", description: "Linear Standard Workspace", amount: 10.00, category: "Project Management" },
      { date: "2026-08-18", description: "Midjourney Standard Plan", amount: 30.00, category: "AI & Graphics" },
      { date: "2026-08-22", description: "DigitalOcean Droplet Compute", amount: 24.00, category: "Cloud" },
      { date: "2026-09-01", description: "Figma Professional Seat", amount: 15.00, category: "Design" },
      { date: "2026-09-04", description: "Notion Plus Annual", amount: 10.00, category: "Productivity" },
      { date: "2026-09-07", description: "Loom Business Video", amount: 15.00, category: "Video" }, // Creep
      { date: "2026-09-11", description: "Slack Standard Plan", amount: 8.75, category: "Communication" },
      { date: "2026-09-15", description: "Linear Standard Workspace", amount: 10.00, category: "Project Management" },
      { date: "2026-09-18", description: "Midjourney Standard Plan", amount: 30.00, category: "AI & Graphics" },
      { date: "2026-09-22", description: "DigitalOcean Droplet Compute", amount: 36.00, category: "Cloud" }, // Creep
      { date: "2026-10-01", description: "Figma Professional Seat", amount: 15.00, category: "Design" },
      { date: "2026-10-04", description: "Notion Plus Annual", amount: 10.00, category: "Productivity" },
      { date: "2026-10-07", description: "Loom Business Video", amount: 15.00, category: "Video" },
      { date: "2026-10-11", description: "Slack Standard Plan", amount: 8.75, category: "Communication" },
      { date: "2026-10-15", description: "Linear Standard Workspace", amount: 10.00, category: "Project Management" },
      { date: "2026-10-18", description: "Midjourney Standard Plan", amount: 30.00, category: "AI & Graphics" },
      { date: "2026-10-22", description: "DigitalOcean Droplet Compute", amount: 36.00, category: "Cloud" }
    ]
  }
};
