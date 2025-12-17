const NEWS_API_KEY = "ca3c5296de9e4688b4f735ef841c2174";

const newsApiBaseUrl = import.meta.env.PROD
  ? "https://nomoreparties.co/news/v2/everything"
  : "https://newsapi.org/v2/everything";

const getDateFrom = () => {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date.toISOString().split("T")[0];
};

const getDateTo = () => {
  return new Date().toISOString().split("T")[0];
};

export const searchNews = async (query) => {
  const params = new URLSearchParams({
    q: query,
    apiKey: NEWS_API_KEY,
    from: getDateFrom(),
    to: getDateTo(),
    pageSize: "100",
  });

  const response = await fetch(`${newsApiBaseUrl}?${params}`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      error.message ||
        "Sorry, something went wrong during the request. Please try again later."
    );
  }

  const data = await response.json();

  if (data.status === "error") {
    throw new Error(data.message || "Failed to fetch news");
  }

  const validArticles = data.articles.filter(
    (article) =>
      article.title !== "[Removed]" && article.description !== "[Removed]"
  );

  return validArticles.map((article) => ({
    ...article,
    keyword: query,
  }));
};

let simulatedUsers = [
  {
    _id: "1",
    email: "test@test.com",
    password: "password123",
    name: "Test User",
  },
];

let simulatedSavedArticles = [
  {
    _id: "65f7368dfb74bd6a92114c85",
    keyword: "Nature",
    title:
      "Scientists Discover New high-energy high-energy high-energy high-energy",
    description:
      "A groundbreaking study reveals high-energy high-energy high-energy high-energy high-energy high-energy high-energy high-energy high-energy high-energy high-energy high-energy high-energy high-energy.",
    publishedAt: "2024-11-15T10:30:00Z",
    source: { name: "Nature Journal" },
    url: "https://www.nature.com/articles/example1",
    urlToImage:
      "https://images.unsplash.com/photo-1518173946687-a4c036bc6c9f?w=400",
    owner: "1",
  },
  {
    _id: "65f7371e7bce9e7d331b11a0",
    keyword: "Technology",
    title: "AI Revolution: How Machine Learning is Transforming Industries",
    description:
      "From healthcare to finance, artificial intelligence is reshaping how businesses operate and make decisions in the modern world.",
    publishedAt: "2024-11-14T14:45:00Z",
    source: { name: "Tech Insider" },
    url: "https://www.techinsider.com/ai-revolution",
    urlToImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400",
    owner: "1",
  },
  {
    _id: "65f737a8c2e4f8b5a9d12345",
    keyword: "Space",
    title: "NASA Announces New Mission to Explore Europa's Ocean",
    description:
      "The space agency reveals plans for an ambitious mission to Jupiter's moon Europa, which scientists believe may harbor conditions suitable for life.",
    publishedAt: "2024-11-13T09:00:00Z",
    source: { name: "Space News" },
    url: "https://www.spacenews.com/europa-mission",
    urlToImage:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400",
    owner: "1",
  },
  {
    _id: "65f738b9d3f5a9c6b0e23456",
    keyword: "Climate",
    title: "Global Leaders Agree on Historic Climate Action Plan",
    description:
      "World leaders have reached a landmark agreement to reduce carbon emissions by 50% by 2030, marking a significant step in the fight against climate change.",
    publishedAt: "2024-11-12T16:20:00Z",
    source: { name: "Environmental Times" },
    url: "https://www.envtimes.com/climate-agreement",
    urlToImage:
      "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=400",
    owner: "1",
  },
  {
    _id: "65f739cae4f6b0d7c1f34567",
    keyword: "Health",
    title: "Breakthrough in Cancer Research Offers New Hope for Patients",
    description:
      "Researchers have developed a new treatment approach that shows promising results in clinical trials, potentially revolutionizing cancer therapy.",
    publishedAt: "2024-11-11T11:15:00Z",
    source: { name: "Medical Today" },
    url: "https://www.medicaltoday.com/cancer-breakthrough",
    urlToImage:
      "https://images.unsplash.com/photo-1576671081837-49000212a370?w=400",
    owner: "1",
  },
];

let simulatedTokens = {};

const generateToken = (userId) => {
  const token = `simulated_token_${userId}_${Date.now()}`;
  simulatedTokens[token] = userId;
  return token;
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const register = async (email, password, name) => {
  await delay(500);

  const existingUser = simulatedUsers.find((u) => u.email === email);
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const newUser = {
    _id: String(simulatedUsers.length + 1),
    email,
    password,
    name,
  };
  simulatedUsers.push(newUser);

  return { message: "Registration successful" };
};

export const login = async (email, password) => {
  await delay(500);

  const user = simulatedUsers.find(
    (u) => u.email === email && u.password === password
  );
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user._id);

  localStorage.setItem("jwt", token);

  return { token };
};

export const checkToken = async (token) => {
  await delay(300);

  const userId = simulatedTokens[token];
  if (!userId) {
    const match = token.match(/simulated_token_(\d+)_/);
    if (match) {
      const user = simulatedUsers.find((u) => u._id === match[1]);
      if (user) {
        simulatedTokens[token] = user._id;
        return { _id: user._id, email: user.email, name: user.name };
      }
    }
    throw new Error("Invalid token");
  }

  const user = simulatedUsers.find((u) => u._id === userId);
  if (!user) {
    throw new Error("User not found");
  }

  return { _id: user._id, email: user.email, name: user.name };
};

const getUserIdFromToken = (token) => {
  let userId = simulatedTokens[token];
  if (!userId) {
    const match = token.match(/simulated_token_(\d+)_/);
    if (match) {
      userId = match[1];
      simulatedTokens[token] = userId;
    }
  }
  return userId;
};

export const getSavedArticles = async (token) => {
  await delay(300);

  const userId = getUserIdFromToken(token);
  if (!userId) {
    throw new Error("Unauthorized");
  }

  return simulatedSavedArticles.filter((article) => article.owner === userId);
};

export const saveArticle = async (article, token) => {
  await delay(300);

  const userId = getUserIdFromToken(token);
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const savedArticle = {
    ...article,
    _id: `article_${Date.now()}`,
    owner: userId,
  };

  simulatedSavedArticles.push(savedArticle);

  return savedArticle;
};

export const deleteArticle = async (articleId, token) => {
  await delay(300);

  const userId = getUserIdFromToken(token);
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const articleIndex = simulatedSavedArticles.findIndex(
    (a) => a._id === articleId && a.owner === userId
  );

  if (articleIndex === -1) {
    throw new Error("Article not found");
  }

  const deletedArticle = simulatedSavedArticles.splice(articleIndex, 1)[0];

  return deletedArticle;
};

export const logout = () => {
  localStorage.removeItem("jwt");
};
