import { DocumentModel } from './../../app/shared/doc-viewer/entity/document.model';
import { Document } from './../../app/shared/document-lister/entity/document.model';

export const SIMPLE_INTERNET_DOCUMENT: DocumentModel = {
  id: 1123336617,
  documentTypeId: 8,
  publishDate: '2017-09-07T15:34:05',
  title: 'Türkiye’de 213 bin boşanma davası açıldı',
  mediaName: 'MURATYONDEMIR.COM',
  mediaNameId: 129734,
  rowIndex: 1
}


export const SIMPLE_PRESS_DOCUMENT: DocumentModel = {
  id: 433969598,
  documentTypeId: 2,
  viewDate: "2017-09-06T00:00:00",
  publishDate: "2017-09-07T00:00:00",
  title: "MÜLTECİ SAYISI 22,5 MİLYONU GEÇTİ",
  mediaName: "KARADENİZ MEYDAN",
  mediaNameId: 2592,
  rowIndex: 1
}

export const SIMPLE_TV_DOCUMENT: DocumentModel = {
  id: 1231964103,
  documentTypeId: 4,
  viewDate: "2017-08-18T00:00:00",
  publishDate: "2017-08-18T12:22:43",
  title: "SÄ°GARAYA HARCANAN PARA",
  mediaName: "NTV",
  mediaNameId: 54,
  rowIndex: 1
}

export const SIMPLE_RADIO_DOCUMENT: DocumentModel = {
  id: 1252104394,
  documentTypeId: 64,
  viewDate: '2017-07-06T00:00:00',
  publishDate: '2017-07-06T06:30:31',
  title: 'POLAT LABAR',
  mediaName: 'RADYO D',
  mediaNameId: 10900,
  rowIndex: 1,
}


export const SIMPLE_SOCIAL_MEDIA_DOCUMENT: DocumentModel = {
  id: 1123305064,
  documentTypeId: 16,
  viewDate: '2017-09-07T00:00:00',
  publishDate: '2017-09-07T12:03:30',
  title: 'ArabaExpress&:#Şanlıurfa: Satılık Otomobil Hyundai Accent Era Hyundai Accent Era 1.5 CRDi Team  https://www.araba.com/309049418-hyundai-accent-era-15-crdi-team …pic.twitter.com/Lv4onk06Sg',
  mediaName: 'TWITTER',
  mediaNameId: 161,
  rowIndex: 1
}


export const SIMPLE_NEWS_AGENCY_DOCUMENT: DocumentModel = {
  id: 1202110560,
  documentTypeId: 32,
  viewDate: '2017-04-17T13:14:44',
  publishDate: '2017-04-17T13:13:40',
  title: 'Dünya basını halk oylamasına yoğun ilgi gösterdi',
  mediaName: 'ANADOLU AJANSI',
  mediaNameId: 11,
  rowIndex: 1,
}


