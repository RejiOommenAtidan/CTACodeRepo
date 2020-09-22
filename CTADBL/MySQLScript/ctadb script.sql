Use ctadb;

CREATE TABLE `lstRegion` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sRegion_name` varchar(100) DEFAULT NULL,
  `sRegion_code` varchar(5) DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Place', 'None');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Bir Boetsog', 'BTS');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Bir Dege', 'BD');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Bangalore', 'BL');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Bhandara Norgeling', 'BN');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Bomdila/Tengang', 'BT');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Chauntra Nangchen', 'CN');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Dehradun', 'DD');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Darjeeling', 'DJ');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Delhi', 'DL');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Dalhousie Phuntsokling', 'DP');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Dhasa', 'DS');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Gangtok', 'GT');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Herbertpur Doegu Yougyaling', 'HB');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Hunsur Rabling', 'HR');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Kalimpong', 'KP');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Kollegal Dhondenling', 'KD');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Sataun', 'KK');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Kamrao', 'KR');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Kullu', 'KM');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Ladakh', 'LD');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Bylakuppe Lugsam', 'LS');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Miao Chophelling', 'MC');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Mundgod Doeguling', 'MD');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Mandi', 'MN');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Mainpat Phendeling', 'MP');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Bonshee New Thopgyal', 'BNT');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Odisha Phuntsoklimg', 'OP');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Poanta Cholsum', 'PC');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Puruwala Sakya', 'PS');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Ravangla', 'RV');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Tso Pema', 'RW');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Shillong', 'SH');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Shimla', 'SM');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Sonada Tashiling', 'ST');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Bylakuppe Dickyi Larso', 'TD');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Tuting', 'TT');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Tezu Dhargyaling', 'TZ');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Gyalsa Phakshing', 'GP');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Boudha Jorpati', 'CJ');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Jawalakhel', 'JH');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Sha-Wa-Ra', 'SW');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Tashiling', 'TL');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Tashi Palkyil', 'TP');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Lodrik', 'PLD');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('New South Wales', 'NSW');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Norfolk Island', 'NF');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Northen Territory', 'NT');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Queendsland', 'QL');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('South Australia', 'SA');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Tasmania', 'TA');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Victoria', 'VI');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Western Australia', 'AUW');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Alsace', 'FA');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Aquitaine', 'FB');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Auvergne', 'FC');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Basse-Normandie', 'FD');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Bretagne', 'FE');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Centre', 'FF');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Champagne Ardenne', 'FG');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Corse', 'FH');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Franche Comte', 'FI');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Haute-Normandie', 'FQ');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Ile-de-France', 'FJ');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Languedoc-Roussillon', 'FK');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Limousin', 'FRL');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Lorraine', 'FM');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Midi-Pyrenees', 'FN');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Nord-Pas-de-Calais', 'FO');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Pays de la loire', 'FR');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Picardie', 'FS');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Poitou Charentes', 'FT');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Provence-Alpes-Cote d\'Asur', 'FU');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Rhone-Alpes', 'FV');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Alabama', 'AL');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Alaska', 'AK');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Arizona', 'AZ');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Arkansas', 'AR');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('California', 'CA');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Colorado', 'CO');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Connecticut', 'CT');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Delaware', 'DE');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Florida', 'FL');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Georgia', 'GA');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Hawaii', 'HI');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Idaho', 'ID');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Illinois', 'IL');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Indiana', 'IN');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Iowa', 'IA');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Kansas', 'KS');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Kentucky', 'KY');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Louisiana', 'LA');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Maine', 'ME');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Maryland', 'MD');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Massachusetts', 'MA');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Michigan', 'MI');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Minnesota', 'MN');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Mississippi', 'MS');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Missouri', 'MO');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Montana', 'MT');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Nebraska', 'NE');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Nevada', 'NV');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('New Hamshire', 'NH');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('New Jersey', 'NJ');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('New Mexico', 'NM');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('New York', 'NY');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('North Carolina', 'NC');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('North Dakota', 'ND');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Ohio', 'OH');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Oklahoma', 'OK');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Oregon', 'OR');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Pennysylvania', 'PA');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Rhode Island', 'RI');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('South Carolina', 'SC');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('South Dakota', 'SD');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Tennessee', 'TN');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Texas', 'TX');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Utah', 'UT');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Vermont', 'VT');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Virginia', 'VA');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Washington', 'WA');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('West Virginia', 'WV');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Wisconsin', 'WI');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Wyoming', 'WY');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Alberta', 'AB');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('British Columbia', 'BC');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Manitoba', 'MB');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('New Brunswick', 'NB');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('New Foundland & Labrador', 'NL');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Nova Scotia', 'NS');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('North West Territories', 'NWT');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Nunavut', 'NU');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Ontario', 'ON');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Prince Edward Island', 'PE');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Quebec', 'QC');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Saskatchewan', 'WK');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Yukon', 'YT');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Stuttgart', 'BW');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Munich', 'BY');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Berlin', 'DBE');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Potsdam', 'BB');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Bremen', 'DHB');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Hamburg', 'HH');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Hesse-Wiesbaden', 'HE');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Lower Saxony-Hanover', 'NI');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Schwerin', 'MV');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('North Rhine-Westphallia', 'NRW');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Rhineland-Palatinate', 'RP');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Saarland', 'SL');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Saxony-Dresden', 'SN');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Saxony Anhalt-magdeburg', 'DST');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Schleswig-Holstein', 'DSH');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Thuringia', 'TH');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Zurich', 'ZH');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Bern', 'BE');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Lucerne', 'LU');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Uri', 'UR');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Schwyz', 'SZ');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Obwalden', 'OW');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Nidwalden', 'NW');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Glarus', 'GL');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Zug', 'ZG');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Fribourg', 'CFR');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Solothurn', 'LO');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Basel Stadt', 'BS');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Basel Landschaft', 'CBL');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Schaffhausen', 'CSH');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Appenzell Ausserrhoden', 'AR');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Appenzell Innerrhoden', 'AI');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('St.Gallen', 'SG');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Graubunden', 'GR');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Aargau', 'AG');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Thurgau', 'TG');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Ticino', 'TI');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('vaud', 'VD');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Valais', 'VS');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Neuchatel', 'NE');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Geneva', 'GE');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Jura', 'JU');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Dimapur', 'DMP');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Mussoorie', 'THF');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Chakrata', 'SFF');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Northland', 'NTL');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Auckland', 'AUK');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Walkato', 'WKO');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Bay of Plenty', 'BOP');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Gisbone', 'GIS');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Hawke\'s Bay', 'HKB');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Taranaki', 'TKI');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Manawtu-Wanganui', 'MWT');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Wellington', 'WGN');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Tasman', 'TAS');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Nelson', 'NSN');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Marlborough', 'MBH');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('West Coast', 'WTC');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Canterbury', 'CAN');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Otago', 'OTA');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Southland', 'STL');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Antwerpen', 'AN');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Limburg', 'LI');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Vlaams-Brabant', 'VB');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Oost-Vlaanderen', 'OV');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('West-Vlaanderen', 'WV');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Henegouwen', 'HT');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Walls-Brabant', 'BW');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Namen', 'NA');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Luik', 'LG');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Luxemburg', 'LX');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Varanasi', 'CUTS');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Druk Karche', 'KAR');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Druk Bhumthang', 'BUM');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Hongtsog', 'HNT');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Bodgar', 'BOD');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Jigmenang', 'JIG');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Khasaka', 'KHA');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Pado', 'PDO');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Thimphu', 'TMP');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Paljorling', 'PAL');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Tashi Jong', 'TJ');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Taiwan', 'TWI');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Austria', 'AT');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Barcelona', 'ESB');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Amsterdam', 'AMS');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Paris', 'PAR');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Mahe', 'MAHE');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Tokyo', 'TYO');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('London', 'LON');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Milan', 'MI');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Washington DC', 'WDC');
INSERT INTO `ctadb`.`lstregion` (`sRegion_name`, `sRegion_code`) VALUES ('Moscow', 'MOS');


CREATE TABLE `lstAuthRegion` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `sAuthRegion` text NOT NULL,
  `sCountryID` text NOT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Aargau', 'CH');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Alberta', 'CA');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Albuquerque', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Atlanta', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Austin', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Australia', 'AU');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Bangalore', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Basel', 'CH');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Belgium', 'BE');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Bern', 'CH');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Bhandara', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Bhodgarnang', 'BT');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Bhopal', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('BTS, Bir', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Dege, Bir', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Bodh Gaya', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Bomdila', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Boston', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Boudha', 'NP');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Boulder', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('British Columbia', 'CA');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Bumthang', 'BT');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Chakrata', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Charlottesville', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Chauntra', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Chicago', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Clement Town', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Colorado', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Connecticut', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Dalhousie', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Darjeeling', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Dekyiling', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Delhi', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Deutschland', 'DE');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Dharamsala', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Dhorpatan', 'NP');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Dickey Larsoe, Bylakuppe', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Dimapur', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Dolanji', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Flawil', 'CH');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Gangtok', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Geneva', 'CH');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Glarus', 'CH');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Herbertpur', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Hongtso', 'BT');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Horgen', 'CH');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Hungary', 'HU');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Hunsur', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Idaho', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Italy', 'IT');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Ithaca', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Jaigaon', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Jalpaiguri', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Jampaling', 'NP');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Jawalakhel', 'NP');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Jigmenang', 'BT');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('jorpati', 'NP');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Kalimpong', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Kamrao', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('karche', 'BT');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Kathmandu City', 'NP');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Khasakha', 'BT');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Kolkata', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Kollegal', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Kullu Manali', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Ladakh Jangthang', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Landquart', 'CH');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Leh', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Liechtenstein', 'LI');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Lindsay', 'CA');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('London', 'GB');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Lotserok', 'NP');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Lugsam, Bylakuppe', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Luzern', 'CH');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Madison', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Maine', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Mainpat', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Manang', 'NP');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Mandu Wala', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Massachusetts', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Miao', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Michigan', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Minnesota', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Missoula', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Montana', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Moscow', 'RU');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Muenchwilen', 'CH');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Mundgod', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Mussoorie', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Nainital', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('New York & New Jersey', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('North California', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Nubri', 'NP');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Oetwil', 'CH');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Ontario', 'CA');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Odisha', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Pado', 'BT');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Paljorling', 'NP');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Pandoh', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Paonta Sahib', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Paris', 'FR');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Pema Tsal', 'NP');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Pennsylvania', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Philadelphia', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Poland', 'PL');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Portland', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Pretoria', 'ZA');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Puruwala', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Quebec', 'CA');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Rajpur', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Rapperswil & Jona', 'CH');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('So Wa Ra', 'NP');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Ravangla', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Rikon', 'CH');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Rongshar', 'NP');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Ruti', 'CH');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Saharanpur', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Salt Lake City', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Salugara', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Santa Fe', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Sataun', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Schaffhausen', 'CH');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Seattle', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Shillong', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Shimla', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Solothurn', 'CH');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Solu Khumbu', 'NP');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Sonada', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Srinagar', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Swayambhu', 'NP');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Switzerland', 'CH');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Taiwan', 'TW');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Tashi Gang', 'NP');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Tashi Jong', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Tashi Ling', 'NP');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Tashi Palkhiel', 'NP');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Tenzin Gang', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Texas', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Tezu', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Thimphu', 'BT');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Tokyo', 'JP');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Toronto', 'CA');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Tuggen', 'CH');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Turbenthal', 'CH');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Tuting', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Utah', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Uznach', 'CH');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Varanasi', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Vermont', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Virginia', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Wadenswil', 'CH');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Walung', 'NP');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Washington', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Wattwil', 'CH');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Zurich', 'CH');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('South California', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Norway', 'NO');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Austria', 'AS');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Mandi', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Tso Pema', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Tawang', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Indiana', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Tsering Dhondhen', 'IN');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Capitol Area', 'US');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Lausanne', 'CH');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Trogen', 'CH');
INSERT INTO `ctadb`.`lstauthregion` (`sAuthRegion`, `sCountryID`) VALUES ('Washington DC', 'US');



CREATE TABLE `lstCountry` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `sCountryID` text DEFAULT NULL,
  `sCountry` text DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `lstCountry` (`sCountryID`, `sCountry`) VALUES ('AF','Afghanistan'),
('AL','Albania'),('DZ','Algeria'),('AS','Austria'),('AD','Andorra'),('AO','Angola'),
('AI','Anguilla'),('AQ','Antarctica'),('AG','Antigua and Barbuda'),('AR','Argentina'),
('AM','Armenia'),('AW','Aruba'),('AU','Australia'),('AS','Austria'),('AZ','Azerbaijan'),
('BS','Bahamas'),('BH','Bahrain'),('BD','Bangladesh'),('BB','Barbados'),('BY','Belarus'),
('BE','Belgium'),('BZ','Belize'),('BJ','Benin'),('BM','Bermuda'),('BT','Bhutan'),
('BO','Bolivia'),('BA','Bosnia & Herzegovina'),('BW','Botswana'),('BV','Bouvet Island'),
('BR','Brazil'),('IO','British Indian Ocean'),('BN','Brunei Darussalam'),('BG','Bulgaria'),
('BF','Burkina Faso'),('BI','Burundi'),('KH','Cambodia'),('CM','Cameroon'),('CA','Canada'),
('CV','Cape Verde'),('KY','Cayman Islands'),('CF','Central Africa Rep'),('TD','Chad'),('CL','Chile'),
('CN','China'),('CX','Christmas Island'),('CC','Cocos'),('CO','Colombia'),('KM','Comoros'),
('CG','Congo'),('CK','Cook Islands'),('CR','Costa Rica'),('CI','Ivory Coast'),
('HR','Croatia (Hrvatska'),('CU','Cuba'),('CY','Cyprus'),('CZ','Czech Republic'),
('DK','Denmark'),('DJ','Djibouti'),('DM','Dominica'),('DO','Dominican Republic'),
('TP','East Timor'),('EC','Ecuador'),('EG','Egypt'),('SV','El Salvador'),('GQ','Equatorial Guinea'),
('ER','Eritrea'),('EE','Estonia'),('ET','Ethiopia'),('FK','Falkland Islands'),('FO','Faroe Islands'),
('FJ','Fiji'),('FI','Finland'),('FR','France'),('FX','France, Metropolitan'),('GF','French Guiana'),
('PF','French Polynesia'),('TF','French Southern'),('GA','Gabon'),('GM','Gambia'),('GE','Georgia'),
('DE','Germany'),('GH','Ghana'),('GI','Gibraltar'),('GR','Greece'),('GL','Greenland'),('GD','Grenada'),
('GP','Guadeloupe'),('GU','Guam'),('GT','Guatemala'),('GN','Guinea'),('GW','Guinea-Bissau'),
('GY','Guyana'),('HT','Haiti'),('HM','Heard & McDonald'),('HN','Honduras'),('HK','Hong Kong'),
('HU','Hungary'),('IS','Iceland'),('IN','India'),('ID','Indonesia'),('IR','Iran'),('IQ','Iraq'),
('IE','Ireland'),('IL','Israel'),('IT','Italy'),('JM','Jamaica'),('JP','Japan'),('JO','Jordan'),
('KZ','Kazakhstan'),('KE','Kenya'),('KI','Kiribati'),('KP','Korea (North)'),('KR','Korea (South)'),
('KW','Kuwait'),('KG','Kyrgyzstan'),('LA','Laos'),('LV','Latvia'),('LB','Lebanon'),('LS','Lesotho'),
('LR','Liberia'),('LY','Libya'),('LI','Liechtenstein'),('LT','Lithuania'),('LU','Luxembourg'),('MO','Macau'),
('MK','Macedonia'),('MG','Madagascar'),('MW','Malawi'),('MY','Malaysia'),('MV','Maldives'),('ML','Mali'),
('MT','Malta'),('MH','Marshall Islands'),('MQ','Martinique'),('MR','Mauritania'),('MU','Mauritius'),
('YT','Mayotte'),('MX','Mexico'),('FM','Micronesia'),('MD','Moldova'),('MC','Monaco'),('MN','Mongolia'),
('MS','Montserrat'),('MA','Morocco'),('MZ','Mozambique'),('MM','Myanmar'),('NA','Namibia'),('NR','Nauru'),
('NP','Nepal'),('NL','Netherlands'),('AN','Netherlands Anti'),('NC','New Caledonia'),('NZ','New Zealand'),
('NI','Nicaragua'),('NE','Niger'),('NG','Nigeria'),('NU','Niue'),('NF','Norfolk Island'),('MP','Northern Mariana'),
('NO','Norway'),('OM','Oman'),('PK','Pakistan'),('PW','Palau'),('PA','Panama'),('PG','Papua Guinea'),
('PY','Paraguay'),('PE','Peru'),('PH','Philippines'),('PN','Pitcairn'),('PL','Poland'),('PT','Portugal'),
('PR','Puerto Rico'),('QA','Qatar'),('RE','Reunion'),('RO','Romania'),('RU','Russian Federation'),
('RW','Rwanda'),('KN','Saint Kitts'),('LC','Saint Lucia'),('VC','Saint Vincent'),('WS','Samoa'),
('SM','San Marino'),('ST','Sao Tome'),('SA','Saudi Arabia'),('SN','Senegal'),('SC','Seychelles'),
('SL','Sierra Leone'),('SG','Singapore'),('SK','Slovak Republic'),('SI','Slovenia'),('SB','Solomon Islands'),
('SO','Somalia'),('ZA','South Africa'),('GS','S. Georgia'),('SP','Spain'),('LK','Sri Lanka'),('SH','St. Helena'),
('PM','St. Pierre'),('SD','Sudan'),('SR','Suriname'),('SJ','Svalbard'),('SZ','Swaziland'),('SE','Sweden'),
('CH','Switzerland'),('SY','Syria'),('TW','Taiwan'),('TJ','Tajikistan'),('TZ','Tanzania'),('TH','Thailand'),
('TG','Togo'),('TK','Tokelau'),('TO','Tonga'),('TT','Trinidad & Tobago'),('TN','Tunisia'),('TR','Turkey'),
('TM','Turkmenistan'),('TC','Turks & Caicos Is'),('TV','Tuvalu'),('UG','Uganda'),('UA','Ukraine'),
('AE','United Arab Emirates'),('GB','Great Britain'),('US','United States of America'),('UM','US Minor Outlying'),
('UY','Uruguay'),('UZ','Uzbekistan'),('VU','Vanuatu'),('VA','Vatican City State'),('VE','Venezuela'),('VN','Viet Nam'),
('VG','Virgin Is(British)'),('VI','Virgin Is(US)'),('WF','Wallis and Futuna'),('EH','Western Sahara'),('YE','Yemen'),
('YU','Yugoslavia'),('ZR','Zaire'),('ZM','Zambia'),('ZW','Zimbabwe'),('TB','Tibet');

CREATE TABLE `lstoccupation` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sOccupationDesc` text NOT NULL,
  `sOccupationDescTibetan` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `ctadb`.`lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`) VALUES ('Aged', 'རྒས་ཁོགས།');
