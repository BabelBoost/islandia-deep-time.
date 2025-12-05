import React, { useState, useEffect } from 'react';
import { Mountain, Waves, Flame, Wind, Info, X, MapPin, Globe, Droplets, Snowflake, Triangle, Camera, ArrowRight, Zap } from 'lucide-react';

// Słownik tłumaczeń interfejsu
const uiTranslations = {
  pl: {
    title: "Islandia: Żywa Planeta",
    subtitle: "Nie zwiedzaj. Zrozum.",
    selectPoint: "WYBIERZ PUNKT OBSERWACYJNY",
    whyImportant: "Dlaczego to ważne?",
    whyImportantText: "Islandia to laboratorium, w którym Ziemia testuje swoje procesy. To, co tu widzisz na powierzchni, w innych miejscach dzieje się kilometry pod dnem oceanu.",
    viewLandscape: "Widok krajobrazu",
    viewScience: "Symulacja geologiczna",
    storyMode: "Opowieść",
    scienceMode: "Mechanizm",
    geoData: "Dane geologiczne",
    seismic: "Aktywność sejsmiczna",
    age: "Wiek formacji",
    quote: "Nie patrz na to jak na skały. Patrz na to jak na zamrożony w czasie ruch.",
    system: "SYSTEM MONITOROWANIA PROCESÓW PLANETARNYCH v.3.0 (COLOR)",
    loading: "Ładowanie wizualizacji...",
    regions: {
      south: "Południe & Złoty Krąg",
      highlands: "Highlands & Wnętrze",
      north: "Północ & Wschód",
      west: "Zachód & Fiordy"
    }
  },
  en: {
    title: "Iceland: Living Planet",
    subtitle: "Don't just visit. Understand.",
    selectPoint: "SELECT OBSERVATION POINT",
    whyImportant: "Why is this important?",
    whyImportantText: "Iceland is a laboratory where Earth tests its processes. What you see here on the surface happens kilometers below the ocean floor elsewhere.",
    viewLandscape: "Landscape View",
    viewScience: "Geological Simulation",
    storyMode: "Story",
    scienceMode: "Mechanism",
    geoData: "Geological Data",
    seismic: "Seismic Activity",
    age: "Formation Age",
    quote: "Don't look at it as rocks. Look at it as movement frozen in time.",
    system: "PLANETARY PROCESS MONITORING SYSTEM v.3.0 (COLOR)",
    loading: "Loading visualization...",
    regions: {
      south: "South & Golden Circle",
      highlands: "Highlands & Interior",
      north: "North & East",
      west: "West & Westfjords"
    }
  }
};

