(()=>{"use strict";const e={gameOver:!1,gameRunning:!1,isJumping:!1,gameStop(){this.gameOver=!0,this.isJumping=!1,this.gameRunning=!1}},t=e=>{console.log("Process of change in the characteristics of a species over several generations?"),window.addEventListener("keydown",e)},n=(()=>{const e=document.querySelector(".dino");return{dino:e,run:()=>{e.classList.contains("dino-stationary")?(e.classList.remove("dino-stationary"),e.classList.add("dino-run-0")):e.classList.contains("dino-run-0")?(e.classList.remove("dino-run-0"),e.classList.add("dino-run-1")):(e.classList.remove("dino-run-1"),e.classList.add("dino-run-0"))},jump:t=>{if(t.isJumping)return;t.isJumping=!0;let n=0;const o=setInterval((()=>{if(10===n){clearInterval(o);const s=setInterval((()=>{2===n&&(clearInterval(s),t.isJumping=!1),n-=1,e.style.bottom=`${n}rem`,t.gameOver&&clearInterval(s)}),30)}n+=1,e.style.bottom=`${n}rem`,t.gameOver&&clearInterval(o)}),30)},stand:()=>{e.className="dino dino-stationary"},loose:()=>{e.className="dino dino-lose"},fly:()=>{e.style.top="10rem"}}})(),o=(()=>{const e=document.querySelector(".score"),t=()=>parseInt(e.textContent,10);return{incrementScore:()=>{t()>=999||(e.textContent=`${t()+1}`.padStart(3,"0"))},resetScore:()=>{e.textContent="0".padStart(3,"0")},checkWin:()=>t()>=999}})(),s=function(){const e=document.querySelector(".ground-wrapper");let t,s=0;return{move:()=>{t=setInterval((()=>{n.run(),e.style.left=-s+"%",s+=1,100===s&&(s=0),o.incrementScore()}),75)},stop:()=>clearInterval(t)}}(),r=function(){const e=document.querySelector(".start-game");return{add:()=>e.classList.remove("hidden"),remove:()=>e.classList.add("hidden")}}(),a=function(){const e=document.querySelector(".sand-box");return{addMessage:()=>{const t=document.createElement("div");t.className="win-msg",t.textContent="Congratulation you WON the game!",e.append(t)},removeMessage:()=>{const t=document.querySelector(".win-msg");t&&e.removeChild(t)}}}(),c=function(){const e=[],t=document.querySelector(".sand-box");let c;const l=()=>{e.forEach((e=>clearInterval(e))),e.splice(0,e.length)},i=e=>{clearTimeout(c),l(),document.querySelectorAll(".cactus").forEach((e=>{const t=e.style.left;e.style.left=t})),e.gameStop(),n.loose(),s.stop(),r.add()},d=s=>{if(s.gameOver)return;let r=99;const l=document.createElement("div");l.className="cactus",l.style.left=`${r}%`,t.append(l);const u=setInterval((()=>{e.push(u),r-=1,l.style.left=`${r}%`;const c=n.dino.getBoundingClientRect(),d=l.getBoundingClientRect();var m,g;1===r&&(clearInterval(u),t.removeChild(l)),g=d,(m=c).top-10>g.bottom||m.right-10<g.left||m.bottom-10<g.top||m.left-10>g.right||i(s),o.checkWin()&&(i(s),a.addMessage(),n.stand())}),15);s.gameOver||(c=setTimeout((()=>d(s)),3500*Math.random()+250))};return{addCactus:d,removeAll:()=>{l(),document.querySelectorAll(".cactus").forEach((e=>t.removeChild(e)))}}}(),l=function(){const e="evolution",t=[];return{addValue:o=>{t.push(o),t.splice(-e.length-1,t.length-e.length),e===t.join("")&&n.fly()}}}();t((function(t){l.addValue(t.key),e.gameRunning||(e.gameRunning=!0,a.removeMessage(),o.resetScore(),e.gameOver=!1,c.removeAll(),r.remove(),n.stand(),s.move(),c.addCactus(e))," "===t.key&&n.jump(e)}))})();