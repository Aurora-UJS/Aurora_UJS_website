/**
 * Central site metadata + navigation config.
 * (Replaces Jekyll `_config.yaml` site properties + the data-driven navbar.)
 */

export const site = {
  title: "Aurora 战队",
  shortTitle: "Aurora",
  description: "江苏大学 RoboMaster Aurora 战队 —— 矢志不退，勇者无畏。",
  slogan: "矢志不退，勇者无畏",
  org: "江苏大学人工智能与智能制造学院",
  school: "江苏大学",
  ogImage: "/images/share.jpg",
  links: {
    github: "https://github.com/Aurora-UJS",
    bilibili: "https://space.bilibili.com/690755074",
    wechat: "https://mp.weixin.qq.com/s/Zrk4PRRGSimJG9bVDj3Zsg",
    email: "3189928615@qq.com",
  },
  contact: {
    email: "3189928615@qq.com",
    wechat: "sxtc0523",
    address: "江苏省镇江市京口区学府路 301 号 江苏大学人工智能与智能制造学院 A407",
    map: "https://surl.amap.com/eAvkia7Q9Hw",
  },
} as const;

/** Primary navigation (order matters). Mirrors the old `nav.order`. */
export const nav: { label: string; href: string; tooltip: string }[] = [
  { label: "成果", href: "/research", tooltip: "多方面综合发展" },
  { label: "项目", href: "/projects", tooltip: "校企合作、科研项目" },
  { label: "成员", href: "/team", tooltip: "关于我们" },
  { label: "赛程", href: "/events", tooltip: "历史赛事战绩" },
  { label: "博客", href: "/blog", tooltip: "技术分享交流" },
  { label: "新闻", href: "/news", tooltip: "战队最新动态" },
  { label: "联系", href: "/contact", tooltip: "邮件、地址、加入我们" },
];
