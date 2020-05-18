'use strict';
const path = require('path'); // встроенный модуль, помогающий работать с путями
const HTMLWebpackPlugin = require('html-webpack-plugin'); //плагин, работающий с html (помогает при изменении хеша бандла, подключить нужный скрипт, сам генерирует html)
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); //плагин, очищающий папку сборки
const CopyWebpackPlugin = require('copy-webpack-plugin'); //плагин, копирующий указанные файлы в указанную папку
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //плагин, извлекает css в отдельные файлы (можно заменить использование 'style-loader' на лоадер этого плагина (ниже))
const TerserWebpackPlugin = require('terser-webpack-plugin'); //плагин, оптимизирующий js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // плагин, оптимизирующий css

const isDev = process.env.NODE_ENV === 'development'; // определение режима

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'  // общие подключаемые библиотеки выносятся в отдельный модуль (чтобы подгружать не несколько раз, а один)
        }
    };
    // если в продакшен оптимизируем css и js
    if (!isDev) {
        config.minimizer = [
            new OptimizeCSSAssetsPlugin(),
            new TerserWebpackPlugin(),
        ]
    }
    return config
};

const fileName = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

// функция для лоадеров, связанных с css (чтобы не дублировать код в module)
const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev, //можем заменять определенный сущности без переагрузки страницы (в режиме разработчика)
                reloadAll: true //
            }
        },
        'css-loader'
    ];

    if (extra) {
        loaders.push(extra)
    }

    return loaders
};

// функция для лоадеров, связанных с css (чтобы не дублировать код в module)
const babelOptions = preset => {
    const opts = {
        presets: [
            '@babel/preset-env'
        ]
    };

    if (preset) {
        opts.presets.push(preset)
    }

    return opts
};

const jsLoaders = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: babelOptions()
        }
        ];
    //if (isDev) {
        //loaders.push('eslint-loader');
    //}
    return loaders
};

module.exports = {
    context: path.resolve(__dirname, 'source'), // корень ресурсов (для упрощения названий путей)
    mode: 'development', // режим (разработки или на продакшен)
    entry: {
        main: ['@babel/polyfill', './js/index.js']
    },// точка входа в приложение
    output: {
        filename: fileName('js'), // имя исходного файла (стандартное название)
        path: path.resolve(__dirname, 'dist') // путь до исходного файла
    },
    resolve: {
        extensions: ['.js'], //понимание расширений по умолчанию (убирает обязательность указания типа)
        alias: {  // уменьшает пропись путей файлов
            '@res': path.resolve(__dirname, './resources'),
            '@': path.resolve(__dirname, 'source')
        }
    },
    optimization: optimization(), //оптимизация кода
    devtool: isDev ? 'source-map' : '', //необходимо чтобы смотреть в отладчике в отдельных файлах и нескомпилированных
    devServer: {    // запускает webpack-dev-server (для начала установить) на указаном порту, чтобы не обновлять страницу при изменениях
        port: 4200,
        hot: isDev // запускать только в режиме разработчика
    },
    plugins: [  // сначала все плагины нужно установить
        new HTMLWebpackPlugin({
            template: './index.html', //шаблон страницы
            minify: {
                collapseWhitespace: !isDev // минимилировать html для продакшена
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'source/resources'), // путь до файла, который нужно скопировать
                to: path.resolve(__dirname, 'dist/res') // путь до папки в которую нужно скопировать
            }
        ]),
        new MiniCssExtractPlugin({
            filename: fileName('css')
        })
    ],
    module: {   // объкт с лоадерами (лоадер - модули, позволяюще работать с другими типами файлов, кроме js)
        rules: [    // массив правил
            // правило для js
            {
                test: /\.js$/,
                exclude: /node_modules/, // из поиска убрать папку node_modules (чтобы лишние файлы не конвертировать)
                use: jsLoaders()
            },
            // правило для ts
            {
                test: /\.ts$/,
                exclude: /node_modules/, // из поиска убрать папку node_modules (чтобы лишние файлы не конвертировать)
                loader: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-typescript')
                }
            },
            // правило для react
            {
                test: /\.jsx$/,
                exclude: /node_modules/, // из поиска убрать папку node_modules (чтобы лишние файлы не конвертировать)
                loader: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-react')
                }
            },
            // правила для css
            {
                test: /\.css$/, // регулярное выражение, проверяющее тип файла
                use: cssLoaders()
            },
            // правила для картинок
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader'] // помогает импортировать различные файлы (картинки, шрифты)
            },
            // правила для шрифтов
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            // правила для работы с xml
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            // правила для работы с csv (текстовый формат для представления табличных данных)
            {
                test: /\.csv$/,
                use: ['csv-loader']
            },
            // правила для работы с препроцессером sass
            {
                test: /\.s[ac]ss$/, // либо sass, либо scss
                use: cssLoaders('sass-loader')
            }
        ]
    }
};