export const NEWS_AGENCY_DOCUMENT: DocumentModel = {
  id: 1202110560,
  documentTypeId: 32,
  viewDate: '2017-04-17T13:14:44',
  publishDate: '2017-04-17T13:13:40',
  title: 'Dünya basını halk oylamasına yoğun ilgi gösterdi',
  mediaName: 'ANADOLU AJANSI',
  mediaNameId: 11,
  contentDetail: {
    tr: {
      layoutRows: [
        {
          categoryId: 4934,
          keyword: 'Interpress',
          highWord: 'İnterpressnews'
        }
      ]
    }
  },
  content: {
    tr: "Dünya basını halk oylamasına yoğun ilgi gösterdi    - Anayasa değişikliğine ilişkin Türkiye'de yapılan halk oylaması Rusya, Ukrayna, Azerbaycan, Gürcistan, Kazakistan, Kırgızistan ve Özbekistan basınında geniş yer buldu  BAKÜ (AA) - Türkiye'de 16 Nisan'da yapılan anayasa değişikliğine ilişkin halk oylaması Rusya, Ukrayna, ile Kafkasya ve Orta Asya basınında geniş yer buldu.   Rus haber ajansları dün, oy verme işleminin başlamasıyla halk oylamasını duyurmaya başladı.Sandıkların açılmasının ardından gelişmeleri anında paylaşan Rus ajansları, sonuçlar netleştikten sonra da çeşitli değerlendirmeleri yayınladı.  Haber kanalları ve internet siteleri de halk oylamasını günün sıcak gelişmesi olarak duyurdu.  -\Türk halkı anayasa değişikliğini destekledi\   Kommersant gazetesi, \Türk halkı anayasa değişikliğini destekledi\ başlığıyla yayımladığı haberinde, \AA'nın verilerine göre, Türkiye'de halkın % 51, 20'si referandumda evet oyu kullandı, %48,80 ise hayır. \ ifadelerini kullanıldı.   İzvestiya gazetesinin \Erdoğan'ın tarihi devrimi\ başlığıyla yayınladığı haberde, halk oylamasının sonuçlarına ilişkin detaylar ve anayasanın değiştirilecek maddelerine ilişkin detaylı bilgi verildi.  Rossiya - 24 kanalı ve Life New gibi haber kanalları, bültenlerinde halk oylamasına ilişkin çok sayıda haber yayınladı.TASS ajansı, \Türkiye'deki referandumda başkanlık sistemini destekleyenler kazandı\ başlığıyla halk oylamasının sonucunu ve açıklamaların yer aldığı geniş bir haber yayımladı.   -Ukrayna  Segodnya gazetesi, anayasa değişikliğine ilişkin halk oylaması sonucunu okuyucularına aktardıktan sonra, Cumhurbaşkanı Recep Tayyip Erdoğan'ın dün gece, idam cezasıyla ilgili sözlerini de paylaştı.Erdoğan'ın Huber Köşkü önünde vatandaşlara yönelik hitabını aktaran gazete ayrıca Ukrayna'nın eski Ankara Büyükelçisi Sergey Korsunski'nin \Tanışın-Yeni Türkiye\ başlıklı makalesine yer verdi. Korsunski, anayasa halk oylamasının Türkiye’nin geleceği için küçümsenemeyeceğini vurgulayarak, Ukrayna'nın da demokratik, müreffeh ve istikrarlı bir Türkiye'ye ihtiyacı olduğunu ifade etti.  Kyivpost gazetesi de Erdoğan'ın referandum sonrası güç kazandığını aktardı.Gazete, Erdoğan'ın halk oylaması sonucu İstanbul  konuşmasındaki \Tarihin en önemli reformunu yürürlüğe geçiriyoruz\ sözlerine yer verdi.  \n -Azerbaycan  Yeni Müsavat gazetesi, birinci sayfadan duyurduğu \Türkiye tarihi seçimini yaptı\ başlıklı haberinde anayasada yapılacak değişikliklerle ilgili bilgi verdi ve liderlerin oy kullandıktan sonra yaptığı açıklamaları haberleştirdi.   Gazetenin internet sitesinde \Türkiye'de 'Evet' kazandı, kardeş ülke yeni döneme girdi\ başlıklı haberde ise seçmenlerin yüzde 51, 3'ünün değişiklikleri desteklediği belirtildi.   Azerbaycan Devlet Haber Ajansı (AZERTAC), sonuçların açıklanmasının ardından Cumhurbaşkanları İlham Aliyev ve Recep Tayyip Erdoğan arasında gerçekleştirilen telefon görüşmesini ve Aliyevin kutlama mesajını manşete taşıdı.   -Kırgızistan halk oylamasını AA'dan takip etti   Kırgızistan haber ajansları, halk oylamasını Anadolu Ajansı'ndan (AA) takip ederek duyurdu.   Halk oylamasını AA'nın paylaştığı rakamları kullanarak okuyucularına sunan Akipress haber ajansı, Yüksek Seçim Kurulu Başkanı Sadi Güven'in açıklamalarına yer verdi. Akipress, Cumhurbaşkanı Erdoğan'ın \zafer konuşması\ yaptığını belirterek, konuşmadan bölümler aktardı.   Zanoza haber ajansı da AA haberlerini kaynak göstererek, halk oylamasını \başkanlık yandaşlarının\ kazandığını duyurdu.Haberde, Cumhurbaşkanı Erdoğan'ın idamın geri getirileceği konusundaki açıklamalarına dikkat çekildi.   -Kazakistan  Zakon.kz sitesinin \Türk halkı anayasa değişikliği için oy kullandı\ başlıklı haberinde, \evet\ ve \hayır\ oyları arasındaki farkın az olduğu vurgulandı.   Türkiye'de erken seçim olabileceği ihtimalini ileri süren kazinform ajansı, yüzde 86, 5  katılım oranının ülke tarihindeki en yüksek rakam olduğuna dikkati çekti. Anayasada yapılacak değişikliklere yer veren kazinform, İstanbul, İzmir, Ankara, Antalya gibi büyük şehirlerde \hayır\ oyunun daha fazla çıktığını yazdı.  -Gürcistan  Sonuçları AA'dan takip eden Gürcistan basını da Paskalya bayramı dolayısıyla resmi tatil olmasına rağmen halk oylamasına yoğun ilgi gösterdi.   Gürcistan devlet televizyonu \TV1\, \Türkiye'de tarihi referandum\ başlıklı haberinde Türk halkının çoğunluğunun anayasa değişikliğini desteklediğini aktardı.   \İnterpressnews\ haber ajansı, halk oylamasında \evet\ oylarının yüzde 51,4 oranıyla önde olduğunu fakat Cumhuriyet Halk Partisinin sonuçları kabul etmediğini yazdı.Gürcistan'ın en popüler televizyon kanallarından Rustavi 2, gelişmeleri \Türkiye'nin iktidar partisi halk oylamasında kazanmayı kutluyor\ başlığıyla sundu.  - Özbekistan   Kun.uz haber sitesi, \Türkiye'deki halk oylaması: “Sonuçlar ve beklenen değişimler\ başlığıyla duyurdu. Halk oylamasının değişim taraftarlarının zaferiyle sonuçlandığını yazan kun.az, Cumhurbaşkanı Erdoğan'ın açıklamalarına geniş yer verdi.  Özbekçe yayın yapan sof.uz sitesi de, AA'yı kaynak göstererek yayınladığı haberde, oy kullananların yüzde 51'inden fazlasının anayasa değişikliğine \evet\ dediğini yazdı.Daryo.uz haber sitesi de \Türkiye'deki halk oylamasında anayasayı değiştirme taraftarları kazandı\ başlığı ile duyurduğu haberde, halk oylamasında oy kullananların yüzde 51,2'sinin \evet\ dediği belirtildi."
  },
  rowIndex: 1,
  streams: [
    {
      mimeType: 3,
      text: "Dünya basını halk oylamasına yoğun ilgi gösterdi    - Anayasa değişikliğine ilişkin Türkiye'de yapılan halk oylaması Rusya, Ukrayna, Azerbaycan, Gürcistan, Kazakistan, Kırgızistan ve Özbekistan basınında geniş yer buldu  BAKÜ (AA) - Türkiye'de 16 Nisan'da yapılan anayasa değişikliğine ilişkin halk oylaması Rusya, Ukrayna, ile Kafkasya ve Orta Asya basınında geniş yer buldu.   Rus haber ajansları dün, oy verme işleminin başlamasıyla halk oylamasını duyurmaya başladı.Sandıkların açılmasının ardından gelişmeleri anında paylaşan Rus ajansları, sonuçlar netleştikten sonra da çeşitli değerlendirmeleri yayınladı.  Haber kanalları ve internet siteleri de halk oylamasını günün sıcak gelişmesi olarak duyurdu.  -\Türk halkı anayasa değişikliğini destekledi\   Kommersant gazetesi, \Türk halkı anayasa değişikliğini destekledi\ başlığıyla yayımladığı haberinde, \AA'nın verilerine göre, Türkiye'de halkın % 51, 20'si referandumda evet oyu kullandı, %48,80 ise hayır. \ ifadelerini kullanıldı.   İzvestiya gazetesinin \Erdoğan'ın tarihi devrimi\ başlığıyla yayınladığı haberde, halk oylamasının sonuçlarına ilişkin detaylar ve anayasanın değiştirilecek maddelerine ilişkin detaylı bilgi verildi.  Rossiya - 24 kanalı ve Life New gibi haber kanalları, bültenlerinde halk oylamasına ilişkin çok sayıda haber yayınladı.TASS ajansı, \Türkiye'deki referandumda başkanlık sistemini destekleyenler kazandı\ başlığıyla halk oylamasının sonucunu ve açıklamaların yer aldığı geniş bir haber yayımladı.   -Ukrayna  Segodnya gazetesi, anayasa değişikliğine ilişkin halk oylaması sonucunu okuyucularına aktardıktan sonra, Cumhurbaşkanı Recep Tayyip Erdoğan'ın dün gece, idam cezasıyla ilgili sözlerini de paylaştı.Erdoğan'ın Huber Köşkü önünde vatandaşlara yönelik hitabını aktaran gazete ayrıca Ukrayna'nın eski Ankara Büyükelçisi Sergey Korsunski'nin \Tanışın-Yeni Türkiye\ başlıklı makalesine yer verdi. Korsunski, anayasa halk oylamasının Türkiye’nin geleceği için küçümsenemeyeceğini vurgulayarak, Ukrayna'nın da demokratik, müreffeh ve istikrarlı bir Türkiye'ye ihtiyacı olduğunu ifade etti.  Kyivpost gazetesi de Erdoğan'ın referandum sonrası güç kazandığını aktardı.Gazete, Erdoğan'ın halk oylaması sonucu İstanbul  konuşmasındaki \Tarihin en önemli reformunu yürürlüğe geçiriyoruz\ sözlerine yer verdi.  \n -Azerbaycan  Yeni Müsavat gazetesi, birinci sayfadan duyurduğu \Türkiye tarihi seçimini yaptı\ başlıklı haberinde anayasada yapılacak değişikliklerle ilgili bilgi verdi ve liderlerin oy kullandıktan sonra yaptığı açıklamaları haberleştirdi.   Gazetenin internet sitesinde \Türkiye'de 'Evet' kazandı, kardeş ülke yeni döneme girdi\ başlıklı haberde ise seçmenlerin yüzde 51, 3'ünün değişiklikleri desteklediği belirtildi.   Azerbaycan Devlet Haber Ajansı (AZERTAC), sonuçların açıklanmasının ardından Cumhurbaşkanları İlham Aliyev ve Recep Tayyip Erdoğan arasında gerçekleştirilen telefon görüşmesini ve Aliyevin kutlama mesajını manşete taşıdı.   -Kırgızistan halk oylamasını AA'dan takip etti   Kırgızistan haber ajansları, halk oylamasını Anadolu Ajansı'ndan (AA) takip ederek duyurdu.   Halk oylamasını AA'nın paylaştığı rakamları kullanarak okuyucularına sunan Akipress haber ajansı, Yüksek Seçim Kurulu Başkanı Sadi Güven'in açıklamalarına yer verdi. Akipress, Cumhurbaşkanı Erdoğan'ın \zafer konuşması\ yaptığını belirterek, konuşmadan bölümler aktardı.   Zanoza haber ajansı da AA haberlerini kaynak göstererek, halk oylamasını \başkanlık yandaşlarının\ kazandığını duyurdu.Haberde, Cumhurbaşkanı Erdoğan'ın idamın geri getirileceği konusundaki açıklamalarına dikkat çekildi.   -Kazakistan  Zakon.kz sitesinin \Türk halkı anayasa değişikliği için oy kullandı\ başlıklı haberinde, \evet\ ve \hayır\ oyları arasındaki farkın az olduğu vurgulandı.   Türkiye'de erken seçim olabileceği ihtimalini ileri süren kazinform ajansı, yüzde 86, 5  katılım oranının ülke tarihindeki en yüksek rakam olduğuna dikkati çekti. Anayasada yapılacak değişikliklere yer veren kazinform, İstanbul, İzmir, Ankara, Antalya gibi büyük şehirlerde \hayır\ oyunun daha fazla çıktığını yazdı.  -Gürcistan  Sonuçları AA'dan takip eden Gürcistan basını da Paskalya bayramı dolayısıyla resmi tatil olmasına rağmen halk oylamasına yoğun ilgi gösterdi.   Gürcistan devlet televizyonu \TV1\, \Türkiye'de tarihi referandum\ başlıklı haberinde Türk halkının çoğunluğunun anayasa değişikliğini desteklediğini aktardı.   \İnterpressnews\ haber ajansı, halk oylamasında \evet\ oylarının yüzde 51,4 oranıyla önde olduğunu fakat Cumhuriyet Halk Partisinin sonuçları kabul etmediğini yazdı.Gürcistan'ın en popüler televizyon kanallarından Rustavi 2, gelişmeleri \Türkiye'nin iktidar partisi halk oylamasında kazanmayı kutluyor\ başlığıyla sundu.  - Özbekistan   Kun.uz haber sitesi, \Türkiye'deki halk oylaması: “Sonuçlar ve beklenen değişimler\ başlığıyla duyurdu. Halk oylamasının değişim taraftarlarının zaferiyle sonuçlandığını yazan kun.az, Cumhurbaşkanı Erdoğan'ın açıklamalarına geniş yer verdi.  Özbekçe yayın yapan sof.uz sitesi de, AA'yı kaynak göstererek yayınladığı haberde, oy kullananların yüzde 51'inden fazlasının anayasa değişikliğine \evet\ dediğini yazdı.Daryo.uz haber sitesi de \Türkiye'deki halk oylamasında anayasayı değiştirme taraftarları kazandı\ başlığı ile duyurduğu haberde, halk oylamasında oy kullananların yüzde 51,2'sinin \evet\ dediği belirtildi. "
    }
  ]
}