INSERT INTO `ctadb`.`lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`) VALUES ('Domestic Work', 'ནང་ལས།');
INSERT INTO `ctadb`.`lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`) VALUES ('Farmer', 'ཞིང་པ།');
INSERT INTO `ctadb`.`lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`) VALUES ('Retired', 'རྒས་ཡོལ།');
INSERT INTO `ctadb`.`lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`) VALUES ('Self Employed', 'རང་འཚོ།');
INSERT INTO `ctadb`.`lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`) VALUES ('Wage Earner', 'ཉི་གླ།');
INSERT INTO `ctadb`.`lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`) VALUES ('Salaried Job', 'གླ་ཡོད་ལས་རིགས།');
INSERT INTO `ctadb`.`lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`) VALUES ('Student', 'སློབ་ཕྲུག');
INSERT INTO `ctadb`.`lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`) VALUES ('Housewife', 'ནང་གི་ཨ་མ།');
INSERT INTO `ctadb`.`lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`) VALUES ('Business', 'ཚོང་ལས།');
INSERT INTO `ctadb`.`lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`) VALUES ('Professional', 'ཆེད་ལས་པ།');
INSERT INTO `ctadb`.`lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`) VALUES ('Monk', 'གྲྭ་པ།');
INSERT INTO `ctadb`.`lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`) VALUES ('[No Entry]', '');
INSERT INTO `ctadb`.`lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`) VALUES ('Not Employed', 'ལས་མེད།');
INSERT INTO `ctadb`.`lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`) VALUES ('Minor', 'བྱིས་པ།');
INSERT INTO `ctadb`.`lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`) VALUES ('Tantric Yana', 'སྔགས་པ།');
INSERT INTO `ctadb`.`lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`) VALUES ('Nomad', 'འབྲོག་པ།');
INSERT INTO `ctadb`.`lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`) VALUES ('Nun', 'བཙུན་མ།');

