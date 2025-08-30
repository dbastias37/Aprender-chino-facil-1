import React, { useState, useEffect } from 'react';
import { Book, Star, Trophy, X, Search, AlertTriangle } from 'lucide-react';
import { extendLevels } from './data/levels';
import FloatingPanel from './components/FloatingPanel.jsx';
import RescueLivesGame from './components/RescueLivesGame.jsx';
import Ticker from './components/Ticker.jsx';

// Datos (versión compacta con 6 niveles actuales). Si quieres 20 niveles, te los agrego luego.
const chineseData = {
  dictionary: {
    'hola': { chinese: '你好', pinyin: 'nǐ hǎo' },
    'adiós': { chinese: '再见', pinyin: 'zàijiàn' },
    'gracias': { chinese: '谢谢', pinyin: 'xiè xiè' },
    'agua': { chinese: '水', pinyin: 'shuǐ' },
    'comida': { chinese: '食物', pinyin: 'shí wù' },
    'casa': { chinese: '家', pinyin: 'jiā' },
    'escuela': { chinese: '学校', pinyin: 'xué xiào' },
    'libro': { chinese: '书', pinyin: 'shū' },
    'amigo': { chinese: '朋友', pinyin: 'péng yǒu' },
    'familia': { chinese: '家庭', pinyin: 'jiā tíng' },
    'trabajo': { chinese: '工作', pinyin: 'gōng zuò' },
    'tiempo': { chinese: '时间', pinyin: 'shí jiān' },
    'dinero': { chinese: '钱', pinyin: 'qián' },
    'amor': { chinese: '爱', pinyin: 'ài' },
    'feliz': { chinese: '快乐', pinyin: 'kuài lè' },
    'grande': { chinese: '大', pinyin: 'dà' },
    'pequeño': { chinese: '小', pinyin: 'xiǎo' },
    'bueno': { chinese: '好', pinyin: 'hǎo' },
    'malo': { chinese: '坏', pinyin: 'huài' },
    'perro': { chinese: '狗', pinyin: 'gǒu' },
    'gato': { chinese: '猫', pinyin: 'māo' },
    'bebida': { chinese: '饮料', pinyin: 'yǐn liào' },
    'coche': { chinese: '汽车', pinyin: 'qì chē' },
    'avión': { chinese: '飞机', pinyin: 'fēi jī' },
    'tren': { chinese: '火车', pinyin: 'huǒ chē' },
    'bicicleta': { chinese: '自行车', pinyin: 'zì xíng chē' },
    'hospital': { chinese: '医院', pinyin: 'yī yuán' },
    'médico': { chinese: '医生', pinyin: 'yī shēng' },
    'estudiante': { chinese: '学生', pinyin: 'xué shēng' },
    'profesor': { chinese: '老师', pinyin: 'lǎo shī' },
    'padre': { chinese: '父亲', pinyin: 'fù qīn' },
    'madre': { chinese: '母亲', pinyin: 'mǔ qīn' },
    'hijo': { chinese: '儿子', pinyin: 'ér zi' },
    'hija': { chinese: '女儿', pinyin: 'nǚ ér' },
    'hermano': { chinese: '哥哥', pinyin: 'gē ge' },
    'hermana': { chinese: '姐姐', pinyin: 'jiě jie' },
    'abuelo': { chinese: '爷爷', pinyin: 'yé ye' },
    'abuela': { chinese: '奶奶', pinyin: 'nǎi nai' },
    'negro': { chinese: '黑色', pinyin: 'hēi sè' },
    'blanco': { chinese: '白色', pinyin: 'bái sè' },
    'rojo': { chinese: '红色', pinyin: 'hóng sè' },
    'azul': { chinese: '蓝色', pinyin: 'lán sè' },
    'verde': { chinese: '绿色', pinyin: 'lǜ sè' },
    'amarillo': { chinese: '黄色', pinyin: 'huáng sè' },
    'lunes': { chinese: '星期一', pinyin: 'xīng qī yī' },
    'martes': { chinese: '星期二', pinyin: 'xīng qī èr' },
    'miércoles': { chinese: '星期三', pinyin: 'xīng qī sān' },
    'jueves': { chinese: '星期四', pinyin: 'xīng qī sì' },
    'viernes': { chinese: '星期五', pinyin: 'xīng qī wǔ' },
    'sábado': { chinese: '星期六', pinyin: 'xīng qī liù' },
    'domingo': { chinese: '星期天', pinyin: 'xīng qī tiān' },
    'enero': { chinese: '一月', pinyin: 'yī yuè' },
    'febrero': { chinese: '二月', pinyin: 'èr yuè' },
    'marzo': { chinese: '三月', pinyin: 'sān yuè' },
    'abril': { chinese: '四月', pinyin: 'sì yuè' },
    'mayo': { chinese: '五月', pinyin: 'wǔ yuè' },
    'junio': { chinese: '六月', pinyin: 'liù yuè' },
    'julio': { chinese: '七月', pinyin: 'qī yuè' },
    'agosto': { chinese: '八月', pinyin: 'bā yuè' },
    'septiembre': { chinese: '九月', pinyin: 'jiǔ yuè' },
    'octubre': { chinese: '十月', pinyin: 'shí yuè' },
    'noviembre': { chinese: '十一月', pinyin: 'shí yī yuè' },
    'diciembre': { chinese: '十二月', pinyin: 'shí èr yuè' },
    'mañana': { chinese: '明天', pinyin: 'míng tiān' },
    'tarde': { chinese: '下午', pinyin: 'xià wǔ' },
    'noche': { chinese: '晚上', pinyin: 'wǎn shàng' },
    'hoy': { chinese: '今天', pinyin: 'jīn tiān' },
    'ayer': { chinese: '昨天', pinyin: 'zuó tiān' },
    'año': { chinese: '年', pinyin: 'nián' },
    'mes': { chinese: '月', pinyin: 'yuè' },
    'día': { chinese: '天', pinyin: 'tiān' },
    'semana': { chinese: '星期', pinyin: 'xīng qī' },
    'hora': { chinese: '小时', pinyin: 'xiǎo shí' },
    'minuto': { chinese: '分钟', pinyin: 'fēn zhōng' },
    'segundo': { chinese: '秒', pinyin: 'miǎo' },
    'temprano': { chinese: '早', pinyin: 'zǎo' },
    'rápido': { chinese: '快', pinyin: 'kuài' },
    'lento': { chinese: '慢', pinyin: 'màn' },
    'alto': { chinese: '高', pinyin: 'gāo' },
    'bajo': { chinese: '矮', pinyin: 'ǎi' },
    'gordo': { chinese: '胖', pinyin: 'pàng' },
    'delgado': { chinese: '瘦', pinyin: 'shòu' },
    'fuerte': { chinese: '强', pinyin: 'qiáng' },
    'débil': { chinese: '弱', pinyin: 'ruò' },
    'joven': { chinese: '年轻', pinyin: 'nián qīng' },
    'viejo': { chinese: '旧', pinyin: 'jiù' },
    'caliente': { chinese: '热', pinyin: 'rè' },
    'frío': { chinese: '冷', pinyin: 'lěng' },
    'comer': { chinese: '吃', pinyin: 'chī' },
    'beber': { chinese: '喝', pinyin: 'hē' },
    'dormir': { chinese: '睡觉', pinyin: 'shuì jiào' },
    'caminar': { chinese: '走路', pinyin: 'zǒu lù' },
    'correr': { chinese: '跑步', pinyin: 'pǎo bù' },
    'ver': { chinese: '看', pinyin: 'kàn' },
    'oír': { chinese: '听', pinyin: 'tīng' },
    'hablar': { chinese: '说话', pinyin: 'shuō huà' },
    'leer': { chinese: '读书', pinyin: 'dú shū' },
    'escribir': { chinese: '写字', pinyin: 'xiě zì' },
    'comprar': { chinese: '买', pinyin: 'mǎi' },
    'vender': { chinese: '卖', pinyin: 'mài' },
    'dar': { chinese: '给', pinyin: 'gěi' },
    'recibir': { chinese: '收', pinyin: 'shōu' },
    'enviar': { chinese: '发送', pinyin: 'fā sòng' },
    'llegar': { chinese: '到达', pinyin: 'dào dá' },
    'salir': { chinese: '出去', pinyin: 'chū qù' },
    'entrar': { chinese: '进来', pinyin: 'jìn lái' },
    'abrir': { chinese: '开', pinyin: 'kāi' },
    'cerrar': { chinese: '关', pinyin: 'guān' },
    'empezar': { chinese: '开始', pinyin: 'kāi shǐ' },
    'terminar': { chinese: '结束', pinyin: 'jié shù' },
    'ayudar': { chinese: '帮助', pinyin: 'bāng zhù' },
    'preguntar': { chinese: '问', pinyin: 'wèn' },
    'responder': { chinese: '回答', pinyin: 'huí dá' }
  },
  levels: []
};

