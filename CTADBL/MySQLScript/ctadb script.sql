Use ctadb;

CREATE TABLE `lstOfficeOfTibetan` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sOOT_Place` varchar(100) DEFAULT NULL,
  `sCuurency_Name` varchar(100) DEFAULT NULL,
  `sCuurency_Code` varchar(5) DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;


INSERT INTO `lstofficeoftibetan`
(`Id`,
`sOOT_Place`,
`sCuurency_Name`,
`sCuurency_Code`,
`dtEntered`,
`nEnteredBy`,
`dtUpdated`,
`nUpdatedBy`)
VALUES
(1,'Office of Tibet DC','US Dollar','USD',now(),1,now(),1),
(2,'Switzerland','Swiss Franc','CHF',now(),1,now(),1),
(3,'England','Pound Sterling','GBP',now(),1,now(),1),
(4,'Australia','Australian Dollar','AUD',now(),1,now(),1),
(5,'France','Euro','EUR',now(),1,now(),1),
(6,'Japan','Yen','JPY',now(),1,now(),1),
(7,'Russia','Russian Ruble','RUB',now(),1,now(),1),
(8,'Taiwan','New Taiwan Dollar','TWD',now(),1,now(),1),
(9,'South Africa','Rand','ZAR',now(),1,now(),1),
(10,'Belgium','Euro','EUR',now(),1,now(),1);


CREATE TABLE `lstRegion` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sRegion_name` varchar(100) DEFAULT NULL,
  `sRegion_code` varchar(5) DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;

INSERT INTO `lstregion` (`sRegion_name`, `sRegion_code`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) 
VALUES ('Place', 'None',now(),1,now(),1),
('Bir Boetsog', 'BTS',now(),1,now(),1)
,('Bir Dege', 'BD',now(),1,now(),1)
,('Bangalore', 'BL',now(),1,now(),1)
,('Bhandara Norgeling', 'BN',now(),1,now(),1)
,('Bomdila/Tengang', 'BT',now(),1,now(),1)
,('Chauntra Nangchen', 'CN',now(),1,now(),1)
,('Dehradun', 'DD',now(),1,now(),1)
,('Darjeeling', 'DJ',now(),1,now(),1)
,('Delhi', 'DL',now(),1,now(),1)
,('Dalhousie Phuntsokling', 'DP',now(),1,now(),1)
,('Dhasa', 'DS',now(),1,now(),1)
,('Gangtok', 'GT',now(),1,now(),1)
,('Herbertpur Doegu Yougyaling', 'HB',now(),1,now(),1)
,('Hunsur Rabling', 'HR',now(),1,now(),1)
,('Kalimpong', 'KP',now(),1,now(),1)
,('Kollegal Dhondenling', 'KD',now(),1,now(),1)
,('Sataun', 'KK',now(),1,now(),1)
,('Kamrao', 'KR',now(),1,now(),1)
,('Kullu', 'KM',now(),1,now(),1)
,('Ladakh', 'LD',now(),1,now(),1)
,('Bylakuppe Lugsam', 'LS',now(),1,now(),1)
,('Miao Chophelling', 'MC',now(),1,now(),1)
,('Mundgod Doeguling', 'MD',now(),1,now(),1)
,('Mandi', 'MN',now(),1,now(),1)
,('Mainpat Phendeling', 'MP',now(),1,now(),1)
,('Bonshee New Thopgyal', 'BNT',now(),1,now(),1)
,('Odisha Phuntsoklimg', 'OP',now(),1,now(),1)
,('Poanta Cholsum', 'PC',now(),1,now(),1)
,('Puruwala Sakya', 'PS',now(),1,now(),1)
,('Ravangla', 'RV',now(),1,now(),1)
,('Tso Pema', 'RW',now(),1,now(),1)
,('Shillong', 'SH',now(),1,now(),1)
,('Shimla', 'SM',now(),1,now(),1)
,('Sonada Tashiling', 'ST',now(),1,now(),1)
,('Bylakuppe Dickyi Larso', 'TD',now(),1,now(),1)
,('Tuting', 'TT',now(),1,now(),1)
,('Tezu Dhargyaling', 'TZ',now(),1,now(),1)
,('Gyalsa Phakshing', 'GP',now(),1,now(),1)
,('Boudha Jorpati', 'CJ',now(),1,now(),1)
,('Jawalakhel', 'JH',now(),1,now(),1)
,('Sha-Wa-Ra', 'SW',now(),1,now(),1)
,('Tashiling', 'TL',now(),1,now(),1)
,('Tashi Palkyil', 'TP',now(),1,now(),1)
,('Lodrik', 'PLD',now(),1,now(),1)
,('New South Wales', 'NSW',now(),1,now(),1)
,('Norfolk Island', 'NF',now(),1,now(),1)
,('Northen Territory', 'NT',now(),1,now(),1)
,('Queendsland', 'QL',now(),1,now(),1)
,('South Australia', 'SA',now(),1,now(),1)
,('Tasmania', 'TA',now(),1,now(),1)
,('Victoria', 'VI',now(),1,now(),1)
,('Western Australia', 'AUW',now(),1,now(),1)
,('Alsace', 'FA',now(),1,now(),1)
,('Aquitaine', 'FB',now(),1,now(),1)
,('Auvergne', 'FC',now(),1,now(),1)
,('Basse-Normandie', 'FD',now(),1,now(),1)
,('Bretagne', 'FE',now(),1,now(),1)
,('Centre', 'FF',now(),1,now(),1)
,('Champagne Ardenne', 'FG',now(),1,now(),1)
,('Corse', 'FH',now(),1,now(),1)
,('Franche Comte', 'FI',now(),1,now(),1)
,('Haute-Normandie', 'FQ',now(),1,now(),1)
,('Ile-de-France', 'FJ',now(),1,now(),1)
,('Languedoc-Roussillon', 'FK',now(),1,now(),1)
,('Limousin', 'FRL',now(),1,now(),1)
,('Lorraine', 'FM',now(),1,now(),1)
,('Midi-Pyrenees', 'FN',now(),1,now(),1)
,('Nord-Pas-de-Calais', 'FO',now(),1,now(),1)
,('Pays de la loire', 'FR',now(),1,now(),1)
,('Picardie', 'FS',now(),1,now(),1)
,('Poitou Charentes', 'FT',now(),1,now(),1)
,('Provence-Alpes-Cote d''Asur', 'FU',now(),1,now(),1)
,('Rhone-Alpes', 'FV',now(),1,now(),1)
,('Alabama', 'AL',now(),1,now(),1)
,('Alaska', 'AK',now(),1,now(),1)
,('Arizona', 'AZ',now(),1,now(),1)
,('Arkansas', 'AR',now(),1,now(),1)
,('California', 'CA',now(),1,now(),1)
,('Colorado', 'CO',now(),1,now(),1)
,('Connecticut', 'CT',now(),1,now(),1)
,('Delaware', 'DE',now(),1,now(),1)
,('Florida', 'FL',now(),1,now(),1)
,('Georgia', 'GA',now(),1,now(),1)
,('Hawaii', 'HI',now(),1,now(),1)
,('Idaho', 'ID',now(),1,now(),1)
,('Illinois', 'IL',now(),1,now(),1)
,('Indiana', 'IN',now(),1,now(),1)
,('Iowa', 'IA',now(),1,now(),1)
,('Kansas', 'KS',now(),1,now(),1)
,('Kentucky', 'KY',now(),1,now(),1)
,('Louisiana', 'LA',now(),1,now(),1)
,('Maine', 'ME',now(),1,now(),1)
,('Maryland', 'MD',now(),1,now(),1)
,('Massachusetts', 'MA',now(),1,now(),1)
,('Michigan', 'MI',now(),1,now(),1)
,('Minnesota', 'MN',now(),1,now(),1)
,('Mississippi', 'MS',now(),1,now(),1)
,('Missouri', 'MO',now(),1,now(),1)
,('Montana', 'MT',now(),1,now(),1)
,('Nebraska', 'NE',now(),1,now(),1)
,('Nevada', 'NV',now(),1,now(),1)
,('New Hamshire', 'NH',now(),1,now(),1)
,('New Jersey', 'NJ',now(),1,now(),1)
,('New Mexico', 'NM',now(),1,now(),1)
,('New York', 'NY',now(),1,now(),1)
,('North Carolina', 'NC',now(),1,now(),1)
,('North Dakota', 'ND',now(),1,now(),1)
,('Ohio', 'OH',now(),1,now(),1)
,('Oklahoma', 'OK',now(),1,now(),1)
,('Oregon', 'OR',now(),1,now(),1)
,('Pennysylvania', 'PA',now(),1,now(),1)
,('Rhode Island', 'RI',now(),1,now(),1)
,('South Carolina', 'SC',now(),1,now(),1)
,('South Dakota', 'SD',now(),1,now(),1)
,('Tennessee', 'TN',now(),1,now(),1)
,('Texas', 'TX',now(),1,now(),1)
,('Utah', 'UT',now(),1,now(),1)
,('Vermont', 'VT',now(),1,now(),1)
,('Virginia', 'VA',now(),1,now(),1)
,('Washington', 'WA',now(),1,now(),1)
,('West Virginia', 'WV',now(),1,now(),1)
,('Wisconsin', 'WI',now(),1,now(),1)
,('Wyoming', 'WY',now(),1,now(),1)
,('Alberta', 'AB',now(),1,now(),1)
,('British Columbia', 'BC',now(),1,now(),1)
,('Manitoba', 'MB',now(),1,now(),1)
,('New Brunswick', 'NB',now(),1,now(),1)
,('New Foundland & Labrador', 'NL',now(),1,now(),1)
,('Nova Scotia', 'NS',now(),1,now(),1)
,('North West Territories', 'NWT',now(),1,now(),1)
,('Nunavut', 'NU',now(),1,now(),1)
,('Ontario', 'ON',now(),1,now(),1)
,('Prince Edward Island', 'PE',now(),1,now(),1)
,('Quebec', 'QC',now(),1,now(),1)
,('Saskatchewan', 'WK',now(),1,now(),1)
,('Yukon', 'YT',now(),1,now(),1)
,('Stuttgart', 'BW',now(),1,now(),1)
,('Munich', 'BY',now(),1,now(),1)
,('Berlin', 'DBE',now(),1,now(),1)
,('Potsdam', 'BB',now(),1,now(),1)
,('Bremen', 'DHB',now(),1,now(),1)
,('Hamburg', 'HH',now(),1,now(),1)
,('Hesse-Wiesbaden', 'HE',now(),1,now(),1)
,('Lower Saxony-Hanover', 'NI',now(),1,now(),1)
,('Schwerin', 'MV',now(),1,now(),1)
,('North Rhine-Westphallia', 'NRW',now(),1,now(),1)
,('Rhineland-Palatinate', 'RP',now(),1,now(),1)
,('Saarland', 'SL',now(),1,now(),1)
,('Saxony-Dresden', 'SN',now(),1,now(),1)
,('Saxony Anhalt-magdeburg', 'DST',now(),1,now(),1)
,('Schleswig-Holstein', 'DSH',now(),1,now(),1)
,('Thuringia', 'TH',now(),1,now(),1)
,('Zurich', 'ZH',now(),1,now(),1)
,('Bern', 'BE',now(),1,now(),1)
,('Lucerne', 'LU',now(),1,now(),1)
,('Uri', 'UR',now(),1,now(),1)
,('Schwyz', 'SZ',now(),1,now(),1)
,('Obwalden', 'OW',now(),1,now(),1)
,('Nidwalden', 'NW',now(),1,now(),1)
,('Glarus', 'GL',now(),1,now(),1)
,('Zug', 'ZG',now(),1,now(),1)
,('Fribourg', 'CFR',now(),1,now(),1)
,('Solothurn', 'LO',now(),1,now(),1)
,('Basel Stadt', 'BS',now(),1,now(),1)
,('Basel Landschaft', 'CBL',now(),1,now(),1)
,('Schaffhausen', 'CSH',now(),1,now(),1)
,('Appenzell Ausserrhoden', 'AR',now(),1,now(),1)
,('Appenzell Innerrhoden', 'AI',now(),1,now(),1)
,('St.Gallen', 'SG',now(),1,now(),1)
,('Graubunden', 'GR',now(),1,now(),1)
,('Aargau', 'AG',now(),1,now(),1)
,('Thurgau', 'TG',now(),1,now(),1)
,('Ticino', 'TI',now(),1,now(),1)
,('vaud', 'VD',now(),1,now(),1)
,('Valais', 'VS',now(),1,now(),1)
,('Neuchatel', 'NE',now(),1,now(),1)
,('Geneva', 'GE',now(),1,now(),1)
,('Jura', 'JU',now(),1,now(),1)
,('Dimapur', 'DMP',now(),1,now(),1)
,('Mussoorie', 'THF',now(),1,now(),1)
,('Chakrata', 'SFF',now(),1,now(),1)
,('Northland', 'NTL',now(),1,now(),1)
,('Auckland', 'AUK',now(),1,now(),1)
,('Walkato', 'WKO',now(),1,now(),1)
,('Bay of Plenty', 'BOP',now(),1,now(),1)
,('Gisbone', 'GIS',now(),1,now(),1)
,('Hawke''s Bay', 'HKB',now(),1,now(),1)
,('Taranaki', 'TKI',now(),1,now(),1)
,('Manawtu-Wanganui', 'MWT',now(),1,now(),1)
,('Wellington', 'WGN',now(),1,now(),1)
,('Tasman', 'TAS',now(),1,now(),1)
,('Nelson', 'NSN',now(),1,now(),1)
,('Marlborough', 'MBH',now(),1,now(),1)
,('West Coast', 'WTC',now(),1,now(),1)
,('Canterbury', 'CAN',now(),1,now(),1)
,('Otago', 'OTA',now(),1,now(),1)
,('Southland', 'STL',now(),1,now(),1)
,('Antwerpen', 'AN',now(),1,now(),1)
,('Limburg', 'LI',now(),1,now(),1)
,('Vlaams-Brabant', 'VB',now(),1,now(),1)
,('Oost-Vlaanderen', 'OV',now(),1,now(),1)
,('West-Vlaanderen', 'WV',now(),1,now(),1)
,('Henegouwen', 'HT',now(),1,now(),1)
,('Walls-Brabant', 'BW',now(),1,now(),1)
,('Namen', 'NA',now(),1,now(),1)
,('Luik', 'LG',now(),1,now(),1)
,('Luxemburg', 'LX',now(),1,now(),1)
,('Varanasi', 'CUTS',now(),1,now(),1)
,('Druk Karche', 'KAR',now(),1,now(),1)
,('Druk Bhumthang', 'BUM',now(),1,now(),1)
,('Hongtsog', 'HNT',now(),1,now(),1)
,('Bodgar', 'BOD',now(),1,now(),1)
,('Jigmenang', 'JIG',now(),1,now(),1)
,('Khasaka', 'KHA',now(),1,now(),1)
,('Pado', 'PDO',now(),1,now(),1)
,('Thimphu', 'TMP',now(),1,now(),1)
,('Paljorling', 'PAL',now(),1,now(),1)
,('Tashi Jong', 'TJ',now(),1,now(),1)
,('Taiwan', 'TWI',now(),1,now(),1)
,('Austria', 'AT',now(),1,now(),1)
,('Barcelona', 'ESB',now(),1,now(),1)
,('Amsterdam', 'AMS',now(),1,now(),1)
,('Paris', 'PAR',now(),1,now(),1)
,('Mahe', 'MAHE',now(),1,now(),1)
,('Tokyo', 'TYO',now(),1,now(),1)
,('London', 'LON',now(),1,now(),1)
,('Milan', 'MI',now(),1,now(),1)
,('Washington DC', 'WDC',now(),1,now(),1)
,('Moscow', 'MOS',now(),1,now(),1);