CREATE TABLE `lstProvince` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sProvince` text NOT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `ctadb`.`lstprovince` (`sProvince`) VALUES ('Dome');
INSERT INTO `ctadb`.`lstprovince` (`sProvince`) VALUES ('Dotoe');
INSERT INTO `ctadb`.`lstprovince` (`sProvince`) VALUES ('Utsang');
INSERT INTO `ctadb`.`lstprovince` (`sProvince`) VALUES ('Unknown');


CREATE TABLE `lstQualification` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sQualificationID` varchar(1) NOT NULL DEFAULT '',
  `sQualification` varchar(50) DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `ctadb`.`lstQualification` (`sQualificationID`, `sQualification`) VALUES ('A', 'Monastic Education');
INSERT INTO `ctadb`.`lstQualification` (`sQualificationID`, `sQualification`) VALUES ('G', 'Graduation');
INSERT INTO `ctadb`.`lstQualification` (`sQualificationID`, `sQualification`) VALUES ('M', 'Matriculation');
INSERT INTO `ctadb`.`lstQualification` (`sQualificationID`, `sQualification`) VALUES ('N', 'No Formal Education');
INSERT INTO `ctadb`.`lstQualification` (`sQualificationID`, `sQualification`) VALUES ('P', 'Primary');
INSERT INTO `ctadb`.`lstQualification` (`sQualificationID`, `sQualification`) VALUES ('R', 'Post Graduation');
INSERT INTO `ctadb`.`lstQualification` (`sQualificationID`, `sQualification`) VALUES ('S', 'Senior Secondary');
INSERT INTO `ctadb`.`lstQualification` (`sQualificationID`, `sQualification`) VALUES ('U', '[No Entry]');

