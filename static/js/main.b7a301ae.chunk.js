(this["webpackJsonpts-react"]=this["webpackJsonpts-react"]||[]).push([[0],{47:function(e,t,a){e.exports=a(58)},52:function(e,t,a){},58:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(15),o=a.n(c),i=(a(52),a(71)),l=a(9),u=a(72),m=a(73),s=a(76),d=a(74),E=a(75),b=a(32),f=a.n(b),p=a(33),w=a.n(p),h=a(35),v=a.n(h),j=a(36),g=a.n(j),y=a(34),O=a.n(y),S=(a(26),a(70)),k=function(e){return r.a.createElement(S.a,{align:"center",color:e.isResetState?"secondary":"primary",variant:"h1"},function(e){var t=Math.floor(e/60),a=e%60,n=t.toString(),r=a.toString();return t<10&&(n="0"+n),a<10&&(r="0"+r),n+":"+r}(e.seconds))},B=Object(i.a)({redBg:{background:"red"},whiteBg:{}}),x=function(){var e=B(),t=Object(n.useState)(90),a=Object(l.a)(t,2),c=a[0],o=a[1],i=Object(n.useState)(c),b=Object(l.a)(i,2),p=b[0],h=b[1],j=Object(n.useRef)(p),y=Object(n.useState)(0),S=Object(l.a)(y,2),x=S[0],C=S[1],I=Object(n.useState)(!1),A=Object(l.a)(I,2),T=A[0],R=A[1],z={color:"primary",name:"start"},J={color:"default",name:"stop"},L=Object(n.useState)({color:"primary",name:"start"}),M=Object(l.a)(L,2),N=M[0],W=M[1],$=Object(n.useState)(!0),q=Object(l.a)($,2),D=q[0],F=q[1],G=Object(n.useState)(!0),H=Object(l.a)(G,2),K=H[0],P=H[1],Q=r.a.useState(new Audio("https://raw.githubusercontent.com/shuto410/5BomberTimer/master/audio/start.mp3")),U=Object(l.a)(Q,1)[0],V=r.a.useState(new Audio("https://raw.githubusercontent.com/shuto410/5BomberTimer/master/audio/cannon.mp3")),X=Object(l.a)(V,1)[0];Object(n.useEffect)((function(){j.current=p,0===p&&(X.play(),window.clearInterval(x))}),[p]);var Y=function(){C(window.setInterval(_,1e3)),p===c&&U.play()},Z=function(){window.clearInterval(x)},_=function(){j.current>0&&h(j.current-1)};return r.a.createElement(u.a,{container:!0,justify:"center",spacing:2},r.a.createElement(u.a,{item:!0,xs:!0,md:5},r.a.createElement(m.a,{className:0===p?e.redBg:e.whiteBg,color:"primary",elevation:4},r.a.createElement(u.a,{container:!0},r.a.createElement(u.a,{item:!0,xs:11},r.a.createElement(s.a,{ml:"5vw"},r.a.createElement(k,{seconds:p,isResetState:K}))),r.a.createElement(u.a,{item:!0,xs:1},r.a.createElement(u.a,{container:!0},r.a.createElement(u.a,{item:!0,xs:12},r.a.createElement(s.a,{mt:1},r.a.createElement(d.a,{color:K?"secondary":"primary",edge:"start",onClick:function(){K&&o(c>3570?3599:c+30),h(p>3570?3599:p+30)}},r.a.createElement(f.a,null)))),r.a.createElement(u.a,{item:!0,xs:12},r.a.createElement(d.a,{color:K?"secondary":"primary",edge:"start",onClick:function(){K&&o(c<30?0:c-30),h(p<30?0:p-30)}},r.a.createElement(w.a,null)))))))),r.a.createElement(u.a,{item:!0,xs:12},r.a.createElement(u.a,{container:!0,justify:"center",spacing:2},r.a.createElement(s.a,{mr:"1vw",mt:"3vh"},r.a.createElement(E.a,{size:"large",variant:"contained",color:N.color,startIcon:T?r.a.createElement(O.a,null):r.a.createElement(v.a,null),onClick:function(){T?(Z(),R(!1),W(z),F(!0)):(Y(),R(!0),W(J),F(!1),P(!1))}},N.name)),r.a.createElement(s.a,{ml:"1vw",mt:"3vh"},r.a.createElement(E.a,{size:"large",variant:"contained",color:"secondary",startIcon:r.a.createElement(g.a,null),disabled:!D,onClick:function(){h(c),window.clearInterval(x),P(!0)}},"Reset")))))},C=a(37),I=a.n(C),A=a(38),T=a.n(A),R=a(39),z=a.n(R),J=function(){var e=r.a.useState(new Audio("https://raw.githubusercontent.com/shuto410/5BomberTimer/master/audio/correct.mp3")),t=Object(l.a)(e,1)[0],a=r.a.useState(new Audio("https://raw.githubusercontent.com/shuto410/5BomberTimer/master/audio/wrong.mp3")),c=Object(l.a)(a,1)[0],o=r.a.useState(new Audio("https://raw.githubusercontent.com/shuto410/5BomberTimer/master/audio/success.mp3")),i=Object(l.a)(o,1)[0];Object(n.useEffect)((function(){document.body.addEventListener("keydown",(function(e){"c"===e.key&&m()})),document.body.addEventListener("keydown",(function(e){"x"===e.key&&E()}))}),[]);var m=function(){t.play()},E=function(){c.play()};return r.a.createElement("div",null,r.a.createElement(s.a,{mt:3},r.a.createElement(u.a,{container:!0,justify:"center"},r.a.createElement(d.a,{onClick:function(){return m()}},r.a.createElement(I.a,null)),r.a.createElement(d.a,{onClick:function(){return E()}},r.a.createElement(T.a,null)),r.a.createElement(d.a,{onClick:function(){return i.play()}},r.a.createElement(z.a,null)))))},L=Object(i.a)({app:{padding:"2vh"}}),M=function(){var e=L();return r.a.createElement("div",{className:e.app},r.a.createElement(x,null),r.a.createElement(J,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(M,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[47,1,2]]]);
//# sourceMappingURL=main.b7a301ae.chunk.js.map