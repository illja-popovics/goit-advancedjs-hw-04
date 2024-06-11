import{i as a,a as y,S as v}from"./assets/vendor-b0d10f48.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function c(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=c(e);fetch(e.href,r)}})();const b="44296746-7471de79088029a055864728c",w="https://pixabay.com/api/",$=document.getElementById("search-form"),u=document.querySelector(".gallery");let d="",o=1,f=0,p,n=!0;a.settings({position:"topRight"});const g=async(s,t)=>{const c=`${w}?key=${b}&q=${s}&image_type=photo&orientation=horizontal&safesearch=false&page=${t}&per_page=40`;try{return(await y.get(c)).data}catch(i){console.error("Error fetching images:",i),a.error({title:"Error",message:"Failed to fetch images"})}},E=({webformatURL:s,largeImageURL:t,tags:c,likes:i,views:e,comments:r,downloads:l})=>`
  <div class="photo-card">
    <a href="${t}" data-lightbox="gallery">
      <img src="${s}" alt="${c}" loading="lazy" />
    </a>
    <div class="info">
        <div class="info-item-wrapper">
            <p class="info-item"><b>Likes</b></p>
            <p class="info-item">${i}</p>
        </div>
        <div class="info-item-wrapper">
            <p class="info-item"><b>Views</b></p>
            <p class="info-item">${e}</p>
        </div>

        <div class="info-item-wrapper">
            <p class="info-item"><b>Comments</b></p>
            <p class="info-item">${r}</p>
        </div>

        <div class="info-item-wrapper">
            <p class="info-item"><b>Downloads</b></p>
            <p class="info-item">${l}</p>
        </div>
    </div>
  </div>
`,h=s=>{const t=s.map(E).join("");u.insertAdjacentHTML("beforeend",t),p?p.refresh():p=new v(".gallery a",{captionsData:"alt",captionDelay:250})},L=async s=>{if(s.preventDefault(),d=s.currentTarget.elements.searchQuery.value.trim(),!d){a.warning({title:"Warning",message:"Please enter a valid search query."}),n=!1;return}o=1,u.innerHTML="";const t=await g(d,o);if(f=t.totalHits,t.hits.length===0){a.warning({title:"No results",message:"Sorry, there are no images matching your search query. Please try again."}),n=!1;return}a.success({title:"Hooray!",message:`We found ${f} images.`}),h(t.hits),n=!0,t.hits.length<40&&(a.warning({title:"End of results",message:"We're sorry, but you've reached the end of search results."}),n=!1)},I=async()=>{if(d&&o*40<f){o+=1;const s=await g(d,o);h(s.hits),(s.hits.length<40||o*40>=f)&&(a.warning({title:"End of results",message:"We're sorry, but you've reached the end of search results."}),n=!1)}},O=s=>{s.forEach(t=>{t.isIntersecting&&n&&I()})},P=new IntersectionObserver(O,{rootMargin:"200px"});$.addEventListener("submit",L);const m=document.createElement("div");m.className="sentinel";document.body.appendChild(m);P.observe(m);
//# sourceMappingURL=commonHelpers.js.map