CREATE TABLE `lstDOBApprox` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sDOBApproxID` varchar(1) NOT NULL DEFAULT '',
  `sDOBApproxName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `ctadb`.`lstDOBApprox` (`sDOBApproxID`, `sDOBApproxName`) VALUES ('N', 'Exact DOB');
INSERT INTO `ctadb`.`lstDOBApprox` (`sDOBApproxID`, `sDOBApproxName`) VALUES ('D', 'Day Approx');
INSERT INTO `ctadb`.`lstDOBApprox` (`sDOBApproxID`, `sDOBApproxName`) VALUES ('M', 'Month/Year Exact');
INSERT INTO `ctadb`.`lstDOBApprox` (`sDOBApproxID`, `sDOBApproxName`) VALUES ('Y', 'Year Only');



CREATE TABLE `lstTypeIssued` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sTypeIssued` text NOT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `ctadb`.`lstTypeIssued` (`sTypeIssued`) VALUES ('On Progress');
INSERT INTO `ctadb`.`lstTypeIssued` (`sTypeIssued`) VALUES ('Issued');
INSERT INTO `ctadb`.`lstTypeIssued` (`sTypeIssued`) VALUES ('Rejected');
INSERT INTO `ctadb`.`lstTypeIssued` (`sTypeIssued`) VALUES ('Double');
INSERT INTO `ctadb`.`lstTypeIssued` (`sTypeIssued`) VALUES ('Cancel');

CREATE TABLE `lstUserRights` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sUserRightsName` text NOT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `ctadb`.`lstUserRights` (`sUserRightsName`) VALUES ('Search');
INSERT INTO `ctadb`.`lstUserRights` (`sUserRightsName`) VALUES ('Entry');
INSERT INTO `ctadb`.`lstUserRights` (`sUserRightsName`) VALUES ('Book Issue');
INSERT INTO `ctadb`.`lstUserRights` (`sUserRightsName`) VALUES ('Edit');
INSERT INTO `ctadb`.`lstUserRights` (`sUserRightsName`) VALUES ('Admin');


