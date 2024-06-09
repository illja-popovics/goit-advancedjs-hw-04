import{i as d,a as h,S as y}from"./assets/vendor-b0d10f48.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=i(e);fetch(e.href,s)}})();const b="44296746-7471de79088029a055864728c",v="https://pixabay.com/api/",w=document.getElementById("search-form"),f=document.querySelector(".gallery");let n="",c=1,p=0,l;const u=async(r,t)=>{const i=`${v}?key=${b}&q=${r}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=40`;try{return(await h.get(i)).data}catch(o){console.error("Error fetching images:",o),d.error({title:"Error",message:"Failed to fetch images"})}},$=({webformatURL:r,largeImageURL:t,tags:i,likes:o,views:e,comments:s,downloads:a})=>`
  <div class="photo-card">
    <a href="${t}" data-lightbox="gallery">
      <img src="${r}" alt="${i}" loading="lazy" />
    </a>
    <div class="info">
        <div class="info-item-wrapper">
            <p class="info-item"><b>Likes</b></p>
            <p class="info-item">${o}</p>
        </div>
        <div class="info-item-wrapper">
            <p class="info-item"><b>Views</b></p>
            <p class="info-item">${e}</p>
        </div>

        <div class="info-item-wrapper">
            <p class="info-item"><b>Comments</b></p>
            <p class="info-item">${s}</p>
        </div>

        <div class="info-item-wrapper">
            <p class="info-item"><b>Downloads</b></p>
            <p class="info-item">${a}</p>
        </div>
    </div>
  </div>
`,g=r=>{const t=r.map($).join("");f.insertAdjacentHTML("beforeend",t),l?l.refresh():l=new y(".gallery a",{captionsData:"alt",captionDelay:250})},L=async r=>{if(r.preventDefault(),n=r.currentTarget.elements.searchQuery.value.trim(),!n)return;c=1,f.innerHTML="";const t=await u(n,c);if(p=t.totalHits,t.hits.length===0){d.warning({title:"No results",message:"Sorry, there are no images matching your search query. Please try again."});return}d.success({title:"Hooray!",message:`We found ${p} images.`}),g(t.hits)},I=async()=>{if(n&&c*40<p){c+=1;const r=await u(n,c);g(r.hits)}},E=r=>{r.forEach(t=>{t.isIntersecting&&I()})},O=new IntersectionObserver(E,{rootMargin:"200px"});w.addEventListener("submit",L);const m=document.createElement("div");m.className="sentinel";document.body.appendChild(m);O.observe(m);
//# sourceMappingURL=commonHelpers.js.map
