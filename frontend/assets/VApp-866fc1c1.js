import{p as z,Z as B,f as v,z as se,ac as $,y as C,a6 as j,v as K,C as le,U as q,S as ue,ad as ie,ae as re,D as ce,af as ve,g as X,a as b,ag as de,ah as fe,o as me,c as pe,w as U,q as ye,r as ge,s as he}from"./index-55ef3ac4.js";import{V as be}from"./VContainer-05540c9a.js";import{b as Ie,m as F,a as xe,u as W}from"./tag-be74eb68.js";import{u as we}from"./ssrBoot-0c3da786.js";const R=Symbol.for("vuetify:layout"),Y=Symbol.for("vuetify:layout-item"),Z=1e3,Se=z({overlaps:{type:Array,default:()=>[]},fullHeight:Boolean},"layout"),Te=z({name:{type:String},order:{type:[Number,String],default:0},absolute:Boolean},"layout-item");function Ve(){const e=B(R);if(!e)throw new Error("[Vuetify] Could not find injected layout");return{getLayoutItem:e.getLayoutItem,mainRect:e.mainRect,mainStyles:e.mainStyles}}function De(e){const s=B(R);if(!s)throw new Error("[Vuetify] Could not find injected layout");const t=e.id??`layout-item-${ue()}`,u=j("useLayoutItem");q(Y,{id:t});const n=K(!1);ie(()=>n.value=!0),re(()=>n.value=!1);const{layoutItemStyles:i,layoutItemScrimStyles:r}=s.register(u,{...e,active:v(()=>n.value?!1:e.active.value),id:t});return ce(()=>s.unregister(t)),{layoutItemStyles:i,layoutRect:s.layoutRect,layoutItemScrimStyles:r}}const _e=(e,s,t,u)=>{let n={top:0,left:0,right:0,bottom:0};const i=[{id:"",layer:{...n}}];for(const r of e){const m=s.get(r),y=t.get(r),g=u.get(r);if(!m||!y||!g)continue;const I={...n,[m.value]:parseInt(n[m.value],10)+(g.value?parseInt(y.value,10):0)};i.push({id:r,layer:I}),n=I}return i};function Le(e){const s=B(R,null),t=v(()=>s?s.rootZIndex.value-100:Z),u=se([]),n=$(new Map),i=$(new Map),r=$(new Map),m=$(new Map),y=$(new Map),{resizeRef:g,contentRect:I}=Ie(),G=v(()=>{const a=new Map,d=e.overlaps??[];for(const o of d.filter(c=>c.includes(":"))){const[c,l]=o.split(":");if(!u.value.includes(c)||!u.value.includes(l))continue;const p=n.get(c),h=n.get(l),V=i.get(c),_=i.get(l);!p||!h||!V||!_||(a.set(l,{position:p.value,amount:parseInt(V.value,10)}),a.set(c,{position:h.value,amount:-parseInt(_.value,10)}))}return a}),x=v(()=>{const a=[...new Set([...r.values()].map(o=>o.value))].sort((o,c)=>o-c),d=[];for(const o of a){const c=u.value.filter(l=>{var p;return((p=r.get(l))==null?void 0:p.value)===o});d.push(...c)}return _e(d,n,i,m)}),O=v(()=>!Array.from(y.values()).some(a=>a.value)),w=v(()=>x.value[x.value.length-1].layer),J=v(()=>({"--v-layout-left":C(w.value.left),"--v-layout-right":C(w.value.right),"--v-layout-top":C(w.value.top),"--v-layout-bottom":C(w.value.bottom),...O.value?void 0:{transition:"none"}})),S=v(()=>x.value.slice(1).map((a,d)=>{let{id:o}=a;const{layer:c}=x.value[d],l=i.get(o),p=n.get(o);return{id:o,...c,size:Number(l.value),position:p.value}})),T=a=>S.value.find(d=>d.id===a),M=j("createLayout"),D=K(!1);le(()=>{D.value=!0}),q(R,{register:(a,d)=>{let{id:o,order:c,position:l,layoutSize:p,elementSize:h,active:V,disableTransitions:_,absolute:te}=d;r.set(o,c),n.set(o,l),i.set(o,p),m.set(o,V),_&&y.set(o,_);const E=ve(Y,M==null?void 0:M.vnode).indexOf(a);E>-1?u.value.splice(E,0,o):u.value.push(o);const H=v(()=>S.value.findIndex(L=>L.id===o)),A=v(()=>t.value+x.value.length*2-H.value*2),oe=v(()=>{const L=l.value==="left"||l.value==="right",P=l.value==="right",ne=l.value==="bottom",N={[l.value]:0,zIndex:A.value,transform:`translate${L?"X":"Y"}(${(V.value?0:-110)*(P||ne?-1:1)}%)`,position:te.value||t.value!==Z?"absolute":"fixed",...O.value?void 0:{transition:"none"}};if(!D.value)return N;const f=S.value[H.value];if(!f)throw new Error(`[Vuetify] Could not find layout item "${o}"`);const k=G.value.get(o);return k&&(f[k.position]+=k.amount),{...N,height:L?`calc(100% - ${f.top}px - ${f.bottom}px)`:h.value?`${h.value}px`:void 0,left:P?void 0:`${f.left}px`,right:P?`${f.right}px`:void 0,top:l.value!=="bottom"?`${f.top}px`:void 0,bottom:l.value!=="top"?`${f.bottom}px`:void 0,width:L?h.value?`${h.value}px`:void 0:`calc(100% - ${f.left}px - ${f.right}px)`}}),ae=v(()=>({zIndex:A.value-1}));return{layoutItemStyles:oe,layoutItemScrimStyles:ae,zIndex:A}},unregister:a=>{r.delete(a),n.delete(a),i.delete(a),m.delete(a),y.delete(a),u.value=u.value.filter(d=>d!==a)},mainRect:w,mainStyles:J,getLayoutItem:T,items:S,layoutRect:I,rootZIndex:t});const Q=v(()=>["v-layout",{"v-layout--full-height":e.fullHeight}]),ee=v(()=>({zIndex:s?t.value:void 0,position:s?"relative":void 0,overflow:s?"hidden":void 0}));return{layoutClasses:Q,layoutStyles:ee,getLayoutItem:T,items:S,layoutRect:I,layoutRef:g}}const $e=z({scrollable:Boolean,...F(),...xe({tag:"main"})},"VMain"),Ce=X()({name:"VMain",props:$e(),setup(e,s){let{slots:t}=s;const{mainStyles:u}=Ve(),{ssrBootStyles:n}=we();return W(()=>b(e.tag,{class:["v-main",{"v-main--scrollable":e.scrollable},e.class],style:[u.value,n.value,e.style]},{default:()=>{var i,r;return[e.scrollable?b("div",{class:"v-main__scroller"},[(i=t.default)==null?void 0:i.call(t)]):(r=t.default)==null?void 0:r.call(t)]}})),{}}}),Re={};function ze(e,s){const t=fe("router-view");return me(),pe(Ce,null,{default:U(()=>[b(be,{fluid:!0},{default:U(()=>[b(t)]),_:1})]),_:1})}const Ee=de(Re,[["render",ze]]);const Me=z({...F(),...Se({fullHeight:!0}),...ye()},"VApp"),He=X()({name:"VApp",props:Me(),setup(e,s){let{slots:t}=s;const u=ge(e),{layoutClasses:n,getLayoutItem:i,items:r,layoutRef:m}=Le(e),{rtlClasses:y}=he();return W(()=>{var g;return b("div",{ref:m,class:["v-application",u.themeClasses.value,n.value,y.value,e.class],style:[e.style]},[b("div",{class:"v-application__wrap"},[(g=t.default)==null?void 0:g.call(t)])])}),{getLayoutItem:i,items:r,theme:u}}});export{Ee as D,He as V,Te as m,De as u};
