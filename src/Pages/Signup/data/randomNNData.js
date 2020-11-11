const randomNNAdj = [
  "귀여운",
  "멋쟁이",
  "신세대",
  "힙스터",
  "성실한",
  "독서왕",
];
const randomNNNoun = [
  "라이언",
  "코뿔소",
  "미어캣",
  "타이거",
  "거북이",
  "지브라",
];

export const randomNNData = {
  adj: randomNNAdj,
  noun: randomNNNoun,
  num: Math.floor(Math.random() * 1000),
  adjRandIdx: Math.floor(Math.random() * randomNNAdj.length),
  nounRandIdx: Math.floor(Math.random() * randomNNNoun.length),
};
