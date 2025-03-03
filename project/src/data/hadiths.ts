export const hadiths = [
  {
    text: "Ramazan ayı girdiğinde cennet kapıları açılır, cehennem kapıları kapanır ve şeytanlar zincire vurulur.",
    source: "Buhârî, Savm 5; Müslim, Sıyâm 1"
  },
  {
    text: "Kim Ramazan orucunu iman ederek ve sevabını Allah'tan umarak tutarsa geçmiş günahları bağışlanır.",
    source: "Buhârî, Savm 6; Müslim, Sıyâm 203"
  },
  {
    text: "Oruçlu için iki sevinç vardır: Biri iftar ettiği zaman, diğeri de Rabbine kavuştuğu zamandır.",
    source: "Buhârî, Savm 9; Müslim, Sıyâm 163"
  },
  {
    text: "Oruç, kalkandır. Oruçlu kötü söz söylemesin ve cahillik yapmasın. Eğer biri ona saldırır veya söverse, 'Ben oruçluyum' desin.",
    source: "Buhârî, Savm 9; Müslim, Sıyâm 163"
  },
  {
    text: "Ramazan ayında bir oruçluyu iftar ettiren kimse, onun sevabı kadar sevap kazanır. Oruçlunun sevabından da hiçbir eksilme olmaz.",
    source: "Tirmizî, Savm 82"
  },
  {
    text: "Kim Ramazan gecelerini iman ve sevap umarak ibadetle geçirirse, geçmiş günahları bağışlanır.",
    source: "Buhârî, Salâtü't-Teravih 1; Müslim, Müsâfirîn 173"
  },
  {
    text: "Ramazan ayı mübarek bir aydır. Allah, size Ramazan orucunu farz kıldı. Bu ayda cennet kapıları açılır, cehennem kapıları kapanır ve şeytanlar bağlanır.",
    source: "Nesâî, Sıyâm 5"
  },
  {
    text: "Kim bir iyilik yaparsa, ona bunun on katı verilir. Ancak oruç müstesnadır. Onun karşılığını ancak ben veririm.",
    source: "Buhârî, Savm 9"
  },
  {
    text: "Oruçlunun ağız kokusu, Allah katında misk kokusundan daha hoştur.",
    source: "Buhârî, Savm 9; Müslim, Sıyâm 163"
  },
  {
    text: "Beş vakit namaz, Cuma namazı, Ramazan orucu, bir sonraki Ramazan'a kadar işlenen günahlar için kefarettir; büyük günahlardan kaçınılırsa!",
    source: "Müslim, Tahâret 14"
  },
  {
    text: "Oruç sabırdır, sabrın karşılığı ise cennettir.",
    source: "İbn Mâce, Sıyâm 44"
  },
  {
    text: "Ramazan ayında yapılan umre, hacca denktir.",
    source: "Buhârî, Umre 4; Müslim, Hacc 221"
  },
  {
    text: "Üç kişinin duası reddedilmez: Oruçlunun iftar anındaki duası, adaletli yöneticinin duası ve mazlumun duası.",
    source: "Tirmizî, Deavât 126"
  },
  {
    text: "İnsanların en hayırlısı, insanlara en çok faydası dokunandır.",
    source: "Ahmed b. Hanbel, el-Müsned 1/191"
  },
  {
    text: "Kim bir iyiliğe vesile olursa, ona da o iyiliği yapan kadar sevap vardır.",
    source: "Müslim, İmâre 133"
  },
  {
    text: "Her kim Ramazan ayının son on gecesini ibadetle geçirirse, Allah onu bağışlar.",
    source: "Tirmizî, Savm 1"
  },
  {
    text: "Ramazan'da oruç tutup ibadet eden kimse, anasından doğduğu gün gibi günahlarından arınır.",
    source: "Nesâî, Sıyâm 39"
  },
  {
    text: "Ramazan, sabır ayıdır. Sabrın karşılığı ise cennettir.",
    source: "İbn Huzeyme, Sahih 3/191"
  },
  {
    text: "Cennet dört kişiye özlem duyar: Kur'an okuyan, oruç tutan, dilini ve namusunu koruyan.",
    source: "Taberânî, el-Mu'cemü'l-Kebîr"
  },
  {
    text: "Kim Ramazan ayında bir mümine iftar ettirirse, onun sevabı kadar sevap kazanır.",
    source: "Tirmizî, Savm 82"
  }
];

export const getRandomHadith = () => {
  const randomIndex = Math.floor(Math.random() * hadiths.length);
  return hadiths[randomIndex];
};