CREATE TABLE `lstAuthRegion` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `sAuthRegion` text NOT NULL,
  `sCountryID` text NOT NULL,
  `sCurrencyCode` text DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) NOT NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;

INSERT INTO `lstauthregion` (`sAuthRegion`, `sCountryID`, `sCurrencyCode`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) 
VALUES ('Aargau', 'CH',null,now(),1,now(),1),
('Alberta', 'CA','USD',now(),1,now(),1),
('Albuquerque', 'US','USD',now(),1,now(),1),
('Atlanta', 'US','USD',now(),1,now(),1),
('Austin', 'US','USD',now(),1,now(),1),
('Australia', 'AU',null,now(),1,now(),1),
('Bangalore', 'IN','INR',now(),1,now(),1),
('Basel', 'CH',null,now(),1,now(),1),
('Belgium', 'BE',null,now(),1,now(),1),
('Bern', 'CH',null,now(),1,now(),1),
('Bhandara', 'IN','INR',now(),1,now(),1),
('Bhodgarnang', 'BT','INR',now(),1,now(),1),
('Bhopal', 'IN','INR',now(),1,now(),1),
('BTS, Bir', 'IN','INR',now(),1,now(),1),
('Dege, Bir', 'IN','INR',now(),1,now(),1),
('Bodh Gaya', 'IN','INR',now(),1,now(),1),
('Bomdila', 'IN','INR',now(),1,now(),1),
('Boston', 'US','USD',now(),1,now(),1),
('Boudha', 'NP','INR',now(),1,now(),1),
('Boulder', 'US','USD',now(),1,now(),1),
('British Columbia', 'CA','USD',now(),1,now(),1),
('Bumthang', 'BT','INR',now(),1,now(),1),
('Chakrata', 'IN','INR',now(),1,now(),1),
('Charlottesville', 'US','USD',now(),1,now(),1),
('Chauntra', 'IN','INR',now(),1,now(),1),
('Chicago', 'US','USD',now(),1,now(),1),
('Clement Town', 'IN','INR',now(),1,now(),1),
('Colorado', 'US','USD',now(),1,now(),1),
('Connecticut', 'US','USD',now(),1,now(),1),
('Dalhousie', 'IN','INR',now(),1,now(),1),
('Darjeeling', 'IN','INR',now(),1,now(),1),
('Dekyiling', 'IN','INR',now(),1,now(),1),
('Delhi', 'IN','INR',now(),1,now(),1),
('Deutschland', 'DE',null,now(),1,now(),1),
('Dharamsala', 'IN','INR',now(),1,now(),1),
('Dhorpatan', 'NP','INR',now(),1,now(),1),
('Dickey Larsoe, Bylakuppe', 'IN','INR',now(),1,now(),1),
('Dimapur', 'IN','INR',now(),1,now(),1),
('Dolanji', 'IN','INR',now(),1,now(),1),
('Flawil', 'CH',null,now(),1,now(),1),
('Gangtok', 'IN','INR',now(),1,now(),1),
('Geneva', 'CH',null,now(),1,now(),1),
('Glarus', 'CH',null,now(),1,now(),1),
('Herbertpur', 'IN','INR',now(),1,now(),1),
('Hongtso', 'BT','INR',now(),1,now(),1),
('Horgen', 'CH',null,now(),1,now(),1),
('Hungary', 'HU',null,now(),1,now(),1),
('Hunsur', 'IN','INR',now(),1,now(),1),
('Idaho', 'US','USD',now(),1,now(),1),
('Italy', 'IT',null,now(),1,now(),1),
('Ithaca', 'US','USD',now(),1,now(),1),
('Jaigaon', 'IN','INR',now(),1,now(),1),
('Jalpaiguri', 'IN','INR',now(),1,now(),1),
('Jampaling', 'NP','INR',now(),1,now(),1),
('Jawalakhel', 'NP','INR',now(),1,now(),1),
('Jigmenang', 'BT','INR',now(),1,now(),1),
('jorpati', 'NP','INR',now(),1,now(),1),
('Kalimpong', 'IN','INR',now(),1,now(),1),
('Kamrao', 'IN','INR',now(),1,now(),1),
('karche', 'BT','INR',now(),1,now(),1),
('Kathmandu City', 'NP','INR',now(),1,now(),1),
('Khasakha', 'BT','INR',now(),1,now(),1),
('Kolkata', 'IN','INR',now(),1,now(),1),
('Kollegal', 'IN','INR',now(),1,now(),1),
('Kullu Manali', 'IN','INR',now(),1,now(),1),
('Ladakh Jangthang', 'IN','INR',now(),1,now(),1),
('Landquart', 'CH',null,now(),1,now(),1),
('Leh', 'IN','INR',now(),1,now(),1),
('Liechtenstein', 'LI',null,now(),1,now(),1),
('Lindsay', 'CA','USD',now(),1,now(),1),
('London', 'GB',null,now(),1,now(),1),
('Lotserok', 'NP','INR',now(),1,now(),1),
('Lugsam, Bylakuppe', 'IN','INR',now(),1,now(),1),
('Luzern', 'CH',null,now(),1,now(),1),
('Madison', 'US','USD',now(),1,now(),1),
('Maine', 'US','USD',now(),1,now(),1),
('Mainpat', 'IN','INR',now(),1,now(),1),
('Manang', 'NP','INR',now(),1,now(),1),
('Mandu Wala', 'IN','INR',now(),1,now(),1),
('Massachusetts', 'US','USD',now(),1,now(),1),
('Miao', 'IN','INR',now(),1,now(),1),
('Michigan', 'US','USD',now(),1,now(),1),
('Minnesota', 'US','USD',now(),1,now(),1),
('Missoula', 'US','USD',now(),1,now(),1),
('Montana', 'US','USD',now(),1,now(),1),
('Moscow', 'RU',null,now(),1,now(),1),
('Muenchwilen', 'CH',null,now(),1,now(),1),
('Mundgod', 'IN','INR',now(),1,now(),1),
('Mussoorie', 'IN','INR',now(),1,now(),1),
('Nainital', 'IN','INR',now(),1,now(),1),
('New York & New Jersey', 'US','USD',now(),1,now(),1),
('North California', 'US','USD',now(),1,now(),1),
('Nubri', 'NP','INR',now(),1,now(),1),
('Oetwil', 'CH',null,now(),1,now(),1),
('Ontario', 'CA','USD',now(),1,now(),1),
('Odisha', 'IN','INR',now(),1,now(),1),
('Pado', 'BT','INR',now(),1,now(),1),
('Paljorling', 'NP','INR',now(),1,now(),1),
('Pandoh', 'IN','INR',now(),1,now(),1),
('Paonta Sahib', 'IN','INR',now(),1,now(),1),
('Paris', 'FR',null,now(),1,now(),1),
('Pema Tsal', 'NP','INR',now(),1,now(),1),
('Pennsylvania', 'US','USD',now(),1,now(),1),
('Philadelphia', 'US','USD',now(),1,now(),1),
('Poland', 'PL',null,now(),1,now(),1),
('Portland', 'US','USD',now(),1,now(),1),
('Pretoria', 'ZA',null,now(),1,now(),1),
('Puruwala', 'IN','INR',now(),1,now(),1),
('Quebec', 'CA','USD',now(),1,now(),1),
('Rajpur', 'IN','INR',now(),1,now(),1),
('Rapperswil & Jona', 'CH',null,now(),1,now(),1),
('So Wa Ra', 'NP','INR',now(),1,now(),1),
('Ravangla', 'IN','INR',now(),1,now(),1),
('Rikon', 'CH',null,now(),1,now(),1),
('Rongshar', 'NP','INR',now(),1,now(),1),
('Ruti', 'CH',null,now(),1,now(),1),
('Saharanpur', 'IN','INR',now(),1,now(),1),
('Salt Lake City', 'US','USD',now(),1,now(),1),
('Salugara', 'IN','INR',now(),1,now(),1),
('Santa Fe', 'US','USD',now(),1,now(),1),
('Sataun', 'IN','INR',now(),1,now(),1),
('Schaffhausen', 'CH',null,now(),1,now(),1),
('Seattle', 'US','USD',now(),1,now(),1),
('Shillong', 'IN','INR',now(),1,now(),1),
('Shimla', 'IN','INR',now(),1,now(),1),
('Solothurn', 'CH',null,now(),1,now(),1),
('Solu Khumbu', 'NP','INR',now(),1,now(),1),
('Sonada', 'IN','INR',now(),1,now(),1),
('Srinagar', 'IN','INR',now(),1,now(),1),
('Swayambhu', 'NP','INR',now(),1,now(),1),
('Switzerland', 'CH',null,now(),1,now(),1),
('Taiwan', 'TW',null,now(),1,now(),1),
('Tashi Gang', 'NP','INR',now(),1,now(),1),
('Tashi Jong', 'IN','INR',now(),1,now(),1),
('Tashi Ling', 'NP','INR',now(),1,now(),1),
('Tashi Palkhiel', 'NP','INR',now(),1,now(),1),
('Tenzin Gang', 'IN','INR',now(),1,now(),1),
('Texas', 'US','USD',now(),1,now(),1),
('Tezu', 'IN','INR',now(),1,now(),1),
('Thimphu', 'BT','INR',now(),1,now(),1),
('Tokyo', 'JP',null,now(),1,now(),1),
('Toronto', 'CA','USD',now(),1,now(),1),
('Tuggen', 'CH',null,now(),1,now(),1),
('Turbenthal', 'CH',null,now(),1,now(),1),
('Tuting', 'IN','INR',now(),1,now(),1),
('Utah', 'US','USD',now(),1,now(),1),
('Uznach', 'CH',null,now(),1,now(),1),
('Varanasi', 'IN','INR',now(),1,now(),1),
('Vermont', 'US','USD',now(),1,now(),1),
('Virginia', 'US','USD',now(),1,now(),1),
('Wadenswil', 'CH',null,now(),1,now(),1),
('Walung', 'NP','INR',now(),1,now(),1),
('Washington', 'US','USD',now(),1,now(),1),
('Wattwil', 'CH',null,now(),1,now(),1),
('Zurich', 'CH',null,now(),1,now(),1),
('South California', 'US','USD',now(),1,now(),1),
('Norway', 'NO',null,now(),1,now(),1),
('Austria', 'AS',null,now(),1,now(),1),
('Mandi', 'IN','INR',now(),1,now(),1),
('Tso Pema', 'IN','INR',now(),1,now(),1),
('Tawang', 'IN','INR',now(),1,now(),1),
('Indiana', 'US','USD',now(),1,now(),1),
('Tsering Dhondhen', 'IN','INR',now(),1,now(),1),
('Capitol Area', 'US','USD',now(),1,now(),1),
('Lausanne', 'CH',null,now(),1,now(),1),
('Trogen', 'CH',null,now(),1,now(),1),
('Washington DC', 'US','USD',now(),1,now(),1);