export const SOCIAL_MEDIA_DOCUMENT: DocumentModel = {
  id: 1123305064,
  documentTypeId: 16,
  viewDate: '2017-09-07T00:00:00',
  publishDate: '2017-09-07T12:03:30',
  title: 'ArabaExpress&:#Şanlıurfa: Satılık Otomobil Hyundai Accent Era Hyundai Accent Era 1.5 CRDi Team  https://www.araba.com/309049418-hyundai-accent-era-15-crdi-team …pic.twitter.com/Lv4onk06Sg',
  mediaName: 'TWITTER',
  mediaNameId: 161,
  link: 'http://twitter.com/ArabaExpress/statuses/905718155493994497',
  content: {
    tr: 'ArabaExpress&:#Şanlıurfa: Satılık Otomobil Hyundai Accent Era Hyundai Accent Era 1.5 CRDi Team  https://www.araba.com/309049418-hyundai-accent-era-15-crdi-team …pic.twitter.com/Lv4onk06Sg\n"'
  },
  contentDetail: {
    tr: {
      layoutRows: [
        {
          categoryId: 20659,
          keyword: 'Hyundai',
          highWord: 'Hyundai'
        },
        {
          categoryId: 20659,
          keyword: 'Hyundai',
          highWord: 'hyundai-accent-era-15-crdi-team'
        },
        {
          categoryId: 20659,
          keyword: 'Hyundai',
          highWord: 'Hyundai Accent'
        },
        {
          categoryId: 20659,
          keyword: 'Hyundai',
          highWord: 'Accent'
        },
        {
          categoryId: 20659,
          keyword: 'Hyundai',
          highWord: 'accent'
        }
      ]
    }
  },
  rowIndex: 1,
  streams: [
    {
      mimeType: 3,
      text: 'ArabaExpress&:#Şanlıurfa: Satılık Otomobil Hyundai Accent Era Hyundai Accent Era 1.5 CRDi Team  https://www.araba.com/309049418-hyundai-accent-era-15-crdi-team …pic.twitter.com/Lv4onk06Sg\n'
    }
  ]
}