CREATE TABLE `tblUser` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `_Id` int(11) DEFAULT NULL,
  `sUsername` text NOT NULL,
  `sFullName` text NOT NULL,
  `sOffice` text NOT NULL,
  `sPassword` text NOT NULL,
  `nUserRightsId` int(11) NOT NULL,
  `nActive` tinyint(1) NOT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `ctadb`.`tblUser` (`sUsername`, `sFullName`, `sOffice`, `sPassword`, `nUserRightsId`, `nActive`, `dtEntered`, `nEnteredBy`, `dtUpdated`, `nUpdatedBy`) 
	VALUES ('pankaj', 'Pankaj Gupta', 'TCRC Office', 'pankaj123', '5', '0',Null,1,Null,1);

INSERT INTO `ctadb`.`tblUser` (`sUsername`, `sFullName`, `sOffice`, `sPassword`, `nUserRightsId`, `nActive`, `dtEntered`, `nEnteredBy`, `dtUpdated`, `nUpdatedBy`) 
	VALUES ('reji', 'Reji Oommen', 'TCRC Office', 'reji123', '5', '0',Null,1,Null,1);

INSERT INTO `ctadb`.`tblUser` (`sUsername`, `sFullName`, `sOffice`, `sPassword`, `nUserRightsId`, `nActive`, `dtEntered`, `nEnteredBy`, `dtUpdated`, `nUpdatedBy`) 
	VALUES ('malay', 'Malay', 'TCRC Office', 'malay123', '5', '0',Null,1,Null,1);