const locations = [
  // --- SOUTH & GOLDEN CIRCLE ---
  {
    id: 1,
    region: "south",
    type: "tectonic",
    coordinates: "64.25, -21.13",
    // Vibrant colors for Tectonic
    gradient: "from-blue-600 via-indigo-600 to-violet-700",
    accent: "text-indigo-300",
    bgAccent: "bg-indigo-500",
    icon: <Mountain className="w-6 h-6" />,
    imgId: "1548115045-31a89c8983a5", 
    content: {
      pl: {
        name: "Thingvellir",
        shortDesc: "Blizna po rozdarciu Ziemi",
        story: "To nie jest zwykła dolina. Stoisz dokładnie w miejscu, gdzie Europa i Ameryka mówią sobie 'do widzenia'. Każdego roku oddalają się od siebie o 2 centymetry. Te pęknięcia, które widzisz, to rozstępy rosnącej planety.",
        science: "Ryft kontynentalny. Grzbiet Śródatlantycki wychodzi tu na ląd. Widoczne szczeliny (gjár) to efekt napięć skorupy ziemskiej rozciąganej przez siły konwekcji w płaszczu.",
        seismicLevel: "Średnia",
        ageStr: "~9000 lat (lawa)"
      },
      en: {
        name: "Thingvellir",
        shortDesc: "The scar of Earth's tear",
        story: "This isn't just a valley. You are standing exactly where Europe and America say 'goodbye'. Every year they drift 2cm apart. The cracks you see are the stretch marks of a growing planet.",
        science: "Continental rift. The Mid-Atlantic Ridge surfaces here. Visible fissures (gjár) are caused by crustal tension stretched by convection forces in the mantle.",
        seismicLevel: "Medium",
        ageStr: "~9000 years (lava)"
      }
    }
  },
  {
    id: 2,
    region: "south",
    type: "thermal",
    coordinates: "64.31, -20.30",
    // Vibrant colors for Thermal
    gradient: "from-orange-500 via-red-500 to-rose-600",
    accent: "text-orange-300",
    bgAccent: "bg-orange-500",
    icon: <Flame className="w-6 h-6" />,
    imgId: "1504786345607-1678f8c79212", 
    content: {
      pl: {
        name: "Geysir & Strokkur",
        shortDesc: "Oddech giganta",
        story: "Wyobraź sobie szybkowar, który ktoś zostawił na gazie. Woda pod twoimi stopami styka się z gorącymi skałami, zamienia w parę i szuka ujścia. Ten wybuch to nic innego jak system chłodzenia Ziemi.",
        science: "System hydrotermalny. Woda gruntowa perkoluje w dół, ogrzewa się od magmy, a ciśnienie hydrostatyczne blokuje wrzenie. Gdy woda unosi się i ciśnienie spada – następuje gwałtowna, eksplozywna ewaporacja.",
        seismicLevel: "Wysoka (lokalnie)",
        ageStr: "~10 000 lat"
      },
      en: {
        name: "Geysir & Strokkur",
        shortDesc: "The Giant's Breath",
        story: "Imagine a pressure cooker left on the stove. Water beneath your feet hits hot rocks, turns to steam, and seeks an escape. This explosion is essentially Earth's cooling system in action.",
        science: "Hydrothermal system. Groundwater percolates down, is heated by magma, while hydrostatic pressure blocks boiling. As water rises and pressure drops – violent, explosive evaporation occurs.",
        seismicLevel: "High (locally)",
        ageStr: "~10,000 years"
      }
    }
  },
  {
    id: 8,
    region: "south",
    type: "waterfall",
    coordinates: "64.32, -20.12",
    // Vibrant colors for Water/Power
    gradient: "from-cyan-600 via-blue-600 to-blue-800",
    accent: "text-cyan-300",
    bgAccent: "bg-cyan-500",
    icon: <Droplets className="w-6 h-6" />,
    imgId: "1498631575775-817277d3257d", 
    content: {
      pl: {
        name: "Gullfoss",
        shortDesc: "Pęknięcie w krajobrazie",
        story: "To nie jest zwykły wodospad spadający z klifu. Tutaj rzeka nagle znika w szczelinie, która wydaje się ciąć krajobraz na pół. To dowód na to, jak woda wykorzystuje słabości tektoniczne skał.",
        science: "Wodospad dwustopniowy. Kanion, w który wpada woda, został wyrzeźbiony przez powodzie glacjalne pod koniec epoki lodowcowej, wykorzystując strefy uskoków tektonicznych.",
        seismicLevel: "Średnia",
        ageStr: "~10 000 lat"
      },
      en: {
        name: "Gullfoss",
        shortDesc: "Crack in the landscape",
        story: "This isn't a typical waterfall dropping off a cliff. Here, the river suddenly vanishes into a crevice that seems to slice the landscape in half. Proof of how water exploits tectonic weaknesses.",
        science: "Two-tiered waterfall. The canyon into which the water plunges was carved by glacial floods at the end of the Ice Age, exploiting tectonic fault zones.",
        seismicLevel: "Medium",
        ageStr: "~10,000 years"
      }
    }
  },
  {
    id: 13,
    region: "south",
    type: "waterfall",
    coordinates: "63.61, -19.98",
    gradient: "from-emerald-500 via-green-600 to-teal-700",
    accent: "text-emerald-300",
    bgAccent: "bg-emerald-500",
    icon: <Droplets className="w-6 h-6" />,
    imgId: "1524313271442-7db5e4125d0c", // Seljalandsfoss
    content: {
      pl: {
        name: "Seljalandsfoss",
        shortDesc: "Za kurtyną wody",
        story: "To jedyne miejsce, gdzie możesz wejść 'za kulisy' krajobrazu. Stojąc za ścianą wody, patrzysz na świat przez pryzmat erozji. Klif nad twoją głową to dawny brzeg morski.",
        science: "Erozja wsteczna i izostazja. Woda spadająca z dawnego klifu morskiego podcina miękkie warstwy osadowe u podstawy, tworząc jaskinię, podczas gdy twarda pokrywa lawowa na górze pozostaje stabilna.",
        seismicLevel: "Średnia",
        ageStr: "~10 000 lat"
      },
      en: {
        name: "Seljalandsfoss",
        shortDesc: "Behind the curtain",
        story: "The only place where you can go 'backstage' of the landscape. Standing behind the wall of water, you view the world through the prism of erosion. The cliff above you is a former sea shore.",
        science: "Headward erosion & isostasy. Water falling from the ancient sea cliff undercuts soft sedimentary layers at the base, creating a cave, while the hard lava caprock remains stable.",
        seismicLevel: "Medium",
        ageStr: "~10,000 years"
      }
    }
  },
  {
    id: 9,
    region: "south",
    type: "waterfall",
    coordinates: "63.53, -19.51",
    gradient: "from-teal-500 via-teal-700 to-slate-800",
    accent: "text-teal-300",
    bgAccent: "bg-teal-500",
    icon: <Droplets className="w-6 h-6" />,
    imgId: "1476610182048-b716b8518aae", 
    content: {
      pl: {
        name: "Skógafoss",
        shortDesc: "Dawne wybrzeże",
        story: "Klif, z którego spada ta woda, był kiedyś brzegiem oceanu. Gdy wielkie lodowce stopniały, uwolniona od ich ciężaru wyspa 'odskoczyła' do góry jak gąbka, a morze się cofnęło, zostawiając ten próg wodospadowi.",
        science: "Ruchy izostatyczne. Wodospad wyznacza dawną linię brzegową. Po deglacjacji skorupa ziemska, odciążona z lodu, uniosła się (rebound), przesuwając wybrzeże o 5 km na południe.",
        seismicLevel: "Wysoka (Eyjafjallajökull)",
        ageStr: "~10 000 lat"
      },
      en: {
        name: "Skógafoss",
        shortDesc: "Ancient Coastline",
        story: "The cliff this water falls from was once the ocean shore. When the great glaciers melted, the island, freed from their weight, 'sprung' up like a sponge, and the sea retreated, leaving this ledge for the waterfall.",
        science: "Isostatic rebound. The waterfall marks the former coastline. After deglaciation, the Earth's crust, unburdened by ice, uplifted, shifting the coastline 5km south.",
        seismicLevel: "High (Eyjafjallajökull)",
        ageStr: "~10,000 years"
      }
    }
  },
  {
    id: 5,
    region: "south",
    type: "erosion",
    coordinates: "63.40, -19.00",
    gradient: "from-gray-700 via-slate-800 to-black",
    accent: "text-gray-300",
    bgAccent: "bg-slate-500",
    icon: <Waves className="w-6 h-6" />,
    imgId: "1520635361250-b74a3824f5d6", 
    content: {
      pl: {
        name: "Reynisfjara",
        shortDesc: "Architektura magmy",
        story: "Te idealnie sześciokątne kolumny nie zostały wyrzeźbione przez ludzi. To geometria natury. Gdy gorąca lawa stygnie i kurczy się, pęka w perfekcyjne wzory, tworząc 'schody trolli'. Ale uważaj – ocean tutaj nie bierze jeńców.",
        science: "Cios termiczny. Kolumny bazaltowe powstają podczas powolnego stygnięcia grubych potoków lawy. Materiał kurczy się wokół centrów sferycznych, tworząc pęknięcia heksagonalne.",
        seismicLevel: "Wysoka (Katla)",
        ageStr: "~100 000 lat"
      },
      en: {
        name: "Reynisfjara",
        shortDesc: "Architecture of Magma",
        story: "These perfectly hexagonal columns weren't carved by humans. This is nature's geometry. When hot lava cools and contracts, it cracks into perfect patterns. But beware – the ocean here takes no prisoners.",
        science: "Columnar jointing. Basalt columns form during the slow cooling of thick lava flows. The material contracts around spherical centers, creating hexagonal fractures.",
        seismicLevel: "High (Katla)",
        ageStr: "~100,000 years"
      }
    }
  },
  
  // --- HIGHLANDS & INTERIOR ---
  {
    id: 10,
    region: "highlands",
    type: "volcanic",
    coordinates: "63.98, -19.06",
    // Ryolite colors
    gradient: "from-pink-600 via-rose-600 to-amber-700",
    accent: "text-amber-300",
    bgAccent: "bg-rose-500",
    icon: <Mountain className="w-6 h-6" />,
    imgId: "1504829857797-ddff29c27927", 
    content: {
      pl: {
        name: "Landmannalaugar",
        shortDesc: "Malowane Góry",
        story: "Dlaczego te góry są żółte, czerwone i zielone? To nie bazalt, to ryolit – skała o innym składzie chemicznym, bogata w krzemionkę. To miejsce, gdzie wulkany decydują się na artystyczną ekspresję.",
        science: "Wulkanizm ryolitowy i geotermia. Kolory pochodzą od minerałów bogatych w krzemionkę i alteracji hydrotermalnej. Obszar leży w obrębie wielkiej kaldery Torfajökull.",
        seismicLevel: "Bardzo Wysoka",
        ageStr: "~70 000 lat"
      },
      en: {
        name: "Landmannalaugar",
        shortDesc: "Painted Mountains",
        story: "Why are these mountains yellow, red, and green? It's not basalt, it's rhyolite – rock with a different chemical composition, rich in silica. This is where volcanoes decide to get artistic.",
        science: "Rhyolitic volcanism & geothermal activity. Colors come from silica-rich minerals and hydrothermal alteration. Located within the Torfajökull caldera.",
        seismicLevel: "Very High",
        ageStr: "~70,000 years"
      }
    }
  },

  // --- WEST & WESTFJORDS ---
  {
    id: 3,
    region: "west",
    type: "volcanic",
    coordinates: "64.53, -21.92",
    gradient: "from-slate-700 via-zinc-800 to-neutral-900",
    accent: "text-slate-300",
    bgAccent: "bg-slate-600",
    icon: <Wind className="w-6 h-6" />,
    imgId: "1550580970-2228f448c5e6", 
    content: {
      pl: {
        name: "Borgarnes & Hafnarfjall",
        shortDesc: "Wygasłe serce wulkanu",
        story: "Patrząc na górę Hafnarfjall, widzisz tak naprawdę wnętrzności dawnego wulkanu. Erozja i lodowce zdarły z niego skórę, odsłaniając skamieniałe żyły magmy, które kiedyś zasilały erupcje. To anatomia wulkanu w przekroju.",
        science: "Centralny wulkan (wygasły 4 mln lat temu). Widoczne ciemne warstwy bazaltu przeplatane jaśniejszymi ryolitami. Erozja polodowcowa odsłoniła komorę magmową i system dajek.",
        seismicLevel: "Niska",
        ageStr: "~4 mln lat"
      },
      en: {
        name: "Borgarnes & Hafnarfjall",
        shortDesc: "Extinct Heart of a Volcano",
        story: "Looking at Hafnarfjall mountain, you are actually seeing the insides of an ancient volcano. Erosion and glaciers stripped its skin, revealing petrified veins of magma. It's volcanic anatomy in cross-section.",
        science: "Central volcano (extinct 4 MYA). Visible dark basalt layers interlaced with lighter rhyolite. Glacial erosion exposed the magma chamber and dike system.",
        seismicLevel: "Low",
        ageStr: "~4 million years"
      }
    }
  },
  {
    id: 6,
    region: "west",
    type: "volcanic",
    coordinates: "64.92, -23.30",
    gradient: "from-green-700 via-emerald-800 to-teal-900",
    accent: "text-emerald-300",
    bgAccent: "bg-green-600",
    icon: <Triangle className="w-6 h-6" />,
    imgId: "1517411032315-54ef2cb00966", 
    content: {
      pl: {
        name: "Kirkjufell",
        shortDesc: "Ostatni świadek",
        story: "Najbardziej fotogeniczna góra Islandii to tak naprawdę samotnik, który przetrwał oblężenie. Lodowce epoki lodowcowej opływały ją z obu stron, zdzierając wszystko dookoła, zostawiając tylko ten twardy rdzeń – nunatak.",
        science: "Nunatak (góra wyspa). Warstwowanie to naprzemienne pokłady lawy i osadów interglacjalnych. Kształt stożka wyrzeźbiły strumienie lodu opływające górę podczas zlodowacenia.",
        seismicLevel: "Niska",
        ageStr: "~5-10 mln lat"
      },
      en: {
        name: "Kirkjufell",
        shortDesc: "The Last Witness",
        story: "Iceland's most photogenic mountain is essentially a survivor. Ice Age glaciers flowed around it on both sides, stripping away everything else, leaving only this hard core – a nunatak.",
        science: "Nunatak. The layering shows alternating lava beds and interglacial sediments. The conical shape was carved by ice streams flowing around the mountain during glaciation.",
        seismicLevel: "Low",
        ageStr: "~5-10 million years"
      }
    }
  },
  {
    id: 11,
    region: "west",
    type: "volcanic",
    coordinates: "64.80, -23.77",
    gradient: "from-indigo-800 via-purple-900 to-slate-900",
    accent: "text-purple-300",
    bgAccent: "bg-indigo-600",
    icon: <Triangle className="w-6 h-6" />,
    imgId: "1465258661642-1e5f863d04d7", 
    content: {
      pl: {
        name: "Snæfellsjökull",
        shortDesc: "Brama do wnętrza Ziemi",
        story: "Ten idealny stożek pokryty lodem zainspirował Juliusza Verne'a do umieszczenia tu wejścia do wnętrza Ziemi. W rzeczywistości to uśpiony potwór, który dominuje nad horyzontem zachodniej Islandii.",
        science: "Stratowulkan. Zbudowany z warstw lawy i materiału piroklastycznego. Pokryty czapą lodową. Ostatnia erupcja ok. 200 n.e.",
        seismicLevel: "Uśpiony",
        ageStr: "~700 000 lat"
      },
      en: {
        name: "Snæfellsjökull",
        shortDesc: "Gateway to the Center of Earth",
        story: "This perfect ice-capped cone inspired Jules Verne to locate the entrance to the center of the Earth here. In reality, it is a sleeping monster dominating the western horizon.",
        science: "Stratovolcano. Built of layers of lava and pyroclastics. Capped by a glacier. Last eruption approx. 200 AD.",
        seismicLevel: "Dormant",
        ageStr: "~700,000 years"
      }
    }
  },
  {
    id: 14,
    region: "west",
    type: "waterfall",
    coordinates: "65.73, -23.19",
    gradient: "from-blue-700 via-indigo-800 to-slate-900",
    accent: "text-blue-300",
    bgAccent: "bg-blue-600",
    icon: <Droplets className="w-6 h-6" />,
    imgId: "1454441879048-6e4e5d6d3765", // Dynjandi
    content: {
      pl: {
        name: "Dynjandi",
        shortDesc: "Welon Panny Młodej",
        story: "Ukryty głęboko na Fiordach Zachodnich, Dynjandi wygląda jak gigantyczny welon ślubny rozłożony na schodach. To seria siedmiu wodospadów, jeden pod drugim, tworząca najgłośniejszy spektakl w tej cichej części wyspy.",
        science: "Wodospad kaskadowy. Woda spływa po schodkowym zboczu utworzonym przez naprzemienne warstwy twardej lawy (progi) i miękkich osadów (podcięcia).",
        seismicLevel: "Bardzo Niska",
        ageStr: "~13 mln lat"
      },
      en: {
        name: "Dynjandi",
        shortDesc: "The Bridal Veil",
        story: "Hidden deep in the Westfjords, Dynjandi looks like a giant bridal veil spread over stairs. It is a series of seven waterfalls, one below the other, creating the loudest spectacle in this quiet part of the island.",
        science: "Cascading waterfall. Water flows down a stepped slope formed by alternating layers of hard lava (sills) and soft sediments (undercuts).",
        seismicLevel: "Very Low",
        ageStr: "~13 million years"
      }
    }
  },

  // --- NORTH & EAST ---
  {
    id: 12,
    region: "north",
    type: "thermal",
    coordinates: "65.60, -16.99",
    gradient: "from-red-600 via-orange-700 to-amber-900",
    accent: "text-red-300",
    bgAccent: "bg-red-600",
    icon: <Flame className="w-6 h-6" />,
    imgId: "1532960401447-386033a89f84", 
    content: {
      pl: {
        name: "Mývatn",
        shortDesc: "Piekło, które zamarzło",
        story: "Krajobraz Mývatn wygląda jak Mars. Dziwne kratery, z których nigdy nie wypłynęła lawa (pseudokratery), powstały, gdy płynna magma wjechała na mokradła, powodując serie eksplozji pary wodnej.",
        science: "Eksplozje freatomagmowe. Pseudokratery (Skútustaðagígar) to formy bezkorzeniowe. Powstały w wyniku kontaktu lawy z wodą gruntową/jeziorem, co spowodowało wybuchy pary.",
        seismicLevel: "Wysoka (Krafla)",
        ageStr: "~2300 lat"
      },
      en: {
        name: "Mývatn",
        shortDesc: "Hell Froze Over",
        story: "The Mývatn landscape looks like Mars. Strange craters that never erupted lava (pseudocraters) formed when molten magma flowed over wetlands, causing steam explosions.",
        science: "Phreatomagmatic explosions. Rootless cones (pseudocraters) formed by lava flowing over waterlogged ground, causing steam blasts.",
        seismicLevel: "High (Krafla)",
        ageStr: "~2300 years"
      }
    }
  },
  {
    id: 7,
    region: "north",
    type: "waterfall",
    coordinates: "65.81, -16.38",
    gradient: "from-stone-600 via-gray-700 to-slate-800",
    accent: "text-stone-300",
    bgAccent: "bg-stone-500",
    icon: <Droplets className="w-6 h-6" />,
    imgId: "1490059489502-36d39352e824", 
    content: {
      pl: {
        name: "Dettifoss",
        shortDesc: "Siła surowej energii",
        story: "Stoisz nad najpotężniejszym wodospadem Europy. Ta szara, brudna woda to nie zanieczyszczenia – to starta na pył skała niesiona prosto z lodowca. To młyn, który mieli góry na piasek.",
        science: "Wodospad kataraktowy. Zasilany wodą z topniejącego lodowca Vatnajökull. Kanion Jökulsárgljúfur powstał w wyniku katastrofalnych powodzi glacjalnych (Jökulhlaup).",
        seismicLevel: "Średnia",
        ageStr: "~9000 lat"
      },
      en: {
        name: "Dettifoss",
        shortDesc: "Raw Energy",
        story: "You are standing above Europe's most powerful waterfall. That grey, dirty water isn't pollution – it's rock ground to dust, carried straight from the glacier. This is a mill that grinds mountains into sand.",
        science: "Cataract waterfall. Fed by meltwater from Vatnajökull. The Jökulsárgljúfur canyon was carved by catastrophic glacial floods (Jökulhlaup).",
        seismicLevel: "Medium",
        ageStr: "~9000 years"
      }
    }
  },
  {
    id: 15,
    region: "north",
    type: "erosion",
    coordinates: "65.16, -15.30",
    gradient: "from-emerald-800 via-teal-900 to-cyan-950",
    accent: "text-emerald-300",
    bgAccent: "bg-emerald-600",
    icon: <Waves className="w-6 h-6" />,
    imgId: "1507049830588-467776518779", // Studlagil vibe
    content: {
      pl: {
        name: "Stuðlagil Canyon",
        shortDesc: "Bazaltowa Katedra",
        story: "Przez wieki ten kanion był ukryty pod rwącą rzeką. Dopiero po zbudowaniu tamy woda opadła, odsłaniając największą kolekcję bazaltowych kolumn na Islandii. To wygląda jak kościół zbudowany przez wulkany.",
        science: "Cios termiczny w dolinie rzecznej. Kolumny powstały w dolnej części potężnego potoku lawy. Rzeka Jökla przez tysiące lat wcinała się w skałę, odsłaniając przekrój formacji.",
        seismicLevel: "Niska",
        ageStr: "Nieznany (holocen)"
      },
      en: {
        name: "Stuðlagil Canyon",
        shortDesc: "The Basalt Cathedral",
        story: "For centuries, this canyon was hidden beneath a raging river. Only after a dam was built did the water recede, revealing the largest collection of basalt columns in Iceland. It looks like a church built by volcanoes.",
        science: "Columnar jointing in a river valley. Columns formed in the lower part of a massive lava flow. The Jökla river cut into the rock over thousands of years, revealing the formation's cross-section.",
        seismicLevel: "Low",
        ageStr: "Unknown (Holocene)"
      }
    }
  },
  {
    id: 4,
    region: "north",
    type: "glacial",
    coordinates: "64.04, -16.17",
    gradient: "from-cyan-500 via-blue-600 to-indigo-900",
    accent: "text-cyan-200",
    bgAccent: "bg-cyan-500",
    icon: <Snowflake className="w-6 h-6" />,
    imgId: "1504707748692-419802cf939d", 
    content: {
      pl: {
        name: "Jökulsárlón",
        shortDesc: "Cmentarzysko lodowca",
        story: "Te błękitne bryły to kapsuły czasu. Lód, który tu pływa, spadł jako śnieg setki lat temu, gdy świat wyglądał inaczej. Jesteś świadkiem powolnego umierania największego lodowca Europy, który cofa się, tworząc tę lagunę.",
        science: "Laguna proglacjalna. Powstaje w wyniku szybkiego cofania się lodowca Breiðamerkurjökull (część Vatnajökull). Mieszanie się wody słodkiej i słonej (z pływów) przyspiesza topnienie.",
        seismicLevel: "Średnia (izostazja)",
        ageStr: "~1000 lat (lód)"
      },
      en: {
        name: "Jökulsárlón",
        shortDesc: "Glacier Graveyard",
        story: "These blue blocks are time capsules. The ice floating here fell as snow hundreds of years ago when the world was different. You are witnessing the slow death of Europe's largest glacier.",
        science: "Proglacial lagoon. Formed by the rapid retreat of Breiðamerkurjökull (part of Vatnajökull). Mixing of fresh and salt water (tidal) accelerates melting.",
        seismicLevel: "Medium (isostasy)",
        ageStr: "~1000 years (ice)"
      }
    }
  }
];

