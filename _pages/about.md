---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>

<!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. Suspendisse condimentum, libero vel tempus mattis, risus risus vulputate libero, elementum fermentum mi neque vel nisl. Maecenas facilisis maximus dignissim. Curabitur mattis vulputate dui, tincidunt varius libero luctus eu. Mauris mauris nulla, scelerisque eget massa id, tincidunt congue felis. Sed convallis tempor ipsum rhoncus viverra. Pellentesque nulla orci, accumsan volutpat fringilla vitae, maximus sit amet tortor. Aliquam ultricies odio ut volutpat scelerisque. Donec nisl nisl, porttitor vitae pharetra quis, fringilla sed mi. Fusce pretium dolor ut aliquam consequat. Cras volutpat, tellus accumsan mattis molestie, nisl lacus tempus massa, nec malesuada tortor leo vel quam. Aliquam vel ex consectetur, vehicula leo nec, efficitur eros. Donec convallis non urna quis feugiat. -->

<!-- My research interest includes neural machine translation and computer vision. I have published more than 100 papers at the top international AI conferences with total <a href='https://scholar.google.com/citations?user=DhtAFkwAAAAJ'>google scholar citations <strong><span id='total_cit'>260000+</span></strong></a> (You can also use google scholar badge <a href='https://scholar.google.com/citations?user=DhtAFkwAAAAJ'><img src="https://img.shields.io/endpoint?url={{ url | url_encode }}&logo=Google%20Scholar&labelColor=f6f6f6&color=9cf&style=flat&label=citations"></a>). -->


Welcome to my Homepage! 