INSERT INTO `ctadb`.`tblUser` (`sUsername`, `sFullName`, `sOffice`, `sPassword`, `nUserRightsId`, `nActive`, `dtEntered`, `nEnteredBy`, `dtUpdated`, `nUpdatedBy`) 
	VALUES ('aayush', 'Aayush', 'TCRC Office', 'aayush123', '5', '0',Null,1,Null,1);
	
INSERT INTO `ctadb`.`tblUser` (`sUsername`, `sFullName`, `sOffice`, `sPassword`, `nUserRightsId`, `nActive`, `dtEntered`, `nEnteredBy`, `dtUpdated`, `nUpdatedBy`)
	VALUES ('rajen', 'Rajen', 'TCRC Office', 'rajen123', '5', '0',Null,1,Null,1);



CREATE TABLE `lstRelation` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sRelation` text NOT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `ctadb`.`lstRelation` (`sRelation`) VALUES ('Father');
INSERT INTO `ctadb`.`lstRelation` (`sRelation`) VALUES ('Mother');
INSERT INTO `ctadb`.`lstRelation` (`sRelation`) VALUES ('Spouse');
INSERT INTO `ctadb`.`lstRelation` (`sRelation`) VALUES ('MaleChild');
INSERT INTO `ctadb`.`lstRelation` (`sRelation`) VALUES ('FemaleChild');
-- INSERT INTO `ctadb`.`lstRelation` (`sRelation`) VALUES ('Brother');
-- INSERT INTO `ctadb`.`lstRelation` (`sRelation`) VALUES ('Sister');

CREATE TABLE `lstMadebType` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sMadebType` text NOT NULL,
  `sMadebDisplayName` text NOT NULL,
  `sMadebDisplayKey` text NOT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `ctadb`.`lstMadebType` (`sMadebType`,`sMadebDisplayName`,`sMadebDisplayKey`) VALUES ('Sarso (New)','First Issued','F');
INSERT INTO `ctadb`.`lstMadebType` (`sMadebType`,`sMadebDisplayName`,`sMadebDisplayKey`) VALUES ('Norchoe (Change)','Modified Issued','M');
INSERT INTO `ctadb`.`lstMadebType` (`sMadebType`,`sMadebDisplayName`,`sMadebDisplayKey`) VALUES ('Bhorlak (Lost)','Lost Issued','L');
INSERT INTO `ctadb`.`lstMadebType` (`sMadebType`,`sMadebDisplayName`,`sMadebDisplayKey`) VALUES ('Abroad','Abroad','A');
INSERT INTO `ctadb`.`lstMadebType` (`sMadebType`,`sMadebDisplayName`,`sMadebDisplayKey`) VALUES ('Book Full','Book Full','U');
INSERT INTO `ctadb`.`lstMadebType` (`sMadebType`,`sMadebDisplayName`,`sMadebDisplayKey`) VALUES ('Brief GB','Brief GB','B');

use ctadb;

CREATE TABLE `lstFeature` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sFeature` text NOT NULL, 
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `ctadb`.`lstFeature` (`sFeature`) VALUES ('LoginPage');
INSERT INTO `ctadb`.`lstFeature` (`sFeature`) VALUES ('Home');
INSERT INTO `ctadb`.`lstFeature` (`sFeature`) VALUES ('Give GB No');
INSERT INTO `ctadb`.`lstFeature` (`sFeature`) VALUES ('Delete');
INSERT INTO `ctadb`.`lstFeature` (`sFeature`) VALUES ('Users');
INSERT INTO `ctadb`.`lstFeature` (`sFeature`) VALUES ('Report');
INSERT INTO `ctadb`.`lstFeature` (`sFeature`) VALUES ('Edit');
INSERT INTO `ctadb`.`lstFeature` (`sFeature`) VALUES ('Issue Book');
INSERT INTO `ctadb`.`lstFeature` (`sFeature`) VALUES ('Make List');
INSERT INTO `ctadb`.`lstFeature` (`sFeature`) VALUES ('Print');
INSERT INTO `ctadb`.`lstFeature` (`sFeature`) VALUES ('Give Serial');
INSERT INTO `ctadb`.`lstFeature` (`sFeature`) VALUES ('New Entry');
INSERT INTO `ctadb`.`lstFeature` (`sFeature`) VALUES ('Sarso Madeb');
INSERT INTO `ctadb`.`lstFeature` (`sFeature`) VALUES ('Norchoe Madeb');
INSERT INTO `ctadb`.`lstFeature` (`sFeature`) VALUES ('Bhorlak Madeb');
INSERT INTO `ctadb`.`lstFeature` (`sFeature`) VALUES ('Book full');
INSERT INTO `ctadb`.`lstFeature` (`sFeature`) VALUES ('Brief GB');
INSERT INTO `ctadb`.`lstFeature` (`sFeature`) VALUES ('Abroad');
INSERT INTO `ctadb`.`lstFeature` (`sFeature`) VALUES ('Change');
INSERT INTO `ctadb`.`lstFeature` (`sFeature`) VALUES ('Search');
INSERT INTO `ctadb`.`lstFeature` (`sFeature`) VALUES ('Sarso New GB Entry');
INSERT INTO `ctadb`.`lstFeature` (`sFeature`) VALUES ('Roles Feature Mapping');
INSERT INTO `ctadb`.`lstFeature` (`sFeature`) VALUES ('User Roles Manage');

-- -------------------------
-- --Link Tables------------
-- -------------------------

CREATE TABLE `lnkGBRelation` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sGBID` varchar(255) DEFAULT NULL,
  `sGBIDRelation` varchar(255) DEFAULT NULL,
  `nRelationID` int(11) NOT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;




