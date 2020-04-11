export const state = {
  theme: {
    color: "#fff",
  },
  navs: [
    { text: "introduction", name: "intro", value: 0 },
    { text: "the technology", name: "tech", value: 100 },
    { text: "tech spotlight", name: "spotlight", value: 0 },
    { text: "why muggle?", name: "muggle", value: 100 },
  ],

  intro: {
    sources: [
      // {
      //   src: "http://www.feedmusic.com/videos/intro.mp4",
      //   type: "video/mp4"
      // },
      {
        src: "https://vjs.zencdn.net/v/oceans.mp4",
        type: "video/mp4",
      },
    ],
    paragraphs: [
      "石纪元发行于2007年",
      "由小林裕介、古川慎、市之濑加那、中村悠一等演员参与主演",
      "全人类因谜般的现象而在一瞬间石化",
      "之后过了数千年——",
      "21世纪某年",
      "地球被突如其来的“石化”现象袭击",
      "所有的人类和燕子都变成了“石像”",
      "文明毁灭",
      "3700年之后",
      "曾经的科学狂人中学生石神千空和体力超强中学生大木大树",
      "相继从石化状态中恢复",
      "并且找到了让人类解除“石化”的方法",
      "石神千空决定用科学的力量",
      "拯救全人类",
      "以及重建人类文明",
      "故事伊始",
      "就把主角们面临的短期困境和中期困境和长期困境列的明明白白",
      "很有让人看下去的动力",
      "开篇阶段",
      "故事的气氛是非常写实的",
      "千空用半年时间才勉强搭了一个草房",
      "大树恢复后",
      "两人用将近一年的时间",
      "才做好了高度酒蒸馏装置并且配置好了“解除石化”的溶液",
    ],
  },
  tech: {},
  spotlight: {
    size: 178,
    start: 16,
    breakpoints: [
      // { start: 0, end: 5, backgroundColor: "#5DC396", text: "" },
      // { start: 6, end: 10, backgroundColor: "#7C96D0", text: "" },
      // { start: 11, end: 15, backgroundColor: "#4C37DD", text: "" },
      {
        start: 16,
        end: 37,
        backgroundColor: "#F63902",
        text:
          "Data is recorded in provenance: meaning your personal data asset is permanent, immutable, and continuously growing in size and value. Automate the discovery and exploration of causal and correlative relationships that structure your personal provenance graph. Control what others can see and what they can’t. Your provenance graph is a rich, living asset that will be forever treasured and alive for you and your heirs.",
      },
      {
        start: 38,
        end: 61,
        backgroundColor: "#FBEA01",
        text:
          "Feed’s intelligent agents are cognitively aware of the changes in state of people, places, events, objects, and states of affairs.",
      },
      {
        start: 62,
        end: 94,
        backgroundColor: "#52E5E6",
        text:
          "When you can see the origin of data, and you have real-time access to changes in the state of that data, you have the most powerful marketing effectiveness measurement on the planet.",
      },
      {
        start: 95,
        end: 121,
        backgroundColor: "#7444b6",
        text:
          "Which means real-time and real-state insight, which means higher ROI through verifiably improved economic effectiveness of online advertising and consumer services.",
      },
      {
        start: 122,
        end: 149,
        backgroundColor: "#3A6CF1",
        text:
          "Continuous, automatic, and progressively-perfecting discovery: the most powerful tool for discovering that next gig, relationship, customer, & opportunity.",
      },
      {
        start: 150,
        end: 179,
        backgroundColor: "#F63902",
        text:
          "Trust. Ownership. Discovery. With Feed, everything that is yours, is now actually yours.",
      },
    ],
  },
  about: {},
  more: {
    links: [
      { path: "/more", title: "其他" },
      { path: "/meeting", title: "留言" },
    ],
  },
};

export const actions = {};