I am currently a Ph.D. student at the University of Science and Technology Beijing (USTB), under the supervision of [Professor Yu Meng](https://me.ustb.edu.cn/shiziduiwu/jiaoshixinxi/2022-03-24/543.html). My research interests focus on **Human Pose Estimation and Generation** in the field of deep learning, particularly in **Vehicle Active and Passive Protection Technology for Pedestrian Safety** in autonomous driving applications. Sharing, contributing, open-sourcing, and helping others are some of my greatest joys! Feel free to reach out to me anytime if you have any questions — [Contact me here 💬](https://github.com/wmj142326/contact/issues/new?title=Please write down your theme briefly&body=Hi%20there!%20I%20have%20a%20question...).

# 🔥 News
- *2025.05*: &nbsp;🎉🎉 I’m about to publish my new and exciting work — stay tuned!

# 📖 Educations
- *2023.09 - Now*, Ph.D in University of Science and Technology Beijing.
- *2020.09 - 2023.06*, M.S. in University of Science and Technology Beijing.
- *2016.09 - 2020.06*, B.S. in University of Science and Technology Beijing.

# 📝 Publications 

* You can find my all articles on [[Google Scholar]](https://scholar.google.com/citations?user=Ganf8zgAAAAJ&hl=en-US).
* You can find my all projects on [[Github]](https://github.com/wmj142326).

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">NeurIPS 2024</div><img src='images/PVCP.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[Pedestrian-Centric 3D Pre-collision Pose and Shape Estimation from Dashcam Perspective](https://scholar.google.com/scholar?hl=zh-CN&as_sdt=0%2C5&q=Pedestrian-Centric+3D+Pre-collision+Pose+and+Shape+Estimation+from+Dashcam+Perspective&btnG=)

**MeiJun Wang**, Yu Meng*, Zhongwei Qiu, Chao Zheng, Yan Xu, Pengxiaorui, Jian Gao

(*NeurIPS 2024*)  [[Paper]](https://proceedings.neurips.cc/paper_files/paper/2024/file/2c428bb07062012236519b589db63f34-Paper-Conference.pdf) · [[Code]](https://github.com/wmj142326/PVCP) · [[Annotation_Tools]](https://github.com/wmj142326/SMPL_Tools) · [[Video]](https://www.bilibili.com/video/BV1xek2YsEr8/?spm_id_from=333.999.0.0) · [[More]](https://neurips.cc/virtual/2024/poster/93814)<strong><span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span></strong>
- We constructed a pedestrian pre-collision pose dataset, PVCP, by collecting dashcam videos of pedestrian-vehicle collisions.
- We propose a two-stage pedestrian pre-collision pose and shape estimation network, PPSENet.

</div>
</div>

<!-- ######################################## -->

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">TITS 2024</div><img src='images/MBPR.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[Real-Time Reconstruction of Multi-Body Pedestrian Pre-Impact Posture in Collision Accidents From Monocular Images](https://scholar.google.com/scholar?hl=zh-CN&as_sdt=0%2C5&q=Real-Time+Reconstruction+of+Multi-Body+Pedestrian+Pre-Impact+Posture+in+Collision+Accidents+From+Monocular+Images&btnG=)

**MeiJun Wang**, Yu Meng*, Yan Xu, Quan Li, Bingbing Nie

(*TITS 2024*)  [[Paper]](https://ieeexplore.ieee.org/abstract/document/10746249) · [[Code]](https://github.com/wmj142326/MBPR)<strong><span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span></strong>
- We build a pedestrian-vehicle collision video dataset, annotated by camera viewpoints for case analysis and posture research.
- We propose a real-time vision-based pipeline to reconstruct pre-impact multi-body postures from real accident images.
</div>
</div>

<!-- ######################################## -->

- <div class="badge">TCSVT 2024</div>[Few-shot Point Cloud Semantic Segmentation via Support-Query Feature Interaction](https://scholar.google.com/scholar?hl=zh-CN&as_sdt=0%2C5&q=Few-shot+Point+Cloud+Semantic+Segmentation+via+Support-Query+Feature+Interaction&btnG=)
  
  Chao Zheng, Li Liu, Yu Meng, Xiaorui Peng, **Meijun Wang**
  
  (*TCSVT 2024*) IEEE Transactions on Circuits and Systems for Video Technology

---

- [Passable area segmentation for open-pit mine road from vehicle perspective](https://scholar.google.com/scholar?hl=zh-CN&as_sdt=0%2C5&q=+Meijun+Wang+Passable+area+segmentation+for+open-pit+mine+road+from+vehicle+perspective&btnG=)
  
  Chao Zheng, Li Liu, Yu Meng, **Meijun Wang**, Xianyao Jiang
  
  (*EAAI 2024*) Engineering Applications of Artificial Intelligence
  
---

- [Integrating Convolutional Guidance and Transformer Fusion with Markov Random Fields Smoothing for Monocular Depth Estimation](https://scholar.google.com/scholar?hl=zh-CN&as_sdt=0%2C5&q=Integrating+Convolutional+Guidance+and+Transformer+Fusion+with+Markov+Random+Fields+Smoothing+for+Monocular+Depth+Estimation&btnG=)
  
  Xiaorui Peng, Yu Meng; Boqiang Shi, Chao Zheng, **Meijun, Wang**

  (*EAAI 2025*) Engineering Applications of Artificial Intelligence

# 👨‍💼 Work Experience
- *2023.04 - 2023.09*, **Algorithm Intern @ Lenovo Research Institute**

# 🎖 Honors and Awards
- *2022*, **National Graduate Scholarship (Master’s)**
- *2022*, Contribution Award, **China Intelligent and Connected Vehicles Algorithm Competition (CIAC)**, Perception Track,
- *2021*, Awarded the Gold Prize, **the 5th “Three Minute Thesis” Academic Speech Competition**, USTB
- *2020*, First Prize, **International Contest of innovAtioN (iCAN)**, *Calmspoon Stabilizing Tableware*
- *2020*, Gold Award, **“Challenge Cup” Capital College Student Entrepreneurship Competition**, *Calmspoon Stabilizing Tableware* (“挑战杯”省赛金奖)

# 🧾 Patents

- *2022*, **A Vision-Based Method for Multi-Rigid-Body Pedestrian Pose Reconstruction** (一种基于视觉的多刚体行人模型姿态重建方法), Granted, 202111459545.5
- *2020*, **Electronic Anti-Shake Tableware** (一种电子防抖餐具), Granted, CN201910912611.6
- *2019*, **A Human-Weight-Driven Trash Bin for Compression and Solid-Liquid Separation** (一种以人体重力驱动的压缩及固液分离垃圾箱), Granted, CN201910679971.6

# 💬 Academic Service
- **Journal and Conference Reviewer**: NeurIPS2025, TCSVT, TITS, EAAI
  
# 🔗 Links

I am fortunate to collaborate closely with the following research partners:

- [Zhongwei Qiu](https://ericzw.github.io/). My senior colleague and research mentor, working on human-centric visual perception, multimodal learning, and generative models with applications in healthcare and science.

- [Guangxuan Song](https://sguangxuan.github.io/). My partner working on knowledge graphs and large language models, particularly in their application to scientific data analysis in materials science.

- Xin Qin. My partner in data-driven research on industrial fault diagnosis and process modeling.
  
In addition, I occasionally share text and video content on social media platforms.

* Welcome to my read sharing: [陌尘小小-Zhihu](https://www.zhihu.com/people/mochenxiaoxiao).
* Welcome to my video sharing: [陌尘小小-BiliBili](https://space.bilibili.com/384233049).

<div class="statistics-container" style="display: flex; align-items: center; justify-content: center; gap: 40px;">
  
  <!-- Left column: QR code image -->
  <div class="left-column">
    <img src="../images/QR code.png" alt="QR code" width="200" style="height: auto;">
  </div>

  <!-- Right column: ClustrMaps globe -->
  <div class="right-column" style="width: 200px; text-align: center;">
    <script type="text/javascript" id="clstr_globe" src="//clustrmaps.com/globe.js?d=nIIaYn4aNjIzUMyEjwNjD-sOoKr_XiXOAc5dhJBOicA"></script>
  </div>

</div>



