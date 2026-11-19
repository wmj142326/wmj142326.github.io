export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // =========================================================
    // 照片文件夹
    // =========================================================

    let prefix = env.PHOTO_FOLDER || "Photography/";

    if (!prefix.endsWith("/")) {
      prefix += "/";
    }


    // =========================================================
    // 1. 获取照片列表
    // =========================================================

    if (url.pathname === "/api/photos") {

      let cursor;
      const photos = [];

      do {
        const listed = await env.PHOTOS.list({
          prefix: prefix,
          cursor: cursor,
          limit: 1000
        });

        for (const object of listed.objects) {

          const key = object.key;

          // 跳过文件夹占位符
          if (key === prefix || key.endsWith("/")) {
            continue;
          }

          // 只读取常见图片格式
          if (!/\.(jpe?g|png|webp|gif|avif)$/i.test(key)) {
            continue;
          }

          photos.push({
            key: key,
            name: key.substring(prefix.length),
            uploaded: object.uploaded,
            size: object.size || 0
          });
        }

        cursor = listed.truncated
          ? listed.cursor
          : undefined;

      } while (cursor);


      // 不在服务器端固定排序
      // 前端每次打开网页时随机打乱


      const result = photos.map((photo) => ({
        name: photo.name,
        size: photo.size,

        src:
          "/image/" +
          encodeURIComponent(photo.key),

        download:
          "/download/" +
          encodeURIComponent(photo.key)
      }));


      return Response.json(
        result,
        {
          headers: {
            "Cache-Control": "no-cache"
          }
        }
      );
    }


    // =========================================================
    // 2. 显示图片
    // =========================================================

    if (url.pathname.startsWith("/image/")) {

      const key = decodeURIComponent(
        url.pathname.slice("/image/".length)
      );

      const object = await env.PHOTOS.get(key);

      if (!object) {
        return new Response(
          "Image not found",
          {
            status: 404
          }
        );
      }

      const headers = new Headers();

      object.writeHttpMetadata(headers);

      headers.set(
        "etag",
        object.httpEtag
      );

      headers.set(
        "Cache-Control",
        "public, max-age=86400"
      );

      if (!headers.get("Content-Type")) {
        headers.set(
          "Content-Type",
          getContentType(key)
        );
      }

      return new Response(
        object.body,
        {
          headers: headers
        }
      );
    }


    // =========================================================
    // 3. 单张下载原图
    // =========================================================

    if (url.pathname.startsWith("/download/")) {

      const key = decodeURIComponent(
        url.pathname.slice("/download/".length)
      );

      const object = await env.PHOTOS.get(key);

      if (!object) {
        return new Response(
          "Image not found",
          {
            status: 404
          }
        );
      }

      const filename =
        key.split("/").pop();

      const headers =
        new Headers();

      object.writeHttpMetadata(headers);

      headers.set(
        "Content-Disposition",
        "attachment; filename*=UTF-8''" +
        encodeURIComponent(filename)
      );

      if (!headers.get("Content-Type")) {
        headers.set(
          "Content-Type",
          getContentType(key)
        );
      }

      return new Response(
        object.body,
        {
          headers: headers
        }
      );
    }


    // =========================================================
    // 4. 网站首页
    // =========================================================

    return new Response(
      HTML,
      {
        headers: {
          "Content-Type":
            "text/html; charset=UTF-8"
        }
      }
    );
  }
};



// =========================================================
// Content-Type
// =========================================================

function getContentType(key) {

  const ext =
    key
      .split(".")
      .pop()
      .toLowerCase();

  const types = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
    avif: "image/avif"
  };

  return (
    types[ext] ||
    "application/octet-stream"
  );
}



// =========================================================
// HTML
// =========================================================

