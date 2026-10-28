export type IconName = "github" | "blog" | "instagram" | "x" | "mail" | "linkedin";

export type LinkItem = {
  id: string;
  title: string;
  desc: string;
  url: string;
  icon: IconName;
};

export type LinkWithClicks = LinkItem & { clicks: number };

// Profile + link metadata. In this prototype these are hardcoded;
// clicks are the only thing persisted in MongoDB.
export const PROFILE = {
  name: "김클로",
  bio: "세계 최강 바이브코더",
};

export const LINKS: LinkItem[] = [
  {
    id: "github",
    title: "GitHub",
    desc: "프로젝트와 코드를 구경해보세요",
    url: "https://github.com",
    icon: "github",
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    desc: "커리어와 경력을 확인해보세요",
    url: "https://linkedin.com",
    icon: "linkedin",
  },
  {
    id: "blog",
    title: "블로그",
    desc: "생각과 경험을 기록합니다",
    url: "https://medium.com",
    icon: "blog",
  },
];
