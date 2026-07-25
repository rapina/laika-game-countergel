export const STEP_MS = 1000 / 60
export const TARGET_GELS = 12
export const MAX_MISSES = 3
export const CUT_MIN_Y = 342
export const CUT_MAX_Y = 498
const BANDS=[{fall:95,sway:0,tolerance:.13,com:0},{fall:112,sway:.055,tolerance:.105,com:.015},{fall:128,sway:.07,tolerance:.085,com:.065},{fall:152,sway:.09,tolerance:.068,com:.085}]
const STAGE_W=390,STAGE_H=844,GEL_W=132,GEL_H=144,BASE_MASS=60,PARTICLE_MASS=3
export function createState(){return{phase:'falling',gel:0,misses:0,perfects:0,stables:0,score:0,elapsed:0,y:390,sway:0,comX:0,tolerance:BANDS[0].tolerance,band:0,settle:0,lastError:0,lastJudgment:null,serial:0,guide:true,consecutiveFails:0}}
function seededOffset(index){return[0,.42,-.68,.77,-.31,.56,-.82,.24,.71,-.53,.36,-.75][index%12]}
export function step(state,input){const s={...state,elapsed:state.elapsed+STEP_MS};if(s.phase==='over')return s;if(s.phase==='settling'){s.settle-=STEP_MS;if(s.settle<=0){if(s.misses>=MAX_MISSES||s.gel>=TARGET_GELS)s.phase='over';else{s.phase='falling';s.y=180;s.lastJudgment=null;s.cut=undefined}}return s} s.band=Math.min(3,Math.floor(s.gel/3));const b=BANDS[s.band],t=s.elapsed/1000;s.sway=Math.sin(t*(1.7+s.band*.25)+s.gel)*b.sway;s.comX=seededOffset(s.gel)*b.com+Math.sin(t*2.3+s.gel*1.9)*b.com*.28;s.tolerance=b.tolerance;s.y+=b.fall*STEP_MS/1000;if(input&&s.y>=CUT_MIN_Y&&s.y<=CUT_MAX_Y){const split=calculateSplit(s,input),error=split.error,mag=Math.abs(error);s.lastError=error;s.cut={...input,y:input.y??s.y/STAGE_H,gelY:s.y,gelX:.5+s.sway,masses:split.masses,particleSides:split.particleSides};s.serial++;if(mag<=b.tolerance*.42){s.lastJudgment='perfect';s.perfects++;s.score+=300+s.band*25;s.consecutiveFails=0}else if(mag<=b.tolerance){s.lastJudgment='stable';s.stables++;s.score+=150+s.band*15;s.consecutiveFails=0}else{s.lastJudgment='miss';s.misses++;s.consecutiveFails++}s.gel++;s.guide=s.perfects+s.stables<2||s.consecutiveFails>=2;s.phase='settling';s.settle=s.lastJudgment==='perfect'?700:s.lastJudgment==='stable'?850:1050;return s}if(s.y>620){s.lastError=s.sway+s.comX;s.lastJudgment='miss';s.serial++;s.misses++;s.gel++;s.consecutiveFails++;s.guide=s.perfects+s.stables<2||s.consecutiveFails>=2;s.phase='settling';s.settle=1050}return s}
export function encodedScore(s){return s.gel*100000+s.perfects*1000+s.stables*100+s.score}
/** Public, render-visible evidence used by both the canvas and skilled agents. */
export function visibleParticleDescriptors(s){
 const gelWidthRatio=132/390
 const offsets=[-.32,-.20,-.08,.08,.20,.32].map(v=>v*gelWidthRatio),weights=[3,1,2,2,1,3]
 return offsets.map((offset,i)=>({
  x:.5+s.sway+s.comX+offset,
  y:.23+((i*37+s.gel*19)%55)/100,
  weight:weights[i],
  kind:i%3===1?'bubble':'seed',
 }))
}
export function visibleWeightedCenter(s){const p=visibleParticleDescriptors(s),mass=p.reduce((n,q)=>n+q.weight,0);return p.reduce((n,q)=>n+q.x*q.weight,0)/mass}
export function screenParticlePositions(s,width){return visibleParticleDescriptors(s).map(p=>({...p,pixelX:p.x*width}))}
export function visibleGelBounds(s){const center=(.5+s.sway)*STAGE_W;return{left:center-GEL_W/2,right:center+GEL_W/2,top:s.y-GEL_H/2,bottom:s.y+GEL_H/2}}
function polygonArea(poly){let sum=0;for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length];sum+=a.x*b.y-b.x*a.y}return Math.abs(sum)/2}
function clipHalf(poly,point,dir,keep){const side=p=>Math.sign(dir.x*(p.y-point.y)-dir.y*(p.x-point.x)||1);const out=[];for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],sa=side(a)*keep,sb=side(b)*keep;if(sa>=0)out.push(a);if((sa>=0)!==(sb>=0)){const ax=a.x-point.x,ay=a.y-point.y,bx=b.x-point.x,by=b.y-point.y,ca=dir.x*ay-dir.y*ax,cb=dir.x*by-dir.y*bx,k=ca/(ca-cb);out.push({x:a.x+(b.x-a.x)*k,y:a.y+(b.y-a.y)*k})}}return out}
export function calculateSplit(s,input){const cx=(.5+s.sway)*STAGE_W,cy=s.y,point={x:input.x*STAGE_W,y:(input.y??s.y/STAGE_H)*STAGE_H},dir={x:Math.cos(input.angle),y:Math.sin(input.angle)},body=[{x:cx-GEL_W/2,y:cy-GEL_H/2},{x:cx+GEL_W/2,y:cy-GEL_H/2},{x:cx+GEL_W/2,y:cy+GEL_H/2},{x:cx-GEL_W/2,y:cy+GEL_H/2}],totalArea=GEL_W*GEL_H;const particles=visibleParticleDescriptors(s),particleSides=particles.map(p=>dir.x*((cy+(p.y-.5)*GEL_H)-point.y)-dir.y*((p.x*STAGE_W)-point.x)>=0?1:-1);const masses=[-1,1].map(side=>BASE_MASS*polygonArea(clipHalf(body,point,dir,side))/totalArea+particles.reduce((sum,p,i)=>sum+(particleSides[i]===side?p.weight*PARTICLE_MASS:0),0));return{masses,particleSides,error:(masses[1]-masses[0])/(masses[0]+masses[1])}}
