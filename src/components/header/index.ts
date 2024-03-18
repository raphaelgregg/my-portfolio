// export function Header(element: HTMLElement) {
//   element.innerHTML = ``;
// }


// Hide and show header
let prevScrollPosition = window.scrollY;
window.onscroll = function() {
  let currentScrollPosition = window.scrollY;
    if (prevScrollPosition > currentScrollPosition) {
      //@ts-ignore
      document.getElementById("hide-header").style.top = "0";
    } else {
      //@ts-ignore
      document.getElementById("hide-header").style.top = "-66px"; // VALUE SIZE OF HEADER
    }
    prevScrollPosition = currentScrollPosition;
}


// export function Header(element: HTMLElement) {
//   let counter = 0
//   const setCounter = (count: number) => {
//     counter = count
//     element.innerHTML = `count is ${counter}`
//   }
//   element.addEventListener('click', () => setCounter(counter + 1))
//   setCounter(0)
// }
