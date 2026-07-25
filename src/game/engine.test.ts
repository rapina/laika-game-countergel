import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { createState, step, encodedScore, visibleParticleDescriptors, visibleWeightedCenter, screenParticlePositions, calculateSplit, CUT_MIN_Y, CUT_MAX_Y } from './engine.mjs'
describe('countergel deterministic rules', () => {
 it('first gel starts inside the illuminated cutting band',()=>{ const s=createState(); expect(s.y).toBeGreaterThanOrEqual(CUT_MIN_Y); expect(s.y).toBeLessThanOrEqual(CUT_MAX_Y) })
 it('same state and input has identical transition',()=>{ const a={...createState(),y:400}; expect(step(a,{x:.5,y:400/844,angle:Math.PI/2})).toEqual(step(a,{x:.5,y:400/844,angle:Math.PI/2})) })
 it('center vertical cut balances the stationary first gel',()=>{ const s=step({...createState(),y:400},{x:.5,y:400/844,angle:Math.PI/2}); expect(s.lastJudgment).toBe('perfect'); expect(s.serial).toBe(1) })
 it('records real piece masses, particles, and gel geometry',()=>{ const s=step({...createState(),y:400,sway:.04},{x:.54,y:400/844,angle:Math.PI/2}); expect(s.cut?.gelY).toBeGreaterThan(400); expect(s.cut?.gelX).toBeCloseTo(.5+s.sway); expect(s.cut?.masses).toHaveLength(2); expect(s.cut?.particleSides).toHaveLength(6) })
 it('off-center geometry produces unequal physical piece mass',()=>{ const s=createState(),split=calculateSplit(s,{x:.62,y:s.y/844,angle:Math.PI/2}); expect(Math.abs(split.masses[0]-split.masses[1])).toBeGreaterThan(10); expect(Math.abs(split.error)).toBeGreaterThan(.1) })
 it('ignores cuts before and after the illuminated band',()=>{ expect(step({...createState(),y:CUT_MIN_Y-30},{x:.5,angle:0}).serial).toBe(0); expect(step({...createState(),y:CUT_MAX_Y+1},{x:.5,angle:0}).serial).toBe(0) })
 it('three misses end after settling',()=>{ let s={...createState(),misses:2,y:621}; s=step(s); expect(s.misses).toBe(3); while(s.phase!=='over') s=step(s); expect(s.phase).toBe('over') })
 it('encoded score sorts progress then quality',()=>{ const a={...createState(),gel:2,perfects:2}; const b={...createState(),gel:3}; expect(encodedScore(b)).toBeGreaterThan(encodedScore(a)) })
 it('visible particle centroid exactly exposes sway plus rule COM',()=>{ const s={...createState(),sway:.057,comX:-.043,gel:8}; expect(visibleParticleDescriptors(s).length).toBeGreaterThan(3); expect(visibleWeightedCenter(s)).toBeCloseTo(.5+s.sway+s.comX,12) })
 it('final screen-pixel centroid is exactly the judged center',()=>{const s={...createState(),sway:-.061,comX:.078,gel:10};const p=screenParticlePositions(s,390),m=p.reduce((n,q)=>n+q.weight,0),centroid=p.reduce((n,q)=>n+q.pixelX*q.weight,0)/m/390;expect(centroid).toBeCloseTo(.5+s.sway+s.comX,12)})
 it('playability policy never reads hidden comX',()=>{ const source=readFileSync(new URL('../../scripts/playability-sim.mjs',import.meta.url),'utf8'); expect(source).not.toMatch(/\.comX\b/); expect(source).toContain('screenParticlePositions') })
})
