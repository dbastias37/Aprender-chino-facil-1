// Si ya existe levels, conservar niveles 1–6 y CONCATENAR lo nuevo.
// Estructura de cada exercise: { chinese: '...', pinyin: '...', translation: '...', words: [{char,pinyin,uniqueId}] }
const makeWord = (han, py, id) => ({ char: han, pinyin: py, uniqueId: id || `${han}-${Math.random().toString(36).slice(2,8)}` });

export const examNumbers = () => {
  // 10 preguntas sí o sí (1..10) con opciones distractoras
  const map = [
    {n:1,h:'一',p:'yī'}, {n:2,h:'二',p:'èr'}, {n:3,h:'三',p:'sān'}, {n:4,h:'四',p:'sì'}, {n:5,h:'五',p:'wǔ'},
    {n:6,h:'六',p:'liù'}, {n:7,h:'七',p:'qī'}, {n:8,h:'八',p:'bā'}, {n:9,h:'九',p:'jiǔ'}, {n:10,h:'十',p:'shí'},
  ];
  return map.map((it) => ({
    chinese: it.h,
    pinyin: it.p,
    translation: `${it.n}`,
    // se responde por carácter (1 ficha verdadera + varias falsas)
    words: [makeWord(it.h, it.p, `num-${it.n}`),
            makeWord('木','mù'), makeWord('大','dà'), makeWord('口','kǒu'), makeWord('中','zhōng')]
  }));
};