// Solo para esta build incluyo los 6 niveles base del canvas original:
chineseData.levels = [
  { id: 1, title: 'Saludos Básicos', exercises: [
    { id:1,type:'construct',spanish:'Hola',chinese:'你好',pinyin:'nǐ hǎo',words:[
      {char:'你',pinyin:'nǐ',uniqueId:'ni1'},{char:'好',pinyin:'hǎo',uniqueId:'hao1'},{char:'我',pinyin:'wǒ',uniqueId:'wo1'},{char:'是',pinyin:'shì',uniqueId:'shi1'}]},
    { id:2,type:'construct',spanish:'Adiós',chinese:'再见',pinyin:'zàijiàn',words:[
      {char:'再',pinyin:'zài',uniqueId:'zai1'},{char:'见',pinyin:'jiàn',uniqueId:'jian1'},{char:'你',pinyin:'nǐ',uniqueId:'ni2'},{char:'好',pinyin:'hǎo',uniqueId:'hao2'}]},
    { id:3,type:'construct',spanish:'Gracias',chinese:'谢谢',pinyin:'xiè xiè',words:[
      {char:'谢',pinyin:'xiè',uniqueId:'xie1'},{char:'谢',pinyin:'xiè',uniqueId:'xie2'},{char:'不',pinyin:'bù',uniqueId:'bu1'},{char:'客气',pinyin:'kè qì',uniqueId:'keqi1'}]},
    { id:4,type:'construct',spanish:'Lo siento',chinese:'对不起',pinyin:'duì bù qǐ',words:[
      {char:'对',pinyin:'duì',uniqueId:'dui1'},{char:'不',pinyin:'bù',uniqueId:'bu2'},{char:'起',pinyin:'qǐ',uniqueId:'qi1'},{char:'没关系',pinyin:'méi guān xi',uniqueId:'meiguanxi1'}]},
    { id:5,type:'construct',spanish:'Por favor',chinese:'请',pinyin:'qǐng',words:[
      {char:'请',pinyin:'qǐng',uniqueId:'qing1'},{char:'谢谢',pinyin:'xiè xiè',uniqueId:'xiexie1'},{char:'不',pinyin:'bù',uniqueId:'bu3'},{char:'客气',pinyin:'kè qì',uniqueId:'keqi2'}]},
    { id:6,type:'construct',spanish:'De nada',chinese:'不客气',pinyin:'bù kè qì',words:[
      {char:'不',pinyin:'bù',uniqueId:'bu4'},{char:'客气',pinyin:'kè qì',uniqueId:'keqi3'},{char:'谢谢',pinyin:'xiè xiè',uniqueId:'xiexie2'},{char:'请',pinyin:'qǐng',uniqueId:'qing2'}]},
    { id:7,type:'construct',spanish:'Buenos días',chinese:'早上好',pinyin:'zǎo shàng hǎo',words:[
      {char:'早上',pinyin:'zǎo shàng',uniqueId:'zaoshang1'},{char:'好',pinyin:'hǎo',uniqueId:'hao3'},{char:'晚上',pinyin:'wǎn shàng',uniqueId:'wanshang1'},{char:'中午',pinyin:'zhōng wǔ',uniqueId:'zhongwu1'}]},
    { id:8,type:'construct',spanish:'Buenas noches',chinese:'晚上好',pinyin:'wǎn shàng hǎo',words:[
      {char:'晚上',pinyin:'wǎn shàng',uniqueId:'wanshang2'},{char:'好',pinyin:'hǎo',uniqueId:'hao4'},{char:'早上',pinyin:'zǎo shàng',uniqueId:'zaoshang2'},{char:'中午',pinyin:'zhōng wǔ',uniqueId:'zhongwu2'}]},
    { id:9,type:'construct',spanish:'¿Cómo estás?',chinese:'你好吗',pinyin:'nǐ hǎo ma',words:[
      {char:'你',pinyin:'nǐ',uniqueId:'ni3'},{char:'好',pinyin:'hǎo',uniqueId:'hao5'},{char:'吗',pinyin:'ma',uniqueId:'ma1'},{char:'我',pinyin:'wǒ',uniqueId:'wo2'}]},
    { id:10,type:'construct',spanish:'Estoy bien',chinese:'我很好',pinyin:'wǒ hěn hǎo',words:[
      {char:'我',pinyin:'wǒ',uniqueId:'wo3'},{char:'很',pinyin:'hěn',uniqueId:'hen1'},{char:'好',pinyin:'hǎo',uniqueId:'hao6'},{char:'不',pinyin:'bù',uniqueId:'bu5'}]},
  ],
  exam:[
    {question:'你好',options:['Adiós','Hola','Gracias','Por favor'],correct:1},
    {question:'谢谢',options:['Lo siento','Hola','Gracias','Adiós'],correct:2},
    {question:'再见',options:['Hola','Adiós','Gracias','Por favor'],correct:1}
  ]},

  { id:2,title:'Números Básicos',exercises:[
    {id:1,type:'construct',spanish:'Uno',chinese:'一',pinyin:'yī',words:[
      {char:'一',pinyin:'yī',uniqueId:'yi1'},{char:'二',pinyin:'èr',uniqueId:'er1'},{char:'三',pinyin:'sān',uniqueId:'san1'},{char:'四',pinyin:'sì',uniqueId:'si1'}]},
    {id:2,type:'construct',spanish:'Dos',chinese:'二',pinyin:'èr',words:[
      {char:'一',pinyin:'yī',uniqueId:'yi2'},{char:'二',pinyin:'èr',uniqueId:'er2'},{char:'三',pinyin:'sān',uniqueId:'san2'},{char:'四',pinyin:'sì',uniqueId:'si2'}]},
    {id:3,type:'construct',spanish:'Tres',chinese:'三',pinyin:'sān',words:[
      {char:'一',pinyin:'yī',uniqueId:'yi3'},{char:'二',pinyin:'èr',uniqueId:'er3'},{char:'三',pinyin:'sān',uniqueId:'san3'},{char:'四',pinyin:'sì',uniqueId:'si3'}]},
    {id:4,type:'construct',spanish:'Cuatro',chinese:'四',pinyin:'sì',words:[
      {char:'一',pinyin:'yī',uniqueId:'yi4'},{char:'二',pinyin:'èr',uniqueId:'er4'},{char:'三',pinyin:'sān',uniqueId:'san4'},{char:'四',pinyin:'sì',uniqueId:'si4'}]},
    {id:5,type:'construct',spanish:'Cinco',chinese:'五',pinyin:'wǔ',words:[
      {char:'五',pinyin:'wǔ',uniqueId:'wu1'},{char:'六',pinyin:'liù',uniqueId:'liu1'},{char:'七',pinyin:'qī',uniqueId:'qi2'},{char:'八',pinyin:'bā',uniqueId:'ba1'}]},
    {id:6,type:'construct',spanish:'Seis',chinese:'六',pinyin:'liù',words:[
      {char:'五',pinyin:'wǔ',uniqueId:'wu2'},{char:'六',pinyin:'liù',uniqueId:'liu2'},{char:'七',pinyin:'qī',uniqueId:'qi3'},{char:'八',pinyin:'bā',uniqueId:'ba2'}]},
    {id:7,type:'construct',spanish:'Siete',chinese:'七',pinyin:'qī',words:[
      {char:'五',pinyin:'wǔ',uniqueId:'wu3'},{char:'六',pinyin:'liù',uniqueId:'liu3'},{char:'七',pinyin:'qī',uniqueId:'qi4'},{char:'八',pinyin:'bā',uniqueId:'ba3'}]},
    {id:8,type:'construct',spanish:'Ocho',chinese:'八',pinyin:'bā',words:[
      {char:'五',pinyin:'wǔ',uniqueId:'wu4'},{char:'六',pinyin:'liù',uniqueId:'liu4'},{char:'七',pinyin:'qī',uniqueId:'qi5'},{char:'八',pinyin:'bā',uniqueId:'ba4'}]},
  ],
  exam:[
    {question:'三',options:['Dos','Tres','Cuatro','Cinco'],correct:1},
    {question:'七',options:['Seis','Siete','Ocho','Nueve'],correct:1},
    {question:'十',options:['Ocho','Nueve','Diez','Once'],correct:2}
  ]},

  { id:3,title:'Familia',exercises:[
    {id:1,type:'construct',spanish:'Padre',chinese:'父亲',pinyin:'fù qīn',words:[
      {char:'父亲',pinyin:'fù qīn',uniqueId:'fuqin1'},{char:'母亲',pinyin:'mǔ qīn',uniqueId:'muqin1'},{char:'儿子',pinyin:'ér zi',uniqueId:'erzi1'},{char:'女儿',pinyin:'nǚ ér',uniqueId:'nuer1'}]},
    {id:2,type:'construct',spanish:'Madre',chinese:'母亲',pinyin:'mǔ qīn',words:[
      {char:'父亲',pinyin:'fù qīn',uniqueId:'fuqin2'},{char:'母亲',pinyin:'mǔ qīn',uniqueId:'muqin2'},{char:'儿子',pinyin:'ér zi',uniqueId:'erzi2'},{char:'女儿',pinyin:'nǚ ér',uniqueId:'nuer2'}]},
    {id:3,type:'construct',spanish:'Hijo',chinese:'儿子',pinyin:'ér zi',words:[
      {char:'父亲',pinyin:'fù qīn',uniqueId:'fuqin3'},{char:'母亲',pinyin:'mǔ qīn',uniqueId:'muqin3'},{char:'儿子',pinyin:'ér zi',uniqueId:'erzi3'},{char:'女儿',pinyin:'nǚ ér',uniqueId:'nuer3'}]},
    {id:4,type:'construct',spanish:'Hija',chinese:'女儿',pinyin:'nǚ ér',words:[
      {char:'父亲',pinyin:'fù qīn',uniqueId:'fuqin4'},{char:'母亲',pinyin:'mǔ qīn',uniqueId:'muqin4'},{char:'儿子',pinyin:'ér zi',uniqueId:'erzi4'},{char:'女儿',pinyin:'nǚ ér',uniqueId:'nuer4'}]},
    {id:5,type:'construct',spanish:'Hermano',chinese:'哥哥',pinyin:'gē ge',words:[
      {char:'哥哥',pinyin:'gē ge',uniqueId:'gege1'},{char:'姐姐',pinyin:'jiě jie',uniqueId:'jiejie1'},{char:'爷爷',pinyin:'yé ye',uniqueId:'yeye1'},{char:'奶奶',pinyin:'nǎi nai',uniqueId:'nainai1'}]},
    {id:6,type:'construct',spanish:'Hermana',chinese:'姐姐',pinyin:'jiě jie',words:[
      {char:'哥哥',pinyin:'gē ge',uniqueId:'gege2'},{char:'姐姐',pinyin:'jiě jie',uniqueId:'jiejie2'},{char:'爷爷',pinyin:'yé ye',uniqueId:'yeye2'},{char:'奶奶',pinyin:'nǎi nai',uniqueId:'nainai2'}]},
    {id:7,type:'construct',spanish:'Abuelo',chinese:'爷爷',pinyin:'yé ye',words:[
      {char:'哥哥',pinyin:'gē ge',uniqueId:'gege3'},{char:'姐姐',pinyin:'jiě jie',uniqueId:'jiejie3'},{char:'爷爷',pinyin:'yé ye',uniqueId:'yeye3'},{char:'奶奶',pinyin:'nǎi nai',uniqueId:'nainai3'}]},
    {id:8,type:'construct',spanish:'Abuela',chinese:'奶奶',pinyin:'nǎi nai',words:[
      {char:'哥哥',pinyin:'gē ge',uniqueId:'gege4'},{char:'姐姐',pinyin:'jiě jie',uniqueId:'jiejie4'},{char:'爷爷',pinyin:'yé ye',uniqueId:'yeye4'},{char:'奶奶',pinyin:'nǎi nai',uniqueId:'nainai4'}]},
  ],
  exam:[
    {question:'父亲',options:['Madre','Padre','Hijo','Hermano'],correct:1},
    {question:'姐姐',options:['Hermano','Hermana','Abuelo','Abuela'],correct:1},
    {question:'朋友',options:['Familia','Amigo','Profesor','Estudiante'],correct:1}
  ]},

  { id:4,title:'Colores',exercises:[
    {id:1,type:'construct',spanish:'Rojo',chinese:'红色',pinyin:'hóng sè',words:[
      {char:'红色',pinyin:'hóng sè',uniqueId:'hongse1'},{char:'蓝色',pinyin:'lán sè',uniqueId:'lanse1'},{char:'绿色',pinyin:'lǜ sè',uniqueId:'luse1'},{char:'黄色',pinyin:'huáng sè',uniqueId:'huangse1'}]},
    {id:2,type:'construct',spanish:'Azul',chinese:'蓝色',pinyin:'lán sè',words:[
      {char:'红色',pinyin:'hóng sè',uniqueId:'hongse2'},{char:'蓝色',pinyin:'lán sè',uniqueId:'lanse2'},{char:'绿色',pinyin:'lǜ sè',uniqueId:'luse2'},{char:'黄色',pinyin:'huáng sè',uniqueId:'huangse2'}]},
    {id:3,type:'construct',spanish:'Verde',chinese:'绿色',pinyin:'lǜ sè',words:[
      {char:'红色',pinyin:'hóng sè',uniqueId:'hongse3'},{char:'蓝色',pinyin:'lán sè',uniqueId:'lanse3'},{char:'绿色',pinyin:'lǜ sè',uniqueId:'luse3'},{char:'黄色',pinyin:'huáng sè',uniqueId:'huangse3'}]},
    {id:4,type:'construct',spanish:'Amarillo',chinese:'黄色',pinyin:'huáng sè',words:[
      {char:'红色',pinyin:'hóng sè',uniqueId:'hongse4'},{char:'蓝色',pinyin:'lán sè',uniqueId:'lanse4'},{char:'绿色',pinyin:'lǜ sè',uniqueId:'luse4'},{char:'黄色',pinyin:'huáng sè',uniqueId:'huangse4'}]},
    {id:5,type:'construct',spanish:'Negro',chinese:'黑色',pinyin:'hēi sè',words:[
      {char:'黑色',pinyin:'hēi sè',uniqueId:'heise1'},{char:'白色',pinyin:'bái sè',uniqueId:'baise1'},{char:'粉色',pinyin:'fěn sè',uniqueId:'fense1'},{char:'紫色',pinyin:'zǐ sè',uniqueId:'zise1'}]},
    {id:6,type:'construct',spanish:'Blanco',chinese:'白色',pinyin:'bái sè',words:[
      {char:'黑色',pinyin:'hēi sè',uniqueId:'heise2'},{char:'白色',pinyin:'bái sè',uniqueId:'baise2'},{char:'粉色',pinyin:'fěn sè',uniqueId:'fense2'},{char:'紫色',pinyin:'zǐ sè',uniqueId:'zise2'}]},
    {id:7,type:'construct',spanish:'Rosa',chinese:'粉色',pinyin:'fěn sè',words:[
      {char:'黑色',pinyin:'hēi sè',uniqueId:'heise3'},{char:'白色',pinyin:'bái sè',uniqueId:'baise3'},{char:'粉色',pinyin:'fěn sè',uniqueId:'fense3'},{char:'紫色',pinyin:'zǐ sè',uniqueId:'zise3'}]},
    {id:8,type:'construct',spanish:'Morado',chinese:'紫色',pinyin:'zǐ sè',words:[
      {char:'黑色',pinyin:'hēi sè',uniqueId:'heise4'},{char:'白色',pinyin:'bái sè',uniqueId:'baise4'},{char:'粉色',pinyin:'fěn sè',uniqueId:'fense4'},{char:'紫色',pinyin:'zǐ sè',uniqueId:'zise4'}]},
  ],
  exam:[
    {question:'红色',options:['Azul','Rojo','Verde','Amarillo'],correct:1},
    {question:'白色',options:['Negro','Blanco','Rosa','Morado'],correct:1},
    {question:'绿色',options:['Rojo','Verde','Azul','Amarillo'],correct:1}
  ]},

  { id:5,title:'Días de la Semana',exercises:[
    {id:1,type:'construct',spanish:'Lunes',chinese:'星期一',pinyin:'xīng qī yī',words:[
      {char:'星期一',pinyin:'xīng qī yī',uniqueId:'xingqiyi1'},{char:'星期二',pinyin:'xīng qī èr',uniqueId:'xingqier1'},{char:'星期三',pinyin:'xīng qī sān',uniqueId:'xingqisan1'},{char:'星期四',pinyin:'xīng qī sì',uniqueId:'xingqisi1'}]},
    {id:2,type:'construct',spanish:'Martes',chinese:'星期二',pinyin:'xīng qī èr',words:[
      {char:'星期一',pinyin:'xīng qī yī',uniqueId:'xingqiyi2'},{char:'星期二',pinyin:'xīng qī èr',uniqueId:'xingqier2'},{char:'星期三',pinyin:'xīng qī sān',uniqueId:'xingqisan2'},{char:'星期四',pinyin:'xīng qī sì',uniqueId:'xingqisi2'}]},
    {id:3,type:'construct',spanish:'Miércoles',chinese:'星期三',pinyin:'xīng qī sān',words:[
      {char:'星期一',pinyin:'xīng qī yī',uniqueId:'xingqiyi3'},{char:'星期二',pinyin:'xīng qī èr',uniqueId:'xingqier3'},{char:'星期三',pinyin:'xīng qī sān',uniqueId:'xingqisan3'},{char:'星期四',pinyin:'xīng qī sì',uniqueId:'xingqisi3'}]},
    {id:4,type:'construct',spanish:'Jueves',chinese:'星期四',pinyin:'xīng qī sì',words:[
      {char:'星期一',pinyin:'xīng qī yī',uniqueId:'xingqiyi4'},{char:'星期二',pinyin:'xīng qī èr',uniqueId:'xingqier4'},{char:'星期三',pinyin:'xīng qī sān',uniqueId:'xingqisan4'},{char:'星期四',pinyin:'xīng qī sì',uniqueId:'xingqisi4'}]},
    {id:5,type:'construct',spanish:'Viernes',chinese:'星期五',pinyin:'xīng qī wǔ',words:[
      {char:'星期五',pinyin:'xīng qī wǔ',uniqueId:'xingqiwu1'},{char:'星期六',pinyin:'xīng qī liù',uniqueId:'xingqiliu1'},{char:'星期天',pinyin:'xīng qī tiān',uniqueId:'xingqitian1'},{char:'今天',pinyin:'jīn tiān',uniqueId:'jintian1'}]},
    {id:6,type:'construct',spanish:'Sábado',chinese:'星期六',pinyin:'xīng qī liù',words:[
      {char:'星期五',pinyin:'xīng qī wǔ',uniqueId:'xingqiwu2'},{char:'星期六',pinyin:'xīng qī liù',uniqueId:'xingqiliu2'},{char:'星期天',pinyin:'xīng qī tiān',uniqueId:'xingqitian2'},{char:'今天',pinyin:'jīn tiān',uniqueId:'jintian2'}]},
    {id:7,type:'construct',spanish:'Domingo',chinese:'星期天',pinyin:'xīng qī tiān',words:[
      {char:'星期五',pinyin:'xīng qī wǔ',uniqueId:'xingqiwu3'},{char:'星期六',pinyin:'xīng qī liù',uniqueId:'xingqiliu3'},{char:'星期天',pinyin:'xīng qī tiān',uniqueId:'xingqitian3'},{char:'今天',pinyin:'jīn tiān',uniqueId:'jintian3'}]},
    {id:8,type:'construct',spanish:'Hoy',chinese:'今天',pinyin:'jīn tiān',words:[
      {char:'今天',pinyin:'jīn tiān',uniqueId:'jintian4'},{char:'昨天',pinyin:'zuó tiān',uniqueId:'zuotian1'},{char:'明天',pinyin:'míng tiān',uniqueId:'mingtian1'},{char:'星期天',pinyin:'xīng qī tiān',uniqueId:'xingqitian4'}]},
  ],
  exam:[
    {question:'星期一',options:['Martes','Lunes','Miércoles','Jueves'],correct:1},
    {question:'今天',options:['Ayer','Hoy','Mañana','Domingo'],correct:1},
    {question:'星期六',options:['Viernes','Sábado','Domingo','Lunes'],correct:1}
  ]},

  { id:6,title:'Comida',exercises:[
    {id:1,type:'construct',spanish:'Comer',chinese:'吃',pinyin:'chī',words:[
      {char:'吃',pinyin:'chī',uniqueId:'chi1'},{char:'喝',pinyin:'hē',uniqueId:'he1'},{char:'水',pinyin:'shuǐ',uniqueId:'shui1'},{char:'茶',pinyin:'chá',uniqueId:'cha1'}]},
    {id:2,type:'construct',spanish:'Beber',chinese:'喝',pinyin:'hē',words:[
      {char:'吃',pinyin:'chī',uniqueId:'chi2'},{char:'喝',pinyin:'hē',uniqueId:'he2'},{char:'水',pinyin:'shuǐ',uniqueId:'shui2'},{char:'茶',pinyin:'chá',uniqueId:'cha2'}]},
    {id:3,type:'construct',spanish:'Agua',chinese:'水',pinyin:'shuǐ',words:[
      {char:'吃',pinyin:'chī',uniqueId:'chi3'},{char:'喝',pinyin:'hē',uniqueId:'he3'},{char:'水',pinyin:'shuǐ',uniqueId:'shui3'},{char:'茶',pinyin:'chá',uniqueId:'cha3'}]},
    {id:4,type:'construct',spanish:'Té',chinese:'茶',pinyin:'chá',words:[
      {char:'吃',pinyin:'chī',uniqueId:'chi4'},{char:'喝',pinyin:'hē',uniqueId:'he4'},{char:'水',pinyin:'shuǐ',uniqueId:'shui4'},{char:'茶',pinyin:'chá',uniqueId:'cha4'}]},
    {id:5,type:'construct',spanish:'Arroz',chinese:'米饭',pinyin:'mǐ fàn',words:[
      {char:'米饭',pinyin:'mǐ fàn',uniqueId:'mifan1'},{char:'面条',pinyin:'miàn tiáo',uniqueId:'miantiao1'},{char:'鸡肉',pinyin:'jī ròu',uniqueId:'jirou1'},{char:'牛肉',pinyin:'niú ròu',uniqueId:'niurou1'}]},
    {id:6,type:'construct',spanish:'Fideos',chinese:'面条',pinyin:'miàn tiáo',words:[
      {char:'米饭',pinyin:'mǐ fàn',uniqueId:'mifan2'},{char:'面条',pinyin:'miàn tiáo',uniqueId:'miantiao2'},{char:'鸡肉',pinyin:'jī ròu',uniqueId:'jirou2'},{char:'牛肉',pinyin:'niú ròu',uniqueId:'niurou2'}]},
    {id:7,type:'construct',spanish:'Pollo',chinese:'鸡肉',pinyin:'jī ròu',words:[
      {char:'米饭',pinyin:'mǐ fàn',uniqueId:'mifan3'},{char:'面条',pinyin:'miàn tiáo',uniqueId:'miantiao3'},{char:'鸡肉',pinyin:'jī ròu',uniqueId:'jirou3'},{char:'牛肉',pinyin:'niú ròu',uniqueId:'niurou3'}]},
    {id:8,type:'construct',spanish:'Carne de res',chinese:'牛肉',pinyin:'niú ròu',words:[
      {char:'米饭',pinyin:'mǐ fàn',uniqueId:'mifan4'},{char:'面条',pinyin:'miàn tiáo',uniqueId:'miantiao4'},{char:'鸡肉',pinyin:'jī ròu',uniqueId:'jirou4'},{char:'牛肉',pinyin:'niú ròu',uniqueId:'niurou4'}]},
  ],
  exam:[
    {question:'吃',options:['Beber','Comer','Dormir','Caminar'],correct:1},
    {question:'水',options:['Té','Agua','Leche','Jugo'],correct:1},
    {question:'米饭',options:['Fideos','Arroz','Pollo','Carne'],correct:1}
  ]},
];
// Extender a 20 niveles
chineseData.levels = extendLevels(chineseData.levels);