const HTML = `<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
>

<title>Photography (Wang Meijun)</title>


<style>

/* =========================================================
   Global
   ========================================================= */

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
}

body {
  background: #ffffff;
  color: #111111;

  font-family:
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    Arial,
    sans-serif;

  overflow-x: hidden;
}

button,
a {
  font: inherit;
}


/* =========================================================
   Header
   ========================================================= */

header {
  height: 62px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 12px;
}

.brand {
  font-size: 21px;
  font-weight: 500;
  letter-spacing: -0.02em;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.count {
  font-size: 11px;
  color: #aaaaaa;

  letter-spacing: 0.08em;
  white-space: nowrap;
}

.text-button {
  border: none;
  background: transparent;

  padding: 5px 0;

  color: #555555;

  cursor: pointer;

  font-size: 12px;
  letter-spacing: 0.03em;
}

.text-button:hover {
  color: #000000;
}

.choose-only {
  display: none;
}

body.choose-mode .choose-only {
  display: inline-flex;
}

body.choose-mode .normal-only {
  display: none;
}


/* =========================================================
   Gallery
   ========================================================= */

.gallery {
  columns: 4;
  column-gap: 3px;

  padding: 0 3px 3px;
}

.photo {
  position: relative;

  width: 100%;

  margin-bottom: 3px;

  break-inside: avoid;

  background: #f3f3f3;

  overflow: hidden;

  cursor: zoom-in;
}

.photo img {
  width: 100%;
  height: auto;

  display: block;

  opacity: 0;

  transition:
    opacity 0.35s ease,
    filter 0.25s ease;
}

.photo img.loaded {
  opacity: 1;
}

.photo img:hover {
  filter: brightness(0.92);
}


/* =========================================================
   Choose 模式
   ========================================================= */

body.choose-mode .photo {
  cursor: pointer;
}

body.choose-mode .photo img:hover {
  filter: none;
}

body.choose-mode .photo.selected img {
  filter: brightness(0.72);
}


/* =========================================================
   选择圆圈
   ========================================================= */

.select-indicator {
  position: absolute;

  top: 9px;
  right: 9px;

  z-index: 4;

  width: 27px;
  height: 27px;

  border-radius: 50%;

  border:
    1.5px solid
    rgba(255,255,255,0.95);

  background:
    rgba(0,0,0,0.22);

  color: white;

  display: none;

  align-items: center;
  justify-content: center;

  font-size: 15px;
  font-weight: 600;

  box-shadow:
    0 1px 6px
    rgba(0,0,0,0.15);

  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

body.choose-mode .select-indicator {
  display: flex;
}

.photo.selected .select-indicator {
  background: white;
  color: #111111;
  border-color: white;
}


/* =========================================================
   Loading
   ========================================================= */

.status {
  height:
    calc(100vh - 62px);

  display: flex;

  align-items: center;
  justify-content: center;

  color: #999999;

  font-size: 13px;
}


/* =========================================================
   Choose 底部工具栏
   ========================================================= */

.choose-toolbar {
  position: fixed;

  left: 50%;
  bottom: 22px;

  transform:
    translateX(-50%)
    translateY(20px);

  z-index: 8000;

  min-width: 340px;

  max-width:
    calc(100vw - 28px);

  padding:
    10px
    12px
    10px
    16px;

  border-radius: 18px;

  background:
    rgba(18,18,18,0.92);

  color: white;

  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 18px;

  opacity: 0;

  pointer-events: none;

  transition:
    opacity 0.22s ease,
    transform 0.22s ease;

  box-shadow:
    0 10px 35px
    rgba(0,0,0,0.18);

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

body.choose-mode .choose-toolbar {
  opacity: 1;

  pointer-events: auto;

  transform:
    translateX(-50%)
    translateY(0);
}

.selected-count {
  font-size: 12px;

  color:
    rgba(255,255,255,0.76);

  white-space: nowrap;
}

.toolbar-button {
  border: none;

  border-radius: 12px;

  padding:
    9px 14px;

  background: white;

  color: #111111;

  cursor: pointer;

  font-size: 12px;

  white-space: nowrap;
}

.toolbar-button:disabled {
  cursor: default;
  opacity: 0.38;
}


/* =========================================================
   Lightbox
   ========================================================= */

.lightbox {
  position: fixed;

  inset: 0;

  z-index: 9999;

  background: black;

  display: none;

  align-items: center;
  justify-content: center;

  cursor: default;
}

.lightbox.open {
  display: flex;
}

.lightbox-image {
  max-width: 100vw;
  max-height: 100vh;

  width: auto;
  height: auto;

  object-fit: contain;

  user-select: none;
  -webkit-user-select: none;
}


/* =========================================================
   Lightbox UI 自动隐藏
   ========================================================= */

.lightbox-control {
  opacity: 1;

  transition:
    opacity 0.35s ease,
    background 0.2s ease;
}

.lightbox.hide-ui .lightbox-control {
  opacity: 0;
  pointer-events: none;
}

.lightbox.hide-ui {
  cursor: none;
}


/* =========================================================
   Lightbox buttons
   ========================================================= */

.icon-button {
  position: absolute;

  width: 46px;
  height: 46px;

  border: 0;
  border-radius: 50%;

  background:
    rgba(0,0,0,0.18);

  color:
    rgba(255,255,255,0.82);

  display: flex;

  align-items: center;
  justify-content: center;

  cursor: pointer;

  font-weight: 200;

  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
}

.icon-button:hover {
  background:
    rgba(255,255,255,0.13);
}

.close {
  top: 18px;
  right: 18px;

  font-size: 29px;

  z-index: 20;
}

.prev,
.next {
  top: 50%;

  transform: translateY(-50%);

  font-size: 31px;

  z-index: 20;
}

.prev {
  left: 16px;
}

.next {
  right: 16px;
}


/* =========================================================
   Lightbox 信息
   ========================================================= */

.lightbox-info {
  position: absolute;

  right: 22px;
  bottom: 20px;

  display: flex;

  align-items: center;

  gap: 9px;

  color:
    rgba(255,255,255,0.58);

  font-size: 11px;

  letter-spacing: 0.05em;

  z-index: 20;
}

.divider {
  opacity: 0.45;
}

.download {
  color:
    rgba(255,255,255,0.68);

  text-decoration: none;

  transition: color 0.2s ease;
}

.download:hover {
  color: white;
}


/* =========================================================
   Responsive
   ========================================================= */

@media (max-width: 1200px) {

  .gallery {
    columns: 3;
  }

}

@media (max-width: 820px) {

  header {
    height: 58px;
    padding: 0 8px;
  }

  .brand {
    font-size: 19px;
  }

  .header-actions {
    gap: 10px;
  }

  .gallery {
    columns: 2;

    column-gap: 3px;

    padding: 0 3px 3px;
  }

  .prev {
    left: 6px;
  }

  .next {
    right: 6px;
  }

  .close {
    top: 10px;
    right: 10px;
  }

  .lightbox-info {
    right: 14px;
    bottom: 14px;
  }

}

@media (max-width: 520px) {

  .gallery {
    columns: 1;
  }

  .count {
    display: none;
  }

  .brand {
    font-size: 17px;
  }

  .icon-button {
    width: 42px;
    height: 42px;
  }

  .choose-toolbar {
    bottom: 12px;

    min-width: 0;

    width:
      calc(100vw - 24px);

    border-radius: 16px;
  }

  .selected-count {
    font-size: 11px;
  }

  .toolbar-button {
    padding:
      9px 12px;
  }

}

</style>

</head>



<body>



<!-- ======================================================
     Header
     ====================================================== -->

<header>

  <div class="brand">

    Photography (Wang Meijun)

  </div>


  <div class="header-actions">


    <div
      id="count"
      class="count"
    ></div>


    <button
      id="chooseButton"
      class="
        text-button
        normal-only
      "
    >

      Choose

    </button>


    <button
      id="selectAllButton"
      class="
        text-button
        choose-only
      "
    >

      Select all

    </button>


    <button
      id="cancelChooseButton"
      class="
        text-button
        choose-only
      "
    >

      Cancel

    </button>


  </div>

</header>



<!-- ======================================================
     Gallery
     ====================================================== -->

<main>


  <div
    id="status"
    class="status"
  >

    Loading photographs...

  </div>


  <div
    id="gallery"
    class="gallery"
  ></div>


</main>



<!-- ======================================================
     Choose toolbar
     ====================================================== -->

<div
  id="chooseToolbar"
  class="choose-toolbar"
>


  <div
    id="selectedCount"
    class="selected-count"
  >

    0 selected

  </div>


  <button
    id="downloadZipButton"
    class="toolbar-button"
    disabled
  >

    Download ZIP

  </button>


</div>



<!-- ======================================================
     Lightbox
     ====================================================== -->

<div
  id="lightbox"
  class="lightbox"
>


  <button
    id="close"
    class="
      lightbox-control
      icon-button
      close
    "
    aria-label="Close"
  >

    ×

  </button>



  <button
    id="prev"
    class="
      lightbox-control
      icon-button
      prev
    "
    aria-label="Previous"
  >

    ‹

  </button>



  <img
    id="lightboxImage"
    class="lightbox-image"
    alt=""
  >



  <button
    id="next"
    class="
      lightbox-control
      icon-button
      next
    "
    aria-label="Next"
  >

    ›

  </button>



  <div
    class="
      lightbox-control
      lightbox-info
    "
  >


    <span
      id="counter"
    ></span>


    <span
      class="divider"
    >

      ·

    </span>


    <a
      id="download"
      class="download"
    >

      Download

    </a>


  </div>


</div>



<script>

/* =========================================================
   Variables
   ========================================================= */

let photos = [];

let currentIndex = 0;

let hideUITimer = null;

let chooseMode = false;

let selectedIndexes =
  new Set();

let isPreparingZip =
  false;

let jsZipPromise = null;


/*
 * 浏览器 ZIP 保护限制
 */

const MAX_ZIP_PHOTOS =
  30;

const MAX_ZIP_BYTES =
  500 * 1024 * 1024;



/* =========================================================
   Elements
   ========================================================= */

const gallery =
  document.getElementById(
    "gallery"
  );

const status =
  document.getElementById(
    "status"
  );

const count =
  document.getElementById(
    "count"
  );

const chooseButton =
  document.getElementById(
    "chooseButton"
  );

const selectAllButton =
  document.getElementById(
    "selectAllButton"
  );

const cancelChooseButton =
  document.getElementById(
    "cancelChooseButton"
  );

const selectedCount =
  document.getElementById(
    "selectedCount"
  );

const downloadZipButton =
  document.getElementById(
    "downloadZipButton"
  );

const lightbox =
  document.getElementById(
    "lightbox"
  );

const lightboxImage =
  document.getElementById(
    "lightboxImage"
  );

const counter =
  document.getElementById(
    "counter"
  );

const download =
  document.getElementById(
    "download"
  );

const closeButton =
  document.getElementById(
    "close"
  );

const prevButton =
  document.getElementById(
    "prev"
  );

const nextButton =
  document.getElementById(
    "next"
  );



/* =========================================================
   随机打乱照片
   Fisher-Yates Shuffle
   ========================================================= */

function shufflePhotos(array) {

  for (
    let i = array.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(
        Math.random() *
        (i + 1)
      );


    const temporary =
      array[i];

    array[i] =
      array[j];

    array[j] =
      temporary;
  }

}



/* =========================================================
   Load photos
   ========================================================= */

async function loadPhotos() {

  try {

    const response =
      await fetch(
        "/api/photos"
      );


    if (!response.ok) {

      throw new Error(
        "Unable to load photos."
      );

    }


    photos =
      await response.json();


    // =====================================================
    // 每次打开 / 刷新网站随机排列
    // =====================================================

    shufflePhotos(
      photos
    );


    status.style.display =
      "none";


    count.textContent =
      photos.length +
      (
        photos.length === 1
          ? " PHOTOGRAPH"
          : " PHOTOGRAPHS"
      );


    if (
      photos.length === 0
    ) {

      status.style.display =
        "flex";

      status.textContent =
        "No photographs yet.";

      return;

    }


    photos.forEach(
      function(
        photo,
        index
      ) {


        const wrapper =
          document.createElement(
            "div"
          );


        wrapper.className =
          "photo";


        wrapper.dataset.index =
          String(index);



        const img =
          document.createElement(
            "img"
          );


        img.src =
          photo.src;


        img.alt =
          photo.name;


        img.loading =
          "lazy";


        img.decoding =
          "async";


        img.addEventListener(
          "load",
          function() {

            img.classList.add(
              "loaded"
            );

          }
        );



        const indicator =
          document.createElement(
            "div"
          );


        indicator.className =
          "select-indicator";


        indicator.textContent =
          "";



        wrapper.addEventListener(
          "click",
          function() {


            if (chooseMode) {

              toggleSelection(
                index,
                wrapper,
                indicator
              );

            }

            else {

              openLightbox(
                index
              );

            }


          }
        );



        wrapper.appendChild(
          img
        );


        wrapper.appendChild(
          indicator
        );


        gallery.appendChild(
          wrapper
        );


      }
    );

  }

  catch (error) {

    console.error(
      error
    );


    status.style.display =
      "flex";


    status.textContent =
      "Unable to load photographs.";

  }

}



/* =========================================================
   Enter Choose mode
   ========================================================= */

function enterChooseMode() {

  chooseMode =
    true;


  selectedIndexes.clear();


  document.body.classList.add(
    "choose-mode"
  );


  updateSelectionUI();

}



/* =========================================================
   Exit Choose mode
   ========================================================= */

function exitChooseMode() {

  if (isPreparingZip) {
    return;
  }


  chooseMode =
    false;


  selectedIndexes.clear();


  document.body.classList.remove(
    "choose-mode"
  );


  document
    .querySelectorAll(
      ".photo.selected"
    )
    .forEach(
      function(card) {

        card.classList.remove(
          "selected"
        );

      }
    );


  document
    .querySelectorAll(
      ".select-indicator"
    )
    .forEach(
      function(indicator) {

        indicator.textContent =
          "";

      }
    );


  updateSelectionUI();

}



/* =========================================================
   Toggle one photo
   ========================================================= */

function toggleSelection(
  index,
  card,
  indicator
) {


  if (
    selectedIndexes.has(
      index
    )
  ) {


    selectedIndexes.delete(
      index
    );


    card.classList.remove(
      "selected"
    );


    indicator.textContent =
      "";

  }


  else {


    selectedIndexes.add(
      index
    );


    card.classList.add(
      "selected"
    );


    indicator.textContent =
      "✓";

  }


  updateSelectionUI();

}



/* =========================================================
   Update choose UI
   ========================================================= */

function updateSelectionUI() {

  const numberSelected =
    selectedIndexes.size;


  selectedCount.textContent =
    numberSelected +
    " selected";


  downloadZipButton.disabled =
    numberSelected === 0 ||
    isPreparingZip;


  if (
    photos.length > 0 &&
    numberSelected ===
      photos.length
  ) {

    selectAllButton.textContent =
      "Deselect all";

  }

  else {

    selectAllButton.textContent =
      "Select all";

  }

}



/* =========================================================
   Select all / Deselect all
   ========================================================= */

function toggleSelectAll() {


  if (
    selectedIndexes.size ===
    photos.length
  ) {


    selectedIndexes.clear();


    document
      .querySelectorAll(
        ".photo"
      )
      .forEach(
        function(card) {


          card.classList.remove(
            "selected"
          );


          const indicator =
            card.querySelector(
              ".select-indicator"
            );


          if (indicator) {

            indicator.textContent =
              "";

          }


        }
      );


  }


  else {


    selectedIndexes =
      new Set(
        photos.map(
          function(
            _,
            index
          ) {

            return index;

          }
        )
      );


    document
      .querySelectorAll(
        ".photo"
      )
      .forEach(
        function(card) {


          card.classList.add(
            "selected"
          );


          const indicator =
            card.querySelector(
              ".select-indicator"
            );


          if (indicator) {

            indicator.textContent =
              "✓";

          }


        }
      );


  }


  updateSelectionUI();

}



/* =========================================================
   点击下载时才加载 ZIP 库，避免阻塞相册
   ========================================================= */

function loadZipLibrary() {

  if (typeof window.JSZip === "function") {
    return Promise.resolve(window.JSZip);
  }

  if (!jsZipPromise) {
    jsZipPromise = new Promise(function(resolve, reject) {
      const script = document.createElement("script");
      let timeoutId;

      function cleanup() {
        clearTimeout(timeoutId);
        script.onload = null;
        script.onerror = null;
      }

      function fail() {
        cleanup();
        script.remove();
        jsZipPromise = null;
        reject(new Error("ZIP support could not load."));
      }

      script.src = "https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js";
      script.async = true;

      script.onload = function() {
        if (typeof window.JSZip !== "function") {
          fail();
          return;
        }

        cleanup();
        resolve(window.JSZip);
      };

      script.onerror = fail;
      timeoutId = setTimeout(fail, 15000);
      document.head.appendChild(script);
    });
  }

  return jsZipPromise;
}


/* =========================================================
   Download selected originals as ZIP
   ========================================================= */

async function downloadSelectedAsZip() {


  if (
    isPreparingZip ||
    selectedIndexes.size === 0
  ) {

    return;

  }


  const indexes =
    Array
      .from(
        selectedIndexes
      )
      .sort(
        function(a, b) {

          return a - b;

        }
      );


  const selectedPhotos =
    indexes.map(
      function(index) {

        return photos[index];

      }
    );



  // =======================================================
  // 数量保护
  // =======================================================

  if (
    selectedPhotos.length >
    MAX_ZIP_PHOTOS
  ) {


    alert(
      "Please select no more than " +
      MAX_ZIP_PHOTOS +
      " photos at a time."
    );


    return;

  }



  // =======================================================
  // 文件大小保护
  // =======================================================

  const totalBytes =
    selectedPhotos.reduce(
      function(
        sum,
        photo
      ) {

        return (
          sum +
          (
            photo.size ||
            0
          )
        );

      },
      0
    );


  if (
    totalBytes >
    MAX_ZIP_BYTES
  ) {


    alert(
      "The selected originals are too large for one browser ZIP. Please select fewer photos."
    );


    return;

  }



  isPreparingZip =
    true;


  downloadZipButton.disabled =
    true;


  selectAllButton.disabled =
    true;


  cancelChooseButton.disabled =
    true;



  const originalButtonText =
    downloadZipButton.textContent;


  let zipLibraryReady = false;



  try {

    downloadZipButton.textContent = "Loading ZIP support...";

    const JSZip = await loadZipLibrary();
    zipLibraryReady = true;
    const zip = new JSZip();


    // =====================================================
    // 下载所有选中的原图
    // =====================================================

    for (
      let i = 0;
      i <
      selectedPhotos.length;
      i++
    ) {


      const photo =
        selectedPhotos[i];


      downloadZipButton.textContent =
        "Preparing " +
        (i + 1) +
        " / " +
        selectedPhotos.length;



      const response =
        await fetch(
          photo.src
        );


      if (!response.ok) {

        throw new Error(
          "Could not download " +
          photo.name
        );

      }



      const data =
        await response.arrayBuffer();



      zip.file(
        photo.name,
        data,
        {
          binary: true
        }
      );


    }



    // =====================================================
    // 创建 ZIP
    // =====================================================

    downloadZipButton.textContent =
      "Creating ZIP...";


    const blob =
      await zip.generateAsync({
        type: "blob",
        compression: "STORE"
      });



    // =====================================================
    // ZIP 文件名日期
    // =====================================================

    const now =
      new Date();


    const dateString =

      now.getFullYear() +
      "-" +

      String(
        now.getMonth() + 1
      ).padStart(
        2,
        "0"
      ) +

      "-" +

      String(
        now.getDate()
      ).padStart(
        2,
        "0"
      );



    // =====================================================
    // 下载 ZIP
    // =====================================================

    const blobUrl =
      URL.createObjectURL(
        blob
      );


    const link =
      document.createElement(
        "a"
      );


    link.href =
      blobUrl;


    link.download =
      "Photography-" +
      dateString +
      ".zip";


    document.body.appendChild(
      link
    );


    link.click();


    link.remove();



    setTimeout(
      function() {

        URL.revokeObjectURL(
          blobUrl
        );

      },
      30000
    );


  }


  catch (error) {


    console.error(
      error
    );


    alert(
      zipLibraryReady
        ? "The ZIP could not be created. Please try again with fewer photos."
        : "ZIP support could not load. Please check your connection and try again."
    );


  }


  finally {


    isPreparingZip =
      false;


    downloadZipButton.textContent =
      originalButtonText;


    selectAllButton.disabled =
      false;


    cancelChooseButton.disabled =
      false;


    updateSelectionUI();


  }

}



/* =========================================================
   Lightbox
   ========================================================= */

function openLightbox(
  index
) {

  currentIndex =
    index;


  updateLightbox();


  lightbox.classList.add(
    "open"
  );


  document.body.style.overflow =
    "hidden";


  showLightboxUI();

}



function updateLightbox() {

  const photo =
    photos[
      currentIndex
    ];


  lightboxImage.src =
    photo.src;


  lightboxImage.alt =
    photo.name;


  counter.textContent =
    (
      currentIndex +
      1
    ) +
    " / " +
    photos.length;


  download.href =
    photo.download;

}



function closeLightbox() {

  clearTimeout(
    hideUITimer
  );


  lightbox.classList.remove(
    "open",
    "hide-ui"
  );


  lightboxImage.src =
    "";


  document.body.style.overflow =
    "";

}



function previousPhoto() {

  currentIndex =
    (
      currentIndex -
      1 +
      photos.length
    ) %
    photos.length;


  updateLightbox();


  showLightboxUI();

}



function nextPhoto() {

  currentIndex =
    (
      currentIndex +
      1
    ) %
    photos.length;


  updateLightbox();


  showLightboxUI();

}



/* =========================================================
   Lightbox UI auto hide
   ========================================================= */

function showLightboxUI() {

  lightbox.classList.remove(
    "hide-ui"
  );


  clearTimeout(
    hideUITimer
  );


  hideUITimer =
    setTimeout(
      function() {


        if (
          lightbox.classList.contains(
            "open"
          )
        ) {


          lightbox.classList.add(
            "hide-ui"
          );


        }


      },
      2000
    );

}



/* =========================================================
   Choose buttons
   ========================================================= */

chooseButton.addEventListener(
  "click",
  enterChooseMode
);


cancelChooseButton.addEventListener(
  "click",
  exitChooseMode
);


selectAllButton.addEventListener(
  "click",
  toggleSelectAll
);


downloadZipButton.addEventListener(
  "click",
  downloadSelectedAsZip
);



/* =========================================================
   Lightbox buttons
   ========================================================= */

closeButton.addEventListener(
  "click",
  function(event) {

    event.stopPropagation();

    closeLightbox();

  }
);


prevButton.addEventListener(
  "click",
  function(event) {

    event.stopPropagation();

    previousPhoto();

  }
);


nextButton.addEventListener(
  "click",
  function(event) {

    event.stopPropagation();

    nextPhoto();

  }
);


download.addEventListener(
  "click",
  function(event) {

    event.stopPropagation();

  }
);



/* =========================================================
   Click black background
   ========================================================= */

lightbox.addEventListener(
  "click",
  function(event) {


    if (
      event.target ===
      lightbox
    ) {


      closeLightbox();


    }


  }
);



/* =========================================================
   Mouse / Touch
   ========================================================= */

lightbox.addEventListener(
  "mousemove",
  showLightboxUI
);


lightbox.addEventListener(
  "touchstart",
  showLightboxUI,
  {
    passive: true
  }
);



/* =========================================================
   Keyboard
   ========================================================= */

document.addEventListener(
  "keydown",
  function(event) {


    // Lightbox
    if (
      lightbox.classList.contains(
        "open"
      )
    ) {


      if (
        event.key ===
        "Escape"
      ) {

        closeLightbox();

      }


      if (
        event.key ===
        "ArrowLeft"
      ) {

        previousPhoto();

      }


      if (
        event.key ===
        "ArrowRight"
      ) {

        nextPhoto();

      }


      return;

    }



    // Choose mode
    if (
      chooseMode &&
      event.key ===
      "Escape"
    ) {


      exitChooseMode();


    }


  }
);



/* =========================================================
   Start
   ========================================================= */

loadPhotos();

</script>


</body>

</html>`;
