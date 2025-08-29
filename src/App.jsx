
import React, { useEffect, useMemo, useState } from 'react';
import { Book, Heart, Star, Trophy, X, Search, AlertTriangle, PartyPopper } from 'lucide-react';

/** 
 * Base data copied from your canvas (niveles 1-6) y misma UI/flujo.
 * Añado generación de niveles 7-20 siguiendo tu lógica: 1 temática = 1 nivel, 10 ejercicios cada uno,
 * algunos ejercicios se repiten, examen por nivel y pantalla de felicitaciones al aprobar.
 */

const baseData = {
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
  levels: [
    // 1) Saludos Básicos (10 ejercicios)
    {
      id: 1,
      title: 'Saludos Básicos',
      exercises: [
        { id:1, type:'construct', spanish:'Hola', chinese:'你好', pinyin:'nǐ hǎo', words:[
          {char:'你', pinyin:'nǐ', uniqueId:'l1e1a'}, {char:'好', pinyin:'hǎo', uniqueId:'l1e1b'}, {char:'我', pinyin:'wǒ', uniqueId:'l1e1c'}, {char:'是', pinyin:'shì', uniqueId:'l1e1d'}]},
        { id:2, type:'construct', spanish:'Adiós', chinese:'再见', pinyin:'zàijiàn', words:[
          {char:'再', pinyin:'zài', uniqueId:'l1e2a'}, {char:'见', pinyin:'jiàn', uniqueId:'l1e2b'}, {char:'你', pinyin:'nǐ', uniqueId:'l1e2c'}, {char:'好', pinyin:'hǎo', uniqueId:'l1e2d'}]},
        { id:3, type:'construct', spanish:'Gracias', chinese:'谢谢', pinyin:'xiè xiè', words:[
          {char:'谢', pinyin:'xiè', uniqueId:'l1e3a'}, {char:'谢', pinyin:'xiè', uniqueId:'l1e3b'}, {char:'不', pinyin:'bù', uniqueId:'l1e3c'}, {char:'客气', pinyin:'kè qì', uniqueId:'l1e3d'}]},
        { id:4, type:'construct', spanish:'Lo siento', chinese:'对不起', pinyin:'duì bù qǐ', words:[
          {char:'对', pinyin:'duì', uniqueId:'l1e4a'}, {char:'不', pinyin:'bù', uniqueId:'l1e4b'}, {char:'起', pinyin:'qǐ', uniqueId:'l1e4c'}, {char:'没关系', pinyin:'méi guān xi', uniqueId:'l1e4d'}]},
        { id:5, type:'construct', spanish:'Por favor', chinese:'请', pinyin:'qǐng', words:[
          {char:'请', pinyin:'qǐng', uniqueId:'l1e5a'}, {char:'谢谢', pinyin:'xiè xiè', uniqueId:'l1e5b'}, {char:'不', pinyin:'bù', uniqueId:'l1e5c'}, {char:'客气', pinyin:'kè qì', uniqueId:'l1e5d'}]},
        { id:6, type:'construct', spanish:'De nada', chinese:'不客气', pinyin:'bù kè qì', words:[
          {char:'不', pinyin:'bù', uniqueId:'l1e6a'}, {char:'客气', pinyin:'kè qì', uniqueId:'l1e6b'}, {char:'谢谢', pinyin:'xiè xiè', uniqueId:'l1e6c'}, {char:'请', pinyin:'qǐng', uniqueId:'l1e6d'}]},
        { id:7, type:'construct', spanish:'Buenos días', chinese:'早上好', pinyin:'zǎo shàng hǎo', words:[
          {char:'早上', pinyin:'zǎo shàng', uniqueId:'l1e7a'}, {char:'好', pinyin:'hǎo', uniqueId:'l1e7b'}, {char:'晚上', pinyin:'wǎn shàng', uniqueId:'l1e7c'}, {char:'中午', pinyin:'zhōng wǔ', uniqueId:'l1e7d'}]},
        { id:8, type:'construct', spanish:'Buenas noches', chinese:'晚上好', pinyin:'wǎn shàng hǎo', words:[
          {char:'晚上', pinyin:'wǎn shàng', uniqueId:'l1e8a'}, {char:'好', pinyin:'hǎo', uniqueId:'l1e8b'}, {char:'早上', pinyin:'zǎo shàng', uniqueId:'l1e8c'}, {char:'中午', pinyin:'zhōng wǔ', uniqueId:'l1e8d'}]},
        { id:9, type:'construct', spanish:'¿Cómo estás?', chinese:'你好吗', pinyin:'nǐ hǎo ma', words:[
          {char:'你', pinyin:'nǐ', uniqueId:'l1e9a'}, {char:'好', pinyin:'hǎo', uniqueId:'l1e9b'}, {char:'吗', pinyin:'ma', uniqueId:'l1e9c'}, {char:'我', pinyin:'wǒ', uniqueId:'l1e9d'}]},
        { id:10, type:'construct', spanish:'Estoy bien', chinese:'我很好', pinyin:'wǒ hěn hǎo', words:[
          {char:'我', pinyin:'wǒ', uniqueId:'l1e10a'}, {char:'很', pinyin:'hěn', uniqueId:'l1e10b'}, {char:'好', pinyin:'hǎo', uniqueId:'l1e10c'}, {char:'不', pinyin:'bù', uniqueId:'l1e10d'}]},
      ],
      exam: [
        { question: '你好', options: ['Adiós', 'Hola', 'Gracias', 'Por favor'], correct: 1 },
        { question: '谢谢', options: ['Lo siento', 'Hola', 'Gracias', 'Adiós'], correct: 2 },
        { question: '再见', options: ['Hola', 'Adiós', 'Gracias', 'Por favor'], correct: 1 }
      ]
    },
    // 2) Números (8 -> normalizar a 10 duplicando 1 y 2 al final)
    {
      id: 2,
      title: 'Números Básicos',
      exercises: [
        { id:1, type:'construct', spanish:'Uno', chinese:'一', pinyin:'yī', words:[
          {char:'一', pinyin:'yī', uniqueId:'l2e1a'}, {char:'二', pinyin:'èr', uniqueId:'l2e1b'}, {char:'三', pinyin:'sān', uniqueId:'l2e1c'}, {char:'四', pinyin:'sì', uniqueId:'l2e1d'}]},
        { id:2, type:'construct', spanish:'Dos', chinese:'二', pinyin:'èr', words:[
          {char:'一', pinyin:'yī', uniqueId:'l2e2a'}, {char:'二', pinyin:'èr', uniqueId:'l2e2b'}, {char:'三', pinyin:'sān', uniqueId:'l2e2c'}, {char:'四', pinyin:'sì', uniqueId:'l2e2d'}]},
        { id:3, type:'construct', spanish:'Tres', chinese:'三', pinyin:'sān', words:[
          {char:'一', pinyin:'yī', uniqueId:'l2e3a'}, {char:'二', pinyin:'èr', uniqueId:'l2e3b'}, {char:'三', pinyin:'sān', uniqueId:'l2e3c'}, {char:'四', pinyin:'sì', uniqueId:'l2e3d'}]},
        { id:4, type:'construct', spanish:'Cuatro', chinese:'四', pinyin:'sì', words:[
          {char:'一', pinyin:'yī', uniqueId:'l2e4a'}, {char:'二', pinyin:'èr', uniqueId:'l2e4b'}, {char:'三', pinyin:'sān', uniqueId:'l2e4c'}, {char:'四', pinyin:'sì', uniqueId:'l2e4d'}]},
        { id:5, type:'construct', spanish:'Cinco', chinese:'五', pinyin:'wǔ', words:[
          {char:'五', pinyin:'wǔ', uniqueId:'l2e5a'}, {char:'六', pinyin:'liù', uniqueId:'l2e5b'}, {char:'七', pinyin:'qī', uniqueId:'l2e5c'}, {char:'八', pinyin:'bā', uniqueId:'l2e5d'}]},
        { id:6, type:'construct', spanish:'Seis', chinese:'六', pinyin:'liù', words:[
          {char:'五', pinyin:'wǔ', uniqueId:'l2e6a'}, {char:'六', pinyin:'liù', uniqueId:'l2e6b'}, {char:'七', pinyin:'qī', uniqueId:'l2e6c'}, {char:'八', pinyin:'bā', uniqueId:'l2e6d'}]},
        { id:7, type:'construct', spanish:'Siete', chinese:'七', pinyin:'qī', words:[
          {char:'五', pinyin:'wǔ', uniqueId:'l2e7a'}, {char:'六', pinyin:'liù', uniqueId:'l2e7b'}, {char:'七', pinyin:'qī', uniqueId:'l2e7c'}, {char:'八', pinyin:'bā', uniqueId:'l2e7d'}]},
        { id:8, type:'construct', spanish:'Ocho', chinese:'八', pinyin:'bā', words:[
          {char:'五', pinyin:'wǔ', uniqueId:'l2e8a'}, {char:'六', pinyin:'liù', uniqueId:'l2e8b'}, {char:'七', pinyin:'qī', uniqueId:'l2e8c'}, {char:'八', pinyin:'bā', uniqueId:'l2e8d'}]},
        { id:9, type:'construct', spanish:'Uno', chinese:'一', pinyin:'yī', words:[
          {char:'一', pinyin:'yī', uniqueId:'l2e9a'}, {char:'二', pinyin:'èr', uniqueId:'l2e9b'}, {char:'三', pinyin:'sān', uniqueId:'l2e9c'}, {char:'四', pinyin:'sì', uniqueId:'l2e9d'}]},
        { id:10, type:'construct', spanish:'Dos', chinese:'二', pinyin:'èr', words:[
          {char:'一', pinyin:'yī', uniqueId:'l2e10a'}, {char:'二', pinyin:'èr', uniqueId:'l2e10b'}, {char:'三', pinyin:'sān', uniqueId:'l2e10c'}, {char:'四', pinyin:'sì', uniqueId:'l2e10d'}]},
      ],
      exam: [
        { question: '三', options: ['Dos', 'Tres', 'Cuatro', 'Cinco'], correct: 1 },
        { question: '七', options: ['Seis', 'Siete', 'Ocho', 'Nueve'], correct: 1 },
        { question: '十', options: ['Ocho', 'Nueve', 'Diez', 'Once'], correct: 2 }
      ]
    },
    // 3) Familia (8 -> 10)
    {
      id: 3,
      title: 'Familia',
      exercises: [
        { id:1, type:'construct', spanish:'Padre', chinese:'父亲', pinyin:'fù qīn', words:[
          {char:'父亲', pinyin:'fù qīn', uniqueId:'l3e1a'}, {char:'母亲', pinyin:'mǔ qīn', uniqueId:'l3e1b'}, {char:'儿子', pinyin:'ér zi', uniqueId:'l3e1c'}, {char:'女儿', pinyin:'nǚ ér', uniqueId:'l3e1d'}]},
        { id:2, type:'construct', spanish:'Madre', chinese:'母亲', pinyin:'mǔ qīn', words:[
          {char:'父亲', pinyin:'fù qīn', uniqueId:'l3e2a'}, {char:'母亲', pinyin:'mǔ qīn', uniqueId:'l3e2b'}, {char:'儿子', pinyin:'ér zi', uniqueId:'l3e2c'}, {char:'女儿', pinyin:'nǚ ér', uniqueId:'l3e2d'}]},
        { id:3, type:'construct', spanish:'Hijo', chinese:'儿子', pinyin:'ér zi', words:[
          {char:'父亲', pinyin:'fù qīn', uniqueId:'l3e3a'}, {char:'母亲', pinyin:'mǔ qīn', uniqueId:'l3e3b'}, {char:'儿子', pinyin:'ér zi', uniqueId:'l3e3c'}, {char:'女儿', pinyin:'nǚ ér', uniqueId:'l3e3d'}]},
        { id:4, type:'construct', spanish:'Hija', chinese:'女儿', pinyin:'nǚ ér', words:[
          {char:'父亲', pinyin:'fù qīn', uniqueId:'l3e4a'}, {char:'母亲', pinyin:'mǔ qīn', uniqueId:'l3e4b'}, {char:'儿子', pinyin:'ér zi', uniqueId:'l3e4c'}, {char:'女儿', pinyin:'nǚ ér', uniqueId:'l3e4d'}]},
        { id:5, type:'construct', spanish:'Hermano', chinese:'哥哥', pinyin:'gē ge', words:[
          {char:'哥哥', pinyin:'gē ge', uniqueId:'l3e5a'}, {char:'姐姐', pinyin:'jiě jie', uniqueId:'l3e5b'}, {char:'爷爷', pinyin:'yé ye', uniqueId:'l3e5c'}, {char:'奶奶', pinyin:'nǎi nai', uniqueId:'l3e5d'}]},
        { id:6, type:'construct', spanish:'Hermana', chinese:'姐姐', pinyin:'jiě jie', words:[
          {char:'哥哥', pinyin:'gē ge', uniqueId:'l3e6a'}, {char:'姐姐', pinyin:'jiě jie', uniqueId:'l3e6b'}, {char:'爷爷', pinyin:'yé ye', uniqueId:'l3e6c'}, {char:'奶奶', pinyin:'nǎi nai', uniqueId:'l3e6d'}]},
        { id:7, type:'construct', spanish:'Abuelo', chinese:'爷爷', pinyin:'yé ye', words:[
          {char:'哥哥', pinyin:'gē ge', uniqueId:'l3e7a'}, {char:'姐姐', pinyin:'jiě jie', uniqueId:'l3e7b'}, {char:'爷爷', pinyin:'yé ye', uniqueId:'l3e7c'}, {char:'奶奶', pinyin:'nǎi nai', uniqueId:'l3e7d'}]},
        { id:8, type:'construct', spanish:'Abuela', chinese:'奶奶', pinyin:'nǎi nai', words:[
          {char:'哥哥', pinyin:'gē ge', uniqueId:'l3e8a'}, {char:'姐姐', pinyin:'jiě jie', uniqueId:'l3e8b'}, {char:'爷爷', pinyin:'yé ye', uniqueId:'l3e8c'}, {char:'奶奶', pinyin:'nǎi nai', uniqueId:'l3e8d'}]},
        { id:9, type:'construct', spanish:'Padre', chinese:'父亲', pinyin:'fù qīn', words:[
          {char:'父亲', pinyin:'fù qīn', uniqueId:'l3e9a'}, {char:'母亲', pinyin:'mǔ qīn', uniqueId:'l3e9b'}, {char:'儿子', pinyin:'ér zi', uniqueId:'l3e9c'}, {char:'女儿', pinyin:'nǚ ér', uniqueId:'l3e9d'}]},
        { id:10, type:'construct', spanish:'Madre', chinese:'母亲', pinyin:'mǔ qīn', words:[
          {char:'父亲', pinyin:'fù qīn', uniqueId:'l3e10a'}, {char:'母亲', pinyin:'mǔ qīn', uniqueId:'l3e10b'}, {char:'儿子', pinyin:'ér zi', uniqueId:'l3e10c'}, {char:'女儿', pinyin:'nǚ ér', uniqueId:'l3e10d'}]},
      ],
      exam: [
        { question: '父亲', options: ['Madre', 'Padre', 'Hijo', 'Hermano'], correct: 1 },
        { question: '姐姐', options: ['Hermano', 'Hermana', 'Abuelo', 'Abuela'], correct: 1 },
        { question: '朋友', options: ['Familia', 'Amigo', 'Profesor', 'Estudiante'], correct: 1 }
      ]
    },
    // 4) Colores (8 -> 10)
    {
      id: 4,
      title: 'Colores',
      exercises: [
        { id:1, type:'construct', spanish:'Rojo', chinese:'红色', pinyin:'hóng sè', words:[
          {char:'红色', pinyin:'hóng sè', uniqueId:'l4e1a'},{char:'蓝色', pinyin:'lán sè', uniqueId:'l4e1b'},{char:'绿色', pinyin:'lǜ sè', uniqueId:'l4e1c'},{char:'黄色', pinyin:'huáng sè', uniqueId:'l4e1d'}]},
        { id:2, type:'construct', spanish:'Azul', chinese:'蓝色', pinyin:'lán sè', words:[
          {char:'红色', pinyin:'hóng sè', uniqueId:'l4e2a'},{char:'蓝色', pinyin:'lán sè', uniqueId:'l4e2b'},{char:'绿色', pinyin:'lǜ sè', uniqueId:'l4e2c'},{char:'黄色', pinyin:'huáng sè', uniqueId:'l4e2d'}]},
        { id:3, type:'construct', spanish:'Verde', chinese:'绿色', pinyin:'lǜ sè', words:[
          {char:'红色', pinyin:'hóng sè', uniqueId:'l4e3a'},{char:'蓝色', pinyin:'lán sè', uniqueId:'l4e3b'},{char:'绿色', pinyin:'lǜ sè', uniqueId:'l4e3c'},{char:'黄色', pinyin:'huáng sè', uniqueId:'l4e3d'}]},
        { id:4, type:'construct', spanish:'Amarillo', chinese:'黄色', pinyin:'huáng sè', words:[
          {char:'红色', pinyin:'hóng sè', uniqueId:'l4e4a'},{char:'蓝色', pinyin:'lán sè', uniqueId:'l4e4b'},{char:'绿色', pinyin:'lǜ sè', uniqueId:'l4e4c'},{char:'黄色', pinyin:'huáng sè', uniqueId:'l4e4d'}]},
        { id:5, type:'construct', spanish:'Negro', chinese:'黑色', pinyin:'hēi sè', words:[
          {char:'黑色', pinyin:'hēi sè', uniqueId:'l4e5a'},{char:'白色', pinyin:'bái sè', uniqueId:'l4e5b'},{char:'粉色', pinyin:'fěn sè', uniqueId:'l4e5c'},{char:'紫色', pinyin:'zǐ sè', uniqueId:'l4e5d'}]},
        { id:6, type:'construct', spanish:'Blanco', chinese:'白色', pinyin:'bái sè', words:[
          {char:'黑色', pinyin:'hēi sè', uniqueId:'l4e6a'},{char:'白色', pinyin:'bái sè', uniqueId:'l4e6b'},{char:'粉色', pinyin:'fěn sè', uniqueId:'l4e6c'},{char:'紫色', pinyin:'zǐ sè', uniqueId:'l4e6d'}]},
        { id:7, type:'construct', spanish:'Rosa', chinese:'粉色', pinyin:'fěn sè', words:[
          {char:'黑色', pinyin:'hēi sè', uniqueId:'l4e7a'},{char:'白色', pinyin:'bái sè', uniqueId:'l4e7b'},{char:'粉色', pinyin:'fěn sè', uniqueId:'l4e7c'},{char:'紫色', pinyin:'zǐ sè', uniqueId:'l4e7d'}]},
        { id:8, type:'construct', spanish:'Morado', chinese:'紫色', pinyin:'zǐ sè', words:[
          {char:'黑色', pinyin:'hēi sè', uniqueId:'l4e8a'},{char:'白色', pinyin:'bái sè', uniqueId:'l4e8b'},{char:'粉色', pinyin:'fěn sè', uniqueId:'l4e8c'},{char:'紫色', pinyin:'zǐ sè', uniqueId:'l4e8d'}]},
        { id:9, type:'construct', spanish:'Rojo', chinese:'红色', pinyin:'hóng sè', words:[
          {char:'红色', pinyin:'hóng sè', uniqueId:'l4e9a'},{char:'蓝色', pinyin:'lán sè', uniqueId:'l4e9b'},{char:'绿色', pinyin:'lǜ sè', uniqueId:'l4e9c'},{char:'黄色', pinyin:'huáng sè', uniqueId:'l4e9d'}]},
        { id:10, type:'construct', spanish:'Azul', chinese:'蓝色', pinyin:'lán sè', words:[
          {char:'红色', pinyin:'hóng sè', uniqueId:'l4e10a'},{char:'蓝色', pinyin:'lán sè', uniqueId:'l4e10b'},{char:'绿色', pinyin:'lǜ sè', uniqueId:'l4e10c'},{char:'黄色', pinyin:'huáng sè', uniqueId:'l4e10d'}]},
      ],
      exam: [
        { question: '红色', options: ['Azul', 'Rojo', 'Verde', 'Amarillo'], correct: 1 },
        { question: '白色', options: ['Negro', 'Blanco', 'Rosa', 'Morado'], correct: 1 },
        { question: '绿色', options: ['Rojo', 'Verde', 'Azul', 'Amarillo'], correct: 1 }
      ]
    },
    // 5) Días (8 -> 10)
    {
      id: 5,
      title: 'Días de la Semana',
      exercises: [
        { id:1, type:'construct', spanish:'Lunes', chinese:'星期一', pinyin:'xīng qī yī', words:[
          {char:'星期一', pinyin:'xīng qī yī', uniqueId:'l5e1a'}, {char:'星期二', pinyin:'xīng qī èr', uniqueId:'l5e1b'}, {char:'星期三', pinyin:'xīng qī sān', uniqueId:'l5e1c'}, {char:'星期四', pinyin:'xīng qī sì', uniqueId:'l5e1d'}]},
        { id:2, type:'construct', spanish:'Martes', chinese:'星期二', pinyin:'xīng qī èr', words:[
          {char:'星期一', pinyin:'xīng qī yī', uniqueId:'l5e2a'}, {char:'星期二', pinyin:'xīng qī èr', uniqueId:'l5e2b'}, {char:'星期三', pinyin:'xīng qī sān', uniqueId:'l5e2c'}, {char:'星期四', pinyin:'xīng qī sì', uniqueId:'l5e2d'}]},
        { id:3, type:'construct', spanish:'Miércoles', chinese:'星期三', pinyin:'xīng qī sān', words:[
          {char:'星期一', pinyin:'xīng qī yī', uniqueId:'l5e3a'}, {char:'星期二', pinyin:'xīng qī èr', uniqueId:'l5e3b'}, {char:'星期三', pinyin:'xīng qī sān', uniqueId:'l5e3c'}, {char:'星期四', pinyin:'xīng qī sì', uniqueId:'l5e3d'}]},
        { id:4, type:'construct', spanish:'Jueves', chinese:'星期四', pinyin:'xīng qī sì', words:[
          {char:'星期一', pinyin:'xīng qī yī', uniqueId:'l5e4a'}, {char:'星期二', pinyin:'xīng qī èr', uniqueId:'l5e4b'}, {char:'星期三', pinyin:'xīng qī sān', uniqueId:'l5e4c'}, {char:'星期四', pinyin:'xīng qī sì', uniqueId:'l5e4d'}]},
        { id:5, type:'construct', spanish:'Viernes', chinese:'星期五', pinyin:'xīng qī wǔ', words:[
          {char:'星期五', pinyin:'xīng qī wǔ', uniqueId:'l5e5a'}, {char:'星期六', pinyin:'xīng qī liù', uniqueId:'l5e5b'}, {char:'星期天', pinyin:'xīng qī tiān', uniqueId:'l5e5c'}, {char:'今天', pinyin:'jīn tiān', uniqueId:'l5e5d'}]},
        { id:6, type:'construct', spanish:'Sábado', chinese:'星期六', pinyin:'xīng qī liù', words:[
          {char:'星期五', pinyin:'xīng qī wǔ', uniqueId:'l5e6a'}, {char:'星期六', pinyin:'xīng qī liù', uniqueId:'l5e6b'}, {char:'星期天', pinyin:'xīng qī tiān', uniqueId:'l5e6c'}, {char:'今天', pinyin:'jīn tiān', uniqueId:'l5e6d'}]},
        { id:7, type:'construct', spanish:'Domingo', chinese:'星期天', pinyin:'xīng qī tiān', words:[
          {char:'星期五', pinyin:'xīng qī wǔ', uniqueId:'l5e7a'}, {char:'星期六', pinyin:'xīng qī liù', uniqueId:'l5e7b'}, {char:'星期天', pinyin:'xīng qī tiān', uniqueId:'l5e7c'}, {char:'今天', pinyin:'jīn tiān', uniqueId:'l5e7d'}]},
        { id:8, type:'construct', spanish:'Hoy', chinese:'今天', pinyin:'jīn tiān', words:[
          {char:'今天', pinyin:'jīn tiān', uniqueId:'l5e8a'}, {char:'昨天', pinyin:'zuó tiān', uniqueId:'l5e8b'}, {char:'明天', pinyin:'míng tiān', uniqueId:'l5e8c'}, {char:'星期天', pinyin:'xīng qī tiān', uniqueId:'l5e8d'}]},
        { id:9, type:'construct', spanish:'Lunes', chinese:'星期一', pinyin:'xīng qī yī', words:[
          {char:'星期一', pinyin:'xīng qī yī', uniqueId:'l5e9a'}, {char:'星期二', pinyin:'xīng qī èr', uniqueId:'l5e9b'}, {char:'星期三', pinyin:'xīng qī sān', uniqueId:'l5e9c'}, {char:'星期四', pinyin:'xīng qī sì', uniqueId:'l5e9d'}]},
        { id:10, type:'construct', spanish:'Martes', chinese:'星期二', pinyin:'xīng qī èr', words:[
          {char:'星期一', pinyin:'xīng qī yī', uniqueId:'l5e10a'}, {char:'星期二', pinyin:'xīng qī èr', uniqueId:'l5e10b'}, {char:'星期三', pinyin:'xīng qī sān', uniqueId:'l5e10c'}, {char:'星期四', pinyin:'xīng qī sì', uniqueId:'l5e10d'}]},
      ],
      exam: [
        { question: '星期一', options: ['Martes', 'Lunes', 'Miércoles', 'Jueves'], correct: 1 },
        { question: '今天', options: ['Ayer', 'Hoy', 'Mañana', 'Domingo'], correct: 1 },
        { question: '星期六', options: ['Viernes', 'Sábado', 'Domingo', 'Lunes'], correct: 1 }
      ]
    },
    // 6) Comida (8 -> 10)
    {
      id: 6,
      title: 'Comida',
      exercises: [
        { id:1, type:'construct', spanish:'Comer', chinese:'吃', pinyin:'chī', words:[
          {char:'吃', pinyin:'chī', uniqueId:'l6e1a'}, {char:'喝', pinyin:'hē', uniqueId:'l6e1b'}, {char:'水', pinyin:'shuǐ', uniqueId:'l6e1c'}, {char:'茶', pinyin:'chá', uniqueId:'l6e1d'}]},
        { id:2, type:'construct', spanish:'Beber', chinese:'喝', pinyin:'hē', words:[
          {char:'吃', pinyin:'chī', uniqueId:'l6e2a'}, {char:'喝', pinyin:'hē', uniqueId:'l6e2b'}, {char:'水', pinyin:'shuǐ', uniqueId:'l6e2c'}, {char:'茶', pinyin:'chá', uniqueId:'l6e2d'}]},
        { id:3, type:'construct', spanish:'Agua', chinese:'水', pinyin:'shuǐ', words:[
          {char:'吃', pinyin:'chī', uniqueId:'l6e3a'}, {char:'喝', pinyin:'hē', uniqueId:'l6e3b'}, {char:'水', pinyin:'shuǐ', uniqueId:'l6e3c'}, {char:'茶', pinyin:'chá', uniqueId:'l6e3d'}]},
        { id:4, type:'construct', spanish:'Té', chinese:'茶', pinyin:'chá', words:[
          {char:'吃', pinyin:'chī', uniqueId:'l6e4a'}, {char:'喝', pinyin:'hē', uniqueId:'l6e4b'}, {char:'水', pinyin:'shuǐ', uniqueId:'l6e4c'}, {char:'茶', pinyin:'chá', uniqueId:'l6e4d'}]},
        { id:5, type:'construct', spanish:'Arroz', chinese:'米饭', pinyin:'mǐ fàn', words:[
          {char:'米饭', pinyin:'mǐ fàn', uniqueId:'l6e5a'}, {char:'面条', pinyin:'miàn tiáo', uniqueId:'l6e5b'}, {char:'鸡肉', pinyin:'jī ròu', uniqueId:'l6e5c'}, {char:'牛肉', pinyin:'niú ròu', uniqueId:'l6e5d'}]},
        { id:6, type:'construct', spanish:'Fideos', chinese:'面条', pinyin:'miàn tiáo', words:[
          {char:'米饭', pinyin:'mǐ fàn', uniqueId:'l6e6a'}, {char:'面条', pinyin:'miàn tiáo', uniqueId:'l6e6b'}, {char:'鸡肉', pinyin:'jī ròu', uniqueId:'l6e6c'}, {char:'牛肉', pinyin:'niú ròu', uniqueId:'l6e6d'}]},
        { id:7, type:'construct', spanish:'Pollo', chinese:'鸡肉', pinyin:'jī ròu', words:[
          {char:'米饭', pinyin:'mǐ fàn', uniqueId:'l6e7a'}, {char:'面条', pinyin:'miàn tiáo', uniqueId:'l6e7b'}, {char:'鸡肉', pinyin:'jī ròu', uniqueId:'l6e7c'}, {char:'牛肉', pinyin:'niú ròu', uniqueId:'l6e7d'}]},
        { id:8, type:'construct', spanish:'Carne de res', chinese:'牛肉', pinyin:'niú ròu', words:[
          {char:'米饭', pinyin:'mǐ fàn', uniqueId:'l6e8a'}, {char:'面条', pinyin:'miàn tiáo', uniqueId:'l6e8b'}, {char:'鸡肉', pinyin:'jī ròu', uniqueId:'l6e8c'}, {char:'牛肉', pinyin:'niú ròu', uniqueId:'l6e8d'}]},
        { id:9, type:'construct', spanish:'Comer', chinese:'吃', pinyin:'chī', words:[
          {char:'吃', pinyin:'chī', uniqueId:'l6e9a'}, {char:'喝', pinyin:'hē', uniqueId:'l6e9b'}, {char:'水', pinyin:'shuǐ', uniqueId:'l6e9c'}, {char:'茶', pinyin:'chá', uniqueId:'l6e9d'}]},
        { id:10, type:'construct', spanish:'Beber', chinese:'喝', pinyin:'hē', words:[
          {char:'吃', pinyin:'chī', uniqueId:'l6e10a'}, {char:'喝', pinyin:'hē', uniqueId:'l6e10b'}, {char:'水', pinyin:'shuǐ', uniqueId:'l6e10c'}, {char:'茶', pinyin:'chá', uniqueId:'l6e10d'}]},
      ],
      exam: [
        { question: '吃', options: ['Beber', 'Comer', 'Dormir', 'Caminar'], correct: 1 },
        { question: '水', options: ['Té', 'Agua', 'Leche', 'Jugo'], correct: 1 },
        { question: '米饭', options: ['Fideos', 'Arroz', 'Pollo', 'Carne'], correct: 1 }
      ]
    },
  ]
};

