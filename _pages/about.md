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


Thank you for visiting my website! I'm always happy to connect—feel free to reach out.

My research interests lie at the knowledge graphs and large language models, particularly in their application to scientific data analysis in materials science. I also have a growing interest in exploring how these technologies can support medical research.

A guiding principle I live by is: **Do good work, and don’t worry too much about the outcome. (但行好事，莫问前程。)** I believe that focusing on meaningful efforts will naturally lead to meaningful results.


<!-- # 🔥 News -->
<!-- - *2022.02*: &nbsp;🎉🎉 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.  -->
<!-- - *2022.02*: &nbsp;🎉🎉 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.  -->

# 📝 Publications 

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">Under Review</div><img src='images/NRKG-500x300.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[Bridging the Semantic-Numerical Gap: A Numerical Reasoning Method of Cross-modal Knowledge Graph for Material Property Prediction](https://arxiv.org/abs/2312.09744)

**Guangxuan Song**, Dongmei Fu, Zhongwei Qiu, Zijiang Yang, Jiaxin Dai, Lingwei Ma, and Dawei Zhang

[**Code and Dataset**](https://github.com/MatrixBrain/NR-KG) <strong><span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span></strong>
- We proposed NR-KG, a cross-modal knowledge graph framework that jointly models semantic and numerical information for material property prediction.
- By addressing the challenges of small-sample scientific data, NR-KG achieves significant improvements over state-of-the-art methods and contributes new benchmark datasets to the field.
</div>
</div>

<!-- ######################################## -->

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">Under Review</div><img src='images/TSNet-500x300.jpg' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[Taylor-Sensus Network: Embracing Noise to Enlighten Uncertainty for Scientific Data](https://arxiv.org/abs/2409.07942)

**Guangxuan Song**, Dongmei Fu, Zhongwei Qiu, Jintao Meng, and Dawei Zhang

<!-- [**Code and Dataset**](https://github.com/MatrixBrain/NR-KG) <strong><span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span></strong> -->
- We proposed TSNet, a novel Taylor series-based network that explicitly models heteroscedastic noise and estimates both aleatoric and epistemic uncertainty in scientific data.
- TSNet demonstrates superior robustness and predictive performance across various benchmarks, offering a principled approach to uncertainty modeling in AI for Science.
</div>
</div>


<!-- ######################################## -->

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">AECE 2025</div><img src='images/AECE-500x300.jpg' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[A Message Passing Neural Network Framework with Learnable PageRank for Author Impact Assessment](https://aece.ro/abstractplus.php?year=2025&number=1&article=2)

**Guangxuan Song**, Dongmei Fu, and Xiaomeng Wu

<!-- [**Code and Dataset**](https://github.com/MatrixBrain/NR-KG) <strong><span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span></strong> -->
- We developed NPRNet, a neural-enhanced PageRank framework that integrates graph topology with spatial and attribute information to assess author influence more effectively.
- Our method improves computational efficiency and better reflects current research dynamics, offering a data-driven tool for scholarly evaluation.
</div>
</div>


- [From Knowledge Graph Development to Serving Industrial Knowledge Automation: A Review](https://ieeexplore.ieee.org/abstract/document/9901564/)
  
  **Guangxuan Song**, Dongmei Fu, and Dawei Zhang
  
  **2022 41st Chinese Control Conference (CCC)**

- [Cross-category prediction of corrosion inhibitor performance based on molecular graph structures via a three-level message passing neural network model](https://www.sciencedirect.com/science/article/abs/pii/S0010938X22006989)
  
  Jiaxin Dai, Dongmei Fu, **Guangxuan Song**, Lingwei Ma, Xin Guo, Arjan Mol, Ivan Cole, and Dawei Zhang
  
  **Corrosion Science 2023**

- [A Named Entity Extraction Method for Commonly Used Steel Knowledge Graph](https://link.springer.com/chapter/10.1007/978-981-16-6320-8_74)
  
  Zeqi Ma, Lingwei Ma, Dongmei Fu, Guangxuan Song, and Dawei Zhang
  
  **2021 Chinese Intelligent Systems Conference**



# 🎖 Honors and Awards
- *2021.10* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 
- *2021.09* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 

# 📖 Educations
- *2019.06 - 2022.04 (now)*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 
- *2015.09 - 2019.06*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 

# 💬 Invited Talks
- *2021.06*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 
- *2021.03*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.  \| [\[video\]](https://github.com/)

# 💻 Internships
- *2019.05 - 2020.02*, [Lorem](https://github.com/), China.