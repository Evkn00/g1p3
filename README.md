# Project 3 - Story Telling with Data Visualisations
_Data Analytics BootCamp (updated 26/07/2023)_
# Group 1
Contributors:  
David Baldwin, Juanita Sands, Tim Cook

We have been tasked with creating a HTML file to tell a story, that includes 3 data visualisations.

We have chosen to create our HTML page using a [geojson dataset](https://data.sa.gov.au/data/dataset/shipwrecks) of South Australian shipwrecks. The dataset includes all known shipwrecks in SA and adjacent waters.

To create the HTML page we have utilised [Python Flask-powered API](https://flask.palletsprojects.com/en/2.3.x/), [HTML/CSS](https://html.com/), [JavaScript](https://www.javascript.com/), [D3](https://d3js.org/), [Python](https://www.python.org/), [jupyter](https://jupyter.org/), [pyMongo](https://pymongo.readthedocs.io/en/stable/), [MongoDB](https://www.mongodb.com/), [Leaflet](https://leafletjs.com/), [Plotly](https://plotly.com/javascript/), [noUiSlider](https://refreshless.com/nouislider/) and [Bootstrap](https://www.bootstrapcdn.com/).

While the dataset contains a lot of data, our visualisation and story telling focused on: Build date, Loss date, Country, Hull description, Loss cause, region and Rig Description (type of ship)<img src="static/images/barque.png" alt="ship" width="30" height="30">.

**Visualisations**    

_All visualisations are driven by the slider at the top of the page. The slider is based on the date the shipwreck occured._

- _Map Visualisation_  
    - The purpose of the map is to visually show the locations of shipwrecks in South Australia and adjacent waters.  
    - Each shipwreck is represented by a marker on the map. The type of ship is depicted using an image, providing a quick visual identification.  
    - The map offers interactivity through a legend, allowing users to filter shipwrecks based on ship types. Clicking on a ship type in the legend shows or hides the corresponding markers on the map, enabling users to focus on specific ship types.  
    - Users can also interact with the map by zooming in to explore individual shipwreck locations in more detail.  
    - When used in conjunction with the slider, the map allows users to gain insights into the distribution of shipwrecks over time, regions, and types of ships. By adjusting the slider, users can observe how shipwrecks are distributed across different periods, providing valuable historical and geographical perspectives.  

- _Storybook Visualisation_    
     -   The storybook feature is activated when users click on an individual shipwreck marker on the map.
     -   Upon clicking a marker, a storybook-style display appears, presenting detailed information about the selected shipwreck.
     -   The storybook includes essential details such as Loss Date, Loss Location, Loss Cause, Build Date, Hull Description, Port Built, Rig Description, and Wreck Number.
     -   This storytelling approach allows users to delve into specific shipwreck narratives, providing a deeper understanding of each event and its historical significance.  

- plots
   -    to be updated once complete  

__    **Add visualation once complete of a screenshot of the map visualisation.**__


**Installation:**

Please clone the github and then perform the following to allow the HTML file to run correctly:
- run [main.ipynb](main.ipynb)
- run [app.py](app.py)
- install [Flask Cors](https://pypi.org/project/Flask-Cors/) if not already installed
- setup a [local host](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Tools_and_setup/set_up_a_local_testing_server)
- Load project in Google Chrome Incognito window

Please note:
- CORS errors due to local hosting have been different on all 3 of our machines, but as of now it is working on all 3 (2 windows, 1 mac). The IPYNB to create the mongo server functions slighty differently for each of us (due to the various use of / \ by local machines).

**Contents:**
- [app.py](app.py) - Flask Server
- [main.ipynb](main.ipynb) - Mongo db setup + flask setup
- [logic.js](static/js/logic.js) - main js file including mapping and click monitoring
- [.js files](static/js) - js files with stand alone functions to support running of the main js file
- [style.css](static/css/style.css) - main file styling
- [TOPO_Shipwrecks_GDA2020.geojson](data/TOPO_Shipwrecks_GDA2020.geojson) - original geojson data file. Unfortunately the datasource does not have a live version, so can only be downloaded as .zip.
- [index.html](index.html) - html file for display.
- [Images](static/images) - includes icons for map and background image. Icons sourced from [Etsy](https://www.etsy.com/au/shop/GJBClipArts?ref=l2-about-shopname)
- [Presentation](Presentation/Presentation%20Slides.pptx) - Presentation outlining our project

  **Attributes**

  Code has been sourced from in class activities, along with the websites outline above for each code utilised, along with the assistance of sites such as stack overflow when errors arose.

**Attributes**

Code has been sourced from in class activities, along with the websites outline above for each code utilised, along with the assistance of sites such as stack overflow when errors arose.

**License**

This project is open-source and available under the [Creative Common License](https://creativecommons.org/licenses/by/4.0/). You are free to use, modify, and distribute the code in accordance with the terms of the CC License ![88x31](https://github.com/Evkn00/g1p3/assets/127099343/014e8657-cc39-4673-954d-883e08bb2cc7).

The shipwreck dataset is also covered by [Creative Common License](https://creativecommons.org/licenses/by/4.0/) ![88x31](https://github.com/Evkn00/g1p3/assets/127099343/014e8657-cc39-4673-954d-883e08bb2cc7)