-- -------------------------
-- --Transactional Tables---
-- -------------------------

CREATE TABLE `tblRecentlySearchedGB` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `nGBID` int(11) NOT NULL,
  `nUserID` int(11) NOT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


CREATE TABLE `tblMadeb` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `_Id` int(11) DEFAULT NULL,
  `nFormNumber` int(11) NOT NULL,
  `sGBID` varchar(255) DEFAULT NULL,
  `nMadebTypeID` int(11) DEFAULT NULL,
  `sName` text NOT NULL,
  `sFathersName` varchar(100) DEFAULT NULL,
  `nAuthRegionID` int(11) NOT NULL,
  `dtReceived` date NOT NULL,
  `dtIssueAction` date NOT NULL,
  `nIssuedOrNotID` int(11) NOT NULL,
  `nType` int(11) NOT NULL,
  `sChangeField` varchar(200) DEFAULT NULL,
  `sOfficeOfTibetan` varchar(1000) DEFAULT NULL,
  `sDocumentAttached` varchar(200) DEFAULT NULL,
  `nCurrentGBSno` int(11) DEFAULT NULL,
  `nPreviousGBSno` int(11) DEFAULT NULL,
  `nSaneyFormNo` int(11) DEFAULT NULL,
  `nReceiptNo` int(11) DEFAULT NULL,
  `dtEmailSend` date DEFAULT NULL,
  `sAlias` varchar(200) DEFAULT NULL,
  `sApprovedReject` varchar(200) DEFAULT NULL,
  `dtReject` date DEFAULT NULL,
  `dtReturnEmail` date DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`),
  KEY `nAuthRegionID` (`nAuthRegionID`)
) ENGINE=InnoDB AUTO_INCREMENT=10691 DEFAULT CHARSET=latin1;

CREATE TABLE `tblGreenBook` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `_Id` int(11) DEFAULT NULL,
  `sGBID` varchar(255) DEFAULT NULL,
  `nAuthRegionID` int(11) NOT NULL,
  
  `sFirstName` varchar(255) DEFAULT NULL,
  `sMiddleName` varchar(255) DEFAULT NULL,
  `sLastName` varchar(255) DEFAULT NULL,
  `sFamilyName` varchar(255) DEFAULT NULL,
  `sGender` varchar(255) DEFAULT NULL,
  `dtDOB` date NOT NULL,
  `sDOBApprox` varchar(255) DEFAULT NULL,
  `sBirthPlace` varchar(255) DEFAULT NULL,
  `sBirthCountryID` varchar(255) DEFAULT NULL,
  `sOriginVillage` varchar(255) DEFAULT NULL,
  `sOriginProvinceID` varchar(255) DEFAULT NULL,
  `sMarried` varchar(255) DEFAULT NULL,
  `sOtherDocuments` text NOT NULL,
  `sResidenceNumber` varchar(255) DEFAULT NULL,
  `sQualificationID` varchar(255) DEFAULT NULL,
  `sOccupationID` varchar(255) DEFAULT NULL,
  `sAliasName` varchar(200) NOT NULL,
  
  `sOldGreenBKNo` varchar(255) DEFAULT NULL,
  `sFstGreenBkNo` varchar(255) DEFAULT NULL,
  `dtFormDate` date DEFAULT NULL,

  `sFathersName` varchar(255) DEFAULT NULL,
  `sFathersID` varchar(255) DEFAULT NULL,
  `sFathersGBID` varchar(255) DEFAULT NULL,
  `sMothersName` varchar(255) DEFAULT NULL,
  `sMothersID` varchar(255) DEFAULT NULL,
  `sMothersGBID` varchar(255) DEFAULT NULL,
  `sSpouseName` varchar(255) DEFAULT NULL,
  `sSpouseID` varchar(255) DEFAULT NULL,
  `sSpouseGBID` varchar(255) DEFAULT NULL,
  `nChildrenM` int(11) NOT NULL,
  `nChildrenF` int(11) NOT NULL,

  `sAddress1` varchar(255) DEFAULT NULL,
  `sAddress2` varchar(255) DEFAULT NULL,
  `sCity` varchar(255) DEFAULT NULL,
  `sState` varchar(255) DEFAULT NULL,
  `sPCode` varchar(255) DEFAULT NULL,
  `sCountryID` varchar(255) DEFAULT NULL,
  `sEmail` varchar(255) DEFAULT NULL,
  `sPhone` varchar(255) DEFAULT NULL,
  `sFax` varchar(255) DEFAULT NULL,

  `dtDeceased` date NOT NULL,
  `sBookIssued` varchar(255) DEFAULT NULL,
  `dtValidityDate` date NOT NULL,
  `sPaidUntil` text NOT NULL,
  
  `TibetanName` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `TBUPlaceOfBirth` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `TBUOriginVillage` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `TBUFathersName` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `TBUMothersName` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `TBUSpouseName` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  
  `sEnteredDateTime` text DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,

  PRIMARY KEY (`id`),
  KEY `nAuthRegionID` (`nAuthRegionID`)
) ENGINE=InnoDB AUTO_INCREMENT=156426 DEFAULT CHARSET=utf8;

CREATE TABLE `tblGivenGBID` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `_Id` int(11) DEFAULT NULL,
  `nGBId` int(11) NOT NULL,
  `nFormNo` int(11) NOT NULL,
  `dtDate` date NOT NULL,
  `nGivenOrNot` tinyint(1) NOT NULL,
  `nActive` tinyint(1) NOT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`),
  KEY `nGBId` (`nGBId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- select nGBId from ctadb.tblGivenGBID order by nGBId desc limit 0,1;


CREATE TABLE `tblGreenBookIssued` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `nGBId` int(11) DEFAULT NULL,
  `dtIssuedDate` date DEFAULT NULL,
  `sWhyIssued` varchar(10) DEFAULT NULL,
  `nMadebTypeId` varchar(10) DEFAULT NULL,
  `nTypeIssuedId` int(11) NOT NULL,
  `sFormNo` text NOT NULL,
  `sWhereIssued` int(11) NOT NULL,
  `nPrinted` tinyint(4) NOT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  `sRemarks` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `nGBId` (`nGBId`)
) ENGINE=InnoDB AUTO_INCREMENT=176236 DEFAULT CHARSET=latin1;


CREATE TABLE `tblGreenBookSerial` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `nBookNo` int(11) DEFAULT NULL,
  `sGBId` varchar(255) DEFAULT NULL,
  `Remarks` text NOT NULL,
  `dtDate` date DEFAULT NULL,
  `sName` varchar(200) DEFAULT NULL,
  `sCountryID` text DEFAULT NULL,
  `nMadebTypeId` int(11) DEFAULT NULL,
  `nAuthRegionId` varchar(200) DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`),
  KEY `sGBId` (`sGBId`)
) ENGINE=InnoDB AUTO_INCREMENT=44030 DEFAULT CHARSET=latin1;


