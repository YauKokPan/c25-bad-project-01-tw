copy javidols(idol_name,idol_info,profile_pic)
from '/Users/kokpanyau/Documents/c25-bad-project-01-tw/data/javidolsinfo.csv'
DELIMITER ','
CSV HEADER;

copy gallery(idol_name,idol_image,idol_id)
from '/Users/kokpanyau/Documents/c25-bad-project-01-tw/data/javidolsgallery.csv'
DELIMITER ','
CSV HEADER;

copy idolcode(idol_name,idol_code,idol_id,title,release_date)
from '/Users/kokpanyau/Documents/c25-bad-project-01-tw/data/javidolscode.csv'
DELIMITER ','
CSV HEADER;