export const RADIO_DOCUMENT: DocumentModel = {
  id: 1252104394,
  documentTypeId: 64,
  viewDate: '2017-07-06T00:00:00',
  publishDate: '2017-07-06T06:30:31',
  title: 'POLAT LABAR',
  mediaName: 'RADYO D',
  mediaNameId: 10900,
  broadcastNameId: 11885,
  broadcastName: 'POLAT LABAR',
  duration: 12939000,
  fileUUIDs: [
    '4951932c-8ece-4f91-8926-55b3ddf7af91'
  ],
  fileContentTypes: [
    11
  ],
  fileDetails: [
    {
      virtualpage: null,
      stxcm: null,
      ratio: null,
      region: null,
      layout: {
        layoutDetails: [
          {
            categoryId: 19991,
            keyword: 'Medya Takip (T)',
            keywordId: 372250,
            layoutData: '11585:11596'
          }
        ]
      }
    }
  ],
  content: {
    tr: 'G20ye de herhangi anasol de il ki olsun burcu hyalen ihayı bu ararat dağları kıyıya uğranılmasına bağırsak oysa bizde de öğrencilerin de tattık ki alınan elektriğin 10 kişinin yine 2. Öğren didinmen yüzünüz kalırız açık kılları bayiliğini vural ise durumunun buna akkayaya Kalli'
  },
  rowIndex: 1,
  streams: [
    {
      url: 'http://stream.interpress.com/streamfile.ashx?uuid=4951932c-8ece-4f91-8926-55b3ddf7af91',
      diaUrl: 'http://stream.interpress.com/streamfile.ashx?uuid=4951932c-8ece-4f91-8926-55b3ddf7af91&node=1',
      text: 'G20ye de herhangi anasol de il ki olsun burcu hyalen ihayı bu ararat dağları kıyıya uğranılmasına bağırsak oysa bizde de öğrencilerin de tattık ki alınan elektriğin 10 kişinin yine 2. Öğren didinmen yüzünüz kalırız açık kılları bayiliğini vural ise durumunun buna akkayaya Kalli',
      mimeType: 1
    }
  ]
}



