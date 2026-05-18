import re

with open("Front-End/src/data/products.js", "r") as f:
    content = f.read()

content = content.replace("'hotel'", "'signature'")
content = content.replace("hotel-collection", "signature-oils")

content = re.sub(r"const IMG = \{.*?\};\n", "", content, flags=re.DOTALL)
content = re.sub(r"function imgs\(pool, i\).*?\}\n", "", content, flags=re.DOTALL)

ids = [
    "1594035910387-fea47794261f", "1541643600914-78b084683702", "1583847268964-b28dc8f51f92", 
    "1563170351-be82bc888aa4", "1587017539504-67cfbddac569", "1598300042247-d088f8ab3a91",
    "1488161628813-04466f872be2", "1613521973937-efcfda6fdd95", "1523293182086-7651a899d37f",
    "1590736969955-71cc94901144", "1571781926291-c477ebfd024b", "1547496502-affa22e38b1c",
    "1608181831718-c9e3c34f5c5a", "1616401784845-180882ba9ba8", "1588405748880-12d1d2a59f75",
    "1551882547-ff40c63fe1d6", "1592945403244-b3fbafd7f539", "1557170334-a9632e77c6e4",
    "1615529182904-1b7713d2dc53", "1605651202774-9d2731d8c2b2", "1590736910113-d811d7351663",
    "1629198688000-71f23e745b6e", "1578683010236-d716f9a3f461", "1564501049412-61c2a3083791",
    "1631049307264-da0ec9d70304", "1549465220-1a8b9238cd48", "1576426863848-c21f53c60b19",
    "1612282830293-9c8e1e3606f7", "1615486511484-92e17364bf74", "1596462502278-27bf84033005",
    "1611078449458-47c1b504c541", "1585360341774-b52e07973c1c", "1608528577316-cea33bfd3f23",
    "1595425970377-c9703c58e240", "1572454653697-3932a3eb9465", "1586521571434-2a62886c91a0",
    "1602446700676-e17df20ab24f", "1599305090598-fe179d501227", "1614805364132-90f70db2b2ec",
    "1611070566367-96a1a1ff27a8", "1582218080894-3995f543dcbc", "1599305090514-6b99de24f6f8",
    "1621215160844-307ab4671ea3", "1618361718015-b5015b3cba14", "1580974866632-15f5a8947fbb",
    "1602446700813-f4325a75877c", "1580974852861-12711ff635f7", "1593026365449-3bdf70275c1c",
    "1585233261699-27807c4c3e38", "1594913619175-10cebbcebaf0", "1596462502293-7ea0808b0fb6",
    "1611565538012-32a81f337b54", "1611565538202-b5e1ce1da5b8", "1611565538352-78d12b07b140",
    "1611565538302-38d12b07b140", "1611565538100-20d12b07b140"
]

ids_str = ",\n  ".join([f"'{id}'" for id in ids])
array_inject = f"""
const UNIQUE_IDS = [
  {ids_str}
];

let idCounter = 0;
function imgs(i) {{
  const id1 = UNIQUE_IDS[idCounter % UNIQUE_IDS.length];
  idCounter++;
  const id2 = UNIQUE_IDS[idCounter % UNIQUE_IDS.length];
  const id3 = UNIQUE_IDS[(idCounter + 1) % UNIQUE_IDS.length];
  return [
    `${{U}}/photo-${{id1}}?q=80&w=800&auto=format&fit=crop`,
    `${{U}}/photo-${{id2}}?q=80&w=800&auto=format&fit=crop`,
    `${{U}}/photo-${{id3}}?q=80&w=800&auto=format&fit=crop`
  ];
}}
"""

content = content.replace("const U = 'https://images.unsplash.com';", "const U = 'https://images.unsplash.com';\n" + array_inject)
content = re.sub(r"images:\s*imgs\(.*?\)", "images: imgs(i)", content)

with open("Front-End/src/data/products.js", "w") as f:
    f.write(content)