// ===== helpers to create simple "construct" exercises =====
const ex = (id, spanish, chinese, pinyin, opts) => ({
  id, type: 'construct', spanish, chinese, pinyin, words: opts.map(([char, py, uid]) => ({char, pinyin: py, uniqueId: uid}))
});
const opt = (char, pinyin, uid) => [char, pinyin, uid];

// Create extra levels 7-20 based on requested themes (10 exercises each, some repeats allowed)
function extraLevels() {
  const lvls = [];

  const themes = [
    { id: 7,  title: 'Mascotas' },
    { id: 8,  title: 'Trabajo' },
    { id: 9,  title: 'Dinero y Comercio' },
    { id:10,  title: 'Preguntas Simples' },
    { id:11,  title: 'Respuestas Simples' },
    { id:12,  title: 'La Hora' },
    { id:13,  title: 'Acciones en Presente' },
    { id:14,  title: 'Acciones en Pasado' },
    { id:15,  title: 'Acciones en Futuro' },
    { id:16,  title: 'Países / Idioma del país' },
    { id:17,  title: 'Mascotas (Avanzado)' },
    { id:18,  title: 'Trabajo (Avanzado)' },
    { id:19,  title: 'Dinero y Comercio (Avanzado)' },
    { id:20,  title: 'Revisión General (Avanzado)' },
  ];

  // Some reusable option pools
  const OPS = {
    pets: [
      opt('狗','gǒu','pet1'), opt('猫','māo','pet2'), opt('水','shuǐ','pet3'), opt('家','jiā','pet4'),
      opt('朋友','péng yǒu','pet5'), opt('吃','chī','pet6'), opt('喝','hē','pet7'), opt('爱','ài','pet8')
    ],
    work: [
      opt('工作','gōng zuò','wk1'), opt('老师','lǎo shī','wk2'), opt('医生','yī shēng','wk3'), opt('学生','xué shēng','wk4'),
      opt('学校','xué xiào','wk5'), opt('钱','qián','wk6'), opt('买','mǎi','wk7'), opt('卖','mài','wk8')
    ],
    money: [
      opt('钱','qián','$1'), opt('买','mǎi','$2'), opt('卖','mài','$3'), opt('给','gěi','$4'),
      opt('收','shōu','$5'), opt('发送','fā sòng','$6'), opt('到达','dào dá','$7'), opt('开','kāi','$8')
    ],
    qsimple: [
      opt('吗','ma','q1'), opt('问','wèn','q2'), opt('你','nǐ','q3'), opt('好','hǎo','q4'),
      opt('我','wǒ','q5'), opt('是','shì','q6'), opt('吗','ma','q7'), opt('不','bù','q8')
    ],
    simpleAnswers: [
      opt('好','hǎo','a1'), opt('不好','bù hǎo','a2'), opt('我','wǒ','a3'), opt('很','hěn','a4'),
      opt('不','bù','a5'), opt('谢谢','xiè xiè','a6'), opt('对不起','duì bù qǐ','a7'), opt('没关系','méi guān xi','a8')
    ],
    time: [
      opt('小时','xiǎo shí','t1'), opt('分钟','fēn zhōng','t2'), opt('秒','miǎo','t3'), opt('今天','jīn tiān','t4'),
      opt('昨天','zuó tiān','t5'), opt('明天','míng tiān','t6'), opt('早','zǎo','t7'), opt('晚','wǎn','t8')
    ],
    present: [
      opt('吃','chī','pr1'), opt('喝','hē','pr2'), opt('看','kàn','pr3'), opt('说话','shuō huà','pr4'),
      opt('读书','dú shū','pr5'), opt('写字','xiě zì','pr6'), opt('买','mǎi','pr7'), opt('卖','mài','pr8')
    ],
    past: [
      opt('昨天','zuó tiān','pa1'), opt('吃','chī','pa2'), opt('喝','hē','pa3'), opt('看','kàn','pa4'),
      opt('买','mǎi','pa5'), opt('卖','mài','pa6'), opt('到达','dào dá','pa7'), opt('出去','chū qù','pa8')
    ],
    future: [
      opt('明天','míng tiān','fu1'), opt('吃','chī','fu2'), opt('喝','hē','fu3'), opt('看','kàn','fu4'),
      opt('买','mǎi','fu5'), opt('卖','mài','fu6'), opt('进来','jìn lái','fu7'), opt('开','kāi','fu8')
    ],
    countryLang: [
      opt('中文','Zhōngwén','cl1'), opt('学校','xué xiào','cl2'), opt('医生','yī shēng','cl3'), opt('老师','lǎo shī','cl4'),
      opt('学生','xué shēng','cl5'), opt('朋友','péng yǒu','cl6'), opt('工作','gōng zuò','cl7'), opt('钱','qián','cl8')
    ],
    review: [
      opt('你好','nǐ hǎo','r1'), opt('谢谢','xiè xiè','r2'), opt('再见','zài jiàn','r3'), opt('吃','chī','r4'),
      opt('喝','hē','r5'), opt('水','shuǐ','r6'), opt('狗','gǒu','r7'), opt('猫','māo','r8')
    ]
  };

  function makeLevel(id, title, pool, pairs) {
    // pairs: array of [spanish, chinese, pinyin, correctChar]
    // We will build 10 exercises; if less, repeat from start.
    const exs = [];
    const take = (arr, n) => Array.from({length:n}, (_,i)=>arr[i % arr.length]);
    const planned = take(pairs, 10);
    planned.forEach((p, idx) => {
      const [es, zh, py] = p;
      // create 4 options ensuring zh included
      const shuffledPool = [...pool];
      // simple deterministic selection for build
      const distractors = shuffledPool.filter(o => o[0] !== zh).slice(0,3);
      const opts = [opt(zh, py, `${id}-${idx}-c`), ...distractors];
      // shuffle options lightly
      for (let i = opts.length - 1; i > 0; i--) {
        const j = (idx + i) % (i+1);
        [opts[i], opts[j]] = [opts[j], opts[i]];
      }
      exs.push(ex(idx+1, es, zh, py, opts));
    });

    // Exam: pick first 3 pairs
    const exam = take(pairs, 3).map(p => ({
      question: p[1],
      options: pairs.slice(0,4).map(x => x[0]).slice(0,4), // simple Spanish options set
      correct: pairs.slice(0,4).map(x=>x[0]).indexOf(p[0]) >= 0 ? pairs.slice(0,4).map(x=>x[0]).indexOf(p[0]) : 0
    }));

    return { id, title, exercises: exs, exam };
  }

  // define pairs for each theme (spanish, chinese, pinyin)
  const THEMES = {
    pets: [
      ['Perro','狗','gǒu'], ['Gato','猫','māo'], ['Amigo','朋友','péng yǒu'], ['Casa','家','jiā'],
      ['Comer','吃','chī'], ['Beber','喝','hē'], ['Amor','爱','ài'], ['Agua','水','shuǐ']
    ],
    work: [
      ['Trabajo','工作','gōng zuò'], ['Profesor','老师','lǎo shī'], ['Médico','医生','yī shēng'], ['Estudiante','学生','xué shēng'],
      ['Escuela','学校','xué xiào'], ['Dinero','钱','qián'], ['Comprar','买','mǎi'], ['Vender','卖','mài']
    ],
    money: [
      ['Dinero','钱','qián'], ['Comprar','买','mǎi'], ['Vender','卖','mài'], ['Dar','给','gěi'],
      ['Recibir','收','shōu'], ['Enviar','发送','fā sòng'], ['Abrir','开','kāi'], ['Llegar','到达','dào dá']
    ],
    qsimple: [
      ['¿...吗?','吗','ma'], ['Preguntar','问','wèn'], ['Tú','你','nǐ'], ['Bueno','好','hǎo'],
      ['Yo','我','wǒ'], ['Ser','是','shì'], ['No','不','bù'], ['Hola','你好','nǐ hǎo']
    ],
    sanswers: [
      ['Bien','好','hǎo'], ['No bien','不好','bù hǎo'], ['Yo','我','wǒ'], ['Muy','很','hěn'],
      ['No','不','bù'], ['Gracias','谢谢','xiè xiè'], ['Lo siento','对不起','duì bù qǐ'], ['No hay problema','没关系','méi guān xi']
    ],
    time: [
      ['Hora','小时','xiǎo shí'], ['Minuto','分钟','fēn zhōng'], ['Segundo','秒','miǎo'], ['Hoy','今天','jīn tiān'],
      ['Ayer','昨天','zuó tiān'], ['Mañana','明天','míng tiān'], ['Temprano','早','zǎo'], ['Tarde','晚','wǎn']
    ],
    present: [
      ['Comer','吃','chī'], ['Beber','喝','hē'], ['Ver','看','kàn'], ['Hablar','说话','shuō huà'],
      ['Leer','读书','dú shū'], ['Escribir','写字','xiě zì'], ['Comprar','买','mǎi'], ['Vender','卖','mài']
    ],
    past: [
      ['Ayer','昨天','zuó tiān'], ['Comer','吃','chī'], ['Beber','喝','hē'], ['Ver','看','kàn'],
      ['Comprar','买','mǎi'], ['Vender','卖','mài'], ['Llegar','到达','dào dá'], ['Salir','出去','chū qù']
    ],
    future: [
      ['Mañana','明天','míng tiān'], ['Comer','吃','chī'], ['Beber','喝','hē'], ['Ver','看','kàn'],
      ['Comprar','买','mǎi'], ['Vender','卖','mài'], ['Entrar','进来','jìn lái'], ['Abrir','开','kāi']
    ],
    countryLang: [
      ['Chino (idioma)','中文','Zhōngwén'], ['Escuela','学校','xué xiào'], ['Médico','医生','yī shēng'], ['Profesor','老师','lǎo shī'],
      ['Estudiante','学生','xué shēng'], ['Amigo','朋友','péng yǒu'], ['Trabajo','工作','gōng zuò'], ['Dinero','钱','qián']
    ],
    review: [
      ['Hola','你好','nǐ hǎo'], ['Gracias','谢谢','xiè xiè'], ['Adiós','再见','zài jiàn'], ['Comer','吃','chī'],
      ['Beber','喝','hē'], ['Agua','水','shuǐ'], ['Perro','狗','gǒu'], ['Gato','猫','māo']
    ]
  };

  // Map each theme to its pool and pair set
  const mapping = {
    7:  ['Mascotas', OPS.pets, THEMES.pets],
    8:  ['Trabajo', OPS.work, THEMES.work],
    9:  ['Dinero y Comercio', OPS.money, THEMES.money],
    10: ['Preguntas Simples', OPS.qsimple, THEMES.qsimple],
    11: ['Respuestas Simples', OPS.simpleAnswers, THEMES.sanswers],
    12: ['La Hora', OPS.time, THEMES.time],
    13: ['Acciones en Presente', OPS.present, THEMES.present],
    14: ['Acciones en Pasado', OPS.past, THEMES.past],
    15: ['Acciones en Futuro', OPS.future, THEMES.future],
    16: ['Países / Idioma del país', OPS.countryLang, THEMES.countryLang],
    17: ['Mascotas (Avanzado)', OPS.pets, THEMES.pets],
    18: ['Trabajo (Avanzado)', OPS.work, THEMES.work],
    19: ['Dinero y Comercio (Avanzado)', OPS.money, THEMES.money],
    20: ['Revisión General (Avanzado)', OPS.review, THEMES.review],
  };

  themes.forEach(t => {
    const [title, pool, pairs] = mapping[t.id];
    lvls.push(makeLevel(t.id, title, pool, pairs));
  });

  return lvls;
}