export const INTERNET_DOCUMENT: DocumentModel = {
  id: 1123336617,
  documentTypeId: 8,
  viewDate: '2017-09-07T00:00:00',
  publishDate: '2017-09-07T15:34:05',
  title: 'Türkiye’de 213 bin boşanma davası açıldı',
  mediaName: 'MURATYONDEMIR.COM',
  mediaNameId: 129734,
  link: 'http://muratyondemir.com/turkiyede-213-bin-bosanma-davasi-acildi.html',
  content: {
    tr: 'Türkiye’de 213 bin boşanma davası açıldı\n\nMedya takibinin önemli kuruluşu Ajans Press Türkiye’nin boşanma istatistiklerini çıkardı. Ajans Press’in adli istatistiklerden edindiği bilgilere göre, boşanma davalarından 113 bin 892’si evlilik birliğinin temelden sarsılması nedeniyle eşlerden birinin boşanmak istememesi ya da her iki eşin boşanmak istemesine karşılık boşanmanın hukuki sonuçlar çerçevesinde sağlanamaması durumunda çekişmeli olarak açıldı. Benzer nedenlerden mahkemelerdeki anlaşmalı boşanma davası sayıları ise 94 bin 622 olarak belirlendi. PRNet’in gerçekleştirdiği medya analizinde boşanma konulu bu yıl içerisinde 11 bin 673 haber yansıması tespit edilirken, geçtiğimiz yılın aynı döneminde bu rakam 14 bin 669 oldu. En çok İstanbul boşandı   Boşanma davalarının en çok açıldığı iller incelendiğinde 45 bin 534 boşanma davası ile İstanbul başı çekti. İstanbul’u 18 bin 594 dava ile Ankara,17 bin 755 dava ile de İzmir takip etti. Boşanma davalarının en az açıldığı iller ise sırasıyla Bayburt, Hakkâri ve Şırnak olurken geçtiğimiz yıl açılan davalardan 198 bin 62’si karara bağlandı. Boşanmaya en çok neden olan etkenler arasında zina, terk, ortak hayatın yeniden kurulamaması, hayata kast ve onur kırıcı davranışlar yer aldı. Öte yandan mahkemelerde, suç işleme ve haysiyetsiz hayat sürme, akıl hastalığı ve diğer nedenlerden dolayı ise toplam 684 dava gördü.\nTags: \n'
  },
  contentDetail: {
    tr: {
      layoutRows: [
        {
          categoryId: 19984,
          keyword: 'Ajans Press',
          highWord: 'Ajans Press'
        }
      ]
    }
  },
  rowIndex: 1,
  streams: [
    {
      mimeType: 3,
      text: 'Türkiye’de 213 bin boşanma davası açıldı\n\nMedya takibinin önemli kuruluşu Ajans Press Türkiye’nin boşanma istatistiklerini çıkardı. Ajans Press’in adli istatistiklerden edindiği bilgilere göre, boşanma davalarından 113 bin 892’si evlilik birliğinin temelden sarsılması nedeniyle eşlerden birinin boşanmak istememesi ya da her iki eşin boşanmak istemesine karşılık boşanmanın hukuki sonuçlar çerçevesinde sağlanamaması durumunda çekişmeli olarak açıldı. Benzer nedenlerden mahkemelerdeki anlaşmalı boşanma davası sayıları ise 94 bin 622 olarak belirlendi. PRNet’in gerçekleştirdiği medya analizinde boşanma konulu bu yıl içerisinde 11 bin 673 haber yansıması tespit edilirken, geçtiğimiz yılın aynı döneminde bu rakam 14 bin 669 oldu. En çok İstanbul boşandı   Boşanma davalarının en çok açıldığı iller incelendiğinde 45 bin 534 boşanma davası ile İstanbul başı çekti. İstanbul’u 18 bin 594 dava ile Ankara,17 bin 755 dava ile de İzmir takip etti. Boşanma davalarının en az açıldığı iller ise sırasıyla Bayburt, Hakkâri ve Şırnak olurken geçtiğimiz yıl açılan davalardan 198 bin 62’si karara bağlandı. Boşanmaya en çok neden olan etkenler arasında zina, terk, ortak hayatın yeniden kurulamaması, hayata kast ve onur kırıcı davranışlar yer aldı. Öte yandan mahkemelerde, suç işleme ve haysiyetsiz hayat sürme, akıl hastalığı ve diğer nedenlerden dolayı ise toplam 684 dava gördü.\nTags: \n'
    }
  ]
}