SET SQL_SAFE_UPDATES=0;

UPDATE lstauthregion
SET sCurrencyCode = 'USD'
WHERE sCountryID NOT IN ('IN','NP','BT'); 


CREATE TABLE `lstCountry` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `sCountryID` text DEFAULT NULL,
  `sCountry` text DEFAULT NULL,
  `nDefaultAuthRegionID` int(11) NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `lstCountry` (`sCountryID`, `sCountry`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('AF','Afghanistan',now(),1,now(),1),
('AL','Albania',now(),1,now(),1),('DZ','Algeria',now(),1,now(),1),('AS','Austria',now(),1,now(),1),('AD','Andorra',now(),1,now(),1),('AO','Angola',now(),1,now(),1),
('AI','Anguilla',now(),1,now(),1),('AQ','Antarctica',now(),1,now(),1),('AG','Antigua and Barbuda',now(),1,now(),1),('AR','Argentina',now(),1,now(),1),
('AM','Armenia',now(),1,now(),1),('AW','Aruba',now(),1,now(),1),('AU','Australia',now(),1,now(),1),('AS','Austria',now(),1,now(),1),('AZ','Azerbaijan',now(),1,now(),1),
('BS','Bahamas',now(),1,now(),1),('BH','Bahrain',now(),1,now(),1),('BD','Bangladesh',now(),1,now(),1),('BB','Barbados',now(),1,now(),1),('BY','Belarus',now(),1,now(),1),
('BE','Belgium',now(),1,now(),1),('BZ','Belize',now(),1,now(),1),('BJ','Benin',now(),1,now(),1),('BM','Bermuda',now(),1,now(),1),('BT','Bhutan',now(),1,now(),1),
('BO','Bolivia',now(),1,now(),1),('BA','Bosnia & Herzegovina',now(),1,now(),1),('BW','Botswana',now(),1,now(),1),('BV','Bouvet Island',now(),1,now(),1),
('BR','Brazil',now(),1,now(),1),('IO','British Indian Ocean',now(),1,now(),1),('BN','Brunei Darussalam',now(),1,now(),1),('BG','Bulgaria',now(),1,now(),1),
('BF','Burkina Faso',now(),1,now(),1),('BI','Burundi',now(),1,now(),1),('KH','Cambodia',now(),1,now(),1),('CM','Cameroon',now(),1,now(),1),('CA','Canada',now(),1,now(),1),
('CV','Cape Verde',now(),1,now(),1),('KY','Cayman Islands',now(),1,now(),1),('CF','Central Africa Rep',now(),1,now(),1),('TD','Chad',now(),1,now(),1),('CL','Chile',now(),1,now(),1),
('CN','China',now(),1,now(),1),('CX','Christmas Island',now(),1,now(),1),('CC','Cocos',now(),1,now(),1),('CO','Colombia',now(),1,now(),1),('KM','Comoros',now(),1,now(),1),
('CG','Congo',now(),1,now(),1),('CK','Cook Islands',now(),1,now(),1),('CR','Costa Rica',now(),1,now(),1),('CI','Ivory Coast',now(),1,now(),1),
('HR','Croatia (Hrvatska',now(),1,now(),1),('CU','Cuba',now(),1,now(),1),('CY','Cyprus',now(),1,now(),1),('CZ','Czech Republic',now(),1,now(),1),
('DK','Denmark',now(),1,now(),1),('DJ','Djibouti',now(),1,now(),1),('DM','Dominica',now(),1,now(),1),('DO','Dominican Republic',now(),1,now(),1),
('TP','East Timor',now(),1,now(),1),('EC','Ecuador',now(),1,now(),1),('EG','Egypt',now(),1,now(),1),('SV','El Salvador',now(),1,now(),1),('GQ','Equatorial Guinea',now(),1,now(),1),
('ER','Eritrea',now(),1,now(),1),('EE','Estonia',now(),1,now(),1),('ET','Ethiopia',now(),1,now(),1),('FK','Falkland Islands',now(),1,now(),1),('FO','Faroe Islands',now(),1,now(),1),
('FJ','Fiji',now(),1,now(),1),('FI','Finland',now(),1,now(),1),('FR','France',now(),1,now(),1),('FX','France, Metropolitan',now(),1,now(),1),('GF','French Guiana',now(),1,now(),1),
('PF','French Polynesia',now(),1,now(),1),('TF','French Southern',now(),1,now(),1),('GA','Gabon',now(),1,now(),1),('GM','Gambia',now(),1,now(),1),('GE','Georgia',now(),1,now(),1),
('DE','Germany',now(),1,now(),1),('GH','Ghana',now(),1,now(),1),('GI','Gibraltar',now(),1,now(),1),('GR','Greece',now(),1,now(),1),('GL','Greenland',now(),1,now(),1),('GD','Grenada',now(),1,now(),1),
('GP','Guadeloupe',now(),1,now(),1),('GU','Guam',now(),1,now(),1),('GT','Guatemala',now(),1,now(),1),('GN','Guinea',now(),1,now(),1),('GW','Guinea-Bissau',now(),1,now(),1),
('GY','Guyana',now(),1,now(),1),('HT','Haiti',now(),1,now(),1),('HM','Heard & McDonald',now(),1,now(),1),('HN','Honduras',now(),1,now(),1),('HK','Hong Kong',now(),1,now(),1),
('HU','Hungary',now(),1,now(),1),('IS','Iceland',now(),1,now(),1),('IN','India',now(),1,now(),1),('ID','Indonesia',now(),1,now(),1),('IR','Iran',now(),1,now(),1),('IQ','Iraq',now(),1,now(),1),
('IE','Ireland',now(),1,now(),1),('IL','Israel',now(),1,now(),1),('IT','Italy',now(),1,now(),1),('JM','Jamaica',now(),1,now(),1),('JP','Japan',now(),1,now(),1),('JO','Jordan',now(),1,now(),1),
('KZ','Kazakhstan',now(),1,now(),1),('KE','Kenya',now(),1,now(),1),('KI','Kiribati',now(),1,now(),1),('KP','Korea (North)',now(),1,now(),1),('KR','Korea (South)',now(),1,now(),1),
('KW','Kuwait',now(),1,now(),1),('KG','Kyrgyzstan',now(),1,now(),1),('LA','Laos',now(),1,now(),1),('LV','Latvia',now(),1,now(),1),('LB','Lebanon',now(),1,now(),1),('LS','Lesotho',now(),1,now(),1),
('LR','Liberia',now(),1,now(),1),('LY','Libya',now(),1,now(),1),('LI','Liechtenstein',now(),1,now(),1),('LT','Lithuania',now(),1,now(),1),('LU','Luxembourg',now(),1,now(),1),('MO','Macau',now(),1,now(),1),
('MK','Macedonia',now(),1,now(),1),('MG','Madagascar',now(),1,now(),1),('MW','Malawi',now(),1,now(),1),('MY','Malaysia',now(),1,now(),1),('MV','Maldives',now(),1,now(),1),('ML','Mali',now(),1,now(),1),
('MT','Malta',now(),1,now(),1),('MH','Marshall Islands',now(),1,now(),1),('MQ','Martinique',now(),1,now(),1),('MR','Mauritania',now(),1,now(),1),('MU','Mauritius',now(),1,now(),1),
('YT','Mayotte',now(),1,now(),1),('MX','Mexico',now(),1,now(),1),('FM','Micronesia',now(),1,now(),1),('MD','Moldova',now(),1,now(),1),('MC','Monaco',now(),1,now(),1),('MN','Mongolia',now(),1,now(),1),
('MS','Montserrat',now(),1,now(),1),('MA','Morocco',now(),1,now(),1),('MZ','Mozambique',now(),1,now(),1),('MM','Myanmar',now(),1,now(),1),('NA','Namibia',now(),1,now(),1),('NR','Nauru',now(),1,now(),1),
('NP','Nepal',now(),1,now(),1),('NL','Netherlands',now(),1,now(),1),('AN','Netherlands Anti',now(),1,now(),1),('NC','New Caledonia',now(),1,now(),1),('NZ','New Zealand',now(),1,now(),1),
('NI','Nicaragua',now(),1,now(),1),('NE','Niger',now(),1,now(),1),('NG','Nigeria',now(),1,now(),1),('NU','Niue',now(),1,now(),1),('NF','Norfolk Island',now(),1,now(),1),('MP','Northern Mariana',now(),1,now(),1),
('NO','Norway',now(),1,now(),1),('OM','Oman',now(),1,now(),1),('PK','Pakistan',now(),1,now(),1),('PW','Palau',now(),1,now(),1),('PA','Panama',now(),1,now(),1),('PG','Papua Guinea',now(),1,now(),1),
('PY','Paraguay',now(),1,now(),1),('PE','Peru',now(),1,now(),1),('PH','Philippines',now(),1,now(),1),('PN','Pitcairn',now(),1,now(),1),('PL','Poland',now(),1,now(),1),('PT','Portugal',now(),1,now(),1),
('PR','Puerto Rico',now(),1,now(),1),('QA','Qatar',now(),1,now(),1),('RE','Reunion',now(),1,now(),1),('RO','Romania',now(),1,now(),1),('RU','Russian Federation',now(),1,now(),1),
('RW','Rwanda',now(),1,now(),1),('KN','Saint Kitts',now(),1,now(),1),('LC','Saint Lucia',now(),1,now(),1),('VC','Saint Vincent',now(),1,now(),1),('WS','Samoa',now(),1,now(),1),
('SM','San Marino',now(),1,now(),1),('ST','Sao Tome',now(),1,now(),1),('SA','Saudi Arabia',now(),1,now(),1),('SN','Senegal',now(),1,now(),1),('SC','Seychelles',now(),1,now(),1),
('SL','Sierra Leone',now(),1,now(),1),('SG','Singapore',now(),1,now(),1),('SK','Slovak Republic',now(),1,now(),1),('SI','Slovenia',now(),1,now(),1),('SB','Solomon Islands',now(),1,now(),1),
('SO','Somalia',now(),1,now(),1),('ZA','South Africa',now(),1,now(),1),('GS','S. Georgia',now(),1,now(),1),('SP','Spain',now(),1,now(),1),('LK','Sri Lanka',now(),1,now(),1),('SH','St. Helena',now(),1,now(),1),
('PM','St. Pierre',now(),1,now(),1),('SD','Sudan',now(),1,now(),1),('SR','Suriname',now(),1,now(),1),('SJ','Svalbard',now(),1,now(),1),('SZ','Swaziland',now(),1,now(),1),('SE','Sweden',now(),1,now(),1),
('CH','Switzerland',now(),1,now(),1),('SY','Syria',now(),1,now(),1),('TW','Taiwan',now(),1,now(),1),('TJ','Tajikistan',now(),1,now(),1),('TZ','Tanzania',now(),1,now(),1),('TH','Thailand',now(),1,now(),1),
('TG','Togo',now(),1,now(),1),('TK','Tokelau',now(),1,now(),1),('TO','Tonga',now(),1,now(),1),('TT','Trinidad & Tobago',now(),1,now(),1),('TN','Tunisia',now(),1,now(),1),('TR','Turkey',now(),1,now(),1),
('TM','Turkmenistan',now(),1,now(),1),('TC','Turks & Caicos Is',now(),1,now(),1),('TV','Tuvalu',now(),1,now(),1),('UG','Uganda',now(),1,now(),1),('UA','Ukraine',now(),1,now(),1),
('AE','United Arab Emirates',now(),1,now(),1),('GB','Great Britain',now(),1,now(),1),('US','United States of America',now(),1,now(),1),('UM','US Minor Outlying',now(),1,now(),1),
('UY','Uruguay',now(),1,now(),1),('UZ','Uzbekistan',now(),1,now(),1),('VU','Vanuatu',now(),1,now(),1),('VA','Vatican City State',now(),1,now(),1),('VE','Venezuela',now(),1,now(),1),('VN','Viet Nam',now(),1,now(),1),
('VG','Virgin Is(British)',now(),1,now(),1),('VI','Virgin Is(US)',now(),1,now(),1),('WF','Wallis and Futuna',now(),1,now(),1),('EH','Western Sahara',now(),1,now(),1),('YE','Yemen',now(),1,now(),1),
('YU','Yugoslavia',now(),1,now(),1),('ZR','Zaire',now(),1,now(),1),('ZM','Zambia',now(),1,now(),1),('ZW','Zimbabwe',now(),1,now(),1),('TB','Tibet',now(),1,now(),1);

update lstcountry 
	set nDefaultAuthRegionID = (select lstauthregion.id 
								from lstauthregion 
								where lstauthregion.sCountryID = lstcountry.sCountryID 
								limit 1);

CREATE TABLE `lstoccupation` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sOccupationDesc` text NOT NULL,
  `sOccupationDescTibetan` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;

INSERT INTO `lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Aged', 'རྒས་ཁོགས།',now(),1,now(),1);
INSERT INTO `lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Domestic Work', 'ནང་ལས།',now(),1,now(),1);
INSERT INTO `lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Farmer', 'ཞིང་པ།',now(),1,now(),1);
INSERT INTO `lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Retired', 'རྒས་ཡོལ།',now(),1,now(),1);
INSERT INTO `lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Self Employed', 'རང་འཚོ།',now(),1,now(),1);
INSERT INTO `lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Wage Earner', 'ཉི་གླ།',now(),1,now(),1);
INSERT INTO `lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Salaried Job', 'གླ་ཡོད་ལས་རིགས།',now(),1,now(),1);
INSERT INTO `lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Student', 'སློབ་ཕྲུག',now(),1,now(),1);
INSERT INTO `lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Housewife', 'ནང་གི་ཨ་མ།',now(),1,now(),1);
INSERT INTO `lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Business', 'ཚོང་ལས།',now(),1,now(),1);
INSERT INTO `lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Professional', 'ཆེད་ལས་པ།',now(),1,now(),1);
INSERT INTO `lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Monk', 'གྲྭ་པ།',now(),1,now(),1);
INSERT INTO `lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('[No Entry]', '',now(),1,now(),1);
INSERT INTO `lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Not Employed', 'ལས་མེད།',now(),1,now(),1);
INSERT INTO `lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Minor', 'བྱིས་པ།',now(),1,now(),1);
INSERT INTO `lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Tantric Yana', 'སྔགས་པ།',now(),1,now(),1);
INSERT INTO `lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Nomad', 'འབྲོག་པ།',now(),1,now(),1);
INSERT INTO `lstoccupation` (`sOccupationDesc`, `sOccupationDescTibetan`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Nun', 'བཙུན་མ།',now(),1,now(),1);

CREATE TABLE `lstProvince` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sProvince` text NOT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;

INSERT INTO `lstprovince` (`sProvince`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Dome',now(),1,now(),1);
INSERT INTO `lstprovince` (`sProvince`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Dotoe',now(),1,now(),1);
INSERT INTO `lstprovince` (`sProvince`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Utsang',now(),1,now(),1);
INSERT INTO `lstprovince` (`sProvince`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Unknown',now(),1,now(),1);

CREATE TABLE `lstMaritalStatus` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sMaritalStatusText` varchar(50) DEFAULT NULL,
  `sMaritalStatusId` varchar(10) DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;

INSERT INTO `lstMaritalStatus` (`sMaritalStatusText`,`sMaritalStatusId`,`dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Single','S',now(),1,now(),1);
INSERT INTO `lstMaritalStatus` (`sMaritalStatusText`,`sMaritalStatusId`,`dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Married','M',now(),1,now(),1);
INSERT INTO `lstMaritalStatus` (`sMaritalStatusText`,`sMaritalStatusId`,`dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Divorced','D',now(),1,now(),1);
INSERT INTO `lstMaritalStatus` (`sMaritalStatusText`,`sMaritalStatusId`,`dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Widower','R',now(),1,now(),1);
INSERT INTO `lstMaritalStatus` (`sMaritalStatusText`,`sMaritalStatusId`,`dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Widow','W',now(),1,now(),1);




CREATE TABLE `lstQualification` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sQualificationID` varchar(1) NOT NULL DEFAULT '',
  `sQualification` varchar(50) DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;

INSERT INTO `lstQualification` (`sQualificationID`, `sQualification`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('A', 'Monastic Education',now(),1,now(),1);
INSERT INTO `lstQualification` (`sQualificationID`, `sQualification`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('G', 'Graduation',now(),1,now(),1);
INSERT INTO `lstQualification` (`sQualificationID`, `sQualification`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('M', 'Matriculation',now(),1,now(),1);
INSERT INTO `lstQualification` (`sQualificationID`, `sQualification`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('N', 'No Formal Education',now(),1,now(),1);
INSERT INTO `lstQualification` (`sQualificationID`, `sQualification`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('P', 'Primary',now(),1,now(),1);
INSERT INTO `lstQualification` (`sQualificationID`, `sQualification`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('R', 'Post Graduation',now(),1,now(),1);
INSERT INTO `lstQualification` (`sQualificationID`, `sQualification`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('S', 'Senior Secondary',now(),1,now(),1);
INSERT INTO `lstQualification` (`sQualificationID`, `sQualification`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('U', '[No Entry]',now(),1,now(),1);

CREATE TABLE `lstDOBApprox` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sDOBApproxID` varchar(1) NOT NULL DEFAULT '',
  `sDOBApproxName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;

INSERT INTO `lstDOBApprox` (`sDOBApproxID`, `sDOBApproxName`) VALUES ('N', 'Exact DOB');
INSERT INTO `lstDOBApprox` (`sDOBApproxID`, `sDOBApproxName`) VALUES ('D', 'Day Approx');
INSERT INTO `lstDOBApprox` (`sDOBApproxID`, `sDOBApproxName`) VALUES ('M', 'Month/Year Exact');
INSERT INTO `lstDOBApprox` (`sDOBApproxID`, `sDOBApproxName`) VALUES ('Y', 'Year Only');



CREATE TABLE `lstTypeIssued` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sTypeIssued` text NOT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;

INSERT INTO `lstTypeIssued` (`sTypeIssued`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('On Progress',now(),1,now(),1);
INSERT INTO `lstTypeIssued` (`sTypeIssued`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Issued',now(),1,now(),1);
INSERT INTO `lstTypeIssued` (`sTypeIssued`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Rejected',now(),1,now(),1);
INSERT INTO `lstTypeIssued` (`sTypeIssued`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Double',now(),1,now(),1);
INSERT INTO `lstTypeIssued` (`sTypeIssued`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Cancel',now(),1,now(),1);

CREATE TABLE `lstUserRights` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sUserRightsName` text NOT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;

INSERT INTO `lstUserRights` (`sUserRightsName`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Search',now(),1,now(),1);
INSERT INTO `lstUserRights` (`sUserRightsName`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Entry',now(),1,now(),1);
INSERT INTO `lstUserRights` (`sUserRightsName`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Book Issue',now(),1,now(),1);
INSERT INTO `lstUserRights` (`sUserRightsName`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Edit',now(),1,now(),1);
INSERT INTO `lstUserRights` (`sUserRightsName`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Admin',now(),1,now(),1);


CREATE TABLE `tbluser` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `_Id` int(11) DEFAULT NULL,
  `sUsername` text NOT NULL,
  `sFullName` text NOT NULL,
  `sOffice` text NOT NULL,
  `sPassword` text NOT NULL,
  `nUserRightsId` int(11) NOT NULL,
  `bActive` tinyint(1) NOT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) NOT NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;





CREATE TABLE `lstRelation` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sRelation` text NOT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;

INSERT INTO `lstRelation` (`sRelation`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Father',now(),1,now(),1);
INSERT INTO `lstRelation` (`sRelation`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Mother',now(),1,now(),1);
INSERT INTO `lstRelation` (`sRelation`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Spouse',now(),1,now(),1);
INSERT INTO `lstRelation` (`sRelation`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Male Child',now(),1,now(),1);
INSERT INTO `lstRelation` (`sRelation`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Female Child',now(),1,now(),1);
-- INSERT INTO `lstRelation` (`sRelation`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Brother',now(),1,now(),1);
-- INSERT INTO `lstRelation` (`sRelation`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Sister',now(),1,now(),1);

CREATE TABLE `lstMadebStatus` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sMadebStatus` text NOT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;

INSERT INTO `lstMadebStatus` (`sMadebStatus`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('In Progress',now(),1,now(),1);
INSERT INTO `lstMadebStatus` (`sMadebStatus`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Approved',now(),1,now(),1);
INSERT INTO `lstMadebStatus` (`sMadebStatus`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Rejected',now(),1,now(),1);
INSERT INTO `lstMadebStatus` (`sMadebStatus`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Cancelled',now(),1,now(),1);
INSERT INTO `lstMadebStatus` (`sMadebStatus`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Closed',now(),1,now(),1);

CREATE TABLE `lstMadebType` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sMadebType` text NOT NULL,
  `sMadebDisplayName` text NOT NULL,
  `sMadebDisplayKey` text NOT NULL,
  `nMadebFeatureId` int(11) NOT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;

INSERT INTO `lstMadebType` (`sMadebType`,`sMadebDisplayName`,`sMadebDisplayKey`,`nMadebFeatureId`,`dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Sarso','First Issued','F',13,now(),1,now(),1);
INSERT INTO `lstMadebType` (`sMadebType`,`sMadebDisplayName`,`sMadebDisplayKey`,`nMadebFeatureId`,`dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Norchoe','Modified Issued','M',14,now(),1,now(),1);
INSERT INTO `lstMadebType` (`sMadebType`,`sMadebDisplayName`,`sMadebDisplayKey`,`nMadebFeatureId`,`dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Bhorlak','Lost Issued','L',15,now(),1,now(),1);
INSERT INTO `lstMadebType` (`sMadebType`,`sMadebDisplayName`,`sMadebDisplayKey`,`nMadebFeatureId`,`dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Abroad','Abroad','A',18,now(),1,now(),1);
INSERT INTO `lstMadebType` (`sMadebType`,`sMadebDisplayName`,`sMadebDisplayKey`,`nMadebFeatureId`,`dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Book Full','Book Full','U',16,now(),1,now(),1);
INSERT INTO `lstMadebType` (`sMadebType`,`sMadebDisplayName`,`sMadebDisplayKey`,`nMadebFeatureId`,`dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Brief GB','Brief GB','B',17,now(),1,now(),1);

-- lstFeature
CREATE TABLE `lstFeature` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sFeature` text NOT NULL, 
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;

INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Login',now(),1,now(),1);
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Home',now(),1,now(),1);
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Search',now(),1,now(),1);
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Sarso Madeb',now(),1,now(),1);
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Norchoe Madeb',now(),1,now(),1);
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Bhorlak Madeb',now(),1,now(),1);
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Book Full',now(),1,now(),1);
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Brief GB',now(),1,now(),1);
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Abroad',now(),1,now(),1);
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Give GB ID',now(),1,now(),1);
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('New Entry',now(),1,now(),1); -- *2
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Give Book Serial No',now(),1,now(),1);
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Edit Book Serial No',now(),1,now(),1);
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Print',now(),1,now(),1);
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Issue Book',now(),1,now(),1);
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Make List',now(),1,now(),1);
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Edit GB',now(),1,now(),1); -- *2
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Delete',now(),1,now(),1);
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Users',now(),1,now(),1);
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Feature Rights',now(),1,now(),1);
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Role (Master)',now(),1,now(),1);
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Region (Master)',now(),1,now(),1);
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Authority Region (Master)',now(),1,now(),1);
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Country (Master)',now(),1,now(),1);
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Occupation (Master)',now(),1,now(),1);
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Province (Master)',now(),1,now(),1);
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Qualification (Master)',now(),1,now(),1);
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Relation (Master)',now(),1,now(),1);
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Feature (Master)',now(),1,now(),1);
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Madeb Type (Master)',now(),1,now(),1);
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Type Issued (Master)',now(),1,now(),1);
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Chatrel Configuration (Master)',now(),1,now(),1);
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('CTA Configuration (Master)',now(),1,now(),1);
-- INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Reports',now(),1,now(),1);
-- INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Chatrel',now(),1,now(),1);
INSERT INTO `ctadb`.`lstFeature` (`sFeature`, `dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ('Change Password',now(),1,now(),1);


CREATE TABLE `lstCTAConfig` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sKey` text NOT NULL,
  `sValue` MEDIUMTEXT NOT NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;

INSERT INTO `lstctaconfig` (`Id`, `sKey`, `sValue`, `dtUpdated`, `nUpdatedBy`) VALUES
(1, 'UITableNumberOfRowsInPage', '20', now(), 1),
(2, 'SelectTotalRecordCount', '1000', now(), 1),
(3, 'DateFormat', 'DD-MM-YYYY', now(), 1),
(4, 'CTAAdminEmail', 'set email here', now(), 1),
(5, 'CTAAdminEmailPassword', 'set password here', now(), 1),
(6, 'CTAEmailRelayServer', 'set email relay server here', now(), 1),
(7, 'CTAEmailServerPort', 'set email server port here', now(), 1),
(8, 'CTAEmailUseSSL', 'set ssl here', now(), 1),
(9, 'CTAEmailCC', 'set cc email here', now(), 1);


CREATE TABLE `lstChatrel` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sChatrelKey` text NOT NULL,
  `nChatrelValue` int(11) NOT NULL,
  `dtChatrelFrom` date DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;

INSERT INTO `lstChatrel` (`Id`, `sChatrelKey`, `nChatrelValue`, `dtChatrelFrom`, `dtEntered`, `nEnteredBy`) VALUES
(1, 'USDYearChatrelAmount', '36', DATE_FORMAT("2011-04-01", "%Y-%m-%d"), now(), 1),
(2, 'USDYearChatrelMeal', '10', DATE_FORMAT("2011-04-01", "%Y-%m-%d"), now(), 1),
(3, 'USDYearChatrelSalaryAmt', '50', DATE_FORMAT("2011-04-01", "%Y-%m-%d"), now(), 1),
(4, 'USDChatrelLateFeesPercentage', '10', DATE_FORMAT("2011-04-01", "%Y-%m-%d"), now(), 1),
(5, 'USDChildMonthChatrelAmount', '1', DATE_FORMAT("2011-04-01", "%Y-%m-%d"), now(), 1),
(6, 'INRYearChatrelAmount', '48', DATE_FORMAT("2011-04-01", "%Y-%m-%d"), now(), 1),
(7, 'INRYearChatrelMeal', '10', DATE_FORMAT("2011-04-01", "%Y-%m-%d"), now(), 1),
(8, 'INRYearChatrelSalaryAmt', '0', DATE_FORMAT("2011-04-01", "%Y-%m-%d"), now(), 1),
(9, 'INRChatrelLateFeesPercentage', '10', DATE_FORMAT("2011-04-01", "%Y-%m-%d"), now(), 1),
(10, 'INRChildMonthChatrelAmount', '1', DATE_FORMAT("2011-04-01", "%Y-%m-%d"), now(), 1),
(11, 'ChatrelStartYear', '2011', NULL, now(), 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=1 ;



CREATE TABLE `tblMadeb` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `_Id` int(11) DEFAULT NULL,
  `nFormNumber` int(11) NOT NULL,
  `sGBID` varchar(255) DEFAULT NULL,
  `nMadebTypeID` int(11) DEFAULT NULL,
  `sName` text DEFAULT NULL,
  `sFathersName` varchar(100) DEFAULT NULL,
  `nAuthRegionID` int(11) NOT NULL,
  `dtReceived` date DEFAULT NULL,
  `dtIssueAction` date DEFAULT NULL,
  `nIssuedOrNotID` int(11) DEFAULT NULL,
  `nType` int(11) DEFAULT NULL,
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
  `nMadebStatusID` int(11) DEFAULT NULL,
  `sMadebStatusRemark` varchar(200) DEFAULT NULL,
  `dtReject` date DEFAULT NULL,
  `dtReturnEmail` date DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`),
  KEY `nAuthRegionID` (`nAuthRegionID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;

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
  `dtDOB` date DEFAULT NULL,
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
  `sAliasName` varchar(200) DEFAULT NULL,
  
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

  `dtDeceased` date DEFAULT NULL,
  `sBookIssued` varchar(255) DEFAULT NULL,
  `dtValidityDate` date DEFAULT NULL,
  `sPaidUntil` text NOT NULL,
  
  `TibetanName` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `TBUPlaceOfBirth` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `TBUOriginVillage` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `TBUFathersName` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `TBUMothersName` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `TBUSpouseName` text CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  
  `sLoginGmail` varchar(255) DEFAULT NULL,
  `dtLastSuccessfullLogin` DateTime DEFAULT NULL,
  
  `sEnteredDateTime` text DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,

  PRIMARY KEY (`id`),
  KEY `nAuthRegionID` (`nAuthRegionID`)
) ENGINE=InnoDB AUTO_INCREMENT=1  DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tblGivenGBID` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `_Id` int(11) DEFAULT NULL,
  `nGBId` int(11) NOT NULL,
  `nFormNo` int(11) NOT NULL,
  `dtDate` date NOT NULL,
  `bGivenOrNot` tinyint(1) NOT NULL,
  `bActive` tinyint(1) NOT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`),
  KEY `nGBId` (`nGBId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;

-- select nGBId from tblGivenGBID order by nGBId desc limit 0,1;


CREATE TABLE `tblGreenBookIssued` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `nGBId` int(11) DEFAULT NULL,
  `dtIssuedDate` date DEFAULT NULL,
  `sWhyIssued` varchar(10) DEFAULT NULL,
  `nMadebTypeId` int(11) DEFAULT NULL,
  `nTypeIssuedId` int(11) NOT NULL,
  `sFormNumber` text NOT NULL,
  `nFormNumber` int(11) DEFAULT NULL,
  `nWhereIssued` int(11) NULL,
  `nAuthRegionId` int(11) DEFAULT NULL,
  `bPrinted` tinyint(1) NOT NULL,
  `sRemarks` text CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`),
  KEY `nGBId` (`nGBId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;


CREATE TABLE `tblGreenBookSerial` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `nBookNo` int(11) DEFAULT NULL,
  `sGBID` varchar(255) DEFAULT NULL,
  `Remarks` text NOT NULL,
  `dtDate` date DEFAULT NULL,
  `sName` varchar(200) DEFAULT NULL,
  `sCountryID` text DEFAULT NULL,
  `nMadebTypeID` int(11) DEFAULT NULL,
  `nFormNumber` int(11) DEFAULT NULL,
  `sAuthRegion` varchar(200) DEFAULT NULL,
  `nAuthRegionID` int(11) DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`),
  KEY `sGBId` (`sGBId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;


CREATE TABLE `tblActionLogger` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sActionType` varchar(255) DEFAULT NULL,
  `sModuleName` varchar(255) DEFAULT NULL,
  `sEventName` varchar(255) DEFAULT NULL,
  `sDescription` text DEFAULT NULL,
  `sStackTrace` text DEFAULT NULL,
  `dtEntered` DateTime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;

CREATE TABLE `tblAuditLog` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `dtEntered` datetime DEFAULT NULL,
  `nFeatureID` int(11) NOT NULL,
  `nRegionID` int(11) DEFAULT NULL,
  `nRecordID` int(11) NOT NULL,
  `sGBID` varchar(255) DEFAULT NULL,
  `sFieldValuesOld` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `sFieldValuesNew` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `nEnteredBy` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;



CREATE TABLE `tblchatrelpayment` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sGBId` varchar(255) DEFAULT NULL,
  `nChatrelYear` int(11) DEFAULT NULL,
  `nChatrelTotalAmount` decimal(15,2) DEFAULT NULL,
  `sChatrelReceiptNumber` varchar(255) DEFAULT NULL,
  `sPaymentStatus` varchar(255) DEFAULT NULL,
  `sPaymentMode` varchar(255) DEFAULT NULL,
  `sPaymentCurrency` varchar(255) DEFAULT NULL,
  `sPaidByGBId` varchar(255) DEFAULT NULL,
  `sPayPal_Status` varchar(255) DEFAULT NULL,
  `sPayPal_ID` varchar(255) DEFAULT NULL,
  `sPayPal_Currency_Code` varchar(255) DEFAULT NULL,
  `sPayPal_Currency_Value` varchar(255) DEFAULT NULL,
  `sPayPal_Response_Object` varchar(5000) DEFAULT NULL,
  `dtPayment` datetime DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) NOT NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;

CREATE TABLE `tblchatrelBulkData` (
	`Id` int(11) NOT NULL AUTO_INCREMENT,
	`SNo` varchar(255) DEFAULT NULL,
	`IDNo` varchar(255) DEFAULT NULL,
	`Name` varchar(255) DEFAULT NULL,
	`Chatrel` varchar(255) DEFAULT NULL,
	`Meal` varchar(255) DEFAULT NULL, 
	`Year` varchar(255) DEFAULT NULL,
	`ArrearsPlusLateFees` varchar(255) DEFAULT NULL,
	`ArrearsFrom` varchar(255) DEFAULT NULL,
	`ArrearsTo` varchar(255) DEFAULT NULL,
	`Salary` varchar(255) DEFAULT NULL,
	`PendingFrom` varchar(255) DEFAULT NULL,
	`PendingTo` varchar(255) DEFAULT NULL,
	`BusinessDonation` varchar(255) DEFAULT NULL,
	`AdditionalDonation` varchar(255) DEFAULT NULL,
	`TotalAmount` varchar(255) DEFAULT NULL,
	`RecieptNo` varchar(255) DEFAULT NULL,
	`PaymentDate` varchar(255) DEFAULT NULL,
	`Region` varchar(255) DEFAULT NULL,
	`Country` varchar(255) DEFAULT NULL,
	`Currency` varchar(255) DEFAULT NULL,
	`dtEntered` datetime DEFAULT NULL,
	`nEnteredBy` int(11) NOT NULL,
 PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;

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
) ENGINE=InnoDB AUTO_INCREMENT=1 ;

CREATE TABLE `lnkgbchatrel` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `chatrelpaymentID` int(11) NOT NULL,
  `sGBId` varchar(255) DEFAULT NULL,
  `nChatrelAmount` decimal(15,2) NOT NULL,
  `nChatrelMeal` decimal(15,2) DEFAULT NULL,
  `nChatrelYear` int(11) DEFAULT NULL,
  `nChatrelLateFeesPercentage` int(11) DEFAULT NULL,
  `nChatrelLateFeesValue` decimal(15,2) DEFAULT NULL,
  `nArrearsAmount` decimal(15,2) DEFAULT NULL,
  `dtArrearsFrom` date DEFAULT NULL,
  `dtArrearsTo` date DEFAULT NULL,
  `nCurrentChatrelSalaryAmt` decimal(15,2) DEFAULT NULL,
  `dtCurrentChatrelFrom` date DEFAULT NULL,
  `dtCurrentChatrelTo` date DEFAULT NULL,
  `nChatrelTotalAmount` decimal(15,2) DEFAULT NULL,
  `sChatrelReceiptNumber` varchar(255) DEFAULT NULL,
  `nAuthRegionID` int(11) DEFAULT NULL,
  `sCountryID` varchar(255) DEFAULT NULL,
  `sPaymentCurrency` varchar(255) DEFAULT NULL,
  `sAuthRegionCurrency` varchar(255) DEFAULT NULL,
  `nConversionRate` decimal(15,4) DEFAULT NULL,
  `sPaidByGBId` varchar(255) DEFAULT NULL,
  `dtPayment` datetime DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) NOT NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;


CREATE TABLE `lnkgbchatrelDonation` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `chatrelpaymentID` int(11) NOT NULL,
  `sGBId` varchar(255) DEFAULT NULL,
  `nChatrelAdditionalDonationAmt` decimal(15,2) DEFAULT NULL,
  `nChatrelBusinessDonationAmt` decimal(15,2) DEFAULT NULL,
  `sChatrelReceiptNumber` varchar(255) DEFAULT NULL,
  `nAuthRegionID` int(11) DEFAULT NULL,
  `sCountryID` varchar(255) DEFAULT NULL,
  `sPaymentCurrency` varchar(255) DEFAULT NULL,
  `sAuthRegionCurrency` varchar(255) DEFAULT NULL,
  `nConversionRate` decimal(15,4) DEFAULT NULL,
  `sPaidByGBId` varchar(255) DEFAULT NULL,
  `dtPayment` datetime DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) NOT NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;

CREATE TABLE `lnkGBDocument` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sGBId` varchar(255) DEFAULT NULL,
  `sTitle` varchar(255) DEFAULT NULL,
  `sDocType` varchar(255) DEFAULT NULL,
  `binFileDoc` longblob DEFAULT NULL,  
  `sFileExtension` varchar(255) DEFAULT NULL,
  `nRegisterDate` int(64) DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;



CREATE TABLE `lnkGBNote` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sGBId` varchar(255) DEFAULT NULL,
  `sNote` longtext DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  PRIMARY KEY (`Id`),
  KEY `sGBId` (`sGBId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;


CREATE TABLE `lnkGBChildren` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sGBIDParent` varchar(255) DEFAULT NULL,
  `sName` varchar(100) DEFAULT NULL,
  `dtDOB` datetime DEFAULT NULL,
  `sGender` varchar(1) DEFAULT NULL,
  `sChildID` varchar(50) DEFAULT NULL,
  `sGBIDChild` varchar(100) DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `sGBIDParent` (`sGBIDParent`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;

CREATE TABLE `lnkFeatureUserRights` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `nFeatureID` int(11) Not NULL,
  `nUserRightsID` int(11) Not NULL,
  `bRights` tinyint(1) NOT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;

-- 
-- Store Procedure GreenBook By GBID
-- 

DROP procedure IF EXISTS `spGetGreenBookByGBID`;

DELIMITER $$
CREATE PROCEDURE `spGetGreenBookByGBID` (IN sGBIDIN VARCHAR(255))
BEGIN
	SELECT * FROM tblgreenbook where sGBID = sGBIDIN;
END$$

DELIMITER ;


DROP procedure IF EXISTS `spGetNewGreenBookDataByFormNo`;

DELIMITER $$

CREATE PROCEDURE `spGetNewGreenBookDataByFormNo` (IN nFormNumberIN int(11))
BEGIN
	select ID, sAuthRegion, sCountryID from lstauthregion;
    select ID, sCountry, sCountryID from lstcountry ;
    select Id, sProvince from lstProvince;
    select Id, sQualification, sQualificationID from lstQualification order by sQualification;
    select Id, sOccupationDesc from lstoccupation order by sOccupationDesc;
    select Id, sDOBApproxID, sDOBApproxName from lstDOBApprox;
    select tblgivengbid.nGBId as nGBId, tblMadeb.* from tblMadeb 
    inner join tblgivengbid on tblMadeb.nFormNumber = tblgivengbid.nFormNo
    where tblMadeb.nMadebTypeId = 1 and tblMadeb.nFormNumber = nFormNumberIN;
END$$

DELIMITER ;


DROP procedure IF EXISTS `spGetNewMadebData`;

DELIMITER $$
CREATE PROCEDURE `spGetNewMadebData` ()
BEGIN
	select Id, sMadebDisplayName from lstmadebtype;
select ID, sAuthRegion from lstauthregion;
select Id, sTypeIssued from lsttypeissued;
select Id, sMadebStatus from lstmadebstatus;
-- select 7000 as nFormNumber;
select IF(IFNULL(nFormNumber,0), IFNULL(nFormNumber,0) + 1,7000) as nFormNumber from tblmadeb order by nFormNumber desc limit 0,1;
END$$

DELIMITER ;

DROP procedure IF EXISTS `spDeleteGreenBook`;

DELIMITER $$

CREATE PROCEDURE `spDeleteGreenBook`(IN sGBIDIN VARCHAR(255), OUT result INT)

BEGIN
	
    SET SQL_SAFE_UPDATES=0;
 
	DELETE FROM lnkGBRelation WHERE lnkGBRelation.sGBID = sGBIDIN;
	DELETE FROM lnkGBDocument WHERE lnkGBDocument.sGBID = sGBIDIN;
	DELETE FROM lnkGBNote WHERE lnkGBNote.sGBID = sGBIDIN;
	DELETE FROM lnkGBChildren WHERE lnkGBChildren.sGBIDParent = sGBIDIN;

	DELETE FROM tblGivenGBID WHERE tblGivenGBID.nGBID = sGBIDIN;
	DELETE FROM tblGreenBookIssued WHERE tblGreenBookIssued.nGBID = sGBIDIN;
	DELETE FROM tblGreenBookSerial WHERE tblGreenBookSerial.sGBID = sGBIDIN;

	DELETE FROM tblRecentlySearchedGB WHERE tblRecentlySearchedGB.nGBID = sGBIDIN;
	DELETE FROM tblAuditLog WHERE tblAuditLog.sGBID = sGBIDIN;
	DELETE FROM tblMadeb WHERE tblMadeb.sGBID = sGBIDIN;
	DELETE FROM tblgreenbook WHERE tblgreenbook.sGBID = sGBIDIN;
    
    SET result = row_count();
END$$

DELIMITER ;

DROP procedure IF EXISTS `spGetUserAuthorization`;

DELIMITER $$
CREATE PROCEDURE `spGetUserAuthorization` (IN nUserIdIN int(11))
BEGIN
	 SELECT `Id`,
		 `sUsername`,
		 `sFullName`,
		 `sOffice`,
		 `nUserRightsId`,
		 `bActive`
	 FROM `tbluser`
	 WHERE 
		`Id` = nUserIdIN
		AND 
		bActive = 1;
	 
	SELECT `Id`,
		 `sUserRightsName`
	 FROM `lstuserrights`
	 WHERE Id IN (Select `nUserRightsId` from tblUser where Id = nUserIdIN);
	 
	  
	SELECT `Id`,
		 `nFeatureID`,
		 `nUserRightsID`,
		 `bRights`
	 FROM `lnkfeatureuserrights`
	 WHERE nUserRightsID IN (Select `nUserRightsId` from tblUser where Id = nUserIdIN) and bRights=1;
END$$

DELIMITER ;



DROP procedure IF EXISTS `spGetFeatureUserRights`;

DELIMITER $$
CREATE PROCEDURE `spGetFeatureUserRights` ()
BEGIN

	SET @sql = NULL;
	SELECT
	  GROUP_CONCAT(DISTINCT
		CONCAT(
		  'SUM(CASE WHEN (lfu.nUserRightsID=''',
		  lfu.nUserRightsID,
		  ''') THEN lfu.bRights ELSE null END) ''',
		  ur.sUserRightsName, ''''
		)
	  ) INTO @sql
	FROM
	  lnkfeatureuserrights lfu
	LEFT JOIN lstuserrights ur
		ON ur.Id = lfu.nUserRightsID;
		

	SET @sql = CONCAT('SELECT lfu.nFeatureID,  
						lf.sFeature, ', @sql, ' 
						FROM lnkfeatureuserrights lfu
						LEFT JOIN lstfeature lf
								ON lf.Id = lfu.nFeatureID
						GROUP BY lfu.nFeatureID');
	-- select @sql;


	PREPARE stmt FROM @sql;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
	
	
	
	SELECT Id, sUserRightsName from lstuserrights;
	
	SELECT Id, sFeature from lstFeature;
END$$

DELIMITER ;


DROP procedure IF EXISTS `spGetNewGreenBookSerialData`;
DELIMITER $$
CREATE PROCEDURE `spGetNewGreenBookSerialData`()
BEGIN
    SELECT Id, sMadebType FROM lstmadebtype;
    SELECT ID, sAuthRegion FROM lstauthregion;
    SELECT ID, sCountryID, sCountry FROM lstcountry;
    SELECT max(nBookNo) + 1 AS nBookNo FROM tblgreenbookserial;
END$$
DELIMITER ;

DROP procedure IF EXISTS `spGetFormNumber`;
DELIMITER $$
CREATE PROCEDURE `spGetFormNumber`(IN formNumberIN INT, OUT result INT)
BEGIN
    DECLARE exist BOOLEAN;
   
   
    SELECT EXISTS (SELECT nFormNumber FROM tblmadeb WHERE nFormNumber = formNumberIN) INTO exist;
    IF (exist) THEN
        SELECT MAX(nFormNumber+1) FROM tblmadeb INTO formNumberIN;
       
    END IF;
    SET result = formNumberIN;
    SELECT result;
END$$
DELIMITER ;


DROP procedure IF EXISTS `spReportGreenBookIssuedOverAll`;

DELIMITER $$
CREATE PROCEDURE spReportGreenBookIssuedOverAll
(
    IN sMadebDisplayKey varchar(5)
    ,IN dtRecordFrom date
    ,IN dtRecordTo date
    ,IN sOrderBy varchar(255)
)
BEGIN

    SET @SQLText = CONCAT('select 
		DISTINCT tblgreenbookissued.nGBId, 
		tblgreenbook.sFirstName, 
		tblgreenbook.sMiddleName, 
		tblgreenbook.sLastName, 
		tblgreenbookissued.dtIssuedDate, 
		tblgreenbookserial.nBookNo, 
		lstauthregion.sAuthRegion,
        lstauthregion.sCountryID
	from 
		tblgreenbookissued
	inner join (tblgreenbook, tblgreenbookserial, lstauthregion) 
		on 
			(
				tblgreenbookissued.nGBId=tblgreenbook.sGBId 
				and tblgreenbook.sGBId = tblgreenbookserial.sGBID
				and tblgreenbook.nAuthRegionID=lstauthregion.ID
			) 
	where 
		tblgreenbookissued.sWhyIssued=''', sMadebDisplayKey 
		,''' and ',IF(sMadebDisplayKey = 'F', "tblgreenbookissued.dtIssuedDate", "tblgreenbookissued.dtEntered" ),' > ''' ,  dtRecordFrom
		,''' and ',IF(sMadebDisplayKey = 'F', "tblgreenbookissued.dtIssuedDate", "tblgreenbookissued.dtEntered" ),' <= ''', dtRecordTo
	,''' order by ',sOrderBy );
    PREPARE stmt FROM @SQLText;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$
DELIMITER ;

DROP procedure IF EXISTS `spReportGreenBookIssuedIndividual`;
DELIMITER $$
CREATE PROCEDURE spReportGreenBookIssuedIndividual
(
    IN sMadebDisplayKey varchar(5)
    ,IN dtRecordFrom date
    ,IN dtRecordTo date
    ,IN sGroupBy varchar(255)
    ,IN sOrderBy varchar(255)
)
BEGIN
    declare SQLText varchar(5000);
    SET @SQLText = CONCAT('select 
     ',IF(sOrderBy = 'lstauthregion.sAuthRegion', "lstauthregion.sAuthRegion", "distinct lstcountry.sCountry" ),' as IndividualPlace ,  
    count(tblgreenbookissued.nGBId) as nCount 
from 
    tblgreenbookissued
inner join (',IF(sOrderBy = 'lstauthregion.sAuthRegion', "lstauthregion", "tblgreenbook, lstcountry" ),')
    on (
            ',IF(sOrderBy = 'lstauthregion.sAuthRegion', "tblgreenbookissued.nAuthRegionId=lstauthregion.ID", "tblgreenbookissued.nGBId=tblgreenbook.sGBId 
            and tblgreenbook.sCountryID=lstcountry.sCountryID" ),'
        )
where 
    tblgreenbookissued.sWhyIssued= ''', sMadebDisplayKey 
    ,''' and ',IF(sMadebDisplayKey = 'F', "tblgreenbookissued.dtIssuedDate", "tblgreenbookissued.dtEntered" ),' > ''' ,  dtRecordFrom
    ,''' and ',IF(sMadebDisplayKey = 'F', "tblgreenbookissued.dtIssuedDate", "tblgreenbookissued.dtEntered" ),' <= ''', dtRecordTo
    ,''' group by ',sGroupBy 
     ,' order by ',sOrderBy );
    -- select @SQLText;
    PREPARE stmt FROM @SQLText;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$
DELIMITER ;

DROP procedure IF EXISTS `spReportCTAChangesLog`;
DELIMITER $$
CREATE PROCEDURE spReportCTAChangesLog
(
   IN dtRecordFrom date
   
)
BEGIN
    declare SQLText varchar(5000);
    SET @SQLText = CONCAT('select 
			tblauditlog.sGBID, 
			concat(tblgreenbook.sFirstName, tblgreenbook.sLastName) as sName, 
		   lstfeature.sFeature, 
			tblauditlog.sFieldValuesOld, 
			tblauditlog.sFieldValuesNew, 
			tbluser.sFullName, 
			tblauditlog.dtEntered
		from 
			tblauditlog
		inner join tbluser 
			on tblauditlog.nEnteredBy=tbluser.id
		Left Join tblgreenbook
			on tblauditlog.sGBID = tblgreenbook.sGBID
		Left Join lstfeature
			on tblauditlog.nFeatureID = lstfeature.Id
		where DATE_FORMAT(tblauditlog.dtEntered, ''%Y-%m-%d'') > ',dtRecordFrom );
    -- select @SQLText;
    PREPARE stmt FROM @SQLText;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$
DELIMITER ;

DROP procedure IF EXISTS `spReportCTAChangesLogForChildren`;
DELIMITER $$
CREATE PROCEDURE spReportCTAChangesLogForChildren
(
   IN dtRecordFrom date
   
)
BEGIN
    declare SQLText varchar(5000);
    SET @SQLText = CONCAT('select 
			tblauditlog.sGBID, 
			concat(tblgreenbook.sFirstName, tblgreenbook.sLastName) as sName, 
		   lstfeature.sFeature, 
			tblauditlog.sFieldValuesOld, 
			tblauditlog.sFieldValuesNew, 
			tbluser.sFullName, 
			tblauditlog.dtEntered
		from 
			tblauditlog
		inner join tbluser 
			on tblauditlog.nEnteredBy=tbluser.id
		Left Join tblgreenbook
			on tblauditlog.sGBID = tblgreenbook.sGBID
		Left Join lstfeature
			on tblauditlog.nFeatureID = lstfeature.Id
		where DATE_FORMAT(tblauditlog.dtEntered, ''%Y-%m-%d'') > ',dtRecordFrom );
    -- select @SQLText;
    PREPARE stmt FROM @SQLText;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$
DELIMITER ;


DROP procedure IF EXISTS `spReportCTANewEntryFromDay`;
DELIMITER $$
CREATE PROCEDURE spReportCTANewEntryFromDay
(
   IN dtRecordFrom date
   
)
BEGIN
    declare SQLText varchar(5000);
    SET @SQLText = CONCAT('SELECT 
		tblgreenbook.sGBID, 
		tblgreenbook.sFirstName, 
		tblgreenbook.sLastName, 
		tblgreenbook.dtEntered, 
		tbluser.sFullName, 
		tbluser.sOffice
	FROM 
		tblgreenbook 
	INNER JOIN tblUser
		ON 
			(
				tblgreenbook.nEnteredBy=tblUser.id
			) 
	WHERE 
		DATE_FORMAT(tblgreenbook.dtEntered, ''%Y-%m-%d'') > ',dtRecordFrom );
    -- select @SQLText;
    PREPARE stmt FROM @SQLText;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$
DELIMITER ;


DROP procedure IF EXISTS `spReportCTABelow6Years`;

DELIMITER $$
CREATE PROCEDURE spReportCTABelow6Years
(
    IN sOrderBy varchar(255)
)
BEGIN

    SET @SQLText = CONCAT('select 
		tblgreenbook.sGBId, 
		tblgreenbook.sFirstName, 
		tblgreenbook.sLastName, 
		tblgreenbook.dtDOB, 
		',IF(sOrderBy = 'lstauthregion.sAuthRegion', "lstauthregion.sAuthRegion", "lstcountry.sCountry" ),' as sPlace
	from 
		tblgreenbook 
	inner join ',IF(sOrderBy = 'lstauthregion.sAuthRegion', "lstauthregion", "lstcountry" ),' 
		on 
			(',IF(sOrderBy = 'lstauthregion.sAuthRegion', "tblgreenbook.nAuthRegionID=lstauthregion.ID", "tblgreenbook.sCountryID=lstcountry.sCountryID" ),') 
	where 
		DATE_FORMAT(NOW(), ''%Y'') - DATE_FORMAT(tblgreenbook.dtDOB, ''%Y'') - (DATE_FORMAT(NOW(), ''00-%m-%d'') < DATE_FORMAT(tblgreenbook.dtDOB, ''00-%m-%d'')) < 6 
	order by ',sOrderBy );
    PREPARE stmt FROM @SQLText;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$
DELIMITER ;


DROP procedure IF EXISTS `spReportCTADeceasedRegionOrCountryWise`;

DELIMITER $$
CREATE PROCEDURE `spReportCTADeceasedRegionOrCountryWise`(
    IN dtRecordFrom date
    ,IN dtRecordTo date
    ,IN sOrderBy varchar(255)
)
BEGIN
    -- declare SQLText varchar(5000);
    SET @SQLText = CONCAT('select 
            tblgreenbook.sGBID, 
            tblgreenbook.sFirstName, 
            tblgreenbook.sLastName, 
            tblgreenbook.dtDOB, 
            tblgreenbook.dtDeceased, 
            ',IF(sOrderBy like '%lstauthregion.sAuthRegion%', "lstauthregion.sAuthRegion", "lstcountry.sCountry" ),' as sPlace, 
            DATE_FORMAT(tblgreenbook.dtDeceased, ''%Y'') - DATE_FORMAT(tblgreenbook.dtDOB, ''%Y'') - (DATE_FORMAT(tblgreenbook.dtDeceased, ''00-%m-%d'') < DATE_FORMAT(tblgreenbook.dtDOB, ''00-%m-%d'')) as DeathAge 
        from 
            tblgreenbook 
        inner join ',IF(sOrderBy like '%lstauthregion.sAuthRegion%', "lstauthregion", "lstcountry" ),' 
            on (',IF(sOrderBy like '%lstauthregion.sAuthRegion%', "tblgreenbook.nAuthRegionId=lstauthregion.ID", "tblgreenbook.sCountryID=lstcountry.sCountryID" ),') 
        where 
            date(tblgreenbook.dtDeceased) >= ''', dtRecordFrom ,''' 
            and date(tblgreenbook.dtDeceased) < ''', dtRecordTo ,''' 
            and tblgreenbook.dtDeceased is not null
        order by ', sOrderBy ,', tblgreenbook.dtDeceased');
        
        --  select @SQLText;
    PREPARE stmt FROM @SQLText;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$
DELIMITER ;

DROP procedure IF EXISTS `spReportCTAMadebRegionOrCountryWise`;

DELIMITER $$
CREATE PROCEDURE spReportCTAMadebRegionOrCountryWise
(
	IN sMadebDisplayKey varchar(255)
	,IN dtRecordFrom date
    ,IN dtRecordTo date
    ,IN sOrderBy varchar(255)
)
BEGIN
	-- declare SQLText varchar(5000);

	SET @SQLText = CONCAT('SELECT 
				DISTINCT(',IF(sOrderBy like '%lstauthregion.sAuthRegion%', "lstAuthRegion.sAuthRegion", "lstcountry.sCountry" ),') as sPlaceName 
				,CONVERT(',IF(sOrderBy like '%lstauthregion.sAuthRegion%', "lstAuthRegion.ID" , "lstcountry.sCountryID" ),',CHAR) as sPlaceID
				,sum(tblMadeb.nIssuedOrNotID = 2) as MadebIssued
				,sum(tblMadeb.nIssuedOrNotID = 3) as MadebRejected
				,sum(tblMadeb.nIssuedOrNotID = 4) as MadebDouble
				,sum(tblMadeb.nIssuedOrNotID = 5) as MadebCancelled
				,sum(tblMadeb.nIssuedOrNotID <= 1) as MadebPending
				,Count(tblMadeb.nIssuedOrNotID) as MadebTotalReceived
			FROM 
				tblMadeb 
			INNER JOIN ',IF(sOrderBy like '%lstauthregion.sAuthRegion%', "lstAuthRegion
	ON tblMadeb.nAuthRegionID=lstAuthRegion.ID", "(lstAuthRegion,lstCountry)
				ON (tblMadeb.nAuthRegionID=lstAuthRegion.ID 
				AND lstcountry.sCountryID=lstAuthRegion.sCountryID)" ),'
			INNER JOIN lstMadebType
				ON tblMadeb.nMadebTypeID=lstMadebType.ID
			WHERE
				lstMadebType.sMadebDisplayKey=''', sMadebDisplayKey ,''' 
			and DATE(tblMadeb.dtReceived) >= ''', dtRecordFrom ,''' 
			and DATE(tblMadeb.dtReceived) < ''', dtRecordTo ,'''
	GROUP BY ',IF(sOrderBy like '%lstauthregion.sAuthRegion%', "lstAuthRegion.sAuthRegion", "lstcountry.sCountry" ),'
	ORDER BY  ', sOrderBy );
        
          
  --	select @SQLText;
  PREPARE stmt FROM @SQLText;
  EXECUTE stmt;
  DEALLOCATE PREPARE stmt;
END$$
DELIMITER ;


DROP procedure IF EXISTS `spReportChatrelRecordsRegionOrCountryWise`;

DELIMITER $$
CREATE PROCEDURE spReportChatrelRecordsRegionOrCountryWise
(
	IN dtRecordFrom date
    ,IN dtRecordTo date
    ,IN sOrderBy varchar(255)
)
BEGIN
	-- declare SQLText varchar(5000);

	SET @SQLText = CONCAT('SELECT `lnkgbchatrel`.`Id`,
    `lnkgbchatrel`.`chatrelpaymentID`,
    `lnkgbchatrel`.`sGBId`,
    `lnkgbchatrel`.`nChatrelAmount`,
    `lnkgbchatrel`.`nChatrelMeal`,
    `lnkgbchatrel`.`nChatrelYear`,
    `lnkgbchatrel`.`nChatrelLateFeesPercentage`,
    `lnkgbchatrel`.`nChatrelLateFeesValue`,
    `lnkgbchatrel`.`nArrearsAmount`,
    `lnkgbchatrel`.`dtArrearsFrom`,
    `lnkgbchatrel`.`dtArrearsTo`,
    `lnkgbchatrel`.`nCurrentChatrelSalaryAmt`,
    `lnkgbchatrel`.`dtCurrentChatrelFrom`,
    `lnkgbchatrel`.`dtCurrentChatrelTo`,
    `lnkgbchatrel`.`nChatrelTotalAmount`,
    `lnkgbchatrel`.`sChatrelReceiptNumber`,
    `lnkgbchatrel`.`nAuthRegionID`,
    `lnkgbchatrel`.`sCountryID`,
    `lnkgbchatrel`.`sPaymentCurrency`,
    `lnkgbchatrel`.`sAuthRegionCurrency`,
    `lnkgbchatrel`.`nConversionRate`,
    `lnkgbchatrel`.`sPaidByGBId`,
    `lnkgbchatrel`.`dtPayment`,
    `lnkgbchatrel`.`dtEntered`,
    `lnkgbchatrel`.`nEnteredBy`,
    `lnkgbchatrel`.`dtUpdated`,
    `lnkgbchatrel`.`nUpdatedBy`
FROM `lnkgbchatrel`
where 
	 DATE(lnkgbchatrel.dtEntered) >= ''', dtRecordFrom ,''' 
			and DATE(lnkgbchatrel.dtEntered) < ''', dtRecordTo ,'''
		ORDER BY  ', sOrderBy );
        
          
        --	select @SQLText;
    PREPARE stmt FROM @SQLText;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$
DELIMITER ;


DROP procedure IF EXISTS `spReportChatrelSuccessRecordsRegionOrCountryWise`;

DELIMITER $$
CREATE PROCEDURE spReportChatrelSuccessRecordsRegionOrCountryWise
(
	IN dtRecordFrom date
    ,IN dtRecordTo date
    ,IN sOrderBy varchar(255)
)
BEGIN
	-- declare SQLText varchar(5000);

	SET @SQLText = CONCAT('SELECT `lnkgbchatrel`.`Id`,
    `lnkgbchatrel`.`chatrelpaymentID`,
    `lnkgbchatrel`.`sGBId`,
    `lnkgbchatrel`.`nChatrelAmount`,
    `lnkgbchatrel`.`nChatrelMeal`,
    `lnkgbchatrel`.`nChatrelYear`,
    `lnkgbchatrel`.`nChatrelLateFeesPercentage`,
    `lnkgbchatrel`.`nChatrelLateFeesValue`,
    `lnkgbchatrel`.`nArrearsAmount`,
    `lnkgbchatrel`.`dtArrearsFrom`,
    `lnkgbchatrel`.`dtArrearsTo`,
    `lnkgbchatrel`.`nCurrentChatrelSalaryAmt`,
    `lnkgbchatrel`.`dtCurrentChatrelFrom`,
    `lnkgbchatrel`.`dtCurrentChatrelTo`,
    `lnkgbchatrel`.`nChatrelTotalAmount`,
    `lnkgbchatrel`.`sChatrelReceiptNumber`,
    `lnkgbchatrel`.`nAuthRegionID`,
    `lnkgbchatrel`.`sCountryID`,
    `lnkgbchatrel`.`sPaymentCurrency`,
    `lnkgbchatrel`.`sAuthRegionCurrency`,
    `lnkgbchatrel`.`nConversionRate`,
    `lnkgbchatrel`.`sPaidByGBId`,
    `lnkgbchatrel`.`dtPayment`,
    `lnkgbchatrel`.`dtEntered`,
    `lnkgbchatrel`.`nEnteredBy`,
    `lnkgbchatrel`.`dtUpdated`,
    `lnkgbchatrel`.`nUpdatedBy`
FROM `lnkgbchatrel`
inner join `tblchatrelpayment`
	on tblchatrelpayment.Id = lnkgbchatrel.chatrelpaymentID
where 
	 DATE(lnkgbchatrel.dtEntered) >= ''', dtRecordFrom ,''' 
			and DATE(lnkgbchatrel.dtEntered) < ''', dtRecordTo ,'''
            and tblchatrelpayment.sPaymentStatus=''Success''
		ORDER BY  ', sOrderBy );
        
          
        --	select @SQLText;
    PREPARE stmt FROM @SQLText;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$
DELIMITER ;


DROP procedure IF EXISTS `spReportChatrelFailedRecordsRegionOrCountryWise`;

DELIMITER $$
CREATE PROCEDURE spReportChatrelFailedRecordsRegionOrCountryWise
(
	IN dtRecordFrom date
    ,IN dtRecordTo date
    ,IN sOrderBy varchar(255)
)
BEGIN
	-- declare SQLText varchar(5000);

	SET @SQLText = CONCAT('SELECT `lnkgbchatrel`.`Id`,
    `lnkgbchatrel`.`chatrelpaymentID`,
    `lnkgbchatrel`.`sGBId`,
    `lnkgbchatrel`.`nChatrelAmount`,
    `lnkgbchatrel`.`nChatrelMeal`,
    `lnkgbchatrel`.`nChatrelYear`,
    `lnkgbchatrel`.`nChatrelLateFeesPercentage`,
    `lnkgbchatrel`.`nChatrelLateFeesValue`,
    `lnkgbchatrel`.`nArrearsAmount`,
    `lnkgbchatrel`.`dtArrearsFrom`,
    `lnkgbchatrel`.`dtArrearsTo`,
    `lnkgbchatrel`.`nCurrentChatrelSalaryAmt`,
    `lnkgbchatrel`.`dtCurrentChatrelFrom`,
    `lnkgbchatrel`.`dtCurrentChatrelTo`,
    `lnkgbchatrel`.`nChatrelTotalAmount`,
    `lnkgbchatrel`.`sChatrelReceiptNumber`,
    `lnkgbchatrel`.`nAuthRegionID`,
    `lnkgbchatrel`.`sCountryID`,
    `lnkgbchatrel`.`sPaymentCurrency`,
    `lnkgbchatrel`.`sAuthRegionCurrency`,
    `lnkgbchatrel`.`nConversionRate`,
    `lnkgbchatrel`.`sPaidByGBId`,
    `lnkgbchatrel`.`dtPayment`,
    `lnkgbchatrel`.`dtEntered`,
    `lnkgbchatrel`.`nEnteredBy`,
    `lnkgbchatrel`.`dtUpdated`,
    `lnkgbchatrel`.`nUpdatedBy`
FROM `lnkgbchatrel`
inner join `tblchatrelpayment`
	on tblchatrelpayment.Id = lnkgbchatrel.chatrelpaymentID
where 
	 DATE(lnkgbchatrel.dtEntered) >= ''', dtRecordFrom ,''' 
			and DATE(lnkgbchatrel.dtEntered) < ''', dtRecordTo ,'''
            and tblchatrelpayment.sPaymentStatus=''Failed''
		ORDER BY  ', sOrderBy );
        
          
        --	select @SQLText;
    PREPARE stmt FROM @SQLText;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$
DELIMITER ;




CREATE INDEX MDB_GBID ON tblmadeb(sGBID);
CREATE INDEX GREENBOOK_GBID ON tblgreenbook(sGBID);
CREATE INDEX GBID_RELATION ON lnkgbrelation(sgbidrelation, nrelationid);
CREATE INDEX GB_DOC_GBID ON lnkgbdocument (sGBID);



