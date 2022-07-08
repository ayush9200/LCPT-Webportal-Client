import React, {useState,useEffect} from 'react'
import { Form, Row, Col, Button, Container } from 'react-bootstrap'
import axios from 'axios';
import { useParams } from "react-router-dom";
import { BASE_API_URL } from '../Url-config';
import { BASE_URL_FRONTEND } from '../Url-config';



const intialState = {
    firstName:'',
    lastName:'',
    userName:'',
    password:'',
    confirmPassword:'',
    dob:'',
    email:'',
    number:'',
    address:'',
    country:'',
    city:'',
    state:'',
    postalCode:''

}

const data = {
    countries: [
        {
        name: "Germany",
        states: [
            {
            name: "A",
            cities: ["Duesseldorf", "Leinfelden-Echterdingen", "Eschborn"]
            }
        ]
        },
        { name: "Spain", states: [{ name: "B", cities: ["Barcelona"] }] },

        { name: "USA", states: [{ name: "C", cities: ["Downers Grove"] },{name: "Buffalo", cities: ["asdk"]}] },
        {
        name: "Mexico",
        states: [{ name: ["D", "F", "H"], cities: ["Puebla"] }]
        },
        {
            name: "Canada",
            states: [
                { name: "Ontario", cities: ["Toronto","Ottawa","Mississauga","Hamilton","Brampton","Kitchener","London","Markham","St. Catharines","Niagara Falls","Vaughan","Windsor","Richmond Hill","Oakville","Burlington","Barrie","Oshawa","Guelph","Cambridge","Whitby","Ajax","Milton","Thunder Bay","Waterloo","Chatham","Brantford","Clarington","Pickering","Sudbury","Newmarket","Peterborough","Kawartha Lakes","Sault Ste. Marie","Sarnia","Caledon","St. Thomas","Halton Hills","Aurora","Welland","North Bay","Belleville","Cornwall","Stouffville","Georgina","Quinte West","Timmins","New Tecumseth","Woodstock","Brant","Lakeshore","Innisfil","Bradford West Gwillimbury","Leamington","Owen Sound","Stratford","Orillia","Orangeville","Fort Erie","LaSalle","Centre Wellington","Grimsby","Woolwich","Clarence-Rockland","East Gwillimbury","Lincoln","Tecumseh","Amherstburg","Brockville","Collingwood","Scugog","Kingsville","Uxbridge","Essa","Oro-Medonte","Strathroy-Caradoc","Wasaga Beach","Wilmot","Essex","Huntsville","Cobourg","Springwater","Thorold","South Frontenac","Port Colborne","Niagara-on-the-Lake","Middlesex Centre","Petawawa","Pelham","Selwyn","Loyalist","Midland","Port Hope","Russell","North Grenville","Bracebridge","Greater Napanee","Tillsonburg","Kenora","West Lincoln","West Nipissing / Nipissing Ouest","Clearview","St. Clair","Pembroke","Saugeen Shores","Severn","Thames Centre","Mississippi Mills","South Glengarry","North Perth","South Stormont","Trent Hills","Guelph/Eramosa","The Nation / La Nation","Ingersoll","Central Elgin","West Grey","Gravenhurst","Perth East","Wellington North","Carleton Place","Brighton","Tiny","Brock","Erin","Kincardine","North Dundas","Wellesley","Norwich","Meaford","Adjala-Tosorontio","Hamilton Township","South Dundas","Elliot Lake","Lambton Shores",
                "Mapleton","Georgian Bluffs","Hawkesbury","North Dumfries","Rideau Lakes","North Glengarry","South Huron","Tay","Temiskaming Shores","Elizabethtown-Kitley","Grey Highlands","Alfred and Plantagenet","Ramara","Leeds and the Thousand Islands","Brockton","Laurentian Valley","Malahide","Huron East","Penetanguishene","West Perth","Cavan Monaghan","Arnprior","Smiths Falls","Champlain","Minto","Mono","South Bruce Peninsula","Kapuskasing","Renfrew","Zorra","Shelburne","Kirkland Lake","Drummond/North Elmsley","Dryden","Fort Frances","Stone Mills","Hanover","South-West Oxford","Beckwith","Goderich","Plympton-Wyoming","Central Huron","Aylmer","Blandford-Blenheim","Bayham","Augusta","Puslinch","St. Marys","Southgate","McNab/Braeside","Bluewater","East Zorra-Tavistock","Huron-Kinloss","The Blue Mountains","Whitewater Region","Edwardsburgh/Cardinal","North Stormont","Alnwick/Haldimand","Arran-Elderslie","Douro-Dummer","Otonabee-South Monaghan","Chatsworth","Muskoka Falls","Parry Sound","Wainfleet","Cramahe","North Middlesex","Dysart et al","Hindon Hill","Tweed","Perth","Oliver Paipoonge","Petrolia","Southwest Middlesex","Front of Yonge","Tay Valley","South Bruce","Ashfield-Colborne-Wawanosh","Trent Lakes","Lanark Highlands","Cochrane","Sioux Lookout","Gananoque","Hearst","Espanola","West Elgin","North Huron","Stirling-Rawdon","Centre Hastings","East Ferris","Lucan Biddulph","Greenstone","Iroquois Falls","Havelock-Belmont-Methuen","Southwold","Central Frontenac","Seguin","Tyendinaga","Madawaska Valley","Deep River","Asphodel-Norwood","Red Lake","Hastings Highlands","Northern Bruce Peninsula","Prescott","Amaranth","Marmora and Lake","Bancroft","Howick","Dutton/Dunwich","Callander","Perth South","Breslau","Montague","Warwick","Bonnechere Valley","Casselman","Morris-Turnberry",
                "Mulmur","Blind River","Powassan","Highlands East","East Hawkesbury","Marathon","Sables-Spanish Rivers","Lake of Bays","Merrickville","Athens","Melancthon","Adelaide-Metcalfe","Laurentian Hills","Grand Valley","Admaston/Bromley","North Algona Wilberforce","Wawa","Horton","Shuniah","Enniskillen","Atikokan","Northeastern Manitoulin and the Islands","McDougall","French River / Riviere des Francais","Markstay","East Garafraxa","Greater Madawaska","Georgian Bay","North Kawartha","Perry","Black River-Matheson","Killaloe, Hagarty and Richards","Alvinston","Algonquin Highlands","Addington Highlands","Central Manitoulin","Madoc","Neebing","Point Edward","Mattawa","Bonfield","Dawn-Euphemia","Chapleau","Manitouwadge","Wellington","North Frontenac","Deseronto","Frontenac Islands","Komoka","Nipissing","Huron Shores","Nipigon","Burford","Terrace Bay","Macdonald, Meredith and Aberdeen Additional","Brudenell, Lyndoch and Raglan","Moosonee","Englehart","Strong","Lappe","Armour","Faraday","Magnetawan","Emo","Smooth Rock Falls","Chisholm","Thessalon","Conestogo","St.-Charles","St. Joseph","Moonbeam","Bayfield","Ignace","Claremont","Armstrong","Sagamok","Tara","Carling","Hillsburgh","Cobalt","South River","McKellar","South Algonquin","Sioux Narrows-Nestor Falls","King","Hensall","Schreiber","Beachburg","Laird","Plantagenet","Papineau-Cameron","Assiginack","Prince"]},
                { name: "British Columbia", cities: ["Vancouver","Surrey","Victoria","Burnaby","Richmond","Kelowna","Abbotsford","Coquitlam","Langley","Saanich","Delta","Kamloops","Nanaimo","North Vancouver","Chilliwack","White Rock","Maple Ridge","Prince George","New Westminster","Port Coquitlam","Vernon","Duncan","West Vancouver","Mission","Langford Station","Campbell River","Penticton","Port Moody","East Kelowna","North Cowichan","Courtenay","Fort St. John","Squamish","Cranbrook","Pitt Meadows","Oak Bay","Salmon Arm","Port Alberni","Esquimalt","Colwood","Central Saanich","Terrace","Comox","Powell River","Sooke","Dawson Creek","Lake Country","Parksville","Prince Rupert","Whistler","Sidney","Summerland","North Saanich","Williams Lake","Nelson","View Royal","Coldstream","Sechelt","Quesnel","Qualicum Beach","Ladysmith","Kitimat","Castlegar","Trail","Kimberley","Merritt","Hope","Kent","Peachland","Northern Rockies","Creston","Smithers","Fernie","Spallumcheen","Osoyoos","Oliver","Armstrong","Metchosin","Gibsons","Vanderhoof","Grand Forks","Port Hardy","Sparwood","Cumberland","Rossland","Mackenzie","Golden","Bowen Island","Fruitvale","Westbank","Lumby","Invermere","Lake Cowichan","Ellison","Houston","Enderby","Cedar","Princeton","Errington","Chetwynd","Pemberton","Elkford","Sicamous","Clearwater","Lillooet","Chase","Highlands","Anmore","Cowichan Bay","Logan Lake","Saltair","Port McNeill","Tumbler Ridge","One Hundred Mile House","Tofino","Nisga'a","Burns Lake","Warfield","Ucluelet","Barriere","Naramata","Royston","Coombs","Nakusp","Lakeview","Fort St. James","Ashcroft","Hilliers","Keremeos","Gold River","Grindrod","Harrison Hot Springs","Popkum","Taylor","Lions Bay","Dunsmuir","Telkwa","Sorrento","Kaleden","Salmo","Windermere","Youbou","Ootischenia","Valemount","Hudson Hope"]},
                { name: "Manitoba", cities: ["Winnipeg","Brandon","Steinbach","Hanover","Springfield","Thompson","Portage La Prairie","Winkler","St. Andrews","Tache","St. Clements","Selkirk","East St. Paul","Stanley","Morden","Dauphin","Rockwood","Macdonald","Ritchot","Gimli","La Broquerie","The Pas","West St. Paul","Brokenhead","Ste. Anne","Flin Flon (Part)","Stonewall","Neepawa","Cornwallis","Altona","Niverville","Swan River","De Salaberry","Headingley","Killarney - Turtle Mountain","Woodlands","Bifrost-Riverton","Cartier","Alexander","Hillsburg-Roblin-Shell River","Lorette","WestLake-Gladstone","Beausejour","Lac du Bonnet","Virden","Morris","Carman","North Cypress-Langford","Minnedosa","Dufferin","Kelsey","Boissevain","Mitchell","West Interlake","Prairie View","McCreary","Deloraine-Winchester","Oakland-Wawanesa","Brenda-Waskada","Russell-Binscarth","Ellice-Archie","Souris-Glenwood","Riverdale","Pembina","Wallace-Woodworth","Lorne","Ethelbert","Yellowhead","Swan Valley West","Grey","Gilbert Plains","Norfolk-Treherne","Hamiota","Emerson-Franklin","Sifton","Rossburn","Grand View","Grassland","Louise","Ste. Rose","Cartwright-Roblin","Mossey River","Lakeshore","Riding Mountain West","Clanwilliam-Erickson","Glenboro-South Cypress","North Norfolk","Reinland","Minitonas-Bowsman","Armstrong","Piney","Carberry","Fisher","Grunthal","Blumenort","Rosedale","Whitehead","Stuartburn","Oakview","Harrison Park","Victoria","Pinawa","Pipestone","Prairie Lakes","St. Francois Xavier","Wasagamack","Rosser","Grahamdale","Reynolds","St. Laurent","Powerview-Pine Falls","Landmark","Elton","Gillam","Montcalm","Coldwell","Alonsa","Arborg","Teulon","Minto-Odanah","Glenella-Lansdowne","Two Borders","St-Pierre-Jolys","Winnipeg Beach","Roland","Melita","Argyle"]},
                { name: "New Brunswick", cities: ["Moncton","Dieppe","Saint John","Fredericton","Riverview","Quispamsis","Bathurst","Miramichi","Edmundston","Tracadie","Rothesay","Campbellton","Oromocto","Shediac","Beaubassin East / Beaubassin-est","Beresford","Douglas","Sackville","Grand Falls","Woodstock","Burton","Grand Bay-Westfield","Saint Marys","Shippagan","Memramcook","Hanwell","Coverdale","Saint Stephen","Hampton","Sussex","Caraquet","New Maryland","Dundas","Simonds","Alnwick","Atholville","Studholm","Salisbury","Bright","Dalhousie","Wellington","Kingston","Kingsclear","Wakefield","Cocagne","Shippegan","Lincoln","Cap Pele","Buctouche","Grand Manan","Saint George","Paquetville","Minto","Northesk","Upper Miramichi","Hardwicke","Saint-Quentin","Pennfield Ridge","Kent","Allardville","Saint-Charles","Kedgwick","Saint Mary","Westfield Beach","Eel River Crossing","Petit Rocher","Richibucto","Maugerville","Saint-Louis","Saint Andrews","Manners Sutton","Brighton","Saint-Antoine","Northampton","Wicklow","Southesk","Neguac","Balmoral","Florenceville","Saint-Jacques","Perth","Glenelg","Belledune","Saint-Joseph","Saint David","Springfield","St. George","Gordon","Southampton","Nauwigewauk","Denmark","Sussex Corner","Petitcodiac","Norton","Bas Caraquet","Cardwell","Weldford","Charlo","Hillsborough","Richmond","Saint-Leonard","Lameque","Upham","New Bandon","Peel","Musquash","Saint James","Queensbury","Rogersville","McAdam","Bertrand","Newcastle","Saint Martins","Saint-Andre","Chipman","Dorchester","Durham","Havelock","Botsford","Greenwich","Noonan","Plaster Rock","Wilmot"]},
                { name: "Newfoundland and Labrador", cities: ["St. John's","Conception Bay South","Mount Pearl Park","Paradise","Corner Brook","Grand Falls","Gander","Portugal Cove-St. Philip's","Happy Valley","Torbay","Labrador City","Stephenville","Clarenville","Bay Roberts","Marystown","Deer Lake","Carbonear","Goulds","Channel-Port aux Basques","Pasadena","Placentia","Bonavista","Lewisporte","Bishops Falls","Harbour Grace","Springdale","Botwood","Spaniards Bay","Holyrood","Burin","Grand Bank","St. Anthony","Fogo Island","Logy Bay-Middle Cove-Outer Cove","Twillingate","New-Wes-Valley","Wabana","Glovertown","Pouch Cove","Kippens","Gambo","Wabush","Trinity Bay North","Victoria","Stephenville Crossing","Flat Rock","Harbour Breton","Massey Drive","Witless Bay","Humbermouth","Upper Island Cove","Clarkes Beach","Bay Bulls","Irishtown-Summerside","Fortune","Baie Verte","Burgeo","Dildo","St. George's","St. Lawrence","St. Alban's","Centreville-Wareham-Trinity","Nain","Harbour Main-Chapel's Cove-Lakeview"]},
                { name: "Northwest Territories", cities: ["Yellowknife","Hay River","Inuvik","Fort Smith","Behchoko","Fort Simpson"]},
                { name: "Nova Scotia", cities: ["Halifax","Cape Breton","New Glasgow","Inverness","Truro","Kentville","Chester","Queens","Amherst","Bridgewater","Church Point","Argyle","Barrington","Yarmouth","Antigonish","Stellarton","Wolfville","Windsor","Westville","Port Hawkesbury","Pictou","Berwick","Trenton","Lunenburg","Lantz","Digby","Middleton","Shelburne","Stewiacke","Falmouth","Parrsboro","Oxford","Centreville","Wedgeport","Mahone Bay"]},
                { name: "Alberta", cities: ["Calgary","Edmonton","Red Deer","Lethbridge","Wood Buffalo","St. Albert","Medicine Hat","Grande Prairie","Airdrie","Spruce Grove","Leduc","Okotoks","Cochrane","Fort Saskatchewan","Chestermere","Lloydminster","Camrose","Beaumont","Stony Plain","Cold Lake","Sylvan Lake","Brooks","Canmore","Strathmore","High River","Lacombe","Wetaskiwin","Hinton","Morinville","Blackfalds","Olds","Taber","Edson","Coaldale","Drumheller","Banff","Innisfail","Drayton Valley","Ponoka","Peace River","Slave Lake","Rocky Mountain House","Devon","Wainwright","Bonnyville","Stettler","St. Paul","Vegreville","Redcliff","Crowsnest Pass","Didsbury","Westlock","Jasper","Barrhead","Vermilion","Carstairs","Claresholm","Raymond","Pincher Creek","Cardston","Grande Cache","Penhold","Three Hills","High Level","Gibbons","Crossfield","Fort Macleod","Athabasca","Sundre","Grimshaw","Black Diamond","Coalhurst","Sexsmith","Rimbey","High Prairie","Turner Valley","Hanna","Beaverlodge","Magrath","Calmar","Nanton","Tofield","Redwater","Provost","Bow Island","Fox Creek","Millet","Vulcan","Valleyview","Picture Butte","Lamont","Bon Accord","Wembley","Springbrook","Elk Point","Wabasca","Two Hills","Legal","Mayerthorpe","Bruederheim","Swan Hills","Nobleford","Bowden","Vauxhall","Irricana","Bassano","Manning","Eckville","Duchess","Viking","Whitecourt","Bentley","Trochu","Falher","Onoway","Alberta Beach","Oyen"]},
                { name: "Nunavut", cities: ["Iqaluit","Rankin Inlet","Arviat","Baker Lake","Cambridge Bay","Igloolik","Pond Inlet","Kugluktuk","Pangnirtung","Cape Dorset","Gjoa Haven","Repulse Bay","Clyde River","Taloyoak"] },
                { name: "Prince Edward Island", cities: ["Charlottetown","Summerside","Stratford","Cornwall","Montague","Kensington","Miltonvale Park","Alberton","Souris","Malpeque"]},
                { name: "Quebec", cities: ["Montreal","Quebec City","Laval","Gatineau","Longueuil","Sherbrooke","Saguenay","Levis","Trois-Rivieres","Terrebonne","Saint-Jean-sur-Richelieu","Brossard","Repentigny","Chateauguay","Saint-Jerome","Drummondville","Granby","Saint-Hyacinthe","Lac-Brome","Blainville","Beloeil","Mirabel","Shawinigan","Dollard-des-Ormeaux","Rimouski","Victoriaville","Saint-Eustache","Mascouche","Salaberry-de-Valleyfield","Rouyn-Noranda","Sorel-Tracy","Boucherville","Vaudreuil-Dorion","Cote-Saint-Luc","Val-d'Or","Pointe-Claire","Alma","Sainte-Julie","Chambly","Sept-Iles","Saint-Constant","Boisbriand","Saint-Bruno-de-Montarville","Sainte-Therese","Thetford Mines","Magog","La Prairie","Saint-Lambert","Baie-Comeau","Candiac","Varennes","Kirkland","L'Assomption","Westmount","Saint-Lazare","Joliette","Mont-Royal","Riviere-du-Loup","Beaconsfield","Dorval","Mont-Saint-Hilaire","Saint-Augustin-de-Desmaures","Sainte-Marthe-sur-le-Lac","Deux-Montagnes","Saint-Lin--Laurentides","Sainte-Catherine","L'Ancienne-Lorette","Saint-Basile-le-Grand","Gaspe","Pincourt","Matane","Sainte-Anne-des-Plaines","Rosemere","Mistassini","Mont-Laurier","Lavaltrie","Sainte-Sophie","Saint-Charles-Borromee","Mercier","Saint-Colomban","Sainte-Marie","Amos","Lachute","Cowansville","Becancour","Prevost","Sainte-Adele","Beauharnois","Les Iles-de-la-Madeleine","Val-des-Monts","Montmagny","La Tuque","Saint-Amable","L'Ile-Perrot","Notre-Dame-de-l'Ile-Perrot","Cantley","Rawdon","Saint-Felicien","Roberval","Sainte-Agathe-des-Monts","Marieville","Saint-Sauveur","Mont-Tremblant","Saint-Raymond","Bois-des-Filion","Carignan","Lorraine","Sainte-Julienne","Notre-Dame-des-Prairies","Pont-Rouge","Coaticook","Otterburn Park","Farnham","La Malbaie","Saint-Hippolyte","La Peche",
                "Nicolet","La Sarre","Chandler","Acton Vale","Bromont","Rigaud","Louiseville","Chibougamau","Delson","Beauport","Saint-Remi","Donnacona","Hampstead","Baie-Saint-Paul","Brownsburg","Stoneham-et-Tewkesbury","Asbestos","Coteau-du-Lac","Sainte-Anne-des-Monts","Old Chelsea","Saint-Zotique","Val-Shefford","Plessisville","Port-Cartier","Saint-Lambert-de-Lauzon","Boischatel","Pointe-Calumet","Beauceville","Amqui","Sainte-Catherine-de-la-Jacques-Cartier","Mont-Joli","Contrecoeur","Saint-Joseph-du-Lac","Saint-Apollinaire","Les Cedres","Saint-Felix-de-Valois","Saint-Calixte","Lac-Megantic","Charlemagne","Pontiac","Sainte-Brigitte-de-Laval","Princeville","Vercheres","Saint-Cesaire","McMasterville","Saint-Philippe","Richelieu","Notre-Dame-du-Mont-Carmel","L'Ange-Gardien","Sainte-Martine","Saint-Pie","Cookshire","Windsor","L'Epiphanie","Saint-Honore","Val-David","Hudson","Saint-Paul","Temiscouata-sur-le-Lac","Shannon","Montreal-Ouest","Saint-Henri","Sainte-Anne-de-Bellevue","Saint-Roch-de-l'Achigan","Chisasibi","Chertsey","Lanoraie","Warwick","Saint-Joseph-de-Beauce","Riviere-Rouge","Saint-Mathias-sur-Richelieu","Les Coteaux","Saint-Germain-de-Grantham","Saint-Boniface","Waterloo","Neuville","Saint-Cyrille-de-Wendover","Mont-Orford","Saint-Jean-de-Matha","La Pocatiere","Saint-Etienne-des-Gres","Saint-Donat","Chateau-Richer","Metabetchouan-Lac-a-la-Croix","Berthierville","Danville","Lac-Etchemin","Saint-Antonin","Saint-Jacques","Sutton","L'Islet-sur-Mer","Carleton-sur-Mer","Oka","Maniwaki","Morin-Heights","Napierville","Crabtree","Saint-Tite","Baie-d'Urfe","New Richmond","Roxton Pond","Beaupre","Saint-Andre-Avellin","Saint-Ambroise-de-Kildare","East Angus","Saint-Adolphe-d'Howard","Saint-Prosper","Ormstown","Saint-Agapit","Saint-Ambroise",
                "Mistissini","Saint-Faustin--Lac-Carre","Saint-Pascal","Dunham","Havre-Saint-Pierre","Saint-Anselme","Trois-Pistoles","Grande-Riviere","Malartic","Saint-Denis-de-Brompton","Sainte-Anne-des-Lacs","Sainte-Claire","Perce","Saint-Jean-Port-Joli","Saint-Andre-d'Argenteuil","Saint-Come--Liniere","Saint-Sulpice","Forestville","Richmond","Paspebiac","Saint-Thomas","Saint-Jean-Baptiste","Portneuf","Normandin","Saint-Alphonse-Rodriguez","Saint-Alphonse-de-Granby","Clermont","Compton","Mont-Saint-Gregoire","Saint-Liboire","Degelis","Saint-Alexis-des-Monts","Cap-Saint-Ignace","Saint-Anaclet-de-Lessard","Cap Sante","Saint-Ferreol-les-Neiges","Senneterre","Sainte-Marie-Madeleine","Saint-Gabriel-de-Valcartier","Saint-Christophe-d'Arthabaska","Sainte-Melanie","Ascot Corner","Saint-Michel","Saint-Paul-d'Abbotsford","Saint-Marc-des-Carrieres","Stanstead","Sainte-Anne-de-Beaupre","Sainte-Luce","Saint-Gabriel","Ferme-Neuve","Thurso","Adstock","Yamachiche","Saint-Maurice","Bonaventure","Val-Morin","Pohenegamook","Stoke","Sainte-Marguerite-du-Lac-Masson","Saint-Prime","Kuujjuaq","Grenville-sur-la-Rouge","Sainte-Anne-de-Sorel","Macamic","Rougemont","Piedmont","Lac-des-Ecorces","Saint-Pamphile","Bedford","Weedon-Centre","Lacolle","Saint-Gabriel-de-Brandon","Saint-David-de-Falardeau","Saint-Bruno","Laurier-Station","Saint-Anicet","Saint-Mathieu-de-Beloeil","Cap-Chat","Notre-Dame-de-Lourdes","Ville-Marie","Saint-Isidore","Maria","Saint-Chrysostome","Saint-Damase","Disraeli","Sainte-Victoire-de-Sorel","Saint-Alexandre","Herbertville","Sainte-Thecle","Fermont","Wickham","La Presentation","Sainte-Catherine-de-Hatley","Saint-Basile","Saint-Raphael","Gracefield","Saint-Martin","Causapscal","Brigham","Port-Daniel--Gascons","Labelle","Huntingdon","Hebertville",
                "Saint-Michel-des-Saints","Saint-Victor","Saint-Ephrem-de-Beauce","Temiscaming","Sainte-Genevieve-de-Berthier","Sainte-Madeleine","Scott","Sainte-Croix","Valcourt","Saint-Dominique","Lery","Mansfield-et-Pontefract","Saint-Denis","Saint-Gedeon-de-Beauce","Saint-Leonard-d'Aston","Albanel","Pessamit","Maskinonge","Saint-Charles-de-Bellechasse","East Broughton","Saint-Polycarpe","Deschambault","Saint-Come","Waskaganish","Lebel-sur-Quevillon","Pierreville","Saint-Gilles","Wendake","Saint-Bernard","Sainte-Cecile-de-Milton","Saint-Roch-de-Richelieu","Saint-Nazaire","Saint-Elzear","Hinchinbrooke","Saint-Francois-Xavier-de-Brompton","Papineauville","Saint-Ignace-de-Loyola","Upton","Sainte-Anne-de-Sabrevois","Sainte-Anne-de-la-Perade","Saint-Damien-de-Buckland","Saint-Ferdinand","Manouane","Saint-Gervais","Saint-Alexandre-de-Kamouraska","Saint-Marc-sur-Richelieu","Mandeville","Caplan","Waterville","Saint-Damien","Lac-Nominingue","Obedjiwan","Hatley","Saint-Gedeon","Kingsey Falls","Terrasse-Vaudreuil","L'Ascension-de-Notre-Seigneur","Barraute","Saint-Liguori","Pointe-Lebel","Saint-Patrice-de-Sherrington","Saint-Esprit","Mashteuiatsh","Saint-Francois-du-Lac","Saint-Fulgence","Vallee-Jonction","Saint-Georges-de-Cacouna","Saint-Fabien","Lac-Superieur","Les Escoumins","Riviere-Beaudette","Saint-Barthelemy","Austin","Saint-Mathieu","Saint-Paul-de-l'Ile-aux-Noix","Saint-Joseph-de-Coleraine","Saint-Cyprien-de-Napierville","Sayabec","Deleage","Potton","Sainte-Beatrix","Sainte-Justine","Eastman","Saint-Valerien-de-Milton","Saint-Cuthbert","Saint-Blaise-sur-Richelieu","Saint-Michel-de-Bellechasse","Sainte-Angele-de-Monnoir","Sacre-Coeur-Saguenay","Saint-Robert","Saint-Pierre-de-l'Ile-d'Orleans","La Guadeloupe","Povungnituk","Gore","Chambord","Dudswell",
                "Saint-Narcisse","Waswanipi","Inukjuak","Saint-Zacharie","Hemmingford","Saint-Clet","Saint-Ours","Sainte-Anne-de-la-Pocatiere","Saint-Placide","Sainte-Clotilde","Nouvelle","Yamaska","Saint-Elie-de-Caxton","Price","Saint-Jacques-le-Mineur","Champlain","Saint-Antoine-sur-Richelieu","Saint-Pacome","Saint-Stanislas-de-Kostka","Frontenac","Yamaska-Est","Sainte-Emelie-de-l'Energie","Saint-Charles-sur-Richelieu","Saint-Joseph-de-Sorel","Riviere-Blanche","Sainte-Helene-de-Bagot","Franklin Centre","Mille-Isles","Lyster","Sainte-Clotilde-de-Horton","Fossambault-sur-le-Lac","Saint-Benoit-Labre","Chapais","Saint-Honore-de-Shenley","Cleveland","Messines","Saint-Jean-de-Dieu","Saint-Antoine-de-Tilly","Saint-Francois-de-la-Riviere-du-Sud","Uashat","Eeyou Istchee Baie-James","Shawville","Saint-Lucien","Lambton","Saint-Laurent-de-l'Ile-d'Orleans","Saint-Flavien","Grenville","Chute-aux-Outardes","Sainte-Marcelline-de-Kildare","Saint-Felix-de-Kingsey","Sainte-Elisabeth","Saint-Bernard-de-Lacolle","Saint-Guillaume","Venise-en-Quebec","Maliotenam","Ripon","Saint-Paulin","Saint-Albert","Matagami","Amherst","Notre-Dame-du-Laus","Saint-Tite-des-Caps","Val-Joli","Saint-Casimir","Saint-Malachie","Salluit","Saint-Louis-de-Gonzague","Saint-Urbain","Tring-Jonction","Pointe-a-la-Croix","Saint-Joachim","Saint-Theodore-d'Acton","L' Isle-Verte","Palmarolle","Henryville","Saint-Odilon-de-Cranbourne","Laurierville","La Dore","Lac-au-Saumon","Wotton","Wemindji","Riviere-Heva","Fort-Coulonge","Godmanchester","Saint-Simon","Tingwick","Saint-Aubert","Saint-Mathieu-du-Parc","Ragueneau","Notre-Dame-du-Bon-Conseil","Saint-Ubalde","Berthier-sur-Mer","Frampton","New Carlisle","Wentworth-Nord","Sainte-Ursule","Nantes","Lac-aux-Sables","Vaudreuil-sur-le-Lac","Amulet","Herouxville",
                "Pointe-des-Cascades","L'Isle-aux-Allumettes","Sainte-Brigide-d'Iberville","Les Eboulements","Pointe-aux-Outardes","Sainte-Barbe","Saint-Louis-du-Ha! Ha!","Saint-Edouard","Riviere-Bleue","Noyan","Saint-Hugues","Sainte-Anne-du-Sault","La Conception","Saint-Valere","L'Isle-aux-Coudres","Larouche","Lorrainville","Sainte-Lucie-des-Laurentides","Saint-Alexis","Roxton Falls","Clarendon","Saint-Ludger","Saint-Arsene","Racine","Saint-Majorique-de-Grantham","Saint-Zenon","Saint-Armand","Saint-Edouard-de-Lotbiniere","Listuguj","Saint-Hubert-de-Riviere-du-Loup","Saint-Jude","La Minerve","Notre-Dame-des-Pins","Saint-Alban","Saint-Pierre-les-Becquets","Labrecque","Wemotaci","Sainte-Henedine","L'Anse-Saint-Jean","Akwesasne","L'Avenir","Notre-Dame-du-Portage","Saint-Norbert-d'Arthabaska","Saint-Hilarion","Saint-Simeon","Saint-Barnabe","Sainte-Felicite","Bury","Lac-Bouchette","Saint-Lazare-de-Bellechasse","Saint-Michel-du-Squatec","Saint-Joachim-de-Shefford","Grand-Remous","Saint-Gabriel-de-Rimouski","Sainte-Marie-Salome","Saint-Cyprien","Tres-Saint-Sacrement","Saints-Anges","Saint-Urbain-Premier",
                "Sainte-Agathe-de-Lotbiniere","Trecesson","Grande-Vallee","Mont-Carmel","Saint-Eugene","Notre-Dame-des-Neiges","Saint-Leon-de-Standon","Saint-Modeste","Sainte-Sabine","Saint-Maxime-du-Mont-Louis","Blanc-Sablon","Frelighsburg","Ayer's Cliff","Les Mechins","Sainte-Marguerite","Saint-Claude","Girardville","Saint-Bruno-de-Guigues","Saint-Narcisse-de-Beaurivage","Saint-Rene-de-Matane","Sainte-Jeanne-d'Arc","Plaisance","Roxton-Sud","Saint-Frederic","Montreal-Est","Saint-Patrice-de-Beaurivage","Sainte-Marthe","Notre-Dame-du-Nord","Saint-Aime-des-Lacs","Lac-Drolet","Saint-Wenceslas","Sainte-Genevieve-de-Batiscan","Saint-Justin","Saint-Norbert","Riviere-Ouelle","Stukely-Sud","Saint-Georges-de-Clarenceville","Sainte-Therese-de-Gaspe","Desbiens","La Macaza","Saint-Vallier","Coleraine","Sainte-Petronille","Bristol","Saint-Sylvestre","Saint-Stanislas","Longue-Rive","Saint-Leonard-de-Portneuf","Saint-Narcisse-de-Rimouski","Saint-Bonaventure","Brebeuf","Baie-du-Febvre","Durham-Sud","Melbourne"]},
                { name: "Saskatchewan", cities: ["Saskatoon","Regina","Prince Albert","Moose Jaw","Lloydminster","Swift Current","Yorkton","North Battleford","Estevan","Warman","Weyburn","Martensville","Corman Park No. 344","Melfort","Humboldt","La Ronge","Meadow Lake","Flin Flon","Kindersley","Melville","Edenwold No. 158","Nipawin","Battleford","Prince Albert No. 461","Buckland No. 491","Tisdale","White City","Vanscoy No. 345","La Loche","Pelican Narrows","Unity","Meadow Lake No. 588","Moosomin","Esterhazy","Rosetown","Dundurn No. 314","Assiniboia","Rosthern No. 403","Outlook","Canora","Pilot Butte","Biggar","Britannia No. 502","Maple Creek","Rama","Blucher","Lumsden No. 189","Swift Current No. 137","Fort Qu'Appelle","Indian Head","Watrous","Orkney No. 244","Dalmeny","Kamsack","Lumsden","Wynyard","Shaunavon","Rosthern","Wilton No. 472","Balgonie","Shellbrook No. 493","Hudson Bay","Carlyle","Langham","Frenchman Butte","Torch River No. 488","Shellbrook","Macklin","Creighton","Laird No. 404","Canwood No. 494","Estevan No. 5","Spiritwood No. 496","Oxbow","Wadena","Wilkie","Ile-a-la-Crosse","South Qu'Appelle No. 157","Mervin No. 499","Osler","Lanigan","Lajord No. 128","Beaver River","Langenburg","Moose Jaw No. 161","Maidstone","Battle River No. 438","Kipling","Carnduff","Foam Lake","Gravelbourg","Hudson Bay No. 394","Buffalo Narrows","Air Ronge","Grenfell","St. Louis No. 431","Regina Beach","Pinehouse","Preeceville","Maple Creek No. 111","Weyburn No. 67","Birch Hills","Kerrobert","Eston","Kindersley No. 290","Delisle","Waldheim","Davidson","Longlaketon No. 219","Nipawin No. 487","Duck Lake No. 463"]},
                { name: "Yukon Territory", cities: ["Whitehorse","Dawson"]}
            ]
            },
        {
        name: "India",
        states: [
            { name: "E", cities: ["Delhi", "Kolkata", "Mumbai", "Bangalore"] }
        ]
        }
    ]
};


