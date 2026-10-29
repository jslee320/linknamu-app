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
  name: "이지수",
  bio: "바이브코딩, 클로드코드 학습자",
  imageUrl: "/images/jisu-hiking.png",
};

export const LINKS: LinkItem[] = [
  {
    id: "github",
    title: "GitHub",
    desc: "프로젝트와 코드를 구경해보세요",
    url: "https://github.com/jslee320",
    icon: "github",
  },
  {
    id: "instagram",
    title: "인스타그램",
    desc: "일상과 소식을 공유합니다",
    url: "https://instagram.com/js128415",
    icon: "instagram",
  },
  {
    id: "email",
    title: "이메일",
    desc: "편하게 연락 주세요",
    url: "mailto:jslee320@naver.com",
    icon: "mail",
  },
];
