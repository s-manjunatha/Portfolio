export interface GitHubProfile {
  name: string;
  login: string;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
  bio: string;
  html_url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
}

export interface ContributionDay {
  color: string;
  contributionCount: number;
  date: string;
  weekday: number;
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: {
    contributionDays: ContributionDay[];
  }[];
}

// Mock data generator for fallback when token is missing
function getMockProfile(username: string): GitHubProfile {
  return {
    name: "S Manjunatha",
    login: username,
    avatar_url: "https://avatars.githubusercontent.com/u/104332822?v=4",
    followers: 18,
    following: 24,
    public_repos: 4,
    bio: "Aspiring Software Developer | Information Science student at REVA University | DSA & Web Dev Learner",
    html_url: `https://github.com/s-manjunatha`,
  };
}

function getMockRepos(): GitHubRepo[] {
  return [
    {
      id: 1,
      name: "stock-market-prediction",
      description: "Stock Market Price Prediction using Python, NumPy, and Pandas. Implements data preprocessing, visualization, and predictive modeling.",
      html_url: "https://github.com/s-manjunatha/stock-market-prediction",
      stargazers_count: 5,
      forks_count: 2,
      language: "Python",
      topics: ["python", "data-science", "numpy", "pandas", "predictive-modeling"],
      updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 2,
      name: "data-structures-algorithms-java",
      description: "Solutions and implementations of core Data Structures and Algorithms in Java. Currently learning and solving exercises.",
      html_url: "https://github.com/s-manjunatha/data-structures-algorithms-java",
      stargazers_count: 2,
      forks_count: 0,
      language: "Java",
      topics: ["java", "dsa", "algorithms", "data-structures", "learning"],
      updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 3,
      name: "web-development-learning",
      description: "My learning journey in Web Development. Includes HTML, CSS, JavaScript files, mini projects, and exercises.",
      html_url: "https://github.com/s-manjunatha/web-development-learning",
      stargazers_count: 1,
      forks_count: 1,
      language: "JavaScript",
      topics: ["html", "css", "javascript", "web-development", "learning-journey"],
      updated_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 4,
      name: "s-manjunatha",
      description: "Config files and custom profiles for GitHub.",
      html_url: "https://github.com/s-manjunatha/s-manjunatha",
      stargazers_count: 0,
      forks_count: 0,
      language: "Markdown",
      topics: ["github-profile", "markdown"],
      updated_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
}

function getMockContributions(): ContributionCalendar {
  const weeks = [];
  let totalContributions = 0;
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  
  // Create 53 weeks
  for (let w = 0; w < 53; w++) {
    const contributionDays: ContributionDay[] = [];
    // 7 days per week
    for (let d = 0; d < 7; d++) {
      const currentDate = new Date(startDate.getTime());
      currentDate.setDate(startDate.getDate() + (w * 7 + d));
      
      // Generate pseudo-random count biased towards lower numbers (0 or 1)
      const rand = Math.random();
      let count = 0;
      let color = "contrib-empty"; // matches style in globals.css
      
      if (rand > 0.8) {
        count = Math.floor(Math.random() * 3) + 1;
        totalContributions += count;
        if (count === 1) color = "contrib-l1";
        else if (count === 2) color = "contrib-l2";
        else if (count === 3) color = "contrib-l3";
        else color = "contrib-l4";
      }
      
      contributionDays.push({
        color,
        contributionCount: count,
        date: currentDate.toISOString().split("T")[0],
        weekday: d,
      });
    }
    weeks.push({ contributionDays });
  }

  return {
    totalContributions,
    weeks,
  };
}

export async function fetchGitHubData(username: string) {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.warn("GITHUB_TOKEN not configured. Returning fallback mock data.");
    return {
      profile: getMockProfile(username),
      repos: getMockRepos(),
      contributions: getMockContributions(),
    };
  }

  try {
    // 1. Fetch Profile Info
    const profileRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${token}`,
        "User-Agent": "nextjs-portfolio-app",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!profileRes.ok) {
      throw new Error(`Profile fetch failed: ${profileRes.statusText}`);
    }

    const profile: GitHubProfile = await profileRes.json();

    // 2. Fetch Repositories
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Authorization: `token ${token}`,
          "User-Agent": "nextjs-portfolio-app",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!reposRes.ok) {
      throw new Error(`Repos fetch failed: ${reposRes.statusText}`);
    }

    const allRepos: any[] = await reposRes.json();
    const repos: GitHubRepo[] = allRepos
      .filter((repo) => !repo.fork) // Display only original public repos, as requested
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        language: repo.language,
        topics: repo.topics || [],
        updated_at: repo.updated_at,
      }));

    // 3. Fetch Contributions via GraphQL
    const graphqlQuery = {
      query: `
        query($username: String!) {
          user(login: $username) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    color
                    contributionCount
                    date
                    weekday
                  }
                }
              }
            }
          }
        }
      `,
      variables: { username },
    };

    const contribRes = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "nextjs-portfolio-app",
      },
      body: JSON.stringify(graphqlQuery),
      next: { revalidate: 3600 },
    });

    let contributions: ContributionCalendar = getMockContributions();

    if (contribRes.ok) {
      const result = await contribRes.json();
      const calendar = result?.data?.user?.contributionsCollection?.contributionCalendar;
      if (calendar) {
        contributions = {
          totalContributions: calendar.totalContributions,
          weeks: calendar.weeks.map((week: any) => ({
            contributionDays: week.contributionDays.map((day: any) => {
              // Map Github GraphQL colors to custom classes
              let customColor = "contrib-empty";
              if (day.contributionCount > 0) {
                if (day.contributionCount === 1) customColor = "contrib-l1";
                else if (day.contributionCount === 2) customColor = "contrib-l2";
                else if (day.contributionCount === 3) customColor = "contrib-l3";
                else customColor = "contrib-l4";
              }
              return {
                color: customColor,
                contributionCount: day.contributionCount,
                date: day.date,
                weekday: day.weekday,
              };
            }),
          })),
        };
      }
    } else {
      console.warn("GraphQL contributions query failed, using generated contribution map.");
    }

    return {
      profile,
      repos,
      contributions,
    };
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    // Graceful fallback
    return {
      profile: getMockProfile(username),
      repos: getMockRepos(),
      contributions: getMockContributions(),
    };
  }
}