// --- App (idéntico flujo del canvas) ---
export default function App() {
  const MAX_LIVES = 4;
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [bonusCarryOver, setBonusCarryOver] = useState(0); // cuántos 💚 están “activos”

  const [showRescue, setShowRescue] = useState(false);
  const [rescueSummary, setRescueSummary] = useState(null);
  const [showDictionary, setShowDictionary] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [tiles, setTiles] = useState([]);
  const [attempt, setAttempt] = useState([]);
  const [showExam, setShowExam] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [examQuestion, setExamQuestion] = useState(0);
  const [examStats, setExamStats] = useState({
  correct: 0,
    wrong: 0,
    streak: 0,
    bestStreak: 0,
    mistakes: {}
  });
  const [levelProgress, setLevelProgress] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameOverType, setGameOverType] = useState(null);
  const [randomizedExercises, setRandomizedExercises] = useState({});
  const [showLevelsTab, setShowLevelsTab] = useState(false); // inicia oculto para dejar libre el espacio inferior

  useEffect(() => {
    if (gameOverType === 'noLives') {
      // limpiar cualquier resumen previo y abrir el minijuego
      setRescueSummary(null);
      setShowRescue(true);
    }
  }, [gameOverType]);

  // === Helpers únicos (NO duplicar) ===

  // Asegura barajador local
  const shuffleLocal = (array) => {
    const a = Array.isArray(array) ? [...array] : [];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  // Convierte cadena a lista de {char, pinyin}
  const toCharWords = (han, py) => {
    const chars = Array.from(han || '').filter(c => /\S/.test(c));
    const p = (py || '').trim().split(/\s+/);
    return chars.map((c, i) => ({
      char: c,
      pinyin: p[i] ?? p[p.length - 1] ?? '',
      uniqueId: `w-${c}-${i}`
    }));
  };

  // Asegura que cada ejercicio tenga words por carácter (con pinyin)
  const ensureCharWords = (ex) => {
    if (!ex) return ex;
    let words = Array.isArray(ex.words) ? ex.words : [];
    const multiChar = (ex.chinese || '').replace(/\s+/g,'').length > 1;
    const needRebuild = !words.length || words.some(x => !x?.char) || (multiChar && words.length === 1);

    if (needRebuild) {
      words = toCharWords(ex.chinese || '', ex.pinyin || '');
    } else {
      words = words.map((w, idx) => ({
        ...w,
        uniqueId: w.uniqueId || `w-${ex.id}-${idx}-${w.char || ''}`,
        pinyin: w.pinyin ?? ''
      }));
    }
    return { ...ex, words };
  };

  // Normaliza TODOS los niveles carácter por carácter
  const normalizeLevels = (levels) => (levels || []).map((lvl) => ({
    ...lvl,
    exercises: (lvl.exercises || []).map(ensureCharWords),
  }));

  chineseData.levels = normalizeLevels(chineseData.levels);

  // Pool global ES para distractores desde niveles 7..20
  const spanishPoolFromLevels = (levels, minId = 7) => {
    const pool = [];
    (levels || []).forEach((lvl) => {
      if ((lvl.id ?? 0) >= minId) {
        (lvl.exercises || []).forEach(ex => { if (ex?.spanish) pool.push(ex.spanish) })
      }
    });
    return Array.from(new Set(pool));
  };

  // Estado para cachear examen por nivel
  const [examCache, setExamCache] = React.useState({});

  const resetForExam = () => {
    setExamQuestion(0);
    setExamStats({ correct: 0, wrong: 0, streak: 0, bestStreak: 0, mistakes: {} });
  };

  const advanceToNextLevel = () => {
    setShowSummary(false);
    setShowExam(false);
    resetForExam();

    setTiles([]);
    setAttempt([]);

    setExamCache(prev => {
      const copy = { ...(prev || {}) };
      delete copy[currentLevel];
      delete copy[currentLevel + 1];
      return copy;
    });

    const next = currentLevel + 1;
    if (chineseData.levels.some(l => l.id === next)) {
      setCurrentLevel(next);
      setCurrentExercise(0);
    }
  };

  // Construye examen (6 preguntas), con 1 correcta + 3 distractores sólidos
  const buildExamFromExercises = (exercises, n = 6, allLevels = chineseData.levels, levelId = 0) => {
    const pool = (exercises || []).map(ex => ({ q: ex.chinese, ans: ex.spanish })).filter(x => x.q && x.ans);
    const pick = (arr, k) => shuffleLocal(arr).slice(0, k);
    const globalDistractors = spanishPoolFromLevels(allLevels, 7);

    const makeQuestion = (item) => {
      const sameLevel = pool.filter(p => p.ans !== item.ans).map(p => p.ans);
      let candidates = Array.from(new Set(sameLevel));

      if (levelId >= 7 || candidates.length < 3) {
        const extras = globalDistractors.filter(x => x && x !== item.ans);
        candidates = Array.from(new Set([...candidates, ...pick(extras, 8)]));
      }

      const distractors = pick(candidates, 3);
      const options = shuffleLocal([item.ans, ...distractors]);
      const correct = options.indexOf(item.ans);
      return { question: item.q, options, correct };
    };

    return pick(pool, Math.min(n, pool.length)).map(makeQuestion);
  };

  const getExamStable = (level) => {
    if (!level) return [];
    const id = level.id || 0;
    if (examCache[id]) return examCache[id];
    const ex = (Array.isArray(level.exam) && level.exam.length >= 6)
      ? level.exam.slice(0,6)
      : buildExamFromExercises(level.exercises || [], 6, chineseData.levels, id);
    setExamCache(prev => ({ ...prev, [id]: ex }));
    return ex;
  };

  const level = chineseData.levels.find((l) => l.id === currentLevel);
  const getRandomizedExercises = (levelId) => {
    if (!randomizedExercises[levelId]) {
      const levelData = chineseData.levels.find((l) => l.id === levelId);
      if (levelData && Array.isArray(levelData.exercises)) {
        const shuffled = shuffleLocal(levelData.exercises);
        setRandomizedExercises((prev) => ({ ...prev, [levelId]: shuffled }));
        return shuffled;
      }
      return [];
    }
    return randomizedExercises[levelId] || [];
  };

  const currentLevelExercises = getRandomizedExercises(currentLevel);
  if (!level) return <div className="p-6">Cargando…</div>;
  const exercise = currentLevelExercises[currentExercise];
  if (!exercise) return <div className="p-6">Preparando ejercicios…</div>;
  const totalExercises = currentLevelExercises.length || (level?.exercises?.length ?? 0);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `@keyframes heartbeat{0%{transform:scale(1)}14%{transform:scale(1.15)}28%{transform:scale(1)}42%{transform:scale(1.15)}70%{transform:scale(1)}}`;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const initial = {};
    chineseData.levels.forEach((lvl) => (initial[lvl.id] = 0));
    setLevelProgress(initial);
  }, []);

  useEffect(() => {
    const levelData = chineseData.levels.find((l) => l.id === currentLevel);
    if (levelData && levelData.exercises && !randomizedExercises[currentLevel]) {
      const shuffled = shuffleLocal(levelData.exercises);
      setRandomizedExercises((prev) => ({ ...prev, [currentLevel]: shuffled }));
    }
  }, [currentLevel]);

  useEffect(() => {
    if (exercise?.words?.length) {
      setTiles(shuffleLocal(exercise.words).map(t => ({...t, used:false})));
      setAttempt([]);
    }
  }, [exercise]);

  const toggleTile = (idx) => {
    setTiles(prev => prev.map((t, i) => i === idx ? { ...t, used: !t.used } : t));
    setAttempt(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  const loseOneLife = () => {
    setBonusCarryOver(prevBonus => {
      if (prevBonus > 0) {
        // gasta primero 💚
        return prevBonus - 1;
      } else {
        // sin 💚 → gasta ❤️
        setLives(l => Math.max(0, (l || 0) - 1));
        return 0;
      }
    });
  };

  const checkAnswer = () => {
    if (!exercise) return;
    const target = (exercise?.chinese || '').replace(/\s+/g,'');
    const user = attempt.map(i => tiles[i]?.char).join('');
    const ok = user === target;
    setIsCorrect(ok);
    setShowResult(true);
    if (!ok) {
      const isGameOver = bonusCarryOver === 0 && (lives || 0) - 1 <= 0;
      loseOneLife();
      if (isGameOver) {
        setTimeout(() => { setShowResult(false); setGameOverType('noLives'); }, 1200);
        return;
      }
    }
    setTimeout(() => {
      setShowResult(false);
      if (ok) {
        if (currentExercise >= totalExercises - 1) {
          setShowExam(true);
          setLevelProgress({ ...levelProgress, [currentLevel]: totalExercises });
        } else {
          const next = currentExercise + 1;
          setCurrentExercise(next);
          setLevelProgress({ ...levelProgress, [currentLevel]: next });
        }
      }
      setAttempt([]);
      setTiles(prev => prev.map(t => ({ ...t, used: false })));
    }, 800);
  };

  const handleExamAnswer = (selectedIndex) => {
    const examList = getExamStable(level);
    const q = examList[examQuestion];
    if (!q) return;

    const ok = selectedIndex === q.correct;
    setExamStats(prev => {
      const next = { ...prev };
      if (ok) {
        next.correct += 1;
        next.streak += 1;
        next.bestStreak = Math.max(next.bestStreak, next.streak);
      } else {
        next.wrong += 1;
        next.streak = 0;
        const key = q.question || '';
        next.mistakes[key] = (next.mistakes[key] || 0) + 1;
      }
      return next;
    });

    if (examQuestion < (examList.length - 1)) {
      setExamQuestion(examQuestion + 1);
    } else {
      setShowSummary(true);
      setShowExam(false);
    }
  };

  const restartLevel = () => {
    setCurrentExercise(0);
    setLives(MAX_LIVES);
    setBonusCarryOver(0);
    setGameOverType(null);
    setShowResult(false);
    setShowExam(false);
    setShowSummary(false);
    setExamQuestion(0);
    setExamStats({ correct: 0, wrong: 0, streak: 0, bestStreak: 0, mistakes: {} });
    setAttempt([]);
    setTiles([]);
    const levelData = chineseData.levels.find((l) => l.id === currentLevel);
    if (levelData && levelData.exercises) {
      const shuffled = shuffleLocal(levelData.exercises);
      setRandomizedExercises((prev) => ({ ...prev, [currentLevel]: shuffled }));
    }
    setLevelProgress({ ...levelProgress, [currentLevel]: 0 });
  };

  const goToLevel = (levelNum) => {
    const levelData = chineseData.levels.find((l) => l.id === levelNum);
    if (levelData) {
      setCurrentLevel(levelNum);
      setCurrentExercise(0);
      setShowResult(false);
      setShowExam(false);
      setShowSummary(false);
      setExamQuestion(0);
      setExamStats({ correct: 0, wrong: 0, streak: 0, bestStreak: 0, mistakes: {} });
      setAttempt([]);
      setTiles([]);
      if (!randomizedExercises[levelNum] && levelData.exercises) {
        const shuffled = shuffleLocal(levelData.exercises);
        setRandomizedExercises((prev) => ({ ...prev, [levelNum]: shuffled }));
      }
    }
  };

  const filteredDictionary = Object.entries(chineseData.dictionary).filter(([spanish]) =>
    spanish.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startApp = () => setShowWelcome(false);

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4">🇨🇳</div>
            <h1 className="text-4xl font-bold text-red-800 mb-4">中文学习</h1>
            <h2 className="text-2xl font-semibold text-red-600 mb-6">Aprende Chino Básico</h2>
          </div>
          <div className="mb-8 text-left">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">Bienvenido a esta herramienta de ejercicios para aprender lo básico del idioma chino.</p>
            <p className="text-gray-600 mb-4">Domina caracteres fundamentales, construye frases y mejora tu comprensión del mandarín a través de ejercicios interactivos y progresivos.</p>
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <h3 className="font-semibold text-red-800 mb-2">¿Qué aprenderás?</h3>
              <p className="mt-2 text-sm text-gray-700"><b>Una herramienta para aprender jugando</b> que conecta el <b>español</b> con el <b>chino</b>.</p>
              <div className="mt-3">
                <div className="text-xs text-gray-600 mb-1">Tópicos:</div>
                <ul className="text-xs text-gray-700 grid grid-cols-2 gap-x-4 gap-y-1">
                  <li>• Animales</li>
                  <li>• Transporte</li>
                  <li>• Dinero y comercio</li>
                  <li>• Preguntas avanzadas</li>
                  <li>• Respuestas avanzadas</li>
                  <li>• La hora</li>
                  <li>• El clima</li>
                  <li>• Emociones</li>
                  <li>• Estados de ánimo</li>
                  <li>• Meses</li>
                  <li>• Comercio avanzado</li>
                  <li>• Mascotas avanzado</li>
                  <li>• Bares y salidas avanzado</li>
                  <li>• Cordialidades avanzado</li>
                </ul>
              </div>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Saludos y expresiones básicas</li>
                <li>• Números del 1 al 8</li>
                <li>• Miembros de la familia</li>
                <li>• Colores principales</li>
                <li>• Pronunciación con pinyin</li>
              </ul>
            </div>
          </div>
          <button onClick={startApp} className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-2xl font-bold text-xl transition-all transform hover:scale-105 shadow-lg mb-8">Aprender Ahora</button>
          <div className="text-xs text-gray-500 mt-8 pt-6 border-t border-gray-200">
            <p>Esta app fue creada por <span className="font-semibold text-gray-600">Claude.ai</span> con las instrucciones e ideas de <span className="font-semibold text-gray-600"> Diego Bastías A.</span></p>
            <p className="mt-1">Todos los derechos reservados al dueño de esta idea/herramienta de aprendizaje. Agosto 2025</p>
          </div>
        </div>
      </div>
    );
  }

  if (gameOverType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md w-full border-4 border-red-400">
          <div className="text-6xl mb-6">😔</div>
          {gameOverType === 'noLives' ? (
            <>
              <h2 className="text-2xl font-bold text-red-600 mb-4">¡Has perdido todas tus vidas!</h2>
              <p className="text-gray-600 mb-6">Inténtalo de nuevo. Recuerda bien los caracteres y su significado.</p>
              <div className="flex flex-col gap-3 items-center mt-4">
                <button onClick={() => setShowRescue(true)} className="px-5 py-2 rounded-xl bg-emerald-600 text-white">Reintentar (minijuego)</button>
                <button onClick={() => { setGameOverType(null); setCurrentLevel(1); setCurrentExercise(0); }} className="px-4 py-2 rounded-xl border">Pantalla principal</button>
              </div>
              {showRescue && (
                <RescueLivesGame
                  levels={chineseData.levels}
                  currentLevel={currentLevel}
                  onClose={({ pagesCompleted, totalPages, hearts, bonusLives }) => {
                    setShowRescue(false);

                    // 1) premio por desempeño del minijuego
                    if (hearts === 'full') {
                      setLives(MAX_LIVES);
                      setGameOverType(null);
                    } else if (hearts >= 2) {
                      setLives(prev => Math.min(MAX_LIVES, (prev || 0) + hearts));
                      setGameOverType(null);
                    } else if (hearts === 1) {
                      setLives(prev => Math.min(MAX_LIVES, (prev || 0) + 1));
                      setGameOverType(null);
                    }

                    // 2) sumar 💚 verdes acumulados (puede ser > 1)
                    if (bonusLives && bonusLives > 0) {
                      setLives(prev => Math.min(MAX_LIVES, (prev || 0) + bonusLives));
                      setGameOverType(null);
                      setBonusCarryOver(prev => prev + bonusLives);
                    }

                    // (opcional) mostrar resumen
                    setRescueSummary({ hearts, bonus: bonusLives, pagesCompleted, totalPages });
                  }}
                />
              )}
              <FloatingPanel
                open={!!rescueSummary && (rescueSummary.hearts !== 0 || rescueSummary.bonus)}
                title="¡Vidas recuperadas!"
                onClose={() => setRescueSummary(null)}
                actions={[{
                  label: 'Volver al juego',
                  className: 'px-4 py-2 rounded-xl bg-emerald-600 text-white',
                  onClick: () => {
                    if (lives > 0) {
                      setRescueSummary(null);
                      setGameOverType(null);
                    }
                  }
                }]}
              >
                <div className="text-gray-700">
                  {rescueSummary?.hearts === 'full' ? (
                    <p>
                      ¡Completaste todas las páginas ({rescueSummary?.totalPages}) y recuperaste <b>todas</b> las vidas
                      {rescueSummary?.bonus ? ' +1 por bonus' : ''}!
                    </p>
                  ) : (
                    <p>
                      Completaste {rescueSummary?.pagesCompleted} / {rescueSummary?.totalPages} páginas y recuperaste <b>{rescueSummary?.hearts}</b> {rescueSummary?.hearts===1?'vida':'vidas'}
                      {rescueSummary?.bonus ? ' +1 por bonus' : ''}.
                    </p>
                  )}
                </div>
              </FloatingPanel>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-red-600 mb-4">¡Lo siento!</h2>
              <p className="text-gray-600 mb-6">Practica más, recuerda los caracteres y su significado y vuelve a intentarlo.</p>
            </>
          )}
          <button onClick={restartLevel} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-2xl font-semibold text-lg transition-colors w-full">Reintentar</button>
        </div>
      </div>
    );
  }

    if (showExam) {
    const examList = getExamStable(level);
    const q = examList[examQuestion];
    if (!q) return <div className="p-6">Generando examen…</div>;
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Trophy className="text-red-600 w-8 h-8" />
              <h2 className="text-2xl font-bold text-red-800">Examen - Nivel {currentLevel}</h2>
            </div>
            <div className="flex items-center gap-4">
              {/* Barra global de corazones: ❤️ rojos, 💚 verdes (carry), 🤍 vacíos */}
              <div className="flex items-center gap-1">
                {/* Rojos = vidas totales menos los verdes (no bajes de 0) */}
                {Array.from({ length: Math.max(0, (lives || 0) - (bonusCarryOver || 0)) }).map((_, i) => (
                  <span key={'r'+i} className="text-xl">❤️</span>
                ))}
                {/* Verdes (bonus activos) */}
                {Array.from({ length: Math.max(0, (bonusCarryOver || 0)) }).map((_, i) => (
                  <span key={'g'+i} className="text-xl">💚</span>
                ))}
                {/* Vacíos hasta MAX_LIVES */}
                {Array.from({ length: Math.max(0, (MAX_LIVES || 0) - (lives || 0)) }).map((_, i) => (
                  <span key={'e'+i} className="text-xl opacity-70">🤍</span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{q.question}</div>
              <p className="text-gray-600">¿Qué significa este texto en chino?</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {q.options.map((option, index) => (
                <button key={index} onClick={() => handleExamAnswer(index)} className="bg-red-100 hover:bg-red-200 text-red-800 p-4 rounded-2xl font-semibold transition-colors border-2 border-transparent hover:border-red-300">
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {showDictionary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-red-800 flex items-center gap-2">
                <Book className="w-6 h-6" /> Diccionario Chino
              </h3>
              <button onClick={() => setShowDictionary(false)} className="text-gray-500 hover:text-gray-700 p-2">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="text" placeholder="Buscar en español..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              <div className="max-h-96 overflow-y-auto">
                {Object.entries(chineseData.dictionary)
                  .filter(([spanish]) => spanish.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map(([spanish, data]) => (
                    <div key={spanish} className="bg-red-50 p-4 rounded-2xl border border-red-100 mb-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-red-800 capitalize">{spanish}</div>
                          <div className="text-sm text-red-600">{data.pinyin}</div>
                        </div>
                        <div className="text-3xl text-red-800">{data.chinese}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="text-red-800 font-bold text-2xl">中文学习</div>
            <div className="flex items-center gap-2">
              <Star className="text-yellow-500 w-5 h-5" />
              <span className="text-red-800 font-semibold">Nivel {currentLevel}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowDictionary(true)} className="flex items-center gap-2 bg-brown-600 hover:bg-brown-700 text-white px-4 py-2 rounded-2xl transition-colors" style={{ backgroundColor: '#8B4513' }} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#A0522D')} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#8B4513')}>
              <Book className="w-4 h-4" /> Diccionario
            </button>
            {/* Barra global de corazones: ❤️ rojos, 💚 verdes (carry), 🤍 vacíos */}
            <div className="flex items-center gap-1">
              {/* Rojos = vidas totales menos los verdes (no bajes de 0) */}
              {Array.from({ length: Math.max(0, (lives || 0) - (bonusCarryOver || 0)) }).map((_, i) => (
                <span key={'r'+i} className="text-xl">❤️</span>
              ))}
              {/* Verdes (bonus activos) */}
              {Array.from({ length: Math.max(0, (bonusCarryOver || 0)) }).map((_, i) => (
                <span key={'g'+i} className="text-xl">💚</span>
              ))}
              {/* Vacíos hasta MAX_LIVES */}
              {Array.from({ length: Math.max(0, (MAX_LIVES || 0) - (lives || 0)) }).map((_, i) => (
                <span key={'e'+i} className="text-xl opacity-70">🤍</span>
              ))}
            </div>
          </div>
        </div>

        {/* Ticker: arriba de la barra de progreso */}
        <div className="max-w-3xl mx-auto mt-3 mb-2">
          <Ticker />
        </div>

        <div className="mb-8">
          <div className="bg-red-200 rounded-full h-3 overflow-hidden">
            <div className="bg-red-600 h-full transition-all duration-500" style={{ width: totalExercises > 0 ? `${((Math.min(currentExercise, totalExercises - 1) + 1) / totalExercises) * 100}%` : '0%' }} />
          </div>
          <div className="text-sm text-red-700 mt-2">Ejercicio {Math.min(currentExercise + 1, totalExercises)} de {totalExercises}</div>
        </div>

        {exercise && exercise.words && exercise.words.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-red-800 mb-4">{level?.title || 'Nivel'}</h2>
              <p className="text-gray-600 mb-6">Construye la frase en chino:</p>
              <div className="text-2xl font-semibold text-red-700 mb-2">"{exercise.spanish}"</div>
              <div className="text-lg text-red-500 mb-8">{exercise.pinyin}</div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {(tiles || []).map((w, idx) => (
                <button
                  key={w.uniqueId || idx}
                  disabled={w.used}
                  onClick={() => toggleTile(idx)}
                  className="px-4 py-4 rounded-2xl border shadow-sm bg-white hover:bg-orange-50 disabled:opacity-50"
                >
                  <div className="text-4xl mb-1">{w.char}</div>
                  <div className="text-xs text-gray-500">{w.pinyin}</div>
                </button>
              ))}
            </div>
            <div className="text-sm text-gray-500 mb-3">
              Construye: <span className="font-mono">{attempt.map(i=>tiles[i]?.char).join('')}</span>
            </div>

            <div className="text-center">
              <button onClick={checkAnswer} disabled={attempt.length === 0} className={`px-8 py-3 rounded-2xl text-white font-semibold text-lg transition-colors ${attempt.length > 0 ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'}`}>Comprobar</button>
            </div>
          </div>
        ) : currentLevelExercises.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto text-center">
            <div className="text-gray-600 mb-4">Inicializando nivel...</div>
            <button onClick={() => goToLevel(currentLevel)} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-2xl">Recargar Nivel</button>
          </div>
        ) : currentExercise >= totalExercises ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto text-center">
            <div className="text-green-600 text-xl font-semibold mb-4">¡Nivel Completado!</div>
            <div className="text-gray-600 mb-6">Has terminado todos los ejercicios. ¡Ahora el examen!</div>
            <button onClick={() => setShowExam(true)} className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-2xl font-semibold">Comenzar Examen</button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto text-center">
            <div className="text-red-600 mb-4">Error: Ejercicio no disponible</div>
            <div className="text-gray-600 mb-4">Ejercicio {currentExercise + 1} • Nivel {currentLevel}</div>
            <div className="flex gap-4 justify-center">
              <button onClick={() => setCurrentExercise(0)} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-2xl">Reiniciar Nivel</button>
              <button onClick={() => goToLevel(currentLevel)} className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-2xl">Recargar Ejercicios</button>
            </div>
          </div>
        )}

        <div className="mt-6">
          {/* Pestaña/handler */}
          <button
            className="px-4 py-2 rounded-t-xl bg-white border shadow-sm hover:bg-gray-50 text-sm"
            onClick={() => setShowLevelsTab(v => !v)}
          >
            {showLevelsTab ? '▾ Niveles' : '▸ Niveles'}
          </button>

          {showLevelsTab && (
            <div className="rounded-b-xl border border-t-0 shadow-sm p-3 bg-white">
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-4 max-w-4xl mx-auto">
                {Array.from({ length: 20 }, (_, i) => i + 1).map((levelNum) => {
                  const levelMeta = chineseData.levels.find((l) => l.id === levelNum);
                  const required = levelMeta?.exercises?.length ?? 8;
                  const progress = levelProgress[levelNum] || 0;
                  const prevMeta = chineseData.levels.find((l) => l.id === levelNum - 1);
                  const isUnlocked = levelNum === 1 || (levelProgress[levelNum - 1] || 0) >= (prevMeta?.exercises?.length || 8);
                  const isCompleted = progress >= required;
                  return (
                    <button key={levelNum} onClick={() => { if (isUnlocked) goToLevel(levelNum); }} disabled={!isUnlocked} className={`aspect-square rounded-2xl font-bold text-lg transition-all ${levelNum === currentLevel ? 'bg-red-600 text-white shadow-lg scale-110' : isCompleted ? 'bg-green-500 text-white hover:bg-green-600' : isUnlocked ? 'bg-orange-400 text-white hover:bg-orange-500' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                      {isCompleted ? '✓' : levelNum}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
      <FloatingPanel
        open={showSummary}
        title="¡Felicitaciones!"
        onClose={() => setShowSummary(false)}
        actions={[
          {
            label: "Reintentar examen",
            className: "px-4 py-2 rounded-xl bg-gray-900 text-white",
            onClick: () => { setShowSummary(false); setShowExam(true); resetForExam(); }
          },
          {
            label: "Siguiente nivel",
            className: "px-4 py-2 rounded-xl bg-emerald-600 text-white",
            onClick: advanceToNextLevel
          }
        ]}
      >
        {(() => {
          const examList = getExamStable(level);
          const hardest = Object.entries(examStats.mistakes).sort((a,b)=>b[1]-a[1])[0];
          let hardestES = '';
          if (hardest?.[0]) {
            const found = (level.exercises || []).find(ex => ex.chinese === hardest[0]);
            hardestES = found?.spanish || '';
          }
          return (
            <div>
              <div className="text-gray-600 mb-3">Examen del nivel {currentLevel} completado.</div>
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="p-3 rounded-2xl bg-emerald-50">
                  <div className="text-xs text-gray-500">Puntaje</div>
                  <div className="text-xl font-semibold">{examStats.correct} / {examList.length}</div>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-50">
                  <div className="text-xs text-gray-500">Mejor racha</div>
                  <div className="text-xl font-semibold">{examStats.bestStreak}</div>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-50 col-span-2">
                  <div className="text-xs text-gray-500">Palabra que más costó</div>
                  {hardest ? (
                    <div className="mt-1">
                      <div className="text-lg">{hardest[0]} <span className="text-gray-400">×{hardest[1]}</span></div>
                      <div className="text-xs text-gray-500">{hardestES}</div>
                    </div>
                  ) : <div className="text-xs text-gray-500 mt-1">¡Ninguna te complicó!</div>}
                </div>
              </div>
            
</div>
          );
        })()}
      </FloatingPanel>
    </>
  );
}