export const PRESS_DOCUMENT: DocumentModel = {
  id: 433969598,
  documentTypeId: 2,
  viewDate: "2017-09-06T00:00:00",
  publishDate: "2017-09-07T00:00:00",
  title: "MÜLTECİ SAYISI 22,5 MİLYONU GEÇTİ",
  city: "ZONGULDAK",
  cityId: 578,
  mediaName: "KARADENİZ MEYDAN",
  mediaNameId: 2592,
  sales: 510,
  pageNumber: 1,
  stxcm: 72,
  content: {
    tr: "Mülteci sayısı 22,5 milyonu geçti İstanbul: Yapılan araştırmalara göre, dünya tarihinde insani krizler bakımından en kötü dönemlerden birinin yaşandığı son yıllarda en az 130 milyon kişi çeşitli sebeplerle yardıma muhtaç durumda yaşarken, 25 milyon kişinin ise hayatta kalabilmek için çok acil insani yardıma ihtiyacı olduğu ortaya çıktı. Interpress'in elde ettiği bilgilere göre, dünyada yerinden edilenlerin sayısının 65,6 milyon civarında olduğu belirlendi. Buna göre her gün 28 bin 300 kişinin evini terk etmek zorunda kaldığı saptandı. Mülteci sayısı 22,5 milyonu geçti ... Yapılan araştırmalar ülkesinden göç ederek mülteci durumunda olan insan sayısının 22.5 milyonu geçtiğini gösterirken, en fazla göç veren ülkelerin 5,5 milyon mülteci ile Suriye, 2,5 milyon mülteci ile Afganistan ve 1,4 milyon mülteci ile de Güney Sudan olduğu tespit edildi. En fazla sığınmacı Türkiye'de BM Mülteciler Yüksek Komiserliği raporuna göre, 2016 yılında Türkiye'de yaklaşık 2 milyon 900 bin mültecinin barındığını ve Türkiye'nin dünya genelinde en fazla sığınmacı ağırlayan ülke olduğu belirlendi. Türkiye'yi 1 milyon 400 bin mülteciye ev sahipliği yapan Pakistan ve yaklaşık bir milyon sığınmacıyı ağırlayan Lübnan'ın izlediği saptandı. Medya Takip Ajansı Interpress'in medyada yapmış olduğu araştırmaya göre, mültecilerle ilgili yılbaşından bu yana yazılı basın ve internette 139 bin 931 haber çıktığı tespit edildi."
  },
  contentDetail: {
    tr: {
      layoutRows: [
        {
          categoryId: 4934,
          keyword: "Interpress",
          highWord: "Interpress"
        }]
    }
  },
  fileUUIDs: [
    "b311b6df-c87e-4c87-bfb0-95cd20071aef",
    "fd6cbed2-8471-469f-9293-6429f01e17b4"
  ],
  fileContentTypes: [
    1,
    2
  ],
  fileDetails: [
    {
      virtualpage: 1,
      stxcm: 72.31,
      ratio: 0.13,
      region: "NzU7MjExOTsxMTU3Ozg1MDs=",
      layout: {
        layoutDetails: [
          {
            categoryId: "4934",
            keyword: "Interpress",
            keywordId: "348346",
            layoutData: "88;421;98;20;402;650;98;20;"
          }
        ]
      }
    },
    {
      virtualpage: 15,
      stxcm: 153.57,
      ratio: 0.28,
      region: "MTQyOzE3ODsxMzAzOzE2MDM7",
      layout: {
        layoutDetails: []
      }
    },
    {
      virtualpage: null,
      stxcm: null,
      ratio: null,
      region: null,
      layout: null
    }
  ],
  rowIndex: 1,
  streams: [
    {
      url: "http://stream.interpress.com/streamfile.ashx?uuid=b311b6df-c87e-4c87-bfb0-95cd20071aef",
      diaUrl: "http://stream.interpress.com/streamfile.ashx?uuid=b311b6df-c87e-4c87-bfb0-95cd20071aef&node=1",
      text: "Mülteci sayısı 22,5 milyonu geçti İstanbul: Yapılan araştırmalara göre, dünya tarihinde insani krizler bakımından en kötü dönemlerden birinin yaşandığı son yıllarda en az 130 milyon kişi çeşitli sebeplerle yardıma muhtaç durumda yaşarken, 25 milyon kişinin ise hayatta kalabilmek için çok acil insani yardıma ihtiyacı olduğu ortaya çıktı. Interpress'in elde ettiği bilgilere göre, dünyada yerinden edilenlerin sayısının 65,6 milyon civarında olduğu belirlendi. Buna göre her gün 28 bin 300 kişinin evini terk etmek zorunda kaldığı saptandı. Mülteci sayısı 22,5 milyonu geçti ... Yapılan araştırmalar ülkesinden göç ederek mülteci durumunda olan insan sayısının 22.5 milyonu geçtiğini gösterirken, en fazla göç veren ülkelerin 5,5 milyon mülteci ile Suriye, 2,5 milyon mülteci ile Afganistan ve 1,4 milyon mülteci ile de Güney Sudan olduğu tespit edildi. En fazla sığınmacı Türkiye'de BM Mülteciler Yüksek Komiserliği raporuna göre, 2016 yılında Türkiye'de yaklaşık 2 milyon 900 bin mültecinin barındığını ve Türkiye'nin dünya genelinde en fazla sığınmacı ağırlayan ülke olduğu belirlendi. Türkiye'yi 1 milyon 400 bin mülteciye ev sahipliği yapan Pakistan ve yaklaşık bir milyon sığınmacıyı ağırlayan Lübnan'ın izlediği saptandı. Medya Takip Ajansı Interpress'in medyada yapmış olduğu araştırmaya göre, mültecilerle ilgili yılbaşından bu yana yazılı basın ve internette 139 bin 931 haber çıktığı tespit edildi.",
      mimeType: 2
    },
    {
      url: "http://stream.interpress.com/streamfile.ashx?uuid=b311b6df-c87e-4c87-bfb0-95cd20071aef",
      diaUrl: "http://stream.interpress.com/streamfile.ashx?uuid=b311b6df-c87e-4c87-bfb0-95cd20071aef&node=1",
      text: "stream_2",
      mimeType: 2
    },
    {
      url: "http://stream.interpress.com/streamfile.ashx?uuid=b311b6df-c87e-4c87-bfb0-95cd20071aef",
      diaUrl: "http://stream.interpress.com/streamfile.ashx?uuid=b311b6df-c87e-4c87-bfb0-95cd20071aef&node=1",
      text: "stream_3",
      mimeType: 2
    }
  ]
}