CREATE TABLE `lnkGBNote` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sGBId` varchar(255) DEFAULT NULL,
  `sNote` longtext DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  PRIMARY KEY (`Id`),
  KEY `sGBId` (`sGBId`)
) ENGINE=InnoDB AUTO_INCREMENT=27870 DEFAULT CHARSET=latin1;


CREATE TABLE `lnkGBChildren` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sGBIDParent` varchar(255) DEFAULT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `DOB` datetime DEFAULT NULL,
  `Gender` varchar(1) DEFAULT NULL,
  `ChildID` varchar(50) DEFAULT NULL,
  `sGBIDChild` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `sGBIDParent` (`sGBIDParent`)
) ENGINE=InnoDB AUTO_INCREMENT=109498 DEFAULT CHARSET=latin1;


CREATE TABLE `tblActionLogger` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sActionType` varchar(255) DEFAULT NULL,
  `sModuleName` varchar(255) DEFAULT NULL,
  `sEventName` varchar(255) DEFAULT NULL,
  `sDescription` varchar(255) DEFAULT NULL,
  `dtEntered` DateTime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `tblAuditLog` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `dtEntered` datetime DEFAULT NULL,
  `nFeatureID` int(11) NOT NULL,
  `nRegionID` int(11) NOT NULL,
  `nRecordID` int(11) NOT NULL,
  `sFieldValuesOld` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `sFieldValuesNew` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `nEnteredBy` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;




-- 
-- Store Procedure GreenBook By GBID
-- 

DROP procedure IF EXISTS `spGetGreenBookByGBID`;

DELIMITER $$
USE `ctadb`$$
CREATE PROCEDURE `spGetGreenBookByGBID` (IN sGBIDIN VARCHAR(255))
BEGIN
	SELECT * FROM tblgreenbook where sGBID = sGBIDIN;
END$$

DELIMITER ;


DROP procedure IF EXISTS `spGetNewGreenBookDataByFormNo`;

DELIMITER $$
USE `ctadb`$$
CREATE PROCEDURE `spGetNewGreenBookDataByFormNo` (IN nFormNumberIN int(11))
BEGIN
	select ID, sAuthRegion from lstauthregion;
	select ID, sCountry from lstcountry ;
	select Id, sProvince from lstProvince;
	select Id, sQualification from lstQualification;
	select Id, sOccupationDesc from lstoccupation;
	select Id, sDOBApproxName from lstDOBApprox;
	select * from tblMadeb 
	where nMadebTypeId = 1 and nFormNumber = nFormNumberIN;
END$$

DELIMITER ;


DROP procedure IF EXISTS `spGetNewMadebData`;

DELIMITER $$
USE `ctadb`$$
CREATE PROCEDURE `spGetNewMadebData` ()
BEGIN
	select Id, sMadebDisplayName from lstmadebtype;
    select ID, sAuthRegion from lstauthregion;
    select Id, sTypeIssued from lsttypeissued;
	select 7000 as nFormNumber;
	-- select IF(IFNULL(nFormNumber,0), IFNULL(nFormNumber,0) + 1,7000) as nFormNumber from tblmadeb order by nFormNumber desc limit 0,1;
END$$

DELIMITER ;