const DeepTimeApp = () => {
  const [activeLocation, setActiveLocation] = useState(null);
  const [viewMode, setViewMode] = useState('story'); 
  const [lang, setLang] = useState('en'); // Set default to English
  const [imgLoaded, setImgLoaded] = useState(false);

  const t = uiTranslations[lang];
  const getLocContent = (loc) => loc.content[lang];

  React.useEffect(() => {
    setImgLoaded(false);
  }, [activeLocation]);

  const regions = ['south', 'west', 'north', 'highlands'];

  return (
    <div className="flex flex-col h-screen w-full bg-slate-900 text-slate-100 font-sans overflow-hidden mx-auto shadow-2xl relative">
      
      {/* Background Ambient Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 pointer-events-none z-0"></div>

      {/* Header */}
      <header className="p-4 md:p-6 pt-8 backdrop-blur-md bg-slate-900/80 border-b border-white/10 z-10 flex justify-between items-start shadow-xl shrink-0 sticky top-0">
        <div>
          <h1 className="text-lg md:text-xl font-bold tracking-tight text-white uppercase flex items-center gap-2 bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-teal-500">
            <Globe className="w-5 h-5 text-teal-400" />
            {t.title}
          </h1>
          <p className="text-slate-400 text-[10px] md:text-xs mt-1 tracking-wide">{t.subtitle}</p>
        </div>
        
        <div className="flex flex-col gap-2 items-end">
          <button 
            onClick={() => setLang(lang === 'pl' ? 'en' : 'pl')}
            className="flex items-center space-x-2 text-[10px] font-bold bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 transition-all hover:scale-105"
          >
            <span className={lang === 'pl' ? 'text-teal-400' : 'text-slate-500'}>PL</span>
            <div className="w-px h-3 bg-slate-700 mx-1"></div>
            <span className={lang === 'en' ? 'text-teal-400' : 'text-slate-500'}>EN</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-y-auto custom-scrollbar z-10 scroll-smooth">
        {!activeLocation ? (
          <div className="p-4 md:p-6 space-y-10 pb-20 max-w-4xl mx-auto">
            
            {regions.map(region => (
              <div key={region} className="space-y-4">
                <h3 className="text-teal-500/80 text-[10px] uppercase tracking-[0.2em] font-bold border-b border-white/10 pb-2 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-teal-500 rounded-full mr-2 shadow-[0_0_10px_rgba(20,184,166,0.5)]"></span>
                  {t.regions[region]}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {locations.filter(l => l.region === region).map((loc) => {
                    const content = getLocContent(loc);
                    return (
                      <button 
                        key={loc.id}
                        onClick={() => setActiveLocation(loc)}
                        className="w-full text-left group relative overflow-hidden rounded-2xl p-0 transition-all duration-300 hover:scale-[1.03] active:scale-95 border border-white/5 bg-slate-800/50 hover:border-white/20 hover:shadow-2xl shadow-lg flex flex-col min-h-[140px]"
                      >
                        {/* Colorful Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${loc.gradient} opacity-20 group-hover:opacity-100 transition-all duration-500`} />
                        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors duration-500" />
                        
                        <div className="relative z-10 p-5 flex flex-col h-full justify-between">
                          <div className="flex justify-between items-start">
                            <h3 className="text-base font-bold text-slate-100 group-hover:text-white transition-colors">{content.name}</h3>
                            <div className={`bg-white/10 p-2 rounded-full backdrop-blur-sm ${loc.accent} group-hover:text-white transition-colors`}>
                              {loc.icon}
                            </div>
                          </div>
                          
                          <div className="mt-2">
                             <p className="text-slate-400 text-[11px] font-medium leading-snug line-clamp-2 group-hover:text-white/90 transition-colors">{content.shortDesc}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            
            <div className="mt-8 p-6 bg-gradient-to-r from-teal-900/20 to-blue-900/20 border border-teal-500/20 rounded-2xl backdrop-blur-sm">
              <h4 className="text-teal-400 text-xs font-bold mb-2 flex items-center uppercase tracking-wider">
                <Info className="w-4 h-4 mr-2" />
                {t.whyImportant}
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {t.whyImportantText}
              </p>
            </div>
          </div>
        ) : (
          /* Detail View */
          <div className="relative min-h-full bg-slate-900 flex flex-col animate-in fade-in zoom-in-95 duration-300">
            {/* Visual Header / Viewfinder */}
            <div className={`h-[40vh] md:h-[50vh] relative bg-slate-950 flex items-center justify-center overflow-hidden shrink-0`}>
               
               {/* Real Image Layer */}
               {viewMode === 'story' && (
                 <>
                   {!imgLoaded && (
                     <div className={`absolute inset-0 bg-gradient-to-br ${activeLocation.gradient} animate-pulse flex items-center justify-center z-0`}>
                       <span className="text-white/50 text-xs font-mono tracking-widest">{t.loading}</span>
                     </div>
                   )}
                   <img 
                    src={`https://images.unsplash.com/photo-${activeLocation.imgId}?auto=format&fit=crop&w=1200&q=80`}
                    alt={getLocContent(activeLocation).name}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImgLoaded(true)}
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
                 </>
               )}

               {/* Science Mode Layer */}
               {viewMode === 'science' && (
                 <div className="absolute inset-0 bg-slate-900 flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-20"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20"></div>
                    
                    <div className="w-full max-w-md h-64 border border-teal-500/30 bg-slate-800/80 rounded-xl relative overflow-hidden backdrop-blur-md p-6 shadow-[0_0_50px_rgba(20,184,166,0.15)] ring-1 ring-white/10">
                          {/* Simulated geological layers with more color */}
                          <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#3d2b2b] border-t border-white/20"></div>
                          <div className="absolute bottom-16 left-0 right-0 h-20 bg-gradient-to-r from-[#2a2a35] to-[#363645] skew-y-2 scale-110 origin-bottom-left border-t border-white/10"></div>
                          <div className="absolute bottom-36 left-0 right-0 h-14 bg-[#4a4a55] -skew-y-1 scale-110 border-t border-white/10"></div>
                          
                          {/* Magma / Heat source */}
                          <div className="absolute top-20 left-1/4 w-2 h-48 bg-orange-500/80 -translate-x-1/2 blur-[4px] shadow-[0_0_30px_orange] animate-pulse"></div>
                          
                          <div className="absolute top-4 right-4 text-teal-400 font-mono text-[10px] border border-teal-500/30 px-2 py-1 rounded bg-teal-950/50 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-ping"></span>
                            SCANNING STRUCTURE...
                          </div>
                    </div>
                 </div>
               )}

               {/* Close Button */}
               <button 
                onClick={() => {setActiveLocation(null); setViewMode('story');}}
                className="absolute top-6 right-6 bg-black/40 hover:bg-black/80 p-2 rounded-full text-white transition-all hover:rotate-90 backdrop-blur-md border border-white/20 z-30 shadow-lg"
               >
                 <X className="w-6 h-6" />
               </button>

               {/* Mode Switcher Pills */}
               <div className="absolute bottom-8 left-0 right-0 flex justify-center z-30 pointer-events-none">
                 <div className="bg-slate-900/60 backdrop-blur-xl p-1.5 rounded-full border border-white/10 shadow-2xl flex gap-1 pointer-events-auto ring-1 ring-white/5">
                   <button 
                    onClick={() => setViewMode('story')}
                    className={`flex items-center space-x-2 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-300 ${viewMode === 'story' ? 'bg-white text-slate-900 shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}
                   >
                     <Camera className="w-3 h-3" />
                     <span>{t.storyMode}</span>
                   </button>
                   <button 
                    onClick={() => setViewMode('science')}
                    className={`flex items-center space-x-2 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-300 ${viewMode === 'science' ? 'bg-teal-500 text-white shadow-[0_0_20px_rgba(20,184,166,0.4)]' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}
                   >
                     <Info className="w-3 h-3" />
                     <span>{t.scienceMode}</span>
                   </button>
                 </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 relative bg-slate-900 border-t border-white/5 shadow-[0_-20px_60px_rgba(0,0,0,0.6)] z-20">
              <div className="max-w-3xl mx-auto p-6 md:p-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg">{getLocContent(activeLocation).name}</h2>
                  <div className="text-slate-400 text-[10px] font-mono border border-slate-700 px-2 py-1 rounded bg-slate-800/50">
                    ID: {activeLocation.id.toString().padStart(3, '0')}
                  </div>
                </div>
                
                <div className={`h-1.5 w-32 bg-gradient-to-r ${activeLocation.gradient} mb-8 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]`}></div>
                
                <div className="prose prose-invert prose-lg max-w-none">
                  {viewMode === 'story' ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                      <p className="text-slate-200 leading-8 font-light text-xl">
                        {getLocContent(activeLocation).story}
                      </p>
                      <div className="mt-12 p-8 border-l-4 border-teal-500 bg-gradient-to-r from-teal-900/20 to-transparent italic text-slate-300 text-lg rounded-r-xl relative">
                        <span className="absolute top-4 left-2 text-6xl text-teal-500/20 font-serif leading-none">"</span>
                        <span className="relative z-10">{t.quote}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
                      
                      <div className="flex items-center space-x-2 text-teal-300 text-[10px] font-mono uppercase tracking-widest border border-teal-500/30 bg-teal-950/30 w-fit px-3 py-1.5 rounded-md">
                        <Zap className="w-3 h-3" />
                        <span>{t.geoData}</span>
                      </div>

                      <p className="text-slate-300 leading-relaxed text-lg">
                        {getLocContent(activeLocation).science}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                          <div className="p-6 bg-slate-800/40 rounded-2xl border border-white/5 hover:border-teal-500/30 transition-colors">
                            <div className="flex justify-between text-xs text-slate-400 uppercase tracking-wider mb-3">
                                <span>{t.seismic}</span>
                                <span className={`font-bold ${activeLocation.accent}`}>{getLocContent(activeLocation).seismicLevel}</span>
                            </div>
                            <div className="w-full bg-slate-700/50 h-2 rounded-full overflow-hidden">
                                <div className={`h-full w-[40%] animate-pulse ${activeLocation.bgAccent}`}></div>
                            </div>
                          </div>

                          <div className="p-6 bg-slate-800/40 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-colors">
                            <div className="flex justify-between text-xs text-slate-400 uppercase tracking-wider mb-3">
                                <span>{t.age}</span>
                                <span className="text-indigo-300 font-bold">{getLocContent(activeLocation).ageStr}</span>
                            </div>
                            <div className="w-full bg-slate-700/50 h-2 rounded-full overflow-hidden">
                                <div className="bg-indigo-500 h-full w-[85%] shadow-[0_0_10px_indigo]"></div>
                            </div>
                          </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="p-4 bg-slate-900/90 border-t border-white/5 text-center text-[9px] text-slate-600 font-mono tracking-widest flex justify-between items-center px-6 shrink-0 backdrop-blur-sm">
        <span>{t.system}</span>
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse shadow-[0_0_5px_teal]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse delay-75 shadow-[0_0_5px_teal]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse delay-150 shadow-[0_0_5px_teal]"></div>
        </div>
      </footer>
    </div>
  );
};

export default DeepTimeApp;