export const TV_DOCUMENT: DocumentModel = {
  id: 1231964103,
  documentTypeId: 4,
  viewDate: "2017-08-18T00:00:00",
  publishDate: "2017-08-18T12:22:43",
  title: "SÄ°GARAYA HARCANAN PARA",
  mediaName: "NTV",
  mediaNameId: 54,
  broadcastNameId: 1098,
  broadcastName: "NTV PARA",
  duration: 115000,
  content: {
    tr: "Ä°nmiÅŸ durumda bu konuda gelmiÅŸ durumda tabii, ekonominin zaten popÃ¼ler konularÄ±ndan 1 tanesi zaten yarÄ±m bÃ¼yÃ¼me oluyor ya enflasyon ol enflasyonda faiz daha fazla iliÅŸkilendiriyor ve faiz konusunda da Ã¶zelliklede enflasyonunda daha Ã§ok gÄ±da konuÅŸuluyordu o yÃ¼zden de daha komik desin aÃ§Ä±klamalarÄ± Ã¶nemli olabiliyor bu arda ilgi Ã§ekici 1 araÅŸtÄ±rmayÄ± sÃ¶yleyelim size bakÄ±n, sigara kullanÄ±mÄ± ne kadar servet harcÄ±yoruz sigaraya sadece 10 yÄ±lda ajans pressin yapmÄ±ÅŸ olduÄŸu 1 Ã§alÄ±ÅŸma bu 250000000000 Lira harcanmÄ±ÅŸ gÃ¶zÃ¼kÃ¼yor sizlere erkeklerde sigara iÃ§me oranÄ± Ã§ok daha yÃ¼ksek kadÄ±nlara gÃ¶re %54 kadÄ±nlarda bu oran %31 olarak karÅŸÄ±mÄ±za Ã§Ä±kÄ±yor diye daha istatistiksel baÅŸka bilgilere baktÄ±ÄŸÄ±mÄ±zda kutlu 1 sigara da aslÄ±nda Ã¶ÄŸrendik ki kullanmadÄ±ÄŸÄ±n iÃ§in bilmiyoruz, onu sorduk arkadaÅŸlar ortalama 10 Lira dediler 10 107 adet gÃ¼nde tÃ¼ketiliyormuÅŸ ortalama olarak by bu 10 liralÄ±k 1 paketsiz dÃ¼ÅŸÃ¼ndÃ¼ÄŸÃ¼mÃ¼zde gÃ¼nlÃ¼k 8 buÃ§uk Lira harcamÄ±ÅŸ oluyor. Ortalama 1 sigara iÃ§en insan bunun aylÄ±k masrafÄ± 255 TL'ye Ã§Ä±kÄ±yor ki 12 aylÄ±k 1 hesap yaptÄ±ÄŸÄ±mÄ±zda asÄ±l rakam orada zaten ortaya Ã§Ä±kmaktadÄ±r 3102 liralÄ±k 1 masraf var yani 1 yÄ±lda Asgari Ã¼cretlinin Ã§eviri gÃ¼n itikatÄ± yani 2 ayÄ±n 1 askeri Ã¼cretli Ã§alÄ±ÅŸÄ±yor. Siz onu Ã¼Ã§te 1 yÄ±lda zaten havaya yÃ¼klÃ¼yosunuz bu arda TÃ¼rk-Ä°ÅŸ'in aÃ§lÄ±k sÄ±nÄ±rÄ± 2 virgÃ¼l 1 katÄ± yere para harcanÄ±yor. Asgari Ã¼cretin 1404 Lira olduÄŸunu da hatÄ±rlatalÄ±m. Peki sigaraya harcanan para ile ne yapÄ±lÄ±rdÄ±? GÃ¶zÃ¼kÃ¼yor Osmangazi kÃ¶prÃ¼sÃ¼nden 73 tane Avrasya tÃ¼nelinden 61 tane Yavuz Sultan Selim kÃ¶prÃ¼sÃ¼nden 24 tane 3. havalimanÄ±ndan daha iyi 1 tane yapmak mÃ¼mkÃ¼nmÃ¼ÅŸ bu da ilgi Ã§ekici 1 istatistikte"
  },
  fileUUIDs: [
    "162641fe-fd6a-44a2-a9aa-ec304844dc62"
  ],
  fileContentTypes: [
    5
  ],
  fileDetails: [
    {
      virtualpage: null,
      stxcm: null,
      ratio: null,
      region: null,
      layout: {
        layoutDetails: [
          {
            categoryId: 19984,
            keyword: "Ajans Press (T)",
            keywordId: 368161,
            layoutData: "29:35"
          }
        ]
      }
    }
  ],
  rowIndex: 1,
  streams: [
    {
      url: "http://stream.interpress.com/streamfile.ashx?uuid=162641fe-fd6a-44a2-a9aa-ec304844dc62",
      diaUrl: "http://stream.interpress.com/streamfile.ashx?uuid=162641fe-fd6a-44a2-a9aa-ec304844dc62&node=1",
      text: "Ä°nmiÅŸ durumda bu konuda gelmiÅŸ durumda tabii, ekonominin zaten popÃ¼ler konularÄ±ndan 1 tanesi zaten yarÄ±m bÃ¼yÃ¼me oluyor ya enflasyon ol enflasyonda faiz daha fazla iliÅŸkilendiriyor ve faiz konusunda da Ã¶zelliklede enflasyonunda daha Ã§ok gÄ±da konuÅŸuluyordu o yÃ¼zden de daha komik desin aÃ§Ä±klamalarÄ± Ã¶nemli olabiliyor bu arda ilgi Ã§ekici 1 araÅŸtÄ±rmayÄ± sÃ¶yleyelim size bakÄ±n, sigara kullanÄ±mÄ± ne kadar servet harcÄ±yoruz sigaraya sadece 10 yÄ±lda ajans pressin yapmÄ±ÅŸ olduÄŸu 1 Ã§alÄ±ÅŸma bu 250000000000 Lira harcanmÄ±ÅŸ gÃ¶zÃ¼kÃ¼yor sizlere erkeklerde sigara iÃ§me oranÄ± Ã§ok daha yÃ¼ksek kadÄ±nlara gÃ¶re %54 kadÄ±nlarda bu oran %31 olarak karÅŸÄ±mÄ±za Ã§Ä±kÄ±yor diye daha istatistiksel baÅŸka bilgilere baktÄ±ÄŸÄ±mÄ±zda kutlu 1 sigara da aslÄ±nda Ã¶ÄŸrendik ki kullanmadÄ±ÄŸÄ±n iÃ§in bilmiyoruz, onu sorduk arkadaÅŸlar ortalama 10 Lira dediler 10 107 adet gÃ¼nde tÃ¼ketiliyormuÅŸ ortalama olarak by bu 10 liralÄ±k 1 paketsiz dÃ¼ÅŸÃ¼ndÃ¼ÄŸÃ¼mÃ¼zde gÃ¼nlÃ¼k 8 buÃ§uk Lira harcamÄ±ÅŸ oluyor. Ortalama 1 sigara iÃ§en insan bunun aylÄ±k masrafÄ± 255 TL'ye Ã§Ä±kÄ±yor ki 12 aylÄ±k 1 hesap yaptÄ±ÄŸÄ±mÄ±zda asÄ±l rakam orada zaten ortaya Ã§Ä±kmaktadÄ±r 3102 liralÄ±k 1 masraf var yani 1 yÄ±lda Asgari Ã¼cretlinin Ã§eviri gÃ¼n itikatÄ± yani 2 ayÄ±n 1 askeri Ã¼cretli Ã§alÄ±ÅŸÄ±yor. Siz onu Ã¼Ã§te 1 yÄ±lda zaten havaya yÃ¼klÃ¼yosunuz bu arda TÃ¼rk-Ä°ÅŸ'in aÃ§lÄ±k sÄ±nÄ±rÄ± 2 virgÃ¼l 1 katÄ± yere para harcanÄ±yor. Asgari Ã¼cretin 1404 Lira olduÄŸunu da hatÄ±rlatalÄ±m. Peki sigaraya harcanan para ile ne yapÄ±lÄ±rdÄ±? GÃ¶zÃ¼kÃ¼yor Osmangazi kÃ¶prÃ¼sÃ¼nden 73 tane Avrasya tÃ¼nelinden 61 tane Yavuz Sultan Selim kÃ¶prÃ¼sÃ¼nden 24 tane 3. havalimanÄ±ndan daha iyi 1 tane yapmak mÃ¼mkÃ¼nmÃ¼ÅŸ bu da ilgi Ã§ekici 1 istatistikte",
      mimeType: 1
    }
  ]
}


export const DOCUMENTS: DocumentModel[] = [
  PRESS_DOCUMENT,
  TV_DOCUMENT,
  INTERNET_DOCUMENT,
  NEWS_AGENCY_DOCUMENT,
  SOCIAL_MEDIA_DOCUMENT,
  RADIO_DOCUMENT
];