// Ensure each level has exactly 10 exercises by repeating from the start if needed
function normalizeToTen(level) {
  const exs = level.exercises || [];
  if (exs.length === 10) return level;
  const out = [...exs];
  let i = 0;
  while (out.length < 10 && exs.length > 0) {
    const clone = { ...exs[i % exs.length], id: out.length + 1 };
    // ensure uniqueId uniqueness by suffix
    clone.words = clone.words.map(w => ({...w, uniqueId: `${w.uniqueId}_r${out.length}`}));
    out.push(clone);
    i++;
  }
  return { ...level, exercises: out.slice(0,10) };
}

const chineseData = (() => {
  const withExtras = {
    dictionary: baseData.dictionary,
    levels: [...baseData.levels, ...extraLevels()],
  };
  withExtras.levels = withExtras.levels.map(normalizeToTen);
  return withExtras;
})();

// ==================== App ======================

const ChineseLearningApp = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [lives, setLives] = useState(5);
  const [showDictionary, setShowDictionary] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWords, setSelectedWords] = useState([]);
  const [showExam, setShowExam] = useState(false);
  const [examQuestion, setExamQuestion] = useState(0);
  const [levelProgress, setLevelProgress] = useState({});
  const [attemptsLeft, setAttemptsLeft] = useState(4);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameOverType, setGameOverType] = useState(null);
  const [randomizedExercises, setRandomizedExercises] = useState({});
  const [dataIssues, setDataIssues] = useState([]);
  const [showCongrats, setShowCongrats] = useState(false);

  const level = useMemo(() => chineseData.levels.find(l => l.id === currentLevel), [currentLevel]);

  // shuffle
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Animación corazón
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `@keyframes heartbeat{0%{transform:scale(1)}14%{transform:scale(1.15)}28%{transform:scale(1)}42%{transform:scale(1.15)}70%{transform:scale(1)}}`;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Inicializar progreso
  useEffect(() => {
    const init = {};
    chineseData.levels.forEach(l => init[l.id] = 0);
    setLevelProgress(init);
  }, []);

  // preparar ejercicios aleatorios por nivel
  const getRandomizedExercises = (levelId) => {
    if (!randomizedExercises[levelId]) {
      const levelData = chineseData.levels.find((l) => l.id === levelId);
      if (levelData && Array.isArray(levelData.exercises)) {
        const shuffled = shuffleArray(levelData.exercises);
        setRandomizedExercises((prev) => ({ ...prev, [levelId]: shuffled }));
        return shuffled;
      }
      return [];
    }
    return randomizedExercises[levelId] || [];
  };
  const currentLevelExercises = getRandomizedExercises(currentLevel);
  const totalExercises = currentLevelExercises.length || (level?.exercises?.length ?? 0);
  const exercise = (currentLevelExercises && currentLevelExercises.length > currentExercise)
    ? currentLevelExercises[currentExercise] : null;

  // VALIDACIÓN
  useEffect(() => {
    const issues = [];
    const canCompose = (target, words) => {
      const used = Array(words.length).fill(false);
      const memo = new Map();
      const dfs = (remaining) => {
        if (remaining === '') return true;
        if (memo.has(remaining)) return memo.get(remaining);
        for (let i = 0; i < words.length; i++) {
          if (used[i]) continue;
          const w = words[i].char;
          if (remaining.startsWith(w)) {
            used[i] = true;
            if (dfs(remaining.slice(w.length))) { memo.set(remaining,true); used[i]=false; return true; }
            used[i] = false;
          }
        }
        memo.set(remaining,false);
        return false;
      };
      return dfs(target);
    };
    chineseData.levels.forEach((lvl) => {
      if (!Array.isArray(lvl.exercises) || lvl.exercises.length === 0) {
        issues.push(`Nivel ${lvl.id} sin ejercicios.`);
        return;
      }
      // must be 10
      if (lvl.exercises.length !== 10) issues.push(`Nivel ${lvl.id} no tiene 10 ejercicios (tiene ${lvl.exercises.length}).`);
      const ids = new Set();
      lvl.exercises.forEach((ex) => {
        if (!ex.words || ex.words.length < 1) {
          issues.push(`Nivel ${lvl.id} • Ejercicio ${ex.id} sin opciones.`);
        }
        ex.words.forEach((w) => {
          if (ids.has(w.uniqueId)) issues.push(`Nivel ${lvl.id} • uniqueId duplicado: ${w.uniqueId}`);
          ids.add(w.uniqueId);
        });
        if (!canCompose(ex.chinese, ex.words)) {
          issues.push(`Nivel ${lvl.id} • Ejercicio ${ex.id} no puede construir "${ex.chinese}".`);
        }
      });
      if (!Array.isArray(lvl.exam) || lvl.exam.length === 0) {
        issues.push(`Nivel ${lvl.id} sin examen.`);
      } else {
        lvl.exam.forEach((q, qi) => {
          if (!(q.correct >= 0 && q.correct < q.options.length)) {
            issues.push(`Nivel ${lvl.id} • Pregunta examen ${qi+1} índice 'correct' inválido.`);
          }
        });
      }
    });
    setDataIssues(issues);
  }, []);

  const handleWordClick = (wordObj) => {
    if (selectedWords.some(w => w.uniqueId === wordObj.uniqueId)) {
      setSelectedWords(selectedWords.filter(w => w.uniqueId !== wordObj.uniqueId));
    } else {
      setSelectedWords([...selectedWords, wordObj]);
    }
  };

  const checkAnswer = () => {
    if (!exercise) return;
    const userAnswer = selectedWords.map(w => w.char).join('');
    const correctAnswer = exercise.chinese;
    const correct = userAnswer === correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    if (!correct) {
      const newLives = Math.max(0, lives - 1);
      setLives(newLives);
      if (newLives === 0) {
        setTimeout(() => { setShowResult(false); setGameOverType('noLives'); }, 800);
        return;
      }
    }
    setTimeout(() => {
      setShowResult(false);
      if (correct) {
        if (currentExercise >= totalExercises - 1) {
          setShowExam(true);
          setLevelProgress({ ...levelProgress, [currentLevel]: totalExercises });
        } else {
          const next = currentExercise + 1;
          setCurrentExercise(next);
          setLevelProgress({ ...levelProgress, [currentLevel]: next });
        }
      }
      setSelectedWords([]);
    }, 500);
  };

  const [pendingNextLevel, setPendingNextLevel] = useState(null);

  const handleExamAnswer = (selectedOption) => {
    const examData = level.exam[examQuestion];
    const correct = selectedOption === examData.correct;
    if (correct) {
      if (examQuestion < level.exam.length - 1) {
        setExamQuestion(examQuestion + 1);
      } else {
        // exam finished OK -> show Congrats
        setShowExam(false);
        setExamQuestion(0);
        setAttemptsLeft(4);
        const nextLevel = currentLevel + 1;
        setPendingNextLevel(chineseData.levels.find(l => l.id === nextLevel) ? nextLevel : currentLevel);
        setLives(lives + 3);
        setShowCongrats(true);
      }
    } else {
      const newAttempts = attemptsLeft - 1;
      setAttemptsLeft(newAttempts);
      if (newAttempts <= 0) {
        setGameOverType('failedExam');
        setShowExam(false);
        setExamQuestion(0);
        setAttemptsLeft(4);
      }
    }
  };

  const restartLevel = () => {
    setCurrentExercise(0);
    setLives(5);
    setGameOverType(null);
    setSelectedWords([]);
    setShowResult(false);
    setShowExam(false);
    setExamQuestion(0);
    setAttemptsLeft(4);
    const lvl = chineseData.levels.find(l => l.id === currentLevel);
    if (lvl?.exercises) {
      const shuffled = shuffleArray(lvl.exercises);
      setRandomizedExercises(prev => ({...prev, [currentLevel]: shuffled}));
    }
    setLevelProgress({ ...levelProgress, [currentLevel]: 0 });
  };

  const goToLevel = (levelNum) => {
    const lvl = chineseData.levels.find(l => l.id === levelNum);
    if (lvl) {
      setCurrentLevel(levelNum);
      setCurrentExercise(0);
      setSelectedWords([]);
      setShowResult(false);
      setShowExam(false);
      setExamQuestion(0);
      setShowCongrats(false);
      if (!randomizedExercises[levelNum] && lvl.exercises) {
        const shuffled = shuffleArray(lvl.exercises);
        setRandomizedExercises(prev => ({...prev, [levelNum]: shuffled}));
      }
    }
  };

  const filteredDictionary = Object.entries(chineseData.dictionary).filter(([spanish]) =>
    spanish.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Bienvenida
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
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Saludos y expresiones básicas</li>
                <li>• Números y tiempo</li>
                <li>• Familia, colores y comida</li>
                <li>• Trabajo, dinero y acciones</li>
                <li>• Preguntas y respuestas simples</li>
              </ul>
            </div>
          </div>
          <button onClick={() => setShowWelcome(false)} className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-2xl font-bold text-xl transition-all transform hover:scale-105 shadow-lg mb-8">Aprender Ahora</button>
          <div className="text-xs text-gray-500 mt-8 pt-6 border-t border-gray-200">
            <p>Esta app fue creada por <span className="font-semibold text-gray-600">Claude.ai</span> con las instrucciones e ideas de <span className="font-semibold text-gray-600"> Diego Bastías A.</span></p>
            <p className="mt-1">Todos los derechos reservados. Agosto 2025</p>
          </div>
        </div>
      </div>
    );
  }

  // Game Over
  if (gameOverType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md w-full border-4 border-red-400">
          <div className="text-6xl mb-6">😔</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">{gameOverType === 'noLives' ? '¡Has perdido todas tus vidas!' : '¡Lo siento!'}</h2>
          <p className="text-gray-600 mb-6">{gameOverType === 'noLives' ? 'Inténtalo de nuevo. Recuerda bien los caracteres y su significado.' : 'Practica más, recuerda los caracteres y su significado y vuelve a intentarlo.'}</p>
          <button onClick={restartLevel} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-colors w-full">Reintentar</button>
        </div>
      </div>
    );
  }

  // Examen
  if (showExam && level) {
    const examData = level.exam[examQuestion];
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Trophy className="text-red-600 w-8 h-8" />
              <h2 className="text-2xl font-bold text-red-800">Examen - Nivel {currentLevel}</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, index) => (
                  <Heart key={index} className={`w-5 h-5 transition-all duration-300 ${index < lives ? 'text-red-500 fill-red-500 animate-pulse' : 'text-gray-300 fill-gray-300'}`} style={{ animation: index < lives ? 'heartbeat 1.5s ease-in-out infinite' : 'none' }} />
                ))}
              </div>
              <div className="text-red-700">Intentos: {attemptsLeft}</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{examData.question}</div>
              <p className="text-gray-600">¿Qué significa este texto en chino?</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {examData.options.map((option, index) => (
                <button key={index} onClick={() => handleExamAnswer(index)} className="bg-red-100 hover:bg-red-200 text-red-800 p-4 rounded-xl font-semibold transition-colors border-2 border-transparent hover:border-red-300">
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla de Felicitaciones tras el examen
  if (showCongrats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full text-center border-4 border-green-300">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <PartyPopper className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-green-700 mb-2">¡Felicitaciones!</h2>
          <p className="text-gray-700 mb-6">Aprobaste el examen del nivel {currentLevel}. Ganaste <span className="font-semibold text-green-600">+3 vidas</span>.</p>
          <div className="flex gap-3">
            <button onClick={() => { setShowCongrats(false); restartLevel(); }} className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold">Repasar este nivel</button>
            <button onClick={() => { const nl = pendingNextLevel ?? (currentLevel+1); setShowCongrats(false); goToLevel(nl); }} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold">Ir al siguiente</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Diccionario */}
      {showDictionary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-red-800 flex items-center gap-2">
                <Book className="w-6 h-6" />
                Diccionario Chino
              </h3>
              <button onClick={() => setShowDictionary(false)} className="text-gray-500 hover:text-gray-700 p-2">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="text" placeholder="Buscar en español..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              <div className="max-h-96 overflow-y-auto">
                {filteredDictionary.length > 0 ? (
                  <div className="space-y-3">
                    {filteredDictionary.map(([spanish, data]) => (
                      <div key={spanish} className="bg-red-50 p-4 rounded-xl border border-red-100">
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
                ) : (
                  <div className="text-center text-gray-500 py-8">No se encontraron resultados</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="text-red-800 font-bold text-2xl">中文学习</div>
            <div className="flex items-center gap-2">
              <Star className="text-yellow-500 w-5 h-5" />
              <span className="text-red-800 font-semibold">Nivel {currentLevel}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowDictionary(true)} className="flex items-center gap-2 bg-brown-600 hover:bg-brown-700 text-white px-4 py-2 rounded-xl transition-colors" style={{ backgroundColor: '#8B4513' }} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#A0522D')} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#8B4513')}>
              <Book className="w-4 h-4" />
              Diccionario
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, index) => (
                <Heart key={index} className={`w-6 h-6 transition-all duration-300 ${index < lives ? 'text-red-500 fill-red-500 animate-pulse' : 'text-gray-300 fill-gray-300'}`} style={{ animation: index < lives ? 'heartbeat 1.5s ease-in-out infinite' : 'none' }} />
              ))}
            </div>
          </div>
        </div>

        {/* Panel Validación */}
        {dataIssues.length > 0 && (
          <div className="mb-6 bg-yellow-50 border border-yellow-300 rounded-xl p-4 text-yellow-900">
            <div className="flex items-center gap-2 font-semibold mb-2"><AlertTriangle className="w-5 h-5" /> Validación de datos: se detectaron detalles a revisar</div>
            <ul className="list-disc pl-6 text-sm space-y-1">
              {dataIssues.map((i, idx) => (<li key={idx}>{i}</li>))}
            </ul>
          </div>
        )}

        {/* Progress */}
        <div className="mb-8">
          <div className="bg-red-200 rounded-full h-3 overflow-hidden">
            <div className="bg-red-600 h-full transition-all duration-500" style={{ width: totalExercises > 0 ? `${((Math.min(currentExercise, totalExercises - 1) + 1) / totalExercises) * 100}%` : '0%' }} />
          </div>
          <div className="text-sm text-red-700 mt-2">Ejercicio {Math.min(currentExercise + 1, totalExercises)} de {totalExercises}</div>
        </div>

        {/* Exercise */}
        {exercise && exercise.words && exercise.words.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-red-800 mb-4">{level?.title || 'Nivel'}</h2>
              <p className="text-gray-600 mb-6">Construye la frase en chino:</p>
              <div className="text-2xl font-semibold text-red-700 mb-2">"{exercise.spanish}"</div>
              <div className="text-lg text-red-500 mb-8">{exercise.pinyin}</div>
            </div>
            <div className="bg-red-50 border-2 border-dashed border-red-300 rounded-xl p-6 mb-8 min-h-24 flex flex-wrap gap-3 items-center justify-center">
              {selectedWords.length > 0 ? (
                selectedWords.map((wordObj) => (
                  <div key={wordObj.uniqueId} className="bg-red-600 text-white px-4 py-3 rounded-lg font-semibold text-center cursor-pointer hover:bg-red-700 transition-colors flex flex-col items-center" onClick={() => handleWordClick(wordObj)}>
                    <div className="text-xl">{wordObj.char}</div>
                    <div className="text-xs opacity-90">{wordObj.pinyin}</div>
                  </div>
                ))
              ) : (
                <p className="text-red-400 text-lg">Toca las palabras para construir la frase</p>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {exercise.words.map((wordObj, index) => (
                <button key={wordObj.uniqueId || `word-${index}`} onClick={() => handleWordClick(wordObj)} className={`p-4 rounded-xl font-semibold transition-colors border-2 text-center ${selectedWords.some((w) => w.uniqueId === wordObj.uniqueId) ? 'bg-red-200 text-red-800 border-red-400' : 'bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200'}`}>
                  <div className="text-xl mb-1">{wordObj.char}</div>
                  <div className="text-sm opacity-75">{wordObj.pinyin}</div>
                </button>
              ))}
            </div>
            <div className="text-center">
              <button onClick={checkAnswer} disabled={selectedWords.length === 0} className={`px-8 py-3 rounded-xl text-white font-semibold text-lg transition-colors ${selectedWords.length > 0 ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'}`}>
                Comprobar
              </button>
            </div>
          </div>
        ) : currentLevelExercises.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto text-center">
            <div className="text-gray-600 mb-4">Inicializando nivel...</div>
            <button onClick={() => goToLevel(currentLevel)} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl">Recargar Nivel</button>
          </div>
        ) : currentExercise >= totalExercises ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto text-center">
            <div className="text-green-600 text-xl font-semibold mb-4">¡Nivel Completado!</div>
            <div className="text-gray-600 mb-6">Has terminado todos los ejercicios. ¡Ahora el examen!</div>
            <button onClick={() => setShowExam(true)} className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold">Comenzar Examen</button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto text-center">
            <div className="text-red-600 mb-4">Error: Ejercicio no disponible</div>
            <div className="text-gray-600 mb-4">Ejercicio {currentExercise + 1} • Nivel {currentLevel}</div>
            <div className="flex gap-4 justify-center">
              <button onClick={() => setCurrentExercise(0)} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl">Reiniciar Nivel</button>
              <button onClick={() => goToLevel(currentLevel)} className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-xl">Recargar Ejercicios</button>
            </div>
          </div>
        )}

        {/* Resultado */}
        {showResult && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
            <div className={`bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md w-full ${isCorrect ? 'border-4 border-green-400' : 'border-4 border-red-400'}`}>
              <div className="text-6xl mb-4">{isCorrect ? '🎉' : '😔'}</div>
              <h3 className={`text-2xl font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>{isCorrect ? '¡Correcto!' : '¡Incorrecto!'}</h3>
              {!isCorrect && exercise && (<p className="text-gray-600 mb-4">La respuesta correcta era: <span className="font-semibold text-red-600">{exercise.chinese}</span></p>)}
            </div>
          </div>
        )}

        {/* Selector de niveles */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-red-800 mb-6 text-center">Niveles</h3>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-4 max-w-4xl mx-auto">
            {Array.from({ length: 20 }, (_, i) => i + 1).map((levelNum) => {
              const levelMeta = chineseData.levels.find((l) => l.id === levelNum);
              const required = levelMeta?.exercises?.length ?? 10;
              const progress = levelProgress[levelNum] || 0;
              const prevRequired = chineseData.levels.find((l) => l.id === levelNum - 1)?.exercises?.length || 10;
              const isUnlocked = levelNum === 1 || (levelProgress[levelNum - 1] || 0) >= prevRequired;
              const isCompleted = progress >= required;
              return (
                <button key={levelNum} onClick={() => { if (isUnlocked) goToLevel(levelNum); }} disabled={!isUnlocked} className={`aspect-square rounded-xl font-bold text-lg transition-all ${levelNum === currentLevel ? 'bg-red-600 text-white shadow-lg scale-110' : isCompleted ? 'bg-green-500 text-white hover:bg-green-600' : isUnlocked ? 'bg-orange-400 text-white hover:bg-orange-500' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                  {isCompleted ? <Trophy className="w-5 h-5 mx-auto" /> : levelNum}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChineseLearningApp;
