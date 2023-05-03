copy javidols(idol_name,idol_info,profile_pic,idol_id)
from '/Users/kokpanyau/Downloads/javidolsinfo.csv'
DELIMITER ','
CSV HEADER;

copy gallery(idol_name,idol_image,idol_id)
from '/Users/kokpanyau/Downloads/javidolsphotos.csv'
DELIMITER ','
CSV HEADER;