export function extraLevels() {
  return [
    { title: 'Examen de Números', isExam: true, passThreshold: 0.8, maxAttempts: 3, exercises: examNumbers() },
    { title: 'Bebidas', exercises: [
      { chinese: '咖啡', pinyin: 'kā fēi', translation: 'café',    words: [makeWord('咖','kā'),makeWord('啡','fēi')] },
      { chinese: '茶',   pinyin: 'chá',    translation: 'té',      words: [makeWord('茶','chá')] },
      { chinese: '牛奶', pinyin: 'niú nǎi',translation: 'leche',   words: [makeWord('牛','niú'),makeWord('奶','nǎi')] },
      { chinese: '果汁', pinyin: 'guǒ zhī',translation: 'jugo',    words: [makeWord('果','guǒ'),makeWord('汁','zhī')] },
      { chinese: '水',   pinyin: 'shuǐ',   translation: 'agua',    words: [makeWord('水','shuǐ')] },
      { chinese: '啤酒', pinyin: 'pí jiǔ', translation: 'cerveza', words: [makeWord('啤','pí'),makeWord('酒','jiǔ')] },
    ]},
    { title: 'Transporte', exercises: [
      { chinese: '地铁', pinyin:'dì tiě', translation:'metro', words:[makeWord('地','dì'),makeWord('铁','tiě')] },
      { chinese: '公交车', pinyin:'gōng jiāo chē', translation:'bus', words:[makeWord('公','gōng'),makeWord('交','jiāo'),makeWord('车','chē')] },
      { chinese: '出租车', pinyin:'chū zū chē', translation:'taxi', words:[makeWord('出','chū'),makeWord('租','zū'),makeWord('车','chē')] },
      { chinese: '火车', pinyin:'huǒ chē', translation:'tren', words:[makeWord('火','huǒ'),makeWord('车','chē')] },
      { chinese: '飞机', pinyin:'fēi jī', translation:'avión', words:[makeWord('飞','fēi'),makeWord('机','jī')] },
    ]},
    { title: 'Animales', exercises: [
      { chinese:'狗', pinyin:'gǒu', translation:'perro', words:[makeWord('狗','gǒu')] },
      { chinese:'猫', pinyin:'māo', translation:'gato', words:[makeWord('猫','māo')] },
      { chinese:'鸟', pinyin:'niǎo', translation:'pájaro', words:[makeWord('鸟','niǎo')] },
      { chinese:'牛', pinyin:'niú', translation:'vaca', words:[makeWord('牛','niú')] },
      { chinese:'马', pinyin:'mǎ', translation:'caballo', words:[makeWord('马','mǎ')] },
    ]},
    { title: 'Ropa', exercises: [
      { chinese:'衣服', pinyin:'yī fu', translation:'ropa', words:[makeWord('衣','yī'),makeWord('服','fu')] },
      { chinese:'帽子', pinyin:'mào zi', translation:'sombrero', words:[makeWord('帽','mào'),makeWord('子','zi')] },
      { chinese:'鞋', pinyin:'xié', translation:'zapatos', words:[makeWord('鞋','xié')] },
      { chinese:'裤子', pinyin:'kù zi', translation:'pantalón', words:[makeWord('裤','kù'),makeWord('子','zi')] },
    ]},
    { title: 'Clima', exercises: [
      { chinese:'下雨', pinyin:'xià yǔ', translation:'llover', words:[makeWord('下','xià'),makeWord('雨','yǔ')] },
      { chinese:'晴天', pinyin:'qíng tiān', translation:'soleado', words:[makeWord('晴','qíng'),makeWord('天','tiān')] },
      { chinese:'多云', pinyin:'duō yún', translation:'nublado', words:[makeWord('多','duō'),makeWord('云','yún')] },
      { chinese:'刮风', pinyin:'guā fēng', translation:'ventoso', words:[makeWord('刮','guā'),makeWord('风','fēng')] },
    ]},
    { title: 'Partes del Cuerpo', exercises: [
      { chinese:'头', pinyin:'tóu', translation:'cabeza', words:[makeWord('头','tóu')] },
      { chinese:'手', pinyin:'shǒu', translation:'mano', words:[makeWord('手','shǒu')] },
      { chinese:'眼睛', pinyin:'yǎn jing', translation:'ojos', words:[makeWord('眼','yǎn'),makeWord('睛','jing')] },
      { chinese:'嘴巴', pinyin:'zuǐ ba', translation:'boca', words:[makeWord('嘴','zuǐ'),makeWord('巴','ba')] },
    ]},
    { title: 'Verbos Básicos I', exercises: [
      { chinese:'吃', pinyin:'chī', translation:'comer', words:[makeWord('吃','chī')] },
      { chinese:'喝', pinyin:'hē', translation:'beber', words:[makeWord('喝','hē')] },
      { chinese:'去', pinyin:'qù', translation:'ir', words:[makeWord('去','qù')] },
      { chinese:'看', pinyin:'kàn', translation:'ver', words:[makeWord('看','kàn')] },
    ]},
    { title: 'Frutas y Verduras', exercises: [
      { chinese:'苹果', pinyin:'píng guǒ', translation:'manzana', words:[makeWord('苹','píng'),makeWord('果','guǒ')] },
      { chinese:'香蕉', pinyin:'xiāng jiāo', translation:'plátano', words:[makeWord('香','xiāng'),makeWord('蕉','jiāo')] },
      { chinese:'西红柿', pinyin:'xī hóng shì', translation:'tomate', words:[makeWord('西','xī'),makeWord('红','hóng'),makeWord('柿','shì')] },
    ]},
    { title: 'Lugares de la Ciudad', exercises: [
      { chinese:'学校', pinyin:'xué xiào', translation:'escuela', words:[makeWord('学','xué'),makeWord('校','xiào')] },
      { chinese:'医院', pinyin:'yī yuàn', translation:'hospital', words:[makeWord('医','yī'),makeWord('院','yuàn')] },
      { chinese:'商店', pinyin:'shāng diàn', translation:'tienda', words:[makeWord('商','shāng'),makeWord('店','diàn')] },
    ]},
    { title: 'Profesiones', exercises: [
      { chinese:'老师', pinyin:'lǎo shī', translation:'profesor', words:[makeWord('老','lǎo'),makeWord('师','shī')] },
      { chinese:'医生', pinyin:'yī shēng', translation:'médico', words:[makeWord('医','yī'),makeWord('生','shēng')] },
      { chinese:'工程师', pinyin:'gōng chéng shī', translation:'ingeniero', words:[makeWord('工','gōng'),makeWord('程','chéng'),makeWord('师','shī')] },
    ]},
    { title: 'Objetos cotidianos', exercises: [
      { chinese:'手机', pinyin:'shǒu jī', translation:'móvil', words:[makeWord('手','shǒu'),makeWord('机','jī')] },
      { chinese:'电脑', pinyin:'diàn nǎo', translation:'computador', words:[makeWord('电','diàn'),makeWord('脑','nǎo')] },
      { chinese:'桌子', pinyin:'zhuō zi', translation:'mesa', words:[makeWord('桌','zhuō'),makeWord('子','zi')] },
    ]},
    { title: 'Frases de cortesía II', exercises: [
      { chinese:'谢谢', pinyin:'xiè xie', translation:'gracias', words:[makeWord('谢','xiè'),makeWord('谢','xie')] },
      { chinese:'对不起', pinyin:'duì bu qǐ', translation:'perdón', words:[makeWord('对','duì'),makeWord('不','bu'),makeWord('起','qǐ')] },
      { chinese:'请', pinyin:'qǐng', translation:'por favor', words:[makeWord('请','qǐng')] },
    ]},
    { title: 'Hora y Direcciones', exercises: [
      { chinese:'现在', pinyin:'xiàn zài', translation:'ahora', words:[makeWord('现','xiàn'),makeWord('在','zài')] },
      { chinese:'几点', pinyin:'jǐ diǎn', translation:'¿qué hora?', words:[makeWord('几','jǐ'),makeWord('点','diǎn')] },
      { chinese:'左转', pinyin:'zuǒ zhuǎn', translation:'gira a la izquierda', words:[makeWord('左','zuǒ'),makeWord('转','zhuǎn')] },
      { chinese:'右转', pinyin:'yòu zhuǎn', translation:'gira a la derecha', words:[makeWord('右','yòu'),makeWord('转','zhuǎn')] },
    ]},
  ];
}

// Export principal que el App concatena
export function extendLevels(baseLevels) {
  const extras = extraLevels();
  return [...baseLevels, ...extras].slice(0, 20); // ensure 20
}
