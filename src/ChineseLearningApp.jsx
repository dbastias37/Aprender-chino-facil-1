
import React, { useState, useEffect } from 'react';
import { Book, Heart, Star, Trophy, X, Search, AlertTriangle } from 'lucide-react';

// ✅ Datos corregidos y estructurados (SIN CAMBIAR CONTENIDO, solo orden/estructura)
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
  levels: [
    // 1) Saludos Básicos
    {
      id: 1,
      title: 'Saludos Básicos',
      exercises: [
        {
          id: 1,
          type: 'construct',
          spanish: 'Hola',
          chinese: '你好',
          pinyin: 'nǐ hǎo',
          words: [
            { char: '你', pinyin: 'nǐ', uniqueId: 'ni1' },
            { char: '好', pinyin: 'hǎo', uniqueId: 'hao1' },
            { char: '我', pinyin: 'wǒ', uniqueId: 'wo1' },
            { char: '是', pinyin: 'shì', uniqueId: 'shi1' }
          ]
        },
        {
          id: 2,
          type: 'construct',
          spanish: 'Adiós',
          chinese: '再见',
          pinyin: 'zàijiàn',
          words: [
            { char: '再', pinyin: 'zài', uniqueId: 'zai1' },
            { char: '见', pinyin: 'jiàn', uniqueId: 'jian1' },
            { char: '你', pinyin: 'nǐ', uniqueId: 'ni2' },
            { char: '好', pinyin: 'hǎo', uniqueId: 'hao2' }
          ]
        },
        {
          id: 3,
          type: 'construct',
          spanish: 'Gracias',
          chinese: '谢谢',
          pinyin: 'xiè xiè',
          words: [
            { char: '谢', pinyin: 'xiè', uniqueId: 'xie1' },
            { char: '谢', pinyin: 'xiè', uniqueId: 'xie2' },
            { char: '不', pinyin: 'bù', uniqueId: 'bu1' },
            { char: '客气', pinyin: 'kè qì', uniqueId: 'keqi1' }
          ]
        },
        {
          id: 4,
          type: 'construct',
          spanish: 'Lo siento',
          chinese: '对不起',
          pinyin: 'duì bù qǐ',
          words: [
            { char: '对', pinyin: 'duì', uniqueId: 'dui1' },
            { char: '不', pinyin: 'bù', uniqueId: 'bu2' },
            { char: '起', pinyin: 'qǐ', uniqueId: 'qi1' },
            { char: '没关系', pinyin: 'méi guān xi', uniqueId: 'meiguanxi1' }
          ]
        },
        {
          id: 5,
          type: 'construct',
          spanish: 'Por favor',
          chinese: '请',
          pinyin: 'qǐng',
          words: [
            { char: '请', pinyin: 'qǐng', uniqueId: 'qing1' },
            { char: '谢谢', pinyin: 'xiè xiè', uniqueId: 'xiexie1' },
            { char: '不', pinyin: 'bù', uniqueId: 'bu3' },
            { char: '客气', pinyin: 'kè qì', uniqueId: 'keqi2' }
          ]
        },
        {
          id: 6,
          type: 'construct',
          spanish: 'De nada',
          chinese: '不客气',
          pinyin: 'bù kè qì',
          words: [
            { char: '不', pinyin: 'bù', uniqueId: 'bu4' },
            { char: '客气', pinyin: 'kè qì', uniqueId: 'keqi3' },
            { char: '谢谢', pinyin: 'xiè xiè', uniqueId: 'xiexie2' },
            { char: '请', pinyin: 'qǐng', uniqueId: 'qing2' }
          ]
        },
        {
          id: 7,
          type: 'construct',
          spanish: 'Buenos días',
          chinese: '早上好',
          pinyin: 'zǎo shàng hǎo',
          words: [
            { char: '早上', pinyin: 'zǎo shàng', uniqueId: 'zaoshang1' },
            { char: '好', pinyin: 'hǎo', uniqueId: 'hao3' },
            { char: '晚上', pinyin: 'wǎn shàng', uniqueId: 'wanshang1' },
            { char: '中午', pinyin: 'zhōng wǔ', uniqueId: 'zhongwu1' }
          ]
        },
        {
          id: 8,
          type: 'construct',
          spanish: 'Buenas noches',
          chinese: '晚上好',
          pinyin: 'wǎn shàng hǎo',
          words: [
            { char: '晚上', pinyin: 'wǎn shàng', uniqueId: 'wanshang2' },
            { char: '好', pinyin: 'hǎo', uniqueId: 'hao4' },
            { char: '早上', pinyin: 'zǎo shàng', uniqueId: 'zaoshang2' },
            { char: '中午', pinyin: 'zhōng wǔ', uniqueId: 'zhongwu2' }
          ]
        },
        {
          id: 9,
          type: 'construct',
          spanish: '¿Cómo estás?',
          chinese: '你好吗',
          pinyin: 'nǐ hǎo ma',
          words: [
            { char: '你', pinyin: 'nǐ', uniqueId: 'ni3' },
            { char: '好', pinyin: 'hǎo', uniqueId: 'hao5' },
            { char: '吗', pinyin: 'ma', uniqueId: 'ma1' },
            { char: '我', pinyin: 'wǒ', uniqueId: 'wo2' }
          ]
        },
        {
          id: 10,
          type: 'construct',
          spanish: 'Estoy bien',
          chinese: '我很好',
          pinyin: 'wǒ hěn hǎo',
          words: [
            { char: '我', pinyin: 'wǒ', uniqueId: 'wo3' },
            { char: '很', pinyin: 'hěn', uniqueId: 'hen1' },
            { char: '好', pinyin: 'hǎo', uniqueId: 'hao6' },
            { char: '不', pinyin: 'bù', uniqueId: 'bu5' }
          ]
        }
      ],
      exam: [
        { question: '你好', options: ['Adiós', 'Hola', 'Gracias', 'Por favor'], correct: 1 },
        { question: '谢谢', options: ['Lo siento', 'Hola', 'Gracias', 'Adiós'], correct: 2 },
        { question: '再见', options: ['Hola', 'Adiós', 'Gracias', 'Por favor'], correct: 1 }
      ]
    },

    // 2) Números Básicos
    {
      id: 2,
      title: 'Números Básicos',
      exercises: [
        { id: 1, type: 'construct', spanish: 'Uno', chinese: '一', pinyin: 'yī', words: [
          { char: '一', pinyin: 'yī', uniqueId: 'yi1' }, { char: '二', pinyin: 'èr', uniqueId: 'er1' }, { char: '三', pinyin: 'sān', uniqueId: 'san1' }, { char: '四', pinyin: 'sì', uniqueId: 'si1' }
        ]},
        { id: 2, type: 'construct', spanish: 'Dos', chinese: '二', pinyin: 'èr', words: [
          { char: '一', pinyin: 'yī', uniqueId: 'yi2' }, { char: '二', pinyin: 'èr', uniqueId: 'er2' }, { char: '三', pinyin: 'sān', uniqueId: 'san2' }, { char: '四', pinyin: 'sì', uniqueId: 'si2' }
        ]},
        { id: 3, type: 'construct', spanish: 'Tres', chinese: '三', pinyin: 'sān', words: [
          { char: '一', pinyin: 'yī', uniqueId: 'yi3' }, { char: '二', pinyin: 'èr', uniqueId: 'er3' }, { char: '三', pinyin: 'sān', uniqueId: 'san3' }, { char: '四', pinyin: 'sì', uniqueId: 'si3' }
        ]},
        { id: 4, type: 'construct', spanish: 'Cuatro', chinese: '四', pinyin: 'sì', words: [
          { char: '一', pinyin: 'yī', uniqueId: 'yi4' }, { char: '二', pinyin: 'èr', uniqueId: 'er4' }, { char: '三', pinyin: 'sān', uniqueId: 'san4' }, { char: '四', pinyin: 'sì', uniqueId: 'si4' }
        ]},
        { id: 5, type: 'construct', spanish: 'Cinco', chinese: '五', pinyin: 'wǔ', words: [
          { char: '五', pinyin: 'wǔ', uniqueId: 'wu1' }, { char: '六', pinyin: 'liù', uniqueId: 'liu1' }, { char: '七', pinyin: 'qī', uniqueId: 'qi2' }, { char: '八', pinyin: 'bā', uniqueId: 'ba1' }
        ]},
        { id: 6, type: 'construct', spanish: 'Seis', chinese: '六', pinyin: 'liù', words: [
          { char: '五', pinyin: 'wǔ', uniqueId: 'wu2' }, { char: '六', pinyin: 'liù', uniqueId: 'liu2' }, { char: '七', pinyin: 'qī', uniqueId: 'qi3' }, { char: '八', pinyin: 'bā', uniqueId: 'ba2' }
        ]},
        { id: 7, type: 'construct', spanish: 'Siete', chinese: '七', pinyin: 'qī', words: [
          { char: '五', pinyin: 'wǔ', uniqueId: 'wu3' }, { char: '六', pinyin: 'liù', uniqueId: 'liu3' }, { char: '七', pinyin: 'qī', uniqueId: 'qi4' }, { char: '八', pinyin: 'bā', uniqueId: 'ba3' }
        ]},
        { id: 8, type: 'construct', spanish: 'Ocho', chinese: '八', pinyin: 'bā', words: [
          { char: '五', pinyin: 'wǔ', uniqueId: 'wu4' }, { char: '六', pinyin: 'liù', uniqueId: 'liu4' }, { char: '七', pinyin: 'qī', uniqueId: 'qi5' }, { char: '八', pinyin: 'bā', uniqueId: 'ba4' }
        ]}
      ],
      exam: [
        { question: '三', options: ['Dos', 'Tres', 'Cuatro', 'Cinco'], correct: 1 },
        { question: '七', options: ['Seis', 'Siete', 'Ocho', 'Nueve'], correct: 1 },
        { question: '十', options: ['Ocho', 'Nueve', 'Diez', 'Once'], correct: 2 }
      ]
    },

    // 3) Familia
    {
      id: 3,
      title: 'Familia',
      exercises: [
        { id: 1, type: 'construct', spanish: 'Padre', chinese: '父亲', pinyin: 'fù qīn', words: [
          { char: '父亲', pinyin: 'fù qīn', uniqueId: 'fuqin1' }, { char: '母亲', pinyin: 'mǔ qīn', uniqueId: 'muqin1' }, { char: '儿子', pinyin: 'ér zi', uniqueId: 'erzi1' }, { char: '女儿', pinyin: 'nǚ ér', uniqueId: 'nuer1' }
        ]},
        { id: 2, type: 'construct', spanish: 'Madre', chinese: '母亲', pinyin: 'mǔ qīn', words: [
          { char: '父亲', pinyin: 'fù qīn', uniqueId: 'fuqin2' }, { char: '母亲', pinyin: 'mǔ qīn', uniqueId: 'muqin2' }, { char: '儿子', pinyin: 'ér zi', uniqueId: 'erzi2' }, { char: '女儿', pinyin: 'nǚ ér', uniqueId: 'nuer2' }
        ]},
        { id: 3, type: 'construct', spanish: 'Hijo', chinese: '儿子', pinyin: 'ér zi', words: [
          { char: '父亲', pinyin: 'fù qīn', uniqueId: 'fuqin3' }, { char: '母亲', pinyin: 'mǔ qīn', uniqueId: 'muqin3' }, { char: '儿子', pinyin: 'ér zi', uniqueId: 'erzi3' }, { char: '女儿', pinyin: 'nǚ ér', uniqueId: 'nuer3' }
        ]},
        { id: 4, type: 'construct', spanish: 'Hija', chinese: '女儿', pinyin: 'nǚ ér', words: [
          { char: '父亲', pinyin: 'fù qīn', uniqueId: 'fuqin4' }, { char: '母亲', pinyin: 'mǔ qīn', uniqueId: 'muqin4' }, { char: '儿子', pinyin: 'ér zi', uniqueId: 'erzi4' }, { char: '女儿', pinyin: 'nǚ ér', uniqueId: 'nuer4' }
        ]},
        { id: 5, type: 'construct', spanish: 'Hermano', chinese: '哥哥', pinyin: 'gē ge', words: [
          { char: '哥哥', pinyin: 'gē ge', uniqueId: 'gege1' }, { char: '姐姐', pinyin: 'jiě jie', uniqueId: 'jiejie1' }, { char: '爷爷', pinyin: 'yé ye', uniqueId: 'yeye1' }, { char: '奶奶', pinyin: 'nǎi nai', uniqueId: 'nainai1' }
        ]},
        { id: 6, type: 'construct', spanish: 'Hermana', chinese: '姐姐', pinyin: 'jiě jie', words: [
          { char: '哥哥', pinyin: 'gē ge', uniqueId: 'gege2' }, { char: '姐姐', pinyin: 'jiě jie', uniqueId: 'jiejie2' }, { char: '爷爷', pinyin: 'yé ye', uniqueId: 'yeye2' }, { char: '奶奶', pinyin: 'nǎi nai', uniqueId: 'nainai2' }
        ]},
        { id: 7, type: 'construct', spanish: 'Abuelo', chinese: '爷爷', pinyin: 'yé ye', words: [
          { char: '哥哥', pinyin: 'gē ge', uniqueId: 'gege3' }, { char: '姐姐', pinyin: 'jiě jie', uniqueId: 'jiejie3' }, { char: '爷爷', pinyin: 'yé ye', uniqueId: 'yeye3' }, { char: '奶奶', pinyin: 'nǎi nai', uniqueId: 'nainai3' }
        ]},
        { id: 8, type: 'construct', spanish: 'Abuela', chinese: '奶奶', pinyin: 'nǎi nai', words: [
          { char: '哥哥', pinyin: 'gē ge', uniqueId: 'gege4' }, { char: '姐姐', pinyin: 'jiě jie', uniqueId: 'jiejie4' }, { char: '爷爷', pinyin: 'yé ye', uniqueId: 'yeye4' }, { char: '奶奶', pinyin: 'nǎi nai', uniqueId: 'nainai4' }
        ]}
      ],
      exam: [
        { question: '父亲', options: ['Madre', 'Padre', 'Hijo', 'Hermano'], correct: 1 },
        { question: '姐姐', options: ['Hermano', 'Hermana', 'Abuelo', 'Abuela'], correct: 1 },
        { question: '朋友', options: ['Familia', 'Amigo', 'Profesor', 'Estudiante'], correct: 1 }
      ]
    },

    // 4) Colores
    {
      id: 4,
      title: 'Colores',
      exercises: [
        { id: 1, type: 'construct', spanish: 'Rojo', chinese: '红色', pinyin: 'hóng sè', words: [
          { char: '红色', pinyin: 'hóng sè', uniqueId: 'hongse1' }, { char: '蓝色', pinyin: 'lán sè', uniqueId: 'lanse1' }, { char: '绿色', pinyin: 'lǜ sè', uniqueId: 'luse1' }, { char: '黄色', pinyin: 'huáng sè', uniqueId: 'huangse1' }
        ]},
        { id: 2, type: 'construct', spanish: 'Azul', chinese: '蓝色', pinyin: 'lán sè', words: [
          { char: '红色', pinyin: 'hóng sè', uniqueId: 'hongse2' }, { char: '蓝色', pinyin: 'lán sè', uniqueId: 'lanse2' }, { char: '绿色', pinyin: 'lǜ sè', uniqueId: 'luse2' }, { char: '黄色', pinyin: 'huáng sè', uniqueId: 'huangse2' }
        ]},
        { id: 3, type: 'construct', spanish: 'Verde', chinese: '绿色', pinyin: 'lǜ sè', words: [
          { char: '红色', pinyin: 'hóng sè', uniqueId: 'hongse3' }, { char: '蓝色', pinyin: 'lán sè', uniqueId: 'lanse3' }, { char: '绿色', pinyin: 'lǜ sè', uniqueId: 'luse3' }, { char: '黄色', pinyin: 'huáng sè', uniqueId: 'huangse3' }
        ]},
        { id: 4, type: 'construct', spanish: 'Amarillo', chinese: '黄色', pinyin: 'huáng sè', words: [
          { char: '红色', pinyin: 'hóng sè', uniqueId: 'hongse4' }, { char: '蓝色', pinyin: 'lán sè', uniqueId: 'lanse4' }, { char: '绿色', pinyin: 'lǜ sè', uniqueId: 'luse4' }, { char: '黄色', pinyin: 'huáng sè', uniqueId: 'huangse4' }
        ]},
        { id: 5, type: 'construct', spanish: 'Negro', chinese: '黑色', pinyin: 'hēi sè', words: [
          { char: '黑色', pinyin: 'hēi sè', uniqueId: 'heise1' }, { char: '白色', pinyin: 'bái sè', uniqueId: 'baise1' }, { char: '粉色', pinyin: 'fěn sè', uniqueId: 'fense1' }, { char: '紫色', pinyin: 'zǐ sè', uniqueId: 'zise1' }
        ]},
        { id: 6, type: 'construct', spanish: 'Blanco', chinese: '白色', pinyin: 'bái sè', words: [
          { char: '黑色', pinyin: 'hēi sè', uniqueId: 'heise2' }, { char: '白色', pinyin: 'bái sè', uniqueId: 'baise2' }, { char: '粉色', pinyin: 'fěn sè', uniqueId: 'fense2' }, { char: '紫色', pinyin: 'zǐ sè', uniqueId: 'zise2' }
        ]},
        { id: 7, type: 'construct', spanish: 'Rosa', chinese: '粉色', pinyin: 'fěn sè', words: [
          { char: '黑色', pinyin: 'hēi sè', uniqueId: 'heise3' }, { char: '白色', pinyin: 'bái sè', uniqueId: 'baise3' }, { char: '粉色', pinyin: 'fěn sè', uniqueId: 'fense3' }, { char: '紫色', pinyin: 'zǐ sè', uniqueId: 'zise3' }
        ]},
        { id: 8, type: 'construct', spanish: 'Morado', chinese: '紫色', pinyin: 'zǐ sè', words: [
          { char: '黑色', pinyin: 'hēi sè', uniqueId: 'heise4' }, { char: '白色', pinyin: 'bái sè', uniqueId: 'baise4' }, { char: '粉色', pinyin: 'fěn sè', uniqueId: 'fense4' }, { char: '紫色', pinyin: 'zǐ sè', uniqueId: 'zise4' }
        ]}
      ],
      exam: [
        { question: '红色', options: ['Azul', 'Rojo', 'Verde', 'Amarillo'], correct: 1 },
        { question: '白色', options: ['Negro', 'Blanco', 'Rosa', 'Morado'], correct: 1 },
        { question: '绿色', options: ['Rojo', 'Verde', 'Azul', 'Amarillo'], correct: 1 }
      ]
    },

    // 5) Días de la Semana
    {
      id: 5,
      title: 'Días de la Semana',
      exercises: [
        { id: 1, type: 'construct', spanish: 'Lunes', chinese: '星期一', pinyin: 'xīng qī yī', words: [
          { char: '星期一', pinyin: 'xīng qī yī', uniqueId: 'xingqiyi1' }, { char: '星期二', pinyin: 'xīng qī èr', uniqueId: 'xingqier1' }, { char: '星期三', pinyin: 'xīng qī sān', uniqueId: 'xingqisan1' }, { char: '星期四', pinyin: 'xīng qī sì', uniqueId: 'xingqisi1' }
        ]},
        { id: 2, type: 'construct', spanish: 'Martes', chinese: '星期二', pinyin: 'xīng qī èr', words: [
          { char: '星期一', pinyin: 'xīng qī yī', uniqueId: 'xingqiyi2' }, { char: '星期二', pinyin: 'xīng qī èr', uniqueId: 'xingqier2' }, { char: '星期三', pinyin: 'xīng qī sān', uniqueId: 'xingqisan2' }, { char: '星期四', pinyin: 'xīng qī sì', uniqueId: 'xingqisi2' }
        ]},
        { id: 3, type: 'construct', spanish: 'Miércoles', chinese: '星期三', pinyin: 'xīng qī sān', words: [
          { char: '星期一', pinyin: 'xīng qī yī', uniqueId: 'xingqiyi3' }, { char: '星期二', pinyin: 'xīng qī èr', uniqueId: 'xingqier3' }, { char: '星期三', pinyin: 'xīng qī sān', uniqueId: 'xingqisan3' }, { char: '星期四', pinyin: 'xīng qī sì', uniqueId: 'xingqisi3' }
        ]},
        { id: 4, type: 'construct', spanish: 'Jueves', chinese: '星期四', pinyin: 'xīng qī sì', words: [
          { char: '星期一', pinyin: 'xīng qī yī', uniqueId: 'xingqiyi4' }, { char: '星期二', pinyin: 'xīng qī èr', uniqueId: 'xingqier4' }, { char: '星期三', pinyin: 'xīng qī sān', uniqueId: 'xingqisan4' }, { char: '星期四', pinyin: 'xīng qī sì', uniqueId: 'xingqisi4' }
        ]},
        { id: 5, type: 'construct', spanish: 'Viernes', chinese: '星期五', pinyin: 'xīng qī wǔ', words: [
          { char: '星期五', pinyin: 'xīng qī wǔ', uniqueId: 'xingqiwu1' }, { char: '星期六', pinyin: 'xīng qī liù', uniqueId: 'xingqiliu1' }, { char: '星期天', pinyin: 'xīng qī tiān', uniqueId: 'xingqitian1' }, { char: '今天', pinyin: 'jīn tiān', uniqueId: 'jintian1' }
        ]},
        { id: 6, type: 'construct', spanish: 'Sábado', chinese: '星期六', pinyin: 'xīng qī liù', words: [
          { char: '星期五', pinyin: 'xīng qī wǔ', uniqueId: 'xingqiwu2' }, { char: '星期六', pinyin: 'xīng qī liù', uniqueId: 'xingqiliu2' }, { char: '星期天', pinyin: 'xīng qī tiān', uniqueId: 'xingqitian2' }, { char: '今天', pinyin: 'jīn tiān', uniqueId: 'jintian2' }
        ]},
        { id: 7, type: 'construct', spanish: 'Domingo', chinese: '星期天', pinyin: 'xīng qī tiān', words: [
          { char: '星期五', pinyin: 'xīng qī wǔ', uniqueId: 'xingqiwu3' }, { char: '星期六', pinyin: 'xīng qī liù', uniqueId: 'xingqiliu3' }, { char: '星期天', pinyin: 'xīng qī tiān', uniqueId: 'xingqitian3' }, { char: '今天', pinyin: 'jīn tiān', uniqueId: 'jintian3' }
        ]},
        { id: 8, type: 'construct', spanish: 'Hoy', chinese: '今天', pinyin: 'jīn tiān', words: [
          { char: '今天', pinyin: 'jīn tiān', uniqueId: 'jintian4' }, { char: '昨天', pinyin: 'zuó tiān', uniqueId: 'zuotian1' }, { char: '明天', pinyin: 'míng tiān', uniqueId: 'mingtian1' }, { char: '星期天', pinyin: 'xīng qī tiān', uniqueId: 'xingqitian4' }
        ]}
      ],
      exam: [
        { question: '星期一', options: ['Martes', 'Lunes', 'Miércoles', 'Jueves'], correct: 1 },
        { question: '今天', options: ['Ayer', 'Hoy', 'Mañana', 'Domingo'], correct: 1 },
        { question: '星期六', options: ['Viernes', 'Sábado', 'Domingo', 'Lunes'], correct: 1 }
      ]
    },

    // 6) Comida
    {
      id: 6,
      title: 'Comida',
      exercises: [
        { id: 1, type: 'construct', spanish: 'Comer', chinese: '吃', pinyin: 'chī', words: [
          { char: '吃', pinyin: 'chī', uniqueId: 'chi1' }, { char: '喝', pinyin: 'hē', uniqueId: 'he1' }, { char: '水', pinyin: 'shuǐ', uniqueId: 'shui1' }, { char: '茶', pinyin: 'chá', uniqueId: 'cha1' }
        ]},
        { id: 2, type: 'construct', spanish: 'Beber', chinese: '喝', pinyin: 'hē', words: [
          { char: '吃', pinyin: 'chī', uniqueId: 'chi2' }, { char: '喝', pinyin: 'hē', uniqueId: 'he2' }, { char: '水', pinyin: 'shuǐ', uniqueId: 'shui2' }, { char: '茶', pinyin: 'chá', uniqueId: 'cha2' }
        ]},
        { id: 3, type: 'construct', spanish: 'Agua', chinese: '水', pinyin: 'shuǐ', words: [
          { char: '吃', pinyin: 'chī', uniqueId: 'chi3' }, { char: '喝', pinyin: 'hē', uniqueId: 'he3' }, { char: '水', pinyin: 'shuǐ', uniqueId: 'shui3' }, { char: '茶', pinyin: 'chá', uniqueId: 'cha3' }
        ]},
        { id: 4, type: 'construct', spanish: 'Té', chinese: '茶', pinyin: 'chá', words: [
          { char: '吃', pinyin: 'chī', uniqueId: 'chi4' }, { char: '喝', pinyin: 'hē', uniqueId: 'he4' }, { char: '水', pinyin: 'shuǐ', uniqueId: 'shui4' }, { char: '茶', pinyin: 'chá', uniqueId: 'cha4' }
        ]},
        { id: 5, type: 'construct', spanish: 'Arroz', chinese: '米饭', pinyin: 'mǐ fàn', words: [
          { char: '米饭', pinyin: 'mǐ fàn', uniqueId: 'mifan1' }, { char: '面条', pinyin: 'miàn tiáo', uniqueId: 'miantiao1' }, { char: '鸡肉', pinyin: 'jī ròu', uniqueId: 'jirou1' }, { char: '牛肉', pinyin: 'niú ròu', uniqueId: 'niurou1' }
        ]},
        { id: 6, type: 'construct', spanish: 'Fideos', chinese: '面条', pinyin: 'miàn tiáo', words: [
          { char: '米饭', pinyin: 'mǐ fàn', uniqueId: 'mifan2' }, { char: '面条', pinyin: 'miàn tiáo', uniqueId: 'miantiao2' }, { char: '鸡肉', pinyin: 'jī ròu', uniqueId: 'jirou2' }, { char: '牛肉', pinyin: 'niú ròu', uniqueId: 'niurou2' }
        ]},
        { id: 7, type: 'construct', spanish: 'Pollo', chinese: '鸡肉', pinyin: 'jī ròu', words: [
          { char: '米饭', pinyin: 'mǐ fàn', uniqueId: 'mifan3' }, { char: '面条', pinyin: 'miàn tiáo', uniqueId: 'miantiao3' }, { char: '鸡肉', pinyin: 'jī ròu', uniqueId: 'jirou3' }, { char: '牛肉', pinyin: 'niú ròu', uniqueId: 'niurou3' }
        ]},
        { id: 8, type: 'construct', spanish: 'Carne de res', chinese: '牛肉', pinyin: 'niú ròu', words: [
          { char: '米饭', pinyin: 'mǐ fàn', uniqueId: 'mifan4' }, { char: '面条', pinyin: 'miàn tiáo', uniqueId: 'miantiao4' }, { char: '鸡肉', pinyin: 'jī ròu', uniqueId: 'jirou4' }, { char: '牛肉', pinyin: 'niú ròu', uniqueId: 'niurou4' }
        ]}
      ],
      exam: [
        { question: '吃', options: ['Beber', 'Comer', 'Dormir', 'Caminar'], correct: 1 },
        { question: '水', options: ['Té', 'Agua', 'Leche', 'Jugo'], correct: 1 },
        { question: '米饭', options: ['Fideos', 'Arroz', 'Pollo', 'Carne'], correct: 1 }
      ]
    }
  ]
};

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
  const [gameOverType, setGameOverType] = useState(null); // 'noLives', 'failedExam'
  const [randomizedExercises, setRandomizedExercises] = useState({});
  const [dataIssues, setDataIssues] = useState([]); // ✅ Panel de test/validación

  const level = chineseData.levels.find((l) => l.id === currentLevel);

  // Utilidad: barajar
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Obtener ejercicios aleatorizados para el nivel actual
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
  const exercise =
    currentLevelExercises && currentLevelExercises.length > currentExercise
      ? currentLevelExercises[currentExercise]
      : null;

  // Animación corazón
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes heartbeat {
        0% { transform: scale(1); }
        14% { transform: scale(1.15); }
        28% { transform: scale(1); }
        42% { transform: scale(1.15); }
        70% { transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Inicializar progreso
  useEffect(() => {
    const initialProgress = {};
    chineseData.levels.forEach((lvl) => {
      initialProgress[lvl.id] = 0;
    });
    setLevelProgress(initialProgress);
  }, []);

  // Inicializar ejercicios del nivel
  useEffect(() => {
    const levelData = chineseData.levels.find((l) => l.id === currentLevel);
    if (levelData && levelData.exercises && !randomizedExercises[currentLevel]) {
      const shuffled = shuffleArray(levelData.exercises);
      setRandomizedExercises((prev) => ({ ...prev, [currentLevel]: shuffled }));
    }
  }, [currentLevel]);

  // ✅ TEST/VALIDACIÓN en runtime: verifica que cada ejercicio sea resoluble
  useEffect(() => {
    const issues = [];

    const canCompose = (target, words) => {
      // backtracking para ver si target se compone usando subset de words (cada una a lo más una vez)
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
            if (dfs(remaining.slice(w.length))) {
              memo.set(remaining, true);
              used[i] = false;
              return true;
            }
            used[i] = false;
          }
        }
        memo.set(remaining, false);
        return false;
      };
      return dfs(target);
    };

    chineseData.levels.forEach((lvl) => {
      if (!Array.isArray(lvl.exercises) || lvl.exercises.length === 0) {
        issues.push(`Nivel ${lvl.id} no tiene ejercicios.`);
        return;
      }
      lvl.exercises.forEach((ex) => {
        if (!ex.words || ex.words.length === 0) {
          issues.push(`Nivel ${lvl.id} • Ejercicio ${ex.id} sin opciones de palabras.`);
          return;
        }
        const ids = new Set();
        ex.words.forEach((w) => {
          if (ids.has(w.uniqueId)) issues.push(`Nivel ${lvl.id} • Ejercicio ${ex.id} tiene uniqueId duplicado: ${w.uniqueId}`);
          ids.add(w.uniqueId);
        });
        if (!canCompose(ex.chinese, ex.words)) {
          issues.push(`Nivel ${lvl.id} • Ejercicio ${ex.id} no puede construir "${ex.chinese}" con sus palabras.`);
        }
      });
      if (!Array.isArray(lvl.exam) || lvl.exam.length === 0) {
        issues.push(`Nivel ${lvl.id} no tiene examen.`);
      } else {
        lvl.exam.forEach((q, qi) => {
          if (!(q.correct >= 0 && q.correct < q.options.length)) {
            issues.push(`Nivel ${lvl.id} • Pregunta examen ${qi + 1} tiene índice 'correct' inválido.`);
          }
        });
      }
    });

    setDataIssues(issues);
  }, []);

  const handleWordClick = (wordObj) => {
    if (selectedWords.some((w) => w.uniqueId === wordObj.uniqueId)) {
      setSelectedWords(selectedWords.filter((w) => w.uniqueId !== wordObj.uniqueId));
    } else {
      setSelectedWords([...selectedWords, wordObj]);
    }
  };

  const checkAnswer = () => {
    if (!exercise) return;

    const userAnswer = selectedWords.map((w) => w.char).join('');
    const correctAnswer = exercise.chinese;
    const correct = userAnswer === correctAnswer;

    setIsCorrect(correct);
    setShowResult(true);

    if (!correct) {
      const newLives = Math.max(0, lives - 1);
      setLives(newLives);
      if (newLives === 0) {
        setTimeout(() => {
          setShowResult(false);
          setGameOverType('noLives');
        }, 1200);
        return;
      }
    }

    setTimeout(() => {
      setShowResult(false);
      if (correct) {
        if (currentExercise >= totalExercises - 1) {
          // ✅ ahora respeta cantidad real de ejercicios
          setShowExam(true);
          setLevelProgress({ ...levelProgress, [currentLevel]: totalExercises });
        } else {
          const next = currentExercise + 1;
          setCurrentExercise(next);
          setLevelProgress({ ...levelProgress, [currentLevel]: next });
        }
      }
      setSelectedWords([]);
    }, 800);
  };

  const handleExamAnswer = (selectedOption) => {
    const examData = level.exam[examQuestion];
    const correct = selectedOption === examData.correct;

    if (correct) {
      if (examQuestion < level.exam.length - 1) {
        setExamQuestion(examQuestion + 1);
      } else {
        const newLives = lives + 3;
        setLives(newLives);
        const nextLevel = currentLevel + 1;
        if (chineseData.levels.find((l) => l.id === nextLevel)) {
          goToLevel(nextLevel);
        } else {
          setCurrentExercise(0);
        }
        setShowExam(false);
        setExamQuestion(0);
        setAttemptsLeft(4);
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

    const levelData = chineseData.levels.find((l) => l.id === currentLevel);
    if (levelData && levelData.exercises) {
      const shuffled = shuffleArray(levelData.exercises);
      setRandomizedExercises((prev) => ({ ...prev, [currentLevel]: shuffled }));
    }
    setLevelProgress({ ...levelProgress, [currentLevel]: 0 });
  };

  const goToLevel = (levelNum) => {
    const levelData = chineseData.levels.find((l) => l.id === levelNum);
    if (levelData) {
      setCurrentLevel(levelNum);
      setCurrentExercise(0);
      setSelectedWords([]);
      setShowResult(false);
      setShowExam(false);
      setExamQuestion(0);
      if (!randomizedExercises[levelNum] && levelData.exercises) {
        const shuffled = shuffleArray(levelData.exercises);
        setRandomizedExercises((prev) => ({ ...prev, [levelNum]: shuffled }));
      }
    }
  };

  const filteredDictionary = Object.entries(chineseData.dictionary).filter(([spanish]) =>
    spanish.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startApp = () => setShowWelcome(false);

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

  // Game Over
  if (gameOverType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md w-full border-4 border-red-400">
          <div className="text-6xl mb-6">😔</div>
          {gameOverType === 'noLives' ? (
            <>
              <h2 className="text-2xl font-bold text-red-600 mb-4">¡Has perdido todas tus vidas!</h2>
              <p className="text-gray-600 mb-6">Inténtalo de nuevo. Recuerda bien los caracteres y su significado.</p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-red-600 mb-4">¡Lo siento!</h2>
              <p className="text-gray-600 mb-6">Practica más, recuerda los caracteres y su significado y vuelve a intentarlo.</p>
            </>
          )}
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

        {/* ✅ Panel de Test/Validación */}
        {dataIssues.length > 0 && (
          <div className="mb-6 bg-yellow-50 border border-yellow-300 rounded-xl p-4 text-yellow-900">
            <div className="flex items-center gap-2 font-semibold mb-2"><AlertTriangle className="w-5 h-5" /> Validación de datos: se detectaron detalles a revisar</div>
            <ul className="list-disc pl-6 text-sm space-y-1">
              {dataIssues.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Barra de progreso dinámica */}
        <div className="mb-8">
          <div className="bg-red-200 rounded-full h-3 overflow-hidden">
            <div className="bg-red-600 h-full transition-all duration-500" style={{ width: totalExercises > 0 ? `${((Math.min(currentExercise, totalExercises - 1) + 1) / totalExercises) * 100}%` : '0%' }} />
          </div>
          <div className="text-sm text-red-700 mt-2">Ejercicio {Math.min(currentExercise + 1, totalExercises)} de {totalExercises}</div>
        </div>

        {/* Ejercicio */}
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

        {/* Modal de resultado */}
        {showResult && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
            <div className={`bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md w-full ${isCorrect ? 'border-4 border-green-400' : 'border-4 border-red-400'}`}>
              <div className="text-6xl mb-4">{isCorrect ? '🎉' : '😔'}</div>
              <h3 className={`text-2xl font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>{isCorrect ? '¡Correcto!' : '¡Incorrecto!'}</h3>
              {!isCorrect && exercise && (
                <p className="text-gray-600 mb-4">
                  La respuesta correcta era: <span className="font-semibold text-red-600">{exercise.chinese}</span>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Selector de niveles (desbloqueo dinámico según total de ejercicios) */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-red-800 mb-6 text-center">Niveles</h3>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-4 max-w-4xl mx-auto">
            {Array.from({ length: 20 }, (_, i) => i + 1).map((levelNum) => {
              const levelMeta = chineseData.levels.find((l) => l.id === levelNum);
              const required = levelMeta?.exercises?.length ?? 8; // fallback
              const progress = levelProgress[levelNum] || 0;
              const isUnlocked = levelNum === 1 || (levelProgress[levelNum - 1] || 0) >= (chineseData.levels.find((l) => l.id === levelNum - 1)?.exercises?.length || 8);
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