function UserProfile() {
    const BASE_URL_USER = BASE_API_URL+"user/getUser/";
    const BASE_URL_USER_UPDATE = BASE_API_URL+"user/update/";
    const BASE_URL_USER_FRONT_END = BASE_URL_FRONTEND+"user/";
    const [newUser, setNewUser] = useState(intialState)
    const [selectedCountry, setSelectedCountry] = React.useState();
    const [selectedState, setSelectedState] = React.useState(); 
    const [selectedCity, setSelectedCity] = React.useState();

    const availableState = data.countries.find((c) => c.name === selectedCountry);
    const availableCities = availableState?.states?.find(
        (s) => s.name === selectedState
    );
    const params = useParams().id;
    
    

    useEffect(() => {
        
        if(sessionStorage.getItem("userType")!='admin' && sessionStorage.getItem("userType")!='user')
        {
            console.log("========== Session ======= ", sessionStorage.getItem("userType"));
            return window.location.href = BASE_URL_FRONTEND;  
        }
        const getUserData = BASE_URL_USER + params
        axios.get(getUserData)
            .then(res => {
                console.log("Profile:  ",res.data.data);
                if(res.data !== undefined){
                    setSelectedCountry(res.data.data.country);
                    setSelectedState(res.data.data.state);
                    setNewUser(res.data.data)
                }else{
                    setNewUser(intialState)
                }
            })
            .catch(err => {
                console.log({err});
            })
    }, []);
    

    const handleOnSubmit = async e =>{
        try{
            const json = JSON.stringify(newUser);
            const res = await axios.post(BASE_URL_USER_UPDATE+params, json, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const resJson = res.data.data;
              if(resJson!==undefined){
                return window.location.href = BASE_URL_USER_FRONT_END+resJson.userId;
              }else{
                return alert("Something went wrong! Please try again.");
              }
            }catch (error) {
                console.log(error);
            }
    };

    const handleOnChange = e => {
        const{name, value} = e.target
            setNewUser({...newUser, [name]: value});

            if(name === 'country'){
                setSelectedCountry(value);
            }

            if(name === 'city'){
                setSelectedCity(value);
            }

            if(name === 'state'){
                setSelectedState(value);
            }
    };

    return (
        <div>
            <Container>
                <Row>
                    <Row className="mb-12">
                        <Col className='text-right'>
                            <h5 className='text-right'>User ID: {params}</h5>
                            <br></br>
                        </Col>
                    </Row>
                    <Form onSubmit={handleOnSubmit}>
                            <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" name="firstName" onChange={handleOnChange} value={newUser.firstName} placeholder="Enter your given name" />
                            </Form.Group>
                            <Form.Group  as={Col} controlId="formGridName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" name="lastName" onChange={handleOnChange} value={newUser.lastName} placeholder="Enter your last name" />
                            </Form.Group>
                            </Row>
                            <br></br>
                            <Row>
                            <Form.Group as={Col} controlId="formUserName">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="userName" onChange={handleOnChange} value={newUser.userName} placeholder="Enter your username" />
                            </Form.Group>
                            </Row>
                            <br></br>
                            <Form.Group as={Col} controlId="formGridDOB">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control type="date" name="dob" onChange={handleOnChange} value={newUser.dob} placeholder="MM/dd/yyyy" />
                            </Form.Group>
                            <br></br>
                        <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" onChange={handleOnChange} value={newUser.email} placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPhoneNo">
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control type="number" name="number" onChange={handleOnChange} value={newUser.number} placeholder="Enter number" />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="address" onChange={handleOnChange} value={newUser.address} placeholder="1234 Main St.." />
                        </Form.Group>

                        <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Country</Form.Label>
                                        <Form.Select name="country" value={newUser.country} onChange={handleOnChange}>
                                            <option>--Choose Country--</option>
                                            {data.countries.map((e, key) => {
                                                return (
                                                    <option value={e.name} key={key}>
                                                    {e.name}
                                                </option>
                                                );
                                            })}
                                        </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>State</Form.Label>
                                        <Form.Select name="state" value={newUser.state} onChange={handleOnChange}>
                                        <option>--Choose State--</option>
                                        {availableState?.states.map((e, key) => {
                                            return (
                                            <option value={e.name} key={key}>
                                                {e.name}
                                            </option>
                                            );
                                        })}
                                </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>City</Form.Label>
                                        <Form.Select name="city" value={newUser.city} onChange={handleOnChange} >
                                        <option>--Choose City--</option>
                                        {availableCities?.cities.map((e, key) => {
                                            return (
                                            <option value={e.name} key={key}>
                                                {e}
                                            </option>
                                            );
                                        })}
                                        </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Postal Code</Form.Label>
                                    <Form.Control type="text" value={newUser.postalCode} onChange={handleOnChange} name="postalCode" placeholder="Postal code" />
                                </Form.Group>
                            </Row>
                        
                       <br></br>
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                        
                    </Form>
            </Row>
            <br></br>
            <br></br>
            </Container>
        </div>
    )
}

export default UserProfile;



