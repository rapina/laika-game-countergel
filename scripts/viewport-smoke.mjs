import { chromium } from 'playwright-core'
import { spawn } from 'node:child_process'
import { setTimeout as wait } from 'node:timers/promises'
import { mkdirSync } from 'node:fs'
const p=spawn('npm',['run','dev','--','--host','127.0.0.1','--port','4174'],{detached:true,stdio:'ignore'})
try {
 for(let i=0;i<60;i++){try{if((await fetch('http://127.0.0.1:4174')).ok)break}catch{}await wait(250)}
 const b=await chromium.launch({channel:'chrome',headless:true});mkdirSync('screenshots',{recursive:true})
 for(const [w,h] of [[360,800],[390,844],[430,932],[900,760]]){
  const page=await b.newPage({viewport:{width:w,height:h}});await page.goto('http://127.0.0.1:4174');await page.waitForSelector('.title-key');await page.screenshot({path:`screenshots/title-${w}x${h}.png`})
  const box=await page.locator('.mobile-frame-inner').boundingBox();if(!box||box.width>w+1||box.height>h+1)throw Error(`overflow ${w}x${h}`);await page.close()
 }
 const page=await b.newPage({viewport:{width:390,height:844}});await page.goto('http://127.0.0.1:4174');await page.locator('.title-btn').first().click();await page.waitForSelector('canvas');await page.screenshot({path:'screenshots/first-screen-guide.png'})
 for(const [name,x] of [['perfect',.5],['stable',.52],['miss',.58]]){const shot=await b.newPage({viewport:{width:390,height:844}});await shot.goto('http://127.0.0.1:4174');await shot.locator('.title-btn').first().click();await shot.waitForSelector('canvas');await shot.waitForFunction(()=>globalThis.__gameState?.phase==='falling'&&globalThis.__gameState?.y>=342&&globalThis.__gameState?.y<=498);const q=await shot.locator('canvas').boundingBox();await shot.mouse.move(q.x+q.width*x,q.y+330);await shot.mouse.down();await shot.mouse.move(q.x+q.width*x,q.y+470);await shot.mouse.up();await shot.waitForFunction(()=>globalThis.__gameState?.serial===1);await wait(140);await shot.screenshot({path:`screenshots/cut-${name}.png`});await shot.close()}
 for(let miss=0;miss<3;miss++){await page.waitForFunction(()=>globalThis.__gameState?.phase==='falling'&&globalThis.__gameState?.y>=342&&globalThis.__gameState?.y<=498,{timeout:15000});const q=await page.locator('canvas').boundingBox();await page.mouse.move(q.x+q.width*.58,q.y+330);await page.mouse.down();await page.mouse.move(q.x+q.width*.58,q.y+470);await page.mouse.up();await page.waitForFunction((m)=>globalThis.__gameState?.serial>m,miss,{timeout:5000})}
 await page.waitForFunction(()=>globalThis.__gameState?.over,{timeout:10000});await page.screenshot({path:'screenshots/trial-over.png'});await page.close();await b.close();console.log('VIEWPORT OK: 4 sizes + guide/3 judgments/game-over captures')
} finally { try{process.kill(-p.pid,'SIGKILL')}catch{} }
