let duration = 1000;
let mainBlock = document.querySelector("main");
let blocks = Array.from(mainBlock.children);
const startBtn = document.getElementById("startBtn");
const hide = document.querySelector(".hide");
let matched = 0;

startBtn.addEventListener("click", () => {
  let playerName = prompt("Enter your name:");
  if (playerName == null || playerName == "") {
    document.querySelector(".info span").innerHTML = "Unkown";
  } else {
    document.querySelector(".info span").innerHTML = playerName;
  }
  /* remove button and black screen */
  hide.remove();
  /* flip blocks for duration */
  blocks.forEach((block,index)=>{
    let orderRange = [...blocks.keys()].sort(() => 0.5 - Math.random());
    block.style.order = orderRange[index];
    block.classList.add("is-flipped");
  });
 setTimeout(()=>{
  blocks.forEach((block)=>{
    block.classList.remove("is-flipped");
  });
 },duration)

});

blocks.forEach((block) => {
  block.addEventListener("click", () => flipBlock(block));
});

function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");
  let fiippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  if (fiippedBlocks.length === 2) {
    /* stop clicking function */
    stopClicking();
    /* check if 2 blocks are a match */
    checkMatched(fiippedBlocks[0], fiippedBlocks[1]);
  }
}

function stopClicking() {
  mainBlock.style.pointerEvents = "none";
  /* enable clicking after the duration ends */
  setTimeout(() => {
    mainBlock.removeAttribute("style");
  }, duration);
}

function checkMatched(firstBlock, secondBlock) {
  let triesSpan = document.querySelector(".tries>span");
  if (firstBlock.dataset.tech === secondBlock.dataset.tech) {
    firstBlock.classList.remove("is-flipped");
    firstBlock.classList.add("has-match");
    secondBlock.classList.remove("is-flipped");
    secondBlock.classList.add("has-match");
    document.getElementById("correct").play();
    matched++;
    if (matched === blocks.length / 2) {
      document.querySelector("footer").innerHTML = "You won !!!";
      document.getElementById("win").play();
    }
  } else {
    triesSpan.innerHTML = parseInt(triesSpan.innerHTML) + 1;
    document.getElementById("wrong").play();
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